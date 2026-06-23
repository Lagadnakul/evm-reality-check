import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronRight, Check, User, Power, Vote, Printer, RotateCcw } from 'lucide-react';
import { votingSteps, candidates as candidateData } from '../constants/myths';

const ease = [0.22, 1, 0.36, 1];

const StepCard = ({ children }) => (
  <div className="bg-canvas border border-rule rounded-xl p-7">
    {children}
  </div>
);

const StepIcon = ({ icon: Icon, variant = 'default' }) => (
  <div className={`w-14 h-14 rounded-lg flex items-center justify-center mb-5 ${
    variant === 'signal' ? 'bg-signal/10 border border-signal/20' : 'bg-lift border border-rule'
  }`}>
    <Icon className={`w-7 h-7 ${variant === 'signal' ? 'text-signal' : 'text-muted'}`} />
  </div>
);

const VoterVerification = ({ onVerified }) => (
  <StepCard>
    <StepIcon icon={User} />
    <h3 className="text-lg font-semibold text-ink mb-2">Voter Verification</h3>
    <p className="text-muted text-sm mb-6 max-w-[42ch]">The polling officer verifies your identity on the electoral roll.</p>
    <button
      onClick={onVerified}
      className="inline-flex items-center gap-2 px-5 py-3 bg-ink text-canvas text-sm font-semibold rounded-lg hover:bg-ink/90 transition-colors"
    >
      <Check className="w-4 h-4" />
      Verify Identity
    </button>
  </StepCard>
);

const BallotActivation = ({ onActivated }) => (
  <StepCard>
    <StepIcon icon={Power} variant="signal" />
    <h3 className="text-lg font-semibold text-ink mb-2">Ballot Activation</h3>
    <p className="text-muted text-sm mb-6 max-w-[42ch]">The polling officer activates the ballot unit for your vote.</p>
    <button
      onClick={onActivated}
      className="inline-flex items-center gap-2 px-5 py-3 bg-signal text-canvas text-sm font-semibold rounded-lg hover:opacity-90 transition-opacity"
    >
      <Power className="w-4 h-4" />
      Activate Ballot
    </button>
  </StepCard>
);

