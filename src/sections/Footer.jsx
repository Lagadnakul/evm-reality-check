import { ExternalLink } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-panel border-t border-rule">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10 mb-10">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2.5 mb-4">
              <div className="w-4 h-4 border-2 border-signal flex items-center justify-center flex-shrink-0">
                <div className="w-1 h-1 bg-signal" />
              </div>
              <span className="font-semibold text-ink text-sm">EVM Reality Check</span>
            </div>
            <p className="text-muted text-sm leading-relaxed max-w-[32ch]">
              An open educational resource explaining how India's Electronic Voting
              Machines work and addressing common misconceptions with factual,
              technical information.
            </p>
          </div>

          {/* Resources */}
          <div>
            <h4 className="text-sm font-semibold text-ink mb-4">Official Resources</h4>
            <ul className="space-y-3">
              {[
                { label: 'Election Commission of India', href: 'https://eci.gov.in' },
                { label: 'EVM Technical Details', href: 'https://eci.gov.in/evm' },
                { label: 'VVPAT Information', href: 'https://eci.gov.in/vvpat' },
              ].map(({ label, href }) => (
                <li key={href}>
                  <a
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-muted hover:text-ink text-sm transition-colors inline-flex items-center gap-1.5"
                  >
                    {label}
                    <ExternalLink className="w-3 h-3 opacity-60" />
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Open Source */}
          <div>
            <h4 className="text-sm font-semibold text-ink mb-4">Open Source</h4>
            <p className="text-muted text-sm mb-4 max-w-[28ch] leading-relaxed">
              This project is open source. Contribute, report issues, or suggest improvements on GitHub.
            </p>
            <a
              href="https://github.com"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-muted hover:text-ink transition-colors text-sm"
            >
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.135-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.675 1.65.255 2.88.135 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
              </svg>
              View on GitHub
            </a>
          </div>
        </div>

        <div className="pt-8 border-t border-rule flex flex-col md:flex-row items-start md:items-center justify-between gap-3">
          <p className="text-muted/60 text-xs">
            &copy; {new Date().getFullYear()} EVM Reality Check. Educational resource.
          </p>
          <p className="text-muted/40 text-xs">
            Not affiliated with the Election Commission of India. For educational purposes only.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
