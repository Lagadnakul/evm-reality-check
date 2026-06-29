import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Terminal, WifiOff, Cpu, ShieldCheck } from 'lucide-react';

const EASE_OUT = [0.23, 1, 0.32, 1];

const myths = [
  {
    id: 1,
    myth: '"Someone can hack it from home using Python."',
    reality:
      'EVMs have no OS, no interpreter, and no input ports that accept external code. Python — or any language — has nothing to run on.',
    mythBadge: 'bg-rose-500/15 text-rose-300 border-rose-500/25',
    realityBadge: 'bg-emerald-500/15 text-emerald-300 border-emerald-500/25',
    accent: '#22d3ee',
    accentGlow: 'rgba(34,211,238,0.12)',
    borderClass: 'border-l-cyber-cyan',
    Icon: Terminal,
  },
  {
    id: 2,
    myth: '"Every electronic device is connected to the internet."',
    reality:
      'EVMs contain no WiFi chip, no Bluetooth module, no SIM slot. The radio silence is hardware-level — there is nothing to intercept.',
    mythBadge: 'bg-rose-500/15 text-rose-300 border-rose-500/25',
    realityBadge: 'bg-emerald-500/15 text-emerald-300 border-emerald-500/25',
    accent: '#a78bfa',
    accentGlow: 'rgba(167,139,250,0.12)',
    borderClass: 'border-l-cyber-violet',
    Icon: WifiOff,
  },
  {
    id: 3,
    myth: '"If I know coding, I can hack anything."',
    reality:
      'EVM firmware is burned once using OTP (one-time programmable) memory at the factory. No field update is possible — not even by the manufacturer.',
    mythBadge: 'bg-rose-500/15 text-rose-300 border-rose-500/25',
    realityBadge: 'bg-emerald-500/15 text-emerald-300 border-emerald-500/25',
    accent: '#34d399',
    accentGlow: 'rgba(52,211,153,0.12)',
    borderClass: 'border-l-cyber-emerald',
    Icon: Cpu,
  },
  {
    id: 4,
    myth: '"Technology security is only about software."',
    reality:
      'EVMs use physical tamper-evident seals, multi-party custody chains, and VVPAT paper slips. Compromising one layer leaves five more intact.',
    mythBadge: 'bg-rose-500/15 text-rose-300 border-rose-500/25',
    realityBadge: 'bg-emerald-500/15 text-emerald-300 border-emerald-500/25',
    accent: '#fbbf24',
    accentGlow: 'rgba(251,191,36,0.12)',
    borderClass: 'border-l-cyber-amber',
    Icon: ShieldCheck,
  },
];

const MythCard = ({ myth, index }) => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-60px' });

  return (
    <motion.article
      ref={ref}
      initial={{ opacity: 0, y: 24, filter: 'blur(4px)' }}
      animate={inView ? { opacity: 1, y: 0, filter: 'blur(0px)' } : {}}
      transition={{ duration: 0.55, ease: EASE_OUT, delay: index * 0.08 }}
      className={`relative flex flex-col bg-bg-1 border border-white/8 border-l-[3px] ${myth.borderClass} rounded-2xl overflow-hidden group`}
      style={{
        boxShadow: `0 1px 3px rgba(0,0,0,0.4), 0 0 0 0 transparent`,
      }}
      whileHover={{
        boxShadow: `0 8px 32px rgba(0,0,0,0.5), 0 0 24px ${myth.accentGlow}`,
        y: -2,
        transition: { duration: 0.2, ease: EASE_OUT },
      }}
    >
      {/* Card number + icon */}
      <div className="flex items-center justify-between px-6 pt-6 pb-4">
        <span
          className="text-xs font-mono font-bold uppercase tracking-widest opacity-40"
          style={{ color: myth.accent }}
        >
          Myth {String(myth.id).padStart(2, '0')}
        </span>
        <myth.Icon size={18} style={{ color: myth.accent, opacity: 0.6 }} />
      </div>

      {/* Divider */}
      <div className="mx-6 h-px bg-white/6" />

      {/* Myth */}
      <div className="px-6 pt-5 pb-4">
        <span
          className={`inline-block px-2.5 py-0.5 rounded-full text-[10px] font-semibold uppercase tracking-widest border mb-3 ${myth.mythBadge}`}
        >
          Myth
        </span>
        <p className="text-gray-300 text-[15px] italic leading-snug font-medium">{myth.myth}</p>
      </div>

      {/* Divider with arrow */}
      <div className="mx-6 flex items-center gap-3 py-1">
        <div className="flex-1 h-px bg-white/6" />
        <span className="text-xs text-gray-600">→</span>
        <div className="flex-1 h-px bg-white/6" />
      </div>

      {/* Reality */}
      <div className="px-6 pt-4 pb-6">
        <span
          className={`inline-block px-2.5 py-0.5 rounded-full text-[10px] font-semibold uppercase tracking-widest border mb-3 ${myth.realityBadge}`}
        >
          Reality
        </span>
        <p className="text-gray-400 text-sm leading-relaxed">{myth.reality}</p>
      </div>
    </motion.article>
  );
};

