import { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Star } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

type SkillItem = { name: string; src?: string; icon?: React.ReactNode };

const experiences = [
  {
    date: 'Current',
    title: 'Unreal Engine Intern (R&D)',
    company: 'R&D City University of Science and Information Technology',
  },
  {
    date: 'JAN 2026 - MAR 2026',
    title: 'DG ISPR',
    company: 'Army Public School & College System, Peshawar',
  },
  {
    date: 'JUL 2025 - AUG 2025',
    title: 'App Development (Internship)',
    company: 'Dev-Spire Solutions',
  },
];

const education = [
  {
    date: 'Current',
    title: 'B.Sc. in Software Engineering',
    school: 'City University of Science and Information Technology, Peshawar',
  },
  {
    date: '2020 - 2022',
    title: 'F.SC in Computer Science',
    school: 'Peshawar Model Degree College, Peshawar',
  },
  {
    date: '2019 - 2020',
    title: 'Matriculation',
    school: 'Peshawar Model School (BOYS III), Peshawar',
  },
];

const certifications = [
  { date: '2022', title: 'Diploma in Information Technology' },
  { date: '2023', title: 'NAVTTC Graphic Designing Course' },
];

const technicalSkills = [
  { name: 'UNREAL ENGINE', color: 'blue' },
  { name: 'GAME DESIGN', color: 'white' },
  { name: 'TECH ART', color: 'orange' },
  { name: 'CI/CD PIPELINES', color: 'blue' },
];

const softSkills = [
  { name: 'FAST LEARNER', color: 'blue' },
  { name: 'PROBLEM SOLVER', color: 'blue' },
  { name: 'SYSTEMS THINKING', color: 'white' },
];

const coreArsenal: SkillItem[] = [
  { name: 'Unreal Engine', src: `${import.meta.env.BASE_URL}core/UE.png` },
  { name: 'C++', src: `${import.meta.env.BASE_URL}core/Cpp.svg` },
  { name: 'Blueprints', icon: '🔵' },
  { name: 'Blender', src: `${import.meta.env.BASE_URL}core/Blender.svg` },
  { name: 'Dart', src: `${import.meta.env.BASE_URL}core/Dart.svg` },
  { name: 'Flutter', src: `${import.meta.env.BASE_URL}core/Flutter.svg` },
];

const secondarySkills: SkillItem[] = [
  { name: 'Docker', src: `${import.meta.env.BASE_URL}core/Dcoker.svg` },
  { name: 'Linux', src: `${import.meta.env.BASE_URL}core/linux.svg` },
  { name: 'Web', src: `${import.meta.env.BASE_URL}core/webdevelopment.png` },
];

