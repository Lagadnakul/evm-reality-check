import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const VerificationSlip = ({ candidate, onComplete }) => {
  const [showSlip, setShowSlip] = useState(true);
  const [dropSlip, setDropSlip] = useState(false);

  // Auto-trigger slip drop after 5 seconds
  useEffect(() => {
    const timer = setTimeout(() => {
      setDropSlip(true);
      setShowSlip(false);
    }, 5000);

    return () => clearTimeout(timer);
  }, []);

  // Notify completion after slip drops
  useEffect(() => {
    if (dropSlip) {
      const timer = setTimeout(() => {
        onComplete();
      }, 1500);
      return () => clearTimeout(timer);
    }
  }, [dropSlip, onComplete]);

  return (
    <div className="flex flex-col items-center justify-center min-h-[250px] relative">
      {/* Verification Window */}
      <motion.div
        className="relative w-64 h-80 bg-gradient-to-b from-white/5 to-white/2 backdrop-blur-lg rounded-2xl border-2 border-white/20 shadow-2xl overflow-hidden"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
      >
        {/* Window header */}
        <div className="p-3 border-b border-white/20 bg-white/10">
          <h4 className="text-xs font-bold text-white/80 uppercase tracking-wider text-center">
            VVPAT Verification
          </h4>
          <p className="text-xs text-white/60 mt-1 text-center">
            Paper Trail - Educational Demo
          </p>
        </div>

        {/* Viewing area */}
        <div className="relative flex-1 flex items-center justify-center p-4">
          <AnimatePresence>
            {showSlip && !dropSlip && (
              <motion.div
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -50 }}
                transition={{ duration: 0.5 }}
                className="relative w-48 h-32 bg-amber-50/90 rounded-lg shadow-lg border border-amber-200 flex flex-col items-center justify-center p-2"
              >
                {/* Perforated edges */}
                <div className="absolute inset-0 rounded-lg border-2 border-dashed border-amber-300/50" />

                {/* Content */}
                <div className="relative z-10 text-center">
                  <motion.span
                    className="text-3xl mb-2"
                    animate={{ scale: [1, 1.1, 1] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  >
                    {candidate?.symbol || '✓'}
                  </motion.span>
                  <p className="text-sm font-medium text-gray-800">
                    {candidate?.name || 'Selected Candidate'}
                  </p>
                  <p className="text-xs text-gray-600 mt-1">
                    Vote recorded in this simulation
                  </p>
                </div>

                {/* Official stamp */}
                <motion.div
                  className="absolute -bottom-2 -right-2 w-8 h-8 bg-purple-600 rounded-full flex items-center justify-center text-white text-xs font-bold shadow-lg"
                  animate={{ rotate: [0, 10, -10, 0] }}
                  transition={{ duration: 3, repeat: Infinity }}
                >
                  DEMO
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Drop animation */}
          <AnimatePresence>
            {dropSlip && (
              <motion.div
                initial={{ y: 0 }}
                animate={{ y: 100 }}
                exit={{ y: 200, opacity: 0 }}
                transition={{ duration: 1 }}
                className="absolute w-48 h-32 bg-amber-50/90 rounded-lg shadow-lg border border-amber-200"
              />
            )}
          </AnimatePresence>
        </div>

        {/* Status light */}
        <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex items-center space-x-2">
          <motion.div
            className="w-3 h-3 rounded-full bg-green-400"
            animate={{ opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 1, repeat: Infinity }}
          />
          <span className="text-xs text-green-400">Verified</span>
        </div>
      </motion.div>

      {/* Sealed box (appears after drop) */}
      <AnimatePresence>
        {dropSlip && (
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -50 }}
            className="mt-8 w-48 h-24 bg-gradient-to-b from-gray-600 to-gray-700 rounded-lg shadow-2xl border border-gray-500 relative overflow-hidden"
          >
            {/* Box label */}
            <div className="absolute top-2 left-0 right-0 text-center">
              <span className="text-xs font-bold text-white/80 uppercase tracking-wider">
                Sealed Vote Box
              </span>
            </div>

            {/* Box seal */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-8 h-8 bg-purple-600 rounded-full flex items-center justify-center">
              <span className="text-white text-xs">🔒</span>
            </div>

            {/* Glow effect */}
            <motion.div
              className="absolute inset-0 bg-gradient-to-t from-green-500/10 to-transparent"
              animate={{ opacity: [0.3, 0.6, 0.3] }}
              transition={{ duration: 2, repeat: Infinity }}
            />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Messages */}
      <AnimatePresence mode="wait">
        {showSlip && !dropSlip ? (
          <motion.p
            key="viewing"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="mt-4 text-center text-cyan-300"
          >
            Verify your selection on the paper slip
          </motion.p>
        ) : dropSlip ? (
          <motion.p
            key="recorded"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="mt-4 text-center text-green-400 font-medium"
          >
            Your simulated vote has been recorded
          </motion.p>
        ) : (
          <motion.p
            key="dropping"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="mt-4 text-center text-purple-300"
          >
            Vote slip dropping into sealed box...
          </motion.p>
        )}
      </AnimatePresence>

      {/* Educational note */}
      <p className="mt-4 text-xs text-gray-500 text-center">
        Interactive concept demo — simplified for education
      </p>
    </div>
  );
};

export default VerificationSlip;
