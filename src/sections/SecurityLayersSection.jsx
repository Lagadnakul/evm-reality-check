import { motion } from 'framer-motion';
import { securityLayers } from '../constants/myths';

const ease = [0.22, 1, 0.36, 1];

const SecurityLayersSection = () => {
  return (
    <section id="security" className="py-20 lg:py-28 bg-panel">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          className="mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease }}
        >
          <h2 className="font-display text-4xl md:text-5xl font-bold text-ink leading-tight mb-4"
            style={{ letterSpacing: '-0.02em', textWrap: 'balance' }}>
            EVM security is not a single switch.
          </h2>
          <p className="text-muted max-w-[56ch] leading-relaxed">
            It's a four-part system combining physical controls, verified software,
            transparent process, and independent audit — each layer checks the others.
          </p>
        </motion.div>

        <div className="border-t border-rule">
          {securityLayers.map((layer, index) => (
            <motion.div
              key={layer.title}
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.5, ease, delay: index * 0.06 }}
              className="grid sm:grid-cols-[3.5rem_1fr_1fr] gap-5 sm:gap-8 py-10 border-b border-rule"
            >
              <div className="font-mono text-sm text-signal/70 pt-0.5">0{index + 1}</div>

              <div>
                <h3 className="text-base font-semibold text-ink mb-2">{layer.title}</h3>
                <p className="text-muted text-sm leading-relaxed">{layer.description}</p>
              </div>

              <ul className="space-y-2.5 mt-0.5">
                {layer.points.map((point, i) => (
                  <li key={i} className="flex items-start gap-2.5 text-sm text-muted">
                    <span className="text-signal/60 font-mono mt-0.5 flex-shrink-0">—</span>
                    {point}
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SecurityLayersSection;
