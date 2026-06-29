import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, Zap, BookOpen, Terminal, Clock, ListChecks, ShieldCheck } from 'lucide-react';
import { useState, useEffect } from 'react';

const EASE_OUT = [0.23, 1, 0.32, 1];

const statsItems = [
  { icon: BookOpen, label: '4 Myths' },
  { icon: ListChecks, label: '7 Steps' },
  { icon: Terminal, label: '1 Challenge' },
  { icon: Clock, label: '~5 min' },
];

const CANDIDATES = [
  { n: 1, name: 'Party A', color: '#f97316', bg: 'bg-orange-500/15', border: 'border-orange-500/30' },
  { n: 2, name: 'Party B', color: '#22d3ee', bg: 'bg-cyan-500/15', border: 'border-cyan-500/30' },
  { n: 3, name: 'Party C', color: '#a78bfa', bg: 'bg-violet-500/15', border: 'border-violet-500/30' },
  { n: 4, name: 'NOTA', color: '#6b7280', bg: 'bg-gray-500/15', border: 'border-gray-500/30' },
];

const EVMIllustration = () => {
  const [phase, setPhase] = useState('idle'); // idle | active | voted | vvpat
  const [votedIdx, setVotedIdx] = useState(null);
  const [vvpatProgress, setVvpatProgress] = useState(100);

  useEffect(() => {
    let t;
    if (phase === 'idle') {
      t = setTimeout(() => setPhase('active'), 1800);
    } else if (phase === 'active') {
      t = setTimeout(() => {
        setVotedIdx(1); // votes for candidate 2 (cyan)
        setPhase('voted');
      }, 1600);
    } else if (phase === 'voted') {
      t = setTimeout(() => {
        setVvpatProgress(100);
        setPhase('vvpat');
      }, 900);
    } else if (phase === 'vvpat') {
      // countdown progress
      const interval = setInterval(() => {
        setVvpatProgress((p) => {
          if (p <= 0) {
            clearInterval(interval);
            return 0;
          }
          return p - 100 / 35; // 7s / 200ms steps
        });
      }, 200);
      t = setTimeout(() => {
        setPhase('idle');
        setVotedIdx(null);
        setVvpatProgress(100);
      }, 7200);
      return () => clearInterval(interval);
    }
    return () => clearTimeout(t);
  }, [phase]);

  const cuDisplay = {
    idle: { text: 'STANDBY', sub: 'Awaiting officer', color: '#6b7280' },
    active: { text: 'ENABLED', sub: 'Ballot active', color: '#22d3ee' },
    voted: { text: 'LOCKED', sub: 'Vote recorded', color: '#a78bfa' },
    vvpat: { text: 'PRINTING', sub: 'VVPAT active', color: '#34d399' },
  }[phase];

  return (
    <div className="relative w-full flex flex-col gap-3 select-none">

      {/* ── Top label ── */}
      <div className="flex items-center justify-center gap-2 mb-1">
        <motion.div
          className="w-1.5 h-1.5 rounded-full bg-cyber-cyan"
          animate={{ opacity: [1, 0.3, 1] }}
          transition={{ duration: 1.4, repeat: Infinity }}
        />
        <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-cyber-cyan/60">
          Live Simulation
        </span>
        <motion.div
          className="w-1.5 h-1.5 rounded-full bg-cyber-cyan"
          animate={{ opacity: [0.3, 1, 0.3] }}
          transition={{ duration: 1.4, repeat: Infinity }}
        />
      </div>

      {/* ── Control Unit ── */}
      <motion.div
        className="relative bg-[#12121c] border border-white/10 rounded-2xl overflow-hidden"
        animate={phase === 'active' ? { borderColor: 'rgba(34,211,238,0.3)' } : { borderColor: 'rgba(255,255,255,0.08)' }}
        transition={{ duration: 0.4 }}
      >
        {/* Header strip */}
        <div className="flex items-center justify-between px-4 py-2.5 border-b border-white/[0.06]">
          <div className="flex items-center gap-2">
            <div className="w-1.5 h-4 rounded-full bg-gradient-to-b from-cyber-cyan to-cyber-violet opacity-80" />
            <span className="text-[10px] font-mono uppercase tracking-widest text-gray-500">
              Control Unit
            </span>
          </div>
          <div className="flex items-center gap-1.5">
            {[
              { color: '#22d3ee', active: true },
              { color: '#a78bfa', active: phase !== 'idle' },
              { color: '#34d399', active: phase === 'vvpat' },
            ].map((led, i) => (
              <motion.div
                key={i}
                className="w-2 h-2 rounded-full"
                style={{ backgroundColor: led.color }}
                animate={led.active
                  ? { opacity: [0.5, 1, 0.5], boxShadow: [`0 0 4px ${led.color}80`, `0 0 10px ${led.color}`, `0 0 4px ${led.color}80`] }
                  : { opacity: 0.15, boxShadow: 'none' }
                }
                transition={{ duration: 1.2 + i * 0.3, repeat: Infinity }}
              />
            ))}
          </div>
        </div>

        {/* CU display */}
        <div className="px-4 py-4 flex items-center gap-4">
          <div className="flex-1 bg-black/40 rounded-xl border border-white/[0.06] px-4 py-3">
            <AnimatePresence mode="wait">
              <motion.div
                key={phase}
                initial={{ opacity: 0, y: 6, filter: 'blur(4px)' }}
                animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                exit={{ opacity: 0, y: -6, filter: 'blur(4px)' }}
                transition={{ duration: 0.3, ease: EASE_OUT }}
              >
                <div className="text-lg font-mono font-bold tracking-widest" style={{ color: cuDisplay.color }}>
                  {cuDisplay.text}
                </div>
                <div className="text-[10px] font-mono text-gray-600 mt-0.5">{cuDisplay.sub}</div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Enable button on CU */}
          <motion.div
            className="flex flex-col items-center gap-1"
          >
            <motion.div
              className="w-10 h-10 rounded-xl border-2 flex items-center justify-center relative overflow-hidden"
              style={{
                borderColor: phase === 'active' ? '#22d3ee' : 'rgba(255,255,255,0.12)',
                backgroundColor: phase === 'active' ? 'rgba(34,211,238,0.1)' : 'rgba(255,255,255,0.03)',
              }}
              animate={phase === 'active' ? {
                boxShadow: ['0 0 0px rgba(34,211,238,0)', '0 0 16px rgba(34,211,238,0.4)', '0 0 0px rgba(34,211,238,0)'],
              } : {}}
              transition={{ duration: 1.2, repeat: Infinity }}
            >
              <ShieldCheck size={16} className={phase === 'active' ? 'text-cyber-cyan' : 'text-gray-600'} />
            </motion.div>
            <span className="text-[9px] font-mono text-gray-600 uppercase tracking-wider">Enable</span>
          </motion.div>
        </div>

        {/* Data flow connector line */}
        <div className="relative h-3 mx-4 mb-1">
          <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 h-px bg-white/[0.05]" />
          <motion.div
            className="absolute top-1/2 -translate-y-1/2 h-px bg-gradient-to-r from-cyber-cyan/0 via-cyber-cyan/60 to-cyber-cyan/0"
            style={{ width: '40%' }}
            animate={{ left: ['0%', '60%', '0%'] }}
            transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
          />
        </div>
      </motion.div>

      {/* ── Ballot Unit ── */}
      <motion.div
        className="relative bg-[#12121c] border border-white/10 rounded-2xl overflow-hidden"
        animate={phase === 'voted' || phase === 'vvpat'
          ? { borderColor: 'rgba(167,139,250,0.3)' }
          : { borderColor: 'rgba(255,255,255,0.08)' }}
        transition={{ duration: 0.4 }}
      >
        <div className="flex items-center justify-between px-4 py-2.5 border-b border-white/[0.06]">
          <div className="flex items-center gap-2">
            <div className="w-1.5 h-4 rounded-full bg-gradient-to-b from-cyber-violet to-cyber-cyan opacity-80" />
            <span className="text-[10px] font-mono uppercase tracking-widest text-gray-500">
              Ballot Unit
            </span>
          </div>
          <motion.span
            className="text-[9px] font-mono uppercase tracking-widest px-2 py-0.5 rounded-full"
            animate={
              phase === 'active'
                ? { backgroundColor: 'rgba(34,211,238,0.12)', color: '#22d3ee' }
                : phase === 'voted' || phase === 'vvpat'
                  ? { backgroundColor: 'rgba(167,139,250,0.12)', color: '#a78bfa' }
                  : { backgroundColor: 'rgba(255,255,255,0.04)', color: '#6b7280' }
            }
          >
            {phase === 'idle' ? 'LOCKED' : phase === 'active' ? 'READY' : 'VOTED'}
          </motion.span>
        </div>

        {/* Candidate buttons */}
        <div className="grid grid-cols-2 gap-2 p-3">
          {CANDIDATES.map((c, i) => {
            const isVoted = votedIdx === i;
            const isLocked = votedIdx !== null && !isVoted;
            return (
              <motion.div
                key={c.n}
                className={`relative rounded-xl border p-3 flex items-center gap-3 transition-all duration-300 ${
                  isVoted
                    ? 'border-cyber-violet/50 bg-cyber-violet/10'
                    : isLocked
                      ? 'border-white/[0.04] bg-white/[0.01] opacity-35'
                      : phase === 'active'
                        ? `${c.border} ${c.bg}`
                        : 'border-white/[0.06] bg-white/[0.02]'
                }`}
                animate={isVoted ? {
                  boxShadow: ['0 0 0px rgba(167,139,250,0)', '0 0 20px rgba(167,139,250,0.25)', '0 0 8px rgba(167,139,250,0.15)'],
                } : {}}
                transition={{ duration: 0.6 }}
              >
                {/* Number badge */}
                <div
                  className="w-7 h-7 rounded-lg flex items-center justify-center text-xs font-bold font-mono flex-shrink-0"
                  style={{
                    backgroundColor: isVoted ? '#a78bfa20' : phase === 'active' ? `${c.color}20` : 'rgba(255,255,255,0.04)',
                    color: isVoted ? '#a78bfa' : phase === 'active' ? c.color : '#4b5563',
                    border: `1px solid ${isVoted ? '#a78bfa40' : phase === 'active' ? `${c.color}40` : 'rgba(255,255,255,0.06)'}`,
                  }}
                >
                  {c.n}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-[11px] font-medium text-white/70 truncate">{c.name}</div>
                  <div className="flex items-center gap-1 mt-0.5">
                    <div className="w-8 h-1 rounded-full" style={{ backgroundColor: isVoted ? '#a78bfa30' : `${c.color}20` }}>
                      {(isVoted || phase === 'active') && (
                        <div className="h-full rounded-full" style={{ width: isVoted ? '100%' : '0%', backgroundColor: isVoted ? '#a78bfa' : c.color, transition: 'width 0.5s ease' }} />
                      )}
                    </div>
                  </div>
                </div>
                {isVoted && (
                  <motion.div
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ type: 'spring', stiffness: 400, damping: 20 }}
                    className="w-4 h-4 rounded-full bg-cyber-violet flex items-center justify-center flex-shrink-0"
                  >
                    <svg width="8" height="8" viewBox="0 0 8 8" fill="none">
                      <path d="M1.5 4L3 5.5L6.5 2" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </motion.div>
                )}
              </motion.div>
            );
          })}
        </div>

        {/* VVPAT paper strip — fixed height to prevent layout shift */}
        <div className="mx-3 mb-3 h-[108px]">
          <motion.div
            className="rounded-xl border border-emerald-500/25 bg-emerald-500/5 overflow-hidden h-full"
            animate={phase === 'vvpat'
              ? { opacity: 1, scale: 1, pointerEvents: 'auto' }
              : { opacity: 0, scale: 0.97, pointerEvents: 'none' }}
            transition={{ duration: 0.35, ease: EASE_OUT }}
          >
              <div className="px-3 py-2.5">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[9px] font-mono uppercase tracking-widest text-emerald-400/70">VVPAT Slip</span>
                  <span className="text-[9px] font-mono text-emerald-400/50">
                    {Math.max(0, Math.ceil(vvpatProgress / (100 / 7)))}s
                  </span>
                </div>
                <div className="bg-white/[0.03] rounded-lg p-2 border border-white/[0.04] font-mono text-[10px] text-gray-400 leading-relaxed mb-2">
                  <div className="text-[9px] text-gray-600 mb-1">─────────────────</div>
                  <div className="text-white/60">Constituency: 47</div>
                  <div className="text-white/60">Candidate: <span className="text-emerald-400">Party B · #2</span></div>
                  <div className="text-[9px] text-gray-600 mt-1">─────────────────</div>
                </div>
                {/* Countdown bar */}
                <div className="h-0.5 bg-white/[0.05] rounded-full overflow-hidden">
                  <motion.div
                    className="h-full bg-gradient-to-r from-emerald-500 to-emerald-400 rounded-full"
                    style={{ width: `${vvpatProgress}%` }}
                    transition={{ duration: 0.2, ease: 'linear' }}
                  />
                </div>
              </div>
          </motion.div>
        </div>
      </motion.div>

      {/* ── Phase hint ── */}
      <div className="flex items-center justify-center gap-2 mt-0.5">
        {['idle', 'active', 'voted', 'vvpat'].map((p) => (
          <motion.div
            key={p}
            className="h-0.5 rounded-full"
            animate={{
              width: phase === p ? 20 : 6,
              backgroundColor: phase === p ? '#22d3ee' : 'rgba(255,255,255,0.1)',
            }}
            transition={{ duration: 0.3 }}
          />
        ))}
      </div>
    </div>
  );
};

