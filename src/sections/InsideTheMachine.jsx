import React, { useState, useRef } from 'react';
import { motion, useInView } from 'framer-motion';

// ============================================
// PART 1: MACHINE ANATOMY
// ============================================

// Machine Module Component
const MachineModule = ({
  name,
  description,
  inputs,
  outputs,
  purpose,
  color,
  position,
  onClick,
  isActive,
  icon
}) => {
  const moduleRef = useRef(null);
  const isInView = useInView(moduleRef, { once: false, margin: '-100px' });

  const moduleVariants = {
    hidden: { opacity: 0, y: 50, scale: 0.9 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: { duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }
    }
  };

  const hoverVariants = {
    rest: { scale: 1, y: 0 },
    hover: { scale: 1.02, y: -5, zIndex: 10 }
  };

  return (
    <motion.div
      ref={moduleRef}
      className="relative"
      style={{ x: position.x, y: position.y }}
      variants={moduleVariants}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
    >
      {/* Connection Point */}
      <motion.div
        className="absolute -top-8 left-1/2 -translate-x-1/2 w-4 h-4 rounded-full bg-gradient-to-br from-cyan-500 to-purple-500 border-2 border-white/20"
        animate={isActive ? {
          boxShadow: ['0 0 10px rgba(6, 182, 212, 0.5)', '0 0 20px rgba(168, 85, 247, 0.5)']
        } : { opacity: 0.3 }}
        transition={{ duration: 1, repeat: Infinity }}
      />

      {/* Module Card */}
      <motion.div
        className={`relative w-64 h-80 rounded-2xl machine-panel-glow border border-${color}-500/20 p-6 cursor-pointer transition-all duration-300`}
        onClick={() => onClick(name)}
        variants={hoverVariants}
        whileHover="hover"
        style={{
          background: `linear-gradient(145deg, rgba(26, 26, 36, 0.8), rgba(13, 13, 21, 0.8)), linear-gradient(135deg, ${color}/05, ${color}/02)`
        }}
      >
        {/* Outer Glow */}
        <motion.div
          className="absolute inset-0 rounded-2xl"
          style={{
            background: `radial-gradient(circle at center, ${color}/10, transparent 70%)`
          }}
          animate={isActive ? { opacity: [0.5, 1, 0.5] } : { opacity: 0.3 }}
          transition={{ duration: 2, repeat: Infinity }}
        />

        {/* Header */}
        <div className="relative z-10 mb-4">
          <motion.div
            className="flex items-center gap-3"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2, duration: 0.4 }}
          >
            <motion.div
              className="w-10 h-10 rounded-xl bg-gradient-to-br from-white/10 to-white/5 flex items-center justify-center border border-white/20"
              whileHover={{ scale: 1.05, rotate: [0, 5, -5, 0] }}
              transition={{ duration: 1, repeat: Infinity }}
            >
              <span className="text-xl">{icon}</span>
            </motion.div>
            <motion.h3
              className="text-lg font-bold text-white"
              style={{ color }}
            >
              {name}
            </motion.h3>
          </motion.div>

          {/* Status Indicator */}
          <motion.div
            className="absolute top-0 right-4 w-3 h-3 rounded-full"
            style={{ backgroundColor: isActive ? color : 'rgba(255, 255, 255, 0.2)' }}
            animate={isActive ? {
              boxShadow: [`0 0 10px ${color}`, `0 0 20px ${color}`],
              scale: [1, 1.1, 1]
            } : {}}
            transition={{ duration: 1, repeat: Infinity }}
          />
        </div>

        {/* Divider */}
        <div className="relative z-10 w-full h-0.5 bg-gradient-to-r from-white/10 to-white/20 mb-4" />

        {/* Content */}
        <div className="relative z-10 space-y-3">
          <motion.p
            className="text-sm text-gray-400"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.4 }}
          >
            {description}
          </motion.p>

          {/* Info Badges */}
          <motion.div
            className="space-y-2"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.4 }}
          >
            <motion.div
              className="flex items-center gap-2 text-xs text-cyan-300"
              whileHover={{ x: 5 }}
            >
              <span className="w-2 h-2 rounded-full bg-cyan-400" />
              <span>Input: {inputs}</span>
            </motion.div>
            <motion.div
              className="flex items-center gap-2 text-xs text-purple-300"
              whileHover={{ x: 5 }}
            >
              <span className="w-2 h-2 rounded-full bg-purple-400" />
              <span>Output: {outputs}</span>
            </motion.div>
            <motion.div
              className="flex items-center gap-2 text-xs text-green-300"
              whileHover={{ x: 5 }}
            >
              <span className="w-2 h-2 rounded-full bg-green-400" />
              <span>Purpose: {purpose}</span>
            </motion.div>
          </motion.div>
        </div>

        {/* Click Hint */}
        <motion.div
          className="absolute bottom-4 left-0 right-0 text-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: [0.3, 0.8, 0.3] }}
          transition={{ duration: 2, repeat: Infinity, delay: 1 }}
        >
          <span className="text-xs text-white/50 font-mono">Click to explore</span>
        </motion.div>

        {/* Corner Accents */}
        <div className="absolute -top-1 -left-1 w-3 h-3 border-l-2 border-t-2 border-cyan-500/30 rounded-br" />
        <div className="absolute -bottom-1 -left-1 w-3 h-3 border-l-2 border-b-2 border-cyan-500/30 rounded-tr" />
        <div className="absolute -top-1 -right-1 w-3 h-3 border-r-2 border-t-2 border-purple-500/30 rounded-bl" />
        <div className="absolute -bottom-1 -right-1 w-3 h-3 border-r-2 border-b-2 border-purple-500/30 rounded-tl" />
      </motion.div>
    </motion.div>
  );
};

