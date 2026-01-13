import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import pool, { ping, getFestivals } from './db.js';

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
            'INSERT INTO page_visits (page_path, ip_address, user_agent, referrer) VALUES (?, ?, ?, ?)',
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
        const [rows] = await pool.query('SELECT * FROM `Festival` WHERE festival_id = ?', [id]);
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
        const [rows] = await pool.query('SELECT * FROM products WHERE is_active = 1 ORDER BY created_at DESC');
        res.json(rows);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

app.get('/api/products/:id', async (req, res) => {
    try {
        const [rows] = await pool.query('SELECT * FROM products WHERE product_id = ? AND is_active = 1', [req.params.id]);
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
        const [result] = await pool.query(
            'INSERT INTO orders (customer_name, customer_email, customer_phone, customer_address, total_amount, shipping_fee, payment_method) VALUES (?, ?, ?, ?, ?, ?, ?)',
            [customer_name, customer_email, customer_phone, customer_address, total_amount, shipping_fee || 30000, payment_method || 'bank_transfer']
        );
        
        const orderId = result.insertId;
        
        // Insert order items
        for (const item of items) {
            await pool.query(
                'INSERT INTO order_items (order_id, product_id, quantity, price, subtotal) VALUES (?, ?, ?, ?, ?)',
                [orderId, item.product_id, item.quantity, item.price, item.price * item.quantity]
            );
            
            // Update product stock
            await pool.query(
                'UPDATE products SET stock_quantity = stock_quantity - ? WHERE product_id = ?',
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
        const [orders] = await pool.query('SELECT * FROM orders WHERE order_id = ?', [req.params.id]);
        if (!orders || orders.length === 0) {
            return res.status(404).json({ error: 'Order not found' });
        }
        
        const [items] = await pool.query(
            'SELECT oi.*, p.name as product_name, p.image_url FROM order_items oi JOIN products p ON oi.product_id = p.product_id WHERE oi.order_id = ?',
            [req.params.id]
        );
        
        res.json({ ...orders[0], items });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Admin authentication (simple - in production use JWT + bcrypt)
app.post('/api/admin/login', async (req, res) => {
    try {
        const { username, password } = req.body;
        const [rows] = await pool.query('SELECT * FROM admin_users WHERE username = ?', [username]);
        
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
        const [rows] = await pool.query('SELECT * FROM products ORDER BY created_at DESC');
        res.json(rows);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

app.post('/api/admin/products', async (req, res) => {
    try {
        const { name, description, price, original_price, category, image_url, stock_quantity } = req.body;
        const [result] = await pool.query(
            'INSERT INTO products (name, description, price, original_price, category, image_url, stock_quantity) VALUES (?, ?, ?, ?, ?, ?, ?)',
            [name, description, price, original_price, category, image_url, stock_quantity || 0]
        );
        res.json({ product_id: result.insertId, message: 'Product created successfully' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

app.put('/api/admin/products/:id', async (req, res) => {
    try {
        const { name, description, price, original_price, category, image_url, stock_quantity, is_active } = req.body;
        await pool.query(
            'UPDATE products SET name = ?, description = ?, price = ?, original_price = ?, category = ?, image_url = ?, stock_quantity = ?, is_active = ? WHERE product_id = ?',
            [name, description, price, original_price, category, image_url, stock_quantity, is_active !== undefined ? is_active : true, req.params.id]
        );
        res.json({ message: 'Product updated successfully' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

app.delete('/api/admin/products/:id', async (req, res) => {
    try {
        await pool.query('UPDATE products SET is_active = 0 WHERE product_id = ?', [req.params.id]);
        res.json({ message: 'Product deleted successfully' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Admin - Orders
app.get('/api/admin/orders', async (req, res) => {
    try {
        const [rows] = await pool.query('SELECT * FROM orders ORDER BY order_date DESC');
        res.json(rows);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

app.put('/api/admin/orders/:id/status', async (req, res) => {
    try {
        const { status } = req.body;
        await pool.query('UPDATE orders SET status = ? WHERE order_id = ?', [status, req.params.id]);
        res.json({ message: 'Order status updated successfully' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Admin - Statistics
app.get('/api/admin/statistics', async (req, res) => {
    try {
        // Total orders
        const [totalOrders] = await pool.query('SELECT COUNT(*) as count FROM orders');
        
        // Total revenue
        const [totalRevenue] = await pool.query('SELECT COALESCE(SUM(total_amount), 0) as total FROM orders WHERE status != "cancelled"');
        
        // Total products
        const [totalProducts] = await pool.query('SELECT COUNT(*) as count FROM products WHERE is_active = 1');
        
        // Orders by status
        const [ordersByStatus] = await pool.query(
            'SELECT status, COUNT(*) as count FROM orders GROUP BY status'
        );
        
        // Recent orders (last 7 days)
        const [recentOrders] = await pool.query(
            'SELECT COUNT(*) as count FROM orders WHERE order_date >= DATE_SUB(NOW(), INTERVAL 7 DAY)'
        );
        
        // Sales by product
        const [salesByProduct] = await pool.query(
            `SELECT p.product_id, p.name, p.category, SUM(oi.quantity) as total_sold, SUM(oi.subtotal) as total_revenue 
             FROM order_items oi 
             JOIN products p ON oi.product_id = p.product_id 
             JOIN orders o ON oi.order_id = o.order_id 
             WHERE o.status != 'cancelled' 
             GROUP BY p.product_id, p.name, p.category 
             ORDER BY total_sold DESC`
        );
        
        // Revenue by day (last 30 days)
        const [revenueByDay] = await pool.query(
            `SELECT DATE(order_date) as date, SUM(total_amount) as revenue 
             FROM orders 
             WHERE order_date >= DATE_SUB(NOW(), INTERVAL 30 DAY) AND status != 'cancelled'
             GROUP BY DATE(order_date) 
             ORDER BY date ASC`
        );
        
        res.json({
            totalOrders: totalOrders[0].count,
            totalRevenue: parseFloat(totalRevenue[0].total),
            totalProducts: totalProducts[0].count,
            recentOrders: recentOrders[0].count,
            ordersByStatus,
            salesByProduct,
            revenueByDay
        });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Admin - Analytics/Visits
app.get('/api/admin/analytics/visits', async (req, res) => {
    try {
        const { period = '30' } = req.query; // days
        const [visits] = await pool.query(
            `SELECT DATE(visit_date) as date, COUNT(*) as count 
             FROM page_visits 
             WHERE visit_date >= DATE_SUB(NOW(), INTERVAL ? DAY) 
             GROUP BY DATE(visit_date) 
             ORDER BY date ASC`,
            [period]
        );
        
        const [totalVisits] = await pool.query('SELECT COUNT(*) as count FROM page_visits');
        const [todayVisits] = await pool.query(
            'SELECT COUNT(*) as count FROM page_visits WHERE DATE(visit_date) = CURDATE()'
        );
        const [uniquePages] = await pool.query('SELECT COUNT(DISTINCT page_path) as count FROM page_visits');
        
        res.json({
            visits,
            totalVisits: totalVisits[0].count,
            todayVisits: todayVisits[0].count,
            uniquePages: uniquePages[0].count
        });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

const PORT = process.env.API_PORT || process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`API listening on http://localhost:${PORT}`);
});
