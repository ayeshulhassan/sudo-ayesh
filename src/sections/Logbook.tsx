import { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { FileText, Calendar, Clock, ArrowRight } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const blogPosts = [
  {
    date: 'Dec 6, 2025',
    readTime: '3 min read',
    title: 'How I Ended Up Making A Virtual Pet In My GitHub README',
    description: 'A story about making an interactive github profile with Woop the wooper',
    tags: ['GitHub', 'Game Dev'],
    image: `${import.meta.env.BASE_URL}image-doodle-wooper.png`,
  },
  {
    date: 'Dec 17, 2025',
    readTime: '5 min',
    title: '12 Rules to Follow in Scripting',
    description: 'My cheatsheet/rulebook for writing clean, maintainable code.',
    tags: ['Scripting', 'Game Dev'],
    image: `${import.meta.env.BASE_URL}image-doodle-boxcat.jpg`,
  },
];

const doodles = [
  { name: 'Boxcat', image: `${import.meta.env.BASE_URL}image-doodle-boxcat.jpg`, rotation: -8 },
  { name: 'City Night', image: `${import.meta.env.BASE_URL}image-doodle-city.jpg`, rotation: 5 },
  { name: 'Wooper', image: `${import.meta.env.BASE_URL}image-doodle-wooper.png`, rotation: -3 },
  { name: 'Wooper Play', image: `${import.meta.env.BASE_URL}image-doodle-wooper.png`, rotation: 12 },
];

export default function Logbook() {
  const sectionRef = useRef<HTMLElement>(null);
  const doodlesRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const cards = section.querySelectorAll('.blog-card');
    cards.forEach((card, i) => {
      gsap.fromTo(card,
        { opacity: 0, y: 40 },
        {
          opacity: 1, y: 0, duration: 0.7, ease: 'power3.out',
          scrollTrigger: { trigger: card, start: 'top 85%', toggleActions: 'play none none none' },
          delay: i * 0.15,
        }
      );
    });

    const doodleItems = section.querySelectorAll('.doodle-item');
    doodleItems.forEach((item, i) => {
      gsap.fromTo(item,
        { opacity: 0, scale: 0.8, rotation: 0 },
        {
          opacity: 1, scale: 1, duration: 0.6, ease: 'back.out(1.7)',
          scrollTrigger: { trigger: item, start: 'top 90%', toggleActions: 'play none none none' },
          delay: i * 0.1,
        }
      );
    });
  }, []);

  return (
    <section ref={sectionRef} id="logbook" className="relative w-full py-24 px-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl font-bold text-white inline-block mr-4">LOGBOOK</h2>
          <span className="text-[#F97316] text-sm uppercase tracking-widest font-medium border border-[#F97316]/30 px-4 py-2 rounded-full">What I've been upto</span>
        </div>

        {/* Dev Log Card */}
        <div className="liquid-glass rounded-3xl p-6 lg:p-8 mb-16">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <div className="px-3 py-1.5 bg-[#3B82F6] rounded-lg">
                <span className="text-[10px] font-bold text-white uppercase tracking-widest">DEV LOG</span>
              </div>
            </div>
            <button className="flex items-center gap-2 text-xs text-[#52525B] hover:text-[#3B82F6] transition-colors duration-300 border border-[#1f1f23] px-4 py-2 rounded-lg">
              <FileText size={14} />
              VIEW ALL LOGS
            </button>
          </div>

          <div className="border-b border-[#1f1f23] mb-6">
            <h3 className="text-xl font-bold text-white mb-1">LATEST THOUGHTS</h3>
            <p className="text-sm text-[#52525B] mb-4">Ramblings about code, bugs, and design.</p>
          </div>

          {/* Blog Posts */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {blogPosts.map((post, i) => (
              <div
                key={i}
                className="blog-card bg-[#0A0A0C] rounded-2xl overflow-hidden group hover:border-[#3B82F6]/30 border border-[#1f1f23] transition-all duration-500"
                style={{ opacity: 0 }}
              >
                <div className="aspect-[16/9] overflow-hidden">
                  <img
                    src={post.image}
                    alt={post.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                </div>
                <div className="p-5">
                  <div className="flex items-center gap-3 text-[10px] text-[#52525B] uppercase tracking-wider mb-3">
                    <span className="flex items-center gap-1">
                      <Calendar size={10} />
                      {post.date}
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock size={10} />
                      {post.readTime}
                    </span>
                  </div>
                  <h4 className="text-base font-bold text-white mb-2 leading-snug group-hover:text-[#3B82F6] transition-colors duration-300">
                    {post.title}
                  </h4>
                  <p className="text-xs text-[#A1A1AA] mb-4 leading-relaxed">{post.description}</p>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {post.tags.map((tag, j) => (
                      <span key={j} className="text-[10px] text-[#52525B]">#{tag}</span>
                    ))}
                  </div>
                  <button className="flex items-center gap-2 text-xs font-bold text-[#F97316] hover:text-[#ea580c] transition-colors duration-300">
                    READ POST
                    <ArrowRight size={12} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Doodles of the Week */}
        <div>
          <h3 className="text-lg font-bold text-white mb-2 tracking-wide">DOODLES OF THE WEEK</h3>
          <p className="text-xs text-[#52525B] mb-6">(Sketches/Animations made this week)</p>

          <div
            ref={doodlesRef}
            className="liquid-glass rounded-3xl p-8 min-h-[400px] relative overflow-hidden"
          >
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 items-center justify-items-center">
              {doodles.map((doodle, i) => (
                <div
                  key={i}
                  className="doodle-item relative group"
                  style={{
                    opacity: 0,
                    transform: `rotate(${doodle.rotation}deg)`,
                  }}
                >
                  <div className="bg-white p-3 pb-10 rounded-lg shadow-2xl transition-transform duration-500 group-hover:scale-110 group-hover:rotate-0 group-hover:z-10">
                    <div className="w-32 h-32 md:w-40 md:h-40 overflow-hidden rounded">
                      <img
                        src={doodle.image}
                        alt={doodle.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <p className="absolute bottom-3 left-4 text-xs font-medium text-[#0A0A0C]">{doodle.name}</p>
                  </div>
                </div>
              ))}
            </div>

            <p className="text-[10px] text-[#52525B] text-center mt-6 uppercase tracking-wider">
              Drag items to rearrange | Double click to take a closer look
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
