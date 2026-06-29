import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { WifiOff, Lock, FileText, ShieldCheck } from 'lucide-react';

const EASE_OUT = [0.23, 1, 0.32, 1];

const facts = [
  {
    Icon: WifiOff,
    label: 'No Network',
    desc: 'Zero WiFi, Bluetooth, or cellular hardware. Physically impossible to reach remotely.',
    accent: 'cyan',
  },
  {
    Icon: Lock,
    label: 'OTP Firmware',
    desc: 'Software burned once at manufacture using one-time programmable memory. Unmodifiable in the field.',
    accent: 'violet',
  },
  {
    Icon: FileText,
    label: 'VVPAT Trail',
    desc: 'Every vote prints a paper slip visible to the voter for 7 seconds before dropping into a sealed box.',
    accent: 'emerald',
  },
  {
    Icon: ShieldCheck,
    label: 'Physical Seals',
    desc: 'Tamper-evident seals broken only with all party representatives present. Any breach is instantly visible.',
    accent: 'rose',
  },
];

const stats = [
  { value: '0', label: 'Remote Exploits\nEver Demonstrated' },
  { value: '1982', label: 'First Pilot\nElection' },
  { value: '543', label: 'Lok Sabha\nConstituencies' },
  { value: '100%', label: 'Air-Gapped\nDesign' },
];

const accentMap = {
  cyan: {
    border: 'border-l-cyber-cyan',
    bg: 'bg-cyber-cyan/10',
    text: 'text-cyber-cyan',
    glow: 'shadow-[0_0_20px_rgba(34,211,238,0.15)]',
  },
  violet: {
    border: 'border-l-cyber-violet',
    bg: 'bg-cyber-violet/10',
    text: 'text-cyber-violet',
    glow: 'shadow-[0_0_20px_rgba(167,139,250,0.15)]',
  },
  emerald: {
    border: 'border-l-cyber-emerald',
    bg: 'bg-cyber-emerald/10',
    text: 'text-cyber-emerald',
    glow: 'shadow-[0_0_20px_rgba(52,211,153,0.15)]',
  },
  rose: {
    border: 'border-l-cyber-rose',
    bg: 'bg-cyber-rose/10',
    text: 'text-cyber-rose',
    glow: 'shadow-[0_0_20px_rgba(251,113,133,0.15)]',
  },
};

const FactCard = ({ fact, index }) => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-60px' });
  const a = accentMap[fact.accent];

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20, filter: 'blur(4px)' }}
      animate={inView ? { opacity: 1, y: 0, filter: 'blur(0px)' } : {}}
      transition={{ duration: 0.5, ease: EASE_OUT, delay: index * 0.07 }}
      className={`relative bg-bg-1 border border-white/8 border-l-[3px] ${a.border} rounded-2xl p-5 ${a.glow} group hover:-translate-y-0.5 transition-transform duration-200`}
    >
      <div className={`inline-flex items-center justify-center w-10 h-10 rounded-xl ${a.bg} mb-3`}>
        <fact.Icon size={18} className={a.text} />
      </div>
      <h3 className={`text-sm font-semibold uppercase tracking-widest ${a.text} mb-1.5`}>
        {fact.label}
      </h3>
      <p className="text-gray-400 text-sm leading-relaxed">{fact.desc}</p>
    </motion.div>
  );
};

