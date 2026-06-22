import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const ControlUnitDemo = ({ onComplete }) => {
  const [isActivated, setIsActivated] = useState(false);

  const handleEnable = () => {
    setIsActivated(true);
    setTimeout(() => {
      onComplete();
    }, 2000);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-[200px]">
      {/* Control Unit Card */}
      <motion.div
        className="relative w-64 h-48 bg-gradient-to-br from-gray-700/20 to-gray-800/20 rounded-2xl backdrop-blur-md border border-white/10 shadow-2xl overflow-hidden"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
      >
        {/* Unit header */}
        <div className="relative p-4 border-b border-white/10 bg-white/5">
          <h4 className="text-xs font-bold text-white/80 uppercase tracking-wider">
            Control Unit
          </h4>
          <p className="text-xs text-white/60 mt-1">Polling Officer Panel</p>
        </div>

        {/* Unit body */}
        <div className="relative p-4 flex flex-col items-center justify-center h-[calc(100%-60px)]">
          {/* Power button */}
          <motion.div
            className={`relative w-16 h-16 rounded-full flex items-center justify-center shadow-xl ${
              isActivated
                ? 'bg-green-500/80 border-4 border-green-400' :
                'bg-gray-600/50 border-2 border-gray-500/30'
            }`}
            animate={isActivated ? { scale: [1, 1.05, 1] } : {}}
            transition={{ duration: 0.5, repeat: Infinity }}
          >
            <span className={`text-2xl ${isActivated ? 'text-green-200' : 'text-gray-400'}`}>
              {isActivated ? '✓' : '▶'}
            </span>
          </motion.div>

          <p className="mt-3 text-xs text-white/70 text-center">
            {isActivated ? 'Ballot Activated' : 'Ready to Enable'}
          </p>

          {/* Signal animation (appears on activation) */}
          <AnimatePresence>
            {isActivated && (
              <motion.div
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0 }}
                className="absolute top-1/2 right-4 w-8 h-1 bg-gradient-to-l from-cyan-400 to-transparent rounded-full"
              >
                <motion.div
                  className="absolute -top-2 -right-1 w-3 h-3 bg-cyan-400 rounded-full"
                  animate={{ x: [-20, 20], opacity: [1, 0] }}
                  transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                />
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Status lights */}
        <div className="absolute bottom-3 left-3 right-3 flex justify-center space-x-2">
          {[1, 2, 3].map((light) => (
            <motion.div
              key={light}
              className={`w-2 h-2 rounded-full ${
                isActivated ? 'bg-green-400' : 'bg-gray-500'
              }`}
              animate={isActivated ? { opacity: [0.5, 1, 0.5] } : {}}
              transition={{ duration: 1, repeat: Infinity, delay: light * 0.2 }}
            />
          ))}
        </div>
      </motion.div>

      {/* Message */}
      <AnimatePresence mode="wait">
        {!isActivated ? (
          <motion.p
            key="initial"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="mt-4 text-center text-gray-300"
          >
            Polling officer ready to activate ballot
          </motion.p>
        ) : (
          <motion.p
            key="activated"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="mt-4 text-center text-cyan-400 font-medium"
          >
            Ballot activated for one vote
          </motion.p>
        )}
      </AnimatePresence>

      {/* Enable Button */}
      <motion.button
        onClick={handleEnable}
        disabled={isActivated}
        className="mt-6 px-8 py-3 bg-gradient-to-r from-cyan-600 to-purple-500 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed glassmorphism"
        whileHover={{ scale: 1.02, y: -2 }}
        whileTap={{ scale: 0.98, y: 1 }}
      >
        {isActivated ? 'Ballot Ready ✓' : 'Enable Ballot'}
      </motion.button>
    </div>
  );
};

export default ControlUnitDemo;
