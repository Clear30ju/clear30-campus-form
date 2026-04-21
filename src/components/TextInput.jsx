const baseInputStyle = {
  width: '100%',
  padding: '14px 16px',
  fontSize: 'var(--text-body)',
  fontFamily: 'var(--font-primary)',
  fontWeight: 400,
  color: 'var(--black)',
  backgroundColor: 'var(--white)',
  border: '1px solid #E5E5E5',
  borderRadius: '12px',
  outline: 'none',
  transition: 'border-color 0.2s ease, box-shadow 0.2s ease',
};

export default function TextInput({ label, helperText, error, type = 'text', registration, ...props }) {
  return (
    <div style={{ marginBottom: '28px' }}>
      {label && (
        <label style={{
          display: 'block',
          fontSize: 'var(--text-micro)',
          fontWeight: 500,
          color: 'var(--black)',
          marginBottom: '6px',
        }}>
          {label}
        </label>
      )}
      {helperText && (
        <p style={{
          fontSize: '13px',
          fontWeight: 400,
          color: '#888',
          marginBottom: '6px',
          lineHeight: 1.4,
        }}>
          {helperText}
        </p>
      )}
      <input
        type={type}
        style={{
          ...baseInputStyle,
          borderColor: error ? '#e53e3e' : '#E5E5E5',
          boxShadow: error ? '0 0 0 3px rgba(229, 62, 62, 0.12)' : 'none',
        }}
        onFocus={(e) => {
          e.target.style.borderColor = error ? '#e53e3e' : '#5BB4A9';
          e.target.style.boxShadow = error
            ? '0 0 0 3px rgba(229, 62, 62, 0.12)'
            : '0 0 0 3px rgba(91, 180, 169, 0.15)';
        }}
        onBlur={(e) => {
          e.target.style.borderColor = error ? '#e53e3e' : '#E5E5E5';
          e.target.style.boxShadow = error ? '0 0 0 3px rgba(229, 62, 62, 0.12)' : 'none';
          registration?.onBlur?.(e);
        }}
        {...registration}
        {...props}
      />
      {error && (
        <p style={{
          fontSize: '13px',
          color: '#e53e3e',
          marginTop: '5px',
        }}>
          {error}
        </p>
      )}
    </div>
  );
}
