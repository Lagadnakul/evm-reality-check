/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Design token aliases
        bg: {
          0: '#07070f',
          1: '#0d0d1a',
          2: '#12121f',
          3: '#181827',
        },
        // Accent palette
        cyber: {
          cyan:    '#22d3ee',
          violet:  '#a78bfa',
          emerald: '#34d399',
          rose:    '#fb7185',
          amber:   '#fbbf24',
        },
      },
      fontFamily: {
        display: ['Space Grotesk', 'Inter', 'system-ui', 'sans-serif'],
        sans:    ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
        mono:    ['JetBrains Mono', 'Fira Code', 'monospace'],
      },
      fontSize: {
        'display': ['clamp(44px,6.5vw,88px)', { lineHeight: '1.04', letterSpacing: '-0.03em', fontWeight: '800' }],
        'h1':      ['clamp(32px,4.5vw,60px)',  { lineHeight: '1.1',  letterSpacing: '-0.02em', fontWeight: '700' }],
        'h2':      ['clamp(22px,3vw,36px)',    { lineHeight: '1.2',  letterSpacing: '-0.015em',fontWeight: '600' }],
      },
      borderRadius: {
        'xs': '6px',
        'sm': '8px',
        'md': '10px',
        'lg': '12px',
        'xl': '16px',
        '2xl': '20px',
        '3xl': '24px',
        '4xl': '32px',
      },
      boxShadow: {
        'card':         '0 0 0 1px rgba(255,255,255,0.05), 0 4px 24px rgba(0,0,0,0.55), 0 1px 4px rgba(0,0,0,0.4)',
        'card-hover':   '0 0 0 1px rgba(34,211,238,0.18), 0 8px 40px rgba(0,0,0,0.65), 0 0 40px rgba(34,211,238,0.07)',
        'floating':     '0 0 0 1px rgba(255,255,255,0.07), 0 20px 60px rgba(0,0,0,0.75), 0 8px 24px rgba(0,0,0,0.5)',
        'glow-cyan':    '0 0 30px rgba(34,211,238,0.18), 0 0 60px rgba(34,211,238,0.08)',
        'glow-violet':  '0 0 30px rgba(167,139,250,0.18), 0 0 60px rgba(167,139,250,0.08)',
        'glow-emerald': '0 0 20px rgba(52,211,153,0.18), 0 0 40px rgba(52,211,153,0.08)',
      },
      transitionTimingFunction: {
        'out-strong':  'cubic-bezier(0.23, 1, 0.32, 1)',
        'in-out-strong': 'cubic-bezier(0.77, 0, 0.175, 1)',
        'drawer':      'cubic-bezier(0.32, 0.72, 0, 1)',
      },
      animation: {
        'fade-up':     'fadeUp 0.5s cubic-bezier(0.23,1,0.32,1) forwards',
        'fade-in':     'fadeIn 0.4s cubic-bezier(0.23,1,0.32,1) forwards',
        'scale-in':    'scaleIn 0.4s cubic-bezier(0.23,1,0.32,1) forwards',
        'grid-scroll': 'gridScroll 25s linear infinite',
        'float':       'float 5s ease-in-out infinite',
        'pulse-slow':  'pulse 3s ease-in-out infinite',
      },
      keyframes: {
        fadeUp: {
          from: { opacity: '0', transform: 'translateY(18px)', filter: 'blur(4px)' },
          to:   { opacity: '1', transform: 'translateY(0)',    filter: 'blur(0px)' },
        },
        fadeIn: {
          from: { opacity: '0' },
          to:   { opacity: '1' },
        },
        scaleIn: {
          from: { opacity: '0', transform: 'scale(0.95)', filter: 'blur(4px)' },
          to:   { opacity: '1', transform: 'scale(1)',    filter: 'blur(0px)' },
        },
        gridScroll: {
          '0%':   { transform: 'translate(0,0)' },
          '100%': { transform: 'translate(32px,32px)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%':      { transform: 'translateY(-12px)' },
        },
      },
    },
  },
  plugins: [],
}
