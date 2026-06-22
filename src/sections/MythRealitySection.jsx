import React, { useState, useRef, useEffect } from 'react';
import { motion, useScroll, useTransform, useInView } from 'framer-motion';

// Animated Icons Component
const AnimatedIcon = ({ icon, color = 'text-cyan-400', size = 'text-2xl', delay = 0 }) => (
  <motion.div
    className={`inline-flex items-center justify-center ${size} ${color}`}
    initial={{ scale: 0, opacity: 0 }}
    animate={{ scale: 1, opacity: 1 }}
    transition={{ delay, duration: 0.5, ease: 'easeOut' }}
    whileHover={{ scale: 1.1, rotate: [0, -10, 10, 0] }}
  >
    {icon}
  </motion.div>
);

// Floating Particle Effect
const FloatingParticles = ({ count = 15, containerRef }) => {
  return Array.from({ length: count }).map((_, i) => (
    <motion.div
      key={i}
      className="absolute w-1 h-1 bg-white/20 rounded-full"
      style={{
        left: `${Math.random() * 100}%`,
        top: `${Math.random() * 100}%`,
      }}
      animate={{
        y: [0, -100 - Math.random() * 100],
        opacity: [0.2, 0, 0.2],
        scale: [1, 0.5, 1],
      }}
      transition={{
        duration: 5 + Math.random() * 10,
        ease: 'linear',
        repeat: Infinity,
        repeatType: 'loop',
        delay: Math.random() * 5,
      }}
    />
  ));
};

// Animated Connector Line
const AnimatedConnector = ({ direction = 'horizontal', length = '100%', delay = 0 }) => {
  const isHorizontal = direction === 'horizontal';

  return (
    <motion.div
      className={`absolute ${isHorizontal ? 'h-0.5 w-full' : 'w-0.5 h-full'}`}
      style={{
        background: 'linear-gradient(90deg, transparent, rgba(168, 85, 247, 0.4), transparent)',
      }}
      initial={{ opacity: 0, scaleX: isHorizontal ? 0 : 1, scaleY: isHorizontal ? 1 : 0 }}
      animate={{ opacity: 1, scaleX: 1, scaleY: 1 }}
      transition={{ delay, duration: 1, ease: 'easeInOut' }}
    />
  );
};

