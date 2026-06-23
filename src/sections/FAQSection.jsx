import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Minus } from 'lucide-react';
import { faqs } from '../constants/myths';

const ease = [0.22, 1, 0.36, 1];

const FAQSection = () => {
  const [openIndex, setOpenIndex] = useState(null);
  const toggle = (i) => setOpenIndex(prev => (prev === i ? null : i));

  return (
    <section id="faq" className="py-20 lg:py-28 bg-canvas">
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
            Frequently Asked Questions
          </h2>
          <p className="text-muted max-w-[48ch]">
            Answers to the most common questions about Electronic Voting Machines.
          </p>
        </motion.div>

        <div className="border-t border-rule">
          {faqs.map((faq, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true, margin: '-20px' }}
              transition={{ duration: 0.4, delay: index * 0.04 }}
              className="border-b border-rule"
            >
              <button
                onClick={() => toggle(index)}
                className="w-full flex items-start justify-between py-5 text-left gap-4 group"
              >
                <span className="font-medium text-ink text-[0.9375rem] leading-snug group-hover:text-ink/80 transition-colors pr-2">
                  {faq.question}
                </span>
                <span className="text-muted group-hover:text-ink transition-colors flex-shrink-0 mt-0.5">
                  {openIndex === index ? <Minus className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
                </span>
              </button>

              <AnimatePresence>
                {openIndex === index && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.28, ease }}
                    className="overflow-hidden"
                  >
                    <p className="pb-6 text-muted leading-relaxed text-sm max-w-[58ch]">
                      {faq.answer}
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FAQSection;
