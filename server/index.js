import express from 'express';
import session from 'express-session';
import connectPgSimple from 'connect-pg-simple';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import { v2 as cloudinary } from 'cloudinary';
import nodemailer from 'nodemailer';
import pool, { ping, getFestivals, checkRenderConnection } from './db.js';
import cors from 'cors'; // Ensure CORS is imported at the top of the file

dotenv.config();
const app = express();
const PgSession = connectPgSimple(session);
const isProduction = process.env.NODE_ENV === 'production';

function parseAllowedOrigins() {
    const envOrigins = String(process.env.CORS_ORIGINS || '')
        .split(',')
        .map((origin) => origin.trim())
        .filter(Boolean);

    const defaults = [
        'http://localhost:3000',
        'http://localhost:3001',
        'http://localhost:5173',
        'http://localhost:5174'
    ];

    return Array.from(new Set([...defaults, ...envOrigins]));
}

const allowedOrigins = parseAllowedOrigins();

if (isProduction) {
    // Render sits behind a proxy; trust it so secure cookies work correctly.
    app.set('trust proxy', 1);
}

// Session middleware
app.use(session({
    store: new PgSession({
        pool,
        tableName: 'user_sessions',
        createTableIfMissing: true
    }),
    secret: process.env.SESSION_SECRET || 'xuanthubachhoi_secret',
    resave: false,
    saveUninitialized: false,
    cookie: {
        secure: isProduction,
        sameSite: isProduction ? 'none' : 'lax',
        maxAge: 7 * 24 * 60 * 60 * 1000 // 7 days
    }
}));
// Middleware xử lý JSON body
app.use(express.json());
// Middleware xử lý form-urlencoded nếu cần
app.use(express.urlencoded({ extended: true }));

// Cloudinary configuration (env driven)
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
});


const hasCloudinaryConfig = Boolean(
    process.env.CLOUDINARY_CLOUD_NAME &&
    process.env.CLOUDINARY_API_KEY &&
    process.env.CLOUDINARY_API_SECRET
);
const cloudinaryFolder = process.env.CLOUDINARY_FOLDER || '';

// Nodemailer configuration for contact form
const contactRecipient = process.env.CONTACT_RECIPIENT || 'vanphce181991@fpt.edu.vn';
const mailTransport = (() => {
    const {
        SMTP_SERVICE,
        SMTP_HOST,
        SMTP_PORT,
        SMTP_SECURE,
        SMTP_USER,
        SMTP_PASS
    } = process.env;

    // require either SERVICE or HOST
    if (!SMTP_SERVICE && !SMTP_HOST) return null;

    try {
        if (SMTP_SERVICE) {
            // Example: SMTP_SERVICE=gmail
            const cfg = {
                service: SMTP_SERVICE,
            };
            if (SMTP_USER && SMTP_PASS) cfg.auth = { user: SMTP_USER, pass: SMTP_PASS };
            return nodemailer.createTransport(cfg);
        }

        const baseConfig = {
            host: SMTP_HOST,
            port: Number(SMTP_PORT || 587),
            secure: SMTP_SECURE === 'true'
        };
        if (SMTP_USER && SMTP_PASS) baseConfig.auth = { user: SMTP_USER, pass: SMTP_PASS };
        return nodemailer.createTransport(baseConfig);
    } catch (err) {
        console.error('Failed to create mail transport:', err);
        return null;
    }
})();

async function sendOrderEmail({ to, subject, text, html }) {
    if (!mailTransport || !to) return;
    try {
        await mailTransport.sendMail({
            from: process.env.SMTP_FROM || process.env.SMTP_USER || 'no-reply@xuanthubachhoi.vn',
            to,
            subject,
            text,
            html
        });
    } catch (err) {
        console.error('Email send failed:', err?.message || err);
    }
}

// Allow local dev + configured deploy domains (e.g. Vercel) to call API with cookies.
app.use(cors({
    origin(origin, callback) {
        // Allow non-browser requests (curl/postman/health checks without Origin header)
        if (!origin) return callback(null, true);
        if (allowedOrigins.includes(origin)) return callback(null, true);

        // Optional convenience: allow preview deployments under *.vercel.app
        if (/\.vercel\.app$/i.test(origin)) return callback(null, true);

        return callback(new Error(`CORS blocked for origin: ${origin}`));
    },
    credentials: true
}));

