import React from 'react';
import { motion } from 'framer-motion';
import HeroSection from './sections/HeroSection';
import VotingDemoSection from './sections/VotingDemoSection';
import MythRealitySection from './sections/MythRealitySection';
import HackerModeSection from './sections/HackerModeSection';

function App() {
  return (
    <div className="min-h-screen text-white">
      {/* Navbar */}
      <nav className="fixed top-0 w-full z-50 bg-[#0a0a0f]/80 backdrop-blur-xl border-b border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <motion.h1
              className="text-xl font-bold tracking-wider text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-white to-purple-400"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              EVM REALITY CHECK
            </motion.h1>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="pt-16">
        <HeroSection />
        <VotingDemoSection />
      <MythRealitySection />
      <HackerModeSection />
      </main>
    </div>
  );
}

export default App;
