import { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Home from './components/Home';
import About from './components/About';
import Skills from './components/Skills';
import Education from './components/Education';
import Projects from './components/Projects';
import Contact from './components/Contact';
import CursorTrail from './components/CursorTrail';
import ScrollProgress from './components/ScrollProgress';
import './App.css';

function App() {
  const [activeSection, setActiveSection] = useState('home');
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);

      // Determine which section is in view
      const sections = ['home', 'about', 'skills', 'education', 'projects', 'contact'];
      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          if (rect.top <= 100 && rect.bottom >= 100) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="app bg-black min-h-screen text-gray-100 font-mono">
      <CursorTrail />
      <ScrollProgress />
      <Navbar activeSection={activeSection} />

      <main className="container mx-auto px-4 md:px-8 lg:px-16">
        <section id="home" className="min-h-screen flex flex-col justify-center items-center md:flex-row md:items-center">
          <Home />
        </section>

        <section id="about" className="min-h-screen flex flex-col justify-center items-center py-10 md:py-20 md:flex-row md:items-center">
          <About />
        </section>

        <section id="skills" className="min-h-screen flex flex-col justify-center items-center py-10 md:py-20 md:flex-row md:items-center">
          <Skills />
        </section>

        <section id="education" className="min-h-screen flex flex-col justify-center items-center py-10 md:py-20 md:flex-row md:items-center">
          <Education />
        </section>

        <section id="projects" className="min-h-screen flex flex-col justify-center items-center py-10 md:py-20 md:flex-row md:items-center">
          <Projects />
        </section>

        <section id="contact" className="min-h-screen flex flex-col justify-center items-center py-10 md:py-20 md:flex-row md:items-center">
          <Contact />
        </section>
      </main>
    </div>
  );
}

export default App;
