import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const CodeBlock = ({ code, hasErrors = false }) => {
  const [typingIndex, setTypingIndex] = useState(0);
  const [isTypingComplete, setIsTypingComplete] = useState(false);
  const lines = code.split('\n');
  const errorLines = hasErrors ? [0, 1, 2] : [];

  useEffect(() => {
    setTypingIndex(0);
    setIsTypingComplete(false);
  }, [code]);

  useEffect(() => {
    if (typingIndex < code.length) {
      const timer = setTimeout(() => setTypingIndex(p => Math.min(p + 1, code.length)), 28);
      return () => clearTimeout(timer);
    } else {
      setIsTypingComplete(true);
    }
  }, [typingIndex, code.length]);

  return (
    <div className="bg-lift rounded-lg border border-rule overflow-hidden">
      <div className="flex items-center gap-3 px-4 py-2.5 border-b border-rule">
        <span className="text-xs text-muted font-mono">python</span>
        {hasErrors && (
          <span className="text-xs text-amber font-mono">3 syntax errors detected</span>
        )}
        {!hasErrors && isTypingComplete && (
          <span className="text-xs text-signal font-mono">✓ syntax OK</span>
        )}
      </div>

      <div className="p-4 font-mono text-sm leading-relaxed">
        {lines.map((line, lineIndex) => (
          <div key={lineIndex} className="flex gap-4">
            <span className="text-muted/40 select-none w-6 text-right flex-shrink-0 text-xs pt-0.5">
              {lineIndex + 1}
            </span>
            <span className="flex-1">
              {line.split('').map((char, charIndex) => {
                const globalIndex = lines.slice(0, lineIndex).join('\n').length + (lineIndex > 0 ? 1 : 0) + charIndex;
                const isVisible = typingIndex > globalIndex;
                const isErrorLine = errorLines.includes(lineIndex);
                return (
                  <motion.span
                    key={charIndex}
                    className={isErrorLine ? 'text-amber/90' : 'text-ink/80'}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: isVisible ? 1 : 0 }}
                    transition={{ duration: 0.06 }}
                  >
                    {char}
                  </motion.span>
                );
              })}
              {/* blinking cursor at end of last line */}
              {lineIndex === lines.length - 1 && !isTypingComplete && (
                <motion.span
                  className="inline-block w-2 h-4 bg-signal align-middle ml-px"
                  animate={{ opacity: [1, 0, 1] }}
                  transition={{ duration: 0.7, repeat: Infinity }}
                />
              )}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CodeBlock;