// Machine Anatomy Section
const MachineAnatomy = ({ activeModule, onModuleClick }) => {
  const containerRef = useRef(null);
  const isInView = useInView(containerRef, { once: false, margin: '-100px' });

  const modules = [
    {
      name: 'Ballot Unit',
      description: 'The primary interface where voters make their selection. Displays candidate information and captures vote choices.',
      inputs: 'Voter Interaction, Touch Input',
      outputs: 'Vote Selection Data',
      purpose: 'Capture and validate voter choices',
      color: 'rgba(6, 182, 212)',
      icon: '🗳️',
      position: { x: -200, y: 0 }
    },
    {
      name: 'Control Unit',
      description: 'The administrative module that manages ballot activation, verifies polling officer credentials, and controls the voting session.',
      inputs: 'Officer Authentication, Session Parameters',
      outputs: 'Ballot Activation, Session Control',
      purpose: 'Manage voting session and authentication',
      color: 'rgba(168, 85, 247)',
      icon: '🎛️',
      position: { x: 0, y: 0 }
    },
    {
      name: 'Verification Window',
      description: 'VVPAT-style concept that provides voters with a physical or visual confirmation of their vote before final submission.',
      inputs: 'Vote Data, Confirmation Request',
      outputs: 'Verified Vote Record, Voter Confirmation',
      purpose: 'Enable voter verification and audit trail',
      color: 'rgba(16, 185, 129)',
      icon: '👁️',
      position: { x: 200, y: 0 }
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
      {/* Background Connection Lines */}
      <svg
        className="absolute inset-0 w-full h-full -z-10"
        viewBox="0 0 800 400"
        preserveAspectRatio="none"
      >
        {/* Connection lines between modules */}
        <motion.path
          d="M 200 200 Q 400 100 600 200"
          fill="none"
          stroke="rgba(6, 182, 212, 0.1)"
          strokeWidth="2"
          animate={activeModule ? {
            stroke: ['rgba(6, 182, 212, 0.1)', 'rgba(6, 182, 212, 0.3)']
          } : {}}
          transition={{ duration: 2, repeat: Infinity }}
        />
        <motion.path
          d="M 400 200 Q 400 300 400 400"
          fill="none"
          stroke="rgba(168, 85, 247, 0.1)"
          strokeWidth="2"
          animate={activeModule ? {
            stroke: ['rgba(168, 85, 247, 0.1)', 'rgba(168, 85, 247, 0.3)']
          } : {}}
          transition={{ duration: 2, repeat: Infinity, delay: 0.5 }}
        />
        <motion.path
          d="M 600 200 Q 400 100 200 200"
          fill="none"
          stroke="rgba(16, 185, 129, 0.1)"
          strokeWidth="2"
          animate={activeModule ? {
            stroke: ['rgba(16, 185, 129, 0.1)', 'rgba(16, 185, 129, 0.3)']
          } : {}}
          transition={{ duration: 2, repeat: Infinity, delay: 1 }}
        />
      </svg>

      {/* Modules Container */}
      <div className="relative flex justify-center items-center gap-8">
        {modules.map((module, index) => (
          <MachineModule
            key={index}
            {...module}
            onClick={onModuleClick}
            isActive={activeModule === module.name}
          />
        ))}
      </div>

      {/* Section Title */}
      <motion.div
        className="text-center mb-8"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.6 }}
      >
        <motion.span
          className="inline-block px-4 py-1.5 bg-white/5 backdrop-blur-md rounded-full text-sm font-medium text-cyan-300 border border-cyan-500/20 mb-4"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.3 }}
        >
          Interactive System Diagram
        </motion.span>
        <motion.h2
          className="text-4xl md:text-5xl font-bold text-white"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-white to-purple-400">
            Machine Anatomy
          </span>
        </motion.h2>
        <motion.p
          className="text-lg text-gray-400 mt-4 max-w-2xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          Explore the three main components of a simplified EVM-style voting system.
          Click on each module to learn about its function, inputs, outputs, and purpose.
        </motion.p>
      </motion.div>
    </motion.div>
  );
};

