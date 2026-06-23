import React, { useState } from 'react';
import { motion } from 'framer-motion';

const PremiumFooter = () => {
  const [showDetails, setShowDetails] = useState(false);

  const footerVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }
    }
  };

  const linkVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      transition: { delay: 0.3 + i * 0.1, duration: 0.5 }
    })
  };

  return (
    <motion.footer
      className="relative w-full py-16 bg-gradient-to-br from-[#0a0a0f] via-[#0d0d15] to-[#08080c] border-t border-white/5"
      variants={footerVariants}
      initial="hidden"
      animate="visible"
    >
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden -z-10">
        <div className="absolute inset-0 cyber-grid opacity-10" />

        {/* Animated gradient orbs */}
        <motion.div
          className="absolute bottom-0 left-1/4 w-72 h-72 bg-purple-600/10 rounded-full blur-3xl"
          animate={{
            x: [0, 50, 0],
            y: [0, -30, 0],
            opacity: [0.1, 0.2, 0.1]
          }}
          transition={{ duration: 8, ease: 'easeInOut', repeat: Infinity, repeatType: 'loop' }}
        />

        <motion.div
          className="absolute bottom-0 right-1/4 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl"
          animate={{
            x: [0, -40, 0],
            y: [0, 40, 0],
            opacity: [0.05, 0.15, 0.05]
          }}
          transition={{ duration: 10, ease: 'easeInOut', repeat: Infinity, repeatType: 'loop' }}
        />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Footer Content */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.6 }}
        >
          {/* Brand Column */}
          <motion.div
            className="space-y-6"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3, duration: 0.5 }}
          >
            <motion.div
              className="flex items-center gap-3"
              whileHover={{ scale: 1.02 }}
            >
              <motion.div
                className="w-10 h-10 rounded-xl bg-gradient-to-br from-cyan-500/20 to-purple-500/20 flex items-center justify-center border border-cyan-500/20"
                whileHover={{ scale: 1.05, rotate: [0, 5, -5, 0] }}
              >
                <motion.span
                  className="text-lg font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-400"
                  whileHover={{ scale: 1.1 }}
                >
                  EVM
                </motion.span>
              </motion.div>
              <motion.div
                className="flex flex-col"
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4 }}
              >
                <motion.h3
                  className="text-xl font-bold text-white"
                  whileHover={{ color: 'rgba(168, 85, 247, 1)' }}
                >
                  Reality Check
                </motion.h3>
                <motion.p
                  className="text-xs text-gray-500 font-mono tracking-wider"
                  whileHover={{ color: 'rgba(255, 255, 255, 0.8)' }}
                >
                  Interactive Educational Experience
                </motion.p>
              </motion.div>
            </motion.div>

            <motion.p
              className="text-gray-400 text-sm leading-relaxed"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
            >
              An interactive educational platform designed to help users understand the
              complexities of electronic voting systems through hands-on exploration and
              visualization.
            </motion.p>

            {/* Build Badge */}
            <motion.div
              className="inline-flex items-center gap-2 px-4 py-2 bg-white/5 backdrop-blur-md rounded-full text-xs font-medium text-cyan-300 border border-cyan-500/20"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.6 }}
              whileHover={{ scale: 1.02 }}
            >
              <motion.span
                className="w-2 h-2 bg-cyan-400 rounded-full"
                animate={{ boxShadow: ['0 0 5px rgba(6, 182, 212, 0.5)', '0 0 15px rgba(6, 182, 212, 0.8)'] }}
                transition={{ duration: 1, repeat: Infinity }}
              />
              <span>Build #001 - Nakul Lagad</span>
            </motion.div>
          </motion.div>

          {/* Quick Links Column */}
          <motion.div
            className="space-y-6"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4, duration: 0.5 }}
          >
            <motion.h4
              className="text-lg font-semibold text-white"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
            >
              Quick Links
            </motion.h4>
            <motion.div
              className="w-12 h-0.5 bg-gradient-to-r from-cyan-500/40 to-purple-500/40"
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ delay: 0.6, duration: 0.4 }}
            />
            <motion.ul
              className="space-y-3"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.7 }}
            >
              {[
                { name: 'Home', href: '#', icon: '🏠' },
                { name: 'Voting Demo', href: '#voting-demo', icon: '🗳️' },
                { name: 'Inside The Machine', href: '#inside-machine', icon: '🔧' },
                { name: 'Myth vs Reality', href: '#myth-reality', icon: '📚' },
                { name: 'Hacker Mode', href: '#hacker-mode', icon: '💻' },
                { name: 'Author', href: '#author', icon: '👤' }
              ].map((link, index) => (
                <motion.li
                  key={index}
                  className="flex items-center gap-3"
                  custom={index}
                  variants={linkVariants}
                  initial="hidden"
                  animate="visible"
                  whileHover={{ x: 5 }}
                >
                  <motion.a
                    href={link.href}
                    className="flex items-center gap-3 text-gray-300 hover:text-white transition-all duration-300 group"
                    onClick={(e) => {
                      e.preventDefault();
                      const element = document.querySelector(link.href);
                      if (element) {
                        element.scrollIntoView({ behavior: 'smooth', block: 'start' });
                      }
                    }}
                  >
                    <motion.span
                      className="text-lg group-hover:scale-110 transition-transform duration-300"
                      whileHover={{ rotate: [0, 10, -10, 0] }}
                    >
                      {link.icon}
                    </motion.span>
                    <span className="font-medium">{link.name}</span>
                  </motion.a>
                </motion.li>
              ))}
            </motion.ul>
          </motion.div>

          {/* Features Column */}
          <motion.div
            className="space-y-6"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.5, duration: 0.5 }}
          >
            <motion.h4
              className="text-lg font-semibold text-white"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
            >
              Features
            </motion.h4>
            <motion.div
              className="w-12 h-0.5 bg-gradient-to-r from-cyan-500/40 to-purple-500/40"
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ delay: 0.7, duration: 0.4 }}
            />
            <motion.ul
              className="space-y-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8 }}
            >
              {[
                { name: 'Interactive System Diagram', desc: 'Explore machine anatomy with clickable modules' },
                { name: 'Vote Journey Visualization', desc: 'Follow the complete voting process flow' },
                { name: 'Security Layers', desc: 'Understand multi-layered protection' },
                { name: 'Technology Comparison', desc: 'Check assumptions vs realities' },
                { name: 'Hacker Mode', desc: 'Test the 3 syntax error theory' },
                { name: 'Downloadable Certificate', desc: 'Get your achievement certificate' }
              ].map((feature, index) => (
                <motion.li
                  key={index}
                  className="group"
                  custom={index}
                  variants={linkVariants}
                  initial="hidden"
                  animate="visible"
                >
                  <motion.div
                    className="flex flex-col gap-1"
                    whileHover={{ x: 5 }}
                  >
                    <motion.span
                      className="text-sm font-medium text-gray-300 group-hover:text-white transition-all duration-300"
                      whileHover={{ color: 'rgba(168, 85, 247, 1)' }}
                    >
                      {feature.name}
                    </motion.span>
                    <motion.span
                      className="text-xs text-gray-500 group-hover:text-gray-300 transition-all duration-300"
                      whileHover={{ color: 'rgba(255, 255, 255, 0.6)' }}
                    >
                      {feature.desc}
                    </motion.span>
                  </motion.div>
                </motion.li>
              ))}
            </motion.ul>
          </motion.div>

          {/* Connect Column */}
          <motion.div
            className="space-y-6"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.6, duration: 0.5 }}
          >
            <motion.h4
              className="text-lg font-semibold text-white"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.7 }}
            >
              Connect
            </motion.h4>
            <motion.div
              className="w-12 h-0.5 bg-gradient-to-r from-cyan-500/40 to-purple-500/40"
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ delay: 0.8, duration: 0.4 }}
            />
            <motion.ul
              className="space-y-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.9 }}
            >
              {[
                { name: 'GitHub', icon: '💻', action: 'View source code' },
                { name: 'Portfolio', icon: '🌐', action: 'Explore more projects' },
                { name: 'Contact', icon: '✉️', action: 'Get in touch' }
              ].map((social, index) => (
                <motion.li
                  key={index}
                  className="group"
                  custom={index}
                  variants={linkVariants}
                  initial="hidden"
                  animate="visible"
                >
                  <motion.button
                    className="w-full flex items-center gap-4 px-4 py-3 rounded-xl bg-white/5 backdrop-blur-md border border-white/10 hover:bg-white/10 transition-all duration-300 group"
                    whileHover={{ scale: 1.01, x: 3 }}
                    whileTap={{ scale: 0.99 }}
                  >
                    <motion.span
                      className="text-2xl group-hover:scale-110 transition-transform duration-300"
                      whileHover={{ rotate: [0, 10, -10, 0] }}
                    >
                      {social.icon}
                    </motion.span>
                    <motion.div
                      className="flex flex-col items-start"
                      whileHover={{ x: 2 }}
                    >
                      <motion.span
                        className="text-sm font-medium text-white group-hover:text-cyan-300 transition-all duration-300"
                        whileHover={{ color: 'rgba(6, 182, 212, 1)' }}
                      >
                        {social.name}
                      </motion.span>
                      <motion.span
                        className="text-xs text-gray-500 group-hover:text-gray-300 transition-all duration-300"
                        whileHover={{ color: 'rgba(255, 255, 255, 0.6)' }}
                      >
                        {social.action}
                      </motion.span>
                    </motion.div>
                    <motion.span
                      className="ml-auto text-gray-500 group-hover:text-white transition-all duration-300"
                      whileHover={{ x: 2 }}
                    >
                      →
                    </motion.span>
                  </motion.button>
                </motion.li>
              ))}
            </motion.ul>
          </motion.div>
        </motion.div>

        {/* Footer Bottom */}
        <motion.div
          className="mt-12 pt-8 border-t border-white/5"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1, duration: 0.5 }}
        >
          <motion.div
            className="flex flex-col md:flex-row justify-between items-center gap-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.1 }}
          >
            {/* Copyright */}
            <motion.div
              className="text-center md:text-left"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.2 }}
            >
              <motion.p
                className="text-sm text-gray-400"
                whileHover={{ color: 'rgba(255, 255, 255, 0.8)' }}
              >
                © 2026 EVM Reality Check. All rights reserved.
              </motion.p>
              <motion.p
                className="text-xs text-gray-500 mt-1 font-mono"
                whileHover={{ color: 'rgba(255, 255, 255, 0.6)' }}
              >
                Educational concept visualization. Not an exact replica of any real system.
              </motion.p>
            </motion.div>

            {/* Legal Links */}
            <motion.div
              className="flex gap-6"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.3 }}
            >
              {['Privacy', 'Terms', 'Cookies'].map((link, index) => (
                <motion.a
                  key={index}
                  href="#"
                  className="text-sm text-gray-400 hover:text-white transition-all duration-300 font-medium"
                  whileHover={{ color: 'rgba(168, 85, 247, 1)' }}
                  onClick={(e) => e.preventDefault()}
                >
                  {link}
                </motion.a>
              ))}
            </motion.div>

            {/* Version */}
            <motion.div
              className="text-center md:text-right"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.4 }}
            >
              <motion.p
                className="text-xs text-gray-500 font-mono"
                whileHover={{ color: 'rgba(255, 255, 255, 0.8)' }}
              >
                Version 2.0.0 - Premium Edition
              </motion.p>
            </motion.div>
          </motion.div>

          {/* Toggle Details */}
          <motion.button
            onClick={() => setShowDetails(!showDetails)}
            className="mt-8 w-full flex items-center justify-center gap-3 px-6 py-3 bg-white/5 backdrop-blur-md rounded-xl border border-white/10 hover:bg-white/10 transition-all duration-300"
            whileHover={{ scale: 1.01 }}
            whileTap={{ scale: 0.99 }}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.5 }}
          >
            <motion.span
              className="text-lg"
              animate={{ rotate: showDetails ? 180 : 0 }}
              transition={{ duration: 0.3 }}
            >
              {showDetails ? '▲' : '▼'}
            </motion.span>
            <span className="text-sm font-medium text-white">
              {showDetails ? 'Hide Technical Details' : 'Show Technical Details'}
            </span>
          </motion.button>

          {/* Technical Details */}
          {showDetails && (
            <motion.div
              className="mt-6 p-6 rounded-xl bg-white/5 backdrop-blur-md border border-white/10"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              transition={{ delay: 0.2, duration: 0.4 }}
            >
              <motion.div
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
              >
                {[
                  { label: 'Framework', value: 'React 18' },
                  { label: 'Styling', value: 'Tailwind CSS' },
                  { label: 'Animations', value: 'Framer Motion' },
                  { label: 'Build Tool', value: 'Vite' },
                  { label: 'Language', value: 'JavaScript (ES6+)' },
                  { label: 'Responsive', value: 'Mobile-First Design' }
                ].map((detail, index) => (
                  <motion.div
                    key={index}
                    className="flex flex-col"
                    custom={index}
                    variants={linkVariants}
                    initial="hidden"
                    animate="visible"
                  >
                    <motion.span
                      className="text-xs text-gray-500 font-mono"
                      whileHover={{ color: 'rgba(255, 255, 255, 0.8)' }}
                    >
                      {detail.label}
                    </motion.span>
                    <motion.span
                      className="text-sm font-medium text-white"
                      whileHover={{ color: 'rgba(168, 85, 247, 1)' }}
                    >
                      {detail.value}
                    </motion.span>
                  </motion.div>
                ))}
              </motion.div>
            </motion.div>
          )}
        </motion.div>
      </div>

      {/* Decorative Elements */}
      <motion.div
        className="absolute bottom-0 left-8 w-32 h-1 bg-gradient-to-r from-purple-500/0 via-purple-500/40 to-transparent"
        animate={{ opacity: [0.3, 0.7, 0.3] }}
        transition={{ duration: 3, repeat: Infinity }}
      />
      <motion.div
        className="absolute bottom-0 right-8 w-32 h-1 bg-gradient-to-l from-cyan-500/0 via-cyan-500/40 to-transparent"
        animate={{ opacity: [0.3, 0.7, 0.3] }}
        transition={{ duration: 3, repeat: Infinity, delay: 1 }}
      />
    </motion.footer>
  );
};

export default PremiumFooter;
