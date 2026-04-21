export default function RadioGroup({ label, name, options, error, registration, otherValue, onOtherChange }) {
  return (
    <div style={{ marginBottom: '28px' }}>
      {label && (
        <label style={{
          display: 'block',
          fontSize: 'var(--text-micro)',
          fontWeight: 500,
          color: 'var(--black)',
          marginBottom: '10px',
        }}>
          {label}
        </label>
      )}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
        {options.map((option) => (
          <label
            key={option.value}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '10px',
              fontSize: 'var(--text-body)',
              fontWeight: 400,
              cursor: 'pointer',
            }}
          >
            <input
              type="radio"
              value={option.value}
              {...registration}
              style={{
                width: '18px',
                height: '18px',
                accentColor: 'var(--teal)',
                cursor: 'pointer',
              }}
            />
            {option.label}
          </label>
        ))}
      </div>
      {otherValue !== undefined && onOtherChange && (
        <input
          type="text"
          placeholder="Please specify..."
          value={otherValue}
          onChange={(e) => onOtherChange(e.target.value)}
          style={{
            width: '100%',
            padding: '14px 16px',
            fontSize: 'var(--text-body)',
            fontFamily: 'var(--font-primary)',
            border: '1px solid #E5E5E5',
            borderRadius: '12px',
            outline: 'none',
            marginTop: '10px',
            transition: 'border-color 0.2s ease, box-shadow 0.2s ease',
          }}
          onFocus={(e) => {
            e.target.style.borderColor = '#5BB4A9';
            e.target.style.boxShadow = '0 0 0 3px rgba(91, 180, 169, 0.15)';
          }}
          onBlur={(e) => {
            e.target.style.borderColor = '#E5E5E5';
            e.target.style.boxShadow = 'none';
          }}
        />
      )}
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
