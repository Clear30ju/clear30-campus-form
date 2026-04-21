import { motion } from 'framer-motion';

const timelineSteps = [
  {
    number: '1',
    title: 'Review',
    description: 'Our team reviews your customization preferences (1\u20132 weeks)',
  },
  {
    number: '2',
    title: 'Preview',
    description: "You'll receive a preview of your campus-specific portal by July",
  },
  {
    number: '3',
    title: 'Launch',
    description: 'Full portal delivered before your target start date',
  },
];

export default function Confirmation() {
  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #5BB4A9, #80C97A)',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      padding: '48px 24px',
    }}>
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        style={{
          width: '100%',
          maxWidth: '720px',
          textAlign: 'center',
        }}
      >
        <div style={{ marginBottom: '24px' }}>
          <img
            src="/clear30-logo.png"
            alt="Clear30"
            style={{ height: '48px', filter: 'brightness(0) invert(1)' }}
          />
        </div>

        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.3, duration: 0.5, type: 'spring', stiffness: 200 }}
          style={{
            width: '64px',
            height: '64px',
            borderRadius: '50%',
            backgroundColor: 'rgba(255, 255, 255, 0.25)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            margin: '0 auto 24px',
          }}
        >
          <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="20 6 9 17 4 12" />
          </svg>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.4 }}
          style={{
            fontSize: 'var(--text-page-title)',
            fontWeight: 500,
            color: 'var(--white)',
            marginBottom: '16px',
          }}
        >
          You're confirmed for Fall 2026.
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7, duration: 0.4 }}
          style={{
            fontSize: 'var(--text-body)',
            fontWeight: 400,
            color: 'var(--white)',
            lineHeight: 1.6,
            marginBottom: '40px',
          }}
        >
          Thank you for completing your campus customization. Here's what happens next:
        </motion.p>

        <div style={{
          backgroundColor: 'rgba(255, 255, 255, 0.15)',
          borderRadius: '16px',
          padding: '32px 24px',
          marginBottom: '32px',
        }}>
          {timelineSteps.map((step, index) => (
            <motion.div
              key={step.number}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.9 + index * 0.2, duration: 0.4 }}
              style={{
                display: 'flex',
                alignItems: 'flex-start',
                gap: '16px',
                textAlign: 'left',
                marginBottom: index < timelineSteps.length - 1 ? '24px' : 0,
              }}
            >
              <span style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                width: '32px',
                height: '32px',
                borderRadius: '50%',
                backgroundColor: 'rgba(255, 255, 255, 0.3)',
                color: 'var(--white)',
                fontSize: 'var(--text-micro)',
                fontWeight: 500,
                flexShrink: 0,
              }}>
                {step.number}
              </span>
              <div>
                <p style={{
                  fontSize: 'var(--text-body)',
                  fontWeight: 500,
                  color: 'var(--white)',
                  marginBottom: '2px',
                }}>
                  {step.title}
                </p>
                <p style={{
                  fontSize: 'var(--text-micro)',
                  fontWeight: 400,
                  color: 'rgba(255, 255, 255, 0.85)',
                }}>
                  {step.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5, duration: 0.4 }}
          style={{
            fontSize: 'var(--text-micro)',
            fontWeight: 400,
            color: 'rgba(255, 255, 255, 0.85)',
            lineHeight: 1.6,
          }}
        >
          If you have questions at any time, reach out to Julian Singleton at{' '}
          <a href="mailto:juuliana@umich.edu" style={{ color: 'var(--white)', textDecoration: 'underline' }}>
            juuliana@umich.edu
          </a>
          .
        </motion.p>
      </motion.div>
    </div>
  );
}
