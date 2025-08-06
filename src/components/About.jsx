import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Download, 
  Mail, 
  Sparkles, 
  MapPin, 
  Code, 
  Coffee, 
  Trophy,
  Globe,
  BookOpen
} from 'lucide-react';
import profileImage from '../assets/vishwa.jpg';
import resume from '../assets/Vishwa_resume.pdf';

const About = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [currentTime, setCurrentTime] = useState(new Date());
  const [isImageLoaded, setIsImageLoaded] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 60000);
    return () => clearInterval(timer);
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.2
      }
    }
  };
  
  const itemVariants = {
    hidden: { opacity: 0, y: 40 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: "easeOut" }
    }
  };

  const tabData = {
    overview: {
      title: "Professional Overview",
      content: [
        "I'm a passionate Full-Stack Developer dedicated to building clean, responsive, and user-focused web applications. I enjoy turning ideas into real, functional products with modern tools and technologies.",
        "As a Critical Thinker, I approach challenges with creativity and logic. I'm always learning and refining my skills to create smooth, scalable, and meaningful digital experiences."
      ]
    },
    experience: {
      title: "Experience & Journey",
      content: [
        "Currently pursuing B.Tech in Information Technology at National Engineering College with a strong focus on backend development and blockchain technology.",
        "Gained hands-on experience through internships at Vlinder Labs (Backend Development) and Shunmuga AI Technologies (Frontend Development), working on real-world projects including the Quranium blockchain project and Gym Management System."
      ]
    },
    passion: {
      title: "What Drives Me",
      content: [
        "I'm passionate about creating digital solutions that make a real difference. From blockchain applications to responsive web interfaces, I love exploring new technologies and pushing the boundaries of what's possible.",
        "My goal is to bridge the gap between complex technical concepts and user-friendly experiences, making technology accessible and meaningful for everyone."
      ]
    }
  };


  const handleDownloadCV = () => {
    const link = document.createElement('a');
    link.href = resume; // Update with actual path
    link.download = 'Vishwa_Resume.pdf';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <motion.section
      className="w-full min-h-screen py-10 flex items-start sm:items-center"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
      variants={containerVariants}
    >
      <div className="w-full flex flex-col-reverse lg:flex-row gap-12 md:gap-16 items-center">
        
        {/* Left Content */}
        <motion.div 
          variants={itemVariants} 
          className="w-full max-w-xl space-y-8 order-2 lg:order-1"
        >
          {/* Header with animated title */}
          <div className="space-y-4">
            <motion.div
              className="flex items-center gap-3"
              whileHover={{ x: 10 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <Sparkles className="text-cyan-400" size={32} />
              <h2 className="text-4xl md:text-5xl font-bold">
                <span className="text-white">About</span>
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-400 ml-2 md:ml-3">Me</span>
              </h2>
            </motion.div>
            <motion.div
              className="h-1 bg-gradient-to-r from-cyan-400 to-blue-400 rounded-full"
              initial={{ width: 0 }}
              whileInView={{ width: "8rem" }}
              transition={{ duration: 1, delay: 0.5 }}
            />
          </div>


          {/* Interactive Tabs */}
          <div className="space-y-6 mt-6">
            <div className="flex flex-wrap gap-2">
              {Object.keys(tabData).map((tab) => (
                <motion.button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                    activeTab === tab
                      ? 'bg-cyan-500 text-white shadow-lg shadow-cyan-500/25'
                      : 'bg-gray-800 text-gray-400 hover:bg-gray-700 hover:text-cyan-300'
                  }`}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {tab.charAt(0).toUpperCase() + tab.slice(1)}
                </motion.button>
              ))}
            </div>
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTab}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
                className="space-y-4"
              >
                <h3 className="text-lg sm:text-xl font-semibold text-cyan-400 mb-2">
                  {tabData[activeTab].title}
                </h3>
                {tabData[activeTab].content.map((paragraph, idx) => (
                  <p key={idx} className="text-gray-300 leading-relaxed text-base sm:text-lg">
                    {paragraph}
                  </p>
                ))}
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Action Buttons */}
          <motion.div variants={itemVariants} className="flex flex-wrap gap-4 pt-2">
            <motion.button
              className="px-6 py-3 sm:px-8 sm:py-4 bg-gradient-to-r from-cyan-600 to-blue-600 text-white rounded-xl font-semibold flex items-center gap-3 relative overflow-hidden group shadow-lg shadow-cyan-500/25 w-full sm:w-auto"
              whileHover={{ 
                scale: 1.05, 
                boxShadow: "0 0 30px rgba(6, 182, 212, 0.4)" 
              }}
              transition={{ type: "spring", stiffness: 400, damping: 10 }}
              onClick={() => {
                const contactSection = document.getElementById('contact');
                if (contactSection) {
                  contactSection.scrollIntoView({ behavior: 'smooth' });
                }
              }}
            >
              <Mail size={20} className="group-hover:animate-pulse" />
              <span>Let's Work Together</span>
              <motion.div
                className="absolute inset-0 bg-white/10"
                initial={{ x: "-100%" }}
                whileHover={{ x: "100%" }}
                transition={{ duration: 0.6 }}
              />
            </motion.button>
            
            <motion.button
              className="px-6 py-3 sm:px-8 sm:py-4 bg-transparent border-2 border-cyan-500 text-cyan-400 rounded-xl font-semibold flex items-center gap-3 relative overflow-hidden group w-full sm:w-auto"
              whileHover={{ 
                scale: 1.05, 
                boxShadow: "0 0 25px rgba(6, 182, 212, 0.3)" 
              }}
              transition={{ type: "spring", stiffness: 400, damping: 10 }}
              onClick={handleDownloadCV}
            >
              <Download size={20} className="group-hover:translate-y-1 transition-transform duration-300" />
              <span>Download Resume</span>
              <motion.div
                className="absolute inset-0 bg-cyan-500/10"
                initial={{ opacity: 0 }}
                whileHover={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
              />
            </motion.button>
          </motion.div>
        </motion.div>
        
        {/* Right Image Section */}
        <motion.div 
          variants={itemVariants} 
          className="w-full flex justify-center items-center order-1 lg:order-2 mb-8 lg:mb-0"
        >
          <div className="relative w-64 sm:w-80 h-80 sm:h-96 md:w-96 md:h-[500px] lg:w-[420px] lg:h-[550px]">
            {/* Main Image Container */}
            <motion.div
              className="absolute inset-0 rounded-2xl border-2 border-cyan-500/40 p-2 bg-gradient-to-br from-cyan-500/10 to-blue-500/10 backdrop-blur-sm"
              animate={{
                boxShadow: [
                  "0 0 0 rgba(6, 182, 212, 0.1)",
                  "0 0 40px rgba(6, 182, 212, 0.3)",
                  "0 0 0 rgba(6, 182, 212, 0.1)"
                ]
              }}
              transition={{ duration: 4, repeat: Infinity }}
            >
              <div className="w-full h-full bg-gradient-to-br from-gray-900 to-black rounded-xl overflow-hidden relative">
                {/* Loading Skeleton */}
                {!isImageLoaded && (
                  <div className="absolute inset-0 bg-gray-800 animate-pulse rounded-xl" />
                )}
                {/* Profile Image */}
                <motion.img
                  src={profileImage}
                  alt="Vishwa - Full Stack Developer"
                  className="w-full h-full object-cover object-center rounded-xl"
                  onLoad={() => setIsImageLoaded(true)}
                  whileHover={{ scale: 1.03 }}
                  transition={{ duration: 0.4 }}
                  style={{ 
                    opacity: isImageLoaded ? 1 : 0,
                    transition: 'opacity 0.5s ease-in-out'
                  }}
                />
                {/* Overlay Gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent rounded-xl" />
              </div>
            </motion.div>
            {/* Decorative Corners & Glows */}
            <motion.div
              className="absolute -top-4 -left-4 w-10 h-10 border-t-2 border-l-2 border-cyan-400 rounded-tl-lg"
              animate={{ rotate: [0, 5, 0] }}
              transition={{ duration: 3, repeat: Infinity }}
            />
            <motion.div
              className="absolute -bottom-4 -right-4 w-10 h-10 border-b-2 border-r-2 border-cyan-400 rounded-br-lg"
              animate={{ rotate: [0, -5, 0] }}
              transition={{ duration: 3, repeat: Infinity, delay: 1.5 }}
            />
            <motion.div
              className="absolute -top-6 left-1/2 -translate-x-1/2 bg-gradient-to-r from-cyan-500 to-blue-500 text-white px-4 py-2 rounded-full text-sm font-semibold shadow-lg"
              initial={{ y: -20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 1, duration: 0.6 }}
            >
              Full-Stack Developer
            </motion.div>
            {/* Glow Effects */}
            <div className="absolute -inset-1 rounded-2xl bg-cyan-500 opacity-20 blur-lg -z-10" />
            <div className="absolute -bottom-8 -right-8 w-24 h-24 sm:w-32 sm:h-32 bg-cyan-500 rounded-full filter blur-3xl opacity-15 -z-10" />
            <div className="absolute -top-8 -left-8 w-16 h-16 sm:w-24 sm:h-24 bg-blue-500 rounded-full filter blur-2xl opacity-10 -z-10" />
          </div>
        </motion.div>
      </div>
    </motion.section>
  );
};

export default About;
