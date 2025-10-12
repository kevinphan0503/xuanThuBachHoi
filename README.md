# Xuân Thu Bách Hội - Board Game Website

Website giới thiệu và quảng bá board game Xuân Thu Bách Hội - một trò chơi chiến thuật dựa trên lịch sử Việt Nam.

## Tính năng

- 🏠 Trang chủ với hero section và giới thiệu tổng quan
- 📖 Trang giới thiệu chi tiết về game và lịch sử
- 📋 Trang hướng dẫn chơi với luật game chi tiết
- 🖼️ Trang gallery với hình ảnh game
- 📞 Trang liên hệ với form gửi tin nhắn
- 📱 Responsive design cho mọi thiết bị
- ⚡ Performance tối ưu với Vite

## Công nghệ sử dụng

- **React 18** - Framework chính
- **Vite** - Build tool nhanh
- **React Router** - Routing
- **Lucide React** - Icons
- **CSS3** - Styling với animations
- **Responsive Design** - Tương thích mobile

## Cài đặt và chạy

### Yêu cầu
- Node.js 16+ 
- npm hoặc yarn

### Cài đặt dependencies
```bash
npm install
```

### Chạy development server
```bash
npm run dev
```

### Build cho production
```bash
npm run build
```

### Preview build
```bash
npm run preview
```

## Cấu trúc dự án

```
src/
├── components/          # Các component tái sử dụng
│   ├── Header.jsx      # Header với navigation
│   ├── Footer.jsx      # Footer
│   ├── Hero.jsx        # Hero section
│   ├── FeatureSection.jsx
│   ├── GamePreview.jsx
│   └── TestimonialSection.jsx
├── pages/              # Các trang chính
│   ├── Home.jsx        # Trang chủ
│   ├── About.jsx       # Giới thiệu
│   ├── GameRules.jsx   # Hướng dẫn chơi
│   ├── Gallery.jsx     # Hình ảnh
│   └── Contact.jsx     # Liên hệ
├── App.jsx             # App component chính
├── main.jsx           # Entry point
├── index.css          # Global styles
└── App.css            # App styles
```

## Tính năng responsive

- Mobile-first design
- Breakpoints: 480px, 768px, 1024px
- Touch-friendly navigation
- Optimized images và animations

## Browser support

- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

## Deployment

Website có thể deploy trên:
- Vercel
- Netlify  
- GitHub Pages
- Firebase Hosting

## License

© 2024 Xuân Thu Bách Hội. All rights reserved.
