import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  CheckCircle2, Lock, Unlock, Timer, RotateCcw,
  User, ArrowRight, ShieldCheck, Clock
} from 'lucide-react';

const EASE_OUT = [0.23, 1, 0.32, 1];
const VVPAT_DURATION = 7;   // seconds — voter views slip
const COOLDOWN_DURATION = 5; // seconds — compressed from real 15s

const CANDIDATES = [
  { id: 1, name: 'Aarav Sharma',   party: 'Progressive Party',  color: '#22d3ee', bg: 'rgba(34,211,238,0.1)' },
  { id: 2, name: 'Meera Patel',    party: 'National Front',      color: '#fbbf24', bg: 'rgba(251,191,36,0.1)' },
  { id: 3, name: 'Kabir Rao',      party: "People's Alliance",   color: '#a78bfa', bg: 'rgba(167,139,250,0.1)' },
  { id: 4, name: 'Ananya Singh',   party: 'Reform Coalition',    color: '#34d399', bg: 'rgba(52,211,153,0.1)' },
];

// ─── Officer Control Unit ──────────────────────────────────────────────────
const ControlUnit = ({ phase, onEnable, cooldown }) => {
  const indicators = [
    { label: 'POWER',    active: true,                                                         color: '#10b981' },
    { label: 'READY',    active: true,                                                         color: '#22d3ee' },
    { label: 'BALLOT',   active: ['ballot_active', 'voted', 'slip_viewing'].includes(phase),   color: '#a78bfa' },
    { label: 'RECORDED', active: ['slip_viewing', 'cooldown'].includes(phase),                 color: '#10b981' },
  ];

  return (
    <div className="flex flex-col h-full bg-bg-1 border border-white/8 rounded-2xl overflow-hidden">
      {/* Header */}
      <div className="px-5 py-4 border-b border-white/6">
        <div className="flex items-center gap-2 mb-1">
          <div className="w-2 h-2 rounded-full bg-cyber-emerald" style={{ boxShadow: '0 0 6px #10b981' }} />
          <span className="text-[10px] font-mono text-gray-500 uppercase tracking-widest">Polling Officer</span>
        </div>
        <h3 className="text-sm font-bold text-white tracking-wide">CONTROL UNIT</h3>
      </div>

      {/* Indicators */}
      <div className="px-5 py-4 space-y-2.5 flex-1">
        {indicators.map((ind) => (
          <div key={ind.label} className="flex items-center gap-3 px-3 py-2 rounded-lg bg-white/[0.03] border border-white/[0.05]">
            <motion.div
              className="w-2.5 h-2.5 rounded-full flex-shrink-0"
              style={{ backgroundColor: ind.active ? ind.color : 'rgba(255,255,255,0.15)' }}
              animate={ind.active ? { boxShadow: [`0 0 5px ${ind.color}`, `0 0 12px ${ind.color}`, `0 0 5px ${ind.color}`] } : {}}
              transition={{ duration: 1.5, repeat: Infinity }}
            />
            <span className={`text-[11px] font-mono ${ind.active ? 'text-white' : 'text-gray-600'}`}>{ind.label}</span>
            <div className="flex-1 h-px" style={{ background: ind.active ? `linear-gradient(90deg, ${ind.color}40, transparent)` : 'rgba(255,255,255,0.04)' }} />
          </div>
        ))}
      </div>

      {/* Action area */}
      <div className="px-5 pb-5">
        <AnimatePresence mode="wait">
          {phase === 'waiting' && (
            <motion.button
              key="enable"
              onClick={onEnable}
              className="w-full py-3 rounded-xl text-sm font-semibold bg-cyber-cyan/10 border border-cyber-cyan/30 text-cyber-cyan hover:bg-cyber-cyan/15 transition-colors flex items-center justify-center gap-2"
              initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.25, ease: EASE_OUT }}
              whileTap={{ scale: 0.97, transition: { duration: 0.1 } }}
            >
              <Unlock size={14} /> Enable Ballot Unit
            </motion.button>
          )}
          {phase === 'ballot_active' && (
            <motion.div
              key="active"
              className="w-full py-3 rounded-xl text-sm font-semibold bg-cyber-violet/10 border border-cyber-violet/20 text-cyber-violet text-center"
              initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }}
            >
              <div className="flex items-center justify-center gap-2">
                <motion.div className="w-1.5 h-1.5 rounded-full bg-cyber-violet" animate={{ opacity: [1, 0.3, 1] }} transition={{ duration: 1, repeat: Infinity }} />
                Ballot Unit Active
              </div>
            </motion.div>
          )}
          {phase === 'voted' && (
            <motion.div
              key="voted"
              className="w-full py-3 rounded-xl text-sm font-semibold bg-cyber-emerald/10 border border-cyber-emerald/20 text-cyber-emerald text-center flex items-center justify-center gap-2"
              initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }}
            >
              <CheckCircle2 size={14} /> Vote Registered
            </motion.div>
          )}
          {phase === 'slip_viewing' && (
            <motion.div
              key="slip"
              className="w-full py-3 rounded-xl text-sm font-semibold bg-cyber-emerald/10 border border-cyber-emerald/20 text-cyber-emerald text-center flex items-center justify-center gap-2"
              initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }}
            >
              <ShieldCheck size={14} /> Verifying VVPAT
            </motion.div>
          )}
          {phase === 'cooldown' && (
            <motion.div
              key="cooldown"
              className="w-full py-3 rounded-xl text-sm font-semibold bg-white/5 border border-white/10 text-gray-400 text-center"
              initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }}
            >
              <div className="flex items-center justify-center gap-2">
                <Clock size={13} />
                <span>Next voter: <span className="text-white tabular-nums">{cooldown}s</span></span>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

