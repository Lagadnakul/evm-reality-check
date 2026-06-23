import { motion } from 'framer-motion';

const TerminalWindow = ({ children, title = 'TERMINAL', isActive = true, className = '' }) => {
  return (
    <motion.div
      className={`relative w-full max-w-4xl mx-auto rounded-xl overflow-hidden bg-canvas border border-rule ${className}`}
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
    >
      {/* Title bar */}
      <div className="flex items-center justify-between px-5 py-3 bg-panel border-b border-rule">
        <div className="flex items-center gap-3">
          <div className="flex gap-1.5">
            <div className="w-3 h-3 rounded-full bg-red-500/70" />
            <div className="w-3 h-3 rounded-full bg-yellow-500/70" />
            <div className="w-3 h-3 rounded-full bg-green-500/70" />
          </div>
          <span className="text-xs text-muted font-mono tracking-widest">{title}</span>
        </div>
        {isActive && (
          <div className="w-1.5 h-1.5 rounded-full bg-signal animate-pulse-slow" />
        )}
      </div>

      {/* Content */}
      <div className="p-6 min-h-[280px]">
        {children}
      </div>
    </motion.div>
  );
};

export default TerminalWindow;
