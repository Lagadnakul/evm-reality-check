import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const LoadingScreen = ({ onLoaded }) => {
  const [progress, setProgress] = useState(0);
  const [stage, setStage] = useState('initializing');
  const [showText, setShowText] = useState('');

  const loadingMessages = [
    'Initializing Systems...',
    'Loading EVM Architecture...',
    'Preparing Educational Modules...',
    'Calibrating Animations...',
    'Establishing Security Layers...',
    'Finalizing Interface...'
  ];

  useEffect(() => {
    const timer = setTimeout(() => {
      onLoaded();
    }, 4000);

    return () => clearTimeout(timer);
  }, [onLoaded]);

  useEffect(() => {
    const progressInterval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(progressInterval);
          return 100;
        }
        return prev + Math.random() * 8 + 2;
      });
    }, 200);

    const stageInterval = setInterval(() => {
      const currentIndex = loadingMessages.indexOf(stage);
      if (currentIndex < loadingMessages.length - 1) {
        setStage(loadingMessages[currentIndex + 1]);
      }
    }, 800);

    return () => {
      clearInterval(progressInterval);
      clearInterval(stageInterval);
    };
  }, [stage]);

  // Typewriter effect for loading text
  useEffect(() => {
    let currentText = '';
    const fullText = stage;
    let i = 0;

    const typing = setInterval(() => {
      if (i < fullText.length) {
        currentText += fullText.charAt(i);
        setShowText(currentText);
        i++;
      } else {
        clearInterval(typing);
      }
    }, 40);

    return () => clearInterval(typing);
  }, [stage]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { duration: 0.8, ease: 'easeInOut' }
    },
    exit: {
      opacity: 0,
      transition: { duration: 0.5, ease: 'easeInOut' }
    }
  };

  const logoVariants = {
    initial: { scale: 0, opacity: 0 },
    animate: {
      scale: [0, 1.1, 1],
      opacity: [0, 0.8, 1],
      transition: { duration: 2, ease: [0.25, 0.46, 0.45, 0.94] }
    },
    glow: {
      boxShadow: ['0 0 20px rgba(6, 182, 212, 0.3)', '0 0 40px rgba(168, 85, 247, 0.5)'],
      transition: { duration: 2, repeat: Infinity, repeatType: 'reverse' }
    }
  };

  const particleCount = 50;

  return (
    <AnimatePresence>
      <motion.div
        key="loading-screen"
        className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-gradient-to-br from-[#0a0a0f] via-[#0d0d15] to-[#11111a]"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        exit="exit"
      >
        {/* Background Particles */}
        <div className="absolute inset-0 overflow-hidden">
          {Array.from({ length: particleCount }).map((_, i) => {
            const left = Math.random() * 100;
            const delay = Math.random() * 4;
            const duration = 3 + Math.random() * 4;
            const size = Math.random() * 2 + 0.5;

            return (
              <motion.div
                key={i}
                className="absolute rounded-full bg-cyan-400/10"
                style={{
                  left: `${left}%`,
                  top: '-10px',
                  width: `${size}px`,
                  height: `${size}px`
                }}
                animate={{
                  y: ['0%', '110%'],
                  opacity: [0, 0.3, 0],
                  scale: [0.5, 1, 0.5]
                }}
                transition={{
                  duration,
                  delay,
                  repeat: Infinity,
                  ease: 'linear'
                }}
              />
            );
          })}
        </div>

        {/* Cyber Grid Overlay */}
        <div className="absolute inset-0 cyber-grid opacity-10" />

        {/* Animated Gradient Orbs */}
        <motion.div
          className="absolute top-1/4 left-1/4 w-72 h-72 bg-purple-600/10 rounded-full blur-3xl"
          animate={{
            x: [0, 50, 0],
            y: [0, -30, 0],
            opacity: [0.1, 0.2, 0.1]
          }}
          transition={{ duration: 6, ease: 'easeInOut', repeat: Infinity, repeatType: 'loop' }}
        />

        <motion.div
          className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl"
          animate={{
            x: [0, -40, 0],
            y: [0, 40, 0],
            opacity: [0.05, 0.15, 0.05]
          }}
          transition={{ duration: 8, ease: 'easeInOut', repeat: Infinity, repeatType: 'loop' }}
        />

        {/* Main Content */}
        <div className="relative z-10 text-center px-4">
          {/* Logo */}
          <motion.div
            className="mb-8"
            variants={logoVariants}
            initial="initial"
            animate={['animate', 'glow']}
          >
            <motion.div
              className="relative inline-flex items-center justify-center w-24 h-24 rounded-3xl bg-gradient-to-br from-cyan-500/10 via-purple-500/10 to-cyan-500/10 border border-cyan-500/20 shadow-2xl"
              whileHover={{ scale: 1.05, rotate: [0, 5, -5, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <motion.span
                className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-white to-purple-400"
                animate={{
                  backgroundPosition: ['0% 0%', '100% 0%', '0% 0%']
                }}
                transition={{ duration: 3, repeat: Infinity, ease: 'linear' }}
                style={{ backgroundSize: '200% auto' }}
              >
                EVM
              </motion.span>

              {/* Corner Accents */}
              <motion.div
                className="absolute -top-1 -left-1 w-3 h-3 border-l-2 border-t-2 border-cyan-500/40 rounded-br"
                animate={{ borderColor: ['rgba(6, 182, 212, 0.2)', 'rgba(168, 85, 247, 0.4)'] }}
                transition={{ duration: 2, repeat: Infinity }}
              />
              <motion.div
                className="absolute -top-1 -right-1 w-3 h-3 border-r-2 border-t-2 border-purple-500/40 rounded-bl"
                animate={{ borderColor: ['rgba(168, 85, 247, 0.2)', 'rgba(6, 182, 212, 0.4)'] }}
                transition={{ duration: 2, repeat: Infinity, delay: 0.5 }}
              />
              <motion.div
                className="absolute -bottom-1 -left-1 w-3 h-3 border-l-2 border-b-2 border-cyan-500/40 rounded-tr"
                animate={{ borderColor: ['rgba(6, 182, 212, 0.2)', 'rgba(168, 85, 247, 0.4)'] }}
                transition={{ duration: 2, repeat: Infinity, delay: 1 }}
              />
              <motion.div
                className="absolute -bottom-1 -right-1 w-3 h-3 border-r-2 border-b-2 border-purple-500/40 rounded-tl"
                animate={{ borderColor: ['rgba(168, 85, 247, 0.2)', 'rgba(6, 182, 212, 0.4)'] }}
                transition={{ duration: 2, repeat: Infinity, delay: 1.5 }}
              />
            </motion.div>
          </motion.div>

          {/* Loading Text */}
          <motion.div
            className="mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.6 }}
          >
            <motion.h2
              className="text-2xl md:text-3xl font-bold text-white mb-2"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.7 }}
            >
              {showText}
            </motion.h2>
            <motion.p
              className="text-gray-400 text-sm font-mono tracking-wider"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.9 }}
            >
              Reality Check v2.0 - Premium Edition
            </motion.p>
          </motion.div>

          {/* Progress Bar */}
          <motion.div
            className="w-80 h-2 bg-black/30 rounded-full overflow-hidden mx-auto"
            initial={{ width: 0, opacity: 0 }}
            animate={{ width: '100%', opacity: 1 }}
            transition={{ delay: 1.2, duration: 0.5 }}
          >
            <motion.div
              className="h-full bg-gradient-to-r from-cyan-500 via-purple-500 to-cyan-500"
              initial={{ width: 0 }}
              animate={{ width: `${Math.min(progress, 100)}%` }}
              transition={{ duration: 0.3, ease: 'easeInOut' }}
            />
          </motion.div>

          {/* Percentage */}
          <motion.div
            className="mt-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.5 }}
          >
            <span className="text-lg font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-400">
              {Math.floor(progress)}%
            </span>
          </motion.div>

          {/* Loading Dots */}
          <motion.div
            className="flex gap-2 mt-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.8 }}
          >
            {[0, 1, 2].map((i) => (
              <motion.div
                key={i}
                className="w-3 h-3 rounded-full bg-cyan-400"
                animate={{ scale: [1, 1.2, 1], opacity: [0.5, 1, 0.5] }}
                transition={{
                  duration: 1.5,
                  repeat: Infinity,
                  delay: i * 0.2
                }}
              />
            ))}
          </motion.div>
        </div>

        {/* Bottom Status */}
        <motion.div
          className="absolute bottom-8 left-0 right-0 text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 2, duration: 0.5 }}
        >
          <motion.p
            className="text-xs text-gray-500 font-mono tracking-widest"
            animate={{ opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            BUILD #001 - NAKUL LAGAD
          </motion.p>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default LoadingScreen;
