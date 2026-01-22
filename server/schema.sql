/* =====================================================
   DROP DATABASE (nếu tồn tại)
   ===================================================== */
DROP DATABASE IF EXISTS boardgame_festival;

/* =====================================================
   CREATE DATABASE
   ===================================================== */
CREATE DATABASE boardgame_festival
WITH
    ENCODING = 'UTF8'
    LC_COLLATE = 'en_US.UTF-8'
    LC_CTYPE = 'en_US.UTF-8';

/* =====================================================
   CONNECT DATABASE
   ===================================================== */
\c boardgame_festival;

/* =====================================================
   ENUM TYPES (PostgreSQL)
   ===================================================== */
CREATE TYPE product_category AS ENUM ('boardgame', 'keychain', 'towel', 'other');
CREATE TYPE order_status_enum AS ENUM ('pending', 'confirmed', 'shipping', 'completed', 'cancelled');

/* =====================================================
   ADMIN USERS
   ===================================================== */
CREATE TABLE admin_users (
    admin_id SERIAL PRIMARY KEY,
    username VARCHAR(100) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    email VARCHAR(255),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

/* =====================================================
   GAME SET (1 bộ board game)
   ===================================================== */
CREATE TABLE game_set (
    game_id SERIAL PRIMARY KEY,
    name VARCHAR(150) NOT NULL,
    description TEXT,
    price NUMERIC(10,2) NOT NULL,
    stock_quantity INT NOT NULL,
    image_url VARCHAR(255),
    status VARCHAR(20) DEFAULT 'ACTIVE',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

/* =====================================================
   FESTIVAL (16 lễ hội)
   ===================================================== */
CREATE TABLE festival (
    festival_id SERIAL PRIMARY KEY,
    game_id INT NOT NULL,
    name VARCHAR(150) NOT NULL,
    description TEXT,
    image_url VARCHAR(255),
    link_video VARCHAR(255),
    festival_status VARCHAR(20) DEFAULT 'AVAILABLE',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT fk_festival_game
        FOREIGN KEY (game_id)
        REFERENCES game_set(game_id)
        ON DELETE CASCADE
);

/* =====================================================
   QR CODE
   ===================================================== */
CREATE TABLE qr_code (
    qr_id SERIAL PRIMARY KEY,
    festival_id INT NOT NULL UNIQUE,
    qr_image_url VARCHAR(255),
    qr_content_url VARCHAR(255),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT fk_qr_festival
        FOREIGN KEY (festival_id)
        REFERENCES festival(festival_id)
        ON DELETE CASCADE
);

/* =====================================================
   PRODUCTS (E-commerce)
   ===================================================== */
CREATE TABLE products (
    product_id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    description TEXT,
    price NUMERIC(10,2) NOT NULL,
    original_price NUMERIC(10,2),
    category product_category DEFAULT 'other',
    image_url VARCHAR(500),
    stock_quantity INT DEFAULT 0,
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

/* =====================================================
   ORDERS
   ===================================================== */
CREATE TABLE orders (
    order_id SERIAL PRIMARY KEY,
    customer_name VARCHAR(255) NOT NULL,
    customer_email VARCHAR(255) NOT NULL,
    customer_phone VARCHAR(20) NOT NULL,
    customer_address TEXT NOT NULL,
    total_amount NUMERIC(10,2) NOT NULL,
    shipping_fee NUMERIC(10,2) DEFAULT 30000,
    payment_method VARCHAR(50) DEFAULT 'cod',
    status order_status_enum DEFAULT 'pending',
    order_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

/* =====================================================
   ORDER ITEMS
   ===================================================== */
CREATE TABLE order_items (
    order_item_id SERIAL PRIMARY KEY,
    order_id INT NOT NULL,
    product_id INT NOT NULL,
    quantity INT NOT NULL,
    price NUMERIC(10,2) NOT NULL,
    subtotal NUMERIC(10,2) NOT NULL,
    CONSTRAINT fk_order
        FOREIGN KEY (order_id)
        REFERENCES orders(order_id)
        ON DELETE CASCADE,
    CONSTRAINT fk_product
        FOREIGN KEY (product_id)
        REFERENCES products(product_id)
        ON DELETE RESTRICT
);

/* =====================================================
   PAYMENT
   ===================================================== */
CREATE TABLE payment (
    payment_id SERIAL PRIMARY KEY,
    order_id INT NOT NULL,
    payment_method VARCHAR(50) DEFAULT 'cod',
    payment_status VARCHAR(20) DEFAULT 'PENDING',
    transaction_id VARCHAR(100),
    payment_time TIMESTAMP,
    CONSTRAINT fk_payment_order
        FOREIGN KEY (order_id)
        REFERENCES orders(order_id)
        ON DELETE CASCADE
);

/* =====================================================
   PAGE VISITS (Analytics)
   ===================================================== */
CREATE TABLE page_visits (
    visit_id SERIAL PRIMARY KEY,
    page_path VARCHAR(255) NOT NULL,
    ip_address VARCHAR(45),
    user_agent TEXT,
    referrer VARCHAR(500),
    visit_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_page_path ON page_visits(page_path);
CREATE INDEX idx_visit_date ON page_visits(visit_date);

/* =====================================================
   SAMPLE DATA
   ===================================================== */

/* Admin */
INSERT INTO admin_users (username, password_hash, email)
VALUES ('admin', 'admin123', 'admin@xuanthubachhoi.com')
ON CONFLICT (username) DO NOTHING;

/* Game set */
INSERT INTO game_set (name, description, price, stock_quantity, status)
VALUES (
    'Board Game Lễ Hội Việt Nam',
    'Bộ board game gồm 16 lễ hội truyền thống Việt Nam',
    599000,
    100,
    'ACTIVE'
);

/* Festival mẫu */
INSERT INTO festival (game_id, name, description, image_url, link_video)
VALUES (
    1,
    'Hội Gióng',
    'Lễ hội truyền thống Việt Nam',
    '/images/hoi-giong.jpg',
    'https://youtube.com/watch?v=example'
);

/* QR mẫu */
INSERT INTO qr_code (festival_id, qr_content_url)
VALUES (
    1,
    'https://yourdomain.com/festival/1'
);

/* Products */
INSERT INTO products
(name, description, price, original_price, category, stock_quantity, image_url)
VALUES
(
 'Xuân Thu Bách Hội - Board Game',
 'Board game chiến thuật dựa trên lịch sử và văn hóa Việt Nam',
 299000,
 399000,
 'boardgame',
 50,
 '/assets/logo.png'
),
(
 'Móc khóa Xuân Thu Bách Hội',
 'Móc khóa đặc biệt với logo Xuân Thu Bách Hội',
 50000,
 70000,
 'keychain',
 100,
 '/assets/logo.png'
),
(
 'Khăn tay Xuân Thu Bách Hội',
 'Khăn tay cao cấp in hình logo và họa tiết dân gian',
 120000,
 150000,
 'towel',
 80,
 '/assets/logo.png'
);


