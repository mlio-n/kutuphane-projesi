# 📚 Kütüphane Yönetim Sistemi (Library Management System)

Modern, hızlı ve kullanıcı dostu bir Kütüphane Yönetim Sistemi. Bu proje, hem yöneticilerin hem de üyelerin kütüphane içeriklerine kolayca erişmesini ve ödünç alma/iade süreçlerini yönetmesini sağlar.

## ✨ Özellikler

- **🔒 Kimlik Doğrulama:** JWT tabanlı güvenli giriş ve kayıt sistemi. Rol tabanlı erişim kontrolü (Admin / Kullanıcı).
- **📖 Kitap Yönetimi:** Kapsamlı kitap listeleme, ekleme, güncelleme ve silme (CRUD) işlemleri.
- **🏷️ Kategori Sistemi:** Kitapları türlerine göre kategorize edebilme.
- **⏱️ Ödünç Alma ve İade:** Kitapların ödünç alınması, aktif olarak okunan kitapların takibi ve iade işlemleri.
- **📊 İstatistik & Dashboard:** Toplam kitap, üye, kategori ve okunan kitap sayılarını anlık gösteren modern gösterge paneli.
- **📱 Responsive Tasarım:** Flowbite ve TailwindCSS ile her cihaza uyumlu, şık kullanıcı arayüzü.

## 🛠️ Kullanılan Teknolojiler

**Frontend:**
- [React 19](https://react.dev/) & [Vite](https://vitejs.dev/)
- [TailwindCSS](https://tailwindcss.com/) & [Flowbite React](https://flowbite-react.com/)
- [React Router v7](https://reactrouter.com/)
- [Axios](https://axios-http.com/) (API İstekleri)
- [Sonner](https://sonner.emilkowal.ski/) (Toast Bildirimleri)

**Backend:**
- [NestJS 11](https://nestjs.com/)
- [TypeORM](https://typeorm.io/)
- [SQLite](https://www.sqlite.org/) (Hafif ve hızlı veritabanı)
- [Passport & JWT](https://docs.nestjs.com/security/authentication) (Kimlik Doğrulama)

## 🚀 Kurulum ve Çalıştırma

Projeyi yerel ortamınızda çalıştırmak için aşağıdaki adımları izleyin.

### Ön Koşullar
- Node.js (v18 veya üzeri)
- npm veya yarn

### Backend Kurulumu

1. `backend` dizinine gidin:
   ```bash
   cd backend
   ```
2. Gerekli paketleri yükleyin:
   ```bash
   npm install
   ```
3. Sunucuyu geliştirme modunda başlatın:
   ```bash
   npm run start:dev
   ```
   *Backend API servisi, SQLite veritabanını otomatik oluşturarak http://localhost:3000 adresinde çalışmaya başlayacaktır.*

### Frontend Kurulumu

1. Yeni bir terminal açıp `frontend` dizinine gidin:
   ```bash
   cd frontend
   ```
2. Gerekli paketleri yükleyin:
   ```bash
   npm install
   ```
3. Geliştirme sunucusunu başlatın:
   ```bash
   npm run dev
   ```
   *Uygulama arayüzüne tarayıcınız üzerinden http://localhost:5173 adresinden erişebilirsiniz.*
   
---
*Bu proje modern web geliştirme pratikleri ve mimarileri baz alınarak geliştirilmiştir.*
