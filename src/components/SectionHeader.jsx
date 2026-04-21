export default function SectionHeader({ title, description }) {
  return (
    <div style={{ marginBottom: '28px' }}>
      <h2 style={{
        fontSize: 'var(--text-section-header)',
        fontWeight: 500,
        color: 'var(--black)',
        marginBottom: description ? '8px' : 0,
      }}>
        {title}
      </h2>
      {description && (
        <p style={{
          fontSize: 'var(--text-body)',
          fontWeight: 400,
          color: '#555',
          lineHeight: 1.6,
        }}>
          {description}
        </p>
      )}
    </div>
  );
}
