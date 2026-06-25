import React from 'react';
import { motion } from 'framer-motion';

const HeroSection = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1, delayChildren: 0.3 },
    },
  };

  const itemVariants = {
    hidden: { y: 30, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] },
    },
  };

  const badgeVariants = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { duration: 0.6, ease: "easeOut" },
    },
  };

  const buttonVariants = {
    initial: { y: 0 },
    hover: {
      y: -3,
      scale: 1.02,
      transition: { duration: 0.3, ease: "easeOut" },
    },
    tap: { scale: 0.98, y: 1 },
  };

  const floatingVariants = {
    initial: { y: 0 },
    animate: {
      y: [0, -10, 0],
      transition: { duration: 4, ease: "easeInOut", repeat: Infinity, repeatType: "loop" },
    },
  };

  return (
    <section className="relative min-h-screen w-full overflow-hidden bg-gradient-to-br from-[#0a0a0f] via-[#0d0d15] to-[#0a0a0f]">
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 cyber-grid opacity-20" />

        <motion.div
          className="absolute top-1/4 left-1/4 w-72 h-72 bg-purple-600/15 rounded-full blur-3xl"
          animate={{ x: [0, 50, 0], y: [0, -30, 0], opacity: [0.15, 0.25, 0.15], scale: [1, 1.05, 1] }}
          transition={{ duration: 8, ease: "easeInOut", repeat: Infinity, repeatType: "loop" }}
        />

        <motion.div
          className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl"
          animate={{ x: [0, -40, 0], y: [0, 40, 0], opacity: [0.1, 0.2, 0.1], scale: [1, 1.03, 1] }}
          transition={{ duration: 10, ease: "easeInOut", repeat: Infinity, repeatType: "loop" }}
        />

        <motion.div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] bg-gradient-to-br from-purple-500/5 to-cyan-500/5 rounded-full blur-3xl"
          animate={{ scale: [1, 1.1, 1], opacity: [0.05, 0.1, 0.05], rotate: [0, 5, -5, 0] }}
          transition={{ duration: 6, ease: "easeInOut", repeat: Infinity, repeatType: "loop" }}
        />

        {[...Array(30)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-white/30 rounded-full"
            style={{ left: `${Math.random() * 100}%`, top: `${Math.random() * 100}%` }}
            animate={{
              y: [0, -100 - Math.random() * 200],
              opacity: [0.3, 0, 0.3],
              scale: [1, 0.5, 1],
              x: [0, (Math.random() - 0.5) * 40],
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

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
        <motion.div
          className="grid lg:grid-cols-2 gap-12 items-center"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <div className="space-y-8">
            <motion.div variants={badgeVariants} className="inline-block">
              <span className="inline-flex items-center px-4 py-2 bg-white/5 backdrop-blur-md rounded-full text-sm font-medium text-cyan-300 border border-cyan-500/20 shadow-lg">
                <motion.span
                  className="w-2 h-2 bg-cyan-400 rounded-full mr-2"
                  animate={{ opacity: [1, 0.5, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                />
                Interactive Educational Experience
              </span>
            </motion.div>

            <motion.h1 variants={itemVariants} className="text-5xl md:text-6xl lg:text-7xl font-bold leading-tight">
              <motion.span
                className="block text-transparent bg-clip-text bg-gradient-to-r from-white via-cyan-200 to-white"
                whileHover={{ scale: 1.01 }}
              >
                Can You Really
              </motion.span>
              <motion.span
                className="block text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-cyan-400 to-purple-300"
                style={{ backgroundSize: '200% auto' }}
                animate={{ backgroundPosition: ['0% 0%', '100% 0%', '0% 0%'] }}
                transition={{ duration: 5, ease: "linear", repeat: Infinity }}
              >
                Hack An EVM?
              </motion.span>
            </motion.h1>

            <motion.p variants={itemVariants} className="text-lg md:text-xl text-gray-300 max-w-lg leading-relaxed">
              Explore how electronic voting works, understand common myths, and test
              the famous 3-syntax-error hacking theory.
            </motion.p>

            <motion.div variants={itemVariants} className="flex flex-col sm:flex-row gap-4">
              <motion.button
                onClick={() => {
                  document.getElementById('voting-demo')?.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start',
                  });
                }}
                variants={buttonVariants}
                initial="initial"
                whileHover="hover"
                whileTap="tap"
                className="inline-flex items-center justify-center px-8 py-4 text-lg font-semibold text-white bg-gradient-to-r from-purple-600 to-cyan-500 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 glassmorphism btn-cyber"
              >
                <span>Start Voting Demo</span>
                <motion.span className="ml-2" animate={{ x: [0, 5, 0] }} transition={{ duration: 1.5, repeat: Infinity }}>
                  →
                </motion.span>
              </motion.button>

              <motion.button
                onClick={() => {
                  document.getElementById('hacker-mode')?.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start',
                  });
                }}
                variants={buttonVariants}
                initial="initial"
                whileHover="hover"
                whileTap="tap"
                className="inline-flex items-center justify-center px-8 py-4 text-lg font-semibold text-cyan-300 bg-white/5 backdrop-blur-md rounded-xl border border-white/10 hover:bg-white/10 transition-all duration-300 glassmorphism"
              >
                <motion.span className="mr-2" animate={{ rotate: [0, 10, -10, 0] }} transition={{ duration: 2, repeat: Infinity }}>
                  ⚡
                </motion.span>
                <span>Enter Hacker Mode</span>
              </motion.button>
            </motion.div>
          </div>

          <motion.div variants={itemVariants} className="relative flex justify-center items-center lg:justify-end">
            <div className="relative w-full max-w-md">
              <motion.div variants={floatingVariants} className="relative w-80 h-[500px] evm-machine rounded-3xl overflow-hidden p-1">
                <motion.div
                  className="absolute inset-0 rounded-3xl border border-white/10"
                  animate={{ borderColor: ['rgba(255, 255, 255, 0.1)', 'rgba(6, 182, 212, 0.2)'] }}
                  transition={{ duration: 4, repeat: Infinity }}
                />

                <div className="absolute inset-1 rounded-3xl bg-gradient-to-b from-[#1a1a24] to-[#0d0d15] border border-white/5" />

                <motion.div className="absolute top-4 left-0 right-0 text-center" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }}>
                  <span className="text-sm font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-400 tracking-wider">
                    EVM-CONCEPT
                  </span>
                </motion.div>

                <div className="absolute top-12 left-4 right-4 h-48">
                  <motion.div
                    className="absolute inset-0 rounded-2xl evm-screen overflow-hidden"
                    animate={{ borderColor: ['rgba(6, 182, 212, 0.3)', 'rgba(168, 85, 247, 0.3)'] }}
                    transition={{ duration: 3, repeat: Infinity }}
                  >
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-br from-[#0a0a0f] to-[#11111a]"
                      animate={{
                        background: [
                          'linear-gradient(135deg, #0a0a0f, #11111a)',
                          'linear-gradient(135deg, #11111a, #0a0a0f)',
                        ],
                      }}
                      transition={{ duration: 4, repeat: Infinity }}
                    />

                    <motion.div
                      className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-cyan-400/40 to-transparent"
                      animate={{ y: [0, 192, 0], opacity: [0.8, 0.4, 0.8] }}
                      transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                    />

                    <div className="absolute inset-0 flex flex-col items-center justify-center p-4">
                      <motion.div className="text-center" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5, duration: 0.6 }}>
                        <motion.div
                          className="text-4xl font-mono text-white/80 tracking-widest mb-1"
                          animate={{
                            opacity: [0.5, 1, 0.5],
                            textShadow: [
                              '0 0 5px rgba(6, 182, 212, 0.5)',
                              '0 0 20px rgba(6, 182, 212, 0.8)',
                              '0 0 5px rgba(6, 182, 212, 0.5)',
                            ],
                          }}
                          transition={{ duration: 2, repeat: Infinity }}
                        >
                          VOTING
                        </motion.div>

                        <motion.div
                          className="text-2xl font-mono text-cyan-300/80 tracking-widest"
                          animate={{ opacity: [0.5, 1, 0.5] }}
                          transition={{ duration: 2, repeat: Infinity, delay: 0.3 }}
                        >
                          READY
                        </motion.div>
                      </motion.div>

                      <motion.div className="absolute bottom-2 right-2 text-xs font-mono text-white/60" animate={{ opacity: [0.5, 1, 0.5] }} transition={{ duration: 1.5, repeat: Infinity }}>
                        09:41:23
                      </motion.div>
                    </div>
                  </motion.div>

                  <div className="absolute inset-0 rounded-2xl bg-gradient-to-b from-transparent via-white/5 to-transparent pointer-events-none" />
                </div>

                <div className="absolute top-64 left-4 right-4 h-12">
                  <motion.div className="absolute inset-0 flex items-center justify-between px-2" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4 }}>
                    {[
                      { color: '#10b981', label: 'Power' },
                      { color: '#06b6d4', label: 'Ready' },
                      { color: '#f59e0b', label: 'Standby' },
                      { color: '#ef4444', label: 'Error' },
                    ].map((light, i) => (
                      <motion.div key={i} className="flex flex-col items-center">
                        <motion.div
                          className="w-3 h-3 rounded-full"
                          style={{ backgroundColor: light.color }}
                          animate={{
                            opacity: [0.3, 1, 0.3],
                            scale: [1, 1.2, 1],
                            boxShadow: [`0 0 5px ${light.color}`, `0 0 15px ${light.color}`, `0 0 5px ${light.color}`],
                          }}
                          transition={{ duration: 1.5 + i * 0.2, repeat: Infinity, delay: i * 0.2 }}
                        />
                        <motion.span className="text-xs text-white/60 mt-1 font-mono" initial={{ opacity: 0, y: 5 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6 + i * 0.1 }}>
                          {light.label}
                        </motion.span>
                      </motion.div>
                    ))}
                  </motion.div>
                </div>

                <div className="absolute top-80 left-4 right-4 h-16">
                  <motion.div className="absolute inset-0 rounded-xl machine-panel-glow flex items-center justify-center gap-2 px-4" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5, duration: 0.5 }}>
                    {['SELECT', 'CONFIRM', 'CAST', 'CANCEL'].map((btn, i) => (
                      <motion.button
                        key={i}
                        className="h-10 flex-1 rounded-lg evm-button text-xs font-bold text-cyan-300 flex items-center justify-center"
                        whileHover={{ scale: 1.02, backgroundColor: 'rgba(6, 182, 212, 0.2)' }}
                        whileTap={{ scale: 0.98, backgroundColor: 'rgba(6, 182, 212, 0.3)' }}
                        transition={{ duration: 0.2 }}
                      >
                        {btn}
                      </motion.button>
                    ))}
                  </motion.div>
                </div>

                <div className="absolute bottom-16 left-4 right-4 h-14">
                  <motion.div className="absolute inset-0 rounded-xl bg-gradient-to-r from-cyan-500/5 to-purple-500/5 border border-cyan-500/20 flex items-center px-4" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6, duration: 0.5 }}>
                    <div className="flex-1 h-6 bg-white/5 rounded mx-4 relative overflow-hidden">
                      <motion.div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent" animate={{ x: ['-100%', '100%'] }} transition={{ duration: 2, repeat: Infinity, ease: "linear" }} />
                      <motion.span className="absolute inset-0 flex items-center justify-center text-xs font-mono text-white/80" initial={{ opacity: 0 }} animate={{ opacity: [0.3, 0.8, 0.3] }} transition={{ duration: 2, repeat: Infinity }}>
                        VERIFY YOUR VOTE
                      </motion.span>
                    </div>
                  </motion.div>
                </div>

                <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-32 bg-gradient-to-b from-cyan-500/20 to-transparent rounded-r-full" />
                <div className="absolute right-0 top-1/2 -translate-y-1/2 w-1 h-32 bg-gradient-to-b from-purple-500/20 to-transparent rounded-l-full" />

                <div className="absolute bottom-4 left-1/2 -translate-x-1/2 w-24 h-2">
                  <motion.div className="absolute inset-0 bg-gradient-to-r from-cyan-500/30 via-purple-500/30 to-cyan-500/30 rounded" animate={{ opacity: [0.3, 0.6, 0.3] }} transition={{ duration: 2, repeat: Infinity }} />
                  {[...Array(5)].map((_, i) => (
                    <div key={i} className="absolute top-0 w-1 h-2 bg-cyan-500/40 rounded-t-full" style={{ left: `${i * 20}%` }} />
                  ))}
                </div>
              </motion.div>

              <motion.div
                className="absolute inset-0 rounded-3xl ring-2 ring-offset-2"
                style={{ ringOffsetColor: '#0a0a0f' }}
                animate={{ ringColor: ['rgba(168, 85, 247, 0.2)', 'rgba(6, 182, 212, 0.2)', 'rgba(168, 85, 247, 0.2)'] }}
                transition={{ duration: 4, repeat: Infinity }}
              />

              {[...Array(12)].map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute w-1.5 h-1.5 bg-white/40 rounded-full"
                  style={{ left: `${10 + Math.random() * 80}%`, top: `${10 + Math.random() * 80}%` }}
                  animate={{
                    y: [0, -20 - Math.random() * 40],
                    opacity: [0.4, 0, 0.4],
                    x: [0, (Math.random() - 0.5) * 40],
                    scale: [1, 0.5, 1],
                  }}
                  transition={{
                    duration: 2 + Math.random() * 4,
                    ease: "easeOut",
                    repeat: Infinity,
                    repeatType: "loop",
                    delay: Math.random() * 2,
                  }}
                />
              ))}
            </div>
          </motion.div>
        </motion.div>
      </div>

      <motion.div className="absolute top-8 left-8 w-32 h-1 bg-gradient-to-r from-purple-500/0 via-purple-500/40 to-transparent" animate={{ opacity: [0.3, 0.7, 0.3] }} transition={{ duration: 3, repeat: Infinity }} />
      <motion.div className="absolute top-8 right-8 w-32 h-1 bg-gradient-to-l from-cyan-500/0 via-cyan-500/40 to-transparent" animate={{ opacity: [0.3, 0.7, 0.3] }} transition={{ duration: 3, repeat: Infinity, delay: 1 }} />
    </section>
  );
};

export default HeroSection;