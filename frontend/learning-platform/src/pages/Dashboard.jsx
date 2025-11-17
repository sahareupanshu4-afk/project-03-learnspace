import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import { Line, Doughnut, Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, BarElement, ArcElement, Title, Tooltip, Legend } from 'chart.js';
import { supabase } from '../lib/supabase';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, ArcElement, Title, Tooltip, Legend);

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [userRole, setUserRole] = useState(null); // 'student' or 'instructor'
  const [loading, setLoading] = useState(true);

  // Set default tab based on user role when role is determined
  useEffect(() => {
    if (userRole === 'instructor' && activeTab === 'overview') {
      setActiveTab('courses');
    }
  }, [userRole, activeTab]);

  // Temporary: Force instructor role for demo (can be removed after proper auth setup)
  useEffect(() => {
    if (userRole === null && loading === false) {
      // For demo purposes, let's set instructor role
      const forceInstructorRole = async () => {
        try {
          const { data: { user } } = await supabase.auth.getUser();
          if (user) {
            // Update user metadata to set role as instructor
            await supabase.auth.updateUser({
              data: { role: 'instructor' }
            });
            setUserRole('instructor');
          }
        } catch (error) {
          console.log('Role setting error:', error);
        }
      };
      forceInstructorRole();
    }
  }, [loading, userRole]);

  // Check if user is logged in, if not redirect to login
  useEffect(() => {
    const checkUser = async () => {
      try {
        const { data: { user } } = await supabase.auth.getUser();
        if (!user) {
          window.location.href = '/login';
          return;
        }
      } catch (error) {
        console.error('Error checking auth:', error);
        window.location.href = '/login';
      }
    };
    checkUser();
  }, []);

  // Define tabs based on user role with enhanced theme customization
  const getTabs = () => {
    if (userRole === 'instructor') {
      return [
        {
          id: 'overview',
          label: 'Analytics',
          icon: '📊',
          theme: {
            primaryColor: '#8b5cf6',
            secondaryColor: '#06b6d4',
            bgGradient: 'from-blue-600/30 via-indigo-600/40 to-purple-600/50',
            glowColor: 'rgb(139, 92, 246)',
            accentColor: '#fbbf24',
            description: 'Dashboard Insights'
          }
        },
        {
          id: 'courses',
          label: 'Manage',
          icon: '👨‍🏫',
          theme: {
            primaryColor: '#ec4899',
            secondaryColor: '#f97316',
            bgGradient: 'from-pink-600/30 via-rose-600/40 to-orange-600/50',
            glowColor: 'rgb(236, 72, 153)',
            accentColor: '#10b981',
            description: 'Course Control'
          }
        },
        {
          id: 'students',
          label: 'Students',
          icon: '👥',
          theme: {
            primaryColor: '#06b6d4',
            secondaryColor: '#0ea5e9',
            bgGradient: 'from-cyan-600/30 via-blue-600/40 to-indigo-600/50',
            glowColor: 'rgb(6, 182, 212)',
            accentColor: '#8b5cf6',
            description: 'Student Network'
          }
        },
        {
          id: 'earnings',
          label: 'Revenue',
          icon: '💎',
          theme: {
            primaryColor: '#f59e0b',
            secondaryColor: '#eab308',
            bgGradient: 'from-yellow-600/30 via-amber-600/40 to-orange-600/50',
            glowColor: 'rgb(245, 158, 11)',
            accentColor: '#ef4444',
            description: 'Income Analytics'
          }
        },
        {
          id: 'reviews',
          label: 'Reviews',
          icon: '⭐',
          theme: {
            primaryColor: '#fa5f9c',
            secondaryColor: '#eab305',
            bgGradient: 'from-pink-600/30 via-purple-600/40 to-yellow-600/50',
            glowColor: 'rgb(250, 95, 156)',
            accentColor: '#06b6d4',
            description: 'Feedback Hub'
          }
        }
      ];
    } else {
      return [
        {
          id: 'overview',
          label: 'Overview',
          icon: '🎓',
          theme: {
            primaryColor: '#8b5cf6',
            secondaryColor: '#ec4899',
            bgGradient: 'from-purple-600/30 via-pink-600/40 to-violet-600/50',
            glowColor: 'rgb(139, 92, 246)',
            accentColor: '#06b6d4',
            description: 'Learning Hub'
          }
        },
        {
          id: 'courses',
          label: 'Courses',
          icon: '🚀',
          theme: {
            primaryColor: '#ec4899',
            secondaryColor: '#f97316',
            bgGradient: 'from-pink-600/30 via-red-600/40 to-orange-600/50',
            glowColor: 'rgb(236, 72, 153)',
            accentColor: '#8b5cf6',
            description: 'Course Library'
          }
        },
        {
          id: 'quizzes',
          label: 'Quizzes',
          icon: '🎲',
          theme: {
            primaryColor: '#06b6d4',
            secondaryColor: '#0ea5e9',
            bgGradient: 'from-cyan-600/30 via-blue-600/40 to-teal-600/50',
            glowColor: 'rgb(6, 182, 212)',
            accentColor: '#10b981',
            description: 'Test Arena'
          }
        },
        {
          id: 'progress',
          label: 'Progress',
          icon: '📈',
          theme: {
            primaryColor: '#10b981',
            secondaryColor: '#059669',
            bgGradient: 'from-emerald-600/30 via-green-600/40 to-teal-600/50',
            glowColor: 'rgb(16, 185, 129)',
            accentColor: '#f59e0b',
            description: 'Growth Track'
          }
        },
        {
          id: 'achievements',
          label: 'Awards',
          icon: '🏆',
          theme: {
            primaryColor: '#f59e0b',
            secondaryColor: '#d97706',
            bgGradient: 'from-amber-600/30 via-yellow-600/40 to-orange-600/50',
            glowColor: 'rgb(245, 158, 11)',
            accentColor: '#8b5cf6',
            description: 'Badge Vault'
          }
        }
      ];
    }
  };

  // Get user role on component mount
  useEffect(() => {
    const getUserRole = async () => {
      try {
        const { data: { user } } = await supabase.auth.getUser();
        if (user?.user_metadata?.role) {
          setUserRole(user.user_metadata.role);
        } else {
          // Default to student if no role found
          setUserRole('student');
        }
      } catch (error) {
        console.error('Error fetching user role:', error);
        setUserRole('student'); // fallback
      } finally {
        setLoading(false);
      }
    };

    getUserRole();
  }, []);

  // Sample data for charts
  const progressData = {
    labels: ['Week 1', 'Week 2', 'Week 3', 'Week 4', 'Week 5', 'Week 6'],
    datasets: [{
      label: 'Study Hours',
      data: [8, 12, 15, 10, 18, 22],
      borderColor: 'rgb(147, 51, 234)',
      backgroundColor: 'rgba(147, 51, 234, 0.1)',
      tension: 0.4
    }]
  };

  const quizData = {
    labels: ['React Basics', 'JavaScript Advanced', 'Python ML', 'Full Stack'],
    datasets: [{
      data: [85, 92, 78, 88],
      backgroundColor: [
        'rgba(255, 99, 132, 0.8)',
        'rgba(54, 162, 235, 0.8)',
        'rgba(255, 205, 86, 0.8)',
        'rgba(75, 192, 192, 0.8)'
      ],
      borderWidth: 0
    }]
  };

  const myCourses = [
    {
      id: 1,
      title: 'React for Beginners',
      instructor: 'John Doe',
      progress: 75,
      status: 'In Progress',
      nextLesson: 'Components & Props',
      icon: '⚛️',
      color: 'from-blue-500 to-blue-600'
    },
    {
      id: 2,
      title: 'Advanced JavaScript',
      instructor: 'Jane Smith',
      progress: 90,
      status: 'In Progress',
      nextLesson: 'Async Programming',
      icon: '🟨',
      color: 'from-yellow-500 to-orange-500'
    },
    {
      id: 3,
      title: 'Python Machine Learning',
      instructor: 'Alex Chen',
      progress: 45,
      status: 'In Progress',
      nextLesson: 'Data Preprocessing',
      icon: '🐍',
      color: 'from-green-500 to-emerald-500'
    }
  ];

  const availableCourses = [
    { id: 4, title: 'Full-Stack Development', instructor: 'Sarah Wilson', icon: '🚀', level: 'Advanced' },
    { id: 5, title: 'UI/UX Design', instructor: 'Mike Johnson', icon: '🎨', level: 'Intermediate' },
    { id: 6, title: 'Cybersecurity', instructor: 'Lisa Brown', icon: '🔒', level: 'Advanced' }
  ];

  const recentQuizzes = [
    { title: 'React Components Quiz', score: 85, date: '2025-01-15', status: 'Passed' },
    { title: 'JavaScript Functions', score: 92, date: '2025-01-12', status: 'Passed' },
    { title: 'Python Data Types', score: 78, date: '2025-01-10', status: 'Retake' }
  ];

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Floating Elements */}
      <div className="floating-element" style={{ top: '10%', left: '10%' }}></div>
      <div className="floating-element" style={{ top: '30%', right: '20%' }}></div>
      <div className="floating-element" style={{ top: '80%', left: '80%' }}></div>

      {/* Matrix Background */}
      <div className="matrix-bg"></div>

      <div className="container mx-auto px-6 py-8 relative z-10">
        {/* Advanced Header */}
        <motion.div
          initial={{ opacity: 0, y: -40, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.6, ease: "easeOut", type: "spring", stiffness: 100 }}
          className="mb-12 relative"
        >
          {/* Decorative Background Elements */}
          <div className="absolute -top-4 -left-4 w-20 h-20 bg-gradient-to-br from-purple-500/20 to-pink-500/20 rounded-full blur-xl"></div>
          <div className="absolute -bottom-2 -right-2 w-16 h-16 bg-gradient-to-br from-blue-500/20 to-cyan-500/20 rounded-full blur-lg"></div>

          <div className="relative z-10 bg-gradient-to-br from-black/40 to-gray-900/40 backdrop-blur-xl border border-gray-600/20 rounded-3xl p-8 shadow-2xl">
            <motion.h1
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2, duration: 0.6 }}
              className="text-6xl font-bold mb-4"
            >
              <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-red-400 bg-clip-text text-transparent animate-pulse">
                {userRole === 'instructor' ? '👨‍🏫 Instructor' : '🎓 LearnSpace'}
              </span>
              <br />
              <span className="bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400 bg-clip-text text-transparent">
                Dashboard
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4, duration: 0.6 }}
              className="text-gray-300 text-xl mb-6 leading-relaxed max-w-2xl"
            >
              {userRole === 'instructor'
                ? 'Transform your teaching impact with comprehensive analytics, course management, and student insights.'
                : 'Accelerate your learning journey with personalized progress tracking, achievements, and smart recommendations.'
              }
            </motion.p>

            {/* Logout Button */}
            <motion.button
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.4, duration: 0.6 }}
              whileHover={{
                scale: 1.05,
                borderColor: 'rgba(34, 197, 94, 0.4)'
              }}
              whileTap={{ scale: 0.95 }}
              onClick={async () => {
                try {
                  await supabase.auth.signOut();
                  window.location.href = '/login';
                } catch (error) {
                  console.error('Error logging out:', error);
                }
              }}
              className="absolute top-8 right-8 bg-black/30 backdrop-blur-md border border-yellow-500/20 text-white px-6 py-3 rounded-xl font-semibold hover:border-green-400/50 transition-all duration-300 shadow-lg z-20"
            >
              🚪 Logout
            </motion.button>

            {/* Key Metrics Bar */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.6 }}
              className="flex flex-wrap gap-6 text-center"
            >
              {userRole === 'instructor' ? [
                { value: '1,247', label: 'Active Students', color: 'text-green-400' },
                { value: '$12,487', label: 'Monthly Revenue', color: 'text-yellow-400' },
                { value: '4.8☆', label: 'Avg Rating', color: 'text-red-400' },
                { value: '8', label: 'Published Courses', color: 'text-purple-400' }
              ] : [
                { value: '12', label: 'Enrolled Courses', color: 'text-green-400' },
                { value: '156h', label: 'Learning Time', color: 'text-blue-400' },
                { value: '85%', label: 'Avg Score', color: 'text-yellow-400' },
                { value: '8', label: 'Certifications', color: 'text-purple-400' }
              ].map((metric, index) => (
                <motion.div
                  key={index}
                  whileHover={{ scale: 1.1, y: -2 }}
                  className="bg-black/30 border border-gray-500/20 rounded-xl px-4 py-3 backdrop-blur-sm"
                >
                  <div className={`text-2xl font-bold ${metric.color}`}>{metric.value}</div>
                  <div className="text-xs text-gray-400 uppercase tracking-wider">{metric.label}</div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </motion.div>

        {/* Ultra-Futuristic Professional Navigation */}
        <motion.div
          initial={{ opacity: 0, y: 20, scale: 0.98 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ delay: 0.1, type: "spring", stiffness: 300, damping: 20 }}
          className="mb-16"
        >
          {/* Main Navigation Container with Advanced Effects */}
          <div className="relative">
            {/* Outer Glow */}
            <div className="absolute -inset-2 bg-gradient-to-r from-purple-600/20 via-pink-500/20 to-purple-600/20 rounded-3xl blur-xl opacity-50"></div>

            {/* Inner Container */}
            <div className="relative bg-gradient-to-br from-gray-900/95 via-black/90 to-gray-900/95 backdrop-blur-2xl border-2 border-gradient-to-r from-purple-500/30 via-pink-500/30 to-purple-500/30 rounded-3xl p-8 shadow-2xl overflow-hidden">
              {/* Animated Background Particles */}
              <div className="absolute inset-0 opacity-30">
                {[...Array(15)].map((_, i) => (
                  <motion.div
                    key={i}
                    className="absolute w-1 h-1 bg-cyan-400 rounded-full"
                    animate={{
                      x: [0, Math.random() * 1000],
                      y: [0, Math.random() * 100],
                      opacity: [0, 1, 0]
                    }}
                    transition={{
                      duration: 3 + Math.random() * 2,
                      repeat: Infinity,
                      delay: Math.random() * 3
                    }}
                    style={{
                      left: `${Math.random() * 100}%`,
                      top: `${Math.random() * 100}%`
                    }}
                  />
                ))}
              </div>

              {/* Cyber Grid Background */}
              <div className="absolute inset-0 opacity-10">
                <div className="absolute inset-0" style={{
                  backgroundImage: `radial-gradient(circle at 25px 25px, cyan 2px, transparent 0), radial-gradient(circle at 75px 75px, pink 1px, transparent 0)`,
                  backgroundSize: '100px 100px'
                }}></div>
              </div>

              <div className="flex space-x-4 overflow-x-auto pb-4 scrollbar-hide relative z-10">
                {loading ? (
                  // Futuristic Loading State
                  <>
                    {[...Array(5)].map((_, i) => (
                      <motion.div
                        key={i}
                        initial={{ opacity: 0, scale: 0.8, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        transition={{ delay: i * 0.1, type: "spring", stiffness: 400 }}
                        className="relative inline-block"
                      >
                        {/* Loading Card with Glow */}
                        <div className="absolute -inset-1 bg-gradient-to-r from-purple-600 to-pink-600 rounded-2xl blur-md opacity-75 animate-pulse"></div>
                        <div className="relative w-36 h-16 bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl border border-gray-600/50 backdrop-blur-sm">
                          <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-cyan-500/20 to-purple-500/20 animate-pulse"></div>
                          <div className="relative h-full flex items-center justify-center">
                            <div className="w-8 h-8 bg-gradient-to-r from-cyan-400 to-purple-400 rounded-full animate-spin"></div>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </>
                ) : (
                  getTabs().map((tab, index) => (
                    <motion.button
                      key={tab.id}
                      initial={{ opacity: 0, x: -50, scale: 0.9 }}
                      animate={{ opacity: 1, x: 0, scale: 1 }}
                      transition={{
                        delay: 0.2 + index * 0.08,
                        type: "spring",
                        stiffness: 300,
                        damping: 25
                      }}
                      whileHover={{
                        scale: 1.08,
                        y: -8,
                        rotateX: 5,
                        rotateY: 5,
                        transformPerspective: 1000,
                        boxShadow: activeTab === tab.id
                          ? `0 35px 80px ${tab.theme.glowColor}59, 0 15px 40px ${tab.theme.secondaryColor}4D, 0 0 100px ${tab.theme.glowColor}33`
                          : `0 25px 60px rgba(107, 114, 128, 0.3), 0 10px 30px rgba(59, 130, 246, 0.2)`
                      }}
                      whileTap={{ scale: 0.96 }}
                      onClick={() => setActiveTab(tab.id)}
                      style={{
                        transformStyle: 'preserve-3d',
                        background: activeTab === tab.id
                          ? `linear-gradient(135deg, ${tab.theme.primaryColor} 0%, ${tab.theme.secondaryColor} 50%, ${tab.theme.primaryColor} 100%)`
                          : `linear-gradient(135deg, ${tab.theme.primaryColor}30 0%, ${tab.theme.secondaryColor}30 50%, ${tab.theme.primaryColor}50 100%)`,
                        borderColor: 'rgba(75, 85, 99, 0.4)',
                        color: activeTab === tab.id ? '#ffffff' : '#e5e7eb'
                      }}
                      className="relative px-10 py-6 rounded-3xl font-black transition-all duration-500 whitespace-nowrap overflow-hidden group shadow-2xl transform-gpu ring-2 ring-white/50"
                    >
                      {/* Multi-Layer Background Effects - Theme Customized */}
                      <div className="absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                        <div
                          className="absolute inset-0 rounded-3xl"
                          style={{
                            background: `linear-gradient(135deg, ${tab.theme.primaryColor}20 0%, ${tab.theme.secondaryColor}20 50%, ${tab.theme.accentColor}20 100%)`
                          }}
                        ></div>
                        <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/5 to-transparent rounded-3xl"></div>
                      </div>

                      {/* Animated Border Glow - Theme Colored */}
                      {activeTab === tab.id && (
                        <motion.div
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          transition={{ delay: 0.2 }}
                          className="absolute inset-0 rounded-3xl border-2 animate-pulse"
                          style={{
                            borderColor: tab.theme.glowColor,
                            background: `conic-gradient(from ${Date.now() / 50}deg, transparent, ${tab.theme.glowColor}80, transparent, ${tab.theme.secondaryColor}80, transparent, ${tab.theme.accentColor}80, transparent)`,
                            mask: 'linear-gradient(#fff 0 0) padding-box, linear-gradient(#fff 0 0)',
                            maskComposite: 'exclude',
                            WebkitMaskComposite: 'xor'
                          }}
                        />
                      )}

                      {/* Floating Geometric Shapes - Theme Colored */}
                      <div className="absolute inset-0 rounded-3xl overflow-hidden">
                        {[...Array(4)].map((_, i) => (
                          <motion.div
                            key={i}
                            className={`${i % 2 === 0 ? 'w-2 h-2' : 'w-1 h-1'} rounded-full absolute opacity-60`}
                            animate={{
                              x: [0, Math.random() * 100 - 50],
                              y: [0, Math.random() * -30],
                              opacity: [0, 0.8, 0],
                              rotate: [0, 360]
                            }}
                            transition={{
                              duration: 3 + Math.random() * 2,
                              repeat: Infinity,
                              delay: i * 0.8
                            }}
                            style={{
                              backgroundColor: i % 2 === 0 ? tab.theme.primaryColor : tab.theme.secondaryColor,
                              left: `${15 + i * 20}%`,
                              top: `${25 + (i % 2) * 30}%`,
                              position: 'absolute'
                            }}
                          />
                        ))}

                        {/* Energy Wave Effect - Theme Colored */}
                        <motion.div
                          className="absolute inset-0 rounded-3xl border"
                          style={{
                            borderColor: tab.theme.glowColor.replace('rgb', 'rgba').replace(')', ', 0.3)')
                          }}
                          animate={{
                            borderColor: [
                              tab.theme.glowColor.replace('rgb', 'rgba').replace(')', ', 0.3)'),
                              tab.theme.secondaryColor.replace('rgb', 'rgba').replace(')', ', 0.3)'),
                              tab.theme.accentColor.replace('rgb', 'rgba').replace(')', ', 0.3)'),
                              tab.theme.glowColor.replace('rgb', 'rgba').replace(')', ', 0.3)')
                            ]
                          }}
                          transition={{
                            duration: 3,
                            repeat: Infinity,
                            ease: "linear"
                          }}
                        />
                      </div>

                      {/* Icon with Advanced Animation */}
                      <motion.div className="relative z-10 flex items-center justify-center mb-2">
                        <motion.span
                          className="text-3xl block"
                          animate={activeTab === tab.id ? {
                            rotate: [0, 10, -10, 0],
                            scale: [1, 1.2, 1.1, 1],
                            filter: [
                              'brightness(1)',
                              `drop-shadow(0 0 10px ${tab.theme.glowColor})`,
                              'brightness(1)'
                            ]
                          } : {}}
                          transition={{
                            duration: 0.6,
                            repeat: activeTab === tab.id ? Infinity : 0,
                            repeatDelay: 2
                          }}
                        >
                          {tab.icon}
                        </motion.span>

                        {/* Icon Glow Effect - Theme Colored */}
                        {activeTab === tab.id && (
                          <motion.div
                            initial={{ scale: 0, opacity: 0 }}
                            animate={{ scale: 1.5, opacity: 0 }}
                            transition={{
                              duration: 2,
                              repeat: Infinity,
                              repeatType: "loop"
                            }}
                            className="absolute inset-0 rounded-full blur-md"
                            style={{
                              background: `radial-gradient(circle, ${tab.theme.glowColor}60, transparent)`
                            }}
                          />
                        )}
                      </motion.div>

                      {/* Title with Gradient Text */}
                      <motion.div className="relative z-10 text-center">
                        <span className={`text-xs font-bold uppercase tracking-widest block ${
                          activeTab === tab.id
                            ? `bg-gradient-to-r from-${tab.theme.primaryColor.split('#')[1] || tab.theme.primaryColor}-200 via-white to-${tab.theme.secondaryColor.split('#')[1] || tab.theme.secondaryColor}-200 bg-clip-text text-transparent`
                            : `text-gray-300 group-hover:text-${tab.theme.secondaryColor.split('#')[1] || tab.theme.secondaryColor}-300`
                        } transition-all duration-300`}>
                          {tab.label}
                        </span>
                        {/* Theme Description */}
                        <motion.span
                          initial={{ opacity: 0, scale: 0.8 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ delay: index * 0.1 + 0.5 }}
                          className="block text-xs text-gray-500 mt-1 uppercase tracking-wide"
                        >
                          {tab.theme.description}
                        </motion.span>
                      </motion.div>

                      {/* Cyberpunk Progress Lines - Theme Colored */}
                      {activeTab === tab.id && (
                        <motion.div
                          initial={{ scaleX: 0 }}
                          animate={{ scaleX: 1 }}
                          transition={{ delay: 0.3, duration: 0.5 }}
                          className="absolute bottom-2 left-2 right-2 h-0.5 rounded-full"
                          style={{
                            background: `linear-gradient(to right, ${tab.theme.glowColor}, ${tab.theme.secondaryColor}, ${tab.theme.accentColor})`,
                            transformOrigin: 'left'
                          }}
                        />
                      )}

                      {/* Theme-Specific Decorative Elements */}
                      {activeTab === tab.id && tab.theme.accentColor && (
                        <motion.div
                          initial={{ scale: 0, opacity: 0 }}
                          animate={{ scale: 1, opacity: 0.8 }}
                          transition={{ delay: 0.4 }}
                          className="absolute top-2 right-2 w-3 h-3 rounded-full"
                          style={{
                            background: `linear-gradient(45deg, ${tab.theme.accentColor}, ${tab.theme.secondaryColor})`
                          }}
                        />
                      )}

                      {/* 3D Shadow Effect - Theme Colored */}
                      <div
                        className="absolute -bottom-1 -right-1 w-4/5 h-4/5 bg-black/50 rounded-3xl blur-lg opacity-50 group-hover:opacity-75 transition-opacity duration-300"
                        style={{
                          filter: `blur(20px)`,
                          background: `radial-gradient(circle, ${tab.theme.glowColor}20, transparent)`
                        }}
                      ></div>
                    </motion.button>
                  ))
                )}
              </div>

              {/* Advanced Progress Indicator */}
              {!loading && (
                <motion.div
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: 1 }}
                  transition={{ delay: 0.5, duration: 0.8, type: "spring", stiffness: 200 }}
                  className="mt-6 relative"
                >
                  {/* Progress Bar Background */}
                  <div className="h-2 bg-gradient-to-r from-gray-800 to-gray-700 rounded-full overflow-hidden">
                    <motion.div
                      className="h-full bg-gradient-to-r from-cyan-400 via-purple-500 to-pink-500 rounded-full relative overflow-hidden"
                      style={{
                        width: `${((getTabs().findIndex(tab => tab.id === activeTab) + 1) / getTabs().length) * 100}%`
                      }}
                    >
                      {/* Animated Particles in Progress Bar */}
                      {[...Array(5)].map((_, i) => (
                        <motion.div
                          key={i}
                          className="absolute top-0 w-0.5 h-full bg-white opacity-70"
                          animate={{
                            x: ['0%', '100%']
                          }}
                          transition={{
                            duration: 0.8 + Math.random() * 0.5,
                            repeat: Infinity,
                            delay: i * 0.15,
                            ease: "easeInOut"
                          }}
                        />
                      ))}
                    </motion.div>
                  </div>

                  {/* Progress Text */}
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.7 }}
                    className="mt-3 text-center"
                  >
                    <span className="text-xs font-semibold text-gray-400 uppercase tracking-wider">
                      Section {getTabs().findIndex(tab => tab.id === activeTab) + 1} of {getTabs().length}
                    </span>
                  </motion.div>
                </motion.div>
              )}

              {/* Decorative Corner Elements */}
              <div className="absolute top-4 right-4 w-3 h-3 bg-gradient-to-br from-cyan-400 to-purple-400 rounded-full animate-pulse"></div>
              <div className="absolute bottom-4 left-4 w-2 h-2 bg-gradient-to-br from-pink-400 to-orange-400 rounded-full animate-pulse delay-1000"></div>
            </div>
          </div>
        </motion.div>

        {/* Tab Content */}
        {activeTab === 'overview' && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="space-y-8"
          >
            {/* Advanced Professional Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
              <motion.div
                whileHover={{
                  scale: 1.08,
                  y: -8,
                  boxShadow: '0 25px 60px rgba(147, 51, 234, 0.4), 0 0 40px rgba(147, 51, 234, 0.2)'
                }}
                transition={{ type: "spring", stiffness: 400, damping: 17 }}
                className="group relative bg-gradient-to-br from-purple-900/30 via-purple-800/20 to-purple-900/40 backdrop-blur-xl border-2 border-purple-500/40 rounded-2xl p-8 text-center overflow-hidden shadow-2xl hover:shadow-purple-500/30"
              >
                {/* Animated background gradients */}
                <div className="absolute inset-0 bg-gradient-to-br from-purple-600/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                <div className="absolute -top-2 -right-2 w-16 h-16 bg-gradient-to-br from-purple-400/30 to-pink-400/20 rounded-full blur-xl group-hover:blur-2xl transition-all duration-300"></div>

                <motion.div
                  className="relative z-10"
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ delay: 0.1, type: "spring", stiffness: 300 }}
                >
                  <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-purple-500 to-purple-600 rounded-2xl flex items-center justify-center shadow-lg group-hover:shadow-purple-400/50 transition-shadow duration-300">
                    <span className="text-2xl">📚</span>
                  </div>
                  <div className="text-4xl font-black text-white mb-1 group-hover:text-purple-100 transition-colors">12</div>
                  <div className="text-sm font-semibold text-purple-300 uppercase tracking-wider">Courses Enrolled</div>
                  <div className="mt-3 w-full h-1 bg-purple-500/20 rounded-full overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: "75%" }}
                      transition={{ delay: 0.5, duration: 1 }}
                      className="h-full bg-gradient-to-r from-purple-400 to-pink-400 rounded-full"
                    ></motion.div>
                  </div>
                </motion.div>
              </motion.div>

              <motion.div
                whileHover={{
                  scale: 1.08,
                  y: -8,
                  boxShadow: '0 25px 60px rgba(59, 130, 246, 0.4), 0 0 40px rgba(59, 130, 246, 0.2)'
                }}
                transition={{ type: "spring", stiffness: 400, damping: 17 }}
                className="group relative bg-gradient-to-br from-blue-900/30 via-blue-800/20 to-blue-900/40 backdrop-blur-xl border-2 border-blue-500/40 rounded-2xl p-8 text-center overflow-hidden shadow-2xl hover:shadow-blue-500/30"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-blue-600/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                <div className="absolute -top-2 -right-2 w-16 h-16 bg-gradient-to-br from-blue-400/30 to-cyan-400/20 rounded-full blur-xl group-hover:blur-2xl transition-all duration-300"></div>

                <motion.div
                  className="relative z-10"
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ delay: 0.2, type: "spring", stiffness: 300 }}
                >
                  <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center shadow-lg group-hover:shadow-blue-400/50 transition-shadow duration-300">
                    <span className="text-2xl">📊</span>
                  </div>
                  <div className="text-4xl font-black text-white mb-1 group-hover:text-blue-100 transition-colors">85%</div>
                  <div className="text-sm font-semibold text-blue-300 uppercase tracking-wider">Average Score</div>
                  <div className="mt-3 w-full h-1 bg-blue-500/20 rounded-full overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: "85%" }}
                      transition={{ delay: 0.6, duration: 1 }}
                      className="h-full bg-gradient-to-r from-blue-400 to-cyan-400 rounded-full"
                    ></motion.div>
                  </div>
                </motion.div>
              </motion.div>

              <motion.div
                whileHover={{
                  scale: 1.08,
                  y: -8,
                  boxShadow: '0 25px 60px rgba(34, 197, 94, 0.4), 0 0 40px rgba(34, 197, 94, 0.2)'
                }}
                transition={{ type: "spring", stiffness: 400, damping: 17 }}
                className="group relative bg-gradient-to-br from-green-900/30 via-green-800/20 to-green-900/40 backdrop-blur-xl border-2 border-green-500/40 rounded-2xl p-8 text-center overflow-hidden shadow-2xl hover:shadow-green-500/30"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-green-600/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                <div className="absolute -top-2 -right-2 w-16 h-16 bg-gradient-to-br from-green-400/30 to-emerald-400/20 rounded-full blur-xl group-hover:blur-2xl transition-all duration-300"></div>

                <motion.div
                  className="relative z-10"
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ delay: 0.3, type: "spring", stiffness: 300 }}
                >
                  <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-green-500 to-green-600 rounded-2xl flex items-center justify-center shadow-lg group-hover:shadow-green-400/50 transition-shadow duration-300">
                    <span className="text-2xl">⏱️</span>
                  </div>
                  <div className="text-4xl font-black text-white mb-1 group-hover:text-green-100 transition-colors">156h</div>
                  <div className="text-sm font-semibold text-green-300 uppercase tracking-wider">Hours Learned</div>
                  <div className="mt-3 w-full h-1 bg-green-500/20 rounded-full overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: "65%" }}
                      transition={{ delay: 0.7, duration: 1 }}
                      className="h-full bg-gradient-to-r from-green-400 to-emerald-400 rounded-full"
                    ></motion.div>
                  </div>
                </motion.div>
              </motion.div>

              <motion.div
                whileHover={{
                  scale: 1.08,
                  y: -8,
                  boxShadow: '0 25px 60px rgba(245, 158, 11, 0.4), 0 0 40px rgba(245, 158, 11, 0.2)'
                }}
                transition={{ type: "spring", stiffness: 400, damping: 17 }}
                className="group relative bg-gradient-to-br from-yellow-900/30 via-yellow-800/20 to-yellow-900/40 backdrop-blur-xl border-2 border-yellow-500/40 rounded-2xl p-8 text-center overflow-hidden shadow-2xl hover:shadow-yellow-500/30"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-yellow-600/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                <div className="absolute -top-2 -right-2 w-16 h-16 bg-gradient-to-br from-yellow-400/30 to-orange-400/20 rounded-full blur-xl group-hover:blur-2xl transition-all duration-300"></div>

                <motion.div
                  className="relative z-10"
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ delay: 0.4, type: "spring", stiffness: 300 }}
                >
                  <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-yellow-500 to-yellow-600 rounded-2xl flex items-center justify-center shadow-lg group-hover:shadow-yellow-400/50 transition-shadow duration-300">
                    <span className="text-2xl">🏆</span>
                  </div>
                  <div className="text-4xl font-black text-white mb-1 group-hover:text-yellow-100 transition-colors">8</div>
                  <div className="text-sm font-semibold text-yellow-300 uppercase tracking-wider">Certifications</div>
                  <div className="mt-3 w-full h-1 bg-yellow-500/20 rounded-full overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: "40%" }}
                      transition={{ delay: 0.8, duration: 1 }}
                      className="h-full bg-gradient-to-r from-yellow-400 to-orange-400 rounded-full"
                    ></motion.div>
                  </div>
                </motion.div>
              </motion.div>
            </div>

            {/* Minimized Charts Row */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                className="bg-black/30 backdrop-blur-md border border-purple-500/20 rounded-xl p-4 pb-6"
              >
                <h3 className="text-xl font-bold mb-3 text-purple-300">📈 Learning Progress</h3>
                <div className="h-32">
                  <Line data={progressData} height={120} />
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                className="bg-black/30 backdrop-blur-md border border-pink-500/20 rounded-xl p-4 pb-6"
              >
                <h3 className="text-xl font-bold mb-3 text-pink-300">📊 Quiz Performance</h3>
                <div className="h-32 flex items-center justify-center">
                  <Doughnut data={quizData} height={120} />
                </div>
              </motion.div>
            </div>

            {/* Recent Activity */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-black/30 backdrop-blur-md border border-blue-500/20 rounded-xl p-6"
            >
              <h3 className="text-xl font-bold mb-6 text-blue-400">🕒 Recent Activity</h3>
              <div className="space-y-4">
                {[
                  { activity: 'Completed React Components Quiz', time: '2 hours ago', icon: '✅' },
                  { activity: 'Finished lesson: Advanced Props', time: '1 day ago', icon: '📖' },
                  { activity: 'Enrolled in Python ML course', time: '2 days ago', icon: '🎓' },
                  { activity: 'Achieved certification: JavaScript Basics', time: '3 days ago', icon: '🏆' }
                ].map((item, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="flex items-center space-x-4 p-3 rounded-lg bg-gray-800/30 hover:bg-gray-700/30 transition-colors"
                  >
                    <span className="text-xl">{item.icon}</span>
                    <div className="flex-1">
                      <p className="text-white font-medium">{item.activity}</p>
                      <p className="text-gray-400 text-sm">{item.time}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </motion.div>
        )}

        {/* Student Course View */}
        {activeTab === 'courses' && userRole === 'student' && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="space-y-8"
          >
            {/* My Courses */}
            <div>
              <h2 className="text-3xl font-bold mb-6 text-purple-400">📚 My Courses</h2>
              <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
                {myCourses.map((course, index) => (
                  <motion.div
                    key={course.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    whileHover={{ scale: 1.05 }}
                    className="bg-black/30 backdrop-blur-md border border-gray-600/30 rounded-xl p-6 hover:border-purple-500/30 transition-all"
                  >
                    <div className="flex items-center space-x-3 mb-4">
                      <span className="text-3xl">{course.icon}</span>
                      <div>
                        <h3 className="text-lg font-bold text-white">{course.title}</h3>
                        <p className="text-gray-400">by {course.instructor}</p>
                      </div>
                    </div>

                    <div className="mb-4">
                      <div className="flex justify-between text-sm mb-2">
                        <span className="text-gray-300">Progress</span>
                        <span className="text-purple-400">{course.progress}%</span>
                      </div>
                      <div className="w-full bg-gray-700 rounded-full h-2">
                        <div
                          className="bg-gradient-to-r from-purple-500 to-pink-500 h-2 rounded-full transition-all duration-500"
                          style={{ width: `${course.progress}%` }}
                        ></div>
                      </div>
                    </div>

                    <div className="flex justify-between items-center mb-4">
                      <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                        course.status === 'In Progress' ? 'bg-blue-500/20 text-blue-300' : 'bg-green-500/20 text-green-300'
                      }`}>
                        {course.status}
                      </span>
                      <span className="text-gray-400 text-sm">Next: {course.nextLesson}</span>
                    </div>

                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="w-full bg-gradient-to-r from-purple-600 to-pink-600 text-white py-3 px-6 rounded-lg font-semibold hover:from-purple-500 hover:to-pink-500 transition-all"
                    >
                      Continue Learning
                    </motion.button>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Available Courses */}
            <div>
              <h2 className="text-3xl font-bold mb-6 text-blue-400">🌟 Recommended Courses</h2>
              <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
                {availableCourses.map((course, index) => (
                  <motion.div
                    key={course.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="bg-black/30 backdrop-blur-md border border-gray-600/30 rounded-xl p-6 hover:border-blue-500/30 transition-all"
                  >
                    <div className="text-5xl mb-4 text-center">{course.icon}</div>
                    <h3 className="text-xl font-bold text-white mb-2">{course.title}</h3>
                    <p className="text-gray-400 mb-4">by {course.instructor}</p>
                    <div className="flex justify-between items-center mb-4">
                      <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                        course.level === 'Advanced' ? 'bg-red-500/20 text-red-300' :
                        course.level === 'Intermediate' ? 'bg-yellow-500/20 text-yellow-300' :
                        'bg-green-500/20 text-green-300'
                      }`}>
                        {course.level}
                      </span>
                    </div>
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="w-full bg-gradient-to-r from-blue-600 to-cyan-600 text-white py-3 px-6 rounded-lg font-semibold hover:from-blue-500 hover:to-cyan-500 transition-all"
                    >
                      View Details
                    </motion.button>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        )}

        {/* Instructor Course Management */}
        {activeTab === 'courses' && userRole === 'instructor' && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="space-y-8"
          >
            <div className="text-center mb-8">
              <h2 className="text-4xl font-bold gradient-text glow-text mb-4">👨‍🏫 Course Management</h2>
              <p className="text-gray-300">Create, edit, and manage your courses</p>
            </div>

            {/* Create New Course Button */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center mb-8"
            >
              <motion.button
                whileHover={{ scale: 1.1, boxShadow: '0 20px 40px rgba(16, 185, 129, 0.3)' }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-4 bg-gradient-to-r from-green-600 to-emerald-600 text-white font-bold text-xl rounded-xl hover:from-green-500 hover:to-emerald-500 transition-all shadow-lg shadow-green-500/30"
              >
                🚀 Create New Course
              </motion.button>
            </motion.div>

            {/* My Published Courses */}
            <div>
              <h3 className="text-2xl font-bold mb-6 text-indigo-400">📖 Published Courses (8)</h3>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {[
                  { id: 1, title: 'React for Beginners', students: 147, rating: 4.9, revenue: '$4,250', status: 'Published', icon: '⚛️' },
                  { id: 2, title: 'Python Machine Learning', students: 98, rating: 4.8, revenue: '$3,890', status: 'Published', icon: '🐍' },
                  { id: 3, title: 'Full-Stack Development', students: 78, rating: 4.7, revenue: '$2,780', status: 'Published', icon: '💻' },
                  { id: 4, title: 'Advanced JavaScript', students: 52, rating: 4.9, revenue: '$1,567', status: 'Published', icon: '🟨' },
                  { id: 5, title: 'UI/UX Design Fundamentals', students: 89, rating: 4.6, revenue: '$2,134', status: 'Draft', icon: '🎨' },
                  { id: 6, title: 'Cybersecurity Essentials', students: 0, rating: 0, revenue: '$0', status: 'Draft', icon: '🔒' }
                ].map((course, index) => (
                  <motion.div
                    key={course.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="bg-black/30 backdrop-blur-md border border-gray-600/30 rounded-xl p-6 hover:border-indigo-500/30 transition-all"
                  >
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-center space-x-3">
                        <span className="text-4xl">{course.icon}</span>
                        <div>
                          <h3 className="text-xl font-bold text-white">{course.title}</h3>
                          <div className="flex items-center space-x-4 mt-2">
                            <span className="text-sm text-gray-400">👥 {course.students} students</span>
                            <span className="text-sm text-gray-400">⭐ {course.rating === 0 ? 'No ratings' : course.rating + '/5'}</span>
                            <span className="text-sm text-yellow-400">💰 {course.revenue}</span>
                          </div>
                        </div>
                      </div>
                      <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                        course.status === 'Published' ? 'bg-green-500/20 text-green-300' : 'bg-yellow-500/20 text-yellow-300'
                      }`}>
                        {course.status}
                      </span>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex space-x-3 mt-6">
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="flex-1 bg-gradient-to-r from-blue-600 to-cyan-600 text-white py-2 px-4 rounded-lg font-semibold text-sm hover:from-blue-500 hover:to-cyan-500 transition-all"
                      >
                        ✏️ Edit Course
                      </motion.button>
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="flex-1 bg-gradient-to-r from-green-600 to-emerald-600 text-white py-2 px-4 rounded-lg font-semibold text-sm hover:from-green-500 hover:to-emerald-500 transition-all"
                      >
                        🎬 Manage Lectures
                      </motion.button>
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="bg-red-600/20 border border-red-500/30 text-red-400 py-2 px-4 rounded-lg font-semibold text-sm hover:bg-red-600/30 hover:border-red-400/50 transition-all"
                      >
                        🗑️ Delete
                      </motion.button>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Course Statistics */}
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 mb-8">
              <motion.div
                whileHover={{ scale: 1.05 }}
                className="bg-gradient-to-br from-blue-600/20 to-blue-800/20 border border-blue-500/30 rounded-xl p-6 text-center"
              >
                <div className="text-3xl font-bold text-blue-400 mb-2">464</div>
                <div className="text-sm text-gray-300">Total Students</div>
                <div className="text-xs text-gray-400 mt-1">Across all courses</div>
              </motion.div>

              <motion.div
                whileHover={{ scale: 1.05 }}
                className="bg-gradient-to-br from-green-600/20 to-green-800/20 border border-green-500/30 rounded-xl p-6 text-center"
              >
                <div className="text-3xl font-bold text-green-400 mb-2">$14,621</div>
                <div className="text-sm text-gray-300">Total Revenue</div>
                <div className="text-xs text-gray-400 mt-1">Lifetime earnings</div>
              </motion.div>

              <motion.div
                whileHover={{ scale: 1.05 }}
                className="bg-gradient-to-br from-purple-600/20 to-purple-800/20 border border-purple-500/30 rounded-xl p-6 text-center"
              >
                <div className="text-3xl font-bold text-purple-400 mb-2">4.8</div>
                <div className="text-sm text-gray-300">Average Rating</div>
                <div className="text-xs text-gray-400 mt-1">Course quality</div>
              </motion.div>

              <motion.div
                whileHover={{ scale: 1.05 }}
                className="bg-gradient-to-br from-yellow-600/20 to-yellow-800/20 border border-yellow-500/30 rounded-xl p-6 text-center"
              >
                <div className="text-3xl font-bold text-yellow-400 mb-2">8</div>
                <div className="text-sm text-gray-300">Published Courses</div>
                <div className="text-xs text-gray-400 mt-1">Active content</div>
              </motion.div>
            </div>

            {/* Quick Actions */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-black/30 backdrop-blur-md border border-cyan-500/20 rounded-xl p-6"
            >
              <h3 className="text-2xl font-bold mb-6 text-cyan-400">⚡ Quick Actions</h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {[
                  { icon: '📤', title: 'Upload Lecture', desc: 'Add new video content', color: 'from-purple-600 to-pink-600' },
                  { icon: '📝', title: 'Create Quiz', desc: 'Design assessments', color: 'from-blue-600 to-cyan-600' },
                  { icon: '📊', title: 'View Analytics', desc: 'Track performance', color: 'from-green-600 to-emerald-600' },
                  { icon: '💬', title: 'Q&A Center', desc: 'Answer student questions', color: 'from-yellow-600 to-orange-600' }
                ].map((action, index) => (
                  <motion.button
                    key={index}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: index * 0.1 }}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className={`p-4 rounded-lg bg-gradient-to-br ${action.color} text-white text-center transition-all shadow-lg`}
                  >
                    <div className="text-3xl mb-2">{action.icon}</div>
                    <div className="font-bold text-sm mb-1">{action.title}</div>
                    <div className="text-xs opacity-80">{action.desc}</div>
                  </motion.button>
                ))}
              </div>
            </motion.div>
          </motion.div>
        )}

        {/* Instructor-specific Tabs */}
        {activeTab === 'students' && userRole === 'instructor' && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="space-y-8"
          >
            <div className="text-center mb-8">
              <h2 className="text-4xl font-bold gradient-text glow-text mb-4">👥 Student Management</h2>
              <p className="text-gray-300">Track your students' progress and engagement</p>
            </div>

            {/* Student Stats */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
              <motion.div
                whileHover={{ scale: 1.05 }}
                className="bg-gradient-to-br from-blue-600/20 to-blue-800/20 border border-blue-500/30 rounded-xl p-6 text-center"
              >
                <div className="text-3xl font-bold text-blue-400 mb-2">1,247</div>
                <div className="text-sm text-gray-300">Total Enrollments</div>
              </motion.div>

              <motion.div
                whileHover={{ scale: 1.05 }}
                className="bg-gradient-to-br from-green-600/20 to-green-800/20 border border-green-500/30 rounded-xl p-6 text-center"
              >
                <div className="text-3xl font-bold text-green-400 mb-2">892</div>
                <div className="text-sm text-gray-300">Active Students</div>
              </motion.div>

              <motion.div
                whileHover={{ scale: 1.05 }}
                className="bg-gradient-to-br from-yellow-600/20 to-yellow-800/20 border border-yellow-500/30 rounded-xl p-6 text-center"
              >
                <div className="text-3xl font-bold text-yellow-400 mb-2">4.8/5</div>
                <div className="text-sm text-gray-300">Average Rating</div>
              </motion.div>

              <motion.div
                whileHover={{ scale: 1.05 }}
                className="bg-gradient-to-br from-purple-600/20 to-purple-800/20 border border-purple-500/30 rounded-xl p-6 text-center"
              >
                <div className="text-3xl font-bold text-purple-400 mb-2">89%</div>
                <div className="text-sm text-gray-300">Completion Rate</div>
              </motion.div>
            </div>

            {/* Recent Student Activity */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-black/30 backdrop-blur-md border border-indigo-500/20 rounded-xl p-6"
            >
              <h3 className="text-2xl font-bold mb-6 text-indigo-400">📊 Recent Student Activity</h3>
              <div className="space-y-4">
                {[
                  { student: 'Sarah Johnson', course: 'React for Beginners', action: 'Completed Quiz', time: '5 min ago', score: 95 },
                  { student: 'Mike Chen', course: 'Python ML', action: 'Watched Lesson', time: '15 min ago', score: null },
                  { student: 'Emma Davis', course: 'Full-Stack Dev', action: 'Submitted Assignment', time: '1 hour ago', score: 88 },
                  { student: 'Alex Rodriguez', course: 'JavaScript Advanced', action: 'Enrolled', time: '2 hours ago', score: null },
                  { student: 'Lisa Wang', course: 'UI/UX Design', action: 'Completed Course', time: '3 hours ago', score: 100 }
                ].map((activity, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="flex items-center justify-between p-4 rounded-lg bg-gray-800/30 hover:bg-gray-700/30 transition-colors"
                  >
                    <div className="flex items-center space-x-4">
                      <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center text-white font-bold">
                        {activity.student.split(' ').map(n => n[0]).join('')}
                      </div>
                      <div>
                        <p className="text-white font-medium">{activity.student}</p>
                        <p className="text-gray-400 text-sm">{activity.course}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-gray-300">{activity.action}</p>
                      <div className="flex items-center space-x-2">
                        <p className="text-gray-400 text-sm">{activity.time}</p>
                        {activity.score && (
                          <span className={`px-2 py-1 rounded text-xs font-medium ${
                            activity.score >= 90 ? 'bg-green-500/20 text-green-300' :
                            activity.score >= 80 ? 'bg-yellow-500/20 text-yellow-300' :
                            'bg-orange-500/20 text-orange-300'
                          }`}>
                            {activity.score}%
                          </span>
                        )}
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </motion.div>
        )}

        {activeTab === 'earnings' && userRole === 'instructor' && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="space-y-8"
          >
            <div className="text-center mb-8">
              <h2 className="text-4xl font-bold gradient-text glow-text mb-4">💰 Revenue Analytics</h2>
              <p className="text-gray-300">Track your teaching income and earnings</p>
            </div>

            {/* Earnings Cards */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
              <motion.div
                whileHover={{ scale: 1.05 }}
                className="bg-gradient-to-br from-green-600/20 to-green-800/20 border border-green-500/30 rounded-xl p-6 text-center"
              >
                <div className="text-3xl font-bold text-green-400 mb-2">$12,487</div>
                <div className="text-sm text-gray-300">Total Earnings</div>
              </motion.div>

              <motion.div
                whileHover={{ scale: 1.05 }}
                className="bg-gradient-to-br from-blue-600/20 to-blue-800/20 border border-blue-500/30 rounded-xl p-6 text-center"
              >
                <div className="text-3xl font-bold text-blue-400 mb-2">$2,350</div>
                <div className="text-sm text-gray-300">This Month</div>
              </motion.div>

              <motion.div
                whileHover={{ scale: 1.05 }}
                className="bg-gradient-to-br from-purple-600/20 to-purple-800/20 border border-purple-500/30 rounded-xl p-6 text-center"
              >
                <div className="text-3xl font-bold text-purple-400 mb-2">$297</div>
                <div className="text-sm text-gray-300">Average per Student</div>
              </motion.div>

              <motion.div
                whileHover={{ scale: 1.05 }}
                className="bg-gradient-to-br from-yellow-600/20 to-yellow-800/20 border border-yellow-500/30 rounded-xl p-6 text-center"
              >
                <div className="text-3xl font-bold text-yellow-400 mb-2">42</div>
                <div className="text-sm text-gray-300">Students {"<"} 30 days</div>
              </motion.div>
            </div>

            {/* Revenue Breakdown */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                className="bg-black/30 backdrop-blur-md border border-emerald-500/20 rounded-xl p-6"
              >
                <h3 className="text-xl font-bold mb-4 text-emerald-400">💵 Earnings by Course</h3>
                <div className="space-y-4">
                  {[
                    { course: 'React for Beginners', earnings: '$4,250', students: 142 },
                    { course: 'Python Machine Learning', earnings: '$3,890', students: 98 },
                    { course: 'Full-Stack Development', earnings: '$2,780', students: 76 },
                    { course: 'Advanced JavaScript', earnings: '$1,567', students: 45 }
                  ].map((item, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="flex justify-between items-center p-3 rounded-lg bg-gray-800/30"
                    >
                      <div>
                        <p className="text-white font-medium">{item.course}</p>
                        <p className="text-gray-400 text-sm">{item.students} students</p>
                      </div>
                      <p className="text-emerald-400 font-bold">{item.earnings}</p>
                    </motion.div>
                  ))}
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                className="bg-black/30 backdrop-blur-md border border-cyan-500/20 rounded-xl p-6"
              >
                <h3 className="text-xl font-bold mb-4 text-cyan-400">📈 Monthly Revenue Trends</h3>
                <Bar data={{
                  labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
                  datasets: [{
                    label: 'Monthly Revenue',
                    data: [850, 1200, 1450, 1680, 2300, 2120],
                    backgroundColor: 'rgba(34, 197, 94, 0.6)',
                    borderColor: 'rgba(34, 197, 94, 1)',
                    borderWidth: 1
                  }]
                }} />
              </motion.div>
            </div>

            {/* Payout Info */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-black/30 backdrop-blur-md border border-blue-500/20 rounded-xl p-6"
            >
              <h3 className="text-xl font-bold mb-6 text-blue-400">💳 Payout Information</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="text-center">
                  <p className="text-gray-400 mb-2">Next Payout</p>
                  <p className="text-2xl font-bold text-white">March 1st</p>
                  <p className="text-green-400 text-sm">$2,350 pending</p>
                </div>
                <div className="text-center">
                  <p className="text-gray-400 mb-2">Payment Method</p>
                  <p className="text-2xl font-bold text-white">PayPal</p>
                  <p className="text-gray-400 text-sm">Monthly payouts</p>
                </div>
                <div className="text-center">
                  <p className="text-gray-400 mb-2">Platform Fee</p>
                  <p className="text-2xl font-bold text-white">20%</p>
                  <p className="text-gray-400 text-sm">$587.50 this month</p>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}

        {activeTab === 'reviews' && userRole === 'instructor' && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="space-y-8"
          >
            <div className="text-center mb-8">
              <h2 className="text-4xl font-bold gradient-text glow-text mb-4">⭐ Course Reviews</h2>
              <p className="text-gray-300">Track student feedback and ratings</p>
            </div>

            {/* Review Stats */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
              <motion.div
                whileHover={{ scale: 1.05 }}
                className="bg-gradient-to-br from-yellow-600/20 to-yellow-800/20 border border-yellow-500/30 rounded-xl p-6 text-center"
              >
                <div className="text-3xl font-bold text-yellow-400 mb-2">4.8</div>
                <div className="text-sm text-gray-300">Overall Rating</div>
                <div className="flex justify-center mt-2">
                  {[...Array(5)].map((_, i) => (
                    <span key={i} className="text-yellow-400">★</span>
                  ))}
                </div>
              </motion.div>

              <motion.div
                whileHover={{ scale: 1.05 }}
                className="bg-gradient-to-br from-green-600/20 to-green-800/20 border border-green-500/30 rounded-xl p-6 text-center"
              >
                <div className="text-3xl font-bold text-green-400 mb-2">387</div>
                <div className="text-sm text-gray-300">Total Reviews</div>
              </motion.div>

              <motion.div
                whileHover={{ scale: 1.05 }}
                className="bg-gradient-to-br from-blue-600/20 to-blue-800/20 border border-blue-500/30 rounded-xl p-6 text-center"
              >
                <div className="text-3xl font-bold text-blue-400 mb-2">94%</div>
                <div className="text-sm text-gray-300">Satisfaction</div>
              </motion.div>

              <motion.div
                whileHover={{ scale: 1.05 }}
                className="bg-gradient-to-br from-purple-600/20 to-purple-800/20 border border-purple-500/30 rounded-xl p-6 text-center"
              >
                <div className="text-3xl font-bold text-purple-400 mb-2">156</div>
                <div className="text-sm text-gray-300">5-star Reviews</div>
              </motion.div>
            </div>

            {/* Recent Reviews */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-black/30 backdrop-blur-md border border-amber-500/20 rounded-xl p-6"
            >
              <h3 className="text-2xl font-bold mb-6 text-amber-400">📝 Latest Reviews</h3>
              <div className="space-y-6">
                {[
                  { course: 'React for Beginners', student: 'Emma Thompson', rating: 5, review: 'Exceptional course! The instructor explains complex concepts with great clarity. The hands-on projects really helped solidify my understanding.', date: '2025-01-15' },
                  { course: 'Python ML', student: 'David Chen', rating: 5, review: 'Comprehensive and well-structured. The real-world examples made machine learning much more approachable for beginners.', date: '2025-01-12' },
                  { course: 'Full-Stack Dev', student: 'Lisa Rodriguez', rating: 4, review: 'Great content delivery. Would love to see more advanced topics covered, but overall very satisfied with the course quality.', date: '2025-01-10' },
                  { course: 'Advanced JavaScript', student: 'Mike Johnson', rating: 5, review: 'Perfect balance of theory and practical examples. The code snippets are gold! Highly recommend to any serious developer.', date: '2025-01-08' }
                ].map((review, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: index * 0.1 }}
                    className="border-b border-gray-600/30 last:border-b-0 pb-6 last:pb-0"
                  >
                    <div className="flex justify-between items-start mb-3">
                      <div>
                        <p className="text-blue-400 font-medium">{review.course}</p>
                        <p className="text-gray-400 text-sm">by {review.student} • {review.date}</p>
                      </div>
                      <div className="flex items-center">
                        <div className="flex mr-3">
                          {[...Array(5)].map((_, i) => (
                            <span key={i} className={i < review.rating ? "text-yellow-400" : "text-gray-600"}>★</span>
                          ))}
                        </div>
                        <span className="text-yellow-400 font-bold">{review.rating}/5</span>
                      </div>
                    </div>
                    <p className="text-gray-300 leading-relaxed">{review.review}</p>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </motion.div>
        )}

        {/* Update the Analytics tab for instructors */}
        {activeTab === 'overview' && userRole === 'instructor' && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="space-y-8"
          >
            {/* Instructor Analytics Stats */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <motion.div
                whileHover={{ scale: 1.05 }}
                className="bg-gradient-to-br from-blue-600/20 to-blue-800/20 border border-blue-500/30 rounded-xl p-6 text-center"
              >
                <div className="text-3xl font-bold text-blue-400 mb-2">1,247</div>
                <div className="text-sm text-gray-300">Total Students</div>
              </motion.div>

              <motion.div
                whileHover={{ scale: 1.05 }}
                className="bg-gradient-to-br from-green-600/20 to-green-800/20 border border-green-500/30 rounded-xl p-6 text-center"
              >
                <div className="text-3xl font-bold text-green-400 mb-2">8</div>
                <div className="text-sm text-gray-300">Courses Published</div>
              </motion.div>

              <motion.div
                whileHover={{ scale: 1.05 }}
                className="bg-gradient-to-br from-purple-600/20 to-purple-800/20 border border-purple-500/30 rounded-xl p-6 text-center"
              >
                <div className="text-3xl font-bold text-purple-400 mb-2">$12,487</div>
                <div className="text-sm text-gray-300">Total Revenue</div>
              </motion.div>

              <motion.div
                whileHover={{ scale: 1.05 }}
                className="bg-gradient-to-br from-yellow-600/20 to-yellow-800/20 border border-yellow-500/30 rounded-xl p-6 text-center"
              >
                <div className="text-3xl font-bold text-yellow-400 mb-2">4.8</div>
                <div className="text-sm text-gray-300">Average Rating</div>
              </motion.div>
            </div>

            {/* Instructor Charts */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                className="bg-black/30 backdrop-blur-md border border-indigo-500/20 rounded-xl p-6"
              >
                <h3 className="text-xl font-bold mb-4 text-indigo-400">👥 Student Enrollment Trends</h3>
                <Line data={{
                  labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
                  datasets: [{
                    label: 'New Enrollments',
                    data: [45, 62, 78, 89, 95, 110],
                    borderColor: 'rgb(99, 102, 241)',
                    backgroundColor: 'rgba(99, 102, 241, 0.1)',
                    tension: 0.4
                  }, {
                    label: 'Total Students',
                    data: [600, 662, 740, 829, 924, 1034],
                    borderColor: 'rgb(34, 197, 94)',
                    backgroundColor: 'rgba(34, 197, 94, 0.1)',
                    tension: 0.4
                  }]
                }} />
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                className="bg-black/30 backdrop-blur-md border border-rose-500/20 rounded-xl p-6"
              >
                <h3 className="text-xl font-bold mb-4 text-rose-400">💰 Revenue Analytics</h3>
                <Bar data={{
                  labels: ['React', 'Python', 'Full-Stack', 'JS', 'Design'],
                  datasets: [{
                    label: 'Revenue by Course',
                    data: [4250, 3890, 2780, 1567, 0],
                    backgroundColor: [
                      'rgba(59, 130, 246, 0.8)',
                      'rgba(16, 185, 129, 0.8)',
                      'rgba(237, 137, 54, 0.8)',
                      'rgba(139, 92, 246, 0.8)',
                      'rgba(236, 72, 153, 0.8)'
                    ],
                    borderWidth: 0
                  }]
                }} />
              </motion.div>
            </div>

            {/* Recent Instructor Activity */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-black/30 backdrop-blur-md border border-teal-500/20 rounded-xl p-6"
            >
              <h3 className="text-xl font-bold mb-6 text-teal-400">📈 Recent Instructor Activity</h3>
              <div className="space-y-4">
                {[
                  { activity: 'New student enrolled in React course', time: '2 hours ago', icon: '👤' },
                  { activity: 'Course rating updated to 4.9/5', time: '4 hours ago', icon: '⭐' },
                  { activity: 'Monthly earnings paid out', time: '1 day ago', icon: '💰' },
                  { activity: '5-star review received', time: '2 days ago', icon: '📝' },
                  { activity: 'Course promoted in newsletter', time: '3 days ago', icon: '📧' },
                  { activity: 'New FAQ section added', time: '4 days ago', icon: '❓' }
                ].map((item, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="flex items-center space-x-4 p-3 rounded-lg bg-gray-800/30 hover:bg-gray-700/30 transition-colors"
                  >
                    <span className="text-xl">{item.icon}</span>
                    <div className="flex-1">
                      <p className="text-white font-medium">{item.activity}</p>
                      <p className="text-gray-400 text-sm">{item.time}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </motion.div>
        )}

        {activeTab === 'quizzes' && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="space-y-8"
          >
            <div className="text-center mb-8">
              <h2 className="text-4xl font-bold gradient-text glow-text mb-4">📝 Quiz Center</h2>
              <p className="text-gray-300">Test your knowledge and track your progress</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                className="bg-black/30 backdrop-blur-md border border-green-500/20 rounded-xl p-6"
              >
                <h3 className="text-2xl font-bold mb-4 text-green-400">✅ Recent Quiz Results</h3>
                <div className="space-y-4">
                  {recentQuizzes.map((quiz, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className={`p-4 rounded-lg ${
                        quiz.status === 'Passed' ? 'bg-green-500/10 border border-green-500/30' : 'bg-yellow-500/10 border border-yellow-500/30'
                      }`}
                    >
                      <div className="flex justify-between items-center mb-2">
                        <h4 className="font-semibold text-white">{quiz.title}</h4>
                        <span className={`px-2 py-1 rounded text-sm font-medium ${
                          quiz.status === 'Passed' ? 'bg-green-500/20 text-green-300' : 'bg-yellow-500/20 text-yellow-300'
                        }`}>
                          {quiz.status}
                        </span>
                      </div>
                      <div className="flex justify-between text-sm text-gray-400">
                        <span>Score: {quiz.score}%</span>
                        <span>{quiz.date}</span>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                className="bg-black/30 backdrop-blur-md border border-purple-500/20 rounded-xl p-6"
              >
                <h3 className="text-2xl font-bold mb-4 text-purple-400">🎯 Available Quizzes</h3>
                <div className="space-y-4">
                  {[
                    { title: 'React Hooks Mastery', difficulty: 'Advanced', questions: 20, time: 45 },
                    { title: 'JavaScript Algorithms', difficulty: 'Expert', questions: 30, time: 60 },
                    { title: 'Python Data Science', difficulty: 'Intermediate', questions: 25, time: 50 },
                    { title: 'HTML/CSS Responsive', difficulty: 'Beginner', questions: 15, time: 30 }
                  ].map((quiz, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: index * 0.1 }}
                      className="p-4 bg-gray-800/30 rounded-lg hover:bg-gray-700/30 transition-all cursor-pointer"
                    >
                      <div className="flex justify-between items-center mb-2">
                        <h4 className="font-semibold text-white">{quiz.title}</h4>
                        <span className={`px-2 py-1 rounded text-xs font-medium ${
                          quiz.difficulty === 'Expert' ? 'bg-red-500/20 text-red-300' :
                          quiz.difficulty === 'Advanced' ? 'bg-orange-500/20 text-orange-300' :
                          quiz.difficulty === 'Intermediate' ? 'bg-yellow-500/20 text-yellow-300' :
                          'bg-green-500/20 text-green-300'
                        }`}>
                          {quiz.difficulty}
                        </span>
                      </div>
                      <div className="flex justify-between text-sm text-gray-400">
                        <span>{quiz.questions} questions</span>
                        <span>{quiz.time} min</span>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center"
            >
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-4 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-bold text-xl rounded-xl hover:from-purple-500 hover:to-pink-500 transition-all shadow-lg shadow-purple-500/30"
              >
                🎮 Start Random Quiz Challenge
              </motion.button>
            </motion.div>
          </motion.div>
        )}

        {activeTab === 'progress' && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="space-y-8"
          >
            <div className="text-center mb-8">
              <h2 className="text-4xl font-bold gradient-text glow-text mb-4">🎯 Learning Progress</h2>
              <p className="text-gray-300">Track your journey to mastery</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="bg-black/30 backdrop-blur-md border border-blue-500/20 rounded-xl p-6 text-center"
              >
                <div className="text-5xl mb-4">📈</div>
                <h3 className="text-xl font-bold text-blue-400 mb-2">Weekly Goal</h3>
                <p className="text-3xl font-bold text-white mb-2">18/20 hours</p>
                <p className="text-gray-400">90% completed this week</p>
                <div className="w-full bg-gray-700 rounded-full h-3 mt-4">
                  <div className="bg-gradient-to-r from-blue-500 to-cyan-500 h-3 rounded-full w-11/12 transition-all duration-1000"></div>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.1 }}
                className="bg-black/30 backdrop-blur-md border border-green-500/20 rounded-xl p-6 text-center"
              >
                <div className="text-5xl mb-4">🏆</div>
                <h3 className="text-xl font-bold text-green-400 mb-2">Achievements</h3>
                <p className="text-3xl font-bold text-white mb-2">24/50</p>
                <p className="text-gray-400">badges earned</p>
                <div className="flex justify-center space-x-2 mt-4">
                  {['🏆', '🎯', '📚', '🎓', '💡'].map((badge, i) => (
                    <span key={i} className="text-2xl opacity-80">{badge}</span>
                  ))}
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.2 }}
                className="bg-black/30 backdrop-blur-md border border-purple-500/20 rounded-xl p-6 text-center"
              >
                <div className="text-5xl mb-4">🔥</div>
                <h3 className="text-xl font-bold text-purple-400 mb-2">Streak</h3>
                <p className="text-3xl font-bold text-white mb-2">12 days</p>
                <p className="text-gray-400">current learning streak</p>
                <div className="flex justify-center items-center space-x-1 mt-4">
                  {Array.from({ length: 7 }, (_, i) => (
                    <div key={i} className={`w-3 h-3 rounded-full ${i < 3 ? 'bg-orange-500' : i < 5 ? 'bg-yellow-500' : 'bg-gray-600'}`}></div>
                  ))}
                </div>
              </motion.div>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-black/30 backdrop-blur-md border border-yellow-500/20 rounded-xl p-6"
            >
              <h3 className="text-2xl font-bold mb-6 text-yellow-400">📊 Detailed Progress Breakdown</h3>
              <div className="space-y-6">
                {[
                  { skill: 'Frontend Development', progress: 85, color: 'blue' },
                  { skill: 'JavaScript Mastery', progress: 90, color: 'yellow' },
                  { skill: 'Backend Development', progress: 70, color: 'green' },
                  { skill: 'Database Management', progress: 65, color: 'purple' },
                  { skill: 'DevOps & Deployment', progress: 50, color: 'pink' }
                ].map((skill, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="flex items-center justify-between"
                  >
                    <div className="flex-1">
                      <div className="flex justify-between mb-2">
                        <span className="text-white font-medium">{skill.skill}</span>
                        <span className="text-gray-400">{skill.progress}%</span>
                      </div>
                      <div className="w-full bg-gray-700 rounded-full h-3">
                        <motion.div
                          initial={{ width: 0 }}
                          animate={{ width: `${skill.progress}%` }}
                          transition={{ delay: 0.5 + index * 0.1, duration: 1 }}
                          className={`bg-gradient-to-r ${
                            skill.color === 'blue' ? 'from-blue-500 to-cyan-500' :
                            skill.color === 'yellow' ? 'from-yellow-500 to-orange-500' :
                            skill.color === 'green' ? 'from-green-500 to-emerald-500' :
                            skill.color === 'purple' ? 'from-purple-500 to-pink-500' :
                            'from-pink-500 to-rose-500'
                          } h-3 rounded-full`}
                        ></motion.div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </motion.div>
        )}

        {activeTab === 'achievements' && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="space-y-8"
          >
            <div className="text-center mb-8">
              <h2 className="text-4xl font-bold gradient-text glow-text mb-4">🏆 Achievements & Badges</h2>
              <p className="text-gray-300">Celebrate your learning milestones</p>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6">
              {[
                { icon: '🎓', title: 'First Steps', description: 'Complete your first lesson', unlocked: true },
                { icon: '📚', title: 'Bookworm', description: 'Read 100 pages of documentation', unlocked: true },
                { icon: '🧠', title: 'Brain Power', description: 'Score 100% on any quiz', unlocked: true },
                { icon: '🚀', title: 'Rocket Scientist', description: 'Complete 5 advanced courses', unlocked: false },
                { icon: '🌟', title: 'Star Developer', description: 'Build and deploy your first app', unlocked: true },
                { icon: '👑', title: 'Code Master', description: 'Solve 100 algorithm problems', unlocked: false },
                { icon: '🔥', title: 'Consistency King', description: 'Study for 30 days straight', unlocked: true },
                { icon: '🎯', title: 'Perfectionist', description: 'Maintain 95%+ average', unlocked: false },
                { icon: '💡', title: 'Innovation Expert', description: 'Create 10 personal projects', unlocked: false },
                { icon: '🏅', title: 'Elite Member', description: 'Reach expert level in 3 skills', unlocked: true },
                { icon: '🌍', title: 'Global Citizen', description: 'Teach courses in multiple languages', unlocked: false },
                { icon: '⚡', title: 'Speed Demon', description: 'Complete course in record time', unlocked: false }
              ].map((achievement, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: index * 0.05 }}
                  whileHover={{ scale: 1.1 }}
                  className={`aspect-square rounded-2xl p-4 text-center ${
                    achievement.unlocked
                      ? 'bg-gradient-to-br from-yellow-500/20 to-orange-500/20 border-2 border-yellow-500/50 shadow-lg shadow-yellow-500/20'
                      : 'bg-gray-800/30 border-2 border-gray-600/30'
                  }`}
                >
                  <div className="text-4xl mb-3">{achievement.icon}</div>
                  <h4 className={`font-bold mb-1 ${
                    achievement.unlocked ? 'text-yellow-400' : 'text-gray-500'
                  }`}>
                    {achievement.title}
                  </h4>
                  <p className={`text-xs leading-tight ${
                    achievement.unlocked ? 'text-gray-300' : 'text-gray-600'
                  }`}>
                    {achievement.description}
                  </p>
                  {achievement.unlocked && (
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      className="absolute -top-1 -right-1 w-5 h-5 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full shadow-lg flex items-center justify-center"
                    >
                      <span className="text-yellow-800 text-xs">✓</span>
                    </motion.div>
                  )}
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
