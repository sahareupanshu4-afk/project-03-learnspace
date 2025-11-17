import { motion } from 'framer-motion';
import ReactPlayer from 'react-player';

const CourseDetail = () => {
  const lessons = [
    { id: 1, title: 'Intro to React', duration: '10:30', videoUrl: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ' },
    // Placeholder
  ];

  return (
    <div className="container mx-auto px-6 py-16">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
          React for Beginners
        </h1>
        <p className="text-gray-300">By John Doe</p>
        <div className="mt-6 aspect-video">
          <ReactPlayer url="https://www.youtube.com/watch?v=dQw4w9WgXcQ" controls width="100%" height="100%" />
        </div>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
          <h2 className="text-2xl font-semibold mb-4">Lessons</h2>
          {lessons.map((lesson) => (
            <motion.div
              key={lesson.id}
              whileHover={{ scale: 1.02 }}
              className="bg-black/20 backdrop-blur-md border border-purple-500/20 rounded-lg p-4 mb-4 cursor-pointer hover:border-purple-400/40 transition-all"
            >
              <h3 className="font-semibold">{lesson.title}</h3>
              <p className="text-sm text-gray-400">{lesson.duration}</p>
            </motion.div>
          ))}
        </div>

        <div>
          <h2 className="text-2xl font-semibold mb-4">Progress</h2>
          <div className="bg-black/20 backdrop-blur-md border border-purple-500/20 rounded-lg p-4">
            <div className="w-full bg-purple-900 rounded-full h-4 mb-2">
              <div className="bg-gradient-to-r from-purple-500 to-pink-500 h-4 rounded-full" style={{ width: '75%' }}></div>
            </div>
            <p className="text-sm text-gray-300">75% complete</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseDetail;
