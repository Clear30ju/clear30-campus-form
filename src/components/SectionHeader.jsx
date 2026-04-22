export default function SectionHeader({ title, description }) {
  return (
    <div style={{ marginBottom: 'var(--space-md)' }}>
      <h2 style={{
        fontSize: 'var(--text-heading)',
        fontWeight: 600,
        color: 'var(--text-primary)',
        letterSpacing: '-0.01em',
        marginBottom: description ? '6px' : 0,
      }}>
        {title}
      </h2>
      {description && (
        <p style={{
          fontSize: 'var(--text-small)',
          fontWeight: 400,
          color: 'var(--text-secondary)',
          lineHeight: 1.55,
        }}>
          {description}
        </p>
      )}
    </div>
  );
}
