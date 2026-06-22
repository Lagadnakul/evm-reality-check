import React from 'react';
import { motion } from 'framer-motion';

const ProgressTracker = ({ currentStep, totalSteps = 4 }) => {
  const steps = [
    { name: 'Verification', step: 1 },
    { name: 'Activation', step: 2 },
    { name: 'Selection', step: 3 },
    { name: 'Confirmation', step: 4 }
  ];

  return (
    <div className="w-full mb-12">
      <div className="flex items-center justify-between relative">
        {/* Progress line */}
        <div className="absolute top-1/2 left-0 right-0 h-1 bg-white/10 rounded-full -z-10" />
        <div
          className="absolute top-1/2 left-0 h-1 bg-gradient-to-r from-purple-500 to-cyan-500 rounded-full -z-10"
          style={{
            width: `${(currentStep / totalSteps) * 100}%`,
            transition: 'width 0.5s ease',
          }}
        />

        {/* Step indicators */}
        {steps.map((step, index) => {
          const isActive = step.step === currentStep;
          const isCompleted = step.step < currentStep;
          const isUpcoming = step.step > currentStep;

          return (
            <motion.div
              key={step.step}
              className="relative flex flex-col items-center"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <motion.div
                className={`relative w-12 h-12 rounded-full flex items-center justify-center font-bold text-sm shadow-lg ${
                  isCompleted
                    ? 'bg-green-500 text-white' :
                  isActive
                    ? 'bg-purple-600 text-white ring-4 ring-purple-500/30' :
                    'bg-white/10 text-gray-400'
                }`}
                whileHover={{ scale: 1.1 }}
                animate={isActive ? { scale: [1, 1.05, 1] } : {}}
                transition={{ duration: 1.5, repeat: Infinity }}
              >
                {isCompleted ? '✓' : step.step}
              </motion.div>
              <span className={`mt-2 text-xs ${isCompleted ? 'text-green-400' : isActive ? 'text-purple-400' : 'text-gray-500'}`}>
                {step.name}
              </span>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
};

export default ProgressTracker;
