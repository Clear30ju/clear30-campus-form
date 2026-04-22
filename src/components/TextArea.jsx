export default function TextArea({ label, helperText, error, registration, ...props }) {
  return (
    <div style={{ marginBottom: 'var(--space-md)' }}>
      {label && <label className="c30-field-label">{label}</label>}
      {helperText && (
        <p style={{
          fontSize: 'var(--text-micro)',
          fontWeight: 400,
          color: 'var(--text-secondary)',
          marginTop: '-4px',
          marginBottom: '10px',
          lineHeight: 1.45,
        }}>
          {helperText}
        </p>
      )}
      <textarea
        rows={4}
        className="c30-focusable"
        data-invalid={error ? 'true' : undefined}
        style={{
          width: '100%',
          padding: '14px 16px',
          fontSize: 'var(--text-body)',
          fontFamily: 'var(--font-primary)',
          fontWeight: 400,
          color: 'var(--text-primary)',
          backgroundColor: 'var(--white)',
          border: '1px solid var(--light-gray)',
          borderRadius: 'var(--radius-input)',
          outline: 'none',
          resize: 'vertical',
          transition: 'border-color 0.2s var(--ease-out), box-shadow 0.2s var(--ease-out)',
        }}
        {...registration}
        {...props}
      />
      {error && (
        <p style={{
          fontSize: 'var(--text-micro)',
          color: 'var(--red)',
          marginTop: '6px',
        }}>
          {error}
        </p>
      )}
    </div>
  );
}
