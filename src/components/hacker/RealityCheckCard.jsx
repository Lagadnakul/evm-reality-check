import { motion } from 'framer-motion';

const RealityCheckCard = ({ title, stats, achievement, onRestart, onBack }) => {
  const statItems = [
    { label: 'Syntax errors fixed', value: stats.errorsFixed },
    { label: 'Systems hacked', value: stats.systemsHacked },
    { label: 'Confidence level', value: stats.confidenceLevel },
    { label: 'Technical depth', value: stats.technicalDepth },
  ];

  return (
    <motion.div
      className="relative w-full max-w-2xl mx-auto glass-card rounded-2xl p-8 border border-cyan-500/20"
      initial={{ opacity: 0, scale: 0.9, y: 50 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
    >
      {/* Card Glow */}
      <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-cyan-500/5 via-purple-500/5 to-transparent pointer-events-none" />

      {/* Title */}
      <motion.div
        className="text-center mb-8"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.4 }}
      >
        <h2 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-white to-purple-400 mb-2">
          {title}
        </h2>
        <p className="text-cyan-400/60 text-sm font-mono tracking-wider">
          SYSTEM DIAGNOSTIC COMPLETE
        </p>
      </motion.div>

      {/* Stats Grid */}
      <motion.div
        className="grid grid-cols-2 gap-4 mb-8"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.4 }}
      >
        {statItems.map((stat, index) => (
          <motion.div
            key={stat.label}
            className="glassmorphism rounded-lg p-4 border border-white/10"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 + index * 0.1, duration: 0.3 }}
          >
            <div className="text-xs text-gray-400 font-mono mb-1">{stat.label}</div>
            <div className="text-xl font-bold text-cyan-400">{stat.value}</div>
          </motion.div>
        ))}
      </motion.div>

      {/* Achievement Badge */}
      <motion.div
        className="text-center mb-8"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.5, duration: 0.4 }}
      >
        <div className="inline-block bg-gradient-to-r from-purple-600 to-cyan-600 p-1 rounded-full">
          <span className="bg-black px-6 py-2 rounded-full text-white font-bold text-sm">
            {achievement}
          </span>
        </div>
      </motion.div>

      {/* CTA Buttons */}
      <motion.div
        className="flex flex-col sm:flex-row gap-4"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6, duration: 0.4 }}
      >
        <button
          onClick={onRestart}
          className="flex-1 btn-cyber bg-gradient-to-r from-cyan-600 to-cyan-500 text-white font-semibold py-3 px-6 rounded-lg cyber-glow-cyan hover:from-cyan-500 hover:to-cyan-400 transition-all duration-300"
        >
          Restart Hacker Mode
        </button>
        <button
          onClick={onBack}
          className="flex-1 btn-cyber bg-transparent text-white font-semibold py-3 px-6 rounded-lg border border-white/20 hover:bg-white/5 transition-all duration-300"
        >
          Back to Learning
        </button>
      </motion.div>
    </motion.div>
  );
};

export default RealityCheckCard;