import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import { supabase } from '../lib/supabase';

const Signup = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleOAuthSignup = () => {
    if (!role) {
      setError('Please select whether you want to join as a Student or Instructor');
      return;
    }
    supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: `${window.location.origin}/dashboard`,
        queryParams: { prompt: 'select_account' }
      }
    });
  };

  const handleTraditionalSignup = async (e) => {
    e.preventDefault();
    if (!email || !password) {
      setError('Please fill in both email and password');
      setLoading(false);
      return;
    }
    if (!role) {
      setError('Please select whether you want to join as a Student or Instructor');
      setLoading(false);
      return;
    }

    setLoading(true);
    setError('');

    try {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: { role: role }
        }
      });

      if (error) {
        setError(error.message);
      } else {
        alert('✅ Account created successfully! Please check your email to verify your account.');
        // Note: In a real app, we'd redirect to a confirmation page
      }
    } catch (err) {
      setError('Network error occurred. Please try again.');
      console.error('Signup error:', err);
    }

    setLoading(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 relative overflow-hidden">
      {/* Floating Elements */}
      <div className="floating-element" style={{ top: '25%', left: '30%' }}></div>
      <div className="floating-element" style={{ top: '45%', right: '20%' }}></div>
      <div className="floating-element" style={{ top: '65%', left: '25%' }}></div>
      <div className="floating-element" style={{ top: '35%', right: '35%' }}></div>

      {/* Matrix Background */}
      <div className="matrix-bg"></div>

      <motion.div
        initial={{ opacity: 0, scale: 0.8, rotateY: 15 }}
        animate={{ opacity: 1, scale: 1, rotateY: 0 }}
        transition={{ duration: 0.6, type: "spring", stiffness: 200 }}
        style={{ perspective: '1000px', transformStyle: 'preserve-3d' }}
      >
        <motion.div
          whileHover={{ scale: 1.02, rotateY: -2 }}
          transition={{ type: "spring", stiffness: 300 }}
          className="w-full max-w-2xl neon-box glow-border card p-12 text-center relative z-10"
        >
          <motion.h2
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.2, type: "spring", stiffness: 260 }}
            className="text-4xl font-bold mb-3 gradient-text glow-text"
          >
            Join LearnSpace
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="text-gray-300 mb-10 text-lg"
          >
            Start your learning journey today
          </motion.p>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="max-w-md mx-auto"
          >
            {/* Role Selection */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="mb-8 text-center"
            >
              <p className="text-gray-300 mb-6 font-medium text-lg">Choose your role:</p>
              <div className="flex justify-center space-x-6">
                <motion.button
                  whileHover={{ scale: role === 'student' ? 1 : 1.08, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  className={`relative px-10 py-6 rounded-2xl border-2 transition-all duration-500 overflow-hidden ${
                    role === 'student'
                      ? 'bg-gradient-to-br from-purple-600/50 via-purple-500/40 to-purple-700/60 border-purple-400/80 text-purple-100 shadow-2xl shadow-purple-500/40'
                      : 'bg-gradient-to-br from-gray-800/50 to-purple-900/30 border-purple-500/40 text-purple-300 hover:border-purple-400/60 hover:shadow-xl hover:shadow-purple-500/20 backdrop-blur-sm'
                  } group`}
                  onClick={() => setRole('student')}
                  type="button"
                  style={{
                    background: role === 'student'
                      ? 'linear-gradient(135deg, rgba(147, 51, 234, 0.6), rgba(124, 58, 237, 0.4), rgba(147, 51, 234, 0.7))'
                      : 'linear-gradient(135deg, rgba(31, 41, 55, 0.5), rgba(88, 28, 135, 0.3))',
                    boxShadow: role === 'student'
                      ? '0 20px 40px rgba(147, 51, 234, 0.3), 0 0 30px rgba(147, 51, 234, 0.2)'
                      : ''
                  }}
                >
                  <div className={`absolute inset-0 opacity-0 group-hover:opacity-30 transition-opacity duration-300 ${
                    role === 'student' ? 'bg-purple-300' : 'bg-purple-400'
                  } blur-xl`}></div>
                  <div className="relative z-10 flex flex-col items-center space-y-3">
                    <div className={`text-4xl transform transition-transform duration-300 ${
                      role === 'student' ? 'scale-110' : 'group-hover:scale-110'
                    }`}>
                      🎓
                    </div>
                    <div>
                      <div className={`text-lg font-bold mb-1 ${
                        role === 'student' ? 'text-white' : 'group-hover:text-white'
                      } transition-colors duration-300`}>
                        Student
                      </div>
                      <div className="text-sm font-medium opacity-90">
                        Learn & Grow
                      </div>
                    </div>
                  </div>
                  {role === 'student' && (
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      className="absolute -top-1 -right-1 w-4 h-4 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full shadow-lg flex items-center justify-center"
                    >
                      <span className="text-white text-xs">✓</span>
                    </motion.div>
                  )}
                </motion.button>

                <motion.button
                  whileHover={{ scale: role === 'instructor' ? 1 : 1.08, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  className={`relative px-10 py-6 rounded-2xl border-2 transition-all duration-500 overflow-hidden ${
                    role === 'instructor'
                      ? 'bg-gradient-to-br from-pink-600/50 via-pink-500/40 to-pink-700/60 border-pink-400/80 text-pink-100 shadow-2xl shadow-pink-500/40'
                      : 'bg-gradient-to-br from-gray-800/50 to-pink-900/30 border-pink-500/40 text-pink-300 hover:border-pink-400/60 hover:shadow-xl hover:shadow-pink-500/20 backdrop-blur-sm'
                  } group`}
                  onClick={() => setRole('instructor')}
                  type="button"
                  style={{
                    background: role === 'instructor'
                      ? 'linear-gradient(135deg, rgba(236, 72, 153, 0.6), rgba(219, 39, 119, 0.4), rgba(236, 72, 153, 0.7))'
                      : 'linear-gradient(135deg, rgba(31, 41, 55, 0.5), rgba(136, 19, 55, 0.3))',
                    boxShadow: role === 'instructor'
                      ? '0 20px 40px rgba(236, 72, 153, 0.3), 0 0 30px rgba(236, 72, 153, 0.2)'
                      : ''
                  }}
                >
                  <div className={`absolute inset-0 opacity-0 group-hover:opacity-30 transition-opacity duration-300 ${
                    role === 'instructor' ? 'bg-pink-300' : 'bg-pink-400'
                  } blur-xl`}></div>
                  <div className="relative z-10 flex flex-col items-center space-y-3">
                    <div className={`text-4xl transform transition-transform duration-300 ${
                      role === 'instructor' ? 'scale-110' : 'group-hover:scale-110'
                    }`}>
                      👨‍🏫
                    </div>
                    <div>
                      <div className={`text-lg font-bold mb-1 ${
                        role === 'instructor' ? 'text-white' : 'group-hover:text-white'
                      } transition-colors duration-300`}>
                        Instructor
                      </div>
                      <div className="text-sm font-medium opacity-90">
                        Teach & Inspire
                      </div>
                    </div>
                  </div>
                  {role === 'instructor' && (
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      className="absolute -top-1 -right-1 w-4 h-4 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full shadow-lg flex items-center justify-center"
                    >
                      <span className="text-white text-xs">✓</span>
                    </motion.div>
                  )}
                </motion.button>
              </div>
            </motion.div>

            {/* Google OAuth Button */}
            <div className="mb-6">
              {error && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="text-red-300 bg-red-500/10 border border-red-500/20 rounded-lg p-3 text-sm mb-4"
                >
                  {error}
                </motion.div>
              )}

              <motion.button
                onClick={handleOAuthSignup}
                disabled={!role}
                whileHover={{ scale: 1.05, y: -1 }}
                whileTap={{ scale: 0.98 }}
                className="w-full bg-gradient-to-r from-red-600 to-red-700 hover:from-red-500 hover:to-red-600 text-white font-semibold py-4 px-6 rounded-xl transition-all duration-300 flex items-center justify-center space-x-4 shadow-2xl hover:shadow-red-500/30 border border-red-500/20 disabled:opacity-50 disabled:cursor-not-allowed disabled:shadow-none"
              >
                <svg className="w-6 h-6" viewBox="0 0 24 24">
                  <path fill="currentColor" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                  <path fill="currentColor" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                  <path fill="currentColor" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                  <path fill="currentColor" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                </svg>
                <span className="text-lg">Continue with Google</span>
              </motion.button>
            </div>

            {/* Divider */}
            <div className="relative mb-6">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-purple-500/30"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-3 bg-gray-900 text-purple-300 font-medium">Or Create Account</span>
              </div>
            </div>

            {/* Traditional Email/Password Form */}
            <form onSubmit={handleTraditionalSignup} className="space-y-4">
              <div className="space-y-4">
                <div>
                  <label className="block text-gray-300 mb-2 font-medium">Email Address</label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="input-primary w-full"
                    placeholder="Enter your email"
                    required
                    disabled={loading}
                  />
                </div>

                <div>
                  <label className="block text-gray-300 mb-2 font-medium">Password</label>
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="input-primary w-full"
                    placeholder="Create a secure password"
                    required
                    disabled={loading}
                  />
                </div>
              </div>

              <motion.button
                type="submit"
                disabled={loading || !email || !password || !role}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="btn-primary w-full disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? 'Creating Account...' : '🎓 Create Account'}
              </motion.button>
            </form>

            <div className="text-center mt-6">
              <span className="text-gray-400">Already have an account?</span>
              <Link to="/login" className="text-purple-400 hover:text-purple-300 transition-colors ml-2 font-medium">
                Sign In
              </Link>
            </div>
          </motion.div>

        </motion.div>
      </motion.div>
    </div>
  );
};

export default Signup;
