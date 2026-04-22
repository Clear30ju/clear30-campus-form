export default function SelectInput({ label, options, error, registration, ...props }) {
  return (
    <div style={{ marginBottom: 'var(--space-md)' }}>
      {label && <label className="c30-field-label">{label}</label>}
      <select
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
          cursor: 'pointer',
          appearance: 'none',
          transition: 'border-color 0.2s var(--ease-out), box-shadow 0.2s var(--ease-out)',
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='12' height='8' viewBox='0 0 12 8' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M1 1L6 6L11 1' stroke='%23000000' stroke-width='1.5' stroke-linecap='round'/%3E%3C/svg%3E")`,
          backgroundRepeat: 'no-repeat',
          backgroundPosition: 'right 16px center',
        }}
        {...registration}
        {...props}
      >
        <option value="">Select...</option>
        {options.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
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
