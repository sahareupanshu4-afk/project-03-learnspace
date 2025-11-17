/**
 * Login Page Component - User Authentication
 *
 * This page handles user sign-in functionality for the Learning Platform.
 * Features:
 * - OAuth authentication with Google
 * - Traditional email/password sign-in (UI only - backend form handling needed)
 * - Animated UI with futuristic design theme
 * - Responsive layout with floating background elements
 * - Integration with Supabase Auth service
 *
 * Security Considerations:
 * - OAuth provider integration for secure authentication
 * - Client-side validation (additional server validation recommended)
 * - JWT token management by Supabase
 *
 * Navigation Flow:
 * - Successful login redirects to /dashboard
 * - Failed login shows error messages
 * - Link to registration page for new users
 *
 * Dependencies:
 * - Framer Motion for animations
 * - Supabase Auth for authentication
 * - React Router for navigation
 * - Custom CSS classes for styling
 *
 * Created by: Authentication Development Team
 * Design: Futuristic cyberpunk theme with neon accents
 */

import { motion } from 'framer-motion';        // Animation library for smooth interactions
import { Link } from 'react-router-dom';       // React Router for navigation
import { Auth } from '@supabase/auth-ui-react';     // Supabase Auth UI components
import { ThemeSupa } from '@supabase/auth-ui-shared'; // Supabase Auth themes
import { supabase } from '../lib/supabase';          // Supabase client instance

/**
 * Login Component - Main authentication interface
 *
 * Renders the login form with multiple authentication methods.
 * Handles user sign-in and redirects upon success.
 */
const Login = () => {

  // NOTE: Form state management is currently missing
  // TODO: Add useState hooks for form inputs
  // const [email, setEmail] = useState('');
  // const [password, setPassword] = useState('');
  // const [loading, setLoading] = useState(false);
  // const [error, setError] = useState(null);

  return (
    <div className="min-h-screen flex items-center justify-center px-4 relative overflow-hidden">
      {/* Floating Elements */}
      <div className="floating-element" style={{ top: '30%', left: '25%' }}></div>
      <div className="floating-element" style={{ top: '50%', right: '25%' }}></div>
      <div className="floating-element" style={{ top: '70%', left: '15%' }}></div>
      <div className="floating-element" style={{ top: '40%', right: '15%' }}></div>

      {/* Matrix Background */}
      <div className="matrix-bg"></div>

      <motion.div
        initial={{ opacity: 0, scale: 0.8, rotateY: -15 }}
        animate={{ opacity: 1, scale: 1, rotateY: 0 }}
        transition={{ duration: 0.6, type: "spring", stiffness: 200 }}
        style={{ perspective: '1000px', transformStyle: 'preserve-3d' }}
      >
        <motion.div
          whileHover={{ scale: 1.02, rotateY: 2 }}
          transition={{ type: "spring", stiffness: 300 }}
          className="min-w-md neon-box glow-border card p-10 text-center relative z-10"
        >
          <motion.h2
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.2, type: "spring", stiffness: 260 }}
            className="text-4xl font-bold mb-4 gradient-text glow-text"
          >
            Welcome Back
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="text-gray-300 mb-12 text-lg text-center"
          >
            Sign in to continue your learning journey
          </motion.p>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="max-w-lg mx-auto"
          >
            <div className="text-center text-gray-300 mb-8">
              <p className="text-sm font-medium">Choose your sign-in method below</p>
            </div>

            {/* OAuth Sign In Button */}
            <div className="mb-8">
              <motion.button
                whileHover={{ scale: 1.08, y: -2 }}
                whileTap={{ scale: 0.95 }}
                className="relative w-full bg-gradient-to-r from-red-600 via-red-500 to-red-700 hover:from-red-500 hover:via-red-400 hover:to-red-600 text-white font-bold py-5 px-8 rounded-2xl transition-all duration-500 flex items-center justify-center space-x-5 overflow-hidden group disabled:opacity-50 disabled:cursor-not-allowed"
                onClick={() => supabase.auth.signInWithOAuth({
                  provider: 'google',
                  options: {
                    redirectTo: `${window.location.origin}/dashboard`,
                    queryParams: { prompt: 'select_account' }
                  }
                })}
                style={{
                  background: 'linear-gradient(135deg, #dc2626, #ef4444, #b91c1c)',
                  boxShadow: '0 20px 40px rgba(239, 68, 68, 0.3), 0 0 30px rgba(239, 68, 68, 0.2), inset 0 1px 0 rgba(255, 255, 255, 0.2)',
                  border: '2px solid rgba(239, 68, 68, 0.5)'
                }}
              >
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
                <div className="absolute inset-0 bg-gradient-to-t from-transparent via-transparent to-white/5 rounded-2xl"></div>
                <svg className="w-7 h-7 relative z-10 drop-shadow-lg" viewBox="0 0 24 24">
                  <path fill="currentColor" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                  <path fill="currentColor" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                  <path fill="currentColor" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                  <path fill="currentColor" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                </svg>
                <span className="text-xl font-extrabold relative z-10 tracking-wide drop-shadow-lg">Continue with Google</span>
                <div className="absolute -inset-1 bg-gradient-to-r from-red-400 via-red-500 to-red-600 rounded-2xl blur opacity-30 group-hover:opacity-60 transition-opacity duration-300"></div>
              </motion.button>
            </div>

            {/* Divider */}
            <div className="relative mb-6">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-purple-500/30"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-3 bg-gray-900 text-purple-300 font-medium">Or Sign In with Email</span>
              </div>
            </div>

            {/* Traditional Email/Password Form */}
            <form className="space-y-4">
              <div className="space-y-4">
                <div>
                  <label className="block text-gray-300 mb-2 font-medium">Email Address</label>
                  <input
                    type="email"
                    placeholder="Enter your email"
                    onChange={(e) => setEmail(e.target.value)}
                    className="input-primary w-full"
                  />
                </div>
                <div>
                  <label className="block text-gray-300 mb-2 font-medium">Password</label>
                  <input
                    type="password"
                    placeholder="Enter your password"
                    onChange={(e) => setPassword(e.target.value)}
                    className="input-primary w-full"
                  />
                </div>
              </div>

              <motion.button
                type="submit"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="btn-primary w-full"
              >
                Sign In
              </motion.button>
            </form>

            <div className="text-center mt-8 border-t border-purple-500/20 pt-6">
              <span className="text-gray-400 block mb-4">Don't have an account?</span>
              <motion.div
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.98 }}
                transition={{ type: "spring", stiffness: 400, damping: 17 }}
              >
                <Link
                  to="/signup"
                  className="inline-block px-8 py-4 bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-400 hover:to-emerald-500 text-white font-extrabold text-xl rounded-2xl transition-all duration-300 hover:shadow-2xl border-2 border-green-300/50"
                  onClick={() => console.log('Sign Up link clicked!')}
                  style={{
                    background: 'linear-gradient(135deg, #10b981, #059669)',
                    boxShadow: '0 8px 25px rgba(16, 185, 129, 0.3)',
                    textShadow: '0 2px 4px rgba(0,0,0,0.5)',
                    border: '3px solid rgba(16, 185, 129, 0.6)'
                  }}
                >
                  Create Account Here
                </Link>
              </motion.div>
            </div>
          </motion.div>

        </motion.div>
      </motion.div>
    </div>
  );
};

export default Login;
