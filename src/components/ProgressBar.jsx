import { motion } from 'framer-motion';

export default function ProgressBar({ currentStep, totalSteps }) {
  const progress = (currentStep / totalSteps) * 100;

  return (
    <div>
      <div style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        padding: '14px 0 10px',
      }}>
        <span style={{
          fontSize: 'var(--text-micro)',
          fontWeight: 500,
          color: 'var(--black)',
          letterSpacing: '0.01em',
        }}>
          Step {currentStep} of {totalSteps}
        </span>
      </div>
      <div style={{
        width: '100%',
        height: '8px',
        backgroundColor: 'var(--light-gray)',
        overflow: 'hidden',
      }}>
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${progress}%` }}
          transition={{ duration: 0.5, ease: 'easeInOut' }}
          style={{
            height: '100%',
            background: 'linear-gradient(90deg, #5BB4A9, #80C97A)',
          }}
        />
      </div>
    </div>
  );
}
