import { useState, useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ExternalLink } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

type Category = 'All' | 'Game AI & Systems' | 'Gameplay & Jams' | 'Tools & ML';

interface Project {
  title: string;
  status: string;
  statusColor: string;
  description: string;
  image: string;
  tags: string[];
  category: Category;
  link?: string;
}

const projects: Project[] = [
  {
    title: 'Unwanted Guest',
    status: 'IN DEVELOPMENT',
    statusColor: 'bg-[#52525B]',
    description: 'Professional Internship: Engineered highly modular core gameplay mechanics, AI behaviors, and interactive environment systems for an unannounced horror title.',
    image: '/image-project-unwanted-guest.jpg',
    tags: ['Unity', 'C#', 'AI State Machines', 'System Architecture'],
    category: 'Game AI & Systems',
  },
  {
    title: 'Locked In Fear',
    status: 'COMPLETED',
    statusColor: 'bg-emerald-500',
    description: 'Locked In Fear is an immersive horror experience that challenges your ability to stay calm under pressure.',
    image: '/projectImages/5.png',
    tags: ['Godot', 'Horror', 'Interactive'],
    category: 'Gameplay & Jams',
    link: 'https://lockedinfear.me/html/index.html',
  },
];

const categories: Category[] = ['All', 'Game AI & Systems'];

export default function Projects() {
  const [activeCategory, setActiveCategory] = useState<Category>('All');
  const [visibleCount, setVisibleCount] = useState(3);
  const sectionRef = useRef<HTMLElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  const filteredProjects = activeCategory === 'All'
    ? projects
    : projects.filter(p => p.category === activeCategory);

  const visibleProjects = filteredProjects.slice(0, visibleCount);

  useEffect(() => {
    const grid = gridRef.current;
    if (!grid) return;

    const cards = grid.querySelectorAll('.project-card');
    cards.forEach((card, i) => {
      gsap.fromTo(card,
        { opacity: 0, y: 40, scale: 0.95 },
        {
          opacity: 1, y: 0, scale: 1, duration: 0.6, ease: 'power3.out',
          scrollTrigger: {
            trigger: card,
            start: 'top 90%',
            toggleActions: 'play none none none',
          },
          delay: i * 0.1,
        }
      );
    });
  }, [activeCategory, visibleCount]);

  return (
    <section ref={sectionRef} id="projects" className="relative w-full py-24 px-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-4xl lg:text-5xl font-bold text-white inline-block mr-4">PROJECTS</h2>
          <span className="text-[#F97316] text-sm uppercase tracking-widest font-medium border border-[#F97316]/30 px-4 py-2 rounded-full">Recent Work</span>
        </div>

        {/* Filter Buttons */}
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => {
                setActiveCategory(cat);
                setVisibleCount(3);
              }}
              className={`px-5 py-2.5 rounded-lg text-xs font-semibold tracking-wider uppercase transition-all duration-300 ${
                activeCategory === cat
                  ? 'bg-[#F97316] text-white'
                  : 'bg-[#0A0A0C] border border-[#1f1f23] text-[#52525B] hover:text-white hover:border-[#3B82F6]/50'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Project Grid */}
        <div ref={gridRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {visibleProjects.map((project, i) => (
            <div
              key={`${activeCategory}-${i}`}
              className="project-card liquid-glass rounded-2xl overflow-hidden group hover:shadow-lg hover:shadow-blue-500/10 transition-all duration-500"
              style={{ opacity: 0 }}
            >
              {/* Image */}
              <div className="relative aspect-video overflow-hidden">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0C] via-transparent to-transparent" />
                <span className={`absolute top-3 right-3 ${project.statusColor} text-[10px] font-bold text-white px-3 py-1 rounded-full uppercase tracking-wider`}>
                  {project.status}
                </span>
              </div>

              {/* Content */}
              <div className="p-5">
                <h3 className="text-lg font-bold text-[#3B82F6] mb-2">{project.title}</h3>
                <p className="text-sm text-[#A1A1AA] leading-relaxed mb-4">{project.description}</p>

                {/* Tags */}
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.tags.map((tag, j) => (
                    <span key={j} className="text-[10px] text-[#52525B] bg-[#0A0A0C] px-2.5 py-1 rounded-full border border-[#1f1f23]">
                      {tag}
                    </span>
                  ))}
                </div>

                {/* Link */}
                {project.link && (
                  <a
                    href={project.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-xs font-bold text-white bg-red-500 hover:bg-red-600 px-4 py-2.5 rounded-lg transition-colors duration-300 w-full justify-center"
                  >
                    <ExternalLink size={14} />
                    PLAY
                  </a>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Show More */}
        {visibleCount < filteredProjects.length && (
          <div className="text-center mt-10">
            <button
              onClick={() => setVisibleCount(prev => prev + 3)}
              className="px-8 py-3 bg-[#0A0A0C] border border-[#1f1f23] text-white text-xs font-bold uppercase tracking-widest rounded-xl hover:border-[#3B82F6]/50 hover:text-[#3B82F6] transition-all duration-300"
            >
              SHOW MORE ({filteredProjects.length - visibleCount})
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
