/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        canvas:  'oklch(0.16 0.008 255)',
        panel:   'oklch(0.20 0.008 255)',
        lift:    'oklch(0.24 0.008 255)',
        rule:    'oklch(0.30 0.008 255)',
        ink:     'oklch(0.93 0.004 255)',
        muted:   'oklch(0.62 0.010 255)',
        signal:  'oklch(0.72 0.17 155)',
        amber:   'oklch(0.85 0.08 95)',
      },
      fontFamily: {
        display: ['"Playfair Display"', 'Georgia', 'serif'],
        sans:    ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
        mono:    ['"JetBrains Mono"', 'monospace'],
      },
      borderRadius: {
        sm:   '4px',
        DEFAULT: '6px',
        md:   '8px',
        lg:   '10px',
        xl:   '12px',
        full: '9999px',
      },
      animation: {
        'spin-slow':  'spin 2s linear infinite',
        'pulse-slow': 'pulse 3s ease-in-out infinite',
      },
    },
  },
  plugins: [],
}
