import React, { createContext, useContext, useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// Create Easter Egg Context
const EasterEggContext = createContext();

// Easter Egg Provider
const EasterEggProvider = ({ children }) => {
  const [unlockedEggs, setUnlockedEggs] = useState([]);
  const [showNotification, setShowNotification] = useState(false);
  const [lastUnlocked, setLastUnlocked] = useState(null);

  // Define available easter eggs
  const easterEggs = {
    rapidClicker: {
      id: 'rapidClicker',
      name: 'Rapid Clicker',
      description: 'Clicked 10 times in 2 seconds',
      icon: '🖱️',
      color: 'from-cyan-400 to-blue-400',
      unlocked: false
    },
    scrollMaster: {
      id: 'scrollMaster',
      name: 'Scroll Master',
      description: 'Scrolled through all sections',
      icon: '📜',
      color: 'from-purple-400 to-pink-400',
      unlocked: false
    },
    moduleExplorer: {
      id: 'moduleExplorer',
      name: 'Module Explorer',
      description: 'Explored all machine modules',
      icon: '🔍',
      color: 'from-green-400 to-emerald-400',
      unlocked: false
    },
    certificateCollector: {
      id: 'certificateCollector',
      name: 'Certificate Collector',
      description: 'Downloaded the certificate',
      icon: '🏆',
      color: 'from-yellow-400 to-orange-400',
      unlocked: false
    },
    nightOwl: {
      id: 'nightOwl',
      name: 'Night Owl',
      description: 'Visited after 8 PM',
      icon: '🌙',
      color: 'from-indigo-400 to-blue-400',
      unlocked: false
    }
  };

  // Check for Konami code
  const [konamiIndex, setKonamiIndex] = useState(0);
  const konamiCode = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a'];

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === konamiCode[konamiIndex]) {
        setKonamiIndex(prev => prev + 1);
        if (konamiIndex === konamiCode.length - 1) {
          unlockEgg('konamiMaster');
        }
      } else {
        setKonamiIndex(0);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [konamiIndex]);

  // Load unlocked eggs from localStorage
  useEffect(() => {
    const savedEggs = localStorage.getItem('evmEasterEggs');
    if (savedEggs) {
      setUnlockedEggs(JSON.parse(savedEggs));
    }
  }, []);

  // Save unlocked eggs to localStorage
  useEffect(() => {
    if (unlockedEggs.length > 0) {
      localStorage.setItem('evmEasterEggs', JSON.stringify(unlockedEggs));
    }
  }, [unlockedEggs]);

  // Unlock an egg
  const unlockEgg = (eggId) => {
    if (!unlockedEggs.includes(eggId) && easterEggs[eggId]) {
      setUnlockedEggs(prev => [...prev, eggId]);
      setLastUnlocked(easterEggs[eggId]);
      setShowNotification(true);

      // Hide notification after 5 seconds
      setTimeout(() => {
        setShowNotification(false);
      }, 5000);
    }
  };

  // Check if egg is unlocked
  const isEggUnlocked = (eggId) => {
    return unlockedEggs.includes(eggId);
  };

  // Get unlocked eggs count
  const getUnlockedCount = () => {
    return unlockedEggs.length;
  };

  // Get all eggs
  const getAllEggs = () => {
    return easterEggs;
  };

  return (
    <EasterEggContext.Provider
      value={{
        unlockEgg,
        isEggUnlocked,
        getUnlockedCount,
        getAllEggs,
        unlockedEggs
      }}
    >
      {children}

      {/* Notification Popup */}
      <AnimatePresence>
        {showNotification && lastUnlocked && (
          <motion.div
            className="fixed top-20 right-6 z-50"
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 100 }}
            transition={{ duration: 0.4, ease: 'easeOut' }}
          >
            <motion.div
              className={`relative p-4 rounded-2xl bg-gradient-to-r ${lastUnlocked.color}/10 backdrop-blur-lg border border-white/20 shadow-2xl`}
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.1, duration: 0.3 }}
            >
              {/* Notification Header */}
              <motion.div
                className="flex items-center gap-3 mb-3"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2, duration: 0.3 }}
              >
                <motion.div
                  className="w-10 h-10 rounded-xl bg-gradient-to-br from-white/10 to-white/20 flex items-center justify-center border border-white/30"
                  whileHover={{ scale: 1.05, rotate: [0, 5, -5, 0] }}
                >
                  <motion.span
                    className="text-xl"
                    animate={{ rotate: [0, 10, -10, 0] }}
                    transition={{ duration: 1, repeat: Infinity }}
                  >
                    {lastUnlocked.icon}
                  </motion.span>
                </motion.div>
                <motion.div
                  className="flex-1"
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.3, duration: 0.3 }}
                >
                  <motion.h4
                    className="text-lg font-bold text-white"
                    whileHover={{ color: 'rgba(168, 85, 247, 1)' }}
                  >
                    Achievement Unlocked!
                  </motion.h4>
                  <motion.p
                    className="text-sm text-cyan-300"
                    whileHover={{ color: 'rgba(6, 182, 212, 1)' }}
                  >
                    {lastUnlocked.name}
                  </motion.p>
                </motion.div>
              </motion.div>

              {/* Notification Body */}
              <motion.div
                className="pl-13"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.3 }}
              >
                <motion.p
                  className="text-sm text-gray-300"
                  whileHover={{ color: 'rgba(255, 255, 255, 0.8)' }}
                >
                  {lastUnlocked.description}
                </motion.p>
              </motion.div>

              {/* Close Button */}
              <motion.button
                onClick={() => setShowNotification(false)}
                className="absolute -top-2 -right-2 w-8 h-8 rounded-full bg-gradient-to-br from-red-500/80 to-rose-500/80 flex items-center justify-center text-white shadow-lg hover:shadow-xl transition-all duration-300"
                whileHover={{ scale: 1.05, rotate: 90 }}
                whileTap={{ scale: 0.95, rotate: 0 }}
              >
                <motion.span
                  className="text-sm"
                  animate={{ rotate: [0, 90, 180, 270] }}
                  transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
                >
                  ×
                </motion.span>
              </motion.button>

              {/* Progress Indicator */}
              <motion.div
                className="absolute bottom-0 left-0 right-0 h-1"
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ delay: 0.5, duration: 0.5, ease: 'easeInOut' }}
              >
                <motion.div
                  className="h-full bg-gradient-to-r from-cyan-500 via-purple-500 to-cyan-500"
                  style={{ width: `${(getUnlockedCount() + 1) / Object.keys(easterEggs).length * 100}%` }}
                />
              </motion.div>

              {/* Corner Accents */}
              <div className="absolute -top-1 -left-1 w-3 h-3 border-l-2 border-t-2 border-cyan-500/40 rounded-br" />
              <div className="absolute -bottom-1 -left-1 w-3 h-3 border-l-2 border-b-2 border-cyan-500/40 rounded-tr" />
              <div className="absolute -top-1 -right-1 w-3 h-3 border-r-2 border-t-2 border-purple-500/40 rounded-bl" />
              <div className="absolute -bottom-1 -right-1 w-3 h-3 border-r-2 border-b-2 border-purple-500/40 rounded-tl" />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </EasterEggContext.Provider>
  );
};

