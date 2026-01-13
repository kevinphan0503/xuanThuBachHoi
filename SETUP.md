# Hướng dẫn thiết lập Database và chạy ứng dụng

## Yêu cầu
- Node.js và npm
- PostgreSQL Server
- Database: `boardgame_festival`

## Bước 1: Tạo Database và Tables (PostgreSQL)

1. Đăng nhập vào PostgreSQL (PowerShell):
```powershell
psql -U postgres
```

2. Tạo database và schema (file `server/schema.sql` đã bao gồm tạo DB và kết nối):
```powershell
psql -U postgres -f server/schema.sql
```

Hoặc mở `psql` rồi copy nội dung từ `server/schema.sql` để chạy.

## Bước 2: Cấu hình Environment Variables

Tạo file `.env` (ở thư mục gốc hoặc `server/`) nếu chưa có:
```
DB_HOST=localhost
DB_PORT=5432
DB_USER=postgres
DB_PASSWORD=your_password
DB_NAME=boardgame_festival
API_PORT=5000
```

## Bước 3: Cài đặt dependencies

```powershell
npm install
```

## Bước 4: Chạy ứng dụng

### Terminal 1 - Chạy Backend Server:
```powershell
npm run server
```

### Terminal 2 - Chạy Frontend:
```powershell
npm run dev
```

## Bước 5: Truy cập ứng dụng

- Frontend: http://localhost:5173 (hoặc port mà Vite hiển thị)
- Backend API: http://localhost:5000
- Admin Dashboard: http://localhost:5173/admin/login
  - Username: `admin`
  - Password: `admin123`

## Cấu trúc Database (PostgreSQL)

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

## Triển khai với Render + Vercel

- Backend (Render Web Service):
  - Nếu dùng Internal DB URL: đặt `DATABASE_URL=<Internal URL>`, `DB_SSL=false`.
  - Nếu dùng External DB URL: đặt `DATABASE_URL=<External URL>`, `DB_SSL=true`.
  - Luôn đặt `API_PORT=5000` (hoặc giá trị bạn dùng).

- Frontend (Vercel):
  - Đặt biến `VITE_API_URL` trỏ tới URL backend Render, ví dụ `https://your-render-api.onrender.com`.

- Local development dùng Render DB:
```powershell
$env:DATABASE_URL = "postgresql://<user>:<pass>@dpg-...render.com/<db>"
$env:DB_SSL = "true"
$env:VITE_API_URL = "http://localhost:5000"
npm run server
# Mở tab khác
npm run dev
```

## Chạy chỉ Frontend (dùng API + DB trên Render)

Bạn có thể KHÔNG chạy `npm run server` tại máy, thay vào đó dùng API đã deploy trên Render:

1. Xác định URL backend Render (ví dụ `https://xuanthubachhoi-api.onrender.com`).
2. Thiết lập biến môi trường cho Vite:
```powershell
$env:VITE_API_URL = "https://<your-render-api>.onrender.com"
```
3. Chạy frontend:
```powershell
npm run dev
```

Lúc này, tất cả request từ frontend sẽ gọi tới API Render, API này đã sử dụng `DATABASE_URL` trỏ vào Postgres Render, vì vậy dữ liệu hiển thị sẽ lấy trực tiếp từ Render DB.

Mẹo:
- Bạn có thể lưu cấu hình vào file `.env` ở thư mục gốc:
```
VITE_API_URL=https://<your-render-api>.onrender.com
```
- Với Vite, chỉ các biến bắt đầu bằng `VITE_` mới khả dụng ở frontend.

## Khởi tạo schema/data trên Render DB

Nếu cần nạp schema/data vào DB Render:
```powershell
# External URL ví dụ
psql "postgresql://...render.com/boardgame_festival_qxw0" -f server/schema.sql
psql "postgresql://...render.com/boardgame_festival_qxw0" -f server/datasample.sql
```
Lưu ý: `server/schema.sql` có lệnh tạo/kết nối database; nếu chạy trên Render đã có sẵn DB, hãy chỉ giữ phần tạo bảng/types hoặc dùng file schema phù hợp.
