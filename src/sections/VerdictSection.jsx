import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

const EASE_OUT = [0.23, 1, 0.32, 1];

const takeaways = [
  {
    number: '01',
    title: 'Hardware, not software',
    body: 'EVMs are single-purpose microcontrollers with burned firmware. No OS, no runtime, no remote surface — the attack vector that WhatsApp describes simply does not exist.',
    accent: '#22d3ee',
    accentBg: 'bg-cyber-cyan/10',
    accentBorder: 'border-l-cyber-cyan',
    accentText: 'text-cyber-cyan',
    glow: 'rgba(34,211,238,0.15)',
  },
  {
    number: '02',
    title: 'Observable by design',
    body: 'VVPAT paper slips, multi-party custody seals, and public mock polls mean the system is independently verifiable — not a black box you have to trust blindly.',
    accent: '#a78bfa',
    accentBg: 'bg-cyber-violet/10',
    accentBorder: 'border-l-cyber-violet',
    accentText: 'text-cyber-violet',
    glow: 'rgba(167,139,250,0.15)',
  },
  {
    number: '03',
    title: 'Misinformation has a cost',
    body: 'Viral "EVM hacking" videos exploit technical illiteracy. Understanding how systems actually work is the only reliable defence against engineered panic.',
    accent: '#34d399',
    accentBg: 'bg-cyber-emerald/10',
    accentBorder: 'border-l-cyber-emerald',
    accentText: 'text-cyber-emerald',
    glow: 'rgba(52,211,153,0.15)',
  },
];

const TakeawayCard = ({ item, index }) => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-60px' });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 24, filter: 'blur(4px)' }}
      animate={inView ? { opacity: 1, y: 0, filter: 'blur(0px)' } : {}}
      transition={{ duration: 0.55, ease: EASE_OUT, delay: index * 0.09 }}
      className={`relative bg-bg-1 border border-white/8 border-l-[3px] ${item.accentBorder} rounded-2xl p-6 group`}
      whileHover={{
        boxShadow: `0 8px 32px rgba(0,0,0,0.5), 0 0 24px ${item.glow}`,
        y: -2,
        transition: { duration: 0.2, ease: EASE_OUT },
      }}
    >
      {/* Number */}
      <span
        className="block font-mono text-xs font-bold uppercase tracking-widest mb-4 opacity-50"
        style={{ color: item.accent }}
      >
        {item.number}
      </span>

      {/* Title */}
      <h3 className="text-white font-semibold text-lg mb-3 leading-snug">
        {item.title}
      </h3>

      {/* Body */}
      <p className="text-gray-400 text-sm leading-relaxed">{item.body}</p>
    </motion.div>
  );
};

