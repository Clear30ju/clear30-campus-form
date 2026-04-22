export default function Card({
  as: Tag = 'div',
  children,
  gradient,
  outline = false,
  outlineGradient,
  glow = false,
  shadow = true,
  padding = '20px 24px',
  radius,
  color = 'var(--white)',
  style,
  className,
  ...props
}) {
  const r = radius || 'var(--radius-card)';
  const isGradient = Boolean(gradient);

  const base = {
    position: 'relative',
    padding,
    borderRadius: r,
    color: isGradient ? 'var(--white)' : 'var(--text-primary)',
    boxShadow: shadow ? 'var(--shadow)' : 'none',
    transition: 'box-shadow 0.25s var(--ease-out), transform 0.2s var(--ease-out)',
    ...style,
  };

  if (outline) {
    const ring = outlineGradient || 'var(--gradient)';
    base.background = `linear-gradient(${color}, ${color}) padding-box, ${ring} border-box`;
    base.border = '1.5px solid transparent';
  } else if (isGradient) {
    base.background = gradient;
  } else {
    base.background = color;
  }

  const inner = (
    <Tag style={base} className={className} {...props}>
      {children}
    </Tag>
  );

  if (!glow) return inner;

  const halo = typeof glow === 'string' ? glow : (gradient || 'var(--gradient)');
  return (
    <div style={{ position: 'relative', width: '100%' }}>
      <div
        aria-hidden
        style={{
          position: 'absolute',
          inset: '-12px',
          borderRadius: `calc(${r} + 12px)`,
          background: halo,
          filter: 'blur(34px)',
          opacity: 0.45,
          zIndex: 0,
        }}
      />
      <div style={{ position: 'relative', zIndex: 1 }}>{inner}</div>
    </div>
  );
}