// Card 1: Laptop vs EVM Concept
const Card1 = ({ isVisible }) => {
  const containerVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { staggerChildren: 0.2, delayChildren: 0.3 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
  };

  return (
    <motion.div
      className="w-full max-w-2xl mx-auto"
      variants={containerVariants}
      initial="hidden"
      animate={isVisible ? "visible" : "hidden"}
    >
      {/* Card Container */}
      <div className="relative bg-gradient-to-br from-gray-800/30 to-gray-900/50 rounded-3xl backdrop-blur-lg border border-white/10 shadow-2xl overflow-hidden">
        {/* Header */}
        <motion.div
          className="p-6 border-b border-white/10"
          variants={itemVariants}
        >
          <motion.span
            className="inline-block px-4 py-1.5 bg-red-500/10 backdrop-blur-md rounded-full text-sm font-medium text-red-300 border border-red-500/20 mb-4"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.4 }}
          >
            Myth vs Reality
          </motion.span>

          <h3 className="text-xl md:text-2xl font-bold text-white">
            "Someone can hack it from home using Python."
          </h3>
        </motion.div>

        {/* Content */}
        <motion.div
          className="p-6 lg:p-8"
          variants={itemVariants}
        >
          {/* Animated Visualization */}
          <div className="relative flex items-center justify-center mb-8 h-64">
            {/* Laptop Side */}
            <motion.div
              className="relative flex flex-col items-center"
              initial={{ x: -50, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.5, duration: 0.6 }}
            >
              {/* Laptop Device */}
              <motion.div
                className="relative w-48 h-32 bg-gradient-to-br from-gray-700 to-gray-800 rounded-lg shadow-xl border border-white/10 overflow-hidden"
                whileHover={{ scale: 1.02, y: -3 }}
              >
                {/* Laptop Screen */}
                <div className="absolute top-2 left-2 right-2 bottom-8 bg-black/30 rounded border border-white/10">
                  <motion.div
                    className="absolute top-1 left-1 right-1 bottom-1 bg-gradient-to-br from-purple-500/20 to-cyan-500/20 rounded"
                    animate={{
                      background: [
                        'linear-gradient(135deg, rgba(168, 85, 247, 0.2), rgba(6, 182, 212, 0.2))',
                        'linear-gradient(135deg, rgba(6, 182, 212, 0.2), rgba(168, 85, 247, 0.2))',
                      ],
                    }}
                    transition={{ duration: 3, repeat: Infinity }}
                  />
                  {/* Code display */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-xs font-mono text-green-400/80">
                      def hack_system():<br />
                      <span className="text-purple-400/80">pass</span>
                    </span>
                  </div>
                </div>

                {/* Laptop Keyboard */}
                <div className="absolute bottom-0 left-2 right-2 h-4 bg-gray-800 rounded-b">
                  <div className="h-full flex items-center justify-start px-2">
                    <motion.span
                      className="text-xs text-white/60"
                      animate={{ opacity: [0.5, 1, 0.5] }}
                      transition={{ duration: 2, repeat: Infinity }}
                    >
                      Command Line
                    </motion.span>
                  </div>
                </div>

                {/* Side Glow */}
                <motion.div
                  className="absolute -left-1 top-1/2 -translate-y-1/2 w-8 h-16 bg-gradient-to-r from-purple-500/0 via-purple-400/30 to-transparent rounded-r-full"
                  animate={{ opacity: [0.3, 0.6, 0.3] }}
                  transition={{ duration: 2, repeat: Infinity }}
                />
              </motion.div>

              <motion.p
                className="mt-4 text-sm text-gray-400"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7 }}
              >
                Home Computer
              </motion.p>
            </motion.div>

            {/* Separator */}
            <motion.div
              className="mx-6 lg:mx-12 flex flex-col items-center"
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.8, duration: 0.4 }}
            >
              <motion.div
                className="text-3xl font-bold text-red-400 mb-2"
                animate={{ rotate: [0, 180, 0] }}
                transition={{ duration: 2, repeat: Infinity, delay: 1 }}
              >
                X
              </motion.div>
              <motion.div
                className="w-0.5 h-16 bg-gradient-to-b from-white/20 to-white/40"
                animate={{ height: [16, 24, 16] }}
                transition={{ duration: 2, repeat: Infinity, delay: 0.5 }}
              />
              <motion.p
                className="text-xs text-gray-500 mt-2 text-center"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.2 }}
              >
                No direct connection
              </motion.p>
            </motion.div>

            {/* EVM Side */}
            <motion.div
              className="relative flex flex-col items-center"
              initial={{ x: 50, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.6, duration: 0.6 }}
            >
              {/* EVM Device */}
              <motion.div
                className="relative w-40 h-48 bg-gradient-to-b from-gray-800/40 to-gray-900/60 rounded-2xl backdrop-blur-lg border border-white/10 shadow-xl overflow-hidden"
                whileHover={{ scale: 1.02, y: -3 }}
              >
                {/* EVM Screen */}
                <div className="absolute top-3 left-3 right-3 h-24 bg-black/20 rounded-xl border border-white/10 overflow-hidden">
                  <motion.div
                    className="absolute top-1 left-1 right-1 bottom-1 bg-gradient-to-br from-cyan-500/20 to-purple-500/20 rounded"
                    animate={{
                      background: [
                        'linear-gradient(135deg, rgba(6, 182, 212, 0.2), rgba(168, 85, 247, 0.2))',
                        'linear-gradient(135deg, rgba(168, 85, 247, 0.2), rgba(6, 182, 212, 0.2))',
                      ],
                    }}
                    transition={{ duration: 3, repeat: Infinity, delay: 0.5 }}
                  />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <motion.span
                      className="text-lg font-mono text-white/80 tracking-wider"
                      animate={{ opacity: [0.5, 1, 0.5] }}
                      transition={{ duration: 2, repeat: Infinity }}
                    >
                      VOTING
                    </motion.span>
                  </div>
                </div>

                {/* EVM Buttons */}
                <div className="absolute bottom-16 left-3 right-3 h-12 flex gap-2 px-2">
                  {[...Array(3)].map((_, i) => (
                    <motion.div
                      key={i}
                      className="flex-1 bg-gray-800/30 rounded-lg border border-white/10 flex items-center justify-center"
                      whileHover={{ scale: 1.05, backgroundColor: 'rgba(255, 255, 255, 0.1)' }}
                      transition={{ duration: 0.3 }}
                    >
                      <motion.span
                        className="text-xs font-mono text-cyan-300"
                        animate={{ opacity: [0.5, 1, 0.5] }}
                        transition={{ duration: 1 + i * 0.3, repeat: Infinity }}
                      >
                        {['SELECT', 'CONFIRM', 'CAST'][i]}
                      </motion.span>
                    </motion.div>
                  ))}
                </div>

                {/* Status Lights */}
                <div className="absolute top-2 left-3 right-3 flex justify-between">
                  {[...Array(3)].map((_, i) => (
                    <motion.div
                      key={i}
                      className="w-2 h-2 rounded-full"
                      style={{ backgroundColor: ['#ec4899', '#06b6d4', '#a855f7'][i] }}
                      animate={{ opacity: [0.3, 1, 0.3], scale: [1, 1.2, 1] }}
                      transition={{ duration: 1.5 + i * 0.2, repeat: Infinity, delay: i * 0.1 }}
                    />
                  ))}
                </div>

                {/* Outer Glow */}
                <motion.div
                  className="absolute inset-0 rounded-2xl ring-1 ring-cyan-500/20"
                  animate={{ ringOffsetColor: ['rgba(6, 182, 212, 0.1)', 'rgba(168, 85, 247, 0.1)'] }}
                  transition={{ duration: 3, repeat: Infinity }}
                />
              </motion.div>

              <motion.p
                className="mt-4 text-sm text-gray-400"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8 }}
              >
                EVM Device
              </motion.p>
            </motion.div>
          </div>

          {/* Educational Note */}
          <motion.div
            className="bg-gradient-to-r from-purple-600/10 to-cyan-500/10 backdrop-blur-md rounded-2xl p-6 border border-white/10"
            variants={itemVariants}
          >
            <motion.div
              className="flex items-start gap-3"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 1.2, duration: 0.5 }}
            >
              <motion.div
                className="w-8 h-8 rounded-full bg-gradient-to-br from-purple-500 to-cyan-500 flex items-center justify-center flex-shrink-0"
                animate={{ rotate: [0, 360] }}
                transition={{ duration: 4, repeat: Infinity, ease: 'linear' }}
              >
                <span className="text-white text-sm">💡</span>
              </motion.div>
              <div>
                <h4 className="text-lg font-semibold text-white mb-2">
                  Understanding System Communication
                </h4>
                <p className="text-gray-300 leading-relaxed">
                  Understanding a system requires understanding how it communicates, not just
                  what programming language is used.
                </p>
              </div>
            </motion.div>
          </motion.div>

          {/* Display Text */}
          <motion.div
            className="text-center mt-8"
            variants={itemVariants}
          >
            <motion.p
              className="text-2xl md:text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-white to-purple-300"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 1.5, duration: 0.6 }}
            >
              No direct remote connection in this educational illustration.
            </motion.p>
          </motion.div>
        </motion.div>
      </div>
    </motion.div>
  );
};

