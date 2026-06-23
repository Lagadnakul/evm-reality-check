import { motion } from 'framer-motion';
import { ArrowRight, PlayCircle } from 'lucide-react';

const ease = [0.22, 1, 0.36, 1];

const EVMDiagram = () => (
  <div className="font-mono text-xs text-muted select-none w-full max-w-sm">
    <div className="border border-rule rounded-xl p-5 mb-3 bg-panel/40">
      <div className="flex items-center gap-2 mb-5">
        <div className="w-1.5 h-1.5 bg-signal rounded-full animate-pulse-slow" />
        <span className="text-signal text-xs uppercase tracking-widest font-mono">Control Unit</span>
      </div>
      <div className="space-y-3">
        {['Sealed firmware', 'No network I/O', 'Checksum verified'].map((label) => (
          <div key={label} className="flex items-center gap-3">
            <div className="w-2.5 h-2.5 border border-signal/40 rounded-sm flex-shrink-0" />
            <div className="h-px bg-rule flex-1" />
            <span className="text-muted/70 text-xs">{label}</span>
          </div>
        ))}
      </div>
    </div>

    <div className="flex items-center gap-2 mb-3 px-1">
      <div className="flex-1 border-t border-dashed border-rule" />
      <span className="text-muted/50 text-xs">one-way serial</span>
      <ArrowRight className="w-3 h-3 text-rule" />
    </div>

    <div className="border border-rule rounded-xl p-5 bg-panel/40">
      <div className="flex items-center gap-2 mb-5">
        <div className="w-1.5 h-1.5 bg-amber rounded-full" />
        <span className="text-amber text-xs uppercase tracking-widest font-mono">Ballot Unit</span>
      </div>
      <div className="grid grid-cols-2 gap-2">
        {['A', 'B', 'C', 'D'].map((l) => (
          <div key={l} className="border border-rule rounded-lg px-3 py-2 flex items-center gap-2 bg-lift/30">
            <div className="w-2.5 h-2.5 rounded-full border border-rule flex-shrink-0" />
            <span className="text-muted/70 text-xs">Candidate {l}</span>
          </div>
        ))}
      </div>
    </div>

    <div className="flex items-center gap-2 my-3 px-1">
      <div className="flex-1 border-t border-dashed border-rule" />
      <ArrowRight className="w-3 h-3 text-rule" />
    </div>

    <div className="border border-rule/60 rounded-xl p-4 bg-panel/20 flex items-center gap-3">
      <div className="w-1.5 h-1.5 bg-signal rounded-full flex-shrink-0" />
      <span className="text-muted/60 text-xs uppercase tracking-widest">VVPAT — paper audit trail</span>
    </div>
  </div>
);

const HeroSection = () => {
  const scrollToDemo = () => {
    const el = document.getElementById('voting-demo');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };
  const scrollToFacts = () => {
    const el = document.getElementById('myth-reality');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="relative min-h-screen flex items-center bg-canvas overflow-hidden">
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-28 lg:py-36">
        <div className="grid lg:grid-cols-[1fr_400px] gap-16 lg:gap-24 items-center">

          {/* Left: Editorial copy */}
          <div>
            <motion.h1
              className="font-display text-5xl md:text-6xl lg:text-[4.25rem] font-bold text-ink leading-[1.05] mb-6"
              style={{ letterSpacing: '-0.02em', textWrap: 'balance' }}
              initial={{ opacity: 0, y: 28 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease }}
            >
              Every Vote Counts.{' '}
              <em className="not-italic font-normal text-muted">
                So Does Every Fact.
              </em>
            </motion.h1>

            <motion.p
              className="text-lg text-muted leading-relaxed mb-8 max-w-[54ch]"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease, delay: 0.1 }}
            >
              India's Electronic Voting Machines have been called everything from
              tamper-proof to rigged. Here's the technical reality — from how
              they're built to how they're verified.
            </motion.p>

            <motion.div
              className="flex flex-col sm:flex-row gap-3 mb-10"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease, delay: 0.2 }}
            >
              <button
                onClick={scrollToDemo}
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-ink text-canvas text-sm font-semibold rounded-lg hover:bg-ink/90 transition-colors"
              >
                <PlayCircle className="w-4 h-4" />
                Try the Demo
              </button>
              <button
                onClick={scrollToFacts}
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 border border-rule text-ink text-sm font-medium rounded-lg hover:bg-panel transition-colors"
              >
                Read the Facts
                <ArrowRight className="w-4 h-4" />
              </button>
            </motion.div>

            <motion.p
              className="text-sm text-muted/70 border-l-2 border-signal pl-4 leading-relaxed"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.38 }}
            >
              970 million votes across 1 million polling stations —
              all offline, all independently verified.
              The world's largest democratic exercise.
            </motion.p>
          </div>

          {/* Right: EVM diagram */}
          <motion.div
            className="hidden lg:flex justify-center"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease, delay: 0.18 }}
          >
            <EVMDiagram />
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
