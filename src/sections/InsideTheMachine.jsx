import React, { useState, useRef } from 'react';
import { motion, AnimatePresence, useInView } from 'framer-motion';
import { ArrowRight, ClipboardList, Cpu, Eye, User, BadgeCheck, KeyRound, CheckSquare, Database, Check, Lock, ListChecks, Search, BarChart3, Plus, X } from 'lucide-react';

const MachineModule = ({
  name,
  description,
  inputs,
  outputs,
  purpose,
  color,
  onClick,
  isActive,
  Icon,
}) => {
  const moduleRef = useRef(null);
  const isInView = useInView(moduleRef, { once: true, margin: '-60px' });

  return (
    <motion.div
      ref={moduleRef}
      initial={{ opacity: 0, y: 24, filter: 'blur(4px)' }}
      animate={isInView ? { opacity: 1, y: 0, filter: 'blur(0px)' } : {}}
      transition={{ duration: 0.55, ease: [0.23, 1, 0.32, 1] }}
    >
      <motion.div
        className="relative w-full rounded-2xl border border-white/8 p-6 cursor-pointer overflow-hidden bg-bg-1"
        onClick={() => onClick(name)}
        style={{ boxShadow: '0 1px 3px rgba(0,0,0,0.4)' }}
        whileHover={{
          y: -4,
          borderColor: `${color}40`,
          boxShadow: `0 8px 32px rgba(0,0,0,0.5), 0 0 24px ${color}18`,
          transition: { duration: 0.2, ease: [0.23, 1, 0.32, 1] },
        }}
      >
        {/* Subtle top gradient */}
        <div className="absolute inset-x-0 top-0 h-px" style={{ background: `linear-gradient(90deg, transparent, ${color}30, transparent)` }} />

        <div className="relative z-10">
          {/* Header */}
          <div className="flex items-start justify-between mb-5">
            <div className="flex items-center gap-3">
              <div
                className="w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0"
                style={{ background: `${color}14`, border: `1px solid ${color}25` }}
              >
                <Icon size={20} style={{ color }} />
              </div>
              <div>
                <h3 className="text-base font-semibold text-white" style={{ color }}>
                  {name}
                </h3>
              </div>
            </div>
            <motion.div
              className="w-2 h-2 rounded-full mt-1 flex-shrink-0"
              style={{ backgroundColor: isActive ? color : 'rgba(255,255,255,0.2)' }}
              animate={isActive ? { boxShadow: [`0 0 8px ${color}`, `0 0 16px ${color}`, `0 0 8px ${color}`] } : {}}
              transition={{ duration: 1.5, repeat: Infinity }}
            />
          </div>

          <p className="text-sm text-gray-400 leading-relaxed mb-5">
            {description}
          </p>

          {/* Data pills */}
          <div className="space-y-2">
            {[
              { label: 'Input', value: inputs, tc: 'text-cyber-cyan' },
              { label: 'Output', value: outputs, tc: 'text-cyber-violet' },
              { label: 'Purpose', value: purpose, tc: 'text-cyber-emerald' },
            ].map(({ label, value, tc }) => (
              <div key={label} className="flex items-baseline gap-2 px-3 py-2 rounded-lg bg-white/[0.035] border border-white/[0.06]">
                <span className={`text-[10px] font-semibold uppercase tracking-widest ${tc} flex-shrink-0`}>{label}</span>
                <span className="text-xs text-gray-400">{value}</span>
              </div>
            ))}
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

const EASE_OUT = [0.23, 1, 0.32, 1];

const MachineAnatomy = ({ activeModule, onModuleClick }) => {
  const containerRef = useRef(null);
  const isInView = useInView(containerRef, { once: true, margin: '-80px' });

  const modules = [
    {
      name: 'Ballot Unit',
      description: 'The voter-facing interface where selections are made. It displays candidate information and captures the voter choice.',
      inputs: 'Voter interaction',
      outputs: 'Vote selection data',
      purpose: 'Capture voter choice',
      color: 'rgba(34,211,238,1)',
      Icon: ClipboardList,
    },
    {
      name: 'Control Unit',
      description: 'The administrative module that manages ballot activation, session control, and polling officer workflow.',
      inputs: 'Officer activation',
      outputs: 'Ballot enable signal',
      purpose: 'Control one voting session',
      color: 'rgba(167,139,250,1)',
      Icon: Cpu,
    },
    {
      name: 'Verification Window',
      description: 'A VVPAT-style concept that helps the voter visually verify their selected choice in this educational demo.',
      inputs: 'Selected vote data',
      outputs: 'Verification display',
      purpose: 'Support transparent verification',
      color: 'rgba(52,211,153,1)',
      Icon: Eye,
    },
  ];

  return (
    <div ref={containerRef} className="relative w-full py-12">
      <motion.div
        className="text-center mb-12"
        initial={{ opacity: 0, y: 20, filter: 'blur(4px)' }}
        animate={isInView ? { opacity: 1, y: 0, filter: 'blur(0px)' } : {}}
        transition={{ duration: 0.55, ease: EASE_OUT }}
      >
        <span className="badge badge-cyan mb-4">
          Interactive System Diagram
        </span>

        <h2 className="text-h1 text-white mt-4">
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-white to-violet-400">
            Machine Anatomy
          </span>
        </h2>

        <p className="text-body-lg text-slate-400 mt-4 max-w-2xl mx-auto">
          Explore the three main components of a simplified EVM-style voting system.
        </p>
      </motion.div>

      <div className="relative max-w-7xl mx-auto px-4">
        <div className="absolute hidden lg:block top-1/2 left-[20%] right-[20%] h-px bg-gradient-to-r from-cyan-400/15 via-violet-400/20 to-emerald-400/15 -z-10" />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {modules.map((module, i) => (
            <motion.div
              key={module.name}
              initial={{ opacity: 0, y: 24, filter: 'blur(4px)' }}
              animate={isInView ? { opacity: 1, y: 0, filter: 'blur(0px)' } : {}}
              transition={{ duration: 0.55, ease: EASE_OUT, delay: i * 0.08 }}
            >
              <MachineModule
                {...module}
                onClick={onModuleClick}
                isActive={activeModule === module.name}
              />
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

const VoteJourneyVisualization = () => {
  const containerRef = useRef(null);
  const isInView = useInView(containerRef, { once: true, margin: '-80px' });

  const stages = [
    { id: 1, name: 'Voter', description: 'Voter arrives at polling station', Icon: User, color: 'rgba(34,211,238,1)' },
    { id: 2, name: 'Verification', description: 'Identity verification process', Icon: BadgeCheck, color: 'rgba(167,139,250,1)' },
    { id: 3, name: 'Activation', description: 'Ballot activated by officer', Icon: KeyRound, color: 'rgba(251,191,36,1)' },
    { id: 4, name: 'Candidate Selection', description: 'Voter selects their choice', Icon: CheckSquare, color: 'rgba(52,211,153,1)' },
    { id: 5, name: 'Recording', description: 'Vote recorded securely', Icon: Database, color: 'rgba(34,211,238,1)' },
    { id: 6, name: 'Verification Slip', description: 'Voter verifies their vote', Icon: Eye, color: 'rgba(167,139,250,1)' },
    { id: 7, name: 'Completion', description: 'Vote casting complete', Icon: Check, color: 'rgba(52,211,153,1)' },
  ];

  return (
    <div ref={containerRef} className="relative w-full py-12">
      <div className="max-w-7xl mx-auto px-4">
        <motion.div
          className="text-center mb-14"
          initial={{ opacity: 0, y: 20, filter: 'blur(4px)' }}
          animate={isInView ? { opacity: 1, y: 0, filter: 'blur(0px)' } : {}}
          transition={{ duration: 0.55, ease: EASE_OUT }}
        >
          <span className="badge badge-violet mb-4">
            Vote Journey
          </span>

          <h2 className="text-h1 text-white mt-4">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-400 via-white to-cyan-400">
              The Vote Journey
            </span>
          </h2>

          <p className="text-body-lg text-slate-400 mt-4 max-w-2xl mx-auto">
            Follow the complete path of a vote from initial contact to final confirmation.
          </p>
        </motion.div>

        <div className="overflow-x-auto pb-6">
          <div className="min-w-[1120px] flex items-start justify-between gap-4 px-2">
            {stages.map((stage, index) => (
              <React.Fragment key={stage.id}>
                <motion.div
                  className="w-36 flex flex-col items-center text-center"
                  initial={{ opacity: 0, y: 20, filter: 'blur(4px)' }}
                  animate={isInView ? { opacity: 1, y: 0, filter: 'blur(0px)' } : {}}
                  transition={{ delay: index * 0.06, duration: 0.45, ease: EASE_OUT }}
                >
                  <motion.div
                    className="w-12 h-12 rounded-xl flex items-center justify-center border border-white/12"
                    style={{ background: `${stage.color}12`, borderColor: `${stage.color}25` }}
                    whileHover={{ scale: 1.08, y: -4 }}
                  >
                    <stage.Icon size={20} style={{ color: stage.color }} />
                  </motion.div>

                  <h4 className="mt-4 text-base font-bold text-white leading-tight min-h-[40px] flex items-center">
                    {stage.name}
                  </h4>

                  <p className="mt-2 text-sm text-gray-400 leading-relaxed min-h-[46px]">
                    {stage.description}
                  </p>

                  <div className="mt-4 px-4 py-1 rounded-full bg-cyan-500/10 border border-cyan-400/20 text-xs text-cyan-300 font-mono">
                    Step {stage.id}
                  </div>
                </motion.div>

                {index < stages.length - 1 && (
                  <motion.div
                    className="pt-4 flex items-center justify-center text-cyan-300"
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: isInView ? 1 : 0, x: isInView ? 0 : -10 }}
                    transition={{ delay: 0.35 + index * 0.08, duration: 0.4 }}
                  >
                    <motion.div
                      animate={{ x: [0, 7, 0] }}
                      transition={{ duration: 1.4, repeat: Infinity, ease: 'easeInOut' }}
                      className="w-10 h-10 rounded-full bg-white/5 border border-cyan-400/20 flex items-center justify-center"
                    >
                      <ArrowRight size={22} />
                    </motion.div>
                  </motion.div>
                )}
              </React.Fragment>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

const SecurityLayersVisualization = () => {
  const containerRef = useRef(null);
  const isInView = useInView(containerRef, { once: true, margin: '-80px' });
  const [expandedLayer, setExpandedLayer] = useState(null);

  // Dark cards with left-border accent — no colorful backgrounds
  const layers = [
    {
      id: 1,
      name: 'Physical Controls',
      description: 'Hardware-level protections including sealed enclosures, tamper-evident seals, controlled access, and supervised handling at every stage — from storage to transport to the polling station.',
      accentColor: '#fbbf24',          // amber
      accentGlow: 'rgba(251,191,36,0.12)',
      borderClass: 'border-l-amber-400',
      badgeClass: 'bg-amber-400/10 text-amber-300 border-amber-400/25',
      Icon: Lock,
      facts: ['Sealed storage', 'Chain of custody', 'Physical witnesses']
    },
    {
      id: 2,
      name: 'Operational Procedures',
      description: 'Strict, documented workflows for every step — machine setup, activation, the voting session, shutdown, and secure custody after polling ends. Multiple officers participate at each stage.',
      accentColor: '#22d3ee',
      accentGlow: 'rgba(34,211,238,0.12)',
      borderClass: 'border-l-cyan-400',
      badgeClass: 'bg-cyan-400/10 text-cyan-300 border-cyan-400/25',
      Icon: ListChecks,
      facts: ['Multi-officer sign-off', 'Mock polling required', 'Documented steps']
    },
    {
      id: 3,
      name: 'Verification Mechanisms',
      description: 'VVPAT prints a paper slip for every vote cast. The voter can see it through a transparent window for 7 seconds before it drops into a sealed box — an observable, physical record separate from the electronic count.',
      accentColor: '#34d399',
      accentGlow: 'rgba(52,211,153,0.12)',
      borderClass: 'border-l-emerald-400',
      badgeClass: 'bg-emerald-400/10 text-emerald-300 border-emerald-400/25',
      Icon: Search,
      facts: ['VVPAT paper trail', '7-second visual verify', 'Sealed paper box']
    },
    {
      id: 4,
      name: 'Audit Processes',
      description: 'Post-election verification, random VVPAT audits, count cross-checking, and formal review procedures allow election authorities and candidates to challenge and verify final results.',
      accentColor: '#a78bfa',
      accentGlow: 'rgba(167,139,250,0.12)',
      borderClass: 'border-l-violet-400',
      badgeClass: 'bg-violet-400/10 text-violet-300 border-violet-400/25',
      Icon: BarChart3,
      facts: ['Random VVPAT audits', 'Cross-candidate observers', 'Dispute procedures']
    }
  ];

  return (
    <div ref={containerRef} className="relative w-full py-12">
      <div className="max-w-4xl mx-auto px-4">
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20, filter: 'blur(4px)' }}
          animate={isInView ? { opacity: 1, y: 0, filter: 'blur(0px)' } : {}}
          transition={{ duration: 0.55, ease: EASE_OUT }}
        >
          <span className="badge badge-emerald mb-4">
            Security Architecture
          </span>

          <h2 className="text-h1 text-white mt-4">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-white to-cyan-400">
              Why Hacking Is Harder Than You Think
            </span>
          </h2>

          <p className="text-body-lg text-slate-400 mt-4 max-w-2xl mx-auto">
            Security isn't just software. Four independent layers work together — each one alone would not be enough.
          </p>
        </motion.div>

        <div className="space-y-4">
          {layers.map((layer, index) => {
            const isOpen = expandedLayer === layer.id;
            return (
              <motion.div
                key={layer.id}
                initial={{ opacity: 0, y: 20, filter: 'blur(4px)' }}
                animate={isInView ? { opacity: 1, y: 0, filter: 'blur(0px)' } : {}}
                transition={{ delay: index * 0.07, duration: 0.5, ease: EASE_OUT }}
              >
                <motion.div
                  className={`relative w-full rounded-xl overflow-hidden cursor-pointer border-l-[3px] ${layer.borderClass}`}
                  style={{
                    background: isOpen
                      ? `linear-gradient(135deg, ${layer.accentGlow}, rgba(18,18,31,0.95))`
                      : 'rgba(18,18,31,0.8)',
                    boxShadow: isOpen
                      ? `0 0 0 1px rgba(255,255,255,0.08), 0 0 24px ${layer.accentGlow}, 0 4px 20px rgba(0,0,0,0.5)`
                      : '0 0 0 1px rgba(255,255,255,0.05), 0 4px 20px rgba(0,0,0,0.4)',
                  }}
                  onClick={() => setExpandedLayer(isOpen ? null : layer.id)}
                  whileHover={{ x: 2, transition: { duration: 0.15, ease: [0.23,1,0.32,1] } }}
                  whileTap={{ scale: 0.99, transition: { duration: 0.1 } }}
                  layout
                  transition={{ layout: { duration: 0.35, ease: [0.23,1,0.32,1] } }}
                >
                  {/* Header row */}
                  <div className="flex items-center gap-4 p-5">
                    <div
                      className="w-11 h-11 rounded-lg flex items-center justify-center flex-shrink-0"
                      style={{ background: layer.accentGlow, border: `1px solid ${layer.accentColor}30` }}
                    >
                      <layer.Icon size={18} style={{ color: layer.accentColor }} />
                    </div>

                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-3">
                        <span className={`text-xs font-mono px-2 py-0.5 rounded-full border ${layer.badgeClass}`}>
                          Layer {layer.id}
                        </span>
                        <h3 className="text-base font-semibold text-white">{layer.name}</h3>
                      </div>

                      {/* Inline facts — visible when collapsed */}
                      {!isOpen && (
                        <motion.div
                          className="flex gap-3 mt-1.5"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          transition={{ duration: 0.2 }}
                        >
                          {layer.facts.map((fact) => (
                            <span key={fact} className="text-xs text-slate-500">{fact}</span>
                          ))}
                        </motion.div>
                      )}
                    </div>

                    <motion.div
                      className="w-8 h-8 rounded-lg flex items-center justify-center text-slate-400 flex-shrink-0"
                      style={{ background: 'rgba(255,255,255,0.05)' }}
                      animate={{ rotate: isOpen ? 45 : 0 }}
                      transition={{ duration: 0.25, ease: [0.23,1,0.32,1] }}
                    >
                      <Plus size={14} />
                    </motion.div>
                  </div>

                  {/* Expanded content */}
                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0, transition: { duration: 0.2, ease: 'easeIn' } }}
                        transition={{ duration: 0.35, ease: [0.23,1,0.32,1] }}
                        className="overflow-hidden"
                      >
                        <div className="px-5 pb-5 pt-0 border-t border-white/[0.06]">
                          <p className="text-slate-300 text-sm leading-relaxed mt-4">
                            {layer.description}
                          </p>
                          <div className="flex flex-wrap gap-2 mt-4">
                            {layer.facts.map((fact) => (
                              <span
                                key={fact}
                                className={`text-xs px-3 py-1 rounded-full border ${layer.badgeClass}`}
                              >
                                ✓ {fact}
                              </span>
                            ))}
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              </motion.div>
            );
          })}
        </div>

        {/* Bottom callout */}
        <motion.div
          className="mt-8 p-5 rounded-xl text-center"
          style={{ background: 'rgba(34,211,238,0.04)', border: '1px solid rgba(34,211,238,0.12)' }}
          initial={{ opacity: 0, y: 16 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.5, duration: 0.5, ease: EASE_OUT }}
        >
          <p className="text-slate-300 text-sm">
            <span className="text-cyan-400 font-semibold">All four layers are independent.</span>{' '}
            Bypassing one doesn't neutralize the others — each catches what the others miss.
          </p>
        </motion.div>
      </div>
    </div>
  );
};

const TechnologyVsAssumptions = () => {
  const containerRef = useRef(null);
  const isInView = useInView(containerRef, { once: false, margin: '-100px' });
  const [activeCard, setActiveCard] = useState(null);

  const comparisonCards = [
    {
      id: 1,
      claim: '"The machine can be hacked with a simple Python script."',
      check: 'Not accurate',
      evidence: 'Real systems involve hardware, procedures, physical access, and verification layers.',
      explanation: 'Programming is useful, but understanding real-world systems requires architecture, process, and security knowledge.',
      category: 'Systems Thinking'
    },
    {
      id: 2,
      claim: '"Every electronic machine is connected to the internet."',
      check: 'False assumption',
      evidence: 'Many embedded systems operate without public network connectivity.',
      explanation: 'Connectivity depends on system design. Not every device works like a phone, website, or cloud app.',
      category: 'Technical Accuracy'
    },
    {
      id: 3,
      claim: '"If I know coding, I can hack anything."',
      check: 'Oversimplified',
      evidence: 'Security involves networks, hardware, operating systems, protocols, and physical controls.',
      explanation: 'A single script is not the same as understanding a complete system.',
      category: 'Security Basics'
    },
    {
      id: 4,
      claim: '"Security is only software."',
      check: 'Incomplete',
      evidence: 'Operational processes and physical controls are also important.',
      explanation: 'Real systems combine technology, people, procedures, and verification.',
      category: 'Security Layers'
    }
  ];

  return (
    <motion.div
      ref={containerRef}
      className="relative w-full py-16"
      initial={{ opacity: 0 }}
      animate={{ opacity: isInView ? 1 : 0 }}
      transition={{ duration: 0.6 }}
    >
      <div className="max-w-7xl mx-auto px-4">
        <motion.div className="text-center mb-12">
          <span className="inline-block px-4 py-1.5 bg-white/5 backdrop-blur-md rounded-full text-sm font-medium text-yellow-300 border border-yellow-500/20 mb-4">
            Critical Thinking
          </span>

          <h2 className="text-4xl md:text-5xl font-bold text-white">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 via-white to-orange-400">
              Technology vs Assumptions
            </span>
          </h2>

          <p className="text-lg text-gray-400 mt-4 max-w-2xl mx-auto">
            Examine common assumptions and compare them with systems thinking.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {comparisonCards.map((card, index) => (
            <motion.div
              key={card.id}
              className={`relative rounded-2xl border border-white/10 overflow-hidden bg-white/[0.04] backdrop-blur-xl ${
                activeCard === card.id ? 'ring-2 ring-cyan-500/30' : ''
              }`}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: isInView ? 1 : 0, y: isInView ? 0 : 30 }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              onClick={() => setActiveCard(activeCard === card.id ? null : card.id)}
              whileHover={{ y: -5, scale: 1.02 }}
            >
              <div className="p-6 border-b border-white/10">
                <span className="inline-block px-3 py-1 rounded-full text-xs font-medium bg-cyan-500/10 text-cyan-300 border border-cyan-400/10">
                  {card.category}
                </span>

                <h3 className="text-lg font-bold text-white mt-4">
                  {card.claim}
                </h3>
              </div>

              <div className="p-6">
                <div className="mb-4 p-4 rounded-xl bg-white/5 border border-white/10">
                  <p className="text-lg font-semibold text-white">{card.check}</p>
                </div>

                <h4 className="text-sm font-semibold text-cyan-300 mb-2">Evidence</h4>
                <p className="text-gray-400 text-sm leading-relaxed">{card.evidence}</p>

                {activeCard === card.id && (
                  <motion.div
                    className="mt-4 p-4 rounded-xl bg-gradient-to-r from-cyan-500/5 to-purple-500/5 border border-cyan-500/20"
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                  >
                    <h4 className="text-sm font-semibold text-purple-300 mb-2">
                      Explanation
                    </h4>
                    <p className="text-gray-300 text-sm leading-relaxed">
                      {card.explanation}
                    </p>
                  </motion.div>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.div>
  );
};

const InsideTheMachine = () => {
  const [activeModule, setActiveModule] = useState(null);

  return (
   <section
  id="inside-machine"
  className="relative w-full bg-gradient-to-br from-[#0a0a0f] via-[#0d0d15] to-[#11111a] overflow-hidden"
>
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0 cyber-grid opacity-20" />
        <motion.div
          className="absolute top-1/4 left-10 w-72 h-72 bg-purple-600/10 rounded-full blur-3xl"
          animate={{ x: [0, 50, 0], y: [0, -30, 0], opacity: [0.1, 0.2, 0.1] }}
          transition={{ duration: 8, repeat: Infinity }}
        />
        <motion.div
          className="absolute bottom-1/4 right-10 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl"
          animate={{ x: [0, -40, 0], y: [0, 40, 0], opacity: [0.05, 0.15, 0.05] }}
          transition={{ duration: 10, repeat: Infinity }}
        />
      </div>

      <div className="relative z-10 pt-16">

        {activeModule && (
          <motion.div
            className="fixed inset-0 z-50 flex items-start justify-center pt-24 px-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            {/* Backdrop */}
            <div
              className="absolute inset-0 bg-black/50 backdrop-blur-sm"
              onClick={() => setActiveModule(null)}
            />
            <motion.div
              className="relative w-full max-w-2xl"
              initial={{ y: -40, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ type: 'spring', stiffness: 300, damping: 28 }}
            >
              <div className="rounded-2xl bg-[#101827]/95 backdrop-blur-xl border border-white/20 shadow-2xl overflow-hidden">
                <div className="p-6 border-b border-white/10 flex items-center justify-between">
                  <h3 className="text-xl font-bold text-white">{activeModule}</h3>

                  <button
                    onClick={() => setActiveModule(null)}
                    className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center border border-white/20 hover:bg-white/20 text-white"
                  >
                    <X size={14} />
                  </button>
                </div>

                <div className="p-6">
                  <p className="text-gray-300 leading-relaxed">
                    {activeModule === 'Ballot Unit' &&
                      'The Ballot Unit is the voter-facing component where selections are made in this simplified educational model.'}
                    {activeModule === 'Control Unit' &&
                      'The Control Unit manages ballot activation and controls one voting session in this simplified educational model.'}
                    {activeModule === 'Verification Window' &&
                      'The Verification Window shows a VVPAT-style confirmation concept for educational understanding.'}
                  </p>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}

        <div className="space-y-8">
          <MachineAnatomy activeModule={activeModule} onModuleClick={setActiveModule} />
          <VoteJourneyVisualization />
          <SecurityLayersVisualization />
          <TechnologyVsAssumptions />
        </div>
      </div>
    </section>
  );
};

export default InsideTheMachine;