// Card 2: Connectivity Methods
const Card2 = ({ isVisible }) => {
  const containerVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { staggerChildren: 0.2, delayChildren: 0.3 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
  };

  const connectivityTypes = [
    { name: 'WiFi', icon: '📶', color: 'from-blue-400 to-cyan-400', delay: 0.5 },
    { name: 'Bluetooth', icon: '🫀', color: 'from-blue-500 to-indigo-500', delay: 0.7 },
    { name: 'Mobile Network', icon: '📱', color: 'from-green-400 to-emerald-400', delay: 0.9 },
    { name: 'Internet', icon: '🌐', color: 'from-purple-400 to-pink-400', delay: 1.1 },
  ];

  return (
    <motion.div
      className="w-full max-w-2xl mx-auto"
      variants={containerVariants}
      initial="hidden"
      animate={isVisible ? "visible" : "hidden"}
    >
      {/* Card Container */}
      <div className="relative bg-gradient-to-br from-gray-800/30 to-gray-900/50 rounded-3xl backdrop-blur-lg border border-white/10 shadow-2xl overflow-hidden">
        {/* Header */}
        <motion.div
          className="p-6 border-b border-white/10"
          variants={itemVariants}
        >
          <motion.span
            className="inline-block px-4 py-1.5 bg-blue-500/10 backdrop-blur-md rounded-full text-sm font-medium text-blue-300 border border-blue-500/20 mb-4"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.4 }}
          >
            Myth vs Reality
          </motion.span>

          <h3 className="text-xl md:text-2xl font-bold text-white">
            "Every electronic machine is connected to the internet."
          </h3>
        </motion.div>

        {/* Content */}
        <motion.div
          className="p-6 lg:p-8"
          variants={itemVariants}
        >
          {/* Animated Connectivity Cards */}
          <div className="relative grid grid-cols-2 gap-4 lg:gap-6 mb-8">
            {connectivityTypes.map((item, index) => (
              <motion.div
                key={index}
                className="relative aspect-square bg-gradient-to-br from-gray-800/40 to-gray-900/60 rounded-2xl backdrop-blur-md border border-white/10 overflow-hidden group"
                initial={{ opacity: 0, y: 20, scale: 0.9 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ delay: item.delay, duration: 0.5, ease: 'easeOut' }}
                whileHover={{ scale: 1.03, y: -5, boxShadow: '0 20px 40px rgba(0, 0, 0, 0.3)' }}
              >
                {/* Background Glow */}
                <motion.div
                  className={`absolute inset-0 bg-gradient-to-br ${item.color} opacity-10`}
                  animate={{ opacity: [10, 20, 10] }}
                  transition={{ duration: 3, repeat: Infinity, delay: index * 0.2 }}
                />

                {/* Icon */}
                <motion.div
                  className="absolute inset-0 flex items-center justify-center"
                  animate={{ scale: [1, 1.05, 1] }}
                  transition={{ duration: 2, repeat: Infinity, delay: index * 0.3 }}
                >
                  <span className="text-5xl lg:text-6xl">{item.icon}</span>
                </motion.div>

                {/* Name */}
                <motion.div
                  className="absolute bottom-4 left-0 right-0 text-center"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: item.delay + 0.2, duration: 0.3 }}
                >
                  <p className="text-sm font-medium text-white drop-shadow-lg">
                    {item.name}
                  </p>
                </motion.div>

                {/* Glow Effect */}
                <motion.div
                  className="absolute inset-0 rounded-2xl border border-white/10"
                  animate={{ borderColor: ['rgba(255, 255, 255, 0.1)', 'rgba(255, 255, 255, 0.3)'] }}
                  transition={{ duration: 2, repeat: Infinity, delay: index * 0.4 }}
                />
              </motion.div>
            ))}
          </div>

          {/* Check Animation */}
          <motion.div
            className="flex flex-col items-center justify-center py-8"
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 1.3, duration: 0.6 }}
          >
            <motion.div
              className="w-16 h-16 rounded-full bg-gradient-to-br from-green-500/20 to-emerald-500/20 flex items-center justify-center border border-green-400/30 mb-4"
              animate={{ scale: [1, 1.05, 1], rotate: [0, 5, -5, 0] }}
              transition={{ duration: 2, repeat: Infinity, delay: 1.5 }}
            >
              <motion.span
                className="text-3xl text-green-400"
                animate={{ scale: [1, 1.1, 1] }}
                transition={{ duration: 1, repeat: Infinity, delay: 1.7 }}
              >
                ✓
              </motion.span>
            </motion.div>

            <motion.p
              className="text-xl font-semibold text-white"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.8 }}
            >
              Different systems use different communication methods.
            </motion.p>
          </motion.div>

          {/* Educational Note */}
          <motion.div
            className="bg-gradient-to-r from-blue-600/10 to-cyan-500/10 backdrop-blur-md rounded-2xl p-6 border border-white/10"
            variants={itemVariants}
          >
            <motion.div
              className="flex items-start gap-3"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 2.2, duration: 0.5 }}
            >
              <motion.div
                className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center flex-shrink-0"
                animate={{ rotate: [0, 360] }}
                transition={{ duration: 4, repeat: Infinity, ease: 'linear' }}
              >
                <span className="text-white text-sm">🌐</span>
              </motion.div>
              <div>
                <h4 className="text-lg font-semibold text-white mb-2">
                  Understanding Connectivity
                </h4>
                <p className="text-gray-300 leading-relaxed">
                  Not all electronic systems are internet-connected. Some use isolated networks,
                  direct connections, or are completely offline for security.
                </p>
              </div>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </motion.div>
  );
};