// ─── Ballot Unit ───────────────────────────────────────────────────────────
const BallotUnit = ({ phase, onVote, selected }) => {
  const isActive = phase === 'ballot_active';
  const isLocked = ['voted', 'slip_viewing', 'cooldown'].includes(phase);
  const isWaiting = phase === 'waiting';

  return (
    <div className="flex flex-col h-full bg-bg-1 border border-white/8 rounded-2xl overflow-hidden">
      {/* Header */}
      <div className="px-5 py-4 border-b border-white/6">
        <h3 className="text-sm font-bold text-white tracking-wide mb-2">BALLOT UNIT</h3>

        {/* Status bar */}
        <AnimatePresence mode="wait">
          {isWaiting && (
            <motion.div key="w" className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-white/[0.04] border border-white/[0.07]"
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
              <Lock size={11} className="text-gray-500" />
              <span className="text-[11px] font-mono text-gray-500">LOCKED — AWAITING OFFICER</span>
            </motion.div>
          )}
          {isActive && (
            <motion.div key="a" className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-cyber-emerald/10 border border-cyber-emerald/25"
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
              <motion.div className="w-1.5 h-1.5 rounded-full bg-cyber-emerald" animate={{ opacity: [1, 0.3, 1] }} transition={{ duration: 0.8, repeat: Infinity }} />
              <span className="text-[11px] font-mono text-cyber-emerald">READY TO VOTE</span>
            </motion.div>
          )}
          {isLocked && (
            <motion.div key="l" className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-cyber-violet/10 border border-cyber-violet/25"
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
              <Lock size={11} className="text-cyber-violet" />
              <span className="text-[11px] font-mono text-cyber-violet">VOTE RECORDED — LOCKED</span>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Candidate list */}
      <div className="flex-1 px-4 py-4 space-y-2 overflow-auto">
        {CANDIDATES.map((c, i) => {
          const isSelected = selected?.id === c.id;
          const canVote = isActive && !selected;

          return (
            <motion.button
              key={c.id}
              onClick={() => canVote && onVote(c)}
              disabled={!canVote && !isSelected}
              className="w-full flex items-center gap-3 px-4 py-3 rounded-xl border transition-colors text-left"
              style={isSelected ? {
                background: c.bg,
                borderColor: `${c.color}50`,
                boxShadow: `0 0 20px ${c.color}18`,
              } : {
                background: 'rgba(255,255,255,0.025)',
                borderColor: isActive && !selected ? 'rgba(255,255,255,0.1)' : 'rgba(255,255,255,0.04)',
                opacity: !isActive && !isSelected ? 0.45 : 1,
              }}
              whileHover={canVote ? { y: -1, borderColor: `${c.color}40`, transition: { duration: 0.15 } } : {}}
              whileTap={canVote ? { scale: 0.98, transition: { duration: 0.08 } } : {}}
            >
              {/* Number badge */}
              <div
                className="w-8 h-8 rounded-lg flex items-center justify-center text-sm font-bold flex-shrink-0"
                style={{ background: isSelected ? c.bg : 'rgba(255,255,255,0.05)', color: isSelected ? c.color : 'rgba(255,255,255,0.3)', border: `1px solid ${isSelected ? c.color + '30' : 'rgba(255,255,255,0.08)'}` }}
              >
                {i + 1}
              </div>

              {/* Name & party */}
              <div className="flex-1 min-w-0">
                <p className={`text-sm font-semibold ${isSelected ? 'text-white' : 'text-gray-300'}`}>{c.name}</p>
                <p className="text-[11px] text-gray-600 truncate">{c.party}</p>
              </div>

              {/* State indicator */}
              <div className="flex-shrink-0">
                {isSelected ? (
                  <motion.div
                    initial={{ scale: 0 }} animate={{ scale: 1 }}
                    transition={{ type: 'spring', stiffness: 500, damping: 20 }}
                  >
                    <CheckCircle2 size={18} style={{ color: c.color }} />
                  </motion.div>
                ) : canVote ? (
                  <div className="px-3 py-1 rounded-full text-xs font-semibold border"
                    style={{ color: c.color, borderColor: `${c.color}30`, background: c.bg }}>
                    Vote
                  </div>
                ) : null}
              </div>
            </motion.button>
          );
        })}
      </div>

      {/* Rate-limit note */}
      <div className="px-5 py-3 border-t border-white/[0.04]">
        <p className="text-[10px] text-gray-700 font-mono text-center">
          Max 4 votes/min · Vote locks immediately on selection
        </p>
      </div>
    </div>
  );
};

// ─── VVPAT Viewer ─────────────────────────────────────────────────────────
const VVPATViewer = ({ phase, selected, vvpatSeconds }) => {
  const showSlip = phase === 'slip_viewing';
  const slipCollected = phase === 'cooldown';
  const progress = showSlip ? ((VVPAT_DURATION - vvpatSeconds) / VVPAT_DURATION) * 100 : 0;

  return (
    <div className="flex flex-col h-full bg-bg-1 border border-white/8 rounded-2xl overflow-hidden">
      {/* Header */}
      <div className="px-5 py-4 border-b border-white/6">
        <h3 className="text-sm font-bold text-white tracking-wide mb-0.5">VVPAT VIEWER</h3>
        <p className="text-[10px] text-gray-600 font-mono">Voter Verified Paper Audit Trail</p>
      </div>

      {/* Viewing window */}
      <div className="flex-1 px-5 py-4 flex flex-col gap-3">
        <div className="flex-1 relative rounded-xl bg-bg-2 border border-white/[0.06] overflow-hidden flex items-center justify-center">
          {/* Scan line */}
          <motion.div
            className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-cyber-cyan/40 to-transparent pointer-events-none"
            animate={{ y: [0, 200, 0] }}
            transition={{ duration: 3, repeat: Infinity, ease: 'linear' }}
          />

          <AnimatePresence mode="wait">
            {!showSlip && !slipCollected && (
              <motion.div key="wait" className="text-center p-6"
                initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                <div className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center mx-auto mb-3">
                  <motion.div className="w-2 h-2 rounded-full bg-cyber-cyan/40"
                    animate={{ opacity: [0.4, 1, 0.4] }} transition={{ duration: 1.5, repeat: Infinity }} />
                </div>
                <p className="text-xs text-gray-600 font-mono">WAITING FOR VOTE</p>
              </motion.div>
            )}

            {showSlip && selected && (
              <motion.div key="slip"
                className="w-full h-full p-4 flex flex-col"
                initial={{ y: -80, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: 80, opacity: 0 }}
                transition={{ duration: 0.5, ease: EASE_OUT }}
              >
                {/* Paper slip */}
                <div className="flex-1 bg-white rounded-lg p-4 flex flex-col items-center justify-center shadow-lg">
                  <p className="text-[9px] text-gray-500 uppercase tracking-widest mb-2 font-mono">VVPAT Slip</p>
                  <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center mb-2">
                    <User size={16} className="text-gray-500" />
                  </div>
                  <p className="text-sm font-bold text-gray-800 text-center leading-tight">{selected.name}</p>
                  <p className="text-[10px] text-gray-500 text-center mt-1">{selected.party}</p>
                  <div className="mt-3 pt-3 border-t border-gray-100 w-full text-center">
                    <p className="text-[9px] text-gray-400 font-mono">Electronic Vote Verification</p>
                  </div>
                </div>

                {/* 7-second countdown */}
                <div className="mt-3">
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="text-[10px] text-gray-500 font-mono">Voter viewing slip</span>
                    <span className="text-[10px] text-cyber-amber font-mono tabular-nums flex items-center gap-1">
                      <Timer size={10} />{vvpatSeconds}s
                    </span>
                  </div>
                  <div className="h-1 rounded-full bg-bg-3 overflow-hidden">
                    <motion.div
                      className="h-full rounded-full bg-gradient-to-r from-cyber-amber to-cyber-emerald"
                      style={{ width: `${100 - progress}%` }}
                      transition={{ duration: 0.5, ease: 'linear' }}
                    />
                  </div>
                </div>
              </motion.div>
            )}

            {slipCollected && selected && (
              <motion.div key="collected" className="text-center p-4"
                initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4, ease: EASE_OUT }}>
                <div className="w-10 h-10 rounded-full bg-cyber-emerald/15 border border-cyber-emerald/30 flex items-center justify-center mx-auto mb-3">
                  <CheckCircle2 size={20} className="text-cyber-emerald" />
                </div>
                <p className="text-xs font-semibold text-cyber-emerald">SLIP SECURED</p>
                <p className="text-[10px] text-gray-600 mt-1 font-mono">{selected.name}</p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Sealed box */}
        <motion.div
          className="rounded-xl px-4 py-3 text-center border transition-all duration-500"
          style={slipCollected ? {
            background: 'rgba(52,211,153,0.06)',
            borderColor: 'rgba(52,211,153,0.25)',
          } : {
            background: 'rgba(255,255,255,0.025)',
            borderColor: 'rgba(255,255,255,0.06)',
          }}
        >
          <p className="text-[10px] font-mono" style={{ color: slipCollected ? '#34d399' : '#4b5563' }}>
            {slipCollected ? '● SLIP IN SEALED BOX' : '○ SEALED BOX'}
          </p>
        </motion.div>
      </div>
    </div>
  );
};

