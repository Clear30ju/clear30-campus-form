import ProgressBar from './ProgressBar';

export default function FormShell({ currentStep, totalSteps, children }) {
  return (
    <div style={{
      minHeight: '100vh',
      backgroundColor: 'var(--white)',
      display: 'flex',
      justifyContent: 'center',
      padding: '48px 24px',
    }}>
      <div style={{
        width: '100%',
        maxWidth: '720px',
      }}>
        <div style={{
          display: 'flex',
          justifyContent: 'center',
          marginBottom: '28px',
        }}>
          <img
            src="/clear30-logo.png"
            alt="Clear30"
            style={{ height: '48px' }}
          />
        </div>

        <div style={{
          backgroundColor: 'var(--white)',
          borderRadius: '16px',
          boxShadow: '0px 2px 15px rgba(0, 0, 0, 0.15)',
          overflow: 'hidden',
        }}>
          {currentStep <= totalSteps && (
            <ProgressBar currentStep={currentStep} totalSteps={totalSteps} />
          )}

          <div style={{ padding: '36px 32px' }}>
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}
