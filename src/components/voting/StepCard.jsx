import React from 'react';
import { motion } from 'framer-motion';

const StepCard = ({
  stepNumber,
  title,
  children,
  isActive,
  isCompleted,
  isLocked,
  onClick
}) => {
  return (
    <motion.div
      className={`relative p-6 rounded-2xl border transition-all duration-500 ${
        isLocked
          ? 'bg-gray-800/20 border-gray-700/50 opacity-50 cursor-not-allowed' :
        isActive
          ? 'bg-white/5 backdrop-blur-lg border-purple-500/30 shadow-xl' :
        isCompleted
          ? 'bg-white/5 backdrop-blur-lg border-green-500/30 shadow-lg' :
          'bg-white/5 backdrop-blur-lg border-white/10'
      }`}
      whileHover={!isLocked ? { scale: 1.01, y: -2 } : {}}
      onClick={isLocked ? null : onClick}
    >
      {/* Step number indicator */}
      <motion.div
        className={`absolute -top-4 left-6 w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm ${
          isLocked
            ? 'bg-gray-700 text-gray-500' :
          isActive
            ? 'bg-purple-600 text-white shadow-lg' :
          isCompleted
            ? 'bg-green-500 text-white shadow-lg' :
            'bg-white/10 text-gray-400'
        }`}
        animate={isActive ? { scale: [1, 1.1, 1] } : {}}
        transition={{ duration: 1.5, repeat: Infinity }}
      >
        {stepNumber}
      </motion.div>

      {/* Connector line (for desktop layout) */}
      <div className="hidden lg:block absolute top-1/2 -right-4 w-8 h-0.5 bg-gradient-to-r from-white/20 to-transparent" />

      {/* Content */}
      <div className="pt-4">
        <h3 className="text-lg font-semibold mb-4 text-white">
          {title}
        </h3>
        <div className="min-h-[120px]">
          {children}
        </div>
      </div>

      {/* Status indicator */}
      <div className="absolute bottom-4 right-6">
        {isLocked && (
          <motion.div
            className="w-6 h-6 rounded-full bg-gray-700 flex items-center justify-center"
            animate={{ rotate: [0, 360] }}
            transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
          >
            <span className="text-xs">🔒</span>
          </motion.div>
        )}
        {isCompleted && (
          <motion.div
            className="w-6 h-6 rounded-full bg-green-500 flex items-center justify-center"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
          >
            <span className="text-xs">✓</span>
          </motion.div>
        )}
      </div>
    </motion.div>
  );
};

export default StepCard;
