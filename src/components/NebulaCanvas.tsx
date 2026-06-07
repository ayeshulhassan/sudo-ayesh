import { useRef, useEffect } from 'react';

interface TrailPoint {
  x: number;
  y: number;
  age: number;
  lifespan: number;
  size: number;
  speed: number;
  noisy: boolean;
}

interface Spark {
  x: number;
  y: number;
  life: number;
}

export default function NebulaCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseRef = useRef({ x: -1000, y: -1000 });
  const animRef = useRef<number>(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const dpr = window.devicePixelRatio || 1;
    let w = canvas.offsetWidth;
    let h = canvas.offsetHeight;

    const resize = () => {
      w = canvas.offsetWidth;
      h = canvas.offsetHeight;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      ctx.scale(dpr, dpr);
    };
    resize();
    window.addEventListener('resize', resize);

    const headX = () => w * 0.5 + Math.sin(time * 0.3) * w * 0.15;
    const headY = () => h * 0.3 + Math.cos(time * 0.2) * h * 0.1;

    let time = 0;
    const trail: TrailPoint[] = [];
    const sparks: Spark[] = [];

    const handleMouse = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouseRef.current.x = e.clientX - rect.left;
      mouseRef.current.y = e.clientY - rect.top;
    };
    canvas.addEventListener('mousemove', handleMouse);

    const animate = () => {
      time += 0.016;
      ctx.clearRect(0, 0, w, h);

      const hx = headX();
      const hy = headY();

      // Spawn trail point
      trail.push({
        x: hx,
        y: hy,
        age: 0,
        lifespan: 150 + Math.random() * 200,
        size: Math.random() * 1,
        speed: Math.random() * 1 + 0.5,
        noisy: Math.random() > 0.5,
      });

      // Update and draw trail
      for (let i = trail.length - 1; i >= 0; i--) {
        const p = trail[i];
        p.age++;
        p.x += Math.sin(time * 0.5 + p.y * 0.01) * 0.5;
        p.y -= p.speed;

        if (p.age >= p.lifespan) {
          trail.splice(i, 1);
          continue;
        }

        const lifeRatio = 1 - (p.age / p.lifespan);
        ctx.beginPath();
        ctx.strokeStyle = `rgba(59, 130, 246, ${0.5 * lifeRatio * lifeRatio})`;
        ctx.lineWidth = 1.5 * lifeRatio;
        if (i > 0) {
          const prev = trail[i - 1];
          ctx.moveTo(prev.x, prev.y);
          ctx.lineTo(p.x, p.y);
          ctx.stroke();
        }
      }

      // Glowing head
      const sinVal = Math.sin(time);
      const glowIntensity = 0.8 + sinVal * 0.2;
      const glowColor = `rgba(59, 130, 246, ${glowIntensity})`;

      // Pass 1: outer glow
      ctx.shadowBlur = 50;
      ctx.shadowColor = glowColor;
      ctx.strokeStyle = glowColor;
      ctx.lineWidth = 4;
      ctx.beginPath();
      ctx.arc(hx, hy, 3, 0, Math.PI * 2);
      ctx.stroke();

      // Pass 2: mid glow
      ctx.shadowBlur = 30;
      ctx.shadowColor = 'rgba(59, 130, 246, 0.8)';
      ctx.strokeStyle = 'rgba(100, 180, 255, 0.9)';
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.arc(hx, hy, 2, 0, Math.PI * 2);
      ctx.stroke();

      // Pass 3: core
      ctx.shadowBlur = 0;
      ctx.fillStyle = '#ffffff';
      ctx.beginPath();
      ctx.arc(hx, hy, 1.5, 0, Math.PI * 2);
      ctx.fill();

      // Sparks
      if (Math.random() > 0.3) {
        sparks.push({
          x: hy + Math.random() * 80 - 40,
          y: hx + (Math.random() > 0.5 ? Math.random() * 40 + 20 : Math.random() * -40 - 20),
          life: 1,
        });
      }

      for (let i = sparks.length - 1; i >= 0; i--) {
        const s = sparks[i];
        s.x += Math.sin(time * 2 + s.y * 0.1) * 0.5 + Math.random() * 1 - 0.5;
        s.y -= 1;
        s.life -= 0.015;

        if (s.life <= 0) {
          sparks.splice(i, 1);
          continue;
        }

        ctx.fillStyle = `rgba(255, 255, 255, ${s.life * 0.5})`;
        ctx.shadowBlur = 15;
        ctx.shadowColor = 'rgba(59, 130, 246, 0.8)';
        ctx.beginPath();
        ctx.arc(s.y, s.x, 1, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.shadowBlur = 0;

      // Mouse interaction glow
      const mx = mouseRef.current.x;
      const my = mouseRef.current.y;
      if (mx > 0 && my > 0) {
        const grad = ctx.createRadialGradient(mx, my, 0, mx, my, 200);
        grad.addColorStop(0, 'rgba(59, 130, 246, 0.1)');
        grad.addColorStop(1, 'transparent');
        ctx.fillStyle = grad;
        ctx.fillRect(0, 0, w, h);
      }

      animRef.current = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      cancelAnimationFrame(animRef.current);
      window.removeEventListener('resize', resize);
      canvas.removeEventListener('mousemove', handleMouse);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        zIndex: 0,
      }}
    />
  );
}
