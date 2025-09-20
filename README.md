# Laravel React Posts App

A full-stack CRUD application for managing posts, built with Laravel as the backend API and React with Tailwind CSS as the frontend.



## 🛠️ Tech Stack

### Backend
- **Laravel 11** - PHP framework
- **MySQL** - Database
- **Eloquent ORM** - Database operations
- **Laravel API Resources** - API responses

### Frontend
- **React 18** - UI library
- **Vite** - Build tool
- **Tailwind CSS** - Styling
- **Axios** - HTTP client
- **Modern JavaScript (ES6+)**

## 📋 Prerequisites

Before running this application, make sure you have the following installed:

- **PHP >= 8.2**
- **Composer**
- **Node.js >= 16**
- **npm or yarn**
- **MySQL**

## ⚡ Quick Start

### 1. Clone the Repository

```bash
git clone https://github.com/smail-yazidi/Laravel-React.git
cd Laravel-React
```

### 2. Backend Setup (Laravel)

```bash
# Navigate to backend directory
cd backend

# Install PHP dependencies
composer install

# Create environment file
cp .env.example .env

# Generate application key
php artisan key:generate

# Configure your database in .env file
DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=laravel_posts
DB_USERNAME=your_username
DB_PASSWORD=your_password

# Create database
mysql -u root -p -e "CREATE DATABASE laravel_posts;"

# Run migrations
php artisan migrate

# Seed the database with sample data
php artisan db:seed

# Start the Laravel development server
php artisan serve
```

### 3. Frontend Setup (React)

```bash
# Navigate to frontend directory (open new terminal)
cd frontend

# Install Node dependencies
npm install

# Install Tailwind CSS
npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init -p

# Start the React development server
npm run dev
```

## 🔧 Configuration

### Backend Configuration

1. **Database Setup**
   ```env
   # .env
   DB_CONNECTION=mysql
   DB_HOST=127.0.0.1
   DB_PORT=3306
   DB_DATABASE=laravel_posts
   DB_USERNAME=your_username
   DB_PASSWORD=your_password
   ```

2. **API Routes** (already configured in `routes/api.php`)
   ```php
   Route::get('/posts', [PostController::class, 'index']);
   Route::get('/posts/{id}', [PostController::class, 'show']);
   Route::post('/posts', [PostController::class, 'store']);
   Route::put('/posts/{id}', [PostController::class, 'update']);
   Route::delete('/posts/{id}', [PostController::class, 'destroy']);
   ```

### Frontend Configuration

1. **API Configuration** (`frontend/src/api.js`)
   ```javascript
   import axios from 'axios';

   const api = axios.create({
     baseURL: 'http://127.0.0.1:8000/api',
     headers: {
       'Content-Type': 'application/json',
       'Accept': 'application/json'
     }
   });

   export default api;
   ```

2. **Tailwind CSS** (`tailwind.config.js`)
   ```javascript
   export default {
     content: [
       "./index.html",
       "./src/**/*.{js,ts,jsx,tsx}",
     ],
     theme: {
       extend: {},
     },
     plugins: [],
   }
   ```

## 📁 Project Structure

```
Laravel-React/
├── backend/                 # Laravel API
│   ├── app/
│   │   ├── Http/Controllers/
│   │   │   └── PostController.php
│   │   └── Models/
│   │       └── Post.php
│   ├── database/
│   │   ├── migrations/
│   │   └── seeders/
│   ├── routes/
│   │   ├── api.php
│   │   └── web.php
│   └── ...
├── frontend/               # React App
│   ├── public/
│   ├── src/
│   │   ├── components/
│   │   ├── api.js
│   │   ├── App.jsx
│   │   ├── App.css
│   │   └── main.jsx
│   ├── package.json
│   └── ...
└── README.md
```

## 🔄 API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET    | `/api/posts` | Get all posts |
| GET    | `/api/posts/{id}` | Get single post |
| POST   | `/api/posts` | Create new post |
| PUT    | `/api/posts/{id}` | Update post |
| DELETE | `/api/posts/{id}` | Delete post |

### Request/Response Examples

**GET /api/posts**
```json
[
  {
    "id": 1,
    "title": "Getting Started with Laravel",
    "content": "Laravel is a powerful PHP framework...",
    "author": "John Doe"
  }
]
```

**POST /api/posts**
```json
// Request Body
{
  "title": "New Post Title",
  "content": "Post content here...",
  "author": "Jane Smith"
}

// Response
{
  "id": 2,
  "title": "New Post Title",
  "content": "Post content here...",
  "author": "Jane Smith"
}
```

## 🎨 UI Features

- **Responsive Grid Layout** - Adapts to different screen sizes
- **Loading States** - Animated spinners during API calls
- **Error Handling** - User-friendly error messages
- **Form Validation** - Client-side and server-side validation
- **Hover Effects** - Interactive card animations
- **Modal Forms** - Clean inline editing experience
- **Confirmation Dialogs** - Safe delete operations

## 🚨 Troubleshooting

### Common Issues

1. **CORS Errors**
   - Make sure your Laravel routes are in `routes/api.php`
   - Verify API routes are enabled in `bootstrap/app.php`

2. **Database Connection Errors**
   - Check your `.env` database configuration
   - Ensure MySQL service is running
   - Verify database and user exist

3. **404 Not Found on API Routes**
   - Run `php artisan route:list` to verify routes are registered
   - Clear Laravel cache: `php artisan config:clear`

4. **React Build Issues**
   - Delete `node_modules` and run `npm install` again
   - Check Node.js version compatibility

### Useful Commands

```bash
# Laravel
php artisan route:list          # List all routes
php artisan migrate:fresh --seed # Reset database with fresh data
php artisan config:clear        # Clear config cache
php artisan cache:clear         # Clear application cache

# React
npm run build                   # Build for production
npm run preview                 # Preview production build
```


**Your Name**
- GitHub: [Smail Yazidi](https://github.com/smail-yazidi)
- Email: your.email@example.com

## 🙏 Acknowledgments

- Laravel Framework Team
- React Team
- Tailwind CSS Team
- All open source contributors

---

**Happy Coding! 🚀**