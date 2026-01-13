# Hướng dẫn thiết lập Database và chạy ứng dụng

## Yêu cầu
- Node.js và npm
- MySQL Server
- Database: `boardgame_festival`

## Bước 1: Tạo Database và Tables

1. Đăng nhập vào MySQL:
```bash
mysql -u root -p
```

2. Tạo database (nếu chưa có):
```sql
CREATE DATABASE IF NOT EXISTS boardgame_festival;
USE boardgame_festival;
```

3. Chạy file schema.sql:
```bash
mysql -u root -p boardgame_festival < server/schema.sql
```

Hoặc copy nội dung từ `server/schema.sql` và chạy trong MySQL client.

## Bước 2: Cấu hình Environment Variables

Tạo file `.env` trong thư mục `server/` (nếu chưa có):
```
DB_HOST=localhost
DB_PORT=3306
DB_USER=root
DB_PASSWORD=your_password
DB_NAME=boardgame_festival
API_PORT=5000
```

## Bước 3: Cài đặt dependencies

```bash
npm install
```

## Bước 4: Chạy ứng dụng

### Terminal 1 - Chạy Backend Server:
```bash
npm run server
```

### Terminal 2 - Chạy Frontend:
```bash
npm run dev
```

## Bước 5: Truy cập ứng dụng

- Frontend: http://localhost:5173 (hoặc port mà Vite hiển thị)
- Backend API: http://localhost:5000
- Admin Dashboard: http://localhost:5173/admin/login
  - Username: `admin`
  - Password: `admin123`

## Cấu trúc Database

### Tables chính:
- `products`: Sản phẩm (boardgame, móc khóa, khăn)
- `orders`: Đơn hàng
- `order_items`: Chi tiết đơn hàng
- `admin_users`: Tài khoản admin
- `page_visits`: Thống kê lượt truy cập

### Sample Data:
File `server/schema.sql` đã bao gồm:
- 1 tài khoản admin mặc định (admin/admin123)
- 3 sản phẩm mẫu (Board Game, Móc khóa, Khăn)

## Tính năng đã triển khai

### Frontend (Người dùng):
- ✅ Trang Shopping/Cửa hàng với sản phẩm
- ✅ Giỏ hàng
- ✅ Đặt hàng

### Backend (Admin):
- ✅ Dashboard với thống kê và biểu đồ
- ✅ Quản lý sản phẩm (CRUD)
- ✅ Quản lý đơn hàng
- ✅ Thống kê lượt truy cập
- ✅ Thống kê doanh thu và bán hàng

### Tracking:
- ✅ Tự động track lượt truy cập trang
- ✅ Hiển thị thống kê trong admin panel

## Lưu ý

- Password admin hiện tại được lưu plaintext (chỉ dùng cho development)
- Trong production, nên dùng bcrypt để hash password
- Nên thêm JWT authentication cho admin
- Có thể cần điều chỉnh CORS settings trong `server/index.js`
