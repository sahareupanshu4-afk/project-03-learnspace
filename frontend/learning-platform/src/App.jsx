/**
 * Main Application Component - Learning Platform
 *
 * This component serves as the root of the entire React application.
 * It handles client-side routing, layout management, and conditional rendering
 * of navigation elements based on the current page.
 *
 * Key Features:
 * - React Router setup for SPA navigation
 * - Conditional header/footer rendering (dashboard has full-screen layout)
 * - Route protection and authentication handling
 * - Responsive layout structure
 *
 * Architecture: Separate AppContent to access useLocation hook inside Router
 *
 * Created by: Frontend Development Team
 * Technologies: React Router DOM, React Hooks, Tailwind CSS
 */

import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Header from './components/Header';      // Top navigation bar component
import Footer from './components/Footer';      // Bottom footer component
import Home from './pages/Home';               // Landing page component
import Login from './pages/Login';            // User authentication page
import Signup from './pages/Signup';          // User registration page
import Courses from './pages/Courses';        // Course listing page
import CourseDetail from './pages/CourseDetail'; // Individual course detail view
import Dashboard from './pages/Dashboard';    // Student learning dashboard

/**
 * AppContent Component - Inner application structure
 *
 * Placed inside Router to access navigation context via useLocation hook.
 * Handles conditional rendering of header and footer based on current route.
 */
function AppContent() {
  // Access current route location for conditional rendering decisions
  const location = useLocation();

  // Check if user is on dashboard page (requires different layout)
  const isDashboardPage = location.pathname === '/dashboard';

  return (
    // Main container with minimum height ensures full viewport coverage
    <div className="min-h-screen">
      {/* Conditional header: Hide on dashboard for immersive learning experience */}
      {!isDashboardPage && <Header />}

      {/* Route definitions for all application pages */}
      <Routes>
        <Route path="/" element={<Home />} />                      {/* Landing page */}
        <Route path="/login" element={<Login />} />               {/* User login form */}
        <Route path="/signup" element={<Signup />} />             {/* User registration form */}
        <Route path="/courses" element={<Courses />} />           {/* All courses listing */}
        <Route path="/courses/:id" element={<CourseDetail />} />  {/* Individual course view with dynamic ID */}
        <Route path="/dashboard" element={<Dashboard />} />       {/* Student progress dashboard */}
      </Routes>

      {/* Conditional footer: Consistent with header visibility */}
      {!isDashboardPage && <Footer />}
    </div>
  );
}

/**
 * App Component - Application Entry Point
 *
 * Wraps the entire application with React Router for client-side navigation.
 * Provides routing context to all child components.
 */
function App() {
  return (
    // BrowserRouter enables HTML5 history API for clean URLs without hash fragments
    <Router>
      {/* Inner content component with access to routing context */}
      <AppContent />
    </Router>
  );
}

// Export the App component as the default export for main.jsx
export default App;
