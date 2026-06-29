import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const CodeBlock = ({ code, language = 'python', hasErrors = false, showLineNumbers = true }) => {
  const [typingIndex, setTypingIndex] = useState(0);
  const [isTypingComplete, setIsTypingComplete] = useState(false);

  const lines = code.split('\n');

  useEffect(() => {
    if (typingIndex < code.length) {
      const timer = setTimeout(() => {
        setTypingIndex(prev => Math.min(prev + 1, code.length));
      }, 30);
      return () => clearTimeout(timer);
    } else if (!isTypingComplete) {
      setIsTypingComplete(true);
    }
  }, [typingIndex, code.length, isTypingComplete]);

  const getTokenClass = () => 'text-white'; // eslint-disable-line no-unused-vars

  const errorLines = hasErrors ? [0, 1, 2] : [];

  return (
    <motion.div
      className="relative bg-black/20 rounded-lg p-4 border border-white/10 overflow-hidden"
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.4, delay: 0.2 }}
    >
      <div className="flex items-center gap-2 mb-4">
        <span className="text-xs text-gray-500 font-mono">{language}</span>
        {hasErrors && (
          <span className="text-xs text-red-400 font-mono">3 syntax errors detected</span>
        )}
      </div>

      <div className="font-mono text-sm leading-relaxed">
        {lines.map((line, lineIndex) => (
          <div key={lineIndex} className="flex gap-4">
            {showLineNumbers && (
              <span className="text-gray-500 select-none w-8 text-right">
                {lineIndex + 1}
              </span>
            )}
            <span className="flex-1">
              {line.split('').map((char, charIndex) => {
                const isVisible = typingIndex >= lineIndex * (line.length + 1) + charIndex;
                const isErrorLine = errorLines.includes(lineIndex);

                return (
                  <motion.span
                    key={charIndex}
                    className={`${
                      isErrorLine && char !== ' ' ? 'text-red-400 bg-red-500/10' : 'text-white'
                    }`}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: isVisible ? 1 : 0 }}
                    transition={{ duration: 0.1, delay: lineIndex * 0.1 + charIndex * 0.01 }}
                  >
                    {char}
                  </motion.span>
                );
              })}
            </span>
          </div>
        ))}
      </div>
    </motion.div>
  );
};

export default CodeBlock;