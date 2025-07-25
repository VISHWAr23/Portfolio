import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { Github, Linkedin, Mail, FileText, ChevronDown } from 'lucide-react';

const Home = () => {
  const [displayText, setDisplayText] = useState('');
  const fullText = 'Full-Stack Developer | Critical Thinker';
  const [textIndex, setTextIndex] = useState(0);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [cursorVariant, setCursorVariant] = useState("default");
  const [isVisible, setIsVisible] = useState(false);
  const homeRef = useRef(null);
  
  // Text typing effect
  useEffect(() => {
    if (textIndex < fullText.length) {
      const timer = setTimeout(() => {
        setDisplayText(prevText => prevText + fullText[textIndex]);
        setTextIndex(textIndex + 1);
      }, 100);
      
      return () => clearTimeout(timer);
    }
  }, [textIndex, fullText]);
  
  // Simplified mouse position tracking
  useEffect(() => {
    const handleMouseMove = (e) => {
      const { clientX, clientY } = e;
      setMousePosition({ x: clientX, y: clientY });
    };
    
    window.addEventListener("mousemove", handleMouseMove);
    
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  // Initial visibility animation
  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 500);
    return () => clearTimeout(timer);
  }, []);
  
  // Optimized floating particles effect
  const [particles, setParticles] = useState([]);
  
  useEffect(() => {
    const generateParticles = () => {
      const newParticles = [];
      for (let i = 0; i < 15; i++) { // Reduced particles for better performance
        newParticles.push({
          id: i,
          x: Math.random() * 100,
          y: Math.random() * 100,
          size: Math.random() * 3 + 1,
          duration: Math.random() * 20 + 15,
          delay: Math.random() * 5
        });
      }
      setParticles(newParticles);
    };
    
    generateParticles();
  }, []);
  
  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3
      }
    }
  };
  
  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: "easeOut" }
    }
  };
  
  // Minimized cursor variants
  const cursorVariants = {
    default: {
      x: mousePosition.x - 8,
      y: mousePosition.y - 8,
      height: 16,
      width: 16,
      backgroundColor: "rgba(0, 255, 204, 0.3)",
      border: "2px solid rgba(0, 255, 204, 0.5)"
    },
    hover: {
      x: mousePosition.x - 12,
      y: mousePosition.y - 12,
      height: 24,
      width: 24,
      backgroundColor: "rgba(0, 255, 204, 0.2)",
      border: "2px solid rgba(0, 255, 204, 0.8)"
    }
  };
  
  const socialIcons = [
    { 
      icon: <Github size={24} />, 
      href: 'https://github.com/vishwar23', 
      label: 'Github',
      color: 'hover:text-purple-400'
    },
    { 
      icon: <Linkedin size={24} />, 
      href: 'https://linkedin.com/in/vishwar23', 
      label: 'LinkedIn',
      color: 'hover:text-blue-400'
    },
    { 
      icon: <Mail size={24} />, 
      href: 'mailto:vishwarajkumar05@gmail.com', 
      label: 'Email',
      color: 'hover:text-green-400'
    },
    { 
      icon: <FileText size={24} />, 
      href: '/vishwa-resume.pdf', 
      label: 'Resume',
      color: 'hover:text-cyan-400'
    }
  ];
  
  return (
    <>
      {/* Minimized Custom cursor */}
      <motion.div
        className="custom-cursor fixed top-0 left-0 rounded-full pointer-events-none z-50 mix-blend-difference"
        variants={cursorVariants}
        animate={cursorVariant}
        transition={{ type: "spring", stiffness: 800, damping: 30, mass: 0.2 }}
        style={{ display: isVisible ? 'block' : 'none' }}
      />
      
      <motion.div 
        ref={homeRef}
        id="home"
        className="w-full min-h-screen relative overflow-hidden bg-black"
        initial="hidden"
        animate="visible"
        variants={containerVariants}
      >
        {/* Optimized particles */}
        {particles.map((particle) => (
          <motion.div
            key={particle.id}
            className="absolute rounded-full bg-cyan-400/20"
            initial={{ 
              left: `${particle.x}%`, 
              top: `${particle.y}%`,
              opacity: 0.1,
              scale: 0.5,
              width: particle.size,
              height: particle.size
            }}
            animate={{ 
              left: [`${particle.x}%`, `${(particle.x + 30) % 100}%`, `${particle.x}%`],
              top: [`${particle.y}%`, `${(particle.y + 30) % 100}%`, `${particle.y}%`],
              opacity: [0.1, 0.3, 0.1],
              scale: [0.5, 1, 0.5]
            }}
            transition={{ 
              repeat: Infinity, 
              duration: particle.duration,
              delay: particle.delay,
              ease: "linear"
            }}
          />
        ))}
        
        <div className="container mx-auto px-4 min-h-screen flex flex-col justify-center items-center text-center relative z-10">
          {/* Fixed Name Section */}
          <motion.div 
            className="mb-6"
            variants={itemVariants}
            onMouseEnter={() => setCursorVariant("hover")}
            onMouseLeave={() => setCursorVariant("default")}
          >
            <motion.h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-center">
              <motion.span 
                className="block bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-blue-400"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, duration: 0.8 }}
              >
                Hi, I'm
              </motion.span>
              
              <motion.div 
                className="flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-4 mt-2"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7, duration: 0.8 }}
              >
                <span className="text-white">Vishwa</span>
                <motion.span 
                  className="text-cyan-400 relative"
                  whileHover={{ 
                    scale: 1.05,
                    textShadow: "0 0 20px rgba(0, 255, 204, 0.8)"
                  }}
                >
                  Developer
                  <motion.span 
                    className="absolute -bottom-2 left-0 h-1 bg-gradient-to-r from-cyan-400 to-blue-400"
                    initial={{ width: 0 }}
                    animate={{ width: "100%" }}
                    transition={{ delay: 1.2, duration: 1, ease: "easeInOut" }}
                  />
                </motion.span>
              </motion.div>
            </motion.h1>
          </motion.div>
          
          {/* Typing Effect */}
          <motion.div 
            className="text-xl sm:text-2xl md:text-3xl text-gray-400 font-mono min-h-[2.5rem] mb-8 flex items-center justify-center"
            variants={itemVariants}
            onMouseEnter={() => setCursorVariant("hover")}
            onMouseLeave={() => setCursorVariant("default")}
          >
            <span>{displayText}</span>
            <motion.span 
              className="inline-block w-1 h-6 bg-cyan-400 ml-1"
              animate={{ opacity: [0, 1, 0] }}
              transition={{ duration: 1, repeat: Infinity }}
            />
          </motion.div>
          
          {/* Enhanced Description */}
          <motion.div 
            className="max-w-2xl mx-auto mb-12"
            variants={itemVariants}
            onMouseEnter={() => setCursorVariant("hover")}
            onMouseLeave={() => setCursorVariant("default")}
          >
            <p className="text-gray-300 text-lg leading-relaxed mb-4">
              Creating purposeful web applications from front to back.
            </p>
            <p className="text-gray-400 text-base">
              B.Tech IT Student | Backend Enthusiast | Problem Solver
            </p>
          </motion.div>
          
          {/* Enhanced Social Icons */}
          <motion.div 
            className="flex justify-center gap-6 mb-12"
            variants={itemVariants}
          >
            {socialIcons.map((social, index) => (
              <motion.a
                key={index}
                href={social.href}
                target={social.href.startsWith('http') || social.href.startsWith('mailto') ? '_blank' : '_self'}
                rel={social.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                aria-label={social.label}
                className={`text-gray-400 ${social.color} p-3 rounded-full border border-gray-700/50 transition-all duration-300`}
                whileHover={{ 
                  scale: 1.1,
                  y: -2,
                  borderColor: "rgba(0, 255, 204, 0.5)",
                  boxShadow: "0 4px 20px rgba(0, 255, 204, 0.2)"
                }}
                whileTap={{ scale: 0.95 }}
                onMouseEnter={() => setCursorVariant("hover")}
                onMouseLeave={() => setCursorVariant("default")}
              >
                <motion.div
                  whileHover={{ rotate: 360 }}
                  transition={{ duration: 0.5 }}
                >
                  {social.icon}
                </motion.div>
              </motion.a>
            ))}
          </motion.div>
          
          {/* Enhanced Call-to-Action Button */}
          <motion.button
            variants={itemVariants}
            className="group relative px-8 py-4 bg-transparent border-2 border-cyan-500 text-cyan-400 rounded-lg font-semibold overflow-hidden transition-all duration-300"
            whileHover={{ 
              scale: 1.05,
              boxShadow: "0 0 30px rgba(0, 255, 204, 0.4)"
            }}
            whileTap={{ scale: 0.95 }}
            onMouseEnter={() => setCursorVariant("hover")}
            onMouseLeave={() => setCursorVariant("default")}
            onClick={() => {
              const projectsSection = document.getElementById('projects');
              if (projectsSection) {
                projectsSection.scrollIntoView({ behavior: 'smooth' });
              }
            }}
          >
            <span className="relative z-10 group-hover:text-black transition-colors duration-300 flex items-center gap-2">
              Explore My Work
              <ChevronDown size={20} className="group-hover:animate-bounce" />
            </span>
            <motion.div 
              className="absolute inset-0 bg-gradient-to-r from-cyan-400 to-blue-400"
              initial={{ x: "-100%" }}
              whileHover={{ x: 0 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
            />
          </motion.button>
        </div>
      </motion.div>

      {/* Enhanced floating brand */}
      <motion.div 
        className="fixed top-6 left-6 z-50 cursor-pointer"
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.5, duration: 0.8 }}
        whileHover={{ scale: 1.1 }}
        onClick={() => {
          const homeSection = document.getElementById('home');
          if (homeSection) {
            homeSection.scrollIntoView({ behavior: 'smooth' });
          }
        }}
        onMouseEnter={() => setCursorVariant("hover")}
        onMouseLeave={() => setCursorVariant("default")}
      >
        <motion.h1 
          className="text-xl md:text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-blue-400"
          whileHover={{ 
            scale: 1.05,
            filter: "drop-shadow(0 0 8px rgba(0, 255, 204, 0.6))"
          }}
        >
          VISHWA.DEV
        </motion.h1>
      </motion.div>
    </>
  );
};

export default Home;
