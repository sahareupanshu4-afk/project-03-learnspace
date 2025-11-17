import { motion } from 'framer-motion';

const Footer = () => {
  return (
    <motion.footer
      initial={{ y: 100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
      className="bg-black/10 backdrop-blur-md border-t border-purple-500/20 px-6 py-8 mt-16"
    >
      <div className="max-w-7xl mx-auto text-center">
        <p className="text-purple-300">&copy; 2025 LearnSpace. All rights reserved.</p>
        <p className="text-sm text-gray-400 mt-2">Building the future of online learning.</p>
      </div>
    </motion.footer>
  );
};

export default Footer;
