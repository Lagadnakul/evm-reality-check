import { motion } from 'framer-motion';

const SectionHeader = ({ label, title, description, centered = true }) => {
  return (
    <div className={`mb-16 ${centered ? 'text-center' : ''}`}>
      {label && (
        <motion.span
          className="inline-block px-4 py-1.5 text-sm font-medium tracking-wide text-primary-700 bg-primary-50 rounded-full border border-primary-200 mb-4"
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4 }}
        >
          {label}
        </motion.span>
      )}

      <motion.h2
        className="text-3xl md:text-4xl lg:text-5xl font-bold text-surface-900 mb-4 leading-tight"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 0.1 }}
      >
        {title}
      </motion.h2>

      {description && (
        <motion.p
          className="text-lg text-surface-600 max-w-3xl mx-auto leading-relaxed"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          {description}
        </motion.p>
      )}
    </div>
  );
};

export default SectionHeader;
