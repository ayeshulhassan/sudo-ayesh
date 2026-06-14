import { useRef, useEffect } from 'react';
import { User, Mail, FileText } from 'lucide-react';
import NebulaCanvas from '../components/NebulaCanvas';
import gsap from 'gsap';

export default function Hero() {
  const cardRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const card = cardRef.current;
    const text = textRef.current;
    if (!card || !text) return;

    gsap.fromTo(card,
      { opacity: 0, x: -60, rotateY: 15 },
      { opacity: 1, x: 0, rotateY: 0, duration: 1.2, ease: 'power3.out', delay: 0.3 }
    );

    gsap.fromTo(text.children,
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out', stagger: 0.12, delay: 0.6 }
    );
  }, []);

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="hero" className="relative min-h-screen w-full overflow-hidden flex items-center">
      <NebulaCanvas />

        <div className="relative z-10 w-full max-w-7xl mx-auto px-6 py-12 flex flex-col lg:flex-row items-center gap-6 lg:gap-12">
        {/* Identity Card */}
        <div
          ref={cardRef}
          className="w-full lg:w-1/2 perspective-1000"
          style={{ opacity: 0 }}
        >
          <div className="liquid-glass rounded-3xl p-6 transform transition-transform duration-500 hover:scale-[1.02]">
            <div className="relative rounded-2xl overflow-hidden mb-5 aspect-[3/4]">
              <img
                src={`${import.meta.env.BASE_URL}Main-Image.jpeg`}
                alt="Ayesh Ul Hassan"
                className="w-full h-full object-cover"
              />
              <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/80 to-transparent">
                <div className="flex items-center gap-3">
                  <img
                    src={`${import.meta.env.BASE_URL}image-hero-avatar.png`}
                    alt="Pixel Avatar"
                    className="w-12 h-12 object-contain"
                  />
                  <div>
                    <h3 className="font-pixel text-xs text-white tracking-wider">SUDO-AYESH</h3>
                    <p className="text-[10px] text-[#F97316] uppercase tracking-widest mt-0.5">Game Developer & Designer</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bio Text */}
        <div ref={textRef} className="w-full lg:w-3/5 space-y-6">
          <div className="flex items-center gap-3 mb-2">
            <img
              src={`${import.meta.env.BASE_URL}image-hero-avatar.png`}
              alt="Pixel Avatar"
              className="w-10 h-10 object-contain"
            />
            <span className="text-[#3B82F6] text-lg font-medium">Hi this is,</span>
          </div>

          <h1 className="text-5xl lg:text-6xl font-bold tracking-tight text-white leading-tight">
            AYESH UL HASSAN
          </h1>

          <h2 className="text-xl lg:text-2xl text-[#3B82F6] font-medium">
            Gameplay Programmer | Game AI & Systems
          </h2>

          <p className="text-[#A1A1AA] text-base lg:text-lg leading-relaxed max-w-xl">
            I build game systems that feel good to play. As a Gameplay Programmer with a background in AIML, I specialize in bridging the gap between raw code and player experience.
          </p>

          <p className="text-[#A1A1AA] text-base lg:text-lg leading-relaxed max-w-xl">
            I don't just write scripts; I build tools and behaviors that bring characters to life. Currently exploring the intersection of Game Dev and Machine Learning.
          </p>

          <div className="flex flex-wrap gap-4 pt-4">
            <button
              onClick={() => scrollTo('projects')}
              className="inline-flex items-center gap-2 px-6 py-3 bg-[#F97316] text-white font-semibold rounded-xl hover:bg-[#ea580c] transition-all duration-300 hover:shadow-lg hover:shadow-orange-500/25"
            >
              <User size={18} />
              VIEW PROJECTS
            </button>
            <button
              onClick={() => scrollTo('contact')}
              className="liquid-glass-strong inline-flex items-center gap-2 px-6 py-3 text-white font-semibold rounded-xl hover:scale-[1.02] transition-transform duration-300"
            >
              <Mail size={18} />
              CONTACT ME
            </button>
            <button
              onClick={() => window.open('https://drive.google.com/file/d/1FiCHIq4rC6e547Vh49z1a-UFP2fS-Xb0/view?usp=sharing', '_blank')}
              className="inline-flex items-center gap-2 px-6 py-3 border border-[#52525B] text-white font-semibold rounded-xl hover:border-[#3B82F6] hover:text-[#3B82F6] transition-all duration-300"
            >
              <FileText size={18} />
              RESUME
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
