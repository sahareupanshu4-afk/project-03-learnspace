/**
 * Header Component - Navigation and Authentication Bar
 *
 * The main navigation component for the Learning Platform application.
 * Features include:
 * - Dynamic navigation based on authentication state
 * - Smooth animations with Framer Motion
 * - Supabase authentication integration
 * - Responsive design with futuristic styling
 * - Conditional header for dashboard page
 *
 * Authentication Logic:
 * - Tracks user login state and role (student/instructor)
 * - Dynamically shows different menus based on auth status
 * - Handles logout with state cleanup
 *
 * Animation System:
 * - Page entry animations for visual appeal
 * - Hover effects with realistic physics
 * - Staggered menu item animations
 *
 * Created by: UI/UX Development Team
 * Technologies: React, React Router, Framer Motion, Supabase Auth, Tailwind CSS
 */

import { Link, useLocation } from 'react-router-dom';  // React Router for navigation
import { motion } from 'framer-motion';                // Animation library for smooth transitions
import { useState, useEffect } from 'react';           // React hooks for state management
import { supabase } from '../lib/supabase';            // Supabase client for authentication

/**
 * Header Component - Main Navigation Component
 *
 * Manages top navigation, authentication state, and responsive UI.
 * Adapts menu items based on user authentication and current page.
 */