// ============================================
// PART 2: VOTE JOURNEY VISUALIZATION
// ============================================

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

  const stageVariants = {
    hidden: { opacity: 0, y: 50, scale: 0.8 },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      scale: 1,
      transition: { delay: i * 0.1, duration: 0.6, ease: 'easeOut' }
    })
  };

  const lineVariants = {
    hidden: { pathLength: 0, opacity: 0 },
    visible: {
      pathLength: 1,
      opacity: 1,
      transition: { duration: 1, delay: 0.5, ease: 'easeInOut' }
    }
  };

  const dotVariants = {
    hidden: { opacity: 0, scale: 0.5 },
    visible: (i) => ({
      opacity: 1,
      scale: 1,
      transition: { delay: 0.5 + i * 0.1, duration: 0.4, ease: 'easeOut' }
    })
  };

  return (
    <motion.div
      ref={containerRef}
      className="relative w-full py-16"
      initial={{ opacity: 0 }}
      animate={{ opacity: isInView ? 1 : 0 }}
      transition={{ duration: 0.6 }}
    >
      <div className="max-w-6xl mx-auto px-4">
        {/* Section Title */}
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
        >
          <motion.span
            className="inline-block px-4 py-1.5 bg-white/5 backdrop-blur-md rounded-full text-sm font-medium text-purple-300 border border-purple-500/20 mb-4"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3 }}
          >
            Vote Journey
          </motion.span>
          <motion.h2
            className="text-4xl md:text-5xl font-bold text-white"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-white to-cyan-400">
              The Vote Journey
            </span>
          </motion.h2>
          <motion.p
            className="text-lg text-gray-400 mt-4 max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
          >
            Follow the complete path of a vote from initial contact to final confirmation.
          </motion.p>
        </motion.div>

        {/* Timeline */}
        <div className="relative">
          {/* Horizontal Timeline Line */}
          <motion.div
            className="absolute top-1/2 left-0 right-0 h-1 -z-10"
            initial={{ scaleX: 0 }}
            animate={{ scaleX: isInView ? 1 : 0 }}
            transition={{ delay: 0.6, duration: 1, ease: 'easeInOut' }}
          >
            <motion.div
              className="h-full bg-gradient-to-r from-cyan-500/20 via-purple-500/20 to-cyan-500/20"
              animate={{ backgroundPosition: ['0% 0%', '100% 0%', '0% 0%'] }}
              transition={{ duration: 3, repeat: Infinity, ease: 'linear' }}
              style={{ backgroundSize: '200% auto' }}
            />
          </motion.div>

          {/* Flow Animation */}
          <motion.div
            className="absolute top-1/2 left-0 right-0 h-1 -z-10"
            animate={{
              background: [
                'linear-gradient(90deg, transparent, rgba(6, 182, 212, 0), transparent)',
                'linear-gradient(90deg, transparent, rgba(6, 182, 212, 0.4), transparent)',
                'linear-gradient(90deg, transparent, rgba(168, 85, 247, 0.4), transparent)',
                'linear-gradient(90deg, transparent, rgba(6, 182, 212, 0), transparent)'
              ]
            }}
            transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
          />

          {/* Stages */}
          <div className="flex justify-between items-center">
            {stages.map((stage, index) => (
              <motion.div
                key={stage.id}
                className="relative flex flex-col items-center"
                custom={index}
                variants={stageVariants}
                initial="hidden"
                animate={isInView ? "visible" : "hidden"}
              >
                {/* Stage Dot */}
                <motion.div
                  className="relative w-16 h-16 rounded-full flex items-center justify-center border-2 border-white/20"
                  variants={dotVariants}
                  custom={index}
                  style={{
                    background: `linear-gradient(135deg, rgba(6, 182, 212, 0.1), rgba(168, 85, 247, 0.1))`
                  }}
                  whileHover={{ scale: 1.1, zIndex: 10 }}
                >
                  <motion.div
                    className="w-12 h-12 rounded-full bg-gradient-to-br from-cyan-500/20 to-purple-500/20 flex items-center justify-center"
                    animate={{ scale: [1, 1.05, 1] }}
                    transition={{ duration: 2, repeat: Infinity, delay: index * 0.1 }}
                  >
                    <motion.span
                      className="text-xl"
                      animate={{ rotate: [0, 10, -10, 0] }}
                      transition={{ duration: 4, repeat: Infinity, delay: index * 0.2 }}
                    >
                      {stage.icon}
                    </motion.span>
                  </motion.div>

                  {/* Outer Ring Animation */}
                  <motion.div
                    className="absolute inset-0 rounded-full border-2"
                    style={{ borderColor: 'rgba(255, 255, 255, 0.1)' }}
                    animate={{
                      borderColor: [
                        'rgba(6, 182, 212, 0.2)',
                        'rgba(168, 85, 247, 0.2)',
                        'rgba(6, 182, 212, 0.2)'
                      ]
                    }}
                    transition={{ duration: 3, repeat: Infinity, delay: index * 0.3 }}
                  />
                </motion.div>

                {/* Stage Label */}
                <motion.div
                  className="mt-4 text-center"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.7 + index * 0.1, duration: 0.4 }}
                >
                  <motion.h4
                    className="text-lg font-bold text-white"
                    whileHover={{ color: 'rgba(168, 85, 247, 1)' }}
                  >
                    {stage.name}
                  </motion.h4>
                  <motion.p
                    className="text-sm text-gray-400 mt-1"
                    whileHover={{ color: 'rgba(255, 255, 255, 0.8)' }}
                  >
                    {stage.description}
                  </motion.p>
                </motion.div>

                {/* Position Number */}
                <motion.div
                  className="absolute -bottom-8 text-xs text-cyan-300 font-mono"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: [0.5, 1, 0.5] }}
                  transition={{ duration: 2, repeat: Infinity, delay: 1 + index * 0.2 }}
                >
                  Step {stage.id}
                </motion.div>
              </motion.div>
            ))}
          </div>

          {/* Connection Arrows */}
          <div className="absolute top-1/2 left-0 right-0 flex justify-between items-center pointer-events-none">
            {stages.slice(0, -1).map((_, index) => (
              <motion.div
                key={index}
                className="w-8 h-8 rounded-full bg-gradient-to-br from-cyan-500/20 to-purple-500/20 flex items-center justify-center"
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.8 + index * 0.1, duration: 0.4 }}
              >
                <motion.span
                  className="text-cyan-300"
                  animate={{ x: [0, 5, 0] }}
                  transition={{ duration: 1, repeat: Infinity, delay: index * 0.2 }}
                >
                  →
                </motion.span>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
};

