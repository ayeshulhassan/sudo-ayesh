import { useRef, useEffect } from 'react';

export default function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const trailRef = useRef<HTMLDivElement>(null);
  const posRef = useRef({ x: 0, y: 0 });
  const targetRef = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const cursor = cursorRef.current;
    const trail = trailRef.current;
    if (!cursor || !trail) return;

    const handleMove = (e: MouseEvent) => {
      targetRef.current.x = e.clientX;
      targetRef.current.y = e.clientY;
    };

    let raf: number;
    const animate = () => {
      posRef.current.x += (targetRef.current.x - posRef.current.x) * 0.15;
      posRef.current.y += (targetRef.current.y - posRef.current.y) * 0.15;

      cursor.style.transform = `translate(${targetRef.current.x - 6}px, ${targetRef.current.y - 6}px)`;
      trail.style.transform = `translate(${posRef.current.x - 20}px, ${posRef.current.y - 20}px)`;

      raf = requestAnimationFrame(animate);
    };

    window.addEventListener('mousemove', handleMove);
    raf = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener('mousemove', handleMove);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <>
      <div
        ref={trailRef}
        className="pointer-events-none fixed top-0 left-0 z-[9999] hidden lg:block"
        style={{
          width: 40,
          height: 40,
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(249, 115, 22, 0.15) 0%, transparent 70%)',
          transition: 'opacity 0.3s',
        }}
      />
      <div
        ref={cursorRef}
        className="pointer-events-none fixed top-0 left-0 z-[9999] hidden lg:block"
        style={{
          width: 12,
          height: 12,
          borderRadius: '50%',
          background: '#F97316',
          boxShadow: '0 0 12px rgba(249, 115, 22, 0.6), 0 0 24px rgba(249, 115, 22, 0.3)',
        }}
      />
      <style>{`
        @media (min-width: 1024px) {
          * { cursor: none !important; }
        }
      `}</style>
    </>
  );
}
