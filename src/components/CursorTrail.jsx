import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const CursorTrail = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [cursorPoints, setCursorPoints] = useState([]);
  const maxTrailLength = 5;
  
  useEffect(() => {
    const updateMousePosition = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    
    window.addEventListener('mousemove', updateMousePosition);
    
    return () => {
      window.removeEventListener('mousemove', updateMousePosition);
    };
  }, []);
  
  useEffect(() => {
    const timer = setTimeout(() => {
      setCursorPoints(prevPoints => {
        const newPoints = [...prevPoints, mousePosition];
        if (newPoints.length > maxTrailLength) {
          return newPoints.slice(newPoints.length - maxTrailLength);
        }
        return newPoints;
      });
    }, 50);
    
    return () => clearTimeout(timer);
  }, [mousePosition]);
  
  return (
    <div className="cursor-trail fixed inset-0 pointer-events-none z-50">
      {cursorPoints.map((point, i) => (
        <motion.div
          key={`cursor-${i}`}
          className="absolute rounded-full bg-cyan-500"
          style={{
            left: point.x,
            top: point.y,
            translateX: "-50%",
            translateY: "-50%",
          }}
          initial={{ opacity: 0.7, scale: 0.2 }}
          animate={{ 
            opacity: 0,
            scale: i === cursorPoints.length - 1 ? 0.6 : 0.3,
          }}
          transition={{ duration: 0.8 }}
        />
      ))}
      <motion.div
        className="absolute w-8 h-8 rounded-full bg-transparent border-2 border-cyan-400"
        style={{
          left: mousePosition.x,
          top: mousePosition.y,
          translateX: "-50%",
          translateY: "-50%",
        }}
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.2, 0.3, 0.2],
        }}
        transition={{
          duration: 1.5,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />
    </div>
  );
};

export default CursorTrail;