// ─── Connection Arrow ──────────────────────────────────────────────────────
const ConnectionArrow = ({ active }) => (
  <div className="hidden lg:flex items-center justify-center w-8 flex-shrink-0">
    <motion.div
      animate={active ? { opacity: [0.4, 1, 0.4] } : { opacity: 0.15 }}
      transition={{ duration: 1.5, repeat: Infinity }}
    >
      <ArrowRight size={16} className={active ? 'text-cyber-cyan' : 'text-gray-700'} />
    </motion.div>
  </div>
);

// ─── Step Info Bar ─────────────────────────────────────────────────────────
const stepInfo = {
  waiting:      { n: 1, label: 'Officer enables the Ballot Unit from the Control Unit', color: 'text-cyber-cyan' },
  ballot_active:{ n: 2, label: 'Voter presses their candidate\'s button — vote locks instantly', color: 'text-cyber-violet' },
  voted:        { n: 3, label: 'Ballot unit is locked. VVPAT slip appears in the window', color: 'text-cyber-amber' },
  slip_viewing: { n: 3, label: `Voter verifies the slip for ${VVPAT_DURATION} seconds, then it drops into the sealed box`, color: 'text-cyber-amber' },
  cooldown:     { n: 4, label: 'Slip secured. System cooling down before next voter (rate limit)', color: 'text-cyber-emerald' },
};

