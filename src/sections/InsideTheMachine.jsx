import React, { useState, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

const MachineModule = ({
  name,
  description,
  inputs,
  outputs,
  purpose,
  color,
  onClick,
  isActive,
  icon
}) => {
  const moduleRef = useRef(null);
  const isInView = useInView(moduleRef, { once: false, margin: '-100px' });

  return (
    <motion.div
      ref={moduleRef}
      className="relative"
      initial={{ opacity: 0, y: 40, scale: 0.95 }}
      animate={isInView ? { opacity: 1, y: 0, scale: 1 } : { opacity: 0, y: 40, scale: 0.95 }}
      transition={{ duration: 0.6 }}
    >
      <motion.div
        className="relative w-full max-w-sm min-h-[380px] rounded-2xl border border-white/10 p-7 cursor-pointer overflow-hidden bg-[#111827]/70 backdrop-blur-xl"
        onClick={() => onClick(name)}
        whileHover={{ y: -6, scale: 1.02, borderColor: 'rgba(6,182,212,0.45)' }}
      >
        <motion.div
          className="absolute inset-0 rounded-2xl"
          style={{
            background: `radial-gradient(circle at top, ${color}22, transparent 65%)`
          }}
          animate={isActive ? { opacity: [0.45, 0.9, 0.45] } : { opacity: 0.35 }}
          transition={{ duration: 2, repeat: Infinity }}
        />

        <div className="relative z-10">
          <div className="flex items-center justify-between gap-4 mb-5">
            <div className="flex items-center gap-3">
              <motion.div
                className="w-12 h-12 rounded-xl bg-white/10 flex items-center justify-center border border-white/15"
                whileHover={{ rotate: [0, 6, -6, 0] }}
              >
                <span className="text-2xl">{icon}</span>
              </motion.div>

              <h3 className="text-xl font-bold text-white" style={{ color }}>
                {name}
              </h3>
            </div>

            <motion.div
              className="w-3 h-3 rounded-full"
              style={{ backgroundColor: isActive ? color : 'rgba(255,255,255,0.25)' }}
              animate={
                isActive
                  ? {
                      boxShadow: [`0 0 10px ${color}`, `0 0 22px ${color}`, `0 0 10px ${color}`],
                      scale: [1, 1.2, 1]
                    }
                  : {}
              }
              transition={{ duration: 1.3, repeat: Infinity }}
            />
          </div>

          <div className="h-px w-full bg-gradient-to-r from-transparent via-white/20 to-transparent mb-5" />

          <p className="text-sm text-gray-400 leading-relaxed mb-5">
            {description}
          </p>

          <div className="space-y-3">
            <div className="rounded-xl bg-cyan-500/5 border border-cyan-400/10 p-3">
              <p className="text-xs text-cyan-300 font-semibold mb-1">Input</p>
              <p className="text-xs text-gray-300 leading-relaxed">{inputs}</p>
            </div>

            <div className="rounded-xl bg-purple-500/5 border border-purple-400/10 p-3">
              <p className="text-xs text-purple-300 font-semibold mb-1">Output</p>
              <p className="text-xs text-gray-300 leading-relaxed">{outputs}</p>
            </div>

            <div className="rounded-xl bg-green-500/5 border border-green-400/10 p-3">
              <p className="text-xs text-green-300 font-semibold mb-1">Purpose</p>
              <p className="text-xs text-gray-300 leading-relaxed">{purpose}</p>
            </div>
          </div>
        </div>

        <div className="absolute -top-1 -left-1 w-4 h-4 border-l-2 border-t-2 border-cyan-500/40 rounded-br" />
        <div className="absolute -bottom-1 -left-1 w-4 h-4 border-l-2 border-b-2 border-cyan-500/40 rounded-tr" />
        <div className="absolute -top-1 -right-1 w-4 h-4 border-r-2 border-t-2 border-purple-500/40 rounded-bl" />
        <div className="absolute -bottom-1 -right-1 w-4 h-4 border-r-2 border-b-2 border-purple-500/40 rounded-tl" />
      </motion.div>
    </motion.div>
  );
};

const MachineAnatomy = ({ activeModule, onModuleClick }) => {
  const containerRef = useRef(null);
  const isInView = useInView(containerRef, { once: false, margin: '-100px' });

  const modules = [
    {
      name: 'Ballot Unit',
      description: 'The voter-facing interface where selections are made. It displays candidate information and captures the voter choice.',
      inputs: 'Voter interaction',
      outputs: 'Vote selection data',
      purpose: 'Capture voter choice',
      color: 'rgba(6, 182, 212, 1)',
      icon: '🗳️'
    },
    {
      name: 'Control Unit',
      description: 'The administrative module that manages ballot activation, session control, and polling officer workflow.',
      inputs: 'Officer activation',
      outputs: 'Ballot enable signal',
      purpose: 'Control one voting session',
      color: 'rgba(168, 85, 247, 1)',
      icon: '🎛️'
    },
    {
      name: 'Verification Window',
      description: 'A VVPAT-style concept that helps the voter visually verify their selected choice in this educational demo.',
      inputs: 'Selected vote data',
      outputs: 'Verification display',
      purpose: 'Support transparent verification',
      color: 'rgba(16, 185, 129, 1)',
      icon: '👁️'
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
      <motion.div className="text-center mb-12">
        <span className="inline-block px-4 py-1.5 bg-white/5 backdrop-blur-md rounded-full text-sm font-medium text-cyan-300 border border-cyan-500/20 mb-4">
          Interactive System Diagram
        </span>

        <h2 className="text-4xl md:text-5xl font-bold text-white">
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-white to-purple-400">
            Machine Anatomy
          </span>
        </h2>

        <p className="text-lg text-gray-400 mt-4 max-w-2xl mx-auto">
          Explore the three main components of a simplified EVM-style voting system.
        </p>
      </motion.div>

      <div className="relative max-w-7xl mx-auto px-4">
        <div className="absolute hidden lg:block top-1/2 left-[20%] right-[20%] h-px bg-gradient-to-r from-cyan-400/20 via-purple-400/30 to-green-400/20 -z-10" />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {modules.map((module) => (
            <MachineModule
              key={module.name}
              {...module}
              onClick={onModuleClick}
              isActive={activeModule === module.name}
            />
          ))}
        </div>
      </div>
    </motion.div>
  );
};

const VoteJourneyVisualization = () => {
  const containerRef = useRef(null);
  const isInView = useInView(containerRef, { once: false, margin: '-100px' });

  const stages = [
    { id: 1, name: 'Voter', description: 'Voter arrives at polling station', icon: '👤' },
    { id: 2, name: 'Verification', description: 'Identity verification process', icon: '🆔' },
    { id: 3, name: 'Activation', description: 'Ballot activated by officer', icon: '🔑' },
    { id: 4, name: 'Candidate Selection', description: 'Voter selects their choice', icon: '✅' },
    { id: 5, name: 'Recording', description: 'Vote recorded securely', icon: '💾' },
    { id: 6, name: 'Verification Slip', description: 'Voter verifies their vote', icon: '👀' },
    { id: 7, name: 'Completion', description: 'Vote casting complete', icon: '✓' }
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
        <motion.div className="text-center mb-14">
          <span className="inline-block px-4 py-1.5 bg-white/5 backdrop-blur-md rounded-full text-sm font-medium text-purple-300 border border-purple-500/20 mb-4">
            Vote Journey
          </span>

          <h2 className="text-4xl md:text-5xl font-bold text-white">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-white to-cyan-400">
              The Vote Journey
            </span>
          </h2>

          <p className="text-lg text-gray-400 mt-4 max-w-2xl mx-auto">
            Follow the complete path of a vote from initial contact to final confirmation.
          </p>
        </motion.div>

        <div className="overflow-x-auto pb-6">
          <div className="min-w-[1120px] flex items-start justify-between gap-4 px-2">
            {stages.map((stage, index) => (
              <React.Fragment key={stage.id}>
                <motion.div
                  className="w-36 flex flex-col items-center text-center"
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: isInView ? 1 : 0, y: isInView ? 0 : 30 }}
                  transition={{ delay: index * 0.08, duration: 0.45 }}
                >
                  <motion.div
                    className="w-14 h-14 rounded-2xl bg-gradient-to-br from-cyan-500/20 to-purple-500/20 flex items-center justify-center border border-white/20 shadow-lg shadow-cyan-500/10"
                    whileHover={{ scale: 1.08, y: -4 }}
                  >
                    <span className="text-2xl">{stage.icon}</span>
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
    </motion.div>
  );
};

const SecurityLayersVisualization = () => {
  const containerRef = useRef(null);
  const isInView = useInView(containerRef, { once: false, margin: '-100px' });
  const [expandedLayer, setExpandedLayer] = useState(null);

  const layers = [
    {
      id: 1,
      name: 'Physical Controls',
      description: 'Hardware-level protections including sealed enclosures, controlled access, and supervised handling.',
      color: 'from-orange-400 to-red-400',
      icon: '🔒'
    },
    {
      id: 2,
      name: 'Operational Procedures',
      description: 'Defined workflows for setup, activation, voting, shutdown, and custody of the system.',
      color: 'from-blue-400 to-cyan-400',
      icon: '📋'
    },
    {
      id: 3,
      name: 'Verification Mechanisms',
      description: 'Processes that help confirm the voter choice and support transparent verification.',
      color: 'from-green-400 to-emerald-400',
      icon: '🔍'
    },
    {
      id: 4,
      name: 'Audit Processes',
      description: 'Post-process verification, audit trails, and review procedures that help validate outcomes.',
      color: 'from-purple-400 to-pink-400',
      icon: '📊'
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
      <div className="max-w-6xl mx-auto px-4">
        <motion.div className="text-center mb-12">
          <span className="inline-block px-4 py-1.5 bg-white/5 backdrop-blur-md rounded-full text-sm font-medium text-green-300 border border-green-500/20 mb-4">
            Security Architecture
          </span>

          <h2 className="text-4xl md:text-5xl font-bold text-white">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-400 via-white to-cyan-400">
              Security Layers
            </span>
          </h2>

          <p className="text-lg text-gray-400 mt-4 max-w-2xl mx-auto">
            Multiple layers work together: technology, physical controls, procedures, and verification.
          </p>
        </motion.div>

        <div className="space-y-5">
          {layers.map((layer, index) => (
            <motion.div
              key={layer.id}
              className={`relative w-full max-w-3xl mx-auto rounded-2xl border border-white/10 overflow-hidden bg-white/[0.04] backdrop-blur-xl ${
                expandedLayer === layer.id ? 'ring-2 ring-cyan-500/30' : ''
              }`}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: isInView ? 1 : 0, y: isInView ? 0 : 30 }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              onClick={() => setExpandedLayer(expandedLayer === layer.id ? null : layer.id)}
              whileHover={{ scale: 1.01, borderColor: 'rgba(6,182,212,0.35)' }}
            >
              <div className={`flex items-center gap-4 p-6 bg-gradient-to-r ${layer.color} bg-opacity-10`}>
                <div className="w-12 h-12 rounded-xl bg-white/10 flex items-center justify-center border border-white/20">
                  <span className="text-2xl">{layer.icon}</span>
                </div>

                <h3 className="text-xl font-bold text-white">
                  Layer {layer.id}: {layer.name}
                </h3>

                <div className="ml-auto w-8 h-8 rounded-full bg-white/10 flex items-center justify-center border border-white/15 text-white">
                  {expandedLayer === layer.id ? '−' : '+'}
                </div>
              </div>

              {expandedLayer === layer.id && (
                <motion.div
                  className="p-6 border-t border-white/10"
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                >
                  <p className="text-gray-300 leading-relaxed">{layer.description}</p>
                </motion.div>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </motion.div>
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

      <div className="relative z-10">
        <motion.div
          className="text-center py-16 px-4"
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <span className="inline-block px-4 py-1.5 bg-white/5 backdrop-blur-md rounded-full text-sm font-medium text-purple-300 border border-purple-500/20 mb-6">
            Interactive Educational Visualization
          </span>

          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-white to-cyan-400">
              Inside The Machine
            </span>
          </h2>

          <p className="text-lg md:text-xl text-gray-300 max-w-4xl mx-auto leading-relaxed">
            Educational concept visualization. This is not an exact replica of any real election system.
            All explanations are neutral and educational.
          </p>
        </motion.div>

        {activeModule && (
          <motion.div
            className="fixed top-20 left-1/2 -translate-x-1/2 w-[92%] max-w-2xl z-50"
            initial={{ opacity: 0, y: -40 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <div className="rounded-2xl bg-[#101827]/95 backdrop-blur-xl border border-white/20 shadow-2xl overflow-hidden">
              <div className="p-6 border-b border-white/10 flex items-center justify-between">
                <h3 className="text-xl font-bold text-white">{activeModule}</h3>

                <button
                  onClick={() => setActiveModule(null)}
                  className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center border border-white/20 hover:bg-white/20"
                >
                  ×
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