import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, Check, X } from 'lucide-react';
import { myths } from '../constants/myths';

const ease = [0.22, 1, 0.36, 1];

const MythRealitySection = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const currentMyth = myths[currentIndex];

  const handleNext = () => { if (currentIndex < myths.length - 1) setCurrentIndex(p => p + 1); };
  const handlePrev = () => { if (currentIndex > 0) setCurrentIndex(p => p - 1); };

  return (
    <section id="myth-reality" className="py-20 lg:py-28 bg-canvas">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          className="mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease }}
        >
          <h2 className="font-display text-4xl md:text-5xl font-bold text-ink leading-tight mb-4"
            style={{ letterSpacing: '-0.02em', textWrap: 'balance' }}>
            4 Claims. 4 Realities.
          </h2>
          <p className="text-muted max-w-[52ch]">
            The most common myths about EVMs — addressed with technical fact.
          </p>
        </motion.div>

        {/* Progress indicators */}
        <div className="flex items-center gap-2 mb-8">
          {myths.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrentIndex(i)}
              className={`h-px transition-all duration-300 ${
                i === currentIndex ? 'bg-signal w-8' : 'bg-rule w-4 hover:bg-muted/40'
              }`}
              aria-label={`Myth ${i + 1}`}
            />
          ))}
        </div>

        {/* Myth card */}
        <AnimatePresence mode="wait">
          <motion.div
            key={currentMyth.id}
            initial={{ opacity: 0, x: 10 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -10 }}
            transition={{ duration: 0.3, ease }}
            className="bg-panel border border-rule rounded-xl overflow-hidden"
          >
            {/* Myth header */}
            <div className="px-7 py-6 border-b border-rule">
              <div className="flex items-center gap-2.5 mb-4">
                <span className="inline-flex items-center gap-1.5 text-xs font-mono text-amber/90 border border-amber/25 px-2.5 py-1 rounded">
                  <X className="w-3 h-3" />
                  MYTH
                </span>
                <span className="text-xs text-muted/60 font-mono">{currentMyth.tag}</span>
              </div>
              <blockquote className="font-display text-xl md:text-2xl font-bold italic text-ink leading-snug" style={{ textWrap: 'balance' }}>
                &ldquo;{currentMyth.myth}&rdquo;
              </blockquote>
            </div>

            {/* Reality */}
            <div className="px-7 py-6">
              <div className="flex items-center gap-2.5 mb-4">
                <span className="inline-flex items-center gap-1.5 text-xs font-mono text-signal border border-signal/25 px-2.5 py-1 rounded">
                  <Check className="w-3 h-3" />
                  REALITY
                </span>
              </div>
              <p className="text-ink/85 leading-relaxed mb-6 max-w-[60ch] text-[0.9375rem]">
                {currentMyth.reality}
              </p>
              <ul className="grid sm:grid-cols-2 gap-3">
                {currentMyth.facts.map((fact, i) => (
                  <li key={i} className="flex items-start gap-2.5 text-sm text-muted">
                    <span className="text-signal mt-0.5 flex-shrink-0 font-mono">—</span>
                    {fact}
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Navigation */}
        <div className="flex items-center justify-between mt-5">
          <button
            onClick={handlePrev}
            disabled={currentIndex === 0}
            className="inline-flex items-center gap-2 px-4 py-2.5 border border-rule text-muted text-sm rounded-lg hover:border-muted/40 hover:text-ink transition-colors disabled:opacity-25 disabled:cursor-not-allowed"
          >
            <ChevronLeft className="w-4 h-4" />
            Previous
          </button>
          <span className="font-mono text-xs text-muted/60">{currentIndex + 1} / {myths.length}</span>
          <button
            onClick={handleNext}
            disabled={currentIndex === myths.length - 1}
            className="inline-flex items-center gap-2 px-4 py-2.5 border border-rule text-muted text-sm rounded-lg hover:border-muted/40 hover:text-ink transition-colors disabled:opacity-25 disabled:cursor-not-allowed"
          >
            Next
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </section>
  );
};

export default MythRealitySection;
