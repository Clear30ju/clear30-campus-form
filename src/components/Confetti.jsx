import { useMemo } from 'react';
import { motion } from 'framer-motion';

const COLORS = ['#5BB4A9', '#80C97A', '#26CD6A', '#00BCA5', '#F5D36A', '#FFFFFF'];

// Center-origin confetti burst. Particles fly outward in all directions,
// slow slightly, and fade. No gravity drop — they just disperse.
export default function Confetti({ count = 90, originY = '42%', duration = 1.4 }) {
  const pieces = useMemo(() => Array.from({ length: count }).map((_, i) => {
    const angle = Math.random() * Math.PI * 2;
    const velocity = 180 + Math.random() * 260;
    const dx = Math.cos(angle) * velocity;
    const dy = Math.sin(angle) * velocity;
    const isRect = Math.random() > 0.45;
    return {
      id: i,
      dx,
      dy,
      rotate: Math.random() * 720 - 360,
      color: COLORS[i % COLORS.length],
      size: isRect ? 10 + Math.random() * 6 : 7 + Math.random() * 5,
      width: isRect ? 5 + Math.random() * 4 : undefined,
      radius: isRect ? '2px' : '50%',
      delay: Math.random() * 0.05,
      duration: duration + (Math.random() - 0.5) * 0.4,
    };
  }), [count, duration]);

  return (
    <div
      aria-hidden
      style={{
        position: 'fixed',
        inset: 0,
        pointerEvents: 'none',
        overflow: 'hidden',
        zIndex: 10,
      }}
    >
      <div style={{
        position: 'absolute',
        left: '50%',
        top: originY,
        width: 0,
        height: 0,
      }}>
        {pieces.map((p) => (
          <motion.div
            key={p.id}
            initial={{ x: 0, y: 0, rotate: 0, opacity: 0, scale: 0.5 }}
            animate={{
              x: p.dx,
              y: p.dy,
              rotate: p.rotate,
              opacity: [0, 1, 1, 0],
              scale: [0.5, 1, 1, 0.9],
            }}
            transition={{
              duration: p.duration,
              delay: p.delay,
              ease: [0.15, 0.75, 0.35, 1],
              opacity: { duration: p.duration, times: [0, 0.08, 0.65, 1], delay: p.delay },
              scale: { duration: p.duration, times: [0, 0.15, 0.75, 1], delay: p.delay },
            }}
            style={{
              position: 'absolute',
              left: 0,
              top: 0,
              width: p.width || p.size,
              height: p.size,
              background: p.color,
              borderRadius: p.radius,
              boxShadow: p.color === '#FFFFFF' ? '0 0 1px rgba(0,0,0,0.15)' : 'none',
              transformOrigin: 'center',
            }}
          />
        ))}
      </div>
    </div>
  );
}
