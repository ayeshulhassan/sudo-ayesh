import { useRef, useEffect, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Mail, Github, Linkedin, Gamepad2, Send } from 'lucide-react';
import * as THREE from 'three';
import emailjs from '@emailjs/browser';

gsap.registerPlugin(ScrollTrigger);

// Initialize EmailJS (replace with your actual public key from emailjs.com)
emailjs.init('-zQomnyoRArbe3Noz');

export default function Contact() {
  const sectionRef = useRef<HTMLElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const formRef = useRef<HTMLFormElement>(null);
  const [mouse3D] = useState(new THREE.Vector3(0, 0, 0));
  const raycaster = useRef(new THREE.Raycaster());
  const mouseNDC = useRef(new THREE.Vector2(-10, -10));

  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [submitted, setSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    gsap.fromTo(section.querySelector('.contact-content'),
      { opacity: 0, y: 50 },
      {
        opacity: 1, y: 0, duration: 1, ease: 'power3.out',
        scrollTrigger: { trigger: section, start: 'top 70%', toggleActions: 'play none none none' },
      }
    );
  }, []);

  // Neural Wave Effect
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, canvas.offsetWidth / canvas.offsetHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true });
    renderer.setSize(canvas.offsetWidth, canvas.offsetHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

    const rows = 50;
    const cols = 50;
    const spacing = 0.4;
    const positions = new Float32Array(rows * cols * 3);
    const originalPositions = new Float32Array(rows * cols * 3);

    for (let row = 0; row < rows; row++) {
      for (let col = 0; col < cols; col++) {
        const index = (row * cols + col) * 3;
        const x = (col - cols / 2) * spacing;
        const y = (row - rows / 2) * spacing;
        const z = 0;
        positions[index] = x;
        positions[index + 1] = y;
        positions[index + 2] = z;
        originalPositions[index] = x;
        originalPositions[index + 1] = y;
        originalPositions[index + 2] = z;
      }
    }

    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));

    const material = new THREE.PointsMaterial({
      size: 0.08,
      color: 0x3B82F6,
      transparent: true,
      opacity: 0.6,
      blending: THREE.AdditiveBlending,
    });

    const points = new THREE.Points(geometry, material);
    scene.add(points);
    camera.position.z = 15;

    const plane = new THREE.Plane(new THREE.Vector3(0, 0, 1), 0);

    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouseNDC.current.x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      mouseNDC.current.y = -((e.clientY - rect.top) / rect.height) * 2 + 1;

      raycaster.current.setFromCamera(mouseNDC.current, camera);
      const intersection = new THREE.Vector3();
      raycaster.current.ray.intersectPlane(plane, intersection);
      if (intersection) {
        mouse3D.copy(intersection);
      }
    };

    canvas.addEventListener('mousemove', handleMouseMove);

    let animId: number;
    const animate = () => {
      const time = Date.now() * 0.0005;
      camera.rotation.y = Math.sin(time) * 0.05;
      camera.rotation.x = Math.cos(time * 0.7) * 0.03;

      const posArray = geometry.attributes.position.array as Float32Array;
      const point = new THREE.Vector3();

      for (let i = 0; i < posArray.length; i += 3) {
        point.set(posArray[i], posArray[i + 1], posArray[i + 2]);
        const dist = point.distanceTo(mouse3D);

        if (dist < 5) {
          const force = (5 - dist) / 5;
          const repulsion = point.clone().sub(mouse3D).normalize().multiplyScalar(force * 1.5);
          posArray[i] += (originalPositions[i] + repulsion.x - posArray[i]) * 0.08;
          posArray[i + 1] += (originalPositions[i + 1] + repulsion.y - posArray[i + 1]) * 0.08;
          posArray[i + 2] += (originalPositions[i + 2] + repulsion.z - posArray[i + 2]) * 0.08;
        } else {
          posArray[i] += (originalPositions[i] - posArray[i]) * 0.05;
          posArray[i + 1] += (originalPositions[i + 1] - posArray[i + 1]) * 0.05;
          posArray[i + 2] += (originalPositions[i + 2] - posArray[i + 2]) * 0.05;
        }
      }

      geometry.attributes.position.needsUpdate = true;
      renderer.render(scene, camera);
      animId = requestAnimationFrame(animate);
    };

    animate();

    const handleResize = () => {
      const w = canvas.offsetWidth;
      const h = canvas.offsetHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };
    window.addEventListener('resize', handleResize);

    return () => {
      cancelAnimationFrame(animId);
      canvas.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', handleResize);
      renderer.dispose();
      geometry.dispose();
      material.dispose();
    };
  }, [mouse3D]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      // Send email via EmailJS to ayeshulhassan@gmail.com
      await emailjs.send(
        'service_svwmt24',           // EmailJS service ID
        'template_dds6lcb',          // EmailJS template ID
        {
          to_email: 'ayeshulhassan@gmail.com',  // YOUR EMAIL - messages only go here
          from_name: formData.name,
          from_email: formData.email,
          message: formData.message,
          reply_to: formData.email,
        }
      );

      setSubmitted(true);
      setFormData({ name: '', email: '', message: '' });
      setTimeout(() => setSubmitted(false), 3000);
    } catch (err) {
      console.error('Email sending failed:', err);
      setError('Failed to send message. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section ref={sectionRef} id="contact" className="relative w-full py-24 px-6 min-h-screen flex items-center">
      {/* Neural Wave Canvas */}
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

      <div className="contact-content relative z-10 w-full max-w-5xl mx-auto" style={{ opacity: 0 }}>
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl font-bold text-white inline-block mr-4">GET IN TOUCH</h2>
          <span className="text-[#F97316] text-sm uppercase tracking-widest font-medium border border-[#F97316]/30 px-4 py-2 rounded-full">Contact Me</span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          {/* Left: Info */}
          <div className="space-y-8">
            <div className="liquid-glass rounded-2xl p-6 border-l-4 border-l-[#3B82F6]">
              <h3 className="text-lg font-bold text-[#3B82F6] mb-3">Hey you!</h3>
              <p className="text-sm text-[#A1A1AA] leading-relaxed">
                I'm open to joining a team or jumping into a collab. If you've got an idea and need someone who can bring it to life, just reach out.
              </p>
            </div>

            {/* Email */}
            <a
              href="mailto:siddharth.t.dev@gmail.com"
              className="flex items-center gap-4 liquid-glass rounded-2xl p-4 hover:border-[#3B82F6]/50 transition-all duration-300 group"
            >
              <div className="w-12 h-12 rounded-full bg-[#F97316] flex items-center justify-center">
                <Mail size={20} className="text-white" />
              </div>
              <div>
                <p className="text-[10px] text-[#52525B] uppercase tracking-widest font-semibold">EMAIL ME AT</p>
                <p className="text-sm text-white group-hover:text-[#3B82F6] transition-colors">ayeshulhassan@gmail.com</p>
              </div>
            </a>

            {/* Social Links */}
            <div className="grid grid-cols-3 gap-3">
              <a
                href="https://github.com/syedayeshulhassanbukhari"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 py-3 bg-[#0A0A0C] border border-[#1f1f23] rounded-xl text-xs font-bold text-white hover:border-[#3B82F6]/50 hover:text-[#3B82F6] transition-all duration-300"
              >
                <Github size={16} />
                GITHUB
              </a>
              <a
                href="https://www.linkedin.com/in/syedaishulhassan"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 py-3 bg-[#0077B5] border border-[#0077B5] rounded-xl text-xs font-bold text-white hover:brightness-110 transition-all duration-300"
              >
                <Linkedin size={16} />
                LINKEDIN
              </a>
              <a
                href="https://sudo-ayesh.itch.io/"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 py-3 bg-[#FA5C5C] border border-[#FA5C5C] rounded-xl text-xs font-bold text-white hover:brightness-110 transition-all duration-300"
              >
                <Gamepad2 size={16} />
                ITCH.IO
              </a>
            </div>
          </div>

          {/* Right: Sticky Note Form */}
          <div className="relative">
            <div
              className="relative p-8 rounded-sm"
              style={{
                background: '#FDE047',
                boxShadow: '4px 4px 0 rgba(0,0,0,0.3), 8px 8px 24px rgba(0,0,0,0.2)',
                transform: 'rotate(-1deg)',
              }}
            >
              {/* Tape */}
              <div
                className="absolute -top-3 left-1/2 -translate-x-1/2 w-24 h-8"
                style={{
                  background: 'linear-gradient(to bottom, rgba(255,255,255,0.4), rgba(255,255,255,0.1))',
                  boxShadow: '0 1px 2px rgba(0,0,0,0.1)',
                }}
              />

              {submitted ? (
                <div className="text-center py-12">
                  <p className="text-2xl font-bold text-[#0A0A0C] mb-2">Message Sent!</p>
                  <p className="text-sm text-[#0A0A0C]/70">Thanks for reaching out. I'll get back to you soon.</p>
                </div>
              ) : (
                <form ref={formRef} onSubmit={handleSubmit} className="space-y-6">
                  {error && (
                    <div className="p-3 bg-red-100 border border-red-400 rounded text-red-700 text-sm">
                      {error}
                    </div>
                  )}
                  <div>
                    <label className="block text-sm font-bold text-[#0A0A0C] mb-2">NAME -</label>
                    <input
                      type="text"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full bg-transparent border-b-2 border-[#0A0A0C]/30 py-2 text-[#0A0A0C] placeholder-[#0A0A0C]/40 focus:outline-none focus:border-[#0A0A0C] transition-colors"
                      placeholder="Your name"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-[#0A0A0C] mb-2">EMAIL -</label>
                    <input
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full bg-transparent border-b-2 border-[#0A0A0C]/30 py-2 text-[#0A0A0C] placeholder-[#0A0A0C]/40 focus:outline-none focus:border-[#0A0A0C] transition-colors"
                      placeholder="your@email.com"
                      required
                    />
                  </div>
                  <div>
                    <textarea
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      rows={5}
                      className="w-full bg-transparent border-b-2 border-[#0A0A0C]/30 py-2 text-[#0A0A0C] placeholder-[#0A0A0C]/40 focus:outline-none focus:border-[#0A0A0C] transition-colors resize-none"
                      placeholder="Write your message here..."
                      style={{
                        backgroundImage: 'repeating-linear-gradient(transparent, transparent 31px, rgba(10,10,12,0.15) 31px, rgba(10,10,12,0.15) 32px)',
                        lineHeight: '32px',
                      }}
                      required
                    />
                  </div>
                  <button
                    type="submit"
                    disabled={isLoading}
                    className="w-full flex items-center justify-center gap-2 py-3 bg-[#F97316] text-white font-bold text-sm rounded-lg hover:bg-[#ea580c] disabled:opacity-70 disabled:cursor-not-allowed transition-colors duration-300 shadow-lg"
                  >
                    {isLoading ? 'SENDING...' : 'SEND IT'}
                    <Send size={16} />
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
