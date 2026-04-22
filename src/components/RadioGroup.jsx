import { useId } from 'react';

function RadioIndicator() {
  return (
    <span className="c30-indicator" aria-hidden>
      <span
        className="c30-indicator-dot"
        style={{
          width: '8px',
          height: '8px',
          borderRadius: '50%',
          background: 'var(--white)',
        }}
      />
    </span>
  );
}

export default function RadioGroup({ label, name, options, error, registration, otherValue, onOtherChange }) {
  const groupId = useId();

  return (
    <div style={{ marginBottom: 'var(--space-md)' }}>
      {label && <label className="c30-field-label">{label}</label>}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
        {options.map((option) => {
          const id = `${groupId}-${option.value}`;
          return (
            <label
              key={option.value}
              htmlFor={id}
              className="c30-option"
              data-kind="radio"
            >
              <input
                id={id}
                type="radio"
                value={option.value}
                {...registration}
              />
              <RadioIndicator />
              <span style={{ flex: 1 }}>{option.label}</span>
            </label>
          );
        })}
      </div>
      {otherValue !== undefined && onOtherChange && (
        <input
          type="text"
          placeholder="Please specify..."
          value={otherValue}
          onChange={(e) => onOtherChange(e.target.value)}
          className="c30-focusable"
          style={{
            width: '100%',
            padding: '14px 16px',
            fontSize: 'var(--text-body)',
            fontFamily: 'var(--font-primary)',
            border: '1px solid var(--light-gray)',
            borderRadius: 'var(--radius-input)',
            outline: 'none',
            marginTop: '10px',
            transition: 'border-color 0.2s var(--ease-out), box-shadow 0.2s var(--ease-out)',
          }}
        />
      )}
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
