import { motion } from 'framer-motion';
import { RotateCcw, ArrowLeft } from 'lucide-react';

const ease = [0.22, 1, 0.36, 1];

const RealityCheckCard = ({ title, stats, achievement, onRestart, onBack }) => {
  const statItems = [
    { label: 'Syntax errors fixed', value: stats.errorsFixed, good: true },
    { label: 'Systems hacked', value: stats.systemsHacked, good: false },
    { label: 'Confidence level', value: stats.confidenceLevel, good: null },
    { label: 'Technical depth', value: stats.technicalDepth, good: null },
  ];

  return (
    <motion.div
      className="relative w-full max-w-2xl mx-auto bg-panel border border-rule rounded-xl p-8 overflow-hidden"
      initial={{ opacity: 0, scale: 0.96, y: 24 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ duration: 0.5, ease }}
    >
      {/* Header */}
      <motion.div
        className="text-center mb-8"
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.15, duration: 0.4, ease }}
      >
        <h3 className="font-display text-2xl font-bold text-ink mb-1">{title}</h3>
        <p className="text-xs text-muted font-mono tracking-widest">SYSTEM DIAGNOSTIC COMPLETE</p>
      </motion.div>

      {/* Stats */}
      <motion.div
        className="grid grid-cols-2 gap-3 mb-8"
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.25, duration: 0.4, ease }}
      >
        {statItems.map((stat, index) => (
          <motion.div
            key={stat.label}
            className="bg-lift border border-rule rounded-lg p-4"
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 + index * 0.07, duration: 0.3, ease }}
          >
            <div className="text-xs text-muted font-mono mb-1.5">{stat.label}</div>
            <div className={`text-lg font-bold font-mono ${
              stat.good === true ? 'text-signal' :
              stat.good === false ? 'text-red-400' :
              'text-amber'
            }`}>
              {stat.value}
            </div>
          </motion.div>
        ))}
      </motion.div>

      {/* Achievement badge */}
      <motion.div
        className="text-center mb-8"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.5, duration: 0.35, ease }}
      >
        <span className="inline-flex items-center gap-2 border border-amber/40 text-amber font-mono text-xs px-5 py-2 rounded">
          {achievement}
        </span>
      </motion.div>

      {/* Buttons */}
      <motion.div
        className="flex flex-col sm:flex-row gap-3"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6, duration: 0.35, ease }}
      >
        <button
          onClick={onRestart}
          className="flex-1 inline-flex items-center justify-center gap-2 py-3 px-5 bg-ink text-canvas text-sm font-semibold rounded-lg hover:bg-ink/90 transition-colors"
        >
          <RotateCcw className="w-4 h-4" />
          Restart Hacker Mode
        </button>
        <button
          onClick={onBack}
          className="flex-1 inline-flex items-center justify-center gap-2 py-3 px-5 border border-rule text-muted text-sm font-medium rounded-lg hover:text-ink hover:border-muted/40 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Learning
        </button>
      </motion.div>
    </motion.div>
  );
};

export default RealityCheckCard;
