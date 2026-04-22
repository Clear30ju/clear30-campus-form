import { motion } from 'framer-motion';
import BlurredBackground from '../components/BlurredBackground';
import Card from '../components/Card';
import Confetti from '../components/Confetti';

const timelineSteps = [
  {
    title: 'Review',
    description: 'Our team reviews your customization preferences (1–2 weeks)',
  },
  {
    title: 'Preview',
    description: "You'll receive a preview of your campus-specific portal by July",
  },
  {
    title: 'Launch',
    description: 'Full portal delivered before your target start date',
  },
];

function Timeline({ steps }) {
  const dotSize = 28;
  const gutter = 18; // gap between dot and text
  return (
    <div style={{ position: 'relative', paddingLeft: `${dotSize + gutter}px` }}>
      {/* Vertical gradient line — sits behind the dots and runs from center-of-first to center-of-last */}
      <div
        aria-hidden
        style={{
          position: 'absolute',
          left: `${dotSize / 2 - 1}px`,
          top: `${dotSize / 2}px`,
          bottom: `${dotSize / 2}px`,
          width: '2px',
          background: 'var(--gradient)',
          borderRadius: '1px',
          opacity: 0.5,
        }}
      />
      {steps.map((step, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, x: -8 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.7 + i * 0.12, duration: 0.35 }}
          style={{
            position: 'relative',
            marginBottom: i < steps.length - 1 ? '20px' : 0,
            minHeight: `${dotSize}px`,
          }}
        >
          <span
            aria-hidden
            style={{
              position: 'absolute',
              left: `${-(dotSize + gutter)}px`,
              top: 0,
              width: `${dotSize}px`,
              height: `${dotSize}px`,
              borderRadius: '50%',
              background: 'var(--gradient)',
              color: 'var(--white)',
              fontSize: 'var(--text-micro)',
              fontWeight: 700,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: '0 0 0 3px var(--white), 0 2px 6px rgba(91, 180, 169, 0.3)',
            }}
          >
            {i + 1}
          </span>
          <p style={{
            fontSize: 'var(--text-label)',
            fontWeight: 600,
            color: 'var(--text-primary)',
            marginTop: '3px',
            marginBottom: '3px',
          }}>
            {step.title}
          </p>
          <p style={{
            fontSize: 'var(--text-micro)',
            fontWeight: 400,
            color: 'var(--text-secondary)',
            lineHeight: 1.5,
          }}>
            {step.description}
          </p>
        </motion.div>
      ))}
    </div>
  );
}

export default function Confirmation() {
  return (
    <BlurredBackground>
      <Confetti count={90} originY="38%" duration={1.4} />
      <div style={{
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 'var(--space-lg) var(--horizontal-padding)',
      }}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: [0.2, 0.8, 0.2, 1] }}
          style={{ width: '100%', maxWidth: '520px', textAlign: 'center' }}
        >
          <div style={{
            display: 'flex',
            justifyContent: 'center',
            marginBottom: 'var(--space-md)',
          }}>
            <img
              src="/clear30-logo.png"
              alt="Clear30"
              style={{
                width: '44px',
                height: '44px',
                borderRadius: '10px',
                display: 'block',
                boxShadow: '0 4px 14px rgba(0, 0, 0, 0.08)',
              }}
            />
          </div>

          <motion.div
            initial={{ scale: 0.55, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.15, duration: 0.5, ease: [0.34, 1.35, 0.6, 1] }}
            style={{ width: '76px', height: '76px', margin: '0 auto 22px' }}
          >
            <div style={{
              width: '76px',
              height: '76px',
              borderRadius: '50%',
              background: 'var(--gradient)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: '0 6px 18px rgba(91, 180, 169, 0.28)',
            }}>
              <motion.svg
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{ pathLength: 1, opacity: 1 }}
                transition={{ delay: 0.45, duration: 0.5, ease: 'easeOut' }}
                width="36"
                height="36"
                viewBox="0 0 24 24"
                fill="none"
                stroke="white"
                strokeWidth="3"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <motion.polyline points="20 6 9 17 4 12" />
              </motion.svg>
            </div>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.35, duration: 0.4 }}
            style={{
              fontSize: 'var(--text-page-title)',
              fontWeight: 600,
              color: 'var(--text-primary)',
              letterSpacing: '-0.02em',
              marginBottom: '10px',
              lineHeight: 1.2,
            }}
          >
            You're confirmed for Fall 2026.
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.4 }}
            style={{
              fontSize: 'var(--text-body)',
              fontWeight: 400,
              color: 'var(--text-secondary)',
              lineHeight: 1.55,
              marginBottom: 'var(--space-md)',
            }}
          >
            Thanks for completing your campus customization.
            <br />
            Here's what happens next.
          </motion.p>

          <Card padding="22px 24px" style={{ textAlign: 'left', marginBottom: 'var(--space-md)' }}>
            <Timeline steps={timelineSteps} />
          </Card>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2, duration: 0.4 }}
            style={{
              fontSize: 'var(--text-micro)',
              fontWeight: 400,
              color: 'var(--text-tertiary)',
              lineHeight: 1.55,
            }}
          >
            Questions? Reach out to Julian Singleton at{' '}
            <a href="mailto:julian@clear30.org" style={{ color: 'var(--teal)', textDecoration: 'underline' }}>
              julian@clear30.org
            </a>
            .
          </motion.p>
        </motion.div>
      </div>
    </BlurredBackground>
  );
}