// Card 3: Skill Ladder
const Card3 = ({ isVisible }) => {
  const containerVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { staggerChildren: 0.2, delayChildren: 0.3 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
  };

  const skillLevels = [
    { level: 1, name: 'Programming', color: 'from-gray-400 to-gray-500', icon: '💻' },
    { level: 2, name: 'Operating Systems', color: 'from-blue-400 to-cyan-400', icon: '🪟' },
    { level: 3, name: 'Networks', color: 'from-green-400 to-emerald-400', icon: '🌐' },
    { level: 4, name: 'Hardware', color: 'from-yellow-400 to-orange-400', icon: '🔧' },
    { level: 5, name: 'Security Research', color: 'from-purple-400 to-pink-400', icon: '🔍' },
    { level: 6, name: 'Physical Access', color: 'from-red-400 to-rose-400', icon: '🚪' },
  ];

  return (
    <motion.div
      className="w-full max-w-2xl mx-auto"
      variants={containerVariants}
      initial="hidden"
      animate={isVisible ? "visible" : "hidden"}
    >
      {/* Card Container */}
      <div className="relative bg-gradient-to-br from-gray-800/30 to-gray-900/50 rounded-3xl backdrop-blur-lg border border-white/10 shadow-2xl overflow-hidden">
        {/* Header */}
        <motion.div
          className="p-6 border-b border-white/10"
          variants={itemVariants}
        >
          <motion.span
            className="inline-block px-4 py-1.5 bg-yellow-500/10 backdrop-blur-md rounded-full text-sm font-medium text-yellow-300 border border-yellow-500/20 mb-4"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.4 }}
          >
            Myth vs Reality
          </motion.span>

          <h3 className="text-xl md:text-2xl font-bold text-white">
            "If I know coding, I can hack anything."
          </h3>
        </motion.div>

        {/* Content */}
        <motion.div
          className="p-6 lg:p-8"
          variants={itemVariants}
        >
          {/* Skill Ladder Visualization */}
          <div className="relative flex flex-col items-center justify-center mb-8 min-h-[400px]">
            {/* Ladder Structure */}
            <motion.div
              className="relative flex flex-col items-center"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.5, duration: 0.6 }}
            >
              {/* Ladder Sides */}
              <div className="absolute left-8 top-0 bottom-0 w-1 bg-gradient-to-b from-white/20 to-white/40 rounded-full" />
              <div className="absolute right-8 top-0 bottom-0 w-1 bg-gradient-to-b from-white/20 to-white/40 rounded-full" />

              {/* Rungs and Levels */}
              {skillLevels.map((skill, index) => (
                <motion.div
                  key={index}
                  className="relative w-full flex items-center justify-between mb-4"
                  initial={{ opacity: 0, x: -50 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.7 + index * 0.15, duration: 0.5, ease: 'easeOut' }}
                >
                  {/* Left side - Level number */}
                  <motion.div
                    className="flex items-center justify-center w-8 h-8 rounded-full bg-gradient-to-br from-gray-800/50 to-gray-900/70 border border-white/10 text-sm font-bold text-white"
                    whileHover={{ scale: 1.1, backgroundColor: 'rgba(255, 255, 255, 0.1)' }}
                  >
                    {skill.level}
                  </motion.div>

                  {/* Center - Skill name and icon */}
                  <motion.div
                    className="flex flex-col items-center flex-1 mx-8"
                    whileHover={{ scale: 1.02 }}
                  >
                    {/* Rung */}
                    <motion.div
                      className="w-48 h-2 bg-gradient-to-r from-white/10 via-white/30 to-white/10 rounded-full mb-2"
                      initial={{ scaleX: 0 }}
                      animate={{ scaleX: 1 }}
                      transition={{ delay: 0.8 + index * 0.15, duration: 0.4 }}
                    />

                    {/* Skill Icon and Name */}
                    <motion.div
                      className="flex items-center gap-3"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.9 + index * 0.15 }}
                    >
                      <motion.span
                        className="text-2xl"
                        animate={{ scale: [1, 1.05, 1] }}
                        transition={{ duration: 2, repeat: Infinity, delay: 1 + index * 0.2 }}
                      >
                        {skill.icon}
                      </motion.span>
                      <motion.span
                        className={`text-lg font-semibold text-transparent bg-clip-text bg-gradient-to-r ${skill.color}`}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 1 + index * 0.15 }}
                      >
                        {skill.name}
                      </motion.span>
                    </motion.div>
                  </motion.div>

                  {/* Right side - Difficulty indicator */}
                  <motion.div
                    className="flex items-center justify-center w-8 h-8"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1.1 + index * 0.15 }}
                  >
                    <motion.div
                      className="w-6 h-6 rounded-full border-2 border-white/20 flex items-center justify-center"
                      animate={{ borderColor: ['rgba(255, 255, 255, 0.2)', 'rgba(255, 255, 255, 0.4)'] }}
                      transition={{ duration: 2, repeat: Infinity, delay: index * 0.3 }}
                    >
                      <motion.span
                        className="text-xs text-white/60"
                        animate={{ opacity: [0.5, 1, 0.5] }}
                        transition={{ duration: 1, repeat: Infinity }}
                      >
                        ★
                      </motion.span>
                    </motion.div>
                  </motion.div>
                </motion.div>
              ))}
            </motion.div>

            {/* Climbing Animation */}
            <motion.div
              className="absolute bottom-0 left-1/2 -translate-x-1/2"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: [0, -5, 0] }}
              transition={{ delay: 2.5, duration: 1, repeat: Infinity }}
            >
              <motion.div
                className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-500 to-cyan-500 flex items-center justify-center shadow-lg"
                animate={{ y: [0, -5, 0] }}
                transition={{ duration: 1, repeat: Infinity }}
              >
                <span className="text-white">👨‍💻</span>
              </motion.div>
            </motion.div>
          </div>

          {/* Display Text */}
          <motion.div
            className="text-center"
            variants={itemVariants}
          >
            <motion.p
              className="text-2xl md:text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-white to-purple-300 mb-4"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 3, duration: 0.6 }}
            >
              Real-world systems are usually more complex than a single script.
            </motion.p>
          </motion.div>

          {/* Educational Note */}
          <motion.div
            className="bg-gradient-to-r from-purple-600/10 to-pink-500/10 backdrop-blur-md rounded-2xl p-6 border border-white/10"
            variants={itemVariants}
          >
            <motion.div
              className="flex items-start gap-3"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 3.3, duration: 0.5 }}
            >
              <motion.div
                className="w-8 h-8 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center flex-shrink-0"
                animate={{ rotate: [0, 360] }}
                transition={{ duration: 4, repeat: Infinity, ease: 'linear' }}
              >
                <span className="text-white text-sm">🎯</span>
              </motion.div>
              <div>
                <h4 className="text-lg font-semibold text-white mb-2">
                  Systems Thinking
                </h4>
                <p className="text-gray-300 leading-relaxed">
                  Real systems require understanding multiple layers: from hardware to software,
                  networks to security protocols. It's a multi-disciplinary challenge.
                </p>
              </div>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </motion.div>
  );
};

