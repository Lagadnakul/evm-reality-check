import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import html2canvas from 'html2canvas';

// Certificate Component
const Certificate = ({ onClose }) => {
  const certificateRef = useRef(null);
  const [isDownloading, setIsDownloading] = useState(false);

  const handleDownload = async () => {
    if (!certificateRef.current) return;

    setIsDownloading(true);

    try {
      const canvas = await html2canvas(certificateRef.current, {
        scale: 2,
        backgroundColor: '#0a0a0f',
        logging: false,
        useCORS: true
      });

      const link = document.createElement('a');
      link.download = 'Certified_3_Syntax_Error_Hacker.png';
      link.href = canvas.toDataURL('image/png');
      link.click();

      await new Promise(resolve => setTimeout(resolve, 500));
    } catch (error) {
      console.error('Error downloading certificate:', error);
    } finally {
      setIsDownloading(false);
    }
  };

  return (
    <motion.div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-xl"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
    >
      <motion.div
        className="relative w-full max-w-2xl mx-4"
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        transition={{ duration: 0.4, ease: 'easeOut' }}
      >
        {/* Certificate Card */}
        <div
          ref={certificateRef}
          className="relative bg-gradient-to-br from-[#0a0a0f] via-[#0d0d15] to-[#11111a] rounded-3xl p-8 border border-cyan-500/20 shadow-3xl"
          style={{
            boxShadow: '0 0 60px rgba(6, 182, 212, 0.2), 0 0 100px rgba(168, 85, 247, 0.1)'
          }}
        >
          {/* Certificate Border */}
          <motion.div
            className="absolute inset-0 rounded-3xl border-2"
            style={{ borderColor: 'rgba(255, 255, 255, 0.1)' }}
            animate={{
              borderColor: [
                'rgba(6, 182, 212, 0.3)',
                'rgba(168, 85, 247, 0.3)',
                'rgba(6, 182, 212, 0.3)'
              ]
            }}
            transition={{ duration: 4, repeat: Infinity }}
          />

          {/* Certificate Header */}
          <motion.div
            className="text-center mb-8"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.6 }}
          >
            <motion.h2
              className="text-2xl md:text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-white to-purple-400"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2, duration: 0.6 }}
            >
              CERTIFICATE OF ACHIEVEMENT
            </motion.h2>
            <motion.div
              className="w-24 h-0.5 bg-gradient-to-r from-cyan-500/40 to-purple-500/40 mx-auto mt-4"
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ delay: 0.3, duration: 0.6 }}
            />
          </motion.div>

          {/* Certificate Body */}
          <motion.div
            className="text-center space-y-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.6 }}
          >
            <motion.p
              className="text-lg text-cyan-300/80"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
            >
              This certificate is awarded to
            </motion.p>

            <motion.div
              className="relative inline-block"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.6, duration: 0.6 }}
            >
              <span className="text-3xl md:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-cyan-400 to-purple-400">
                Nakul Lagad
              </span>
              <motion.div
                className="absolute -bottom-2 left-0 right-0 h-1 bg-gradient-to-r from-purple-500/40 to-cyan-500/40"
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ delay: 0.8, duration: 0.6 }}
              />
            </motion.div>

            <motion.p
              className="text-gray-400"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.9 }}
            >
              For successfully completing the EVM Reality Check educational experience
              and demonstrating understanding of system security principles.
            </motion.p>

            <motion.div
              className="pt-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1 }}
            >
              <motion.div
                className="inline-block w-20 h-20 rounded-full bg-gradient-to-br from-purple-500/10 to-cyan-500/10 border border-cyan-500/20 flex items-center justify-center"
                whileHover={{ scale: 1.05, rotate: [0, 5, -5, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                <motion.span
                  className="text-3xl"
                  animate={{ rotate: [0, 10, -10, 0] }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  🏆
                </motion.span>
              </motion.div>
            </motion.div>
          </motion.div>

          {/* Certificate Footer */}
          <motion.div
            className="mt-8 pt-6 border-t border-white/10 text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.1, duration: 0.6 }}
          >
            <motion.div
              className="flex items-center justify-center gap-4 text-sm text-gray-400"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.2 }}
            >
              <span>EVM Reality Check</span>
              <motion.span
                className="text-cyan-300"
                animate={{ opacity: [0.5, 1, 0.5] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                •
              </motion.span>
              <span>Interactive Educational Experience</span>
            </motion.div>
            <motion.p
              className="text-xs text-gray-500 mt-2 font-mono"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.3 }}
            >
              BUILD #001 - NAKUL LAGAD
            </motion.p>
          </motion.div>

          {/* Corner Decorations */}
          <motion.div
            className="absolute -top-2 -left-2 w-6 h-6 border-l-2 border-t-2 border-cyan-500/40 rounded-br"
            animate={{ borderColor: ['rgba(6, 182, 212, 0.2)', 'rgba(168, 85, 247, 0.4)'] }}
            transition={{ duration: 3, repeat: Infinity }}
          />
          <motion.div
            className="absolute -top-2 -right-2 w-6 h-6 border-r-2 border-t-2 border-purple-500/40 rounded-bl"
            animate={{ borderColor: ['rgba(168, 85, 247, 0.2)', 'rgba(6, 182, 212, 0.4)'] }}
            transition={{ duration: 3, repeat: Infinity, delay: 0.5 }}
          />
          <motion.div
            className="absolute -bottom-2 -left-2 w-6 h-6 border-l-2 border-b-2 border-cyan-500/40 rounded-tr"
            animate={{ borderColor: ['rgba(6, 182, 212, 0.2)', 'rgba(168, 85, 247, 0.4)'] }}
            transition={{ duration: 3, repeat: Infinity, delay: 1 }}
          />
          <motion.div
            className="absolute -bottom-2 -right-2 w-6 h-6 border-r-2 border-b-2 border-purple-500/40 rounded-tl"
            animate={{ borderColor: ['rgba(168, 85, 247, 0.2)', 'rgba(6, 182, 212, 0.4)'] }}
            transition={{ duration: 3, repeat: Infinity, delay: 1.5 }}
          />
        </div>

        {/* Close Button */}
        <motion.button
          onClick={onClose}
          className="absolute -top-4 -right-4 w-10 h-10 rounded-full bg-gradient-to-br from-red-500 to-rose-500 flex items-center justify-center text-white shadow-xl hover:shadow-2xl transition-all duration-300"
          whileHover={{ scale: 1.05, rotate: 90 }}
          whileTap={{ scale: 0.95, rotate: 0 }}
        >
          <motion.span
            className="text-lg"
            animate={{ rotate: [0, 90, 180, 270] }}
            transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
          >
            ×
          </motion.span>
        </motion.button>

        {/* Download Button */}
        <motion.button
          onClick={handleDownload}
          disabled={isDownloading}
          className="absolute bottom-4 left-1/2 -translate-x-1/2 inline-flex items-center justify-center px-6 py-3 bg-gradient-to-r from-purple-600 to-cyan-500 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
          whileHover={{ scale: 1.02, y: -2 }}
          whileTap={{ scale: 0.98, y: 1 }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.4, duration: 0.5 }}
        >
          {isDownloading ? (
            <motion.div
              className="flex items-center gap-2"
              animate={{ opacity: [0.5, 1, 0.5] }}
              transition={{ duration: 0.5, repeat: Infinity }}
            >
              <motion.div
                className="w-4 h-4 border-2 border-white rounded-full"
                animate={{ rotate: 360 }}
                transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
              />
              <span>Downloading...</span>
            </motion.div>
          ) : (
            <>
              <span>Download Certificate</span>
              <motion.span
                className="ml-2"
                animate={{ x: [0, 5, 0] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              >
                ↓
              </motion.span>
            </>
          )}
        </motion.button>
      </motion.div>
    </motion.div>
  );
};

// Author Card Component
const AuthorCard = () => {
  const [showCertificate, setShowCertificate] = useState(false);

  const authorVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }
    }
  };

  const statVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      transition: { delay: 0.3 + i * 0.1, duration: 0.5 }
    })
  };

  return (
    <section className="relative w-full py-24 bg-gradient-to-br from-[#0a0a0f] via-[#0d0d15] to-[#11111a]">
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden -z-10">
        <div className="absolute inset-0 cyber-grid opacity-20" />

        {/* Floating particles */}
        {Array.from({ length: 20 }).map((_, i) => {
          const left = Math.random() * 100;
          const delay = Math.random() * 5;
          const duration = 5 + Math.random() * 10;
          const size = Math.random() * 2 + 0.5;

          return (
            <motion.div
              key={i}
              className="absolute rounded-full bg-cyan-400/10"
              style={{
                left: `${left}%`,
                top: '-10px',
                width: `${size}px`,
                height: `${size}px`
              }}
              animate={{
                y: ['0%', '110%'],
                opacity: [0, 0.3, 0]
              }}
              transition={{
                duration,
                delay,
                repeat: Infinity,
                ease: 'linear'
              }}
            />
          );
        })}
      </div>

      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          className="text-center mb-12"
          variants={authorVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.span
            className="inline-block px-4 py-1.5 bg-white/5 backdrop-blur-md rounded-full text-sm font-medium text-purple-300 border border-purple-500/20 mb-6"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
          >
            About the Creator
          </motion.span>
          <motion.h2
            className="text-4xl md:text-5xl font-bold text-white"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.6 }}
          >
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-white to-cyan-400">
              Author Profile
            </span>
          </motion.h2>
          <motion.p
            className="text-lg text-gray-400 mt-4 max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.6 }}
          >
            Meet the mind behind this interactive educational experience
          </motion.p>
        </motion.div>

        {/* Author Card */}
        <motion.div
          className="relative flex flex-col lg:flex-row items-center justify-center gap-8"
          variants={authorVariants}
          initial="hidden"
          animate="visible"
        >
          {/* Author Avatar */}
          <motion.div
            className="relative"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.5, duration: 0.6 }}
            whileHover={{ scale: 1.05, rotate: [0, 5, -5, 0] }}
          >
            <motion.div
              className="w-48 h-48 rounded-3xl bg-gradient-to-br from-purple-600/20 to-cyan-500/20 border border-cyan-500/20 shadow-2xl flex items-center justify-center relative overflow-hidden"
              style={{
                boxShadow: '0 0 40px rgba(6, 182, 212, 0.2), 0 0 60px rgba(168, 85, 247, 0.1)'
              }}
            >
              {/* Avatar Background */}
              <motion.div
                className="absolute inset-0 bg-gradient-to-br from-purple-500/10 to-cyan-500/10"
                animate={{ opacity: [0.5, 1, 0.5] }}
                transition={{ duration: 3, repeat: Infinity }}
              />

              {/* Avatar Initial */}
              <motion.div
                className="relative w-36 h-36 rounded-2xl bg-gradient-to-br from-purple-500/20 to-cyan-500/20 flex items-center justify-center border border-white/20"
                whileHover={{ scale: 1.02 }}
              >
                <motion.span
                  className="text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-white to-cyan-400"
                  whileHover={{ scale: 1.05 }}
                >
                  NL
                </motion.span>
              </motion.div>

              {/* Status Badge */}
              <motion.div
                className="absolute bottom-4 left-1/2 -translate-x-1/2 inline-flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-md rounded-full text-xs font-medium text-cyan-300 border border-cyan-500/20"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8, duration: 0.4 }}
                whileHover={{ scale: 1.05 }}
              >
                <motion.span
                  className="w-2 h-2 bg-green-400 rounded-full"
                  animate={{ boxShadow: ['0 0 5px rgba(16, 185, 129, 0.5)', '0 0 15px rgba(16, 185, 129, 0.8)'] }}
                  transition={{ duration: 1, repeat: Infinity }}
                />
                <span>Research Build #001</span>
              </motion.div>

              {/* Outer Ring */}
              <motion.div
                className="absolute inset-0 rounded-3xl ring-2"
                style={{ ringOffsetColor: '#0a0a0f' }}
                animate={{
                  ringColor: [
                    'rgba(168, 85, 247, 0.3)',
                    'rgba(6, 182, 212, 0.3)',
                    'rgba(168, 85, 247, 0.3)'
                  ]
                }}
                transition={{ duration: 4, repeat: Infinity }}
              />

              {/* Corner Accents */}
              <motion.div
                className="absolute -top-1 -left-1 w-4 h-4 border-l-2 border-t-2 border-cyan-500/40 rounded-br"
                animate={{ borderColor: ['rgba(6, 182, 212, 0.2)', 'rgba(168, 85, 247, 0.4)'] }}
                transition={{ duration: 3, repeat: Infinity }}
              />
              <motion.div
                className="absolute -bottom-1 -left-1 w-4 h-4 border-l-2 border-b-2 border-cyan-500/40 rounded-tr"
                animate={{ borderColor: ['rgba(6, 182, 212, 0.2)', 'rgba(168, 85, 247, 0.4)'] }}
                transition={{ duration: 3, repeat: Infinity, delay: 0.5 }}
              />
              <motion.div
                className="absolute -top-1 -right-1 w-4 h-4 border-r-2 border-t-2 border-purple-500/40 rounded-bl"
                animate={{ borderColor: ['rgba(168, 85, 247, 0.2)', 'rgba(6, 182, 212, 0.4)'] }}
                transition={{ duration: 3, repeat: Infinity, delay: 1 }}
              />
              <motion.div
                className="absolute -bottom-1 -right-1 w-4 h-4 border-r-2 border-b-2 border-purple-500/40 rounded-tl"
                animate={{ borderColor: ['rgba(168, 85, 247, 0.2)', 'rgba(6, 182, 212, 0.4)'] }}
                transition={{ duration: 3, repeat: Infinity, delay: 1.5 }}
              />
            </motion.div>
          </motion.div>

          {/* Author Info */}
          <motion.div
            className="flex-1 max-w-lg"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.6, duration: 0.6 }}
          >
            {/* Name */}
            <motion.div
              className="mb-4"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7, duration: 0.4 }}
            >
              <motion.h3
                className="text-3xl font-bold text-white"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.7, duration: 0.4 }}
              >
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-cyan-200">
                  Nakul Lagad
                </span>
              </motion.h3>
              <motion.p
                className="text-lg text-gray-400"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.8, duration: 0.4 }}
              >
                M.Tech AI & Data Science
