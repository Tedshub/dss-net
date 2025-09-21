# DSS Net - Sistem Pendukung Keputusan RKS

<p align="center">
  <img src="https://raw.githubusercontent.com/laravel/art/master/logo-lockup/5%20SVG/2%20CMYK/1%20Full%20Color/laravel-logolockup-cmyk-red.svg" width="300" alt="Laravel Logo">
  <br>
  <strong>Decision Support System with Modern Stack</strong>
</p>

<p align="center">
<a href="https://github.com/Tedshub/dss-net"><img src="https://img.shields.io/github/stars/Tedshub/dss-net?style=social" alt="GitHub Stars"></a>
<a href="https://github.com/Tedshub/dss-net/fork"><img src="https://img.shields.io/github/forks/Tedshub/dss-net?style=social" alt="GitHub Forks"></a>
<a href="https://github.com/Tedshub/dss-net/issues"><img src="https://img.shields.io/github/issues/Tedshub/dss-net" alt="GitHub Issues"></a>
<a href="https://github.com/Tedshub/dss-net/blob/main/LICENSE"><img src="https://img.shields.io/github/license/Tedshub/dss-net" alt="License"></a>
<a href="https://github.com/laravel/framework"><img src="https://img.shields.io/badge/Laravel-11-FF2D20?logo=laravel" alt="Laravel Version"></a>
<a href="https://nodejs.org/"><img src="https://img.shields.io/badge/Node.js-18+-339933?logo=node.js" alt="Node.js Version"></a>
</p>

## 📋 Deskripsi Project

**DSS Net** adalah Sistem Pendukung Keputusan (Decision Support System) modern yang dibangun dengan teknologi terdepan. Sistem ini dirancang untuk membantu organisasi dalam mengambil keputusan yang tepat melalui analisis data yang komprehensif dan interface yang intuitif.

### ✨ Key Features

- 🔐 **Authentication System** - Login, Register, Email Verification, Password Reset
- 📊 **Dashboard Analytics** - Real-time data visualization dan reporting
- 🎯 **Decision Matrix** - Tools untuk analisis keputusan multi-kriteria
- 📈 **Data Analysis** - Advanced analytics dan business intelligence
- 🔒 **Role-based Access** - Sistem permission yang fleksibel
- 📱 **Responsive Design** - Mobile-first approach dengan UI modern
- ⚡ **Real-time Updates** - Live data synchronization

## 🛠️ Tech Stack

| Layer | Technology | Version |
|-------|------------|---------|
| **Backend** | Laravel | 11.x |
| **Frontend** | React | 18.x |
| **SSR** | Inertia.js | 1.x |
| **Database** | MySQL/PostgreSQL | 8.0+ / 15+ |
| **Styling** | TailwindCSS | 3.x |
| **Build Tool** | Vite | 4.x |
| **Package Manager** | NPM | 9.x |
| **PHP** | PHP | 8.2+ |

## 🚀 Quick Start

### Prerequisites

Pastikan system Anda memiliki:

- **PHP** >= 8.2
- **Composer** >= 2.0
- **Node.js** >= 18.0
- **NPM** >= 9.0
- **MySQL** >= 8.0 atau **PostgreSQL** >= 15.0

### 🔧 Installation

#### 1. Clone Repository

```bash
git clone https://github.com/Tedshub/dss-net.git
cd dss-net
```

#### 2. Install PHP Dependencies

```bash
composer install
```

#### 3. Install Node.js Dependencies

```bash
npm install
```

#### 4. Environment Configuration

```bash
# Copy environment file
cp .env.example .env

# Generate application key
php artisan key:generate
```

#### 5. Database Setup

Edit file `.env` dengan konfigurasi database:

```env
DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=dss_net
DB_USERNAME=root
DB_PASSWORD=
```

#### 6. Run Migrations

```bash
# Create database tables
php artisan migrate

# (Optional) Run seeders for sample data
php artisan db:seed
```

#### 7. Email Configuration (Optional)

Untuk fitur email verification dan password reset:

```env
MAIL_MAILER=smtp
MAIL_HOST=smtp.gmail.com
MAIL_PORT=587
MAIL_USERNAME=your-email@gmail.com
MAIL_PASSWORD=your-app-password
MAIL_ENCRYPTION=tls
MAIL_FROM_ADDRESS=your-email@gmail.com
MAIL_FROM_NAME="DSS Net"
```

#### 8. Build Assets & Start Development

```bash
# Build frontend assets
npm run build

# Start development servers
npm run dev        # Frontend development server
php artisan serve  # Backend server (http://localhost:8000)
```

## 🔧 Development Commands

### Frontend Development

```bash
# Development mode with hot reload
npm run dev

# Build for production
npm run build

# Watch files for changes
npm run watch
```

### Backend Development

```bash
# Start Laravel development server
php artisan serve

# Run migrations
php artisan migrate

# Refresh migrations (⚠️ Will delete data)
php artisan migrate:refresh --seed

# Clear caches
php artisan cache:clear
php artisan config:clear
php artisan route:clear
php artisan view:clear

# Generate IDE helper files (development only)
php artisan ide-helper:generate
php artisan ide-helper:models
```

