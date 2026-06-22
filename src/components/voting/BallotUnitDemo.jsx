import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// Fictional candidates with neutral symbols
const candidates = [
  { id: 1, name: 'Aarav Sharma', symbol: '🌟' },
  { id: 2, name: 'Meera Patel', symbol: '🌺' },
  { id: 3, name: 'Kabir Rao', symbol: '🏔️' },
  { id: 4, name: 'Ananya Singh', symbol: '🌊' }
];

// Simple beep sound using Web Audio API
const playBeep = () => {
  try {
    const audioContext = new (window.AudioContext || window.webkitAudioContext)();
    const oscillator = audioContext.createOscillator();
    const gainNode = audioContext.createGain();

    oscillator.connect(gainNode);
    gainNode.connect(audioContext.destination);

    oscillator.frequency.value = 800;
    oscillator.type = 'sine';
    gainNode.gain.value = 0.1;

    oscillator.start();
    oscillator.stop(audioContext.currentTime + 0.1);
  } catch (error) {
    // Audio not supported, fail silently
    console.log('Audio not available');
  }
};

const BallotUnitDemo = ({ onComplete }) => {
  const [selectedCandidate, setSelectedCandidate] = useState(null);

  const handleSelect = (candidate) => {
    playBeep();
    setSelectedCandidate(candidate);

    // Move to next step after selection
    setTimeout(() => {
      onComplete(candidate);
    }, 1000);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-[250px] w-full">
      {/* Ballot Unit */}
      <motion.div
        className="relative w-full max-w-md bg-gradient-to-br from-gray-700/20 to-gray-800/20 rounded-2xl backdrop-blur-md border border-white/10 shadow-2xl overflow-hidden"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
      >
        {/* Ballot header */}
        <div className="relative p-4 border-b border-white/10 bg-white/5">
          <h4 className="text-xs font-bold text-white/80 uppercase tracking-wider text-center">
            Ballot Unit - Cast Your Vote
          </h4>
          <p className="text-xs text-white/60 mt-1 text-center">
            Select one candidate
          </p>
        </div>

        {/* Candidates list */}
        <div className="p-4 space-y-3">
          {candidates.map((candidate) => {
            const isSelected = selectedCandidate?.id === candidate.id;
            const isDisabled = selectedCandidate && !isSelected;

            return (
              <motion.button
                key={candidate.id}
                onClick={() => !isDisabled && handleSelect(candidate)}
                disabled={isDisabled}
                className={`w-full flex items-center space-x-4 p-4 rounded-xl transition-all duration-300 ${
                  isSelected
                    ? 'bg-gradient-to-r from-purple-600/30 to-cyan-600/30 border-2 border-cyan-400 shadow-xl' :
                  isDisabled
                    ? 'opacity-40 cursor-not-allowed' :
                    'bg-white/5 hover:bg-white/10 border border-white/10'
                }`}
                whileHover={!isDisabled ? { scale: 1.01, x: 5 } : {}}
                whileTap={!isDisabled ? { scale: 0.99 } : {}}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: candidate.id * 0.1 }}
              >
                {/* Symbol */}
                <motion.span
                  className="text-2xl"
                  animate={isSelected ? { scale: [1, 1.1, 1] } : {}}
                  transition={{ duration: 0.5, repeat: Infinity }}
                >
                  {candidate.symbol}
                </motion.span>

                {/* Name */}
                <span className={`flex-1 text-left ${isSelected ? 'text-white font-medium' : 'text-gray-300'}`}>
                  {candidate.name}
                </span>

                {/* Blue vote button */}
                <motion.div
                  className={`w-8 h-8 rounded-full flex items-center justify-center ${
                    isSelected
                      ? 'bg-cyan-400 text-white shadow-lg' :
                      'bg-blue-600/50 text-blue-300'
                  }`}
                  whileHover={!isDisabled ? { scale: 1.1 } : {}}
                >
                  <span className="text-xs">{isSelected ? '✓' : '→'}</span>
                </motion.div>
              </motion.button>
            );
          })}
        </div>

        {/* Selection indicator */}
        <AnimatePresence>
          {selectedCandidate && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="absolute -top-2 left-1/2 -translate-x-1/2 px-4 py-2 bg-green-500/20 backdrop-blur-sm rounded-full border border-green-400"
            >
              <span className="text-sm text-green-300 font-medium">
                Selected: {selectedCandidate.name}
              </span>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>

      {/* Message */}
      <AnimatePresence mode="wait">
        {!selectedCandidate ? (
          <motion.p
            key="initial"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="mt-4 text-center text-gray-300"
          >
            Select your preferred candidate
          </motion.p>
        ) : (
          <motion.p
            key="selected"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="mt-4 text-center text-purple-400 font-medium"
          >
            Vote recorded: {selectedCandidate.name}
          </motion.p>
        )}
      </AnimatePresence>

      {/* Note */}
      <p className="mt-2 text-xs text-gray-500 text-center">
        Fictional candidates for educational purposes only
      </p>
    </div>
  );
};

export default BallotUnitDemo;