// ============================================
// PART 3: SECURITY LAYERS VISUALIZATION
// ============================================

const SecurityLayersVisualization = () => {
  const containerRef = useRef(null);
  const isInView = useInView(containerRef, { once: false, margin: '-100px' });

  const [expandedLayer, setExpandedLayer] = useState(null);

  const layers = [
    {
      id: 1,
      name: 'Physical Controls',
      description: 'Hardware-level protections including tamper-evident seals, secure enclosures, and access controls that prevent unauthorized physical access to critical components.',
      color: 'from-orange-400 to-red-400',
      icon: '🔒'
    },
    {
      id: 2,
      name: 'Operational Procedures',
      description: 'Strict protocols and workflows that govern how the system is used, including multi-person verification, chain of custody, and standardized procedures for setup, operation, and shutdown.',
      color: 'from-blue-400 to-cyan-400',
      icon: '📋'
    },
    {
      id: 3,
      name: 'Verification Mechanisms',
      description: 'Technical systems that allow voters to verify their choices before final submission, including VVPAT slips, digital receipts, and real-time confirmation displays.',
      color: 'from-green-400 to-emerald-400',
      icon: '🔍'
    },
    {
      id: 4,
      name: 'Audit Processes',
      description: 'Comprehensive audit trails and post-election procedures including manual counts, random sampling, digital logs, and independent verification to ensure result accuracy.',
      color: 'from-purple-400 to-pink-400',
      icon: '📊'
    }
  ];

  const layerVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      transition: { delay: i * 0.15, duration: 0.6, ease: 'easeOut' }
    })
  };

  const cardVariants = {
    collapsed: { height: 'auto', opacity: 1 },
    expanded: { height: 'auto', opacity: 1 }
  };

  return (
    <motion.div
      ref={containerRef}
      className="relative w-full py-16"
      initial={{ opacity: 0 }}
      animate={{ opacity: isInView ? 1 : 0 }}
      transition={{ duration: 0.6 }}
    >
      <div className="max-w-6xl mx-auto px-4">
        {/* Section Title */}
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
        >
          <motion.span
            className="inline-block px-4 py-1.5 bg-white/5 backdrop-blur-md rounded-full text-sm font-medium text-green-300 border border-green-500/20 mb-4"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3 }}
          >
            Security Architecture
          </motion.span>
          <motion.h2
            className="text-4xl md:text-5xl font-bold text-white"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-400 via-white to-cyan-400">
              Security Layers
            </span>
          </motion.h2>
          <motion.p
            className="text-lg text-gray-400 mt-4 max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
          >
            Multiple layers of protection work together to ensure system integrity.
            Click on each layer to expand and learn more.
          </motion.p>
        </motion.div>

        {/* Layers Stack */}
        <div className="relative">
          {layers.map((layer, index) => (
            <motion.div
              key={layer.id}
              className="relative mb-6"
              custom={index}
              variants={layerVariants}
              initial="hidden"
              animate={isInView ? "visible" : "hidden"}
            >
              {/* Layer Card */}
              <motion.div
                className={`relative w-full max-w-3xl mx-auto rounded-2xl glass-card border border-white/10 overflow-hidden ${expandedLayer === layer.id ? 'ring-2 ring-cyan-500/30' : ''}`}
                onClick={() => setExpandedLayer(expandedLayer === layer.id ? null : layer.id)}
                whileHover={{ scale: 1.01, borderColor: 'rgba(6, 182, 212, 0.3)' }}
                transition={{ duration: 0.3 }}
              >
                {/* Layer Header */}
                <motion.div
                  className={`flex items-center gap-4 p-6 bg-gradient-to-r ${layer.color}/10`}
                  style={{ borderBottom: `1px solid ${layer.color.replace('from-', '').replace(' to-', '').replace('-400', '')}/20` }}
                >
                  <motion.div
                    className="w-12 h-12 rounded-xl bg-gradient-to-br from-white/10 to-white/5 flex items-center justify-center border border-white/20"
                    whileHover={{ scale: 1.05, rotate: [0, 5, -5, 0] }}
                    transition={{ duration: 1, repeat: Infinity }}
                  >
                    <span className="text-2xl">{layer.icon}</span>
                  </motion.div>
                  <motion.h3
                    className="text-xl font-bold text-white"
                    whileHover={{ x: 5 }}
                  >
                    Layer {layer.id}: {layer.name}
                  </motion.h3>
                  <motion.div
                    className="ml-auto w-8 h-8 rounded-full flex items-center justify-center"
                    style={{
                      background: `linear-gradient(135deg, ${layer.color.replace('from-', '').replace(' to-', '').replace('-400', '')}/20)`
                    }}
                    animate={expandedLayer === layer.id ? { rotate: 180 } : { rotate: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <motion.span
                      className="text-white"
                      animate={{ scale: [1, 1.1, 1] }}
                      transition={{ duration: 1, repeat: Infinity }}
                    >
                      {expandedLayer === layer.id ? '−' : '+'}
                    </motion.span>
                  </motion.div>
                </motion.div>

                {/* Layer Content */}
                {expandedLayer === layer.id && (
                  <motion.div
                    className="p-6"
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    transition={{ duration: 0.4, ease: 'easeInOut' }}
                  >
                    <motion.p
                      className="text-gray-300 leading-relaxed"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.1, duration: 0.3 }}
                    >
                      {layer.description}
                    </motion.p>

                    {/* Layer Visualization */}
                    <motion.div
                      className="mt-6 h-32 rounded-xl bg-gradient-to-r from-white/5 to-transparent border border-white/10 flex items-center justify-center"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.2, duration: 0.3 }}
                    >
                      <motion.div
                        className="w-full max-w-md h-20 relative"
                        animate={{ opacity: [0.5, 1, 0.5] }}
                        transition={{ duration: 2, repeat: Infinity }}
                      >
                        {/* Animated bars representing layer activity */}
                        {[...Array(8)].map((_, i) => (
                          <motion.div
                            key={i}
                            className="absolute bottom-0 w-2 rounded-full"
                            style={{
                              left: `${i * 16}%`,
                              height: `${20 + Math.random() * 60}%`,
                              background: `linear-gradient(to top, ${layer.color.replace('from-', '').replace(' to-', '').replace('-400', '')}, ${layer.color.replace('from-', '').replace(' to-', '').replace('-400', '')}/40)`
                            }}
                            animate={{ height: [`${20 + Math.random() * 60}%`, `${40 + Math.random() * 40}%`] }}
                            transition={{ duration: 1 + Math.random() * 2, repeat: Infinity, delay: i * 0.1 }}
                          />
                        ))}
                      </motion.div>
                    </motion.div>

                    {/* Learning Points */}
                    <motion.div
                      className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.3, duration: 0.3 }}
                    >
                      {[
                        { title: 'Prevention', desc: 'Stops threats before they reach the system' },
                        { title: 'Detection', desc: 'Identifies anomalies and potential issues' },
                        { title: 'Response', desc: 'Provides recovery and correction mechanisms' }
                      ].map((point, i) => (
                        <motion.div
                          key={i}
                          className="p-4 rounded-xl bg-white/5 border border-white/10"
                          whileHover={{ scale: 1.02, borderColor: 'rgba(6, 182, 212, 0.3)' }}
                        >
                          <motion.h4
                            className="text-sm font-semibold text-cyan-300 mb-1"
                            whileHover={{ color: 'rgba(168, 85, 247, 1)' }}
                          >
                            {point.title}
                          </motion.h4>
                          <motion.p
                            className="text-xs text-gray-400"
                            whileHover={{ color: 'rgba(255, 255, 255, 0.8)' }}
                          >
                            {point.desc}
                          </motion.p>
                        </motion.div>
                      ))}
                    </motion.div>
                  </motion.div>
                )}

                {/* Layer Number Badge */}
                <motion.div
                  className="absolute top-4 right-4 w-8 h-8 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center border border-white/20"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.4, duration: 0.3 }}
                >
                  <motion.span
                    className="text-sm font-bold text-white"
                    whileHover={{ scale: 1.1 }}
                  >
                    {layer.id}
                  </motion.span>
                </motion.div>

                {/* Corner Accents */}
                <div className="absolute -top-1 -left-1 w-3 h-3 border-l-2 border-t-2 border-cyan-500/30 rounded-br" />
                <div className="absolute -bottom-1 -left-1 w-3 h-3 border-l-2 border-b-2 border-cyan-500/30 rounded-tr" />
                <div className="absolute -top-1 -right-1 w-3 h-3 border-r-2 border-t-2 border-purple-500/30 rounded-bl" />
                <div className="absolute -bottom-1 -right-1 w-3 h-3 border-r-2 border-b-2 border-purple-500/30 rounded-tl" />
              </motion.div>
            </motion.div>
          ))}

          {/* Stack Visualization */}
          <motion.div
            className="absolute right-0 top-0 bottom-0 w-32 hidden lg:flex flex-col justify-center"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 1, duration: 0.6 }}
          >
            <motion.div
              className="relative w-full h-64"
              animate={{ y: [0, -5, 0] }}
              transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
            >
              {layers.map((layer, index) => (
                <motion.div
                  key={layer.id}
                  className="relative w-full h-12 rounded-lg mb-2"
                  style={{
                    background: `linear-gradient(135deg, ${layer.color.replace('from-', '').replace(' to-', '').replace('-400', '')}/20)`
                  }}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 1.2 + index * 0.1, duration: 0.4 }}
                  whileHover={{ scale: 1.02, x: -5 }}
                >
                  <motion.div
                    className="absolute inset-0 rounded-lg border border-white/20"
                    animate={{ borderColor: ['rgba(255, 255, 255, 0.1)', 'rgba(255, 255, 255, 0.3)'] }}
                    transition={{ duration: 2, repeat: Infinity, delay: index * 0.2 }}
                  />
                  <motion.span
                    className="absolute left-2 top-1/2 -translate-y-1/2 text-xs font-bold text-white"
                    whileHover={{ scale: 1.05 }}
                  >
                    {layer.name}
                  </motion.span>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
};

