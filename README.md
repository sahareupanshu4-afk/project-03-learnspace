# 🚀 LearnSpace - Online Learning Platform

An immersive, futuristic full-stack online learning platform designed with modern UI/UX principles and seamless user experience.

## ✨ Features

### 🎓 Core Learning Platform
- **Course Management**: Create, browse, and enroll in comprehensive courses
- **Interactive Lessons**: Engage with video content, quizzes, and assessments
- **Progress Tracking**: Monitor your learning journey with detailed analytics
- **User Dashboard**: Personalized learning space with progress visualization

### 🔐 Authentication & Security
- **Supabase Auth Integration**: Secure user authentication with OAuth providers
- **Role-Based Access**: Support for students and instructors
- **Real-time Sessions**: Persistent login across sessions

### 💳 Advanced Features (Ready for Integration)
- **Payment Gateway**: Stripe/Razorpay integration for course purchases
- **Admin Dashboard**: Comprehensive analytics and course management
- **Video Streaming**: Optimized video delivery system

### 🎨 Futuristic UI/UX
- **Dark Cyberpunk Theme**: Neon accents with gradient backgrounds
- **Smooth Animations**: Framer Motion powered transitions
- **Responsive Design**: Mobile-first approach with adaptive layouts
- **Animated Backgrounds**: Matrix-style floating elements

## 🛠️ Tech Stack

### Frontend
- **React 18** with Vite build system
- **React Router DOM** for client-side routing
- **Framer Motion** for advanced animations
- **Tailwind CSS** for utility-first styling
- **TypeScript Ready** structure for scaling

### Backend
- **Node.js** with Express framework
- **Supabase** for backend services (Auth, Database, Storage)
- **CORS** enabled for cross-origin requests
- **Helmet** for security headers
- **Morgan** for request logging

### Database & Services
- **Supabase PostgreSQL** for data persistence
- **Supabase Auth** for user management
- **Supabase Storage** for file uploads (videos, images)
- **Stripe Integration** prepared for payments

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ and npm installed
- Git for version control
- Supabase account for backend services

### Backend Setup

```bash
cd backend
npm install
# Copy environment variables
cp .env.example .env
# Configure your Supabase credentials in .env
npm start
```

### Frontend Setup

```bash
cd frontend/learning-platform
npm install
# Configure Supabase in .env
cp .env.example .env
npm run dev
```

### Environment Configuration

Create `.env` files with your Supabase credentials:

#### Backend (.env)
```
SUPABASE_URL=your_supabase_project_url
SUPABASE_ANON_KEY=your_anon_key
SUPABASE_SERVICE_ROLE=your_service_role_key
```

#### Frontend (.env)
```
VITE_SUPABASE_URL=your_supabase_project_url
VITE_SUPABASE_ANON_KEY=your_anon_key
```

## 📁 Project Structure

```
learnspace/
├── backend/
│   ├── server.js           # Express server with all API endpoints
│   ├── package.json        # Backend dependencies
│   ├── .env               # Environment variables
│   └── README.md          # Backend documentation
├── frontend/
│   └── learning-platform/
│       ├── src/
│       │   ├── components/    # Reusable UI components
│       │   │   ├── Header.jsx    # Navigation & auth bar
│       │   │   └── Footer.jsx    # Site footer
│       │   ├── pages/         # Page components
│       │   │   ├── Login.jsx     # Authentication page
│       │   │   ├── Signup.jsx    # Registration page
│       │   │   ├── Dashboard.jsx # Student dashboard
│       │   │   ├── Courses.jsx   # Course listing
│       │   │   └── CourseDetail.jsx # Individual course
│       │   ├── lib/           # Utilities and services
│       │   │   └── supabase.js   # Supabase client
│       │   ├── App.jsx        # Main app component & routing
│       │   ├── main.jsx       # React app entry point
│       │   └── index.css      # Global styles & Tailwind
│       ├── public/           # Static assets
│       ├── index.html        # Main HTML template
│       ├── vite.config.js    # Vite configuration
│       ├── tailwind.config.js # Tailwind theme customization
│       ├── package.json      # Frontend dependencies
│       └── .env             # Environment variables
├── .gitignore             # Git ignore rules
└── README.md             # This file
```

## 🔗 API Endpoints

### Authentication
- `POST /auth/signup` - User registration
- `POST /auth/login` - User login
- `GET /auth/profile` - Get user profile

### Courses
- `GET /courses` - List all courses
- `GET /courses/:id` - Get course details
- `POST /courses` - Create new course

### Lessons & Content
- `GET /lessons/:courseId` - Get course lessons
- `GET /lessons/:id` - Get specific lesson

### Assessments
- `GET /quiz/:courseId` - Get course quiz
- `POST /quiz/submit` - Submit quiz answers

### Progress Tracking
- `GET /progress/:userId/:courseId` - Get learning progress
- `POST /progress/update` - Update progress

## 🎨 Design Philosophy

### Cyberpunk Aesthetic
- **Color Palette**: Neon purples, cyans, and electric blues
- **Typography**: Futuristic fonts with glow effects
- **Animations**: Smooth entries with physics-based interactions
- **Layout**: Dark backgrounds with high contrast elements

### User Experience
- **Intuitive Navigation**: Clear visual hierarchy and breadcrumbs
- **Loading States**: Smooth transitions and skeleton screens
- **Error Handling**: User-friendly error messages and recovery
- **Accessibility**: ARIA labels and keyboard navigation support

## 🚀 Deployment

### Production Build
```bash
# Frontend
cd frontend/learning-platform
npm run build

# Backend
cd backend
npm start
```

### Environment Variables for Production
Ensure all `.env` variables are configured for production:
- Supabase production project URLs
- Stripe API keys (when implemented)
- JWT secrets and session configurations

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **Design Inspiration**: Cyberpunk 2077 and futuristic UI trends
- **Icons**: Heroicons and custom SVG implementations
- **Animations**: Framer Motion documentation and examples
- **Authentication**: Supabase Auth best practices

## 📞 Support

For support and questions:
- Create an issue on GitHub
- Documentation available in `/docs` folder (coming soon)

---

**Built with ❤️ for the future of online learning**
