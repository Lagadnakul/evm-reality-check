
import { motion } from 'framer-motion';

const TerminalWindow = ({ children, title = 'TERMINAL', isActive = true, className = '' }) => {
  return (
    <motion.div
      className={`relative w-full max-w-4xl mx-auto rounded-xl overflow-hidden glassmorphism-dark border border-white/10 ${className}`}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
    >
      {/* Terminal Header */}
      <div className="flex items-center justify-between px-6 py-4 bg-black/20 border-b border-white/10">
        <div className="flex items-center gap-3">
          <div className="flex gap-2">
            <div className="w-3 h-3 rounded-full bg-red-500" />
            <div className="w-3 h-3 rounded-full bg-yellow-500" />
            <div className="w-3 h-3 rounded-full bg-green-500" />
          </div>
          <span className="text-sm text-white/60 font-mono">{title}</span>
        </div>
        <div className="flex items-center gap-4">
          {isActive && (
            <motion.div
              className="w-2 h-2 rounded-full bg-cyan-400"
              animate={{ opacity: [0.5, 1, 0.5] }}
              transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
            />
          )}
        </div>
      </div>

      {/* Terminal Content */}
      <div className="p-6 bg-black/10 min-h-[300px]">
        {children}
      </div>

      {/* Scan Lines Overlay */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute inset-0 opacity-10" style={{
          background: 'repeating-linear-gradient(' +
            '0deg, ' +
            'rgba(6, 182, 212, 0.1) 0px, ' +
            'rgba(6, 182, 212, 0.1) 1px, ' +
            'transparent 1px, ' +
            'transparent 2px' +
            ')'
        }} />
        <motion.div
          className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-cyan-400 to-transparent"
          animate={{ opacity: [0.3, 0.8, 0.3] }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
        />
      </div>
    </motion.div>
  );
};

export default TerminalWindow;