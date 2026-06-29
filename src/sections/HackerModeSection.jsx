import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import TerminalWindow from '../components/hacker/TerminalWindow';
import RealityCheckCard from '../components/hacker/RealityCheckCard';

const EASE_OUT = [0.23, 1, 0.32, 1];

// Matrix rain particles
const MatrixParticles = () => {
  const particles = Array.from({ length: 50 });

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {particles.map((_, i) => {
        const left = (i * 13.37) % 100;
        const delay = (i * 0.17) % 5;
        const duration = 5 + ((i * 0.41) % 10);

        return (
          <motion.div
            key={i}
            className="absolute w-1 h-1 rounded-full bg-cyan-400/20"
            style={{ left: `${left}%`, top: '-10px' }}
            animate={{
              y: ['0%', '100%'],
              opacity: [0, 0.5, 0],
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
  );
};

// Typing animation without blinking cursor
const TypingText = ({ text, className = '', delay = 0, speed = 18 }) => {
  const [displayedText, setDisplayedText] = useState('');
  const [index, setIndex] = useState(0);
  const [started, setStarted] = useState(false);

  useEffect(() => {
    setDisplayedText('');
    setIndex(0);
    setStarted(false);

    const startTimer = setTimeout(() => {
      setStarted(true);
    }, delay * 1000);

    return () => clearTimeout(startTimer);
  }, [text, delay]);

  useEffect(() => {
    if (!started) return;

    if (index < text.length) {
      const timer = setTimeout(() => {
        setDisplayedText(prev => prev + text[index]);
        setIndex(prev => prev + 1);
      }, speed);

      return () => clearTimeout(timer);
    }
  }, [started, index, text, speed]);

  return (
    <motion.span
      className={`font-mono text-cyan-400 ${className}`}
      initial={{ opacity: 0 }}
      animate={{ opacity: started ? 1 : 0 }}
      transition={{ duration: 0.2 }}
    >
      {displayedText}
    </motion.span>
  );
};

// Progress bar component
const ProgressBar = ({ progress }) => {
  return (
    <motion.div
      className="w-full bg-black/20 rounded-full h-2 overflow-hidden"
      initial={{ width: 0 }}
      animate={{ width: '100%' }}
      transition={{ duration: 0.5, delay: 0.2 }}
    >
      <motion.div
        className="bg-gradient-to-r from-cyan-400 to-purple-400 h-full"
        initial={{ width: 0 }}
        animate={{ width: `${progress}%` }}
        transition={{ duration: 0.7, delay: 0.1, ease: 'easeInOut' }}
      />
    </motion.div>
  );
};

const CodeLineBlock = ({ code, hasErrors = false, lineDelay = 520 }) => {
  const [visibleLines, setVisibleLines] = useState(0);
  const lines = code.split('\n');

  useEffect(() => {
    setVisibleLines(0);
    const timers = lines.map((_, index) =>
      setTimeout(() => setVisibleLines(index + 1), 250 + index * lineDelay)
    );
    return () => timers.forEach(clearTimeout);
  }, [code, lineDelay, lines.length]);

  return (
    <div className="relative overflow-hidden rounded-xl border border-white/10 bg-black/40 font-mono text-sm shadow-inner">
      <div className="flex items-center justify-between border-b border-white/10 px-4 py-2">
        <span className="text-xs text-gray-500">election_hack.py</span>
        <span className={`text-xs ${hasErrors ? 'text-red-400' : 'text-green-400'}`}>
          {hasErrors ? '3 syntax errors' : 'syntax fixed'}
        </span>
      </div>

      <div className="p-4 space-y-2">
        {lines.map((line, index) => (
          <motion.div
            key={`${line}-${index}`}
            className="flex gap-3 min-h-[22px]"
            initial={{ opacity: 0, x: -10 }}
            animate={{
              opacity: visibleLines > index ? 1 : 0,
              x: visibleLines > index ? 0 : -10
            }}
            transition={{ duration: 0.22, ease: EASE_OUT }}
          >
            <span className="w-6 shrink-0 select-none text-right text-gray-600">{index + 1}</span>
            <span className={hasErrors && index === 0 ? 'text-red-300' : 'text-cyan-200'}>
              {line}
            </span>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

const TerminalLog = ({ text, type = 'info' }) => {
  const colors = {
    info: 'text-cyan-400',
    error: 'text-red-400',
    success: 'text-green-400',
    warning: 'text-yellow-400'
  };

  return (
    <motion.div
      className={`flex gap-2 font-mono text-sm ${colors[type]}`}
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.22, ease: EASE_OUT }}
    >
      <span>{type === 'error' ? '❌' : type === 'success' ? '✓' : '>'}</span>
      <span>{text}</span>
    </motion.div>
  );
};

const AnimatedLogs = ({ logs, interval = 430 }) => {
  const [visibleCount, setVisibleCount] = useState(0);

  useEffect(() => {
    setVisibleCount(0);
    const timers = logs.map((_, index) =>
      setTimeout(() => setVisibleCount(index + 1), 250 + index * interval)
    );
    return () => timers.forEach(clearTimeout);
  }, [logs, interval]);

  return (
    <div className="space-y-3">
      {logs.slice(0, visibleCount).map((log, index) => (
        <TerminalLog key={index} text={log.text} type={log.type} />
      ))}
    </div>
  );
};

const GlitchText = ({ text, className = '' }) => {
  return (
    <motion.span
      className={`relative ${className}`}
      animate={{
        color: ['#ffffff', '#06b6d4', '#a855f7', '#ffffff']
      }}
      transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
    >
      {text}
    </motion.span>
  );
};

const HackerModeSection = () => {
  const [stage, setStage] = useState('start');
  const [progress, setProgress] = useState(0);

  const brokenCode = `print("Connecting to EVM" if hack_mode == True
print("Access granted")
print("System compromised")`;

  const fixedCode = `print("Connecting to EVM")
if hack_mode == True:
    print("Access granted")
    print("System compromised")`;

  const logs = [
    { text: 'Loading Python election_hack.py...', type: 'info' },
    { text: 'Syntax errors fixed successfully.', type: 'success' },
    { text: 'Searching for WiFi module...', type: 'info' },
    { text: 'ERROR: No WiFi interface found.', type: 'error' },
    { text: 'Searching for Bluetooth...', type: 'info' },
    { text: 'ERROR: No Bluetooth interface found.', type: 'error' },
    { text: 'Trying internet connection...', type: 'info' },
    { text: 'ERROR: No internet connection available.', type: 'error' },
    { text: 'Launching AI super hacker agent...', type: 'info' },
    { text: 'ERROR: Watching 4 YouTube tutorials is not a security certification.', type: 'error' },
  ];

  const stats = {
    errorsFixed: 3,
    systemsHacked: 0,
    confidenceLevel: 'Over 9000',
    technicalDepth: 'WhatsApp University Certified'
  };

  const handleStart = () => {
    setStage('loading');
    setProgress(10);
    setTimeout(() => setStage('show_code'), 1300);
  };

  const handleFixErrors = () => {
    setStage('fixing');
    setProgress(30);

    setTimeout(() => {
      setStage('show_fixed_code');
      setProgress(55);
    }, 2800);

    // Fixed code gets enough time to reveal all four lines clearly.
    setTimeout(() => {
      setStage('executing');
      setProgress(78);
    }, 8000);

    // Logs are faster than before, but still readable.
    setTimeout(() => {
      setStage('complete');
      setProgress(100);
    }, 13800);
  };

  const handleRestart = () => {
    setStage('start');
    setProgress(0);
  };

  const handleBack = () => {
    setStage('start');
    setProgress(0);
  };

  return (
    <section id="hacker-mode" className="relative py-20 sm:py-24 bg-gradient-to-br from-[#0a0a0f] via-[#0d0d15] to-[#11111a] overflow-hidden">
      <MatrixParticles />
      <div className="absolute inset-0 cyber-grid opacity-20" />

      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
        >
          <motion.h2
            className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.5 }}
          >
            <GlitchText text="3 SYNTAX ERROR" />{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-white to-purple-400">
              HACKER MODE
            </span>
          </motion.h2>
          <motion.p
            className="text-xl text-gray-400 font-mono tracking-wider"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.5 }}
          >
            Fix the errors. Watch reality fight back.
          </motion.p>
          <ProgressBar progress={progress} />
        </motion.div>

        <AnimatePresence mode="wait">
          {stage === 'start' && (
            <motion.div
              key="start"
              className="flex flex-col items-center justify-center min-h-[400px]"
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -40 }}
              transition={{ duration: 0.45 }}
            >
              <TerminalWindow title="EVM HACKER SIMULATOR">
                <div className="flex flex-col items-center justify-center h-full text-center">
                  <motion.div
                    className="text-6xl mb-6"
                    animate={{ rotate: [0, 10, -10, 0] }}
                    transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
                  >
                    <span className="text-cyan-400">⟨⟩</span>
                  </motion.div>
                  <motion.p
                    className="text-cyan-400 font-mono mb-8"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.3, duration: 0.5 }}
                  >
                    INITIALIZING HACKER MODE...
                  </motion.p>
                  <motion.button
                    onClick={handleStart}
                    className="btn-cyber bg-gradient-to-r from-cyan-600 to-purple-600 text-white font-bold py-4 px-8 rounded-lg text-lg cyber-glow-cyan hover:from-cyan-500 hover:to-purple-500 transition-all duration-300"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.8, duration: 0.35 }}
                    whileHover={{ scale: 1.02, boxShadow: '0 0 30px rgba(6, 182, 212, 0.4)', transition: { duration: 0.2, ease: EASE_OUT } }}
                    whileTap={{ scale: 0.96, transition: { duration: 0.1 } }}
                  >
                    START HACKER MODE
                  </motion.button>
                </div>
              </TerminalWindow>
            </motion.div>
          )}

          {(stage === 'loading' || stage === 'show_code') && (
            <motion.div
              key="show_code"
              className="flex flex-col items-center gap-6"
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -40 }}
              transition={{ duration: 0.45 }}
            >
              <TerminalWindow title="EVM HACKER SIMULATOR">
                <div className="space-y-4">
                  <TypingText text="Loading Python election_hack.py..." delay={0.15} speed={16} />
                  <CodeLineBlock code={brokenCode} hasErrors lineDelay={420} />
                </div>
              </TerminalWindow>

              <motion.button
                onClick={handleFixErrors}
                className="btn-cyber bg-gradient-to-r from-purple-600 to-cyan-600 text-white font-bold py-3 px-8 rounded-lg cyber-glow-purple hover:from-purple-500 hover:to-cyan-500 transition-all duration-300"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 1.8, duration: 0.35 }}
                whileHover={{ scale: 1.02, transition: { duration: 0.2, ease: EASE_OUT } }}
                whileTap={{ scale: 0.96, transition: { duration: 0.1 } }}
              >
                FIX 3 SYNTAX ERRORS
              </motion.button>
            </motion.div>
          )}

          {stage === 'fixing' && (
            <motion.div
              key="fixing"
              className="flex flex-col items-center gap-6"
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -40 }}
              transition={{ duration: 0.45 }}
            >
              <TerminalWindow title="EVM HACKER SIMULATOR">
                <div className="space-y-4">
                  <TypingText text="Fixing syntax errors..." delay={0.05} speed={16} />
                  <br />
                  <TypingText text="Compiling..." delay={0.7} speed={16} />
                  <motion.div
                    className="flex justify-center pt-3"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1.3, duration: 0.35 }}
                  >
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-cyan-400" />
                  </motion.div>
                </div>
              </TerminalWindow>
            </motion.div>
          )}

          {stage === 'show_fixed_code' && (
            <motion.div
              key="show_fixed_code"
              className="flex flex-col items-center gap-6"
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -40 }}
              transition={{ duration: 0.45 }}
            >
              <TerminalWindow title="EVM HACKER SIMULATOR">
                <div className="space-y-4">
                  <TypingText text="Code fixed. Running reality check..." delay={0.1} speed={16} />
                  <CodeLineBlock code={fixedCode} hasErrors={false} lineDelay={620} />
                </div>
              </TerminalWindow>
            </motion.div>
          )}

          {stage === 'executing' && (
            <motion.div
              key="executing"
              className="flex flex-col items-center gap-6"
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -40 }}
              transition={{ duration: 0.45 }}
            >
              <TerminalWindow title="EVM HACKER SIMULATOR">
                <AnimatedLogs logs={logs} interval={430} />
              </TerminalWindow>
            </motion.div>
          )}

          {stage === 'complete' && (
            <motion.div
              key="complete"
              className="flex flex-col items-center gap-6"
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -40 }}
              transition={{ duration: 0.45 }}
            >
              <RealityCheckCard
                title="Reality Check"
                achievement="WhatsApp University Certified Hacker™"
                stats={stats}
                onRestart={handleRestart}
                onBack={handleBack}
              />

              <motion.button
                onClick={() => {
                  document.getElementById('inside-machine')?.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start',
                  });
                }}
                className="mt-2 inline-flex items-center justify-center px-8 py-4 text-lg font-semibold text-white bg-gradient-to-r from-violet-600 to-cyan-500 rounded-xl shadow-lg transition-transform duration-150 btn-cyber"
                whileHover={{ scale: 1.01, y: -2, transition: { duration: 0.2, ease: EASE_OUT } }}
                whileTap={{ scale: 0.96, transition: { duration: 0.1 } }}
              >
                Explore How It Actually Works →
              </motion.button>
            </motion.div>
          )}
        </AnimatePresence>

        <motion.div
          className="mt-12 text-center text-gray-500 text-sm font-mono"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8, duration: 0.5 }}
        >
          <p className="max-w-2xl mx-auto">
            Programming knowledge is powerful, but real systems require system-level understanding.
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default HackerModeSection;
