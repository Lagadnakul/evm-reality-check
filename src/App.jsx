import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { EasterEggProvider, EasterEggToggle } from './components/common/EasterEggSystem';
import SoundManager, { useSound } from './components/common/SoundManager';
import LoadingScreen from './components/common/LoadingScreen';
import ScrollProgress from './components/common/ScrollProgress';
import MuteToggle from './components/common/MuteToggle';
import PremiumFooter from './components/common/PremiumFooter';
import HeroSection from './sections/HeroSection';
import VotingDemoSection from './sections/VotingDemoSection';
import InsideTheMachine from './sections/InsideTheMachine';
import MythRealitySection from './sections/MythRealitySection';
import HackerModeSection from './sections/HackerModeSection';
import AuthorCard from './sections/AuthorSection';

// Main App Component
function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [showScrollProgress, setShowScrollProgress] = useState(false);

  // Handle loading completion
  const handleLoadingComplete = () => {
    setIsLoading(false);
    // Show scroll progress after loading
    setTimeout(() => {
      setShowScrollProgress(true);
    }, 1000);
  };

  // Scroll-based animations for navbar
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Navbar variants
  const navbarVariants = {
    hidden: { y: -100, opacity: 0 },
    visible: { y: 0, opacity: 1 },
    scrolled: { y: 0, opacity: 1, backgroundColor: 'rgba(10, 10, 15, 0.95)' }
  };

  // Logo variants
  const logoVariants = {
    rest: { scale: 1 },
    hover: { scale: 1.02, rotate: [0, 5, -5, 0] }
  };

  if (isLoading) {
    return <LoadingScreen onLoaded={handleLoadingComplete} />;
  }

  return (
    <EasterEggProvider>
      <SoundManager>
        <div className="min-h-screen text-white">
          {/* Scroll Progress Indicator */}
          {showScrollProgress && <ScrollProgress />}

          {/* Navbar */}
          <motion.nav
            className={`fixed top-0 w-full z-50 border-b border-white/5 ${scrolled ? 'bg-[#0a0a0f]/95 backdrop-blur-xl' : 'bg-[#0a0a0f]/80 backdrop-blur-xl'}`}
            variants={navbarVariants}
            initial="hidden"
            animate={scrolled ? "scrolled" : "visible"}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
          >
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="flex justify-between items-center h-16">
                {/* Logo */}
                <motion.a
                  href="#"
                  className="flex items-center gap-3 group"
                  onClick={(e) => {
                    e.preventDefault();
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  variants={logoVariants}
                  initial="rest"
                  whileHover="hover"
                >
                  <motion.div
                    className="relative w-10 h-10 rounded-xl bg-gradient-to-br from-cyan-500/20 to-purple-500/20 flex items-center justify-center border border-cyan-500/20"
                    whileHover={{ scale: 1.05 }}
                  >
                    <motion.span
                      className="text-lg font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-400"
                      whileHover={{ scale: 1.1 }}
                    >
                      EVM
                    </motion.span>
                    <motion.div
                      className="absolute inset-0 rounded-xl border border-white/10"
                      animate={{ borderColor: ['rgba(6, 182, 212, 0.2)', 'rgba(168, 85, 247, 0.2)'] }}
                      transition={{ duration: 3, repeat: Infinity }}
                    />
                  </motion.div>
                  <motion.div
                    className="flex flex-col"
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.2 }}
                  >
                    <motion.h1
                      className="text-xl font-bold tracking-wider text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-white to-purple-400"
                      whileHover={{ scale: 1.01 }}
                    >
                      EVM REALITY CHECK
                    </motion.h1>
                    <motion.p
                      className="text-xs text-gray-500 font-mono tracking-wider -mt-1"
                      whileHover={{ color: 'rgba(255, 255, 255, 0.8)' }}
                    >
                      Interactive Educational Experience
                    </motion.p>
                  </motion.div>
                </motion.a>

                {/* Navigation Links */}
                <motion.div
                  className="hidden lg:flex items-center gap-6"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.3 }}
                >
                  {[
                    { name: 'Inside The Machine', href: '#inside-machine' },
                    { name: 'Voting Demo', href: '#voting-demo' },
                    { name: 'Myth vs Reality', href: '#myth-reality' },
                    { name: 'Hacker Mode', href: '#hacker-mode' },
                    { name: 'Author', href: '#author' }
                  ].map((link, index) => (
                    <motion.a
                      key={index}
                      href={link.href}
                      className="relative text-sm font-medium text-gray-300 hover:text-white transition-all duration-300 group"
                      onClick={(e) => {
                        e.preventDefault();
                        const element = document.querySelector(link.href);
                        if (element) {
                          element.scrollIntoView({ behavior: 'smooth', block: 'start' });
                        }
                      }}
                      whileHover={{ scale: 1.02, y: -1 }}
                    >
                      <motion.div
                        className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-cyan-500/0 to-cyan-500/40"
                        initial={{ scaleX: 0 }}
                        whileHover={{ scaleX: 1 }}
                        transition={{ duration: 0.3 }}
                      />
                      <span className="relative z-10">{link.name}</span>
                    </motion.a>
                  ))}
                </motion.div>

                {/* Mobile Menu Button */}
                <motion.button
                  className="lg:hidden relative w-10 h-10 rounded-xl bg-gradient-to-br from-purple-600/20 to-cyan-500/20 flex items-center justify-center border border-white/20"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <motion.div
                    className="relative w-5 h-5"
                    animate={{ rotate: [0, 90, 180, 270] }}
                    transition={{ duration: 4, repeat: Infinity, ease: 'linear' }}
                  >
                    <motion.div
                      className="absolute top-1/2 left-0 w-5 h-0.5 bg-white rounded-full"
                      animate={{ top: ['2px', '7px', '2px'] }}
                      transition={{ duration: 0.3, repeat: Infinity, delay: 0 }}
                    />
                    <motion.div
                      className="absolute top-1/2 left-0 w-5 h-0.5 bg-white rounded-full"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: [0, 1, 0], top: ['7px', '2px', '7px'] }}
                      transition={{ duration: 0.3, repeat: Infinity, delay: 0.1 }}
                    />
                  </motion.div>
                </motion.button>
              </div>
            </div>
          </motion.nav>

          {/* Main Content */}
          <main className="pt-16">
            {/* Hero Section */}
            <section id="home">
              <HeroSection />
            </section>

            {/* Inside The Machine Section */}
            <section id="inside-machine">
              <InsideTheMachine />
            </section>

            {/* Voting Demo Section */}
            <section id="voting-demo">
              <VotingDemoSection />
            </section>

            {/* Myth vs Reality Section */}
            <section id="myth-reality">
              <MythRealitySection />
            </section>

            {/* Hacker Mode Section */}
            <section id="hacker-mode">
              <HackerModeSection />
            </section>

            {/* Author Section */}
            <section id="author">
              <AuthorCard />
            </section>
          </main>

          {/* Premium Footer */}
          <PremiumFooter />

          {/* Sound Toggle */}
          <MuteToggle />

          {/* Easter Egg Toggle */}
          <EasterEggToggle />

          {/* Back to Top Button */}
          <motion.button
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="fixed bottom-6 right-20 z-50 flex items-center justify-center w-12 h-12 rounded-full bg-gradient-to-br from-cyan-600/80 to-purple-500/80 backdrop-blur-lg border border-white/20 shadow-xl hover:shadow-2xl transition-all duration-300"
            whileHover={{ scale: 1.05, y: -3 }}
            whileTap={{ scale: 0.95, y: 0 }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: scrolled ? 1 : 0, y: scrolled ? 0 : 20 }}
            transition={{ duration: 0.3 }}
          >
            <motion.span
              className="text-lg"
              animate={{ rotate: [0, 360] }}
              transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
            >
              ↑
            </motion.span>
          </motion.button>

          {/* Decorative Scroll Indicator at Bottom */}
          <motion.div
            className="fixed bottom-6 left-1/2 -translate-x-1/2"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 3, duration: 0.5 }}
          >
            <motion.div
              className="w-8 h-12 rounded-full bg-gradient-to-b from-cyan-500/20 to-purple-500/20 border border-white/20 flex items-center justify-center"
              animate={{ y: [0, 10, 0] }}
              transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
            >
              <motion.div
                className="w-1 h-3 rounded-full bg-gradient-to-b from-cyan-400 to-purple-400"
                animate={{ height: [3, 8, 3], y: [0, 5, 0] }}
                transition={{ duration: 1, repeat: Infinity, ease: 'easeInOut' }}
              />
            </motion.div>
          </motion.div>
        </div>
      </SoundManager>
    </EasterEggProvider>
  );
}

export default App;