// Card 4: Security Formula
const Card4 = ({ isVisible }) => {
  const containerVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { staggerChildren: 0.2, delayChildren: 0.3 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
  };

  const formulaPieces = [
    { text: 'Technology', color: 'from-cyan-400 to-blue-400', icon: '💻', delay: 0.5 },
    { text: 'Physical Security', color: 'from-yellow-400 to-orange-400', icon: '🔒', delay: 1.0 },
    { text: 'Processes', color: 'from-green-400 to-emerald-400', icon: '📋', delay: 1.5 },
    { text: 'Verification', color: 'from-purple-400 to-pink-400', icon: '✓', delay: 2.0 },
  ];

  return (
    <motion.div
      className="w-full max-w-2xl mx-auto"
      variants={containerVariants}
      initial="hidden"
      animate={isVisible ? "visible" : "hidden"}
    >
      {/* Card Container */}
      <div className="relative bg-gradient-to-br from-gray-800/30 to-gray-900/50 rounded-3xl backdrop-blur-lg border border-white/10 shadow-2xl overflow-hidden">
        {/* Header */}
        <motion.div
          className="p-6 border-b border-white/10"
          variants={itemVariants}
        >
          <motion.span
            className="inline-block px-4 py-1.5 bg-green-500/10 backdrop-blur-md rounded-full text-sm font-medium text-green-300 border border-green-500/20 mb-4"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.4 }}
          >
            Myth vs Reality
          </motion.span>

          <h3 className="text-xl md:text-2xl font-bold text-white">
            "Technology security is only software."
          </h3>
        </motion.div>

        {/* Content */}
        <motion.div
          className="p-6 lg:p-8"
          variants={itemVariants}
        >
          {/* Formula Visualization */}
          <div className="relative flex flex-col items-center justify-center mb-8 min-h-[300px]">
            {/* Formula Pieces */}
            <motion.div
              className="relative flex flex-wrap items-center justify-center gap-4 lg:gap-8"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6, duration: 0.6 }}
            >
              {formulaPieces.map((piece, index) => (
                <motion.div
                  key={index}
                  className="relative flex flex-col items-center"
                  initial={{ opacity: 0, y: 20, scale: 0.9 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  transition={{ delay: piece.delay, duration: 0.5, ease: 'easeOut' }}
                  whileHover={{ scale: 1.05, y: -5 }}
                >
                  {/* Piece Card */}
                  <motion.div
                    className={`relative w-24 h-20 bg-gradient-to-br ${piece.color} rounded-2xl flex items-center justify-center shadow-lg border border-white/20 overflow-hidden`}
                    initial={{ rotate: -5, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    transition={{ delay: piece.delay, duration: 0.6, ease: 'easeOut' }}
                  >
                    {/* Background Animation */}
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent"
                      animate={{ opacity: [0.5, 1, 0.5] }}
                      transition={{ duration: 2, repeat: Infinity, delay: piece.delay }}
                    />

                    {/* Icon */}
                    <motion.span
                      className="text-3xl"
                      animate={{ scale: [1, 1.05, 1] }}
                      transition={{ duration: 2, repeat: Infinity, delay: piece.delay + 0.2 }}
                    >
                      {piece.icon}
                    </motion.span>

                    {/* Glow */}
                    <motion.div
                      className="absolute inset-0 rounded-2xl ring-1 ring-white/30"
                      animate={{ ringOffsetColor: ['rgba(255, 255, 255, 0.2)', 'rgba(255, 255, 255, 0.4)'] }}
                      transition={{ duration: 2, repeat: Infinity, delay: piece.delay + 0.4 }}
                    />
                  </motion.div>

                  {/* Piece Text */}
                  <motion.p
                    className="mt-3 text-sm font-medium text-white text-center"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: piece.delay + 0.3 }}
                  >
                    {piece.text}
                  </motion.p>
                </motion.div>
              ))}
            </motion.div>

            {/* Plus Signs */}
            <motion.div
              className="absolute top-1/2 left-0 right-0 flex justify-between items-center px-4 lg:px-8 -translate-y-1/2"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 2.5, duration: 0.6 }}
            >
              <motion.span
                className="text-2xl font-bold text-white/60"
                animate={{ opacity: [0.6, 1, 0.6] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                +
              </motion.span>
              <motion.span
                className="text-2xl font-bold text-white/60"
                animate={{ opacity: [0.6, 1, 0.6] }}
                transition={{ duration: 2, repeat: Infinity, delay: 0.3 }}
              >
                +
              </motion.span>
              <motion.span
                className="text-2xl font-bold text-white/60"
                animate={{ opacity: [0.6, 1, 0.6] }}
                transition={{ duration: 2, repeat: Infinity, delay: 0.6 }}
              >
                +
              </motion.span>
            </motion.div>

            {/* Equals Sign and Result */}
            <motion.div
              className="mt-8 flex items-center justify-center gap-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 3.0, duration: 0.6 }}
            >
              <motion.div
                className="w-1 h-12 bg-gradient-to-b from-white/20 to-white/60"
                initial={{ height: 0 }}
                animate={{ height: 48 }}
                transition={{ delay: 3.2, duration: 0.4 }}
              />
              <motion.div
                className="w-12 h-1 bg-gradient-to-r from-white/20 to-white/60"
                initial={{ width: 0 }}
                animate={{ width: 48 }}
                transition={{ delay: 3.4, duration: 0.4 }}
              />

              <motion.div
                className="px-6 py-3 bg-gradient-to-r from-purple-600/20 to-cyan-500/20 backdrop-blur-md rounded-xl border border-white/20"
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 3.6, duration: 0.5 }}
              >
                <motion.span
                  className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-white to-cyan-400"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 3.8 }}
                >
                  Trust
                </motion.span>
              </motion.div>
            </motion.div>
          </div>

          {/* Display Text */}
          <motion.div
            className="text-center"
            variants={itemVariants}
          >
            <motion.p
              className="text-2xl md:text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-white to-cyan-300 mb-4"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 4.2, duration: 0.6 }}
            >
              Technology + Physical Security + Processes + Verification = Trust
            </motion.p>
          </motion.div>

          {/* Educational Note */}
          <motion.div
            className="bg-gradient-to-r from-purple-600/10 to-cyan-500/10 backdrop-blur-md rounded-2xl p-6 border border-white/10"
            variants={itemVariants}
          >
            <motion.div
              className="flex items-start gap-3"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 4.5, duration: 0.5 }}
            >
              <motion.div
                className="w-8 h-8 rounded-full bg-gradient-to-br from-purple-500 to-cyan-500 flex items-center justify-center flex-shrink-0"
                animate={{ rotate: [0, 360] }}
                transition={{ duration: 4, repeat: Infinity, ease: 'linear' }}
              >
                <span className="text-white text-sm">🔐</span>
              </motion.div>
              <div>
                <h4 className="text-lg font-semibold text-white mb-2">
                  Holistic Security Approach
                </h4>
                <p className="text-gray-300 leading-relaxed">
                  True security comes from multiple layers working together. Technology alone
                  isn't enough - physical protections, proper processes, and verification mechanisms
                  are equally critical.
                </p>
              </div>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </motion.div>
  );
};