// API đăng kí tài khoản người dùng
app.post('/api/register', async (req, res) => {
    const { username, password, email, full_name, phone, address } = req.body;
    if (!username || !password || !email || !full_name || !phone || !address) {
        return res.status(400).json({ error: 'Vui lòng nhập đầy đủ thông tin.' });
    }
    try {
        // Kiểm tra trùng username/email
        const userCheck = await pool.query('SELECT * FROM users WHERE username = $1 OR email = $2', [username, email]);
        if (userCheck.rows.length > 0) {
            return res.status(409).json({ error: 'Tên đăng nhập hoặc email đã tồn tại.' });
        }
        // Hash password
        const bcrypt = await import('bcryptjs');
        const salt = await bcrypt.genSalt(10);
        const password_hash = await bcrypt.hash(password, salt);
        // Thêm user mới
        await pool.query(
            'INSERT INTO users (username, password_hash, email, full_name, phone, address) VALUES ($1, $2, $3, $4, $5, $6)',
            [username, password_hash, email, full_name, phone, address]
        );
        return res.json({ message: 'Đăng kí thành công!' });
    } catch (err) {
        return res.status(500).json({ error: 'Lỗi máy chủ.' });
    }
});


// API đăng nhập người dùng
app.post('/api/login', async (req, res) => {
    const { username, password } = req.body;
    if (!username || !password) {
        return res.status(400).json({ error: 'Vui lòng nhập đầy đủ thông tin.' });
    }
    try {
        const userResult = await pool.query('SELECT * FROM users WHERE username = $1', [username]);
        if (userResult.rows.length === 0) {
            return res.status(401).json({ error: 'Tên đăng nhập hoặc mật khẩu không đúng.' });
        }
        const user = userResult.rows[0];
        const bcrypt = await import('bcryptjs');
        const isMatch = await bcrypt.compare(password, user.password_hash);
        if (!isMatch) {
            return res.status(401).json({ error: 'Tên đăng nhập hoặc mật khẩu không đúng.' });
        }
        // Lưu thông tin user vào session (ẩn password_hash)
        const { password_hash, ...userInfo } = user;
        req.session.user = userInfo;
        return res.json({ user: userInfo });
    } catch (err) {
        return res.status(500).json({ error: 'Lỗi máy chủ.' });
    }
});
// API kiểm tra trạng thái đăng nhập
app.get('/api/session', (req, res) => {
    if (req.session.user) {
        res.json({ loggedIn: true, user: req.session.user });
    } else {
        res.json({ loggedIn: false });
    }
});
// API đăng xuất
app.post('/api/logout', (req, res) => {
    req.session.destroy(() => {
        res.json({ success: true });
    });
});

// Resolve __dirname for ESM
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

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

// Contact form -> send email
app.post('/api/contact', async (req, res) => {
    try {
        const { name, email, phone, subject, message } = req.body || {};

        if (!name || !email || !subject || !message) {
            return res.status(400).json({ error: 'Thiếu thông tin bắt buộc' });
        }

        if (!mailTransport) {
            return res.status(500).json({ error: 'Mail server chưa được cấu hình' });
        }

        const mailFrom = process.env.SMTP_FROM || process.env.SMTP_USER || 'no-reply@xuanthubachhoi.vn';
        const mailSubject = `[Liên hệ] ${subject} - ${name}`;
        const htmlBody = `
            <h2>Thông tin liên hệ mới</h2>
            <p><strong>Họ tên:</strong> ${name}</p>
            <p><strong>Email:</strong> ${email}</p>
            <p><strong>Số điện thoại:</strong> ${phone || '(không cung cấp)'}</p>
            <p><strong>Chủ đề:</strong> ${subject}</p>
            <p><strong>Nội dung:</strong></p>
            <p>${(message || '').replace(/\n/g, '<br>')}</p>
        `;

        await mailTransport.sendMail({
            from: mailFrom,
            to: contactRecipient,
            replyTo: email,
            subject: mailSubject,
            text: `Lien he moi\nHo ten: ${name}\nEmail: ${email}\nSDT: ${phone || '(khong cung cap)'}\nChu de: ${subject}\n\n${message}`,
            html: htmlBody
        });

        res.json({ success: true, message: 'Đã gửi liên hệ thành công' });
    } catch (err) {
        console.error('Error sending contact email:', err);
        res.status(500).json({ error: 'Không gửi được email, vui lòng thử lại sau', detail: err?.message || undefined });
    }
});

