import { useId } from 'react';

function CheckboxIndicator() {
  return (
    <span className="c30-indicator" aria-hidden>
      <svg
        className="c30-indicator-check"
        width="12"
        height="12"
        viewBox="0 0 24 24"
        fill="none"
        stroke="white"
        strokeWidth="3.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <polyline points="20 6 9 17 4 12" />
      </svg>
    </span>
  );
}

export default function CheckboxGroup({ label, name, options, error, selectedValues = [], onChange, otherValue, onOtherChange }) {
  const groupId = useId();

  const handleToggle = (value) => {
    if (selectedValues.includes(value)) {
      onChange(selectedValues.filter((v) => v !== value));
    } else {
      onChange([...selectedValues, value]);
    }
  };

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
              data-kind="checkbox"
            >
              <input
                id={id}
                type="checkbox"
                checked={selectedValues.includes(option.value)}
                onChange={() => handleToggle(option.value)}
              />
              <CheckboxIndicator />
              <span style={{ flex: 1 }}>{option.label}</span>
            </label>
          );
        })}
      </div>
      {otherValue !== undefined && onOtherChange && selectedValues.includes('other') && (
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
