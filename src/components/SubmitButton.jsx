export default function SubmitButton({ children, variant = 'primary', onClick, type = 'button', disabled = false }) {
  const isPrimary = variant === 'primary';

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      style={{
        padding: '14px 40px',
        fontSize: 'var(--text-body)',
        fontFamily: 'var(--font-primary)',
        fontWeight: 500,
        border: isPrimary ? 'none' : '1.5px solid var(--teal)',
        borderRadius: 'var(--radius-pill)',
        cursor: disabled ? 'not-allowed' : 'pointer',
        background: isPrimary ? 'var(--gradient)' : 'transparent',
        color: isPrimary ? 'var(--white)' : 'var(--teal)',
        opacity: disabled ? 0.5 : 1,
        transition: 'transform 0.15s var(--spring), box-shadow 0.2s var(--ease-out), opacity 0.2s var(--ease-out)',
        boxShadow: isPrimary ? 'var(--shadow-brand)' : 'none',
      }}
      onMouseEnter={(e) => {
        if (!disabled && isPrimary) {
          e.currentTarget.style.boxShadow = '0 10px 28px rgba(91, 180, 169, 0.38)';
        }
      }}
      onMouseLeave={(e) => {
        if (!disabled) {
          e.currentTarget.style.transform = 'translateY(0) scale(1)';
          if (isPrimary) e.currentTarget.style.boxShadow = 'var(--shadow-brand)';
        }
      }}
      onMouseDown={(e) => {
        if (!disabled) e.currentTarget.style.transform = 'scale(0.97)';
      }}
      onMouseUp={(e) => {
        if (!disabled) e.currentTarget.style.transform = 'scale(1)';
      }}
    >
      {children}
    </button>
  );
}