### Testing

```bash
# Run PHP tests
php artisan test

# Run specific test file
php artisan test tests/Feature/AuthTest.php

# Run tests with coverage
php artisan test --coverage

# Run frontend tests
npm test
```

## 📁 Project Structure

```
dss-net/
├── 📁 app/
│   ├── 📁 Http/Controllers/     # API & Web Controllers
│   ├── 📁 Models/              # Eloquent Models
│   ├── 📁 Mail/                # Email Templates
│   └── 📁 Services/            # Business Logic
├── 📁 resources/
│   ├── 📁 js/                  # React Components
│   │   ├── 📁 Components/      # Reusable Components
│   │   ├── 📁 Pages/           # Page Components
│   │   └── 📁 Layouts/         # Layout Components
│   └── 📁 views/               # Blade Templates
├── 📁 routes/
│   ├── web.php                 # Web Routes
│   └── auth.php               # Authentication Routes
├── 📁 database/
│   ├── 📁 migrations/          # Database Migrations
│   └── 📁 seeders/            # Database Seeders
└── 📁 public/                  # Public Assets
```

## 🔐 Authentication Features

### Available Auth Routes

| Method | Route | Description |
|--------|-------|-------------|
| `GET` | `/register` | Registration form |
| `POST` | `/register` | Process registration |
| `GET` | `/login` | Login form |
| `POST` | `/login` | Process login |
| `GET` | `/verify-email` | Email verification notice |
| `GET` | `/verify-email/{token}` | Email verification handler |
| `GET` | `/forgot-password` | Password reset request |
| `POST` | `/forgot-password` | Send reset link |
| `GET` | `/reset-password/{token}` | Password reset form |
| `POST` | `/reset-password` | Process password reset |

### Email Verification Flow

1. User registers → Email sent with verification link
2. User clicks link → Email verified & auto-login
3. User redirected to dashboard

## 🚀 Deployment

### Production Build

```bash
# Optimize for production
composer install --optimize-autoloader --no-dev
npm run build

# Cache configurations
php artisan config:cache
php artisan route:cache
php artisan view:cache
```

### Environment Variables for Production

```env
APP_ENV=production
APP_DEBUG=false
APP_URL=https://yourdomain.com

# Database
DB_CONNECTION=mysql
DB_HOST=your-host
DB_DATABASE=your-database
DB_USERNAME=your-username
DB_PASSWORD=your-secure-password

# Mail (Production)
MAIL_MAILER=smtp
MAIL_HOST=your-smtp-host
MAIL_PORT=587
MAIL_USERNAME=your-production-email
MAIL_PASSWORD=your-secure-password
```

## 🤝 Contributing

Kami menerima kontribusi dari developer lain! Berikut cara berkontribusi:

### 1. Fork & Clone

```bash
# Fork repository di GitHub, then:
git clone https://github.com/your-username/dss-net.git
cd dss-net
```

### 2. Create Feature Branch

```bash
git checkout -b feature/amazing-feature
```

### 3. Development Workflow

```bash
# Make changes, then:
git add .
git commit -m "Add amazing feature"
git push origin feature/amazing-feature
```

### 4. Create Pull Request

- Buat Pull Request di GitHub
- Berikan deskripsi lengkap tentang changes
- Wait for review dan feedback

### 🏗️ Development Guidelines

- **Code Style**: Follow PSR-12 untuk PHP, ESLint untuk JavaScript
- **Commit Messages**: Gunakan conventional commits format
- **Testing**: Tambahkan tests untuk feature baru
- **Documentation**: Update README jika diperlukan

## 📞 Support & Community

- 🐛 **Bug Reports**: [GitHub Issues](https://github.com/Tedshub/dss-net/issues)
- 💡 **Feature Requests**: [GitHub Discussions](https://github.com/Tedshub/dss-net/discussions)
- 📧 **Email**: support@dssnet.com
- 💬 **Discord**: [Join our community](#)

## 🙏 Acknowledgments

Terima kasih kepada:

- **Laravel Team** - Framework yang luar biasa
- **Inertia.js Team** - Modern monolith approach
- **React Team** - Powerful UI library  
- **TailwindCSS** - Utility-first CSS framework
- **All Contributors** - Yang telah membantu development

## 📄 License

Project ini menggunakan lisensi **MIT License**. Lihat file [LICENSE](LICENSE) untuk detail lengkap.

---

<p align="center">
  Made with ❤️ by <a href="https://github.com/Tedshub">Tedshub</a><br>
  <strong>DSS Net - Memberdayakan Keputusan Cerdas</strong>
</p>

## 🔗 Links

- [🌐 Live Demo](https://dss-net-demo.com) 
- [📖 Documentation](https://docs.dss-net.com)
- [🎥 Video Tutorial](https://youtube.com/dss-net-tutorial)
- [📱 Mobile App](https://github.com/Tedshub/dss-net-mobile)

---

**⭐ Jika project ini membantu, jangan lupa kasih star!**
