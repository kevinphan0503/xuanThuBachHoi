-- Database Schema for Xuân Thu Bách Hội E-commerce & Admin Dashboard

-- Products table
CREATE TABLE IF NOT EXISTS `products` (
  `product_id` INT AUTO_INCREMENT PRIMARY KEY,
  `name` VARCHAR(255) NOT NULL,
  `description` TEXT,
  `price` DECIMAL(10, 2) NOT NULL,
  `original_price` DECIMAL(10, 2),
  `category` ENUM('boardgame', 'keychain', 'towel', 'other') DEFAULT 'other',
  `image_url` VARCHAR(500),
  `stock_quantity` INT DEFAULT 0,
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  `updated_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `is_active` BOOLEAN DEFAULT TRUE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Orders table
CREATE TABLE IF NOT EXISTS `orders` (
  `order_id` INT AUTO_INCREMENT PRIMARY KEY,
  `customer_name` VARCHAR(255) NOT NULL,
  `customer_email` VARCHAR(255) NOT NULL,
  `customer_phone` VARCHAR(20) NOT NULL,
  `customer_address` TEXT NOT NULL,
  `total_amount` DECIMAL(10, 2) NOT NULL,
  `shipping_fee` DECIMAL(10, 2) DEFAULT 30000,
  `payment_method` VARCHAR(50) DEFAULT 'bank_transfer',
  `status` ENUM('pending', 'confirmed', 'shipping', 'completed', 'cancelled') DEFAULT 'pending',
  `order_date` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  `updated_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Order Items table
CREATE TABLE IF NOT EXISTS `order_items` (
  `order_item_id` INT AUTO_INCREMENT PRIMARY KEY,
  `order_id` INT NOT NULL,
  `product_id` INT NOT NULL,
  `quantity` INT NOT NULL,
  `price` DECIMAL(10, 2) NOT NULL,
  `subtotal` DECIMAL(10, 2) NOT NULL,
  FOREIGN KEY (`order_id`) REFERENCES `orders`(`order_id`) ON DELETE CASCADE,
  FOREIGN KEY (`product_id`) REFERENCES `products`(`product_id`) ON DELETE RESTRICT
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Admin users table
CREATE TABLE IF NOT EXISTS `admin_users` (
  `admin_id` INT AUTO_INCREMENT PRIMARY KEY,
  `username` VARCHAR(100) UNIQUE NOT NULL,
  `password_hash` VARCHAR(255) NOT NULL,
  `email` VARCHAR(255),
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Website analytics/visits tracking
CREATE TABLE IF NOT EXISTS `page_visits` (
  `visit_id` INT AUTO_INCREMENT PRIMARY KEY,
  `page_path` VARCHAR(255) NOT NULL,
  `ip_address` VARCHAR(45),
  `user_agent` TEXT,
  `referrer` VARCHAR(500),
  `visit_date` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  INDEX `idx_page_path` (`page_path`),
  INDEX `idx_visit_date` (`visit_date`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Insert default admin user (password: admin123 - should be hashed in production)
-- For now, we'll use a simple approach. In production, use bcrypt
INSERT INTO `admin_users` (`username`, `password_hash`, `email`) 
VALUES ('admin', 'admin123', 'admin@xuanthubachhoi.com')
ON DUPLICATE KEY UPDATE `username`=`username`;

-- Insert sample products
INSERT INTO `products` (`name`, `description`, `price`, `original_price`, `category`, `stock_quantity`, `image_url`) VALUES
('Xuân Thu Bách Hội - Board Game', 'Board game chiến thuật dựa trên lịch sử và văn hóa Việt Nam', 299000, 399000, 'boardgame', 50, '/assets/logo.png'),
('Móc khóa Xuân Thu Bách Hội', 'Móc khóa đặc biệt với logo Xuân Thu Bách Hội', 50000, 70000, 'keychain', 100, '/assets/logo.png'),
('Khăn tay Xuân Thu Bách Hội', 'Khăn tay cao cấp in hình logo và họa tiết dân gian', 120000, 150000, 'towel', 80, '/assets/logo.png')
ON DUPLICATE KEY UPDATE `name`=`name`;
