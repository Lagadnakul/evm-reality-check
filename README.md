<div align="center">

<br />

```
┌──────────────────┐     ┌─────────────────────┐
│   CONTROL UNIT   │────▶│    BALLOT UNIT       │
│  ○ Sealed        │     │  ○ Candidate A       │
│  ○ Offline       │     │  ○ Candidate B       │
└──────────────────┘     └─────────────────────┘
         │                         
         ▼                         
   ┌───────────┐                   
   │   VVPAT   │  ← paper audit trail
   └───────────┘                   
```

# EVM Reality Check

**The facts about India's Electronic Voting Machines.**  
How they work, why they're secure, and what the technical reality is.

[![React](https://img.shields.io/badge/React-18-61DAFB?style=flat-square&logo=react&logoColor=white)](https://react.dev)
[![Vite](https://img.shields.io/badge/Vite-5-646CFF?style=flat-square&logo=vite&logoColor=white)](https://vitejs.dev)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.3-06B6D4?style=flat-square&logo=tailwindcss&logoColor=white)](https://tailwindcss.com)
[![Framer Motion](https://img.shields.io/badge/Framer_Motion-12-black?style=flat-square&logo=framer&logoColor=white)](https://www.framer.com/motion)
[![License: MIT](https://img.shields.io/badge/License-MIT-green?style=flat-square)](LICENSE)

</div>

---

## What is this?

EVM Reality Check is a public-interest educational site that confronts the most common myths about India's Electronic Voting Machines with **technical fact**.

India's EVMs have been called everything from tamper-proof to rigged. This site presents the architecture, the security layers, and the real constraints — transparently, without spin. A skeptic should finish the page with their doubt replaced by understanding.

---

## Features

- **Interactive Voting Demo** — Walk through the full EVM process step by step: identity verification → ballot activation → vote selection → VVPAT confirmation
- **Myth vs Reality** — 4 of the most common EVM claims, each addressed with technical specifics
- **Security Architecture** — How physical seals, firmware integrity, process transparency, and VVPAT work together
- **FAQ Accordion** — 8 plain-language answers about how EVMs are built, stored, and audited
- **Fully responsive** — Works on mobile through desktop

---

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | React 18 + Vite 5 |
| Styling | Tailwind CSS 3.3 (OKLCH color system) |
| Animation | Framer Motion 12 |
| Icons | Lucide React |
| Typography | Playfair Display (display) + Inter (body) + JetBrains Mono |

---

## Getting Started

```bash
# Clone the repo
git clone https://github.com/AAYUSH9988/evm-reality-check.git
cd evm-reality-check

# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build
```

The dev server runs at `http://localhost:5173`.

---

## Project Structure

```
src/
├── components/
│   └── layout/
│       └── Navbar.jsx
├── constants/
│   └── myths.js          ← all content lives here
├── sections/
│   ├── HeroSection.jsx
│   ├── VotingDemoSection.jsx
│   ├── MythRealitySection.jsx
│   ├── SecurityLayersSection.jsx
│   ├── FAQSection.jsx
│   └── Footer.jsx
├── styles/
│   └── index.css
└── App.jsx
```

Content is centralized in `src/constants/myths.js` — myths, FAQ answers, security layer descriptions, and voting step data all live there. No content is hardcoded inside components.

---

## Design System

The site uses an **editorial dark** aesthetic — soft dark slate background, Playfair Display serif headlines, high-contrast white text. Inspired by long-form journalism rather than SaaS product pages.

```
canvas:  oklch(0.16 0.008 255)   #1b1d27  page background
panel:   oklch(0.20 0.008 255)   #222430  card surfaces
ink:     oklch(0.93 0.004 255)   #e8eaf0  primary text
muted:   oklch(0.62 0.010 255)   #8b90a8  secondary text
signal:  oklch(0.72 0.17  155)   #22c78a  verified / true
amber:   oklch(0.85 0.08   95)   #e8c47a  myth / caution
```

---

## Credits

This project is a redesign fork of the original work by **[@Lagadnakul](https://github.com/Lagadnakul)**:

> **Original repo:** [github.com/Lagadnakul/evm-reality-check](https://github.com/Lagadnakul/evm-reality-check)

The content, data structure, and core educational concept come from the original. This fork redesigns the visual layer — typography, color system, layout, and component architecture — to make the information more accessible and readable.

---

## Disclaimer

This project is **not affiliated with the Election Commission of India**. All information is for educational purposes only. Sources are publicly available technical documents from ECI and peer-reviewed analysis of EVM architecture.

---

<div align="center">

Made with care for Indian democracy.

</div>
