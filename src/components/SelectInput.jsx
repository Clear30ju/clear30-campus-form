export default function SelectInput({ label, options, error, registration, ...props }) {
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
      <select
        style={{
          width: '100%',
          padding: '14px 16px',
          fontSize: 'var(--text-body)',
          fontFamily: 'var(--font-primary)',
          fontWeight: 400,
          color: 'var(--black)',
          backgroundColor: 'var(--white)',
          border: `1px solid ${error ? '#e53e3e' : '#E5E5E5'}`,
          borderRadius: '12px',
          outline: 'none',
          cursor: 'pointer',
          appearance: 'none',
          transition: 'border-color 0.2s ease, box-shadow 0.2s ease',
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='12' height='8' viewBox='0 0 12 8' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M1 1L6 6L11 1' stroke='%23000000' stroke-width='1.5' stroke-linecap='round'/%3E%3C/svg%3E")`,
          backgroundRepeat: 'no-repeat',
          backgroundPosition: 'right 16px center',
        }}
        onFocus={(e) => {
          e.target.style.borderColor = error ? '#e53e3e' : '#5BB4A9';
          e.target.style.boxShadow = error
            ? '0 0 0 3px rgba(229, 62, 62, 0.12)'
            : '0 0 0 3px rgba(91, 180, 169, 0.15)';
        }}
        onBlur={(e) => {
          e.target.style.borderColor = error ? '#e53e3e' : '#E5E5E5';
          e.target.style.boxShadow = 'none';
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
