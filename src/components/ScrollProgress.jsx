import { useState, useEffect } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

const ScrollProgress = () => {
  const [scrollYProgress, setScrollYProgress] = useState(0);
  
  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const scrollPercent = scrollTop / docHeight;
      setScrollYProgress(scrollPercent);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  return (
    <motion.div 
      className="fixed top-0 left-0 right-0 h-1 bg-cyan-500/30 z-50"
      style={{ scaleX: scrollYProgress, transformOrigin: "0%" }}
    >
      <div className="h-full bg-gradient-to-r from-cyan-400 to-cyan-600"></div>
    </motion.div>
  );
};

export default ScrollProgress;