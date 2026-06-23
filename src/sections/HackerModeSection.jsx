import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Check, X } from 'lucide-react';
import TerminalWindow from '../components/hacker/TerminalWindow';
import CodeBlock from '../components/hacker/CodeBlock';
import RealityCheckCard from '../components/hacker/RealityCheckCard';

const ease = [0.22, 1, 0.36, 1];

const TypingText = ({ text, delay = 0 }) => {
  const [displayed, setDisplayed] = useState('');
  const [i, setI] = useState(0);

  useEffect(() => {
    setDisplayed('');
    setI(0);
  }, [text]);

  useEffect(() => {
    if (i < text.length) {
      const t = setTimeout(() => { setDisplayed(p => p + text[i]); setI(p => p + 1); }, 38);
      return () => clearTimeout(t);
    }
  }, [i, text]);

  return (
    <motion.span
      className="font-mono text-sm text-signal"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay, duration: 0.2 }}
    >
      <span className="text-muted mr-2">$</span>
      {displayed}
      {i < text.length && (
        <motion.span
          className="inline-block w-2 h-4 bg-signal align-middle ml-px"
          animate={{ opacity: [1, 0, 1] }}
          transition={{ duration: 0.6, repeat: Infinity }}
        />
      )}
    </motion.span>
  );
};

const TerminalLog = ({ text, type = 'info', delay = 0 }) => {
  const styles = {
    info:    'text-muted',
    success: 'text-signal',
    error:   'text-red-400',
    warning: 'text-amber',
  };
  const icons = {
    info:    <span className="text-muted/50">›</span>,
    success: <Check className="w-3.5 h-3.5 text-signal flex-shrink-0" />,
    error:   <X className="w-3.5 h-3.5 text-red-400 flex-shrink-0" />,
    warning: <span className="text-amber">!</span>,
  };

  return (
    <motion.div
      className={`flex items-start gap-2.5 font-mono text-sm ${styles[type]}`}
      initial={{ opacity: 0, x: -12 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay, duration: 0.25, ease }}
    >
      {icons[type]}
      <span>{text}</span>
    </motion.div>
  );
};