// Fallback: store contact message in DB (for environments without SMTP)
// (Removed DB fallback; focus on email sending only)

// SMTP verify endpoint to diagnose mail configuration/connectivity
app.get('/api/mail/verify', async (req, res) => {
    try {
        if (!mailTransport) {
            return res.status(500).json({ configured: false, ok: false, error: 'Mail server chưa được cấu hình' });
        }

        // Nodemailer verify checks connection and authentication if set
        await mailTransport.verify();
        res.json({ configured: true, ok: true });
    } catch (err) {
        res.status(500).json({ configured: true, ok: false, error: err?.message || String(err) });
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

// Admin - Upload festival image to Cloudinary
app.post('/api/admin/upload/festival-image', async (req, res) => {
    try {
        if (!hasCloudinaryConfig) {
            return res.status(500).json({ error: 'Missing Cloudinary credentials' });
        }

        const { file } = req.body; // expects base64 string (with or without data URI prefix)
        if (!file) {
            return res.status(400).json({ error: 'File is required' });
        }

        const base64Data = (() => {
            if (file.startsWith('data:')) {
                const parts = file.split(',');
                return parts[1] || '';
            }
            return file;
        })();

        const buffer = Buffer.from(base64Data, 'base64');

        const uploadOptions = { resource_type: 'image' };
        if (cloudinaryFolder) uploadOptions.folder = cloudinaryFolder;

        const uploadResult = await new Promise((resolve, reject) => {
            const stream = cloudinary.uploader.upload_stream(
                uploadOptions,
                (error, result) => {
                    if (error) return reject(error);
                    resolve(result);
                }
            );
            stream.end(buffer);
        });

        res.json({
            url: uploadResult.secure_url,
            public_id: uploadResult.public_id,
            width: uploadResult.width,
            height: uploadResult.height,
            format: uploadResult.format
        });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Admin - Festival CRUD
app.get('/api/admin/festivals', async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM festival ORDER BY created_at DESC');
        res.json(result.rows);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Admin - Game sets (boardgame list for festival mapping)
app.get('/api/admin/game-sets', async (req, res) => {
    try {
        const result = await pool.query('SELECT game_id, name FROM game_set ORDER BY game_id ASC');
        res.json(result.rows);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

app.post('/api/admin/festivals', async (req, res) => {
    try {
        const { game_id, name, description, image_url, link_video, festival_status } = req.body;
        const result = await pool.query(
            `INSERT INTO festival (game_id, name, description, image_url, link_video, festival_status)
             VALUES ($1, $2, $3, $4, $5, $6)
             RETURNING festival_id`,
            [game_id, name, description, image_url, link_video, festival_status || 'AVAILABLE']
        );
        res.json({ festival_id: result.rows[0].festival_id, message: 'Festival created successfully' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

app.put('/api/admin/festivals/:id', async (req, res) => {
    try {
        const { game_id, name, description, image_url, link_video, festival_status } = req.body;
        await pool.query(
            `UPDATE festival
             SET game_id = $1,
                 name = $2,
                 description = $3,
                 image_url = $4,
                 link_video = $5,
                 festival_status = $6
             WHERE festival_id = $7`,
            [game_id, name, description, image_url, link_video, festival_status || 'AVAILABLE', req.params.id]
        );
        res.json({ message: 'Festival updated successfully' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

app.delete('/api/admin/festivals/:id', async (req, res) => {
    try {
        await pool.query('DELETE FROM festival WHERE festival_id = $1', [req.params.id]);
        res.json({ message: 'Festival deleted successfully' });
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

// Orders endpoints (public checkout)
app.post('/api/orders', async (req, res) => {
    const client = await pool.connect();
    try {
        const {
            customer_name,
            customer_email,
            customer_phone,
            customer_address,
            items,
            payment_method,
            shipping_fee
        } = req.body || {};

        if (!customer_name || !customer_email || !customer_phone || !customer_address) {
            return res.status(400).json({ error: 'Vui lòng điền đầy đủ thông tin khách hàng' });
        }

        if (!Array.isArray(items) || items.length === 0) {
            return res.status(400).json({ error: 'Giỏ hàng trống' });
        }

        const normalizedPaymentMethod = (payment_method || 'cod').toLowerCase();
        if (normalizedPaymentMethod !== 'cod') {
            return res.status(400).json({ error: 'Chỉ hỗ trợ thanh toán khi nhận hàng (COD)' });
        }

        const shippingFee = Number.isFinite(Number(shipping_fee)) && Number(shipping_fee) >= 0
            ? Number(shipping_fee)
            : 30000;

        await client.query('BEGIN');

        const validatedItems = [];
        let totalAmount = shippingFee;

        for (const rawItem of items) {
            const quantity = Number(rawItem?.quantity || 0);
            const productId = Number(rawItem?.product_id);

            if (!productId || quantity <= 0) {
                await client.query('ROLLBACK');
                return res.status(400).json({ error: 'Sản phẩm không hợp lệ' });
            }

            const productResult = await client.query(
                'SELECT product_id, price, stock_quantity, is_active FROM products WHERE product_id = $1',
                [productId]
            );

            if (productResult.rowCount === 0 || productResult.rows[0].is_active === false) {
                await client.query('ROLLBACK');
                return res.status(400).json({ error: 'Sản phẩm không tồn tại hoặc đã ngừng bán' });
            }

            const product = productResult.rows[0];
            if (product.stock_quantity < quantity) {
                await client.query('ROLLBACK');
                return res.status(400).json({ error: 'Sản phẩm không đủ tồn kho' });
            }

            const price = Number(product.price);
            const subtotal = price * quantity;
            totalAmount += subtotal;
            validatedItems.push({ product_id: productId, quantity, price, subtotal });
        }

        const orderResult = await client.query(
            `INSERT INTO orders (customer_name, customer_email, customer_phone, customer_address, total_amount, shipping_fee, payment_method)
             VALUES ($1, $2, $3, $4, $5, $6, 'cod') RETURNING order_id, status`,
            [customer_name, customer_email, customer_phone, customer_address, totalAmount, shippingFee]
        );

        const orderId = orderResult.rows[0].order_id;

        for (const item of validatedItems) {
            await client.query(
                'INSERT INTO order_items (order_id, product_id, quantity, price, subtotal) VALUES ($1, $2, $3, $4, $5)',
                [orderId, item.product_id, item.quantity, item.price, item.subtotal]
            );

            await client.query(
                'UPDATE products SET stock_quantity = stock_quantity - $1 WHERE product_id = $2',
                [item.quantity, item.product_id]
            );
        }

        await client.query(
            'INSERT INTO payment (order_id, payment_method, payment_status) VALUES ($1, $2, $3)',
            [orderId, 'cod', 'PENDING']
        );

        await client.query('COMMIT');

        const responsePayload = {
            order_id: orderId,
            status: orderResult.rows[0].status,
            payment_method: 'cod',
            total_amount: totalAmount,
            shipping_fee: shippingFee,
            message: 'Đặt hàng thành công. Chúng tôi sẽ liên hệ để xác nhận đơn hàng.'
        };

        // Send confirmation email (best-effort)
        const orderSummaryLines = validatedItems
            .map((item) => `- ${item.quantity} x ${item.product_id} (${item.price.toLocaleString('vi-VN')}đ) = ${item.subtotal.toLocaleString('vi-VN')}đ`)
            .join('\n');
        await sendOrderEmail({
            to: customer_email,
            subject: `[Xuân Thu Bách Hội] Đã nhận đơn hàng #${orderId}`,
            text: `Chào ${customer_name},\n\nChúng tôi đã nhận đơn hàng #${orderId}.\nPhương thức: COD (thanh toán khi nhận hàng).\nTổng tiền: ${totalAmount.toLocaleString('vi-VN')}đ (bao gồm phí vận chuyển ${shippingFee.toLocaleString('vi-VN')}đ).\n\nChi tiết:\n${orderSummaryLines}\n\nChúng tôi sẽ liên hệ để xác nhận đơn hàng.\nCảm ơn bạn đã mua sắm!`,
            html: `
                <p>Chào ${customer_name},</p>
                <p>Chúng tôi đã nhận đơn hàng <strong>#${orderId}</strong>.</p>
                <p><strong>Phương thức:</strong> COD (thanh toán khi nhận hàng)</p>
                <p><strong>Tổng tiền:</strong> ${totalAmount.toLocaleString('vi-VN')}đ (gồm phí vận chuyển ${shippingFee.toLocaleString('vi-VN')}đ)</p>
                <p><strong>Chi tiết:</strong><br>${orderSummaryLines.replace(/\n/g, '<br>')}</p>
                <p>Chúng tôi sẽ liên hệ để xác nhận đơn hàng.<br>Cảm ơn bạn đã mua sắm!</p>
            `
        });

        res.status(201).json(responsePayload);
    } catch (err) {
        await client.query('ROLLBACK').catch(() => { });
        res.status(500).json({ error: err.message });
    } finally {
        client.release();
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

        const paymentResult = await pool.query(
            'SELECT payment_method, payment_status, payment_time FROM payment WHERE order_id = $1 ORDER BY payment_id DESC LIMIT 1',
            [req.params.id]
        );

        res.json({
            ...orders[0],
            items: itemsResult.rows,
            payment: paymentResult.rows[0] || { payment_method: 'cod', payment_status: 'PENDING' }
        });
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
        const result = await pool.query(
            `SELECT o.*, COALESCE(SUM(oi.quantity), 0) AS items_count, COALESCE(p.payment_status, 'PENDING') AS payment_status
             FROM orders o
             LEFT JOIN order_items oi ON o.order_id = oi.order_id
             LEFT JOIN LATERAL (
                 SELECT payment_status FROM payment WHERE order_id = o.order_id ORDER BY payment_id DESC LIMIT 1
             ) p ON true
             GROUP BY o.order_id, p.payment_status
             ORDER BY o.order_date DESC`
        );
        res.json(result.rows);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

app.get('/api/admin/orders/:id', async (req, res) => {
    try {
        const orderResult = await pool.query('SELECT * FROM orders WHERE order_id = $1', [req.params.id]);
        if (orderResult.rowCount === 0) {
            return res.status(404).json({ error: 'Order not found' });
        }

        const itemsResult = await pool.query(
            'SELECT oi.*, p.name as product_name, p.image_url FROM order_items oi JOIN products p ON oi.product_id = p.product_id WHERE oi.order_id = $1',
            [req.params.id]
        );

        const paymentResult = await pool.query(
            'SELECT payment_method, payment_status, payment_time FROM payment WHERE order_id = $1 ORDER BY payment_id DESC LIMIT 1',
            [req.params.id]
        );

        res.json({
            ...orderResult.rows[0],
            items: itemsResult.rows,
            payment: paymentResult.rows[0] || { payment_method: 'cod', payment_status: 'PENDING' }
        });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

app.put('/api/admin/orders/:id/status', async (req, res) => {
    const client = await pool.connect();
    try {
        const { status } = req.body || {};
        const allowedStatuses = ['pending', 'confirmed', 'shipping', 'completed', 'cancelled'];
        if (!status || !allowedStatuses.includes(status)) {
            return res.status(400).json({ error: 'Trạng thái không hợp lệ' });
        }

        await client.query('BEGIN');

        const currentResult = await client.query('SELECT status, customer_email, customer_name, total_amount FROM orders WHERE order_id = $1', [req.params.id]);
        if (currentResult.rowCount === 0) {
            await client.query('ROLLBACK');
            return res.status(404).json({ error: 'Order not found' });
        }

        const previousStatus = currentResult.rows[0].status;
        const customerEmail = currentResult.rows[0].customer_email;
        const customerName = currentResult.rows[0].customer_name;
        const totalAmount = currentResult.rows[0].total_amount;

        await client.query('UPDATE orders SET status = $1, updated_at = NOW() WHERE order_id = $2', [status, req.params.id]);

        const paymentStatus = status === 'completed'
            ? 'PAID'
            : status === 'cancelled'
                ? 'CANCELLED'
                : 'PENDING';

        const paymentTime = status === 'completed' ? new Date() : null;

        const paymentUpdate = await client.query(
            'UPDATE payment SET payment_status = $2, payment_time = $3 WHERE order_id = $1',
            [req.params.id, paymentStatus, paymentTime]
        );

        if (paymentUpdate.rowCount === 0) {
            await client.query(
                'INSERT INTO payment (order_id, payment_method, payment_status, payment_time) VALUES ($1, $2, $3, $4)',
                [req.params.id, 'cod', paymentStatus, paymentTime]
            );
        }

        if (status === 'cancelled' && previousStatus !== 'cancelled') {
            const itemsResult = await client.query('SELECT product_id, quantity FROM order_items WHERE order_id = $1', [req.params.id]);
            for (const item of itemsResult.rows) {
                await client.query(
                    'UPDATE products SET stock_quantity = stock_quantity + $1 WHERE product_id = $2',
                    [item.quantity, item.product_id]
                );
            }
        }

        await client.query('COMMIT');
        if (status === 'confirmed') {
            await sendOrderEmail({
                to: customerEmail,
                subject: `[Xuân Thu Bách Hội] Đơn hàng #${req.params.id} đã được xác nhận`,
                text: `Chào ${customerName},\n\nĐơn hàng #${req.params.id} của bạn đã được xác nhận.\nPhương thức: COD.\nTổng tiền: ${Number(totalAmount).toLocaleString('vi-VN')}đ.\nChúng tôi sẽ sớm giao hàng cho bạn.\nCảm ơn bạn!`,
                html: `
                    <p>Chào ${customerName},</p>
                    <p>Đơn hàng <strong>#${req.params.id}</strong> của bạn đã được xác nhận.</p>
                    <p><strong>Phương thức:</strong> COD</p>
                    <p><strong>Tổng tiền:</strong> ${Number(totalAmount).toLocaleString('vi-VN')}đ</p>
                    <p>Chúng tôi sẽ sớm giao hàng cho bạn.<br>Cảm ơn bạn!</p>
                `
            });
        }

        res.json({ message: 'Cập nhật trạng thái đơn hàng thành công' });
    } catch (err) {
        await client.query('ROLLBACK').catch(() => { });
        res.status(500).json({ error: err.message });
    } finally {
        client.release();
    }
});

app.delete('/api/admin/orders/:id', async (req, res) => {
    const client = await pool.connect();
    try {
        await client.query('BEGIN');

        const itemsResult = await client.query('SELECT product_id, quantity FROM order_items WHERE order_id = $1', [req.params.id]);
        if (itemsResult.rowCount === 0) {
            await client.query('ROLLBACK');
            return res.status(404).json({ error: 'Order not found' });
        }

        for (const item of itemsResult.rows) {
            await client.query(
                'UPDATE products SET stock_quantity = stock_quantity + $1 WHERE product_id = $2',
                [item.quantity, item.product_id]
            );
        }

        await client.query('DELETE FROM payment WHERE order_id = $1', [req.params.id]);
        await client.query('DELETE FROM orders WHERE order_id = $1', [req.params.id]);

        await client.query('COMMIT');
        res.json({ message: 'Xóa đơn hàng và hoàn lại tồn kho thành công' });
    } catch (err) {
        await client.query('ROLLBACK').catch(() => { });
        res.status(500).json({ error: err.message });
    } finally {
        client.release();
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

// API endpoint to fetch quiz questions
app.get('/api/quiz/questions', async (req, res) => {
    try {
        const rawDifficulty = String(req.query?.difficulty || '').toUpperCase();
        const difficulty = ['EASY', 'MEDIUM', 'HARD'].includes(rawDifficulty) ? rawDifficulty : null;
        const requestedLimit = Number(req.query?.limit);
        const limit = Number.isFinite(requestedLimit)
            ? Math.max(1, Math.min(200, Math.floor(requestedLimit)))
            : 40;

        const result = await pool.query(
            `WITH selected_questions AS (
                SELECT q.question_id, q.festival_id, q.content, q.difficulty, q.points_per_question
                FROM quiz_questions q
                WHERE ($1::difficulty_level IS NULL OR q.difficulty = $1::difficulty_level)
                ORDER BY RANDOM()
                LIMIT $2
             )
             SELECT sq.question_id, sq.festival_id, f.name AS festival_name, sq.content, sq.difficulty, sq.points_per_question,
                    json_agg(
                        json_build_object('content', a.content, 'is_correct', a.is_correct)
                        ORDER BY a.answer_id
                    ) AS answers
             FROM selected_questions sq
             LEFT JOIN festival f ON f.festival_id = sq.festival_id
             JOIN quiz_answers a ON sq.question_id = a.question_id
             GROUP BY sq.question_id, sq.festival_id, f.name, sq.content, sq.difficulty, sq.points_per_question
             ORDER BY sq.question_id`,
            [difficulty, limit]
        );
        res.json(result.rows);
    } catch (error) {
        console.error('Error fetching quiz questions:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

async function saveQuizAttempt(req, res) {
    const rawScore = Number(req.body?.score);
    const rawTimeSpent = Number(req.body?.time_spent_seconds);
    const submittedDisplayName = String(
        req.body?.display_name || req.body?.displayName || req.body?.name || ''
    ).trim();
    const score = Number.isFinite(rawScore) ? Math.max(0, Math.floor(rawScore)) : 0;
    const timeSpentSeconds = Number.isFinite(rawTimeSpent) ? Math.max(0, Math.floor(rawTimeSpent)) : 0;

    const sessionUser = req.session?.user || null;
    const isLoggedIn = Boolean(sessionUser?.user_id);
    const userId = isLoggedIn ? sessionUser.user_id : null;
    const guestSessionId = isLoggedIn ? null : String(req.sessionID || 'guest');
    const guestDisplayName = submittedDisplayName.slice(0, 100);
    const displayName = isLoggedIn
        ? String(sessionUser.username || sessionUser.full_name || `user_${sessionUser.user_id}`)
        : (guestDisplayName || `Guest_${String(req.sessionID || 'guest').slice(0, 8)}`);

    try {
        if (isLoggedIn) {
            const result = await pool.query(
                `INSERT INTO quiz_attempts (user_id, guest_session_id, display_name, score, time_spent_seconds)
                 VALUES ($1, NULL, $2, $3, $4)
                 RETURNING attempt_id, display_name, score, time_spent_seconds, completed_at`,
                [userId, displayName, score, timeSpentSeconds]
            );
            return res.status(201).json({ saved: true, attempt: result.rows[0] });
        }

        const result = await pool.query(
            `INSERT INTO quiz_attempts (user_id, guest_session_id, display_name, score, time_spent_seconds)
             VALUES (NULL, $1, $2, $3, $4)
             ON CONFLICT (guest_session_id)
             DO UPDATE SET
                display_name = EXCLUDED.display_name,
                score = GREATEST(quiz_attempts.score, EXCLUDED.score),
                time_spent_seconds = CASE
                    WHEN EXCLUDED.score > quiz_attempts.score THEN EXCLUDED.time_spent_seconds
                    WHEN EXCLUDED.score = quiz_attempts.score THEN LEAST(quiz_attempts.time_spent_seconds, EXCLUDED.time_spent_seconds)
                    ELSE quiz_attempts.time_spent_seconds
                END,
                completed_at = CURRENT_TIMESTAMP
             RETURNING attempt_id, display_name, score, time_spent_seconds, completed_at`,
            [guestSessionId, displayName, score, timeSpentSeconds]
        );

        return res.status(201).json({ saved: true, attempt: result.rows[0] });
    } catch (error) {
        console.error('Error saving quiz attempt:', error);
        return res.status(500).json({ error: 'Internal server error' });
    }
}

// Save one completed quiz attempt, resolving display info from session (user vs guest)
app.post('/api/quiz/attempts', saveQuizAttempt);

// Backward-compatible endpoint alias
app.post('/api/quiz/submit', async (req, res) => {
    try {
        return saveQuizAttempt(req, res);
    } catch (error) {
        console.error('Error submitting quiz attempt:', error);
        return res.status(500).json({ error: 'Internal server error' });
    }
});

// API endpoint to fetch leaderboard data
app.get('/api/quiz/leaderboard', async (req, res) => {
    try {
        const requestedLimit = Number(req.query?.limit);
        const limit = Number.isFinite(requestedLimit)
            ? Math.max(1, Math.min(50, Math.floor(requestedLimit)))
            : 8;

        const result = await pool.query(
            `SELECT display_name, score, time_spent_seconds, completed_at
             FROM quiz_attempts
             ORDER BY score DESC, time_spent_seconds ASC, completed_at ASC
             LIMIT $1`,
            [limit]
        );
        res.json(result.rows);
    } catch (error) {
        console.error('Error fetching leaderboard:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

const PORT = process.env.API_PORT || process.env.PORT || 5000;
// Serve frontend build assets from ../dist
const distPath = path.join(__dirname, '../dist');
app.use(express.static(distPath));

// SPA fallback: non-API GET requests serve index.html (no path pattern)
app.use((req, res, next) => {
    if (req.method !== 'GET') return next();
    if (req.path.startsWith('/api')) return next();
    res.sendFile(path.join(distPath, 'index.html'));
});

app.listen(PORT, () => {
    console.log(`API listening on http://localhost:${PORT}`);
});
