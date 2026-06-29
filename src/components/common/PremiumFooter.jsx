
import { motion } from 'framer-motion';
import { Home, Vote, Cpu, ShieldCheck, Terminal, User, GitBranch, Globe, Mail, ArrowRight } from 'lucide-react';

const EASE_OUT = [0.23, 1, 0.32, 1];

const quickLinks = [
  { name: 'Home', href: '#', Icon: Home },
  { name: 'Voting Demo', href: '#voting-demo', Icon: Vote },
  { name: 'Inside The Machine', href: '#inside-machine', Icon: Cpu },
  { name: 'Myth vs Reality', href: '#myth-reality', Icon: ShieldCheck },
  { name: 'Hacker Mode', href: '#hacker-mode', Icon: Terminal },
  { name: 'Author', href: '#author', Icon: User },
];

const socialLinks = [
  { name: 'GitHub', sub: 'View source code', Icon: GitBranch, href: 'https://github.com/Lagadnakul' },
  { name: 'Portfolio', sub: 'Explore more projects', Icon: Globe, href: '#' },
  { name: 'Contact', sub: 'Get in touch', Icon: Mail, href: '#' },
];

const scrollTo = (href) => {
  if (href === '#') { window.scrollTo({ top: 0, behavior: 'smooth' }); return; }
  if (href.startsWith('http')) { window.open(href, '_blank'); return; }
  document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' });
};

const PremiumFooter = () => (
  <footer className="relative w-full bg-bg-0 border-t border-white/[0.06] pt-16 pb-10 overflow-hidden">
    {/* Ambient */}
    <div className="absolute inset-0 [background-image:linear-gradient(rgba(34,211,238,0.018)_1px,transparent_1px),linear-gradient(90deg,rgba(34,211,238,0.018)_1px,transparent_1px)] [background-size:48px_48px] pointer-events-none" />

    <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-8">

        {/* Brand */}
        <motion.div
          className="space-y-5 sm:col-span-2 lg:col-span-1"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, ease: EASE_OUT }}
        >
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-cyber-cyan/20 to-cyber-violet/20 border border-cyber-cyan/20 flex items-center justify-center">
              <span className="text-xs font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyber-cyan to-cyber-violet">EVM</span>
            </div>
            <div>
              <p className="text-sm font-semibold text-white">EVM Reality Check</p>
              <p className="text-[10px] text-gray-500 font-mono tracking-wider">Interactive Educational Experience</p>
            </div>
          </div>

          <p className="text-sm text-gray-500 leading-relaxed">
            An interactive platform to understand electronic voting through exploration and visualization — not propaganda, not politics.
          </p>

          <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-cyber-cyan/5 border border-cyber-cyan/15 rounded-full">
            <motion.span
              className="w-1.5 h-1.5 bg-cyber-cyan rounded-full"
              animate={{ opacity: [1, 0.3, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            />
            <span className="text-xs text-cyber-cyan/80 font-mono">Built by Nakul Lagad</span>
          </div>
        </motion.div>

        {/* Quick Links */}
        <motion.div
          className="space-y-5"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, ease: EASE_OUT, delay: 0.08 }}
        >
          <h4 className="text-xs font-semibold uppercase tracking-widest text-gray-500">Quick Links</h4>
          <ul className="space-y-2">
            {quickLinks.map(({ name, href, Icon }) => (
              <li key={name}>
                <button
                  onClick={() => scrollTo(href)}
                  className="flex items-center gap-2.5 text-sm text-gray-400 hover:text-white transition-colors group w-full text-left"
                >
                  <Icon size={13} className="text-gray-600 group-hover:text-cyber-cyan transition-colors flex-shrink-0" />
                  {name}
                </button>
              </li>
            ))}
          </ul>
        </motion.div>

        {/* About the project */}
        <motion.div
          className="space-y-5"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, ease: EASE_OUT, delay: 0.12 }}
        >
          <h4 className="text-xs font-semibold uppercase tracking-widest text-gray-500">What's Inside</h4>
          <ul className="space-y-3">
            {[
              'EVM Architecture Overview',
              'Step-by-Step Vote Simulation',
              'Security Layer Breakdown',
              '4 Common Myth Debunks',
              'Hacker Mode (Parody)',
              'Downloadable Certificate',
            ].map((item) => (
              <li key={item} className="text-sm text-gray-500 leading-snug flex items-start gap-2">
                <span className="mt-1.5 w-1 h-1 rounded-full bg-cyber-cyan/40 flex-shrink-0" />
                {item}
              </li>
            ))}
          </ul>
        </motion.div>

        {/* Connect */}
        <motion.div
          className="space-y-5"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, ease: EASE_OUT, delay: 0.16 }}
        >
          <h4 className="text-xs font-semibold uppercase tracking-widest text-gray-500">Connect</h4>
          <ul className="space-y-3">
            {socialLinks.map(({ name, sub, Icon, href }) => (
              <li key={name}>
                <motion.button
                  onClick={() => scrollTo(href)}
                  className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl bg-bg-1 border border-white/[0.07] hover:border-cyber-cyan/20 hover:bg-bg-2 transition-all group"
                  whileTap={{ scale: 0.98 }}
                >
                  <Icon size={15} className="text-gray-500 group-hover:text-cyber-cyan transition-colors flex-shrink-0" />
                  <div className="flex flex-col items-start min-w-0">
                    <span className="text-sm text-gray-300 group-hover:text-white transition-colors font-medium">{name}</span>
                    <span className="text-xs text-gray-600 truncate">{sub}</span>
                  </div>
                  <ArrowRight size={13} className="ml-auto text-gray-700 group-hover:text-gray-400 transition-colors flex-shrink-0" />
                </motion.button>
              </li>
            ))}
          </ul>
        </motion.div>
      </div>

      {/* Bottom bar */}
      <div className="mt-12 pt-6 border-t border-white/[0.05] flex flex-col sm:flex-row items-center justify-between gap-4">
        <p className="text-xs text-gray-600">
          © 2026 EVM Reality Check · Educational concept — not an exact replica of any real system.
        </p>
        <p className="text-xs text-gray-700 font-mono">
          Designed & developed by Nakul Lagad
        </p>
      </div>
    </div>
  </footer>
);

export default PremiumFooter;