// ============================================
// PART 4: TECHNOLOGY VS ASSUMPTIONS
// ============================================

const TechnologyVsAssumptions = () => {
  const containerRef = useRef(null);
  const isInView = useInView(containerRef, { once: false, margin: '-100px' });

  const [activeCard, setActiveCard] = useState(null);

  const comparisonCards = [
    {
      id: 1,
      claim: '"The machine can be hacked with a simple Python script."',
      check: '❌ Not accurate',
      evidence: 'Real systems have multiple security layers beyond just software',
      explanation: 'Understanding a system requires knowledge of its architecture, communication protocols, physical security, and operational procedures - not just programming skills.',
      category: 'Systems Thinking',
      color: 'from-red-400 to-rose-400'
    },
    {
      id: 2,
      claim: '"If it has a computer chip, it must be connected to the internet."',
      check: '❌ False assumption',
      evidence: 'Many embedded systems operate in isolated environments',
      explanation: 'Embedded systems often use dedicated communication channels, direct connections, or operate completely offline. Connectivity varies based on system design and security requirements.',
      category: 'Technical Accuracy',
      color: 'from-blue-400 to-cyan-400'
    },
    {
      id: 3,
      claim: '"Voting machines use the same technology as ATMs or smartphones."',
      check: '⚠️ Over-simplification',
      evidence: 'Purpose-built systems have different design priorities',
      explanation: 'While they may share some components, voting systems are designed with different priorities: security, auditability, and reliability over an extended period, rather than connectivity and user experience.',
      category: 'Technical Understanding',
      color: 'from-yellow-400 to-orange-400'
    },
    {
      id: 4,
      claim: '"Security through obscurity works if nobody knows how it works."',
      check: '❌ Security principle violation',
      evidence: 'Kerckhoffs\'s principle: security should rely on keys, not secrecy',
      explanation: 'Modern security best practices require that systems be secure even when their design is publicly known. True security comes from robust implementation, not hiding how things work.',
      category: 'Security Principles',
      color: 'from-green-400 to-emerald-400'
    }
  ];

  const cardVariants = {
    hidden: { opacity: 0, y: 50, rotate: -5 },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      rotate: 0,
      transition: { delay: i * 0.15, duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }
    })
  };

  const hoverVariants = {
    rest: { scale: 1, y: 0 },
    hover: { scale: 1.03, y: -5, zIndex: 10 }
  };

  return (
    <motion.div
      ref={containerRef}
      className="relative w-full py-16"
      initial={{ opacity: 0 }}
      animate={{ opacity: isInView ? 1 : 0 }}
      transition={{ duration: 0.6 }}
    >
      <div className="max-w-7xl mx-auto px-4">
        {/* Section Title */}
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
        >
          <motion.span
            className="inline-block px-4 py-1.5 bg-white/5 backdrop-blur-md rounded-full text-sm font-medium text-yellow-300 border border-yellow-500/20 mb-4"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3 }}
          >
            Critical Thinking
          </motion.span>
          <motion.h2
            className="text-4xl md:text-5xl font-bold text-white"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 via-white to-orange-400">
              Technology vs Assumptions
            </span>
          </motion.h2>
          <motion.p
            className="text-lg text-gray-400 mt-4 max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
          >
            Educational concept comparison focusing on systems thinking and technology understanding.
            Examine common assumptions and check them against technical realities.
          </motion.p>
        </motion.div>

        {/* Cards Grid */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 gap-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6, duration: 0.6 }}
        >
          {comparisonCards.map((card, index) => (
            <motion.div
              key={card.id}
              className="relative"
              custom={index}
              variants={cardVariants}
              initial="hidden"
              animate={isInView ? "visible" : "hidden"}
            >
              {/* Card */}
              <motion.div
                className={`relative rounded-2xl glass-card border border-white/10 overflow-hidden ${activeCard === card.id ? 'ring-2 ring-cyan-500/30' : ''}`}
                onClick={() => setActiveCard(activeCard === card.id ? null : card.id)}
                variants={hoverVariants}
                initial="rest"
                whileHover="hover"
              >
                {/* Card Header */}
                <motion.div
                  className={`p-6 bg-gradient-to-r ${card.color}/10`}
                  style={{ borderBottom: `1px solid ${card.color.replace('from-', '').replace(' to-', '').replace('-400', '')}/20` }}
                >
                  <motion.div
                    className="flex items-center justify-between"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.2, duration: 0.4 }}
                  >
                    <motion.span
                      className="inline-block px-3 py-1 rounded-full text-xs font-medium"
                      style={{
                        background: `linear-gradient(135deg, ${card.color.replace('from-', '').replace(' to-', '').replace('-400', '')}/20)`,
                        color: card.color.replace('from-', '').replace(' to-', '').replace('-400', '')
                      }}
                      whileHover={{ scale: 1.05 }}
                    >
                      {card.category}
                    </motion.span>
                    <motion.div
                      className="w-8 h-8 rounded-full flex items-center justify-center"
                      style={{
                        background: `linear-gradient(135deg, ${card.color.replace('from-', '').replace(' to-', '').replace('-400', '')}/20)`
                      }}
                      animate={activeCard === card.id ? { rotate: 45 } : { rotate: 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <motion.span
                        className="text-white"
                        animate={{ scale: [1, 1.1, 1] }}
                        transition={{ duration: 1, repeat: Infinity }}
                      >
                        {activeCard === card.id ? '−' : '+'}
                      </motion.span>
                    </motion.div>
                  </motion.div>

                  <motion.h3
                    className="text-lg font-bold text-white mt-4"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3, duration: 0.4 }}
                  >
                    {card.claim}
                  </motion.h3>
                </motion.div>

                {/* Card Content */}
                <motion.div
                  className="p-6"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4, duration: 0.4 }}
                >
                  {/* Check Section */}
                  <motion.div
                    className="mb-4 p-4 rounded-xl bg-white/5 border border-white/10"
                    whileHover={{ scale: 1.01, borderColor: 'rgba(6, 182, 212, 0.3)' }}
                  >
                    <motion.div
                      className="flex items-center gap-3"
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.5, duration: 0.4 }}
                    >
                      <motion.span
                        className="text-2xl"
                        animate={{ rotate: card.check.includes('✓') ? [0, 10, -10, 0] : [0, 0, 0, 0] }}
                        transition={{ duration: 2, repeat: Infinity }}
                      >
                        {card.check}
                      </motion.span>
                      <motion.span
                        className="text-lg font-semibold text-white"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.6 }}
                      >
                        {card.check.replace('✓', '').replace('❌', '').replace('⚠️', '').trim()}
                      </motion.span>
                    </motion.div>
                  </motion.div>

                  {/* Evidence */}
                  <motion.div
                    className="mb-4"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.7, duration: 0.4 }}
                  >
                    <motion.h4
                      className="text-sm font-semibold text-cyan-300 mb-2 flex items-center gap-2"
                      whileHover={{ color: 'rgba(168, 85, 247, 1)' }}
                    >
                      <span className="w-2 h-2 rounded-full bg-cyan-400" />
                      Evidence
                    </motion.h4>
                    <motion.p
                      className="text-gray-400 text-sm"
                      whileHover={{ color: 'rgba(255, 255, 255, 0.8)' }}
                    >
                      {card.evidence}
                    </motion.p>
                  </motion.div>

                  {/* Explanation - Expanded */}
                  {activeCard === card.id && (
                    <motion.div
                      className="mt-4 p-4 rounded-xl bg-gradient-to-r from-cyan-500/5 to-purple-500/5 border border-cyan-500/20"
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      transition={{ duration: 0.4, ease: 'easeInOut' }}
                    >
                      <motion.h4
                        className="text-sm font-semibold text-purple-300 mb-2 flex items-center gap-2"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1, duration: 0.3 }}
                      >
                        <span className="w-2 h-2 rounded-full bg-purple-400" />
                        Explanation
                      </motion.h4>
                      <motion.p
                        className="text-gray-300 text-sm leading-relaxed"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2, duration: 0.3 }}
                      >
                        {card.explanation}
                      </motion.p>

                      {/* Visual Indicator */}
                      <motion.div
                        className="mt-4 h-2 rounded-full bg-gradient-to-r from-cyan-500/30 to-purple-500/30"
                        initial={{ width: 0 }}
                        animate={{ width: '100%' }}
                        transition={{ delay: 0.3, duration: 0.5 }}
                      />
                    </motion.div>
                  )}

                  {/* Card ID Badge */}
                  <motion.div
                    className="absolute bottom-4 right-4 w-8 h-8 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center border border-white/20"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.8, duration: 0.3 }}
                  >
                    <motion.span
                      className="text-sm font-bold text-white"
                      whileHover={{ scale: 1.1 }}
                    >
                      {card.id}
                    </motion.span>
                  </motion.div>
                </motion.div>

                {/* Corner Accents */}
                <div className="absolute -top-1 -left-1 w-3 h-3 border-l-2 border-t-2 border-cyan-500/30 rounded-br" />
                <div className="absolute -bottom-1 -left-1 w-3 h-3 border-l-2 border-b-2 border-cyan-500/30 rounded-tr" />
                <div className="absolute -top-1 -right-1 w-3 h-3 border-r-2 border-t-2 border-purple-500/30 rounded-bl" />
                <div className="absolute -bottom-1 -right-1 w-3 h-3 border-r-2 border-b-2 border-purple-500/30 rounded-tl" />
              </motion.div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </motion.div>
  );
};