const Header = () => {
  // User authentication state
  const [user, setUser] = useState(null);         // Current authenticated user object
  const [userRole, setUserRole] = useState(null); // User role: 'student' or 'instructor'

  // React Router location context for current page awareness
  const location = useLocation();

  /**
   * Authentication State Management
   *
   * This useEffect hook handles:
   * 1. Initial authentication check on component mount
   * 2. Real-time authentication state changes (login/logout)
   * 3. User role detection from Supabase metadata
   *
   * The cleanup function prevents memory leaks by unsubscribing from auth listener.
   */
  useEffect(() => {
    /**
     * getAuthState - Initialize authentication state on component mount
     * Checks existing Supabase session to determine if user is already logged in
     */
    const getAuthState = async () => {
      // Get current session from Supabase (persistent across browser refreshes)
      const { data: { session } } = await supabase.auth.getSession();

      if (session?.user) {
        // User is authenticated - set user state and extract role from metadata
        setUser(session.user);
        setUserRole(session.user.user_metadata?.role || 'student'); // Default to student role
      } else {
        // No active session - reset authentication state
        setUser(null);
        setUserRole(null);
      }
    };

    // Initialize authentication state
    getAuthState();

    /**
     * Real-time authentication listener
     * Automatically updates UI when user logs in/out from anywhere in the app
     * Prevents need for manual state synchronization
     */
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      // Handle authentication state changes (signin, signout, token_refresh)
      if (session?.user) {
        setUser(session.user);
        setUserRole(session.user.user_metadata?.role || 'student');
      } else {
        setUser(null);
        setUserRole(null);
      }
    });

    // Cleanup function: Remove auth listener when component unmounts
    return () => subscription.unsubscribe();
  }, []); // Empty dependency array - runs only on mount

  /**
   * Dynamic Menu Generation Based on Authentication State
   *
   * Returns appropriate navigation items based on:
   * - Authentication status (logged in or not)
   * - Current page location (dashboard vs other pages)
   * - User role (student vs instructor)
   *
   * This ensures users see relevant navigation options for their context.
   */
  const getMenuItems = () => {
    if (!user) {
      // Unauthenticated user - Show basic landing page navigation
      // Limited options to encourage sign-up
      return [
        { to: "/", label: "Home", icon: "🏠" },           // Landing page
        { to: "/courses", label: "Courses", icon: "📚" }, // Browse courses (read-only)
        { to: "/login", label: "Login", icon: "🔑" }      // Authentication entry point
      ];
    } else if (location.pathname === '/dashboard') {
      // Dashboard context - Minimal navigation to maintain focus
      // Dashboard already shows comprehensive learning progress
      return [
        { to: "/courses", label: "Browse Courses", icon: "📚" } // Find new courses to enroll
      ];
    } else {
      // Authenticated user on regular pages - Full navigation access
      // Access to personalized learning features
      return [
        { to: "/dashboard", label: "Dashboard", icon: "📊" }, // Learning progress overview
        { to: "/courses", label: "Courses", icon: "📚" }       // Course catalog
      ];
    }
  };

  // Generate menu items array based on current state
  const menuItems = getMenuItems();

  /**
   * User Logout Handler
   *
   * Performs secure logout process:
   * 1. Calls Supabase auth.signOut() to invalidate session
   * 2. Forces page reload to completely reset application state
   * 3. Clears any cached user data and redirects to landing page
   */
  const handleLogout = async () => {
    await supabase.auth.signOut(); // End Supabase authentication session
    window.location.reload();       // Complete state reset and redirect
  };

  return (
    <motion.header
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="fixed top-0 left-0 right-0 bg-black/80 border-b border-purple-500/30 px-6 py-5 z-50"
      style={{ boxShadow: '0 10px 30px rgba(0,0,0,0.3)' }}
    >
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <motion.div
          whileHover={{ scale: 1.05, rotateY: 5 }}
          transition={{ type: "spring", stiffness: 300 }}
          style={{ perspective: '1000px', transformStyle: 'preserve-3d' }}
        >
          <Link to="/" className="text-3xl font-bold gradient-text glow-text flex items-center space-x-2">
            <span>🚀</span>
            <span>LearnSpace</span>
          </Link>
        </motion.div>

        <nav className="flex space-x-2">
          {menuItems.map((item, index) => (
            <motion.div
              key={item.label}
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
              className="relative"
            >
              <motion.div
                whileHover={{
                  scale: 1.05,
                  y: -2,
                  boxShadow: '0 10px 20px rgba(147, 51, 234, 0.3)'
                }}
                whileTap={{ scale: 0.95 }}
                className="group relative overflow-hidden rounded-full bg-black/20 px-4 py-2 transition-all duration-300"
              >
                <Link
                  to={item.to}
                  className="gradient-text glow-text flex items-center space-x-2 relative z-10"
                >
                  <span className="text-lg text-cyan-300 group-hover:animate-bounce">{item.icon}</span>
                  <span className="font-medium">{item.label}</span>
                </Link>
                <div className="absolute inset-0 bg-gradient-to-r from-purple-600/20 to-pink-600/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </motion.div>
            </motion.div>
          ))}

          {user ? (
            // Logged in user section
            <div className="flex items-center space-x-4 ml-4">
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: 0.6, type: "spring", stiffness: 300 }}
                className="flex items-center space-x-2 bg-gradient-to-r from-purple-600/20 to-pink-600/20 border border-purple-500/30 rounded-full px-4 py-2"
              >
                <span className="text-sm text-cyan-300">👨‍🎓</span>
                <span className="text-white font-medium">{userRole === 'instructor' ? 'Instructor' : 'Student'}</span>
              </motion.div>

              <motion.button
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: 0.7, type: "spring", stiffness: 300 }}
                whileHover={{
                  scale: 1.05,
                  boxShadow: '0 10px 25px rgba(239, 68, 68, 0.3)'
                }}
                whileTap={{ scale: 0.95 }}
                onClick={handleLogout}
                className="bg-gradient-to-r from-red-600 to-red-700 hover:from-red-500 hover:to-red-600 text-white px-4 py-2 rounded-lg font-medium flex items-center space-x-2 transition-all duration-300"
              >
                <span>🚪</span>
                <span>Logout</span>
              </motion.button>
            </div>
          ) : (
            // Not logged in - original Get Started button
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.6, type: "spring", stiffness: 300 }}
              className="ml-4"
            >
              <motion.div
                whileHover={{
                  scale: 1.1,
                  boxShadow: '0 20px 40px rgba(147, 51, 234, 0.4), 0 0 20px rgba(236, 72, 153, 0.3)'
                }}
                whileTap={{ scale: 0.95 }}
                className="relative overflow-hidden rounded-xl"
              >
                <Link
                  to="/signup"
                  className="btn-primary btn-pulse flex items-center space-x-2 px-6 py-2"
                >
                  <span>✨</span>
                  <span>Get Started</span>
                </Link>
                <div
                  className="absolute inset-0 rounded-xl opacity-0"
                  style={{
                    background: 'conic-gradient(from 0deg, transparent, rgba(147, 51, 234, 0.5), transparent)',
                    animation: 'rotate 2s linear infinite'
                  }}
                ></div>
              </motion.div>
            </motion.div>
          )}
        </nav>
      </div>
    </motion.header>
  );
};

export default Header;
