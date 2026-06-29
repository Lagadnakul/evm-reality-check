import { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import html2canvas from 'html2canvas';

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
    >
      <motion.div
        className="relative w-full max-w-2xl mx-4 flex flex-col gap-4"
        initial={{ scale: 0.92, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.92, opacity: 0 }}
      >
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute -top-4 -right-4 z-10 w-10 h-10 rounded-full bg-gradient-to-br from-red-500 to-rose-500 flex items-center justify-center text-white shadow-xl"
        >
          ×
        </button>

        {/* Certificate card (captured for download) */}
        <div
          ref={certificateRef}
          className="relative bg-gradient-to-br from-[#0a0a0f] via-[#0d0d15] to-[#11111a] rounded-3xl p-8 border border-cyan-500/20"
          style={{
            boxShadow: '0 0 60px rgba(6, 182, 212, 0.2), 0 0 100px rgba(168, 85, 247, 0.1)'
          }}
        >
          <div className="text-center mb-8">
            <h2 className="text-2xl md:text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-white to-purple-400">
              CERTIFICATE OF REALITY CHECK
            </h2>
            <div className="w-24 h-0.5 bg-gradient-to-r from-cyan-500/40 to-purple-500/40 mx-auto mt-4" />
          </div>

          <div className="text-center space-y-5">
            <p className="text-lg text-cyan-300/80">
              This certifies that the participant has completed
            </p>

            <div className="relative inline-block">
              <span className="text-3xl md:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-cyan-400 to-purple-400">
                3 Syntax Error Hacker Mode
              </span>
              <div className="absolute -bottom-2 left-0 right-0 h-1 bg-gradient-to-r from-purple-500/40 to-cyan-500/40" />
            </div>

            <p className="text-gray-400 max-w-xl mx-auto">
              Syntax errors fixed: 3 • Systems hacked: 0 • Reality verified successfully.
            </p>

            <div className="pt-4">
              <div className="inline-flex w-20 h-20 rounded-full bg-gradient-to-br from-purple-500/10 to-cyan-500/10 border border-cyan-500/20 items-center justify-center">
                <span className="text-3xl">🏆</span>
              </div>
            </div>
          </div>

          <div className="mt-8 pt-6 border-t border-white/10 text-center">
            <div className="flex items-center justify-center gap-4 text-sm text-gray-400">
              <span>EVM Reality Check</span>
              <span className="text-cyan-300">•</span>
              <span>Interactive Educational Experience</span>
            </div>
            <p className="text-xs text-gray-500 mt-2 font-mono">
              Designed & Developed by Nakul Lagad
            </p>
          </div>

          <div className="absolute -top-2 -left-2 w-6 h-6 border-l-2 border-t-2 border-cyan-500/40 rounded-br" />
          <div className="absolute -top-2 -right-2 w-6 h-6 border-r-2 border-t-2 border-purple-500/40 rounded-bl" />
          <div className="absolute -bottom-2 -left-2 w-6 h-6 border-l-2 border-b-2 border-cyan-500/40 rounded-tr" />
          <div className="absolute -bottom-2 -right-2 w-6 h-6 border-r-2 border-b-2 border-purple-500/40 rounded-tl" />
        </div>

        {/* Download button sits below the card, not overlapping it */}
        <button
          onClick={handleDownload}
          disabled={isDownloading}
          className="w-full inline-flex items-center justify-center px-6 py-3 bg-gradient-to-r from-purple-600 to-cyan-500 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 disabled:opacity-60"
        >
          {isDownloading ? 'Downloading...' : 'Download Certificate ↓'}
        </button>
      </motion.div>
    </motion.div>
  );
};

