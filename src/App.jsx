import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, ArrowUp } from 'lucide-react';
import ScrollProgress from './components/common/ScrollProgress';
import PremiumFooter from './components/common/PremiumFooter';
import HeroSection from './sections/HeroSection';
import WhatIsEvmSection from './sections/WhatIsEvmSection';
import InsideTheMachine from './sections/InsideTheMachine';
import VotingDemoSection from './sections/VotingDemoSection';
import MythRealitySection from './sections/MythRealitySection';
import HackerModeSection from './sections/HackerModeSection';
import VerdictSection from './sections/VerdictSection';
import AuthorCard from './sections/AuthorSection';

const EASE_OUT = [0.23, 1, 0.32, 1];

const navLinks = [
  { name: 'What is EVM', href: '#what-is-evm' },
  { name: 'Inside The Machine', href: '#inside-machine' },
  { name: 'Voting Demo', href: '#voting-demo' },
  { name: 'Myths', href: '#myth-reality' },
  { name: 'Hacker Mode', href: '#hacker-mode' },
];

const SectionDivider = () => (
  <div className="relative h-px overflow-visible">
    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/[0.06] to-transparent" />
    <div className="absolute left-1/2 -translate-x-1/2 -top-px w-48 h-px bg-gradient-to-r from-transparent via-cyber-cyan/20 to-transparent" />
  </div>
);

function App() {
  const [showScrollProgress, setShowScrollProgress] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    setTimeout(() => setShowScrollProgress(true), 400);
  }, []);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu on resize to desktop
  useEffect(() => {
    const handleResize = () => { if (window.innerWidth >= 1024) setMobileOpen(false); };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const scrollTo = (href) => {
    setMobileOpen(false);
    if (href === '#') { window.scrollTo({ top: 0, behavior: 'smooth' }); return; }
    document.querySelector(href)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <div className="min-h-screen text-white bg-bg-0">
      {showScrollProgress && <ScrollProgress />}

      {/* ─── Navbar ─── */}
      <motion.nav
        className="fixed top-0 w-full z-50 border-b border-white/[0.06] bg-bg-0/90 backdrop-blur-xl"
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, ease: EASE_OUT }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">

            {/* Logo */}
            <motion.a
              href="#"
              className="flex items-center gap-2.5 group flex-shrink-0"
              onClick={(e) => { e.preventDefault(); scrollTo('#'); }}
              whileHover={{ scale: 1.01 }}
              whileTap={{ scale: 0.98 }}
            >
              <img
                src="/logo.png"
                alt="EVM Reality Check"
                className="w-9 h-9 rounded-xl object-contain bg-white flex-shrink-0"
              />
              <div className="flex flex-col leading-none">
                <span className="text-sm font-semibold tracking-wide text-white">
                  EVM Reality Check
                </span>
                <span className="text-[10px] text-gray-500 font-mono tracking-wider hidden sm:block">
                  Interactive Educational Experience
                </span>
              </div>
            </motion.a>

            {/* Desktop nav links */}
            <div className="hidden lg:flex items-center gap-1">
              {navLinks.map((link) => (
                <motion.a
                  key={link.href}
                  href={link.href}
                  className="relative px-3 py-2 text-sm font-medium text-gray-400 hover:text-white transition-colors duration-200 rounded-lg hover:bg-white/5"
                  onClick={(e) => { e.preventDefault(); scrollTo(link.href); }}
                  whileHover={{ y: -1 }}
                  whileTap={{ scale: 0.97 }}
                >
                  {link.name}
                </motion.a>
              ))}
            </div>

            {/* Mobile hamburger */}
            <motion.button
              className="lg:hidden flex items-center justify-center w-9 h-9 rounded-lg border border-white/10 text-gray-300 hover:text-white hover:bg-white/5 transition-colors"
              onClick={() => setMobileOpen((o) => !o)}
              whileTap={{ scale: 0.95 }}
              aria-label="Toggle menu"
            >
              <AnimatePresence mode="wait" initial={false}>
                {mobileOpen ? (
                  <motion.span key="x" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }} transition={{ duration: 0.15 }}>
                    <X size={18} />
                  </motion.span>
                ) : (
                  <motion.span key="menu" initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -90, opacity: 0 }} transition={{ duration: 0.15 }}>
                    <Menu size={18} />
                  </motion.span>
                )}
              </AnimatePresence>
            </motion.button>
          </div>
        </div>

        {/* Mobile menu overlay */}
        <AnimatePresence>
          {mobileOpen && (
            <motion.div
              className="lg:hidden border-t border-white/[0.06] bg-bg-0/98 backdrop-blur-xl"
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.25, ease: EASE_OUT }}
              style={{ overflow: 'hidden' }}
            >
              <div className="px-4 py-4 space-y-1">
                {navLinks.map((link, i) => (
                  <motion.a
                    key={link.href}
                    href={link.href}
                    className="flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium text-gray-300 hover:text-white hover:bg-white/5 transition-colors"
                    onClick={(e) => { e.preventDefault(); scrollTo(link.href); }}
                    initial={{ opacity: 0, x: -12 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.04, ease: EASE_OUT }}
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-cyber-cyan/50 flex-shrink-0" />
                    {link.name}
                  </motion.a>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.nav>

      {/* ─── Main Content ─── */}
      <main className="pt-16">
        <section id="home"><HeroSection /></section>
        <SectionDivider />
        <WhatIsEvmSection />
        <SectionDivider />
        <section id="inside-machine"><InsideTheMachine /></section>
        <SectionDivider />
        <section id="voting-demo"><VotingDemoSection /></section>
        <SectionDivider />
        <section id="myth-reality"><MythRealitySection /></section>
        <SectionDivider />
        <section id="hacker-mode"><HackerModeSection /></section>
        <SectionDivider />
        <VerdictSection />
        <SectionDivider />
        <section id="author"><AuthorCard /></section>
      </main>

      <PremiumFooter />

      {/* Back to top */}
      <AnimatePresence>
        {scrolled && (
          <motion.button
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="fixed bottom-6 right-6 z-50 flex items-center justify-center w-10 h-10 rounded-full bg-bg-2 border border-white/10 shadow-floating text-gray-400 hover:text-white hover:border-cyber-cyan/30 transition-colors"
            initial={{ opacity: 0, y: 16, scale: 0.8 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 16, scale: 0.8 }}
            transition={{ duration: 0.25, ease: EASE_OUT }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.96, transition: { duration: 0.1 } }}
          >
            <ArrowUp size={16} />
          </motion.button>
        )}
      </AnimatePresence>

      {/* Scroll indicator */}
      <motion.div
        className="fixed bottom-8 left-1/2 -translate-x-1/2 pointer-events-none"
        initial={{ opacity: 0 }}
        animate={{ opacity: scrolled ? 0 : 1 }}
        transition={{ delay: scrolled ? 0 : 2.5, duration: 0.4 }}
      >
        <motion.div
          className="w-5 h-8 rounded-full border border-white/15 flex items-start justify-center pt-1.5"
          animate={{ y: [0, 4, 0] }}
          transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
        >
          <motion.div
            className="w-0.5 h-2 rounded-full bg-cyber-cyan/60"
            animate={{ opacity: [1, 0.2, 1], y: [0, 4, 0] }}
            transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
          />
        </motion.div>
      </motion.div>
    </div>
  );
}

export default App;
