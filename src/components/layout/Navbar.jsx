import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';

const navLinks = [
  { label: 'How It Works', href: '#voting-demo' },
  { label: 'Myths', href: '#myth-reality' },
  { label: 'Security', href: '#security' },
  { label: 'FAQ', href: '#faq' },
];

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (e, href) => {
    e.preventDefault();
    const el = document.querySelector(href);
    if (el) { el.scrollIntoView({ behavior: 'smooth' }); setIsOpen(false); }
  };

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      scrolled ? 'bg-canvas/95 backdrop-blur-md border-b border-rule' : 'bg-transparent'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <a href="#" className="flex items-center gap-2.5 group">
            <div className="w-5 h-5 border-2 border-signal flex items-center justify-center flex-shrink-0">
              <div className="w-1.5 h-1.5 bg-signal" />
            </div>
            <span className="font-sans font-semibold text-ink text-sm">EVM Reality Check</span>
          </a>

          <div className="hidden md:flex items-center gap-8">
            {navLinks.map(link => (
              <a
                key={link.href}
                href={link.href}
                onClick={(e) => handleNavClick(e, link.href)}
                className="text-sm font-medium text-muted hover:text-ink transition-colors duration-150"
              >
                {link.label}
              </a>
            ))}
          </div>

          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-2 text-muted hover:text-ink transition-colors"
            aria-label="Toggle menu"
          >
            {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
            className="md:hidden bg-canvas border-b border-rule overflow-hidden"
          >
            <div className="px-4 py-3 space-y-1">
              {navLinks.map(link => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={(e) => handleNavClick(e, link.href)}
                  className="block px-4 py-3 text-muted hover:text-ink hover:bg-panel rounded-lg text-sm font-medium transition-colors"
                >
                  {link.label}
                </a>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