const MythRealitySection = () => {
  const headerRef = useRef(null);
  const headerInView = useInView(headerRef, { once: true, margin: '-80px' });

  return (
    <section
      id="myth-reality"
      className="relative py-28 bg-gradient-to-b from-bg-0 via-bg-1 to-bg-0 overflow-hidden"
    >
      {/* Background grid */}
      <div className="absolute inset-0 [background-image:linear-gradient(rgba(167,139,250,0.025)_1px,transparent_1px),linear-gradient(90deg,rgba(167,139,250,0.025)_1px,transparent_1px)] [background-size:48px_48px] pointer-events-none" />

      {/* Ambient orbs */}
      <motion.div
        className="absolute top-1/4 left-[8%] w-72 h-72 bg-cyber-violet/8 rounded-full blur-[100px] pointer-events-none"
        animate={{ x: [0, 30, 0], y: [0, -20, 0], opacity: [0.3, 0.5, 0.3] }}
        transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
      />
      <motion.div
        className="absolute bottom-1/4 right-[8%] w-80 h-80 bg-cyber-cyan/6 rounded-full blur-[120px] pointer-events-none"
        animate={{ x: [0, -25, 0], y: [0, 30, 0], opacity: [0.2, 0.4, 0.2] }}
        transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut' }}
      />

      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div ref={headerRef} className="text-center mb-14 max-w-3xl mx-auto">
          <motion.span
            className="inline-block px-4 py-1.5 bg-cyber-violet/10 border border-cyber-violet/20 rounded-full text-xs font-semibold uppercase tracking-widest text-cyber-violet mb-6"
            initial={{ opacity: 0, scale: 0.92, filter: 'blur(4px)' }}
            animate={headerInView ? { opacity: 1, scale: 1, filter: 'blur(0px)' } : {}}
            transition={{ duration: 0.5, ease: EASE_OUT }}
          >
            Educational Insights
          </motion.span>

          <motion.h2
            className="font-display text-4xl md:text-5xl font-extrabold text-white mb-5 tracking-tight"
            initial={{ opacity: 0, y: 20, filter: 'blur(4px)' }}
            animate={headerInView ? { opacity: 1, y: 0, filter: 'blur(0px)' } : {}}
            transition={{ duration: 0.55, ease: EASE_OUT, delay: 0.06 }}
            style={{ textWrap: 'balance' }}
          >
            4 Myths.{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyber-violet to-cyber-cyan">
              4 Realities.
            </span>
          </motion.h2>

          <motion.p
            className="text-gray-400 text-lg leading-relaxed"
            initial={{ opacity: 0, y: 20, filter: 'blur(4px)' }}
            animate={headerInView ? { opacity: 1, y: 0, filter: 'blur(0px)' } : {}}
            transition={{ duration: 0.55, ease: EASE_OUT, delay: 0.12 }}
            style={{ textWrap: 'pretty' }}
          >
            WhatsApp forwards thrive on technical-sounding half-truths. Here's what the
            engineering actually says.
          </motion.p>
        </div>

        {/* 2×2 Grid */}
        <div className="grid sm:grid-cols-2 gap-4 lg:gap-5">
          {myths.map((myth, i) => (
            <MythCard key={myth.id} myth={myth} index={i} />
          ))}
        </div>

        {/* Bottom note */}
        <motion.p
          className="text-center text-sm text-gray-600 mt-8"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          Sources: Election Commission of India · BEL / ECIL technical specifications · Supreme Court of India orders on VVPAT
        </motion.p>
      </div>
    </section>
  );
};

export default MythRealitySection;