Full Stack + AI Developer
              </motion.p>
            </motion.div>

            {/* Bio */}
            <motion.div
              className="mb-6"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.9, duration: 0.4 }}
            >
              <motion.p
                className="text-gray-300 leading-relaxed"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1, duration: 0.4 }}
              >
Built to simplify complex technical concepts through interactive educational experiences.
              </motion.p>
            </motion.div>


            {/* Action Buttons */}
            <motion.div
              className="flex gap-4 mt-8"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.4, duration: 0.4 }}
            >
              <motion.button
                onClick={() => setShowCertificate(true)}
                className="flex-1 inline-flex items-center justify-center px-6 py-3 bg-gradient-to-r from-purple-600 to-cyan-500 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 glassmorphism"
                whileHover={{ scale: 1.02, y: -2 }}
                whileTap={{ scale: 0.98, y: 1 }}
              >
                <span>Get Certificate</span>
                <motion.span
                  className="ml-2"
                  animate={{ x: [0, 5, 0] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                >
                  →
                </motion.span>
              </motion.button>

              <motion.button
                className="flex-1 inline-flex items-center justify-center px-6 py-3 bg-white/5 backdrop-blur-md rounded-xl border border-white/10 text-cyan-300 font-semibold hover:bg-white/10 transition-all duration-300 glassmorphism"
                whileHover={{ scale: 1.02, y: -2 }}
                whileTap={{ scale: 0.98, y: 1 }}
              >
                <motion.span
                  className="mr-2"
                  animate={{ rotate: [0, 10, -10, 0] }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  ⚡
                </motion.span>
                <span>View GitHub</span>
              </motion.button>
            </motion.div>
          </motion.div>
        </motion.div>

        {/* Certificate Modal */}
        <AnimatePresence>
          {showCertificate && (
            <Certificate onClose={() => setShowCertificate(false)} />
          )}
        </AnimatePresence>
      </div>

      {/* Decorative Elements */}
      <motion.div
        className="absolute bottom-8 left-8 w-32 h-1 bg-gradient-to-r from-purple-500/0 via-purple-500/40 to-transparent"
        animate={{ opacity: [0.3, 0.7, 0.3] }}
        transition={{ duration: 3, repeat: Infinity }}
      />
      <motion.div
        className="absolute bottom-8 right-8 w-32 h-1 bg-gradient-to-l from-cyan-500/0 via-cyan-500/40 to-transparent"
        animate={{ opacity: [0.3, 0.7, 0.3] }}
        transition={{ duration: 3, repeat: Infinity, delay: 1 }}
      />
    </section>
  );
};

export default AuthorCard;
