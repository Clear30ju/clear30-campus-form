// Fixed, viewport-locked background. Doesn't reflow when content grows.
// Pass `variant` to swap looks — easy to A/B.

const VARIANTS = {
  // Flat warm off-white. Maximum minimalism.
  plain: {
    backgroundColor: '#F8F7F4',
    backgroundImage: 'none',
  },

  // Two soft brand-colored corner washes on a warm off-white base.
  // Feels atmospheric without pattern noise.
  glow: {
    backgroundColor: '#F7F8FA',
    backgroundImage: [
      'radial-gradient(ellipse 900px 600px at 100% -5%, rgba(91, 180, 169, 0.14), transparent 60%)',
      'radial-gradient(ellipse 700px 500px at -5% 100%, rgba(128, 201, 122, 0.10), transparent 65%)',
    ].join(', '),
  },

  // Fine diagonal line pattern on warm off-white.
  // Reads as architectural/paper.
  lines: {
    backgroundColor: '#F7F7F4',
    backgroundImage: [
      'radial-gradient(ellipse 800px 500px at 100% 0%, rgba(91, 180, 169, 0.08), transparent 60%)',
      'repeating-linear-gradient(135deg, rgba(0,0,0,0.035) 0 1px, transparent 1px 14px)',
    ].join(', '),
  },

  // Dot grid, tinted brand-teal. Stronger color presence — dots + two
  // corner washes bring the brand across the whole surface.
  dots: {
    backgroundColor: '#F4F7F9',
    backgroundImage: [
      'radial-gradient(ellipse 1000px 700px at 100% -5%, rgba(91, 180, 169, 0.26), transparent 62%)',
      'radial-gradient(ellipse 800px 600px at -5% 100%, rgba(128, 201, 122, 0.22), transparent 65%)',
      'radial-gradient(circle at center, rgba(91, 180, 169, 0.3) 1px, transparent 1.5px)',
    ].join(', '),
    backgroundSize: 'auto, auto, 22px 22px',
  },
};

export default function BlurredBackground({ children, variant = 'dots' }) {
  const cfg = VARIANTS[variant] ?? VARIANTS.glow;
  return (
    <>
      <div
        aria-hidden
        style={{
          position: 'fixed',
          inset: 0,
          zIndex: 0,
          pointerEvents: 'none',
          ...cfg,
        }}
      />
      <div style={{ position: 'relative', zIndex: 1 }}>
        {children}
      </div>
    </>
  );
}