const ProgressBar = ({ progress }) => (
  <div className="w-full bg-lift rounded-full h-1 overflow-hidden">
    <motion.div
      className="bg-signal h-full rounded-full"
      initial={{ width: 0 }}
      animate={{ width: `${progress}%` }}
      transition={{ duration: 0.6, ease }}
    />
  </div>
);

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
    { text: 'Loading Python election_hack.py…',                               type: 'info',    delay: 0.5  },
    { text: 'Syntax errors fixed successfully.',                               type: 'success', delay: 2    },
    { text: 'Searching for WiFi module…',                                      type: 'info',    delay: 4    },
    { text: 'ERROR: No WiFi interface found.',                                 type: 'error',   delay: 5.5  },
    { text: 'Searching for Bluetooth…',                                        type: 'info',    delay: 7    },
    { text: 'ERROR: No Bluetooth interface found.',                            type: 'error',   delay: 8.5  },
    { text: 'Trying internet connection…',                                     type: 'info',    delay: 10   },
    { text: 'ERROR: No internet connection available.',                        type: 'error',   delay: 11.5 },
    { text: 'Launching AI super hacker agent…',                                type: 'info',    delay: 13   },
    { text: 'ERROR: Watching 4 YouTube tutorials is not a security cert.',     type: 'error',   delay: 14.5 },
  ];

  const stats = {
    errorsFixed: 3,
    systemsHacked: 0,
    confidenceLevel: 'Over 9000',
    technicalDepth: 'WhatsApp University Certified',
  };

  const handleStart     = () => { setStage('loading');   setProgress(10); setTimeout(() => setStage('show_code'), 1800); };
  const handleFixErrors = () => {
    setStage('fixing');  setProgress(30);
    setTimeout(() => { setStage('show_fixed_code'); setProgress(55); }, 5000);
    setTimeout(() => { setStage('executing');       setProgress(70); }, 10000);
    setTimeout(() => { setStage('complete');        setProgress(100); }, 22000);
  };
  const handleRestart = () => { setStage('start'); setProgress(0); };

  return (
    <section id="hacker-mode" className="py-20 lg:py-28 bg-canvas">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <motion.div
          className="mb-10"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease }}
        >
          <h2
            className="font-display text-4xl md:text-5xl font-bold text-ink leading-tight mb-4"
            style={{ letterSpacing: '-0.02em', textWrap: 'balance' }}
          >
            Fix the code.{' '}
            <em className="not-italic font-normal text-muted">
              Watch reality fight back.
            </em>
          </h2>
          <p className="text-muted max-w-[52ch]">
            Three syntax errors stand between you and a "hacked" EVM. Fix them.
            Then watch what actually happens when you try to connect.
          </p>
        </motion.div>

        {/* Progress */}
        <div className="mb-8">
          <ProgressBar progress={progress} />
        </div>

        {/* Interactive terminal */}
        <AnimatePresence mode="wait">

          {stage === 'start' && (
            <motion.div
              key="start"
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -16 }}
              transition={{ duration: 0.4, ease }}
            >
              <TerminalWindow title="EVM HACKER SIMULATOR">
                <div className="flex flex-col items-center justify-center h-48 text-center gap-6">
                  <p className="font-mono text-sm text-muted">
                    <span className="text-signal">$</span> python election_hack.py
                  </p>
                  <button
                    onClick={handleStart}
                    className="px-6 py-3 bg-ink text-canvas text-sm font-semibold rounded-lg hover:bg-ink/90 transition-colors"
                  >
                    Start Hacker Mode
                  </button>
                </div>
              </TerminalWindow>
            </motion.div>
          )}

          {(stage === 'loading' || stage === 'show_code') && (
            <motion.div
              key="show_code"
              className="flex flex-col gap-5"
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -16 }}
              transition={{ duration: 0.4, ease }}
            >
              <TerminalWindow title="EVM HACKER SIMULATOR">
                <div className="space-y-5">
                  <TypingText text="python election_hack.py" delay={0.1} />
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.7, duration: 0.4, ease }}
                  >
                    <CodeBlock code={brokenCode} hasErrors={true} />
                  </motion.div>
                </div>
              </TerminalWindow>

              <motion.div
                className="flex justify-center"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 2.5, duration: 0.4 }}
              >
                <button
                  onClick={handleFixErrors}
                  className="px-6 py-3 bg-ink text-canvas text-sm font-semibold rounded-lg hover:bg-ink/90 transition-colors"
                >
                  Fix 3 Syntax Errors
                </button>
              </motion.div>
            </motion.div>
          )}

          {stage === 'fixing' && (
            <motion.div
              key="fixing"
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -16 }}
              transition={{ duration: 0.4, ease }}
            >
              <TerminalWindow title="EVM HACKER SIMULATOR">
                <div className="space-y-4">
                  <TypingText text="fixing syntax errors…" delay={0.1} />
                  <TypingText text="compiling…" delay={0.5} />
                  <motion.div
                    className="flex justify-center pt-6"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1 }}
                  >
                    <div className="w-8 h-8 border-2 border-signal border-t-transparent rounded-full animate-spin" />
                  </motion.div>
                </div>
              </TerminalWindow>
            </motion.div>
          )}

          {stage === 'show_fixed_code' && (
            <motion.div
              key="show_fixed_code"
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -16 }}
              transition={{ duration: 0.4, ease }}
            >
              <TerminalWindow title="EVM HACKER SIMULATOR">
                <div className="space-y-5">
                  <TypingText text="errors fixed — executing…" delay={0.1} />
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.8, duration: 0.4, ease }}
                  >
                    <CodeBlock code={fixedCode} hasErrors={false} />
                  </motion.div>
                </div>
              </TerminalWindow>
            </motion.div>
          )}

          {stage === 'executing' && (
            <motion.div
              key="executing"
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -16 }}
              transition={{ duration: 0.4, ease }}
            >
              <TerminalWindow title="EVM HACKER SIMULATOR">
                <div className="space-y-3 max-h-80 overflow-y-auto">
                  {logs.map((log, i) => (
                    <TerminalLog key={i} text={log.text} type={log.type} delay={log.delay} />
                  ))}
                </div>
              </TerminalWindow>
            </motion.div>
          )}

          {stage === 'complete' && (
            <motion.div
              key="complete"
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -16 }}
              transition={{ duration: 0.4, ease }}
            >
              <RealityCheckCard
                title="Reality Check Complete"
                stats={stats}
                achievement="Certified Keyboard Warrior"
                onRestart={handleRestart}
                onBack={() => { setStage('start'); setProgress(0); }}
              />
            </motion.div>
          )}

        </AnimatePresence>

        {/* Footnote */}
        <motion.p
          className="mt-10 text-center text-sm text-muted/60 font-mono max-w-xl mx-auto"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4, duration: 0.5 }}
        >
          Programming knowledge is powerful. But real systems require system-level
          understanding — not just the ability to fix indentation errors.
        </motion.p>
      </div>
    </section>
  );
};

export default HackerModeSection;