// Progress Indicator
const ProgressIndicator = ({ currentCard, totalCards = 4 }) => (
  <motion.div
    className="flex items-center justify-center gap-4 mb-12"
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    transition={{ delay: 0.3, duration: 0.5 }}
  >
    {Array.from({ length: totalCards }).map((_, index) => (
      <motion.div
        key={index}
        className={`relative w-3 h-3 rounded-full transition-all duration-300 ${
          index < currentCard
            ? 'bg-green-400 shadow-glow-green'
            : index === currentCard
              ? 'bg-white shadow-glow-white'
              : 'bg-white/20'
        }`}
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 0.4 + index * 0.1, duration: 0.4, ease: 'easeOut' }}
      >
        {/* Animated pulse for current card */}
        {index === currentCard && (
          <motion.div
            className="absolute inset-0 rounded-full border-2 border-white/50"
            animate={{ scale: [1, 1.2, 1], opacity: [1, 0, 1] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          />
        )}
      </motion.div>
    ))}
  </motion.div>
);

// Navigation Controls
const NavigationControls = ({ currentCard, totalCards, onNext, onPrevious, onCardSelect }) => (
  <motion.div
    className="flex items-center justify-between mt-8"
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay: 0.6, duration: 0.5 }}
  >
    {/* Previous Button */}
    <motion.button
      onClick={onPrevious}
      disabled={currentCard === 1}
      className="inline-flex items-center justify-center px-6 py-3 text-lg font-semibold text-white bg-white/5 backdrop-blur-md rounded-xl border border-white/10 hover:bg-white/10 transition-all duration-300 disabled:opacity-30 disabled:cursor-not-allowed"
      whileHover={{ scale: 1.02, x: -3 }}
      whileTap={{ scale: 0.98, x: 1 }}
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: 0.8, duration: 0.4 }}
    >
      <motion.span className="mr-2" animate={{ x: [0, -3, 0] }} transition={{ duration: 1, repeat: Infinity }}>
        ←
      </motion.span>
      <span>Previous</span>
    </motion.button>

    {/* Card Selectors */}
    <motion.div
      className="hidden md:flex items-center gap-2"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.9, duration: 0.4 }}
    >
      {Array.from({ length: totalCards }).map((_, index) => (
        <motion.button
          key={index}
          onClick={() => onCardSelect(index + 1)}
          className={`relative w-10 h-10 rounded-full flex items-center justify-center text-sm font-medium transition-all duration-300 ${
            index + 1 === currentCard
              ? 'bg-white text-gray-900 shadow-lg'
              : 'bg-white/10 text-white/60 hover:bg-white/20'
          }`}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          {index + 1}
          {index + 1 === currentCard && (
            <motion.div
              className="absolute inset-0 rounded-full border-2 border-white/50"
              animate={{ scale: [1, 1.1, 1], opacity: [1, 0, 1] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            />
          )}
        </motion.button>
      ))}
    </motion.div>

    {/* Next Button */}
    <motion.button
      onClick={onNext}
      disabled={currentCard === totalCards}
      className="inline-flex items-center justify-center px-6 py-3 text-lg font-semibold text-white bg-gradient-to-r from-purple-600 to-cyan-500 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 disabled:opacity-30 disabled:cursor-not-allowed"
      whileHover={{ scale: 1.02, x: 3 }}
      whileTap={{ scale: 0.98, x: -1 }}
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: 0.8, duration: 0.4 }}
    >
      <span>Next</span>
      <motion.span className="ml-2" animate={{ x: [0, 3, 0] }} transition={{ duration: 1, repeat: Infinity }}>
        →
      </motion.span>
    </motion.button>
  </motion.div>
);

