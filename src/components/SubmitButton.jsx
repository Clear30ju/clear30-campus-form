export default function SubmitButton({ children, variant = 'primary', onClick, type = 'button', disabled = false }) {
  const isPrimary = variant === 'primary';

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      style={{
        padding: '14px 48px',
        fontSize: 'var(--text-body)',
        fontFamily: 'var(--font-primary)',
        fontWeight: 500,
        border: isPrimary ? 'none' : '2px solid var(--teal)',
        borderRadius: '999px',
        cursor: disabled ? 'not-allowed' : 'pointer',
        background: isPrimary ? 'linear-gradient(135deg, #5BB4A9, #80C97A)' : 'var(--white)',
        color: isPrimary ? 'var(--white)' : 'var(--teal)',
        opacity: disabled ? 0.6 : 1,
        transition: 'transform 0.2s ease, box-shadow 0.2s ease, opacity 0.2s ease',
        boxShadow: isPrimary ? '0px 2px 8px rgba(91, 180, 169, 0.3)' : 'none',
      }}
      onMouseEnter={(e) => {
        if (!disabled) {
          e.target.style.transform = 'translateY(-1px)';
          if (isPrimary) {
            e.target.style.boxShadow = '0px 4px 14px rgba(91, 180, 169, 0.4)';
          }
        }
      }}
      onMouseLeave={(e) => {
        e.target.style.transform = 'translateY(0)';
        if (isPrimary) {
          e.target.style.boxShadow = '0px 2px 8px rgba(91, 180, 169, 0.3)';
        }
      }}
    >
      {children}
    </button>
  );
}