const AuthorCard = () => {
  const [showCertificate, setShowCertificate] = useState(false);

  return (
    <section id="author-section" className="relative w-full py-24 bg-gradient-to-br from-[#0a0a0f] via-[#0d0d15] to-[#11111a]">
      <div className="absolute inset-0 overflow-hidden -z-10">
        <div className="absolute inset-0 cyber-grid opacity-20" />
      </div>

      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 35 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <span className="inline-block px-4 py-1.5 bg-white/5 backdrop-blur-md rounded-full text-sm font-medium text-purple-300 border border-purple-500/20 mb-6">
            About This Project
          </span>

          <h2 className="text-4xl md:text-5xl font-bold text-white">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-white to-cyan-400">
              Built for Interactive Learning
            </span>
          </h2>

          <p className="text-lg text-gray-400 mt-4 max-w-2xl mx-auto">
            A visual educational experience designed to explain complex technical ideas simply.
          </p>
        </motion.div>

        <motion.div
          className="relative flex flex-col lg:flex-row items-center justify-center gap-8 rounded-3xl border border-white/10 bg-white/[0.035] backdrop-blur-xl p-8 md:p-10"
          initial={{ opacity: 0, y: 35 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <motion.div
            className="relative w-44 h-44 rounded-3xl bg-gradient-to-br from-purple-600/20 to-cyan-500/20 border border-cyan-500/20 shadow-2xl flex items-center justify-center overflow-hidden"
            whileHover={{ scale: 1.04 }}
            style={{
              boxShadow: '0 0 40px rgba(6, 182, 212, 0.18), 0 0 60px rgba(168, 85, 247, 0.1)'
            }}
          >
            <img
              src="https://avatars.githubusercontent.com/u/155940113?v=4"
              alt="Nakul Lagad"
              className="w-full h-full object-cover rounded-3xl"
            />
          </motion.div>

          <div className="flex-1 max-w-lg text-center lg:text-left">
            <h3 className="text-3xl font-bold text-white">
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-cyan-200">
                Nakul Lagad
              </span>
            </h3>

            <p className="mt-2 text-lg text-gray-400">
              M.Tech AI & Data Science
            </p>

            <p className="text-base text-cyan-300">
              Full Stack + AI Developer
            </p>

            <p className="mt-6 text-gray-300 leading-relaxed">
              Built to simplify complex technical concepts through interactive educational experiences.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 mt-8">
              <motion.button
                onClick={() => setShowCertificate(true)}
                className="flex-1 inline-flex items-center justify-center px-6 py-3 bg-gradient-to-r from-violet-600 to-cyan-500 text-white font-semibold rounded-xl shadow-card btn-cyber transition-transform duration-150"
                whileHover={{ scale: 1.01, y: -1, transition: { duration: 0.2, ease: [0.23,1,0.32,1] } }}
                whileTap={{ scale: 0.96, transition: { duration: 0.1 } }}
              >
                Get Certificate →
              </motion.button>

              <motion.button
                onClick={() => window.open('https://github.com/Lagadnakul', '_blank')}
                className="flex-1 inline-flex items-center justify-center px-6 py-3 bg-white/5 backdrop-blur-md rounded-xl border border-white/10 text-cyan-300 font-semibold hover:bg-white/10 transition-[background,border-color] duration-200"
                whileHover={{ scale: 1.01, y: -1, transition: { duration: 0.2, ease: [0.23,1,0.32,1] } }}
                whileTap={{ scale: 0.96, transition: { duration: 0.1 } }}
              >
                View GitHub
              </motion.button>
            </div>
          </div>
        </motion.div>

        <AnimatePresence>
          {showCertificate && <Certificate onClose={() => setShowCertificate(false)} />}
        </AnimatePresence>
      </div>

      <div className="absolute bottom-8 left-8 w-32 h-1 bg-gradient-to-r from-purple-500/0 via-purple-500/40 to-transparent" />
      <div className="absolute bottom-8 right-8 w-32 h-1 bg-gradient-to-l from-cyan-500/0 via-cyan-500/40 to-transparent" />
    </section>
  );
};

export default AuthorCard;