// Main MythRealitySection Component
const MythRealitySection = () => {
  const [currentCard, setCurrentCard] = useState(1);
  const containerRef = useRef(null);

  // Scroll-based animations
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start'],
  });

  const opacity = useTransform(scrollYProgress, [0, 0.5, 1], [0, 1, 0]);
  const y = useTransform(scrollYProgress, [0, 1], [50, -50]);

  // InView detection for cards
  const card1Ref = useRef(null);
  const card2Ref = useRef(null);
  const card3Ref = useRef(null);
  const card4Ref = useRef(null);

  const isCard1InView = useInView(card1Ref, { once: false, margin: '-100px' });
  const isCard2InView = useInView(card2Ref, { once: false, margin: '-100px' });
  const isCard3InView = useInView(card3Ref, { once: false, margin: '-100px' });
  const isCard4InView = useInView(card4Ref, { once: false, margin: '-100px' });

  const handleNext = () => {
    if (currentCard < 4) {
      setCurrentCard(currentCard + 1);
    }
  };

  const handlePrevious = () => {
    if (currentCard > 1) {
      setCurrentCard(currentCard - 1);
    }
  };

  const handleCardSelect = (cardNumber) => {
    setCurrentCard(cardNumber);
  };

  // Container animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1, delayChildren: 0.2 }
    }
  };

  // Section header animation
  const headerVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }
    }
  };

  return (
    <section
      ref={containerRef}
      className="relative py-24 w-full bg-gradient-to-br from-gray-900 via-purple-900/10 to-black"
    >
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden -z-10">
        {/* Subtle grid */}
        <div className="absolute inset-0 [background-image:linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] [background-size:40px_40px]" />

        {/* Animated gradient orbs */}
        <motion.div
          className="absolute top-1/4 left-10% w-72 h-72 bg-purple-600/10 rounded-full blur-3xl"
          animate={{
            x: [0, 50, 0],
            y: [0, -30, 0],
            opacity: [0.1, 0.2, 0.1],
          }}
          transition={{ duration: 8, ease: 'easeInOut', repeat: Infinity, repeatType: 'loop' }}
        />

        <motion.div
          className="absolute bottom-1/4 right-10% w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl"
          animate={{
            x: [0, -40, 0],
            y: [0, 40, 0],
            opacity: [0.05, 0.15, 0.05],
          }}
          transition={{ duration: 10, ease: 'easeInOut', repeat: Infinity, repeatType: 'loop' }}
        />

        {/* Floating particles */}
        <FloatingParticles count={20} />
      </div>

      {/* Main Container */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          className="text-center mb-16"
          variants={headerVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.span
            className="inline-block px-4 py-1.5 bg-white/5 backdrop-blur-md rounded-full text-sm font-medium text-cyan-300 border border-white/10 mb-6"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
          >
            Educational Insights
          </motion.span>

          <motion.h2
            className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.6 }}
          >
            <motion.span
              className="text-transparent bg-clip-text bg-gradient-to-r from-white to-purple-300"
              whileHover={{ scale: 1.01 }}
            >
              Myth vs Reality
            </motion.span>
          </motion.h2>

          <motion.p
            className="text-lg md:text-xl text-gray-300 max-w-3xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.6 }}
          >
            Technology discussions become better when we understand how systems actually work.
          </motion.p>
        </motion.div>

        {/* Progress Indicator */}
        <ProgressIndicator currentCard={currentCard} totalCards={4} />

        {/* Cards Container */}
        <motion.div
          className="space-y-8"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {/* Card 1 */}
          <motion.div
            ref={card1Ref}
            className={currentCard === 1 ? 'block' : 'hidden'}
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: currentCard === 1 ? 1 : 0, y: currentCard === 1 ? 0 : 50 }}
            transition={{ duration: 0.5, ease: 'easeInOut' }}
          >
            <Card1 isVisible={isCard1InView} />
          </motion.div>

          {/* Card 2 */}
          <motion.div
            ref={card2Ref}
            className={currentCard === 2 ? 'block' : 'hidden'}
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: currentCard === 2 ? 1 : 0, y: currentCard === 2 ? 0 : 50 }}
            transition={{ duration: 0.5, ease: 'easeInOut' }}
          >
            <Card2 isVisible={isCard2InView} />
          </motion.div>

          {/* Card 3 */}
          <motion.div
            ref={card3Ref}
            className={currentCard === 3 ? 'block' : 'hidden'}
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: currentCard === 3 ? 1 : 0, y: currentCard === 3 ? 0 : 50 }}
            transition={{ duration: 0.5, ease: 'easeInOut' }}
          >
            <Card3 isVisible={isCard3InView} />
          </motion.div>

          {/* Card 4 */}
          <motion.div
            ref={card4Ref}
            className={currentCard === 4 ? 'block' : 'hidden'}
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: currentCard === 4 ? 1 : 0, y: currentCard === 4 ? 0 : 50 }}
            transition={{ duration: 0.5, ease: 'easeInOut' }}
          >
            <Card4 isVisible={isCard4InView} />
          </motion.div>
        </motion.div>

        {/* Navigation Controls */}
        <NavigationControls
          currentCard={currentCard}
          totalCards={4}
          onNext={handleNext}
          onPrevious={handlePrevious}
          onCardSelect={handleCardSelect}
        />

        {/* Floating Action Buttons */}
        <motion.div
          className="fixed bottom-8 right-8 flex flex-col gap-4"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 1.5, duration: 0.5 }}
        >
          <motion.button
            className="w-12 h-12 rounded-full bg-gradient-to-br from-purple-600 to-cyan-500 flex items-center justify-center text-white shadow-xl hover:shadow-2xl transition-all duration-300"
            whileHover={{ scale: 1.05, rotate: 5 }}
            whileTap={{ scale: 0.95, rotate: 0 }}
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          >
            <motion.span animate={{ rotate: [0, 360] }} transition={{ duration: 3, repeat: Infinity, ease: 'linear' }}>
              ↑
            </motion.span>
          </motion.button>
        </motion.div>

        {/* Decorative Corner Elements */}
        <motion.div
          className="absolute bottom-8 left-8 w-32 h-1 bg-gradient-to-r from-purple-500/0 via-purple-500/40 to-transparent"
          animate={{ opacity: [0.3, 0.7, 0.3] }}
          transition={{ duration: 3, repeat: Infinity }}
        />
        <motion.div
          className="absolute bottom-8 right-8 w-32 h-1 bg-gradient-to-l from-cyan-500/0 via-cyan-500/40 to-transparent"
          animate={{ opacity: [0.3, 0.7, 0.3] }}
          transition={{ duration: 3, repeat: Infinity, delay: 1 }}
        />
      </div>
    </section>
  );
};

export default MythRealitySection;
