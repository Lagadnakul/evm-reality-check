import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// Candidate Data - Fictional names only
const candidates = [
  { id: 1, symbol: '👤', name: 'Aarav Sharma', color: 'from-green-400 to-emerald-400' },
  { id: 2, symbol: '👤', name: 'Meera Patel', color: 'from-yellow-400 to-orange-400' },
  { id: 3, symbol: '👤', name: 'Kabir Rao', color: 'from-blue-400 to-indigo-400' },
  { id: 4, symbol: '👤', name: 'Ananya Singh', color: 'from-purple-400 to-pink-400' },
];

// Step Data with clear instructions
const steps = [
  { id: 1, title: 'Voter Verification', description: 'Verify voter identity to begin' },
  { id: 2, title: 'Officer Activates Ballot', description: 'Polling officer enables voting' },
  { id: 3, title: 'Vote Selection', description: 'Select your candidate' },
  { id: 4, title: 'VVPAT Confirmation', description: 'Verify and confirm your vote' },
];

// Control Unit Component
const ControlUnit = ({ currentStep, onVerify, onActivate, isBallotEnabled }) => {
  // State for this component
  const [isVerifying, setIsVerifying] = useState(false);
  const [isActivating, setIsActivating] = useState(false);

  const indicatorStates = {
    power: true,
    ready: currentStep >= 1,
    ballot: currentStep >= 2 && isBallotEnabled,
    recorded: currentStep >= 4,
  };

  const handleVerify = () => {
    setIsVerifying(true);
    setTimeout(() => {
      setIsVerifying(false);
      onVerify();
    }, 1000);
  };

  const handleActivate = () => {
    setIsActivating(true);
    setTimeout(() => {
      setIsActivating(false);
      onActivate();
    }, 1000);
  };

  return (
    <motion.div
      className="relative w-72 h-80 machine-panel-glow rounded-2xl p-6 flex flex-col"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
    >
      {/* Header */}
      <div className="text-center mb-4">
        <motion.h3
          className="text-lg font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-400 tracking-wider"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          CONTROL UNIT
        </motion.h3>
        <motion.div
          className="w-full h-0.5 bg-gradient-to-r from-cyan-500/30 to-purple-500/30 mt-2"
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ delay: 0.3, duration: 0.5 }}
        />
      </div>

      {/* Indicators */}
      <div className="flex-1 space-y-3 mb-4">
        <div className="space-y-2">
          {[
            { label: 'POWER', state: indicatorStates.power, color: 'green' },
            { label: 'READY', state: indicatorStates.ready, color: 'cyan' },
            { label: 'BALLOT', state: indicatorStates.ballot, color: 'purple' },
            { label: 'RECORDED', state: indicatorStates.recorded, color: 'green' },
          ].map((indicator, index) => (
            <motion.div
              key={index}
              className="flex items-center gap-3 p-2 rounded-lg bg-white/5 border border-white/10"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 + index * 0.1, duration: 0.4 }}
              whileHover={{ scale: 1.01, borderColor: 'rgba(6, 182, 212, 0.3)' }}
            >
              <motion.div
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  indicator.state ? `bg-${indicator.color}-400` : 'bg-gray-600'
                }`}
                animate={indicator.state ? {
                  boxShadow: [`0 0 5px var(--accent-${indicator.color})`, `0 0 15px var(--accent-${indicator.color})`]
                } : {}}
                transition={{ duration: 1, repeat: Infinity }}
              />
              <span className={`text-xs font-mono ${
                indicator.state ? `text-${indicator.color}-300` : 'text-gray-500'
              }`}>
                {indicator.label}
              </span>
              <motion.div
                className={`flex-1 h-1 rounded-full ml-2 ${
                  indicator.state ? `bg-${indicator.color}/20` : 'bg-gray-700/20'
                }`}
                animate={indicator.state ? { opacity: [0.5, 1, 0.5] } : {}}
                transition={{ duration: 2, repeat: Infinity }}
              />
            </motion.div>
          ))}
        </div>

        {/* Action Buttons */}
        <div className="space-y-2">
          {/* Step 1: Verify Voter */}
          {currentStep === 1 && (
            <motion.button
              onClick={handleVerify}
              disabled={isVerifying}
              className="w-full py-3 rounded-xl font-bold text-sm bg-gradient-to-r from-cyan-500/20 to-purple-500/20 border border-cyan-400/40 text-cyan-300 hover:bg-cyan-500/30 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8, duration: 0.4 }}
              whileHover={{ scale: 1.02, boxShadow: '0 0 15px rgba(6, 182, 212, 0.3)' }}
              whileTap={{ scale: 0.98 }}
            >
              <motion.div
                className="flex items-center justify-center gap-2"
                animate={isVerifying ? { opacity: [1, 0.5, 1] } : {}}
                transition={{ duration: 0.5, repeat: Infinity }}
              >
                {isVerifying ? (
                  <motion.span
                    className="text-xs"
                    animate={{ rotate: [0, 360] }}
                    transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                  >
                    ⏳
                  </motion.span>
                ) : (
                  <span>👆 Verify Voter</span>
                )}
              </motion.div>
            </motion.button>
          )}

          {/* Step 2: Activate Ballot */}
          {currentStep === 2 && (
            <motion.button
              onClick={handleActivate}
              disabled={isActivating}
              className="w-full py-3 rounded-xl font-bold text-sm bg-gradient-to-r from-cyan-500/30 to-purple-500/30 border border-cyan-400/60 text-cyan-200 hover:bg-cyan-500/40 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8, duration: 0.4 }}
              whileHover={{ scale: 1.02, boxShadow: '0 0 20px rgba(6, 182, 212, 0.4)' }}
              whileTap={{ scale: 0.98 }}
            >
              <motion.div
                className="flex items-center justify-center gap-2"
                animate={isActivating ? { scale: [1, 1.02, 1] } : {}}
                transition={{ duration: 1, repeat: Infinity }}
              >
                {isActivating ? (
                  <motion.span
                    className="text-xs"
                    animate={{ rotate: [0, 360] }}
                    transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                  >
                    ⏳
                  </motion.span>
                ) : (
                  <span>👆 Activate Ballot</span>
                )}
              </motion.div>
            </motion.button>
          )}

          {/* Steps 3-4: Ballot Active */}
          {currentStep >= 3 && (
            <motion.div
              className="w-full py-3 rounded-xl font-bold text-sm bg-green-500/10 border border-green-400/30 text-green-300 flex items-center justify-center"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.9, duration: 0.4 }}
            >
              <motion.span
                className="text-xs mr-2"
                animate={{ opacity: [0.5, 1, 0.5] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              >
                ✓
              </motion.span>
              Ballot Active
            </motion.div>
          )}
        </div>
      </div>

      {/* Connection Point */}
      <motion.div
        className="absolute -right-4 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-gradient-to-br from-cyan-500 to-purple-500 flex items-center justify-center border-2 border-white/20"
        animate={currentStep >= 2 ? {
          boxShadow: ['0 0 10px rgba(6, 182, 212, 0.5)', '0 0 20px rgba(168, 85, 247, 0.5)']
        } : { opacity: 0.3 }}
        transition={{ duration: 1, repeat: Infinity }}
      >
        <motion.span
          className="text-white text-lg"
          animate={currentStep >= 2 ? { scale: [1, 1.1, 1] } : {}}
          transition={{ duration: 1, repeat: Infinity }}
        >
          →
        </motion.span>
      </motion.div>

      {/* Corner Accents */}
      <div className="absolute -top-1 -left-1 w-3 h-3 border-l-2 border-t-2 border-cyan-500/30 rounded-br" />
      <div className="absolute -bottom-1 -left-1 w-3 h-3 border-l-2 border-b-2 border-cyan-500/30 rounded-tr" />
      <div className="absolute -top-1 -right-1 w-3 h-3 border-r-2 border-t-2 border-purple-500/30 rounded-bl" />
      <div className="absolute -bottom-1 -right-1 w-3 h-3 border-r-2 border-b-2 border-purple-500/30 rounded-tl" />
    </motion.div>
  );
};

// Ballot Unit Component
const BallotUnit = ({ isActive, selectedCandidate, onSelectCandidate, currentStep }) => {
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    if (currentStep === 3) {
      setIsAnimating(true);
      const timer = setTimeout(() => setIsAnimating(false), 1000);
      return () => clearTimeout(timer);
    }
  }, [currentStep]);

  return (
    <motion.div
      className="relative w-80 h-[480px] machine-panel-glow rounded-2xl p-6 flex flex-col"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
    >
      {/* Header */}
      <div className="text-center mb-4">
        <motion.h3
          className="text-lg font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-400 tracking-wider"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          BALLOT UNIT
        </motion.h3>
        <motion.div
          className="w-full h-0.5 bg-gradient-to-r from-cyan-500/30 to-purple-500/30 mt-2"
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ delay: 0.3, duration: 0.5 }}
        />
      </div>

      {/* Display Area */}
      <div className="mb-4">
        <motion.div
          className="h-12 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center mb-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
        >
          <motion.span
            className="text-sm font-mono text-cyan-300/80"
            animate={{ opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            {currentStep === 3 ? (
              isActive ? 'SELECT YOUR CANDIDATE' : 'WAITING FOR ACTIVATION'
            ) : currentStep > 3 ? (
              'VOTE CONFIRMED'
            ) : (
              'WAITING FOR ACTIVATION'
            )}
          </motion.span>
        </motion.div>
      </div>

      {/* Candidate List - Properly sized */}
      <div className="flex-1 space-y-2 overflow-hidden">
        {candidates.map((candidate) => {
          const isSelected = selectedCandidate?.id === candidate.id;
          const isDisabled = (selectedCandidate && !isSelected) || currentStep !== 3;

          return (
            <motion.button
              key={candidate.id}
              onClick={() => !isDisabled && onSelectCandidate(candidate)}
              disabled={isDisabled}
              className={`w-full flex items-center gap-3 p-3 rounded-xl transition-all duration-300 border ${
                isSelected
                  ? `border-${candidate.color.split('-')[1]}-400 bg-gradient-to-r ${candidate.color}/10`
                  : 'border-white/10 bg-white/5 hover:border-cyan-400/30'
              }`}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.5 + candidates.indexOf(candidate) * 0.1, duration: 0.4 }}
              whileHover={!isDisabled ? { scale: 1.01, borderColor: 'rgba(6, 182, 212, 0.4)' } : {}}
              whileTap={!isDisabled ? { scale: 0.99 } : {}}
              style={{
                cursor: isDisabled ? 'not-allowed' : 'pointer',
                opacity: isDisabled ? 0.5 : 1
              }}
            >
              {/* Candidate Symbol */}
              <motion.div
                className={`text-xl flex-shrink-0 w-8 h-8 rounded-full bg-gradient-to-br ${candidate.color}/20 flex items-center justify-center ${
                  isSelected ? 'text-white ring-2 ring-' + candidate.color.split('-')[1] + '-400' : 'text-white/60'
                }`}
                animate={isSelected ? { scale: [1, 1.05, 1] } : {}}
                transition={{ duration: 0.5, repeat: Infinity }}
              >
                {candidate.symbol}
              </motion.div>

              {/* Candidate Name */}
              <motion.span
                className={`flex-1 text-left font-medium text-sm ${
                  isSelected ? 'text-white' : 'text-gray-300'
                }`}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.6 + candidates.indexOf(candidate) * 0.1 }}
              >
                {candidate.name}
              </motion.span>

              {/* Vote Button */}
              {!isSelected && (
                <motion.div
                  className="w-12 h-8 rounded-full bg-gradient-to-r from-cyan-500/20 to-cyan-500/30 border border-cyan-400/40 flex items-center justify-center flex-shrink-0"
                  whileHover={!isDisabled ? { scale: 1.05, backgroundColor: 'rgba(6, 182, 212, 0.4)' } : {}}
                >
                  <span className={`text-cyan-300 text-xs font-bold ${isDisabled ? 'opacity-30' : ''}`}>
                    Vote
                  </span>
                </motion.div>
              )}

              {isSelected && (
                <motion.div
                  className="w-12 h-8 rounded-full bg-gradient-to-br from-cyan-400 to-purple-400 flex items-center justify-center flex-shrink-0"
                  animate={{ scale: [1, 1.05, 1] }}
                  transition={{ duration: 0.5, repeat: Infinity }}
                >
                  <span className="text-white text-sm">✓</span>
                </motion.div>
              )}
            </motion.button>
          );
        })}
      </div>

      {/* Connection Points */}
      <motion.div
        className="absolute -left-4 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-gradient-to-br from-purple-500 to-cyan-500 flex items-center justify-center border-2 border-white/20"
        animate={isActive ? {
          boxShadow: ['0 0 10px rgba(168, 85, 247, 0.5)', '0 0 20px rgba(6, 182, 212, 0.5)']
        } : { opacity: 0.3 }}
        transition={{ duration: 1, repeat: Infinity }}
      >
        <motion.span
          className="text-white text-lg"
          animate={isActive ? { scale: [1, 1.1, 1] } : {}}
          transition={{ duration: 1, repeat: Infinity }}
        >
          ←
        </motion.span>
      </motion.div>

      <motion.div
        className="absolute -right-4 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-gradient-to-br from-cyan-500 to-purple-500 flex items-center justify-center border-2 border-white/20"
        animate={selectedCandidate ? {
          boxShadow: ['0 0 10px rgba(6, 182, 212, 0.5)', '0 0 20px rgba(168, 85, 247, 0.5)']
        } : { opacity: 0.3 }}
        transition={{ duration: 1, repeat: Infinity }}
      >
        {selectedCandidate && (
          <motion.span
            className="text-white text-lg"
            animate={{ scale: [1, 1.1, 1] }}
            transition={{ duration: 1, repeat: Infinity }}
          >
            →
          </motion.span>
        )}
      </motion.div>

      {/* Corner Accents */}
      <div className="absolute -top-1 -left-1 w-3 h-3 border-l-2 border-t-2 border-purple-500/30 rounded-br" />
      <div className="absolute -bottom-1 -left-1 w-3 h-3 border-l-2 border-b-2 border-purple-500/30 rounded-tr" />
      <div className="absolute -top-1 -right-1 w-3 h-3 border-r-2 border-t-2 border-cyan-500/30 rounded-bl" />
      <div className="absolute -bottom-1 -right-1 w-3 h-3 border-r-2 border-b-2 border-cyan-500/30 rounded-tl" />
    </motion.div>
  );
};

// VVPAT Component
const VVPAT = ({ selectedCandidate, currentStep }) => {
  const [showSlip, setShowSlip] = useState(false);
  const [slipDropped, setSlipDropped] = useState(false);

  useEffect(() => {
    if (currentStep === 4 && selectedCandidate) {
      // Show slip immediately when step 4 starts
      setShowSlip(true);
      // After 4 seconds, drop the slip
      const dropTimer = setTimeout(() => {
        setSlipDropped(true);
      }, 4000);
      return () => clearTimeout(dropTimer);
    } else {
      setShowSlip(false);
      setSlipDropped(false);
    }
  }, [currentStep, selectedCandidate]);

  return (
    <motion.div
      className="relative w-72 h-80 machine-panel-glow rounded-2xl p-6 flex flex-col"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
    >
      {/* Header */}
      <div className="text-center mb-4">
        <motion.h3
          className="text-lg font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-400 tracking-wider"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          VVPAT VIEWER
        </motion.h3>
        <motion.div
          className="w-full h-0.5 bg-gradient-to-r from-cyan-500/30 to-purple-500/30 mt-2"
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ delay: 0.3, duration: 0.5 }}
        />
      </div>

      {/* Viewing Window */}
      <div className="flex-1 relative overflow-hidden rounded-xl bg-white/5 border border-white/10 mb-4">
        {/* Window Glass */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-white/5 to-transparent pointer-events-none" />

        {/* Slip Animation */}
        <AnimatePresence>
          {showSlip && selectedCandidate && (
            <motion.div
              className="absolute inset-4 bg-white/90 rounded shadow-lg p-3"
              initial={{ y: -100, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 100, opacity: 0 }}
              transition={{ duration: 0.5, ease: 'easeInOut' }}
            >
              {/* Slip Content */}
              <div className="text-center space-y-2">
                <div className="text-2xl">{selectedCandidate.symbol}</div>
                <div className="text-sm font-bold text-gray-800">{selectedCandidate.name}</div>
                <div className="text-xs text-gray-600">Electronic Vote Verification</div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Waiting Message */}
        {!showSlip && (
          <motion.div
            className="absolute inset-0 flex items-center justify-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            <motion.span
              className="text-gray-400 text-sm font-mono"
              animate={{ opacity: [0.5, 1, 0.5] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              {currentStep < 3 ? 'WAITING FOR VOTE' : 'PROCESSING...'}
            </motion.span>
          </motion.div>
        )}

        {/* Scan Line Effect */}
        <motion.div
          className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-cyan-400/40 to-transparent"
          animate={{ y: [0, 140, 0], opacity: [0.8, 0.4, 0.8] }}
          transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
        />
      </div>

      {/* Sealed Box Area */}
      <motion.div
        className="relative h-12 rounded-xl bg-gradient-to-r from-cyan-500/5 to-purple-500/5 border border-cyan-500/20 flex items-center justify-center"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6, duration: 0.4 }}
      >
        <motion.span
          className="text-xs font-mono text-cyan-300/80"
          animate={{ opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          {slipDropped ? 'SLIP COLLECTED • Simulated vote recorded' : showSlip ? 'Reviewing slip...' : 'SEALED BOX'}
        </motion.span>

        {/* Drop Animation */}
        {showSlip && !slipDropped && (
          <motion.div
            className="absolute bottom-2 left-1/2 -translate-x-1/2 w-1 h-4 bg-white/40 rounded-full"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 16 }}
            transition={{ delay: 0.5, duration: 0.3 }}
          />
        )}

        {slipDropped && (
          <motion.div
            className="absolute bottom-0 left-1/2 -translate-x-1/2 w-2 h-2 bg-green-400 rounded-full"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.3 }}
          />
        )}
      </motion.div>

      {/* Connection Point */}
      <motion.div
        className="absolute -left-4 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-gradient-to-br from-purple-500 to-cyan-500 flex items-center justify-center border-2 border-white/20"
        animate={showSlip ? {
          boxShadow: ['0 0 10px rgba(168, 85, 247, 0.5)', '0 0 20px rgba(6, 182, 212, 0.5)']
        } : { opacity: 0.3 }}
        transition={{ duration: 1, repeat: Infinity }}
      >
        <motion.span
          className="text-white text-lg"
          animate={showSlip ? { scale: [1, 1.1, 1] } : {}}
          transition={{ duration: 1, repeat: Infinity }}
        >
          ←
        </motion.span>
      </motion.div>

      {/* Corner Accents */}
      <div className="absolute -top-1 -left-1 w-3 h-3 border-l-2 border-t-2 border-cyan-500/30 rounded-br" />
      <div className="absolute -bottom-1 -left-1 w-3 h-3 border-l-2 border-b-2 border-cyan-500/30 rounded-tr" />
      <div className="absolute -top-1 -right-1 w-3 h-3 border-r-2 border-t-2 border-purple-500/30 rounded-bl" />
      <div className="absolute -bottom-1 -right-1 w-3 h-3 border-r-2 border-b-2 border-purple-500/30 rounded-tl" />
    </motion.div>
  );
};

// Animated Signal Line
const SignalLine = ({ fromColor, toColor, isActive }) => (
  <motion.div
    className="relative h-1 flex-1 mx-4"
    animate={isActive ? { opacity: [0.3, 0.8, 0.3] } : { opacity: 0.1 }}
    transition={{ duration: 1.5, repeat: Infinity }}
  >
    <motion.div
      className="absolute inset-0 rounded-full"
      style={{
        background: `linear-gradient(90deg, ${fromColor}, ${toColor})`,
      }}
      animate={isActive ? { scaleX: [0.5, 1, 0.5] } : {}}
      transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
    />
    <motion.div
      className="absolute inset-0"
      style={{
        background: `linear-gradient(90deg, ${fromColor}/40, ${toColor}/40)`,
      }}
      animate={isActive ? { x: ['-100%', '100%'] } : {}}
      transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
    />
  </motion.div>
);

// Step Progress Component
const StepProgress = ({ currentStep, totalSteps, stepTitle, description, instruction }) => (
  <motion.div
    className="text-center mb-8"
    initial={{ opacity: 0, y: -20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5 }}
  >
    <motion.span
      className="inline-block px-4 py-1.5 bg-white/5 backdrop-blur-md rounded-full text-sm font-medium text-purple-300 border border-purple-500/20 mb-4"
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: 0.2 }}
    >
      Step {currentStep} of {totalSteps}
    </motion.span>

    <motion.h3
      className="text-2xl font-bold text-white mb-2"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.3 }}
    >
      {stepTitle}
    </motion.h3>

    <motion.p
      className="text-gray-400"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.4 }}
    >
      {description}
    </motion.p>

    {instruction && (
      <motion.div
        className="mt-4 p-3 bg-cyan-500/5 border border-cyan-500/20 rounded-lg"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
      >
        <span className="text-cyan-300 text-sm">💡 {instruction}</span>
      </motion.div>
    )}
  </motion.div>
);

// Voting Demo Section Component
const VotingDemoSection = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [selectedCandidate, setSelectedCandidate] = useState(null);
  const [isCompleted, setIsCompleted] = useState(false);
  const [isBallotEnabled, setIsBallotEnabled] = useState(false);

  // State derived from current step
  const isControlReady = currentStep >= 1;
  const isBallotActive = currentStep >= 3 && isBallotEnabled;
  const isVoteRecorded = currentStep >= 4;

  const handleVerifyVoter = () => {
    // Step 1: Verify voter - move to step 2
    setCurrentStep(2);
  };

  const handleActivateBallot = () => {
    // Step 2: Activate ballot - enable ballot unit and move to step 3
    setIsBallotEnabled(true);
    setCurrentStep(3);
  };

  const handleSelectCandidate = (candidate) => {
    // Step 3: Select candidate
    setSelectedCandidate(candidate);
    // Move to step 4 after a short delay
    setTimeout(() => {
      setCurrentStep(4);
    }, 500);
  };

  const handleConfirmVote = () => {
    // Step 4: Confirm vote - complete demo
    setIsCompleted(true);
  };

  const handleRestart = () => {
    setCurrentStep(1);
    setSelectedCandidate(null);
    setIsCompleted(false);
    setIsBallotEnabled(false);
  };

  // Get current step instruction
  const getCurrentInstruction = () => {
    switch (currentStep) {
      case 1:
        return 'Click "Verify Voter" on the Control Unit to start';
      case 2:
        return 'Click "Activate Ballot" on the Control Unit to enable voting';
      case 3:
        return 'Select a candidate from the Ballot Unit';
      case 4:
        return 'Review the slip in VVPAT, then confirm your vote';
      default:
        return '';
    }
  };

  // Container animation
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1, delayChildren: 0.2 },
    },
  };

  return (
    <section id="voting-demo" className="relative py-24 w-full bg-gradient-to-br from-[#0a0a0f] via-[#0d0d15] to-[#0a0a0f]">
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden -z-10">
        {/* Cyber Grid */}
        <div className="absolute inset-0 cyber-grid opacity-20" />

        {/* Animated gradient orbs */}
        <motion.div
          className="absolute top-1/4 left-1/4 w-72 h-72 bg-purple-600/10 rounded-full blur-3xl"
          animate={{
            x: [0, 50, 0],
            y: [0, -30, 0],
            opacity: [0.1, 0.2, 0.1],
          }}
          transition={{ duration: 8, ease: "easeInOut", repeat: Infinity, repeatType: "loop" }}
        />

        <motion.div
          className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl"
          animate={{
            x: [0, -40, 0],
            y: [0, 40, 0],
            opacity: [0.05, 0.15, 0.05],
          }}
          transition={{ duration: 10, ease: "easeInOut", repeat: Infinity, repeatType: "loop" }}
        />

        {/* Floating particles */}
        {[...Array(15)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-white/30 rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${20 + Math.random() * 80}%`,
            }}
            animate={{
              y: [0, -100 - Math.random() * 100],
              opacity: [0.3, 0, 0.3],
              scale: [1, 0.5, 1],
            }}
            transition={{
              duration: 5 + Math.random() * 10,
              ease: "linear",
              repeat: Infinity,
              repeatType: "loop",
              delay: Math.random() * 5,
            }}
          />
        ))}
      </div>

      {/* Main Container */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <motion.span
            className="inline-block px-4 py-1.5 bg-white/5 backdrop-blur-md rounded-full text-sm font-medium text-cyan-300 border border-cyan-500/20 mb-6"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
          >
            Interactive Demo
          </motion.span>

          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-cyan-200 to-white">
              Experience the Voting Process
            </span>
          </h2>

          <p className="text-lg md:text-xl text-gray-300 max-w-3xl mx-auto">
            See what happens from voter verification to vote confirmation in a simple interactive flow.
          </p>
        </motion.div>

        {/* EVM System Layout */}
        <motion.div
          className="relative flex flex-col lg:flex-row items-center justify-center gap-8 lg:gap-12 mb-16"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {/* Control Unit - Left */}
          <motion.div
            className="z-10"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <ControlUnit
              currentStep={currentStep}
              onVerify={handleVerifyVoter}
              onActivate={handleActivateBallot}
              isBallotEnabled={isBallotEnabled}
            />
          </motion.div>

          {/* Signal Line: Control -> Ballot */}
          <motion.div
            className="hidden lg:flex items-center"
            initial={{ opacity: 0, scaleX: 0 }}
            animate={{ opacity: 1, scaleX: 1 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <SignalLine
              fromColor="rgba(168, 85, 247, 0.6)"
              toColor="rgba(6, 182, 212, 0.6)"
              isActive={isBallotEnabled}
            />
          </motion.div>

          {/* Ballot Unit - Center */}
          <motion.div
            className="z-10"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <BallotUnit
              isActive={isBallotActive}
              selectedCandidate={selectedCandidate}
              onSelectCandidate={handleSelectCandidate}
              currentStep={currentStep}
            />
          </motion.div>

          {/* Signal Line: Ballot -> VVPAT */}
          <motion.div
            className="hidden lg:flex items-center"
            initial={{ opacity: 0, scaleX: 0 }}
            animate={{ opacity: 1, scaleX: 1 }}
            transition={{ duration: 0.6, delay: 0.5 }}
          >
            <SignalLine
              fromColor="rgba(6, 182, 212, 0.6)"
              toColor="rgba(168, 85, 247, 0.6)"
              isActive={selectedCandidate !== null}
            />
          </motion.div>

          {/* VVPAT - Right */}
          <motion.div
            className="z-10"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <VVPAT
              selectedCandidate={selectedCandidate}
              currentStep={currentStep}
            />
          </motion.div>
        </motion.div>

        {/* Step Progress and Navigation */}
        <motion.div
          className="max-w-2xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
        >
          {/* Step Progress */}
          <StepProgress
            currentStep={currentStep}
            totalSteps={4}
            stepTitle={steps.find(s => s.id === currentStep)?.title || ''}
            description={steps.find(s => s.id === currentStep)?.description || ''}
            instruction={getCurrentInstruction()}
          />

          {/* Confirm Button - Only show on step 4 */}
          <div className="text-center">
            {currentStep === 4 && !isCompleted && (
              <motion.button
                onClick={handleConfirmVote}
                className="inline-flex items-center justify-center px-8 py-4 text-lg font-semibold text-white bg-gradient-to-r from-green-500 to-cyan-500 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 glassmorphism"
                whileHover={{ scale: 1.02, y: -2 }}
                whileTap={{ scale: 0.98, y: 1 }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, duration: 0.5 }}
              >
                <span>Confirm Vote</span>
                <motion.span className="ml-2" animate={{ scale: [1, 1.1, 1] }} transition={{ duration: 1, repeat: Infinity }}>
                  ✓
                </motion.span>
              </motion.button>
            )}
          </div>
        </motion.div>

        {/* Completion State */}
        <AnimatePresence>
          {isCompleted && (
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -30 }}
              className="mt-12 text-center"
            >
              <motion.div
                className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-gradient-to-r from-green-500/20 to-cyan-500/20 shadow-2xl mb-6 border border-green-400/20"
                animate={{ scale: [1, 1.05, 1] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              >
                <motion.span
                  className="text-4xl text-green-400"
                  animate={{ scale: [1, 1.1, 1] }}
                  transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                >
                  ✓
                </motion.span>
              </motion.div>

              <h3 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-cyan-400 mb-4">
                Demo Complete!
              </h3>

              <p className="text-lg text-gray-300 mb-8">
                You've successfully experienced the simplified voting process simulation.
              </p>

              <motion.button
                onClick={handleRestart}
                className="inline-flex items-center justify-center px-8 py-4 text-lg font-semibold text-white bg-gradient-to-r from-purple-600 to-cyan-500 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 glassmorphism btn-cyber"
                whileHover={{ scale: 1.02, y: -2 }}
                whileTap={{ scale: 0.98, y: 1 }}
              >
                <span>Restart Demo</span>
                <motion.span className="ml-2" animate={{ rotate: [0, 360] }} transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}>
                  ↻
                </motion.span>
              </motion.button>

              <p className="mt-6 text-sm text-gray-500">
                Interactive concept demo — simplified for education, not an exact replica.
              </p>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Decorative Elements */}
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

export default VotingDemoSection;
