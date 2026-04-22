import BlurredBackground from './BlurredBackground';
import Card from './Card';
import ProgressBar from './ProgressBar';

export default function FormShell({ currentStep, totalSteps, children }) {
  return (
    <BlurredBackground>
      <div style={{
        display: 'flex',
        justifyContent: 'center',
        padding: 'var(--space-lg) var(--horizontal-padding) var(--space-xl)',
      }}>
        <div style={{ width: '100%', maxWidth: '680px' }}>
          <div style={{
            display: 'flex',
            justifyContent: 'center',
            marginBottom: 'var(--space-md)',
          }}>
            <img
              src="/clear30-logo.png"
              alt="Clear30"
              style={{
                width: '52px',
                height: '52px',
                borderRadius: '12px',
                display: 'block',
                boxShadow: '0 4px 14px rgba(0, 0, 0, 0.08)',
              }}
            />
          </div>

          <Card padding="0" style={{ overflow: 'hidden' }}>
            {currentStep <= totalSteps && (
              <ProgressBar currentStep={currentStep} totalSteps={totalSteps} />
            )}
            <div style={{ padding: '32px 30px 36px' }}>
              {children}
            </div>
          </Card>
        </div>
      </div>
    </BlurredBackground>
  );
}
