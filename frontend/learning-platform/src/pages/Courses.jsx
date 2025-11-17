import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const Courses = () => {
  const courses = [
    { id: 1, title: 'React for Beginners', instructor: 'John Doe', description: 'Learn React fundamentals and build modern web apps.', icon: '⚛️' },
    { id: 2, title: 'Advanced JavaScript', instructor: 'Jane Smith', description: 'Master ES6+, async programming, and advanced concepts.', icon: '🟨' },
    { id: 3, title: 'Python Machine Learning', instructor: 'Alex Chen', description: 'Build AI models with scikit-learn and TensorFlow.', icon: '🐍' },
    { id: 4, title: 'Full-Stack Development', instructor: 'Sarah Wilson', description: 'Complete MERN stack mastery from frontend to backend.', icon: '🚀' },
    { id: 5, title: 'UI/UX Design Fundamentals', instructor: 'Mike Johnson', description: 'Create stunning designs with modern design principles.', icon: '🎨' },
    { id: 6, title: 'Cybersecurity Essentials', instructor: 'Lisa Brown', description: 'Protect systems and data with industry-standard practices.', icon: '🔒' },
  ];

  return (
    <div className="container mx-auto px-6 py-16 relative overflow-hidden">
      {/* Floating Elements */}
      <div className="floating-element" style={{ top: '10%', left: '10%' }}></div>
      <div className="floating-element" style={{ top: '20%', right: '20%' }}></div>
      <div className="floating-element" style={{ top: '70%', left: '80%' }}></div>
      <div className="floating-element" style={{ top: '90%', right: '10%' }}></div>

      {/* Matrix Background */}
      <div className="matrix-bg"></div>

      <motion.h1
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6 }}
        className="text-5xl font-bold mb-16 text-center gradient-text glow-text"
        style={{ perspective: '1000px' }}
      >
        Available Courses
      </motion.h1>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 card-3d"
      >
        {courses.map((course, index) => (
          <motion.div
            key={course.id}
            initial={{ opacity: 0, y: 50, rotateX: -10 }}
            animate={{ opacity: 1, y: 0, rotateX: 0 }}
            transition={{ duration: 0.6, delay: index * 0.1 }}
            whileHover={{
              scale: 1.1,
              rotateY: 5,
              rotateX: 5,
              z: 30
            }}
            className="neon-box card glow-border text-center group"
            style={{ transformStyle: 'preserve-3d' }}
          >
            <motion.div
              whileHover={{ scale: 1.2, rotateY: 15 }}
              transition={{ type: "spring", stiffness: 400 }}
              className="text-6xl mb-4"
            >
              {course.icon}
            </motion.div>
            <motion.h3
              className="text-xl font-semibold mb-2 gradient-text glow-text"
              whileHover={{ scale: 1.05 }}
            >
              {course.title}
            </motion.h3>
            <p className="text-gray-300 mb-3">{course.description}</p>
            <p className="text-purple-400 mb-4">By {course.instructor}</p>
            <Link to="/login">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="btn-primary btn-pulse group-hover:btn-bounce"
              >
                Enroll Now
              </motion.button>
            </Link>
          </motion.div>
        ))}
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.2, duration: 0.6 }}
        className="text-center mt-32 px-8"
      >
        <motion.div
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
        >
          <Link to="/" className="btn-secondary btn-float">
            Back to Home
          </Link>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default Courses;