const WhatIsEvmSection = () => {
  const headerRef = useRef(null);
  const headerInView = useInView(headerRef, { once: true, margin: '-80px' });
  const statsRef = useRef(null);
  const statsInView = useInView(statsRef, { once: true, margin: '-60px' });

  return (
    <section id="what-is-evm" className="relative py-28 bg-bg-0 overflow-hidden">
      {/* Background grid */}
      <div className="absolute inset-0 [background-image:linear-gradient(rgba(34,211,238,0.025)_1px,transparent_1px),linear-gradient(90deg,rgba(34,211,238,0.025)_1px,transparent_1px)] [background-size:48px_48px] pointer-events-none" />

      {/* Ambient glow */}
      <motion.div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[400px] bg-cyber-cyan/5 rounded-full blur-[120px] pointer-events-none"
        animate={{ scale: [1, 1.05, 1], opacity: [0.4, 0.6, 0.4] }}
        transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
      />

      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <motion.div
          ref={headerRef}
          className="text-center mb-16 max-w-3xl mx-auto"
        >
          <motion.span
            className="inline-block px-4 py-1.5 bg-cyber-cyan/10 border border-cyber-cyan/20 rounded-full text-xs font-semibold uppercase tracking-widest text-cyber-cyan mb-6"
            initial={{ opacity: 0, scale: 0.92, filter: 'blur(4px)' }}
            animate={headerInView ? { opacity: 1, scale: 1, filter: 'blur(0px)' } : {}}
            transition={{ duration: 0.5, ease: EASE_OUT }}
          >
            Before We Begin
          </motion.span>

          <motion.h2
            className="font-display text-4xl md:text-5xl font-extrabold text-white mb-5 tracking-tight"
            initial={{ opacity: 0, y: 20, filter: 'blur(4px)' }}
            animate={headerInView ? { opacity: 1, y: 0, filter: 'blur(0px)' } : {}}
            transition={{ duration: 0.55, ease: EASE_OUT, delay: 0.06 }}
            style={{ textWrap: 'balance' }}
          >
            What is an{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyber-cyan to-cyber-violet">
              EVM
            </span>
            , actually?
          </motion.h2>

          <motion.p
            className="text-gray-400 text-lg leading-relaxed"
            initial={{ opacity: 0, y: 20, filter: 'blur(4px)' }}
            animate={headerInView ? { opacity: 1, y: 0, filter: 'blur(0px)' } : {}}
            transition={{ duration: 0.55, ease: EASE_OUT, delay: 0.12 }}
            style={{ textWrap: 'pretty' }}
          >
            An Electronic Voting Machine is a purpose-built, standalone hardware device — not a
            computer running Windows, not a phone, not a server. It has one job: record a single
            button press. Understanding that changes the entire conversation.
          </motion.p>
        </motion.div>

        {/* Stats bar */}
        <motion.div
          ref={statsRef}
          className="grid grid-cols-2 md:grid-cols-4 gap-px bg-white/8 rounded-2xl overflow-hidden mb-16 border border-white/8"
        >
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              className="bg-bg-1 flex flex-col items-center justify-center py-8 px-4 text-center"
              initial={{ opacity: 0, y: 16 }}
              animate={statsInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.45, ease: EASE_OUT, delay: i * 0.07 }}
            >
              <span className="font-display text-3xl md:text-4xl font-extrabold text-white tabular-nums">
                {stat.value}
              </span>
              <span className="text-xs text-gray-500 mt-2 uppercase tracking-wider whitespace-pre-line leading-snug">
                {stat.label}
              </span>
            </motion.div>
          ))}
        </motion.div>

        {/* Fact cards 2×2 */}
        <div className="grid sm:grid-cols-2 gap-4">
          {facts.map((fact, i) => (
            <FactCard key={fact.label} fact={fact} index={i} />
          ))}
        </div>

        {/* Key Facts callout — SEO/AEO structured facts block */}
        <motion.aside
          aria-label="Key facts about EVM security"
          className="mt-10 bg-gradient-to-r from-cyber-cyan/5 via-bg-1 to-cyber-violet/5 border border-white/8 rounded-2xl p-6 sm:p-8"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.5, ease: EASE_OUT }}
        >
          <h3 className="text-xs font-semibold uppercase tracking-widest text-cyber-cyan mb-5">
            Key Facts
          </h3>
          <ul className="grid sm:grid-cols-2 gap-x-8 gap-y-3 mb-6">
            {[
              'EVMs run on One-Time Programmable (OTP) microcontroller chips — unmodifiable after manufacture',
              'Max 4 votes per minute — rate-limited at the hardware level to prevent rapid fake voting',
              'Each vote requires the polling officer to manually activate the Ballot Unit from the Control Unit',
              'VVPAT paper slips are physically separated from the electronic count — two independent records',
              'EVM firmware has never been successfully demonstrated to be tampered with in any Indian election',
              'Physical custody chains require multi-party witnesses at every stage from storage to counting',
            ].map((fact, i) => (
              <li key={i} className="flex items-start gap-2.5 text-sm text-gray-400">
                <span className="mt-1 w-1.5 h-1.5 rounded-full bg-cyber-cyan/50 flex-shrink-0" />
                {fact}
              </li>
            ))}
          </ul>
          <p className="text-sm text-gray-500 border-t border-white/[0.05] pt-4">
            <span className="text-white font-medium">Bottom line: </span>
            You can't "hack" an EVM the way you hack a website. The remote attack surface
            simply doesn't exist. Let's explore why — step by step.
          </p>
        </motion.aside>
      </div>
    </section>
  );
};

export default WhatIsEvmSection;
