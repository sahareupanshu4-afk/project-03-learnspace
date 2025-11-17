import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Play, BookOpen, Trophy, Users } from 'lucide-react';

const Home = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.5,
        staggerChildren: 0.3
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6 }
    }
  };

  const features = [
    { icon: Play, title: 'Video Lessons', desc: 'High-quality video content' },
    { icon: BookOpen, title: 'Interactive Quizzes', desc: 'Test your knowledge' },
    { icon: Trophy, title: 'Certificates', desc: 'Earn rewards upon completion' },
    { icon: Users, title: 'Community', desc: 'Learn with others' }
  ];

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={containerVariants}
      className="flex flex-col items-center justify-center min-h-screen px-6 relative overflow-hidden"
      style={{ perspective: '1000px' }}
    >
      {/* Floating Elements */}
      <div className="floating-element" style={{ top: '20%', left: '20%' }}></div>
      <div className="floating-element" style={{ top: '60%', right: '30%' }}></div>
      <div className="floating-element" style={{ top: '80%', left: '70%' }}></div>
      <div className="floating-element" style={{ top: '40%', left: '80%' }}></div>
      <div className="floating-element" style={{ top: '15%', right: '15%' }}></div>

      {/* Matrix Background Layer */}
      <div className="matrix-bg"></div>

      {/* Hero Section */}
      <motion.div variants={itemVariants} className="text-center mb-16 z-10">
        <motion.h1
          className="text-6xl font-bold mb-4 gradient-text glow-text"
          whileHover={{ scale: 1.05 }}
          transition={{ type: "spring", stiffness: 300 }}
        >
          Master New Skills
        </motion.h1>
        <motion.h1
          className="text-6xl font-bold mb-6 animated-gradient"
          style={{
            backgroundClip: 'text',
            WebkitBackgroundClip: 'text',
            backgroundSize: '200% 200%',
            animation: 'gradient-shift 4s ease-in-out infinite'
          }}
          whileHover={{ scale: 1.05, rotateX: 5, rotateY: 5 }}
          transition={{ type: "spring", stiffness: 300 }}
        >
          In The Future
        </motion.h1>
        <motion.p
          className="text-xl text-purple-200 mb-8 max-w-2xl mx-auto glow-text"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 1 }}
        >
          Experience cutting-edge online learning with interactive videos, personalized progress tracking, and advanced analytics.
        </motion.p>
        <motion.div
          className="flex justify-center space-x-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.5, duration: 0.6 }}
        >
          <Link to="/courses" className="btn-primary btn-pulse">
            Explore Courses
          </Link>
          <Link to="/signup" className="btn-secondary btn-bounce">
            Join Now
          </Link>
        </motion.div>
      </motion.div>

      {/* Features Section */}
      <motion.div
        variants={containerVariants}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 w-full max-w-6xl mb-16 card-3d"
      >
        {features.map((feature, index) => (
          <motion.div
            key={index}
            variants={itemVariants}
            whileHover={{
              scale: 1.1,
              rotateY: 10,
              rotateX: 10,
              z: 50
            }}
            transition={{ type: "spring", stiffness: 300 }}
            className="neon-box card text-center glow-border"
            style={{ transformStyle: 'preserve-3d' }}
          >
            <motion.div
              whileHover={{ scale: 1.2 }}
              transition={{ type: "spring", stiffness: 400 }}
            >
              <feature.icon className="w-12 h-12 text-purple-400 mx-auto mb-4" />
            </motion.div>
            <motion.h3
              className="text-xl font-semibold mb-2 gradient-text glow-text"
              whileHover={{ scale: 1.05 }}
            >
              {feature.title}
            </motion.h3>
            <p className="text-gray-300">{feature.desc}</p>
          </motion.div>
        ))}
      </motion.div>

      {/* Call to Action */}
      <motion.div
        variants={itemVariants}
        className="text-center z-10"
      >
        <motion.h2
          className="text-3xl font-bold mb-4 gradient-text"
          whileHover={{ scale: 1.05 }}
        >
          Ready to Start Your Journey?
        </motion.h2>
        <p className="text-xl text-purple-200 mb-8 glow-text">Join thousands of learners already advancing their careers.</p>
        <motion.div
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
        >
          <Link to="/signup" className="btn-primary btn-float">
            Begin Learning
          </Link>
        </motion.div>
      </motion.div>
    </motion.div>
  );
};

export default Home;