const HeroSection = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.08, delayChildren: 0.15 },
    },
  };

  const itemVariants = {
    hidden: { y: 22, opacity: 0, filter: 'blur(4px)' },
    visible: {
      y: 0,
      opacity: 1,
      filter: 'blur(0px)',
      transition: { duration: 0.55, ease: EASE_OUT },
    },
  };

  return (
    <section className="relative w-full overflow-hidden bg-bg-0">

      {/* ── Background ── */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute inset-0 [background-image:linear-gradient(rgba(167,139,250,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(167,139,250,0.02)_1px,transparent_1px)] [background-size:56px_56px]" />

        <motion.div
          className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-cyber-violet/8 rounded-full blur-[100px]"
          animate={{ scale: [1, 1.08, 1], opacity: [0.6, 0.9, 0.6] }}
          transition={{ duration: 9, ease: 'easeInOut', repeat: Infinity }}
        />
        <motion.div
          className="absolute bottom-0 right-1/4 w-[400px] h-[400px] bg-cyber-cyan/6 rounded-full blur-[80px]"
          animate={{ scale: [1, 1.06, 1], opacity: [0.5, 0.8, 0.5] }}
          transition={{ duration: 11, ease: 'easeInOut', repeat: Infinity, delay: 2 }}
        />

        {/* Floating particles */}
        {[...Array(18)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full bg-white/20"
            style={{
              width: i % 3 === 0 ? 2 : 1,
              height: i % 3 === 0 ? 2 : 1,
              left: `${10 + (i * 5.3) % 80}%`,
              top: `${15 + (i * 7.1) % 70}%`,
            }}
            animate={{
              y: [0, -(60 + (i * 13) % 80)],
              opacity: [0.2, 0, 0.2],
            }}
            transition={{
              duration: 5 + (i * 1.1) % 7,
              ease: 'linear',
              repeat: Infinity,
              delay: (i * 0.41) % 5,
            }}
          />
        ))}
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 sm:py-24 lg:py-28">
        <motion.div
          className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >

          {/* ── Left — Text ── */}
          <div className="space-y-7 order-1">

            {/* Badge */}
            <motion.div variants={itemVariants}>
              <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-[11px] font-semibold uppercase tracking-[0.15em] text-cyber-cyan bg-cyber-cyan/8 border border-cyber-cyan/20">
                <motion.span
                  className="w-1.5 h-1.5 rounded-full bg-cyber-cyan"
                  animate={{ opacity: [1, 0.3, 1] }}
                  transition={{ duration: 1.6, repeat: Infinity }}
                />
                Interactive Educational Experience
              </span>
            </motion.div>

            {/* Headline */}
            <motion.h1
              variants={itemVariants}
              className="font-display text-5xl sm:text-6xl lg:text-7xl font-extrabold leading-[1.03] tracking-tight"
              style={{ textWrap: 'balance' }}
            >
              <span className="text-white">Can You Really</span>
              <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyber-violet via-cyber-cyan to-cyber-violet"
                style={{ backgroundSize: '200% auto' }}>
                <motion.span
                  style={{ backgroundSize: '200% auto', display: 'inline-block' }}
                  className="text-transparent bg-clip-text bg-gradient-to-r from-cyber-violet via-cyber-cyan to-cyber-violet"
                  animate={{ backgroundPosition: ['0% 0%', '100% 0%', '0% 0%'] }}
                  transition={{ duration: 5, ease: 'linear', repeat: Infinity }}
                >
                  Hack An EVM?
                </motion.span>
              </span>
            </motion.h1>

            {/* Subtext */}
            <motion.p
              variants={itemVariants}
              className="text-lg text-gray-400 max-w-lg leading-relaxed"
              style={{ textWrap: 'pretty' }}
            >
              Explore how electronic voting works, debunk four common myths, and survive the
              infamous 3-syntax-error hacking theory — step by step.
            </motion.p>

            {/* Stats */}
            <motion.div variants={itemVariants} className="flex flex-wrap items-center gap-x-5 gap-y-2.5">
              {statsItems.map(({ icon: Icon, label }, i) => (
                <div key={label} className="flex items-center gap-1.5 text-sm text-gray-500">
                  <Icon size={13} className="text-cyber-cyan/60 flex-shrink-0" />
                  <span className="font-medium text-gray-400">{label}</span>
                  {i < statsItems.length - 1 && (
                    <span className="ml-2 text-white/10 select-none">·</span>
                  )}
                </div>
              ))}
            </motion.div>

            {/* CTAs */}
            <motion.div variants={itemVariants} className="flex flex-col sm:flex-row gap-3">
              <motion.button
                onClick={() => document.getElementById('voting-demo')?.scrollIntoView({ behavior: 'smooth', block: 'start' })}
                className="inline-flex items-center justify-center gap-2 px-7 py-3.5 text-base font-semibold text-white bg-gradient-to-r from-cyber-violet to-cyber-cyan rounded-xl shadow-glow-cyan transition-shadow duration-200"
                whileHover={{ y: -2, scale: 1.01, transition: { duration: 0.2, ease: EASE_OUT } }}
                whileTap={{ scale: 0.96, transition: { duration: 0.1 } }}
              >
                <span>Start Voting Demo</span>
                <motion.span animate={{ x: [0, 4, 0] }} transition={{ duration: 1.5, repeat: Infinity }}>
                  <ArrowRight size={17} />
                </motion.span>
              </motion.button>

              <motion.button
                onClick={() => document.getElementById('hacker-mode')?.scrollIntoView({ behavior: 'smooth', block: 'start' })}
                className="inline-flex items-center justify-center gap-2 px-7 py-3.5 text-base font-semibold text-cyber-cyan bg-white/5 backdrop-blur-md rounded-xl border border-white/10 hover:bg-white/8 hover:border-cyber-cyan/25 transition-all duration-200"
                whileHover={{ y: -2, scale: 1.01, transition: { duration: 0.2, ease: EASE_OUT } }}
                whileTap={{ scale: 0.96, transition: { duration: 0.1 } }}
              >
                <motion.span animate={{ rotate: [0, 14, -14, 0] }} transition={{ duration: 2.8, repeat: Infinity }}>
                  <Zap size={17} />
                </motion.span>
                <span>Enter Hacker Mode</span>
              </motion.button>
            </motion.div>
          </div>

          {/* ── Right — EVM Illustration ── */}
          <motion.div
            variants={itemVariants}
            className="relative order-2 flex justify-center items-center"
          >
            {/* Glow behind */}
            <div className="absolute inset-0 rounded-3xl bg-cyber-violet/5 blur-2xl pointer-events-none" />

            <motion.div
              className="relative w-full max-w-[340px] sm:max-w-[380px]"
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 6, ease: 'easeInOut', repeat: Infinity }}
            >
              <EVMIllustration />
            </motion.div>

            {/* Ambient ring */}
            <motion.div
              className="absolute inset-0 rounded-3xl pointer-events-none"
              animate={{ boxShadow: ['0 0 0 1px rgba(167,139,250,0.08)', '0 0 0 1px rgba(34,211,238,0.12)', '0 0 0 1px rgba(167,139,250,0.08)'] }}
              transition={{ duration: 5, repeat: Infinity }}
            />
          </motion.div>
        </motion.div>
      </div>

      {/* Corner accents */}
      <motion.div
        className="absolute top-8 left-8 w-24 h-px bg-gradient-to-r from-cyber-violet/40 to-transparent pointer-events-none"
        animate={{ opacity: [0.3, 0.7, 0.3] }}
        transition={{ duration: 3.5, repeat: Infinity }}
      />
      <motion.div
        className="absolute top-8 right-8 w-24 h-px bg-gradient-to-l from-cyber-cyan/40 to-transparent pointer-events-none"
        animate={{ opacity: [0.3, 0.7, 0.3] }}
        transition={{ duration: 3.5, repeat: Infinity, delay: 1.2 }}
      />
    </section>
  );
};

export default HeroSection;
