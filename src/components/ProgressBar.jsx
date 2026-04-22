import { motion } from 'framer-motion';

export default function ProgressBar({ currentStep, totalSteps }) {
  const progress = (currentStep / totalSteps) * 100;

  return (
    <div>
      <div style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        padding: '16px 0 12px',
      }}>
        <span style={{
          fontSize: 'var(--text-micro)',
          fontWeight: 500,
          color: 'var(--text-secondary)',
          letterSpacing: '0.02em',
        }}>
          Step {currentStep} of {totalSteps}
        </span>
      </div>
      <div style={{
        width: '100%',
        height: '6px',
        backgroundColor: 'var(--light-gray)',
        overflow: 'hidden',
        borderRadius: 'var(--radius-pill)',
        margin: '0 0 2px',
      }}>
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${progress}%` }}
          transition={{ duration: 0.5, ease: [0.2, 0.8, 0.2, 1] }}
          style={{
            height: '100%',
            background: 'var(--gradient)',
            borderRadius: 'var(--radius-pill)',
          }}
        />
      </div>
    </div>
  );
}
