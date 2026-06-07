import Navigation from './components/Navigation';
import CustomCursor from './components/CustomCursor';
import Hero from './sections/Hero';
import Experience from './sections/Experience';
import Projects from './sections/Projects';
import Logbook from './sections/Logbook';
import Contact from './sections/Contact';
import Footer from './components/Footer';

export default function App() {
  return (
    <div className="relative min-h-screen bg-[#050507] text-[#F4F4F5] overflow-x-hidden">
      <CustomCursor />
      <Navigation />
      
      <main>
        <Hero />
        <Experience />
        <Projects />
        <Logbook />
        <Contact />
      </main>

      <Footer />
    </div>
  );
}