const VerdictSection = () => {
  const headerRef = useRef(null);
  const headerInView = useInView(headerRef, { once: true, margin: '-80px' });
  const quoteRef = useRef(null);
  const quoteInView = useInView(quoteRef, { once: true, margin: '-60px' });

  return (
    <section
      id="verdict"
      className="relative py-28 bg-gradient-to-b from-bg-0 to-bg-1 overflow-hidden"
    >
      {/* Ambient gradient */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-br from-cyber-cyan/3 via-transparent to-cyber-violet/3 pointer-events-none"
        animate={{ opacity: [0.5, 0.8, 0.5] }}
        transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
      />

      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div ref={headerRef} className="text-center mb-14 max-w-2xl mx-auto">
          <motion.span
            className="inline-block px-4 py-1.5 bg-cyber-emerald/10 border border-cyber-emerald/20 rounded-full text-xs font-semibold uppercase tracking-widest text-cyber-emerald mb-6"
            initial={{ opacity: 0, scale: 0.92, filter: 'blur(4px)' }}
            animate={headerInView ? { opacity: 1, scale: 1, filter: 'blur(0px)' } : {}}
            transition={{ duration: 0.5, ease: EASE_OUT }}
          >
            The Verdict
          </motion.span>

          <motion.h2
            className="font-display text-4xl md:text-5xl font-extrabold text-white mb-5 tracking-tight"
            initial={{ opacity: 0, y: 20, filter: 'blur(4px)' }}
            animate={headerInView ? { opacity: 1, y: 0, filter: 'blur(0px)' } : {}}
            transition={{ duration: 0.55, ease: EASE_OUT, delay: 0.06 }}
            style={{ textWrap: 'balance' }}
          >
            3 things to take{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyber-emerald to-cyber-cyan">
              away
            </span>
          </motion.h2>

          <motion.p
            className="text-gray-400 text-lg leading-relaxed"
            initial={{ opacity: 0, y: 20, filter: 'blur(4px)' }}
            animate={headerInView ? { opacity: 1, y: 0, filter: 'blur(0px)' } : {}}
            transition={{ duration: 0.55, ease: EASE_OUT, delay: 0.12 }}
            style={{ textWrap: 'pretty' }}
          >
            You've seen inside the machine, walked through every vote, and survived Hacker Mode.
            Here's what it all means.
          </motion.p>
        </div>

        {/* Takeaway cards */}
        <div className="grid md:grid-cols-3 gap-4 lg:gap-5 mb-14">
          {takeaways.map((item, i) => (
            <TakeawayCard key={item.number} item={item} index={i} />
          ))}
        </div>

        {/* Shareable quote */}
        <motion.div
          ref={quoteRef}
          className="relative bg-gradient-to-br from-bg-1 to-bg-2 border border-white/8 rounded-3xl p-8 md:p-12 text-center overflow-hidden"
          initial={{ opacity: 0, y: 30, filter: 'blur(4px)' }}
          animate={quoteInView ? { opacity: 1, y: 0, filter: 'blur(0px)' } : {}}
          transition={{ duration: 0.6, ease: EASE_OUT }}
        >
          {/* Decorative quote mark */}
          <div
            className="absolute top-6 left-8 text-8xl font-serif leading-none select-none pointer-events-none"
            style={{ color: 'rgba(34,211,238,0.08)' }}
          >
            "
          </div>
          <div
            className="absolute bottom-4 right-8 text-8xl font-serif leading-none select-none pointer-events-none rotate-180"
            style={{ color: 'rgba(167,139,250,0.08)' }}
          >
            "
          </div>

          <blockquote className="relative z-10 max-w-2xl mx-auto">
            <p className="text-xl md:text-2xl font-semibold text-white leading-snug mb-6" style={{ textWrap: 'balance' }}>
              "The EVM doesn't run Python. It doesn't have WiFi. The only{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyber-cyan to-cyber-violet">
                hack
              </span>{' '}
              here is the misinformation."
            </p>
            <cite className="text-sm text-gray-500 not-italic">
              — EVM Reality Check · Interactive Educational Experience
            </cite>
          </blockquote>

          {/* Accent lines */}
          <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-cyber-cyan/30 to-transparent" />
        </motion.div>

        {/* CTA row */}
        <motion.div
          className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-10"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, ease: EASE_OUT, delay: 0.2 }}
        >
          <motion.a
            href="#inside-machine"
            onClick={(e) => {
              e.preventDefault();
              document.querySelector('#inside-machine')?.scrollIntoView({ behavior: 'smooth' });
            }}
            className="inline-flex items-center gap-2 px-6 py-3 bg-cyber-cyan/10 border border-cyber-cyan/20 text-cyber-cyan text-sm font-semibold rounded-xl hover:bg-cyber-cyan/15 transition-colors duration-200"
            whileTap={{ scale: 0.96, transition: { duration: 0.1 } }}
          >
            Explore Inside The Machine ↑
          </motion.a>

          <motion.a
            href="#hacker-mode"
            onClick={(e) => {
              e.preventDefault();
              document.querySelector('#hacker-mode')?.scrollIntoView({ behavior: 'smooth' });
            }}
            className="inline-flex items-center gap-2 px-6 py-3 bg-cyber-violet/10 border border-cyber-violet/20 text-cyber-violet text-sm font-semibold rounded-xl hover:bg-cyber-violet/15 transition-colors duration-200"
            whileTap={{ scale: 0.96, transition: { duration: 0.1 } }}
          >
            Try Hacker Mode ↑
          </motion.a>
        </motion.div>
      </div>
    </section>
  );
};

export default VerdictSection;
