# <img src="./leevro-frontend/src/assets/img/logo.svg" alt="Leevro-logo" width="100" height="50"> Leevro - Book Tracking App

> **Track your reading journey, one book at a time!**

Leevro is a modern web application for book enthusiasts who want to organize, track, and manage their personal reading collection. With an elegant interface and comprehensive features, Leevro makes managing your books simple and enjoyable.

**🚀 Future Vision**: Leevro is evolving into a complete **social network for book lovers** where readers can connect, share recommendations, discuss their favorite books, and build reading communities together.

## 🌟 Features Overview

**Experience the complete book tracking solution** - A full-stack application designed for readers who take their library seriously.

[![Angular](https://img.shields.io/badge/Angular-16-DD0031?style=flat&logo=angular&logoColor=white)](https://angular.io/)
[![Spring Boot](https://img.shields.io/badge/Spring%20Boot-3.x-6DB33F?style=flat&logo=spring&logoColor=white)](https://spring.io/projects/spring-boot)
[![TypeScript](https://img.shields.io/badge/TypeScript-4.9-3178C6?style=flat&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Java](https://img.shields.io/badge/Java-17+-ED8B00?style=flat&logo=java&logoColor=white)](https://openjdk.java.net/)
[![Angular Material](https://img.shields.io/badge/Angular_Material-16-FF4081?style=flat&logo=angular&logoColor=white)](https://material.angular.io/)

## ✨ Features

### 📚 **Personal Book Collection**
- **Comprehensive Library Management**: Organize your entire book collection in one place
- **Multiple Book Lists**: Separate your books into read, favorites, owned, and wishlist categories
- **Advanced Search & Filtering**: Find books by title, author, ISBN, or reading status
- **Dynamic Book Statistics**: Real-time tracking of your reading progress and collection growth

### 🎯 **Reading Tracking System**
- **Reading Progress**: Track books you're currently reading, completed, and planning to read
- **Personal Ratings**: Rate books with a 5-star system to remember your favorites
- **Favorites Management**: Mark and easily access your most loved books
- **Wishlist Feature**: Keep track of books you want to read or purchase

### 📱 **Modern User Interface**
- **Glassmorphism Design**: Beautiful, modern UI with blur effects and transparency
- **Responsive Layout**: Optimized for desktop, tablet, and mobile devices  
- **Grid & List Views**: Switch between visual grid cards and detailed list layouts
- **Real-time Search**: Instant filtering as you type
- **Loading States**: Smooth loading animations and user feedback

### 🔐 **User Management**
- **Secure Authentication**: User registration and login system
- **Personal Dashboard**: Overview of your reading statistics and quick navigation
- **Session Management**: Secure user sessions with automatic logout
- **User Profiles**: Personal reading data and preferences

### 💾 **Data Persistence**
- **RESTful API**: Complete backend with Spring Boot for data management
- **Real-time Sync**: Automatic synchronization between frontend and backend
- **Book Information**: Store detailed book metadata (title, author, pages, release date, description)
- **User Reviews**: Personal notes and reviews for each book

### 🎨 **Enhanced User Experience**
- **Interactive Cards**: Clickable statistics cards with hover effects and navigation
- **Dynamic Page Titles**: Context-aware page headers based on current view
- **Visual Feedback**: Toast notifications for user actions
- **Smooth Animations**: Elegant transitions and micro-interactions
- **Navigation System**: Intuitive routing with query parameters for filtered views

## 🚀 Technologies Used

### Frontend
- **Angular 16** - Modern TypeScript framework
- **Angular Material** - Comprehensive UI component library
- **Angular Router** - Client-side routing with query parameters
- **RxJS** - Reactive programming for HTTP requests
- **TypeScript** - Type-safe programming language
- **Angular Animations** - Smooth UI transitions
- **Bulma CSS** - Additional styling framework
- **ngx-toastr** - Toast notification system

### Backend (Spring Boot API)
- **Spring Boot 3.x** - Java backend framework
- **Spring Data JPA** - Data persistence layer
- **Spring Security** - Authentication and authorization
- **RESTful Architecture** - HTTP API endpoints
- **Java 17+** - Modern Java runtime
- **Hibernate** - Object-relational mapping
- **PostgreSQL/H2** - Database support

## 🏗️ Project Structure

```
leevro-app/
├── leevro-frontend/         # Angular Application
│   ├── src/app/
│   │   ├── dashboard/       # User dashboard with statistics
│   │   ├── books/           # Book catalog and management
│   │   ├── authors/         # Author information pages  
│   │   ├── home/            # Landing page with auth
│   │   ├── header/          # Navigation header component
│   │   ├── services/        # HTTP services and data management
│   │   ├── shared/          # Reusable components and utilities
│   │   └── core/            # Core services and interceptors
│   ├── src/assets/          # Images, fonts, and static resources
│   └── proxy.conf.json      # Development proxy configuration
│
├── leevro-backend/          # Spring Boot API (separate repository)
│   ├── src/main/java/       # Java source code
│   │   ├── controller/      # REST API endpoints
│   │   ├── service/         # Business logic layer
│   │   ├── model/           # JPA entities
│   │   ├── repository/      # Data access layer
│   │   └── dto/             # Data transfer objects
│   └── src/main/resources/  # Configuration files
│
└── README.md               # This file
```

## 🛠️ Installation and Setup

### Prerequisites
- **Node.js** 18+
- **Angular CLI** 16+
- **Java** 17+
- **Maven** or **Gradle**
- **Redis** - Required for session management and caching
- **Docker** (recommended for Redis setup)
- **PostgreSQL** (optional, H2 in-memory database available)

### 1. Clone the Repository
```bash
git clone https://github.com/igorpaiva/leevro-app.git
cd leevro-app
```

### 2. Frontend Setup

```bash
cd leevro-frontend

# Install dependencies
npm install

# Start development server
ng serve
```

Frontend will be available at `http://localhost:4200`

### 3. Redis Setup

Redis is required for session management and caching. The easiest way to run Redis is using Docker:

```bash
# Start Redis using Docker
docker run -p 6379:6379 redis

# Redis will be available at localhost:6379
```

Alternatively, you can install Redis locally following the [official Redis installation guide](https://redis.io/download).

### 4. Backend Setup

```bash
# Navigate to backend directory (if in same repo)
cd leevro-backend

# Configure database in application.properties
# src/main/resources/application.properties

# Run the Spring Boot application
./mvnw spring-boot:run
# or with Gradle: ./gradlew bootRun
```

Backend API will be available at `http://localhost:8080`

### 5. Database Configuration

The application supports both H2 (in-memory) and PostgreSQL databases. Configure in `application.properties`:

```properties
# For H2 (Development)
spring.datasource.url=jdbc:h2:mem:leevro
spring.jpa.hibernate.ddl-auto=create-drop

# For PostgreSQL (Production)
spring.datasource.url=jdbc:postgresql://localhost:5432/leevro
spring.datasource.username=your_username
spring.datasource.password=your_password
```

## 🎮 How to Use

### 1. **Create Your Account**
- Visit the application homepage
- Click "Sign Up" and fill in your details
- Confirm your registration and login

### 2. **Explore Your Dashboard**
- View your reading statistics at a glance
- See counts for read books, favorites, owned books, and wishlist
- Click on any statistic card to filter your book collection

### 3. **Manage Your Books**
- **Browse All Books**: Click "Books" to see the complete catalog
- **Filter by Status**: Use the dashboard cards to view specific book categories
- **Search**: Use the search bar to find books by title, author, or ISBN
- **Switch Views**: Toggle between grid cards and detailed list layouts

### 4. **Track Your Reading**
- **Add to Reading List**: Mark books you're currently reading
- **Rate Books**: Give 1-5 star ratings to books you've completed
- **Mark as Favorite**: Heart icon for your most loved books
- **Manage Wishlist**: Keep track of books you want to read

### 5. **Navigate Efficiently**
- **Dynamic Filtering**: Dashboard cards automatically filter your book view
- **Quick Actions**: Use book card overlays for fast management
- **Back Navigation**: Easy return to dashboard from any page

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the project
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 Roadmap

- [ ] **Enhanced Book Details**: Expanded book information pages with reviews
- [ ] **Social Features**: Share book recommendations and reading lists
- [ ] **Reading Goals**: Set and track annual reading targets
- [ ] **Book Import**: Import books from Goodreads, Amazon, or CSV files
- [ ] **Advanced Analytics**: Reading statistics and progress visualization
- [ ] **Mobile App**: Native iOS and Android applications
- [ ] **Offline Mode**: PWA support for offline book management
- [ ] **Book Club Features**: Create and join reading groups
- [ ] **Export Data**: Backup and export your book collection
- [ ] **Dark Mode**: Alternative color scheme option

## 🔧 API Endpoints

### Books
- `GET /api/books` - Get all books
- `GET /api/books/{id}` - Get book by ID
- `POST /api/books` - Create new book
- `DELETE /api/books/{id}` - Delete book

### Users & Reading Lists
- `GET /api/users/{id}` - Get user profile
- `GET /api/users/{id}/readBooks` - Get user's read books
- `GET /api/users/{id}/favoriteBooks` - Get favorite books
- `GET /api/users/{id}/ownedBooks` - Get owned books
- `GET /api/users/{id}/wishlist` - Get wishlist books
- `PATCH /api/users/{id}/readBooks/{bookId}` - Update reading status

## 📄 License

This project is under the MIT license. See the [LICENSE](LICENSE) file for more details.

## 👨‍💻 Author

**Igor Paiva**
- GitHub: [@igorpaiva](https://github.com/igorpaiva)
- LinkedIn: [Igor Paiva](https://linkedin.com/in/igor-paiva-araujo)

---

⭐ If this project helped you organize your reading life, please give it a star!

*Happy Reading! 📖*
