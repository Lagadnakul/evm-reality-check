import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const VoterVerification = ({ onComplete }) => {
  const [isVerified, setIsVerified] = useState(false);

  const handleVerify = () => {
    setIsVerified(true);
    setTimeout(() => {
      onComplete();
    }, 1500);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-[200px]">
      {/* Voter ID Card */}
      <motion.div
        className="relative w-64 h-40 bg-gradient-to-br from-purple-600/20 to-cyan-600/20 rounded-2xl backdrop-blur-md border border-white/10 shadow-2xl overflow-hidden"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
      >
        {/* Card glow */}
        <motion.div
          className="absolute inset-0 rounded-2xl bg-gradient-to-br from-purple-500/0 via-transparent to-cyan-500/0"
          animate={{ opacity: [0.3, 0.6, 0.3] }}
          transition={{ duration: 3, repeat: Infinity }}
        />

        {/* Card header */}
        <div className="relative p-4 border-b border-white/10">
          <h4 className="text-xs font-bold text-white/80 uppercase tracking-wider">
            Digital Voter ID
          </h4>
          <p className="text-xs text-white/60 mt-1">Educational Demo</p>
        </div>

        {/* Card body */}
        <div className="relative p-4">
          <div className="flex items-center space-x-4">
            {/* Photo placeholder */}
            <div className="w-12 h-12 bg-gradient-to-br from-purple-400 to-cyan-400 rounded-lg flex items-center justify-center">
              <span className="text-xl">👤</span>
            </div>

            {/* Voter info */}
            <div className="space-y-1">
              <p className="text-sm font-semibold text-white">Voter: DEMO USER</p>
              <p className="text-xs text-white/70">ID: EVMD2024001</p>
              <p className="text-xs text-white/60">District: Sample</p>
            </div>
          </div>
        </div>

        {/* Verification checkmark (appears after verification) */}
        <AnimatePresence>
          {isVerified && (
            <motion.div
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: 1, rotate: 0 }}
              exit={{ scale: 0, rotate: 180 }}
              transition={{ duration: 0.5 }}
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-16 h-16 bg-green-500/20 backdrop-blur-sm rounded-full flex items-center justify-center border-2 border-green-400"
            >
              <motion.span
                className="text-3xl text-green-400"
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 0.5, repeat: Infinity }}
              >
                ✓
              </motion.span>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>

      {/* Message */}
      <AnimatePresence mode="wait">
        {!isVerified ? (
          <motion.p
            key="initial"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="mt-4 text-center text-gray-300"
          >
            Present your digital voter ID
          </motion.p>
        ) : (
          <motion.p
            key="verified"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="mt-4 text-center text-green-400 font-medium"
          >
            Voter identity verified
          </motion.p>
        )}
      </AnimatePresence>

      {/* Verify Button */}
      <motion.button
        onClick={handleVerify}
        disabled={isVerified}
        className="mt-6 px-8 py-3 bg-gradient-to-r from-purple-600 to-cyan-500 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed glassmorphism"
        whileHover={{ scale: 1.02, y: -2 }}
        whileTap={{ scale: 0.98, y: 1 }}
      >
        {isVerified ? 'Verified ✓' : 'Verify Voter'}
      </motion.button>
    </div>
  );
};

export default VoterVerification;