const VoteSelection = ({ onSelect, selectedId }) => (
  <StepCard>
    <StepIcon icon={Vote} />
    <h3 className="text-lg font-semibold text-ink mb-1">Select Your Candidate</h3>
    <p className="text-muted text-sm mb-5">Press the button next to your preferred candidate.</p>
    <div className="space-y-2.5">
      {candidateData.map((candidate) => {
        const isSelected = selectedId === candidate.id;
        return (
          <button
            key={candidate.id}
            onClick={() => onSelect(candidate.id)}
            className={`w-full flex items-center gap-4 p-3.5 rounded-lg border transition-all duration-150 ${
              isSelected
                ? 'border-signal bg-signal/5'
                : 'border-rule bg-lift/30 hover:border-rule/80 hover:bg-lift'
            }`}
          >
            <div className={`w-9 h-9 rounded-md flex items-center justify-center flex-shrink-0 ${candidate.color}`}>
              <span className="text-white font-bold text-xs">{candidate.symbol[0]}</span>
            </div>
            <div className="flex-1 text-left">
              <p className="font-medium text-ink text-sm">{candidate.name}</p>
              <p className="text-xs text-muted">{candidate.party}</p>
            </div>
            <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center flex-shrink-0 ${
              isSelected ? 'border-signal bg-signal' : 'border-rule'
            }`}>
              {isSelected && <Check className="w-3 h-3 text-canvas" />}
            </div>
          </button>
        );
      })}
    </div>
  </StepCard>
);

const VVPATConfirmation = ({ candidate, onConfirm }) => {
  const [step, setStep] = useState(0);

  useEffect(() => {
    const t1 = setTimeout(() => setStep(1), 500);
    const t2 = setTimeout(() => setStep(2), 2500);
    return () => { clearTimeout(t1); clearTimeout(t2); };
  }, []);

  const selected = candidateData.find((c) => c.id === candidate);

  return (
    <StepCard>
      <StepIcon icon={Printer} />
      <h3 className="text-lg font-semibold text-ink mb-1">VVPAT Confirmation</h3>
      <p className="text-muted text-sm mb-5">Verify your selection on the printed slip.</p>

      <div className="bg-panel rounded-lg p-5 mb-5 border border-rule relative overflow-hidden min-h-[100px] flex items-center justify-center">
        <div className="absolute top-0 left-0 right-0 h-px bg-signal/30" />
        <AnimatePresence mode="wait">
          {step === 0 && (
            <motion.div
              key="printing"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="text-center py-4"
            >
              <div className="w-8 h-8 border-2 border-signal border-t-transparent rounded-full animate-spin mx-auto mb-3" />
              <p className="text-muted font-mono text-xs">Printing slip…</p>
            </motion.div>
          )}
          {step >= 1 && selected && (
            <motion.div
              key="slip"
              initial={{ y: -12, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              className="bg-lift rounded-lg p-4 w-full border border-rule"
            >
              <div className="flex items-center gap-3">
                <div className={`w-9 h-9 rounded-md ${selected.color} flex items-center justify-center flex-shrink-0`}>
                  <span className="text-white font-bold text-xs">{selected.symbol[0]}</span>
                </div>
                <div>
                  <p className="font-semibold text-ink text-sm">{selected.name}</p>
                  <p className="text-xs text-muted">{selected.party}</p>
                </div>
              </div>
              <div className="mt-3 pt-3 border-t border-rule">
                <p className="text-xs text-muted/60 font-mono">VVPAT VERIFICATION SLIP</p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {step === 2 && (
        <motion.button
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          onClick={onConfirm}
          className="w-full py-3 bg-signal text-canvas font-semibold rounded-lg hover:opacity-90 transition-opacity flex items-center justify-center gap-2 text-sm"
        >
          <Check className="w-4 h-4" />
          Confirm Vote
        </motion.button>
      )}
    </StepCard>
  );
};

const CompletionScreen = ({ onRestart }) => (
  <motion.div
    initial={{ opacity: 0, scale: 0.97 }}
    animate={{ opacity: 1, scale: 1 }}
    className="bg-canvas border border-rule rounded-xl p-7 text-center"
  >
    <div className="w-16 h-16 bg-signal/10 border border-signal/20 rounded-lg flex items-center justify-center mx-auto mb-5">
      <Check className="w-8 h-8 text-signal" />
    </div>
    <h3 className="text-xl font-display font-bold text-ink mb-2">Vote Recorded</h3>
    <p className="text-muted text-sm mb-6 max-w-sm mx-auto leading-relaxed">
      In a real election, your vote is now securely recorded in non-volatile memory.
      No network connection was made at any point.
    </p>
    <button
      onClick={onRestart}
      className="inline-flex items-center gap-2 px-5 py-3 border border-rule text-muted text-sm font-medium rounded-lg hover:text-ink hover:border-muted/40 transition-colors"
    >
      <RotateCcw className="w-4 h-4" />
      Try Again
    </button>
  </motion.div>
);

const VotingDemoSection = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [selectedCandidate, setSelectedCandidate] = useState(null);
  const [isCompleted, setIsCompleted] = useState(false);

  const handleVerify   = () => setCurrentStep(2);
  const handleActivate = () => setCurrentStep(3);
  const handleSelect   = (id) => { setSelectedCandidate(id); setCurrentStep(4); };
  const handleConfirm  = () => setIsCompleted(true);
  const handleRestart  = () => { setCurrentStep(1); setSelectedCandidate(null); setIsCompleted(false); };

  const getStepContent = () => {
    if (isCompleted) return <CompletionScreen onRestart={handleRestart} />;
    switch (currentStep) {
      case 1: return <VoterVerification onVerified={handleVerify} />;
      case 2: return <BallotActivation onActivated={handleActivate} />;
      case 3: return <VoteSelection onSelect={handleSelect} selectedId={selectedCandidate} />;
      case 4: return <VVPATConfirmation candidate={selectedCandidate} onConfirm={handleConfirm} />;
      default: return null;
    }
  };

  return (
    <section id="voting-demo" className="py-20 lg:py-28 bg-panel">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          className="mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease }}
        >
          <h2 className="font-display text-4xl md:text-5xl font-bold text-ink leading-tight mb-4"
            style={{ letterSpacing: '-0.02em', textWrap: 'balance' }}>
            Walk through a real vote.
          </h2>
          <p className="text-muted max-w-[52ch]">
            Every step of the EVM process — from identity check to VVPAT confirmation.
          </p>
        </motion.div>

        {/* Progress stepper */}
        <div className="mb-8">
          <div className="flex items-center max-w-lg">
            {votingSteps.map((step, index) => {
              const done   = currentStep > step.id;
              const active = !isCompleted && currentStep === step.id;
              return (
                <div key={step.id} className="flex items-center flex-1 last:flex-initial">
                  <div className="flex flex-col items-center">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center border transition-all duration-300 ${
                      done
                        ? 'bg-signal border-signal'
                        : active
                        ? 'bg-lift border-ink'
                        : 'bg-panel border-rule'
                    }`}>
                      {done ? (
                        <Check className="w-4 h-4 text-canvas" />
                      ) : (
                        <span className={`text-xs font-semibold font-mono ${active ? 'text-ink' : 'text-muted'}`}>{step.id}</span>
                      )}
                    </div>
                    <span className={`text-xs mt-2 font-medium hidden sm:block transition-colors ${active ? 'text-ink' : 'text-muted'}`}>
                      {step.title}
                    </span>
                  </div>
                  {index < votingSteps.length - 1 && (
                    <div className={`flex-1 h-px mx-2 mb-5 transition-colors ${done ? 'bg-signal' : 'bg-rule'}`} />
                  )}
                </div>
              );
            })}
          </div>
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={`${currentStep}-${isCompleted ? 'done' : 'active'}`}
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -14 }}
            transition={{ duration: 0.28, ease }}
          >
            {getStepContent()}
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
};

export default VotingDemoSection;