// ============================================
// MAIN INSIDE THE MACHINE SECTION
// ============================================

const InsideTheMachine = () => {
  const [activeModule, setActiveModule] = useState(null);

  return (
    <section className="relative w-full bg-gradient-to-br from-[#0a0a0f] via-[#0d0d15] to-[#11111a]">
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden -z-10">
        <div className="absolute inset-0 cyber-grid opacity-20" />
        <motion.div
          className="absolute top-1/4 left-10% w-72 h-72 bg-purple-600/10 rounded-full blur-3xl"
          animate={{
            x: [0, 50, 0],
            y: [0, -30, 0],
            opacity: [0.1, 0.2, 0.1]
          }}
          transition={{ duration: 8, ease: 'easeInOut', repeat: Infinity, repeatType: 'loop' }}
        />
        <motion.div
          className="absolute bottom-1/4 right-10% w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl"
          animate={{
            x: [0, -40, 0],
            y: [0, 40, 0],
            opacity: [0.05, 0.15, 0.05]
          }}
          transition={{ duration: 10, ease: 'easeInOut', repeat: Infinity, repeatType: 'loop' }}
        />
      </div>

      {/* Main Content */}
      <div className="relative z-10">
        {/* Section Header */}
        <motion.div
          className="text-center py-16"
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
        >
          <motion.span
            className="inline-block px-4 py-1.5 bg-white/5 backdrop-blur-md rounded-full text-sm font-medium text-purple-300 border border-purple-500/20 mb-6"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
          >
            Interactive Educational Visualization
          </motion.span>
          <motion.h2
            className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.6 }}
          >
            <motion.span
              className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-white to-cyan-400"
              style={{ backgroundSize: '200% auto' }}
              animate={{ backgroundPosition: ['0% 0%', '100% 0%', '0% 0%'] }}
              transition={{ duration: 5, ease: 'linear', repeat: Infinity }}
            >
              Inside The Machine
            </motion.span>
          </motion.h2>
          <motion.p
            className="text-lg md:text-xl text-gray-300 max-w-4xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.6 }}
          >
            <motion.span
              className="text-transparent bg-clip-text bg-gradient-to-r from-gray-400 to-gray-500"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
            >
              Educational concept visualization.
            </motion.span>{' '}
            This is an educational concept visualization. This is not an exact replica of any real election system.
            All explanations are neutral and educational.
          </motion.p>
        </motion.div>

        {/* Module Info Panel - Shown when a module is clicked */}
        {activeModule && (
          <motion.div
            className="fixed top-20 left-1/2 -translate-x-1/2 w-full max-w-2xl z-50"
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -50 }}
            transition={{ duration: 0.4, ease: 'easeInOut' }}
          >
            <motion.div
              className="rounded-2xl glass-card border border-white/20 shadow-2xl overflow-hidden"
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.4, ease: 'easeOut' }}
            >
              <motion.div
                className="p-6 border-b border-white/10"
                style={{
                  background: `linear-gradient(135deg, ${activeModule === 'Ballot Unit' ? 'rgba(6, 182, 212, 0.1)' : activeModule === 'Control Unit' ? 'rgba(168, 85, 247, 0.1)' : 'rgba(16, 185, 129, 0.1)'})`
                }}
              >
                <motion.div
                  className="flex items-center justify-between"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.1, duration: 0.4 }}
                >
                  <motion.h3
                    className="text-xl font-bold text-white"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.2 }}
                  >
                    {activeModule}
                  </motion.h3>
                  <motion.button
                    onClick={() => setActiveModule(null)}
                    className="w-8 h-8 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center border border-white/20 hover:bg-white/20 transition-all duration-300"
                    whileHover={{ scale: 1.05, rotate: 90 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <motion.span
                      className="text-white"
                      animate={{ rotate: [0, 90, 180, 270] }}
                      transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
                    >
                      ×
                    </motion.span>
                  </motion.button>
                </motion.div>
              </motion.div>
              <motion.div
                className="p-6"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.4 }}
              >
                <motion.p
                  className="text-gray-300 leading-relaxed"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.4 }}
                >
                  {activeModule === 'Ballot Unit' && (
                    <span>
                      The Ballot Unit is the voter-facing component where selections are made.
                      In a simplified EVM-style system, this module displays candidate information,
                      captures voter choices through touch or button input, and ensures the vote is
                      recorded accurately before moving to verification.
                    </span>
                  )}
                  {activeModule === 'Control Unit' && (
                    <span>
                      The Control Unit is the administrative heart of the system. It manages the
                      entire voting process including ballot activation, session control, and
                      polling officer authentication. This module ensures that only authorized
                      personnel can start, pause, or end voting sessions.
                    </span>
                  )}
                  {activeModule === 'Verification Window' && (
                    <span>
                      The Verification Window provides voters with confidence in their vote.
                      Similar to VVPAT (Voter Verified Paper Audit Trail) systems, this component
                      displays the voter's selections for final confirmation before the vote is
                      permanently recorded. This creates an auditable trail for post-election verification.
                    </span>
                  )}
                </motion.p>
              </motion.div>
            </motion.div>
          </motion.div>
        )}

        {/* All Parts */}
        <div className="space-y-8">
          <MachineAnatomy
            activeModule={activeModule}
            onModuleClick={setActiveModule}
          />
          <VoteJourneyVisualization />
          <SecurityLayersVisualization />
          <TechnologyVsAssumptions />
        </div>
      </div>

      {/* Decorative Elements */}
      <motion.div
        className="absolute bottom-8 left-8 w-32 h-1 bg-gradient-to-r from-purple-500/0 via-purple-500/40 to-transparent"
        animate={{ opacity: [0.3, 0.7, 0.3] }}
        transition={{ duration: 3, repeat: Infinity }}
      />
      <motion.div
        className="absolute bottom-8 right-8 w-32 h-1 bg-gradient-to-l from-cyan-500/0 via-cyan-500/40 to-transparent"
        animate={{ opacity: [0.3, 0.7, 0.3] }}
        transition={{ duration: 3, repeat: Infinity, delay: 1 }}
      />
    </section>
  );
};

export default InsideTheMachine;
