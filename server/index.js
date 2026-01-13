import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import pool, { ping, getFestivals, checkRenderConnection } from './db.js';

dotenv.config();

const app = express();
app.use(cors({ origin: '*' }));
app.use(express.json());

// Track page visits endpoint
app.post('/api/page-visit', async (req, res) => {
    try {
        const { path } = req.body;
        const ip = req.ip || req.connection.remoteAddress || '';
        const userAgent = req.get('user-agent') || '';
        const referrer = req.get('referer') || '';

        await pool.query(
            'INSERT INTO page_visits (page_path, ip_address, user_agent, referrer) VALUES ($1, $2, $3, $4)',
            [path, ip, userAgent, referrer]
        );

        res.json({ success: true });
    } catch (err) {
        console.error('Error tracking visit:', err);
        res.status(500).json({ error: err.message });
    }
});

app.get('/api/health', (req, res) => {
    res.json({ ok: true, service: 'api', time: new Date().toISOString() });
});

app.get('/api/db/ping', async (req, res) => {
    try {
        const ok = await ping();
        res.json({ ok });
    } catch (err) {
        res.status(500).json({ ok: false, error: err.message });
    }
});

app.get('/api/db/check', async (req, res) => {
    try {
        const info = await checkRenderConnection();
        res.json(info);
    } catch (err) {
        res.status(500).json({ ok: false, error: err.message });
    }
});

