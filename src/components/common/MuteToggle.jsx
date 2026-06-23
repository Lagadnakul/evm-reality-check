import React from 'react';
import { motion } from 'framer-motion';
import { useSound } from './SoundManager';

const MuteToggle = () => {
  const { isMuted, toggleMute } = useSound();

  return (
    <motion.button
      onClick={toggleMute}
      className="fixed bottom-6 right-6 z-50 flex items-center justify-center w-12 h-12 rounded-full bg-gradient-to-br from-purple-600/80 to-cyan-500/80 backdrop-blur-lg border border-white/20 shadow-xl hover:shadow-2xl transition-all duration-300"
      whileHover={{ scale: 1.05, rotate: [0, 5, -5, 0] }}
      whileTap={{ scale: 0.95, rotate: 0 }}
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: 2, duration: 0.5 }}
    >
      <motion.div
        className="relative w-6 h-6"
        animate={{ scale: [1, 1.05, 1] }}
        transition={{ duration: 1, repeat: Infinity }}
      >
        {isMuted ? (
          <motion.span
            className="absolute text-lg"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3 }}
          >
            🔇
          </motion.span>
        ) : (
          <motion.span
            className="absolute text-lg"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3 }}
          >
            🔊
          </motion.span>
        )}

        {/* Sound waves animation */}
        {!isMuted && (
          <>
            <motion.div
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-8 h-1 bg-cyan-400 rounded-full"
              animate={{ scaleX: [0.5, 1, 0.5], opacity: [0.5, 1, 0.5] }}
              transition={{ duration: 1, repeat: Infinity, delay: 0 }}
            />
            <motion.div
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-10 h-1 bg-cyan-400/60 rounded-full"
              animate={{ scaleX: [0.5, 1, 0.5], opacity: [0.5, 1, 0.5] }}
              transition={{ duration: 1, repeat: Infinity, delay: 0.2 }}
            />
            <motion.div
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-12 h-1 bg-cyan-400/30 rounded-full"
              animate={{ scaleX: [0.5, 1, 0.5], opacity: [0.5, 1, 0.5] }}
              transition={{ duration: 1, repeat: Infinity, delay: 0.4 }}
            />
          </>
        )}
      </motion.div>

      <motion.span
        className="absolute -top-2 -right-2 text-xs font-bold text-white bg-black/30 backdrop-blur-md px-2 py-1 rounded-full"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.3 }}
      >
        {isMuted ? 'Muted' : 'Sound'}
      </motion.span>
    </motion.button>
  );
};

export default MuteToggle;