// ─── Main Component ────────────────────────────────────────────────────────
const VotingDemoSection = () => {
  const [phase, setPhase] = useState('waiting');  // waiting | ballot_active | voted | slip_viewing | cooldown
  const [selected, setSelected] = useState(null);
  const [vvpatSeconds, setVvpatSeconds] = useState(VVPAT_DURATION);
  const [cooldownSeconds, setCooldownSeconds] = useState(COOLDOWN_DURATION);

  // VVPAT countdown
  useEffect(() => {
    if (phase !== 'slip_viewing') return;
    setVvpatSeconds(VVPAT_DURATION);
    const id = setInterval(() => {
      setVvpatSeconds((s) => {
        if (s <= 1) { clearInterval(id); setPhase('cooldown'); return 0; }
        return s - 1;
      });
    }, 1000);
    return () => clearInterval(id);
  }, [phase]);

  // Cooldown countdown
  useEffect(() => {
    if (phase !== 'cooldown') return;
    setCooldownSeconds(COOLDOWN_DURATION);
    const id = setInterval(() => {
      setCooldownSeconds((s) => {
        if (s <= 1) { clearInterval(id); return 0; }
        return s - 1;
      });
    }, 1000);
    return () => clearInterval(id);
  }, [phase]);

  const handleEnable = useCallback(() => setPhase('ballot_active'), []);

  const handleVote = useCallback((candidate) => {
    setSelected(candidate);
    setPhase('voted');
    // After 1.2s: transition to slip_viewing (VVPAT shows)
    setTimeout(() => setPhase('slip_viewing'), 1200);
  }, []);

  const handleReset = useCallback(() => {
    setPhase('waiting');
    setSelected(null);
    setVvpatSeconds(VVPAT_DURATION);
    setCooldownSeconds(COOLDOWN_DURATION);
  }, []);

  const info = stepInfo[phase] ?? stepInfo.waiting;

  return (
    <section id="voting-demo" className="relative py-24 bg-bg-0 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 [background-image:linear-gradient(rgba(167,139,250,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(167,139,250,0.02)_1px,transparent_1px)] [background-size:48px_48px] pointer-events-none" />
      <motion.div className="absolute top-1/3 left-1/4 w-80 h-80 bg-cyber-violet/6 rounded-full blur-[100px] pointer-events-none"
        animate={{ x: [0, 30, 0], y: [0, -20, 0] }} transition={{ duration: 12, repeat: Infinity }} />
      <motion.div className="absolute bottom-1/3 right-1/4 w-96 h-96 bg-cyber-cyan/5 rounded-full blur-[120px] pointer-events-none"
        animate={{ x: [0, -25, 0], y: [0, 25, 0] }} transition={{ duration: 10, repeat: Infinity }} />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <div className="text-center mb-12">
          <motion.span
            className="inline-block px-4 py-1.5 bg-cyber-violet/10 border border-cyber-violet/20 rounded-full text-xs font-semibold uppercase tracking-widest text-cyber-violet mb-5"
            initial={{ opacity: 0, scale: 0.92 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }}
          >
            Interactive Demo
          </motion.span>
          <motion.h2
            className="font-display text-4xl md:text-5xl font-extrabold tracking-tight text-white mb-4"
            initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            transition={{ delay: 0.07, ease: EASE_OUT, duration: 0.55 }}
            style={{ textWrap: 'balance' }}
          >
            Experience the{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyber-violet to-cyber-cyan">Voting Process</span>
          </motion.h2>
          <motion.p
            className="text-gray-400 text-lg max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            transition={{ delay: 0.12, ease: EASE_OUT, duration: 0.55 }}
            style={{ textWrap: 'pretty' }}
          >
            A realistic simulation of how an EVM works — from officer activation to slip verification. Vote locks the moment you press the button.
          </motion.p>
        </div>

        {/* Step info pill */}
        <AnimatePresence mode="wait">
          <motion.div
            key={phase}
            className="flex items-center justify-center mb-8"
            initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.25, ease: EASE_OUT }}
          >
            <div className="inline-flex items-center gap-3 px-5 py-2.5 bg-bg-1 border border-white/8 rounded-full">
              <span className="text-xs font-mono text-gray-600">STEP {info.n}/4</span>
              <div className="w-px h-3 bg-white/10" />
              <span className={`text-xs font-medium ${info.color}`}>{info.label}</span>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* EVM Panel Layout */}
        <motion.div
          className="flex flex-col lg:flex-row items-stretch gap-3 lg:gap-0 mb-10"
          initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.6, ease: EASE_OUT }}
        >
          {/* Control Unit */}
          <div className="lg:w-[280px] flex-shrink-0 min-h-[340px]">
            <ControlUnit phase={phase} onEnable={handleEnable} cooldown={cooldownSeconds} />
          </div>

          <ConnectionArrow active={phase !== 'waiting'} />

          {/* Ballot Unit */}
          <div className="flex-1 min-h-[380px]">
            <BallotUnit phase={phase} onVote={handleVote} selected={selected} />
          </div>

          <ConnectionArrow active={['voted', 'slip_viewing', 'cooldown'].includes(phase)} />

          {/* VVPAT */}
          <div className="lg:w-[260px] flex-shrink-0 min-h-[340px]">
            <VVPATViewer phase={phase} selected={selected} vvpatSeconds={vvpatSeconds} />
          </div>
        </motion.div>

        {/* Completion + restart */}
        <AnimatePresence>
          {phase === 'cooldown' && cooldownSeconds === 0 && (
            <motion.div
              className="text-center"
              initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
              transition={{ duration: 0.4, ease: EASE_OUT }}
            >
              <div className="inline-flex flex-col items-center gap-4 p-8 bg-bg-1 border border-white/8 rounded-2xl">
                <div className="w-14 h-14 rounded-full bg-cyber-emerald/10 border border-cyber-emerald/25 flex items-center justify-center">
                  <CheckCircle2 size={28} className="text-cyber-emerald" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-white">Simulation Complete</h3>
                  <p className="text-sm text-gray-400 mt-1">
                    {selected?.name} — vote recorded and verified.
                  </p>
                </div>
                <motion.button
                  onClick={handleReset}
                  className="inline-flex items-center gap-2 px-6 py-2.5 bg-cyber-violet/10 border border-cyber-violet/25 text-cyber-violet text-sm font-semibold rounded-xl hover:bg-cyber-violet/15 transition-colors"
                  whileTap={{ scale: 0.97, transition: { duration: 0.1 } }}
                >
                  <RotateCcw size={14} /> Try Again
                </motion.button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Info callout */}
        <motion.div
          className="mt-10 grid sm:grid-cols-3 gap-3"
          initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          {[
            { Icon: Lock, text: 'Vote locks the instant you press a candidate button — cannot be undone or changed', color: 'text-cyber-cyan' },
            { Icon: Timer, text: 'VVPAT shows your slip for 7 seconds before it drops into a tamper-proof sealed box', color: 'text-cyber-amber' },
            { Icon: ShieldCheck, text: 'Max 4 votes per minute — rapid fake-voting is physically rate-limited by hardware', color: 'text-cyber-emerald' },
          ].map(({ Icon, text, color }) => (
            <div key={text} className="flex items-start gap-3 px-4 py-3 rounded-xl bg-bg-1 border border-white/[0.06]">
              <Icon size={15} className={`${color} flex-shrink-0 mt-0.5`} />
              <p className="text-xs text-gray-500 leading-relaxed">{text}</p>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default VotingDemoSection;