export default function Experience() {
  const sectionRef = useRef<HTMLElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const cards = cardsRef.current;
    if (!section || !cards) return;

    const cardElements = cards.querySelectorAll('.exp-card');
    cardElements.forEach((card, i) => {
      gsap.fromTo(card,
        { opacity: 0, y: 50 },
        {
          opacity: 1, y: 0, duration: 0.8, ease: 'power3.out',
          scrollTrigger: {
            trigger: card,
            start: 'top 85%',
            toggleActions: 'play none none none',
          },
          delay: i * 0.1,
        }
      );
    });
  }, []);

  return (
    <section ref={sectionRef} id="about" className="relative w-full py-24 px-6">
      <div ref={cardsRef} className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Experience + Education + Certification Card */}
        <div className="exp-card liquid-glass rounded-3xl p-6 lg:col-span-1" style={{ opacity: 0 }}>
          {/* Experience */}
          <div className="mb-8">
            <h3 className="text-lg font-bold text-white mb-6 tracking-wide">EXPERIENCE —</h3>
            <div className="space-y-5">
              {experiences.map((exp, i) => (
                <div key={i} className="relative pl-5 border-l border-[#3B82F6]/30">
                  <Star size={12} className="absolute -left-[7px] top-0 text-[#F97316]" fill="#F97316" />
                  <p className="text-[10px] text-[#3B82F6] uppercase tracking-wider mb-1">{exp.date}</p>
                  <h4 className="text-sm font-semibold text-white mb-0.5">{exp.title}</h4>
                  <p className="text-xs text-[#52525B]">{exp.company}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Education */}
          <div className="mb-8">
            <h3 className="text-lg font-bold text-white mb-6 tracking-wide">EDUCATION —</h3>
            <div className="space-y-5">
              {education.map((edu, i) => (
                <div key={i} className="relative pl-5 border-l border-[#3B82F6]/30">
                  <Star size={12} className="absolute -left-[7px] top-0 text-[#F97316]" fill="#F97316" />
                  <p className="text-[10px] text-[#3B82F6] uppercase tracking-wider mb-1">{edu.date}</p>
                  <h4 className="text-sm font-semibold text-white mb-0.5">{edu.title}</h4>
                  <p className="text-xs text-[#52525B]">{edu.school}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Certification */}
          <div>
            <h3 className="text-lg font-bold text-white mb-6 tracking-wide">CERTIFICATION —</h3>
            <div className="space-y-5">
              {certifications.map((cert, i) => (
                <div key={i} className="relative pl-5 border-l border-[#3B82F6]/30">
                  <Star size={12} className="absolute -left-[7px] top-0 text-[#F97316]" fill="#F97316" />
                  <p className="text-[10px] text-[#3B82F6] uppercase tracking-wider mb-1">{cert.date}</p>
                  <h4 className="text-sm font-semibold text-white">{cert.title}</h4>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Technical Skills Card */}
        <div className="exp-card liquid-glass rounded-3xl px-4 py-3 lg:col-span-1" style={{ opacity: 0 }}>
          <h3 className="text-lg font-bold text-white mb-3 tracking-wide text-center">TECHNICAL SKILLS</h3>
          <div className="space-y-2">
            {technicalSkills.map((skill, i) => (
              <div
                key={i}
                className={`py-2 px-3 text-center font-semibold text-xs tracking-wider ${
                  skill.color === 'blue'
                    ? 'ticket-badge text-[#3B82F6]'
                    : skill.color === 'orange'
                    ? 'ticket-badge-orange text-[#F97316]'
                    : 'bg-white/5 border border-white/10 text-white clip-path-ticket'
                }`}
                style={skill.color === 'white' ? {
                  clipPath: 'polygon(8px 0%, calc(100% - 8px) 0%, 100% 8px, 100% calc(100% - 8px), calc(100% - 8px) 100%, 8px 100%, 0% calc(100% - 8px), 0% 8px)',
                } : undefined}
              >
                {skill.name}
              </div>
            ))}
          </div>

          <div className="mt-3">
            <h3 className="text-lg font-bold text-white mb-2 tracking-wide text-center">SOFT SKILLS</h3>
            <div className="space-y-2">
              {softSkills.map((skill, i) => (
                <div
                  key={i}
                  className={`py-2 px-3 text-center font-semibold text-xs tracking-wider ${
                    skill.color === 'blue'
                      ? 'ticket-badge text-[#3B82F6]'
                      : 'bg-white/5 border border-white/10 text-white'
                  }`}
                  style={skill.color === 'white' ? {
                    clipPath: 'polygon(8px 0%, calc(100% - 8px) 0%, 100% 8px, 100% calc(100% - 8px), calc(100% - 8px) 100%, 8px 100%, 0% calc(100% - 8px), 0% 8px)',
                  } : undefined}
                >
                  {skill.name}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Core Arsenal + Secondary Skills */}
        <div className="exp-card space-y-6 lg:col-span-1" style={{ opacity: 0 }}>
          <div className="liquid-glass rounded-3xl p-6">
            <h3 className="text-lg font-bold text-white mb-6 tracking-wide text-center">CORE ARSENAL</h3>
            <div className="grid grid-cols-3 gap-4">
              {coreArsenal.map((tool, i) => (
                <div key={i} className="flex flex-col items-center gap-2 group">
                  <div className="w-14 h-14 rounded-xl bg-[#0A0A0C] border border-[#1f1f23] flex items-center justify-center text-2xl group-hover:border-[#3B82F6]/50 transition-colors duration-300">
                      {tool.src ? (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img
                          src={tool.src ? encodeURI(tool.src) : undefined}
                          alt={tool.name}
                          title={tool.name}
                          className="w-8 h-8 object-contain"
                          onError={(e) => {
                            // hide broken images and log for debugging
                            // eslint-disable-next-line no-console
                            console.warn('Failed to load image:', (e.currentTarget as HTMLImageElement).src);
                            (e.currentTarget as HTMLImageElement).style.display = 'none';
                          }}
                        />
                      ) : (
                        tool.icon
                      )}
                  </div>
                  <span className="text-[10px] text-[#52525B] uppercase tracking-wider">{tool.name}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="liquid-glass rounded-3xl p-6">
            <h3 className="text-lg font-bold text-white mb-6 tracking-wide text-center">SECONDARY SKILLS</h3>
            <div className="grid grid-cols-4 gap-3">
              {secondarySkills.map((tool, i) => (
                <div key={i} className="flex flex-col items-center gap-2 group">
                  <div className="w-12 h-12 rounded-xl bg-[#0A0A0C] border border-[#1f1f23] flex items-center justify-center text-xl group-hover:border-[#3B82F6]/50 transition-colors duration-300">
                    {tool.src ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img
                        src={tool.src ? encodeURI(tool.src) : undefined}
                        alt={tool.name}
                        title={tool.name}
                        className="w-8 h-8 object-contain"
                        onError={(e) => {
                          // eslint-disable-next-line no-console
                          console.warn('Failed to load image:', (e.currentTarget as HTMLImageElement).src);
                          (e.currentTarget as HTMLImageElement).style.display = 'none';
                        }}
                      />
                    ) : (
                      tool.icon
                    )}
                  </div>
                  <span className="text-[9px] text-[#52525B] uppercase tracking-wider text-center">{tool.name}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
