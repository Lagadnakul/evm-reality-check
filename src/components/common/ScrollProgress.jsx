import React from 'react';
import { motion, useScroll } from 'framer-motion';

const ScrollProgress = () => {
  const { scrollYProgress } = useScroll();

  return (
    <motion.div
      className="fixed top-0 left-0 right-0 h-1 z-40"
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 1.5, duration: 0.5 }}
    >
      <motion.div
        className="h-full bg-gradient-to-r from-cyan-500 via-purple-500 to-cyan-500"
        style={{ scaleX: scrollYProgress, transformOrigin: 'left' }}
      />
    </motion.div>
  );
};

export default ScrollProgress;