// Festival endpoints
app.get('/api/festivals', async (req, res) => {
    try {
        const rows = await getFestivals();
        res.json(rows);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

app.get('/api/festivals/:festival_id', async (req, res) => {
    try {
        const id = req.params.festival_id || req.params.id;
        const result = await pool.query('SELECT * FROM festival WHERE festival_id = $1', [id]);
        const rows = result.rows;
        if (!rows || rows.length === 0) {
            return res.status(404).json({ error: 'Not found' });
        }
        res.json(rows[0]);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Products endpoints
app.get('/api/products', async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM products WHERE is_active = TRUE ORDER BY created_at DESC');
        res.json(result.rows);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

app.get('/api/products/:id', async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM products WHERE product_id = $1 AND is_active = TRUE', [req.params.id]);
        const rows = result.rows;
        if (!rows || rows.length === 0) {
            return res.status(404).json({ error: 'Product not found' });
        }
        res.json(rows[0]);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Orders endpoints
app.post('/api/orders', async (req, res) => {
    try {
        const { customer_name, customer_email, customer_phone, customer_address, items, payment_method, shipping_fee } = req.body;

        // Calculate total
        let total_amount = shipping_fee || 30000;
        items.forEach(item => {
            total_amount += item.price * item.quantity;
        });

        // Create order
        const result = await pool.query(
            'INSERT INTO orders (customer_name, customer_email, customer_phone, customer_address, total_amount, shipping_fee, payment_method) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING order_id',
            [customer_name, customer_email, customer_phone, customer_address, total_amount, shipping_fee || 30000, payment_method || 'bank_transfer']
        );

        const orderId = result.rows[0].order_id;

        // Insert order items
        for (const item of items) {
            await pool.query(
                'INSERT INTO order_items (order_id, product_id, quantity, price, subtotal) VALUES ($1, $2, $3, $4, $5)',
                [orderId, item.product_id, item.quantity, item.price, item.price * item.quantity]
            );

            // Update product stock
            await pool.query(
                'UPDATE products SET stock_quantity = stock_quantity - $1 WHERE product_id = $2',
                [item.quantity, item.product_id]
            );
        }

        res.json({ order_id: orderId, message: 'Order created successfully' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

app.get('/api/orders/:id', async (req, res) => {
    try {
        const orderResult = await pool.query('SELECT * FROM orders WHERE order_id = $1', [req.params.id]);
        const orders = orderResult.rows;
        if (!orders || orders.length === 0) {
            return res.status(404).json({ error: 'Order not found' });
        }

        const itemsResult = await pool.query(
            'SELECT oi.*, p.name as product_name, p.image_url FROM order_items oi JOIN products p ON oi.product_id = p.product_id WHERE oi.order_id = $1',
            [req.params.id]
        );

        res.json({ ...orders[0], items: itemsResult.rows });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Admin authentication (simple - in production use JWT + bcrypt)
app.post('/api/admin/login', async (req, res) => {
    try {
        const { username, password } = req.body;
        const result = await pool.query('SELECT * FROM admin_users WHERE username = $1', [username]);
        const rows = result.rows;

        if (rows.length === 0 || rows[0].password_hash !== password) {
            return res.status(401).json({ error: 'Invalid credentials' });
        }

        res.json({ success: true, admin: { id: rows[0].admin_id, username: rows[0].username } });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Admin - Products CRUD
app.get('/api/admin/products', async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM products ORDER BY created_at DESC');
        res.json(result.rows);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

app.post('/api/admin/products', async (req, res) => {
    try {
        const { name, description, price, original_price, category, image_url, stock_quantity } = req.body;
        const result = await pool.query(
            'INSERT INTO products (name, description, price, original_price, category, image_url, stock_quantity) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING product_id',
            [name, description, price, original_price, category, image_url, stock_quantity || 0]
        );
        res.json({ product_id: result.rows[0].product_id, message: 'Product created successfully' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

app.put('/api/admin/products/:id', async (req, res) => {
    try {
        const { name, description, price, original_price, category, image_url, stock_quantity, is_active } = req.body;
        await pool.query(
            'UPDATE products SET name = $1, description = $2, price = $3, original_price = $4, category = $5, image_url = $6, stock_quantity = $7, is_active = $8 WHERE product_id = $9',
            [name, description, price, original_price, category, image_url, stock_quantity, is_active !== undefined ? is_active : true, req.params.id]
        );
        res.json({ message: 'Product updated successfully' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

app.delete('/api/admin/products/:id', async (req, res) => {
    try {
        await pool.query('UPDATE products SET is_active = FALSE WHERE product_id = $1', [req.params.id]);
        res.json({ message: 'Product deleted successfully' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Admin - Orders
app.get('/api/admin/orders', async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM orders ORDER BY order_date DESC');
        res.json(result.rows);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

app.put('/api/admin/orders/:id/status', async (req, res) => {
    try {
        const { status } = req.body;
        await pool.query('UPDATE orders SET status = $1 WHERE order_id = $2', [status, req.params.id]);
        res.json({ message: 'Order status updated successfully' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Admin - Statistics
app.get('/api/admin/statistics', async (req, res) => {
    try {
        // Total orders
        const totalOrdersResult = await pool.query('SELECT COUNT(*) as count FROM orders');

        // Total revenue
        const totalRevenueResult = await pool.query("SELECT COALESCE(SUM(total_amount), 0) as total FROM orders WHERE status != 'cancelled'");

        // Total products
        const totalProductsResult = await pool.query('SELECT COUNT(*) as count FROM products WHERE is_active = TRUE');

        // Orders by status
        const ordersByStatusResult = await pool.query(
            'SELECT status, COUNT(*) as count FROM orders GROUP BY status'
        );

        // Recent orders (last 7 days)
        const recentOrdersResult = await pool.query(
            "SELECT COUNT(*) as count FROM orders WHERE order_date >= NOW() - INTERVAL '7 days'"
        );

        // Sales by product
        const salesByProductResult = await pool.query(
            `SELECT p.product_id, p.name, p.category, SUM(oi.quantity) as total_sold, SUM(oi.subtotal) as total_revenue 
             FROM order_items oi 
             JOIN products p ON oi.product_id = p.product_id 
             JOIN orders o ON oi.order_id = o.order_id 
             WHERE o.status != 'cancelled' 
             GROUP BY p.product_id, p.name, p.category 
             ORDER BY total_sold DESC`
        );

        // Revenue by day (last 30 days)
        const revenueByDayResult = await pool.query(
            `SELECT order_date::date as date, SUM(total_amount) as revenue 
             FROM orders 
             WHERE order_date >= NOW() - INTERVAL '30 days' AND status != 'cancelled'
             GROUP BY order_date::date 
             ORDER BY date ASC`
        );

        res.json({
            totalOrders: Number(totalOrdersResult.rows[0].count),
            totalRevenue: Number(totalRevenueResult.rows[0].total),
            totalProducts: Number(totalProductsResult.rows[0].count),
            recentOrders: Number(recentOrdersResult.rows[0].count),
            ordersByStatus: ordersByStatusResult.rows,
            salesByProduct: salesByProductResult.rows,
            revenueByDay: revenueByDayResult.rows
        });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Admin - Analytics/Visits
app.get('/api/admin/analytics/visits', async (req, res) => {
    try {
        const { period = '30' } = req.query; // days
        const visitsResult = await pool.query(
            `SELECT visit_date::date as date, COUNT(*) as count 
             FROM page_visits 
             WHERE visit_date >= NOW() - ($1 || ' days')::interval 
             GROUP BY visit_date::date 
             ORDER BY date ASC`,
            [String(period)]
        );

        const totalVisitsResult = await pool.query('SELECT COUNT(*) as count FROM page_visits');
        const todayVisitsResult = await pool.query(
            'SELECT COUNT(*) as count FROM page_visits WHERE visit_date::date = CURRENT_DATE'
        );
        const uniquePagesResult = await pool.query('SELECT COUNT(DISTINCT page_path) as count FROM page_visits');

        res.json({
            visits: visitsResult.rows,
            totalVisits: Number(totalVisitsResult.rows[0].count),
            todayVisits: Number(todayVisitsResult.rows[0].count),
            uniquePages: Number(uniquePagesResult.rows[0].count)
        });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

const PORT = process.env.API_PORT || process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`API listening on http://localhost:${PORT}`);
});