// Custom hook to use Easter Egg context
const useEasterEggs = () => {
  const context = useContext(EasterEggContext);
  if (!context) {
    throw new Error('useEasterEggs must be used within an EasterEggProvider');
  }
  return context;
};

// Easter Egg Trigger Component
const EasterEggTrigger = ({ eggId, children, triggerCondition = null }) => {
  const { unlockEgg, isEggUnlocked } = useEasterEggs();
  const [hasTriggered, setHasTriggered] = useState(false);

  useEffect(() => {
    if (triggerCondition && !hasTriggered && !isEggUnlocked(eggId)) {
      unlockEgg(eggId);
      setHasTriggered(true);
    }
  }, [triggerCondition, hasTriggered, eggId, isEggUnlocked, unlockEgg]);

  return children;
};

// Easter Egg Toggle Button
const EasterEggToggle = () => {
  const { getUnlockedCount, getAllEggs } = useEasterEggs();
  const [showEggs, setShowEggs] = useState(false);

  const allEggs = getAllEggs();
  const totalEggs = Object.keys(allEggs).length;
  const unlockedCount = getUnlockedCount();

  return (
    <motion.div className="fixed bottom-6 left-6 z-50">
      <motion.button
        onClick={() => setShowEggs(!showEggs)}
        className="relative flex items-center justify-center w-12 h-12 rounded-full bg-gradient-to-br from-purple-600/80 to-cyan-500/80 backdrop-blur-lg border border-white/20 shadow-xl hover:shadow-2xl transition-all duration-300"
        whileHover={{ scale: 1.05, rotate: [0, 5, -5, 0] }}
        whileTap={{ scale: 0.95, rotate: 0 }}
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 2, duration: 0.5 }}
      >
        <motion.div
          className="relative w-6 h-6"
          animate={{ scale: [1, 1.05, 1] }}
          transition={{ duration: 1, repeat: Infinity }}
        >
          <motion.span
            className="absolute text-lg"
            animate={{ rotate: [0, 10, -10, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            🥚
          </motion.span>

          {/* Progress Ring */}
          <motion.div
            className="absolute inset-0 rounded-full border-2 border-white/20"
            style={{
              borderColor: 'rgba(255, 255, 255, 0.1)',
              borderRightColor: unlockedCount === totalEggs ? 'rgba(16, 185, 129, 0.8)' : 'rgba(168, 85, 247, 0.8)',
              borderBottomColor: unlockedCount === totalEggs ? 'rgba(16, 185, 129, 0.8)' : 'rgba(168, 85, 247, 0.8)',
              borderLeftColor: unlockedCount === totalEggs ? 'rgba(16, 185, 129, 0.8)' : 'rgba(255, 255, 255, 0.1)',
            }}
            animate={unlockedCount < totalEggs ? { rotate: 360 } : {}}
            transition={unlockedCount < totalEggs ? { duration: 10, repeat: Infinity, ease: 'linear' } : {}}
          />
        </motion.div>

        {/* Count Badge */}
        <motion.span
          className="absolute -top-2 -right-2 text-xs font-bold text-white bg-black/30 backdrop-blur-md px-2 py-1 rounded-full"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.3 }}
        >
          {unlockedCount}/{totalEggs}
        </motion.span>

        {/* Tooltip */}
        <motion.div
          className="absolute -top-14 left-1/2 -translate-x-1/2 whitespace-nowrap"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: showEggs ? 0 : 1, y: showEggs ? 20 : 10 }}
          transition={{ duration: 0.3 }}
        >
          <motion.div
            className="relative px-3 py-2 bg-white/90 backdrop-blur-lg rounded-lg text-xs font-medium text-gray-800 shadow-lg"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.1 }}
          >
            <span>{unlockedCount} of {totalEggs} Easter Eggs</span>
            <motion.div
              className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-0 h-0 border-l-4 border-l-transparent border-r-4 border-r-transparent border-t-4 border-t-white/90"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
            />
          </motion.div>
        </motion.div>

        {/* Eggs List Popup */}
        <AnimatePresence>
          {showEggs && (
            <motion.div
              className="absolute bottom-16 left-0 w-64"
              initial={{ opacity: 0, y: 20, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 20, scale: 0.9 }}
              transition={{ duration: 0.3 }}
            >
              <motion.div
                className="rounded-2xl bg-gradient-to-br from-[#0a0a0f] to-[#0d0d15] border border-white/20 shadow-2xl overflow-hidden"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.1 }}
              >
                <motion.div
                  className="p-4 border-b border-white/10"
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                >
                  <motion.h4
                    className="text-lg font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-400"
                    whileHover={{ scale: 1.01 }}
                  >
                    Easter Eggs
                  </motion.h4>
                  <motion.p
                    className="text-xs text-gray-400 mt-1"
                    whileHover={{ color: 'rgba(255, 255, 255, 0.8)' }}
                  >
                    {unlockedCount} / {totalEggs} Unlocked
                  </motion.p>
                </motion.div>

                <motion.div
                  className="max-h-64 overflow-y-auto"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.3 }}
                >
                  {Object.entries(allEggs).map(([id, egg]) => (
                    <motion.div
                      key={id}
                      className={`p-3 border-b border-white/5 ${getUnlockedCount() > 0 && getUnlockedCount() % 2 === 0 ? 'bg-white/5' : ''}`}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.4 + Object.keys(allEggs).indexOf(id) * 0.1 }}
                    >
                      <motion.div
                        className="flex items-center gap-3"
                        whileHover={{ x: 3 }}
                      >
                        <motion.span
                          className="text-lg"
                          whileHover={{ scale: 1.1 }}
                        >
                          {egg.icon}
                        </motion.span>
                        <motion.div
                          className="flex-1"
                          whileHover={{ x: 2 }}
                        >
                          <motion.p
                            className="text-sm font-medium text-white"
                            whileHover={{ color: 'rgba(168, 85, 247, 1)' }}
                          >
                            {egg.name}
                          </motion.p>
                          <motion.p
                            className="text-xs text-gray-500"
                            whileHover={{ color: 'rgba(255, 255, 255, 0.6)' }}
                          >
                            {egg.description}
                          </motion.p>
                        </motion.div>
                        <motion.div
                          className={`w-5 h-5 rounded-full flex items-center justify-center ${getAllEggs()[id].unlocked ? 'bg-green-500/20 border border-green-400/40' : 'bg-gray-800/20 border border-gray-600/40'}`}
                          whileHover={{ scale: 1.05 }}
                        >
                          <motion.span
                            className={`text-xs ${getAllEggs()[id].unlocked ? 'text-green-400' : 'text-gray-600'}`}
                            whileHover={{ scale: 1.1 }}
                          >
                            {getAllEggs()[id].unlocked ? '✓' : '✗'}
                          </motion.span>
                        </motion.div>
                      </motion.div>
                    </motion.div>
                  ))}
                </motion.div>

                {/* Close Button */}
                <motion.button
                  onClick={() => setShowEggs(false)}
                  className="absolute -top-2 -right-2 w-8 h-8 rounded-full bg-gradient-to-br from-red-500/80 to-rose-500/80 flex items-center justify-center text-white shadow-lg hover:shadow-xl transition-all duration-300"
                  whileHover={{ scale: 1.05, rotate: 90 }}
                  whileTap={{ scale: 0.95, rotate: 0 }}
                >
                  <motion.span
                    className="text-sm"
                    animate={{ rotate: [0, 90, 180, 270] }}
                    transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
                  >
                    ×
                  </motion.span>
                </motion.button>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.button>
    </motion.div>
  );
};

export { EasterEggProvider, useEasterEggs, EasterEggTrigger, EasterEggToggle };
