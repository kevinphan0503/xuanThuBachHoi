/* =====================================================
   DROP DATABASE (nếu tồn tại)
   ===================================================== */
-- DROP DATABASE IF EXISTS boardgame_festival;

-- /* =====================================================
--    CREATE DATABASE
--    ===================================================== */
-- CREATE DATABASE boardgame_festival
-- WITH
--     ENCODING = 'UTF8'
--     LC_COLLATE = 'en_US.UTF-8'
--     LC_CTYPE = 'en_US.UTF-8';

/* =====================================================
   CONNECT DATABASE
   ===================================================== */
-- \c boardgame_festival;

/* =====================================================
   ENUM TYPES (PostgreSQL)
   ===================================================== */
/* =====================================================
   ENUM TYPES
   ===================================================== */

CREATE TYPE product_category AS ENUM ('boardgame', 'keychain', 'towel', 'other');
CREATE TYPE order_status_enum AS ENUM ('pending', 'confirmed', 'shipping', 'completed', 'cancelled');
CREATE TYPE difficulty_level AS ENUM ('EASY', 'MEDIUM', 'HARD');

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
   USERS
   ===================================================== */

CREATE TABLE users (
    user_id SERIAL PRIMARY KEY,
    username VARCHAR(100) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    full_name VARCHAR(255),
    phone VARCHAR(20),
    address TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

/* =====================================================
   GAME SET
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
   FESTIVAL
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
   QUIZ
   ===================================================== */

CREATE TABLE quiz_questions (
    question_id SERIAL PRIMARY KEY,
    festival_id INT,
    content TEXT NOT NULL,
    difficulty difficulty_level DEFAULT 'EASY',
    points_per_question INT DEFAULT 10,
    CONSTRAINT fk_quiz_festival 
        FOREIGN KEY (festival_id) 
        REFERENCES festival(festival_id) 
        ON DELETE CASCADE
);

CREATE TABLE quiz_answers (
    answer_id SERIAL PRIMARY KEY,
    question_id INT NOT NULL,
    content TEXT NOT NULL,
    is_correct BOOLEAN DEFAULT FALSE,
    CONSTRAINT fk_answer_question 
        FOREIGN KEY (question_id) 
        REFERENCES quiz_questions(question_id) 
        ON DELETE CASCADE
);

CREATE TABLE quiz_attempts (
    attempt_id SERIAL PRIMARY KEY,
    user_id INT NULL,
    guest_session_id VARCHAR(255) UNIQUE NULL,
    display_name VARCHAR(100) NOT NULL,
    score INT DEFAULT 0,
    -- Thêm trường này: thời gian chơi tính bằng giây
    time_spent_seconds INT NOT NULL DEFAULT 0, 
    completed_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT fk_attempt_user 
        FOREIGN KEY (user_id) 
        REFERENCES users(user_id) 
        ON DELETE CASCADE
);

/* =====================================================
   PRODUCTS
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
    user_id INT NULL,
    customer_name VARCHAR(255) NOT NULL,
    customer_email VARCHAR(255) NOT NULL,
    customer_phone VARCHAR(20) NOT NULL,
    customer_address TEXT NOT NULL,
    total_amount NUMERIC(10,2) NOT NULL,
    shipping_fee NUMERIC(10,2) DEFAULT 30000,
    payment_method VARCHAR(50) DEFAULT 'cod',
    status order_status_enum DEFAULT 'pending',
    order_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT fk_orders_user 
        FOREIGN KEY (user_id) 
        REFERENCES users(user_id) 
        ON DELETE SET NULL
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
   PAGE VISITS
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

INSERT INTO users (username, password_hash, email, full_name, phone, address) VALUES
('master_festival', 'hash_123', 'master@example.com', 'master_festival', '0901234567', 'Cần Thơ'),
('le_thi_binh', 'hash_456', 'binh@example.com', 'Lê Thị Bình', '0912345678', 'Hà Nội'),
('tran_thanh', 'hash_789', 'thanh@example.com', 'Trần Thành', '0923456789', 'Đà Nẵng'),
('pham_dung', 'hash_000', 'dung@example.com', 'Phạm Tiến Dũng', '0934567890', 'TP.HCM');

INSERT INTO quiz_attempts (user_id, guest_session_id, display_name, score, time_spent_seconds, completed_at) VALUES
-- Trường hợp 1: User đăng nhập - Điểm cao nhất, thời gian nhanh (Top 1)
(1, NULL, 'master_festival', 1200, 1000, '2026-03-06 08:00:00'),

-- Trường hợp 2: Guest chơi ngay - Điểm bằng Top 1 nhưng thời gian chậm hơn (Xếp dưới Top 1)
(NULL, 'guest_uuid_001', 'Ẩn Danh Pro', 100, 52, '2026-03-06 09:15:00'),

-- Trường hợp 3: Guest chơi ngay - Điểm bằng Top 1, thời gian nhanh nhất (Soán ngôi Top 1)
(NULL, 'guest_uuid_002', 'Siêu Nhân Quiz', 100, 38, '2026-03-06 10:30:00'),

-- Trường hợp 4: User đăng nhập - Điểm trung bình, thời gian trung bình
(2, NULL, 'Lê Thị Bình', 80, 60, '2026-03-06 11:00:00'),

-- Trường hợp 5: User đăng nhập - Điểm khá, thời gian chậm
(3, NULL, 'Trần Thành', 90, 120, '2026-03-06 12:45:00'),

-- Trường hợp 6: Guest chơi ngay - Điểm thấp nhưng cực kỳ nhanh
(NULL, 'guest_uuid_003', 'Tốc Độ', 50, 15, '2026-03-06 13:20:00'),

-- Trường hợp 7: User đăng nhập - Đồng điểm với Lê Thị Bình nhưng thời gian tốt hơn
(4, NULL, 'Phạm Tiến Dũng', 80, 42, '2026-03-06 14:00:00'),

-- Trường hợp 8: Guest chơi ngay - Điểm trung bình
(NULL, 'guest_uuid_004', 'Lễ Hội Việt', 70, 55, '2026-03-06 14:10:00');


-- /* Festival mẫu */
-- INSERT INTO festival (game_id, name, description, image_url, link_video)
-- VALUES (
--     1,
--     'Hội Gióng',
--     'Lễ hội truyền thống Việt Nam',
--     '/images/hoi-giong.jpg',
--     'https://youtube.com/watch?v=example'
-- );

-- /* QR mẫu */
-- INSERT INTO qr_code (festival_id, qr_content_url)
-- VALUES (
--     1,
--     'https://yourdomain.com/festival/1'
-- );

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


