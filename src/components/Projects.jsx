import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Github, ExternalLink, X, Calendar, User, Award, Code, Database, Smartphone, Server } from 'lucide-react';

const ProjectCard = ({ project, onClick }) => {
  return (
    <motion.div 
      className="bg-gray-900/50 backdrop-blur-sm rounded-lg border border-gray-800 overflow-hidden group cursor-pointer"
      whileHover={{ 
        scale: 1.03, 
        borderColor: "#00ffcc",
        boxShadow: "0 0 20px rgba(0, 255, 204, 0.2)"
      }}
      onClick={() => onClick(project)}
      layout
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ 
        duration: 0.5,
        layout: { duration: 0.3 }
      }}
      viewport={{ once: true, amount: 0.1 }}
    >
      <div className="relative overflow-hidden">
        {/* Project Icon/Visual */}
        <div className="aspect-video bg-gradient-to-br from-gray-800 to-gray-900 flex items-center justify-center">
          <motion.div 
            className="w-16 h-16 rounded-full bg-cyan-500/20 flex items-center justify-center"
            whileHover={{ scale: 1.1, rotate: 180 }}
            transition={{ duration: 0.3 }}
          >
            {project.icon}
          </motion.div>
        </div>
        
        {/* Hover Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end">
          <div className="p-4 w-full">
            <div className="flex justify-between items-center">
              <h4 className="text-white font-semibold">{project.title}</h4>
              <div className="flex gap-2">
                <motion.div
                  className="text-gray-300 hover:text-cyan-400 transition-colors p-1 rounded"
                  whileHover={{ scale: 1.2 }}
                  onClick={(e) => e.stopPropagation()}
                >
                  <Github size={18} />
                </motion.div>
                <motion.div
                  className="text-gray-300 hover:text-cyan-400 transition-colors p-1 rounded"
                  whileHover={{ scale: 1.2 }}
                  onClick={(e) => e.stopPropagation()}
                >
                  <ExternalLink size={18} />
                </motion.div>
              </div>
            </div>
            <div className="flex items-center gap-2 mt-2">
              <Calendar size={14} className="text-cyan-400" />
              <span className="text-sm text-gray-300">{project.duration}</span>
            </div>
          </div>
        </div>
      </div>
      
      <div className="p-6">
        <div className="flex items-center gap-2 mb-2">
          <h3 className="text-xl font-bold text-white">{project.title}</h3>
          {project.isRecent && (
            <motion.span 
              className="px-2 py-1 text-xs bg-cyan-500/20 text-cyan-400 rounded-full border border-cyan-500/30"
              animate={{ opacity: [0.5, 1, 0.5] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              Recent
            </motion.span>
          )}
        </div>
        
        <p className="text-gray-400 mb-4 line-clamp-3">{project.shortDescription}</p>
        
        {/* Contribution Badge */}
        <div className="flex items-center gap-2 mb-4">
          <User size={14} className="text-cyan-400" />
          <span className="text-sm text-gray-300">{project.role}</span>
        </div>
        
        {/* Technology Tags */}
        <div className="flex flex-wrap gap-2">
          {project.technologies.slice(0, 3).map((tech, index) => (
            <span 
              key={index}
              className="text-xs px-2 py-1 rounded-full bg-gray-800 text-gray-300 border border-gray-700 hover:border-cyan-500/50 transition-colors"
            >
              {tech}
            </span>
          ))}
          {project.technologies.length > 3 && (
            <span className="text-xs px-2 py-1 rounded-full bg-cyan-500/20 text-cyan-400 border border-cyan-500/30">
              +{project.technologies.length - 3} more
            </span>
          )}
        </div>
      </div>
    </motion.div>
  );
};

const ProjectModal = ({ project, onClose }) => {
  return (
    <AnimatePresence>
      <motion.div 
        className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
      >
        <motion.div 
          className="bg-gray-900 border border-gray-800 rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto"
          initial={{ scale: 0.9, opacity: 0, y: 50 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.9, opacity: 0, y: 50 }}
          transition={{ type: "spring", damping: 20 }}
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className="relative bg-gradient-to-r from-gray-800 to-gray-900 p-8">
            <div className="flex items-center gap-4 mb-4">
              <motion.div 
                className="w-12 h-12 rounded-full bg-cyan-500/20 flex items-center justify-center"
                whileHover={{ scale: 1.1, rotate: 180 }}
                transition={{ duration: 0.3 }}
              >
                {project.icon}
              </motion.div>
              <div>
                <h2 className="text-2xl font-bold text-white">{project.title}</h2>
                <p className="text-gray-400">{project.shortDescription}</p>
              </div>
            </div>
            
            <button 
              className="absolute top-4 right-4 w-10 h-10 rounded-full bg-black/50 text-white flex items-center justify-center hover:bg-black/80 transition-colors"
              onClick={onClose}
            >
              <X size={20} />
            </button>
          </div>
          
          <div className="p-8">
            {/* Project Info */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <User className="text-cyan-400" size={20} />
                  <div>
                    <h4 className="text-white font-semibold">My Role</h4>
                    <p className="text-gray-300">{project.role}</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-3">
                  <Calendar className="text-cyan-400" size={20} />
                  <div>
                    <h4 className="text-white font-semibold">Duration</h4>
                    <p className="text-gray-300">{project.duration}</p>
                  </div>
                </div>
              </div>
              
              <div className="flex gap-4">
                <motion.button 
                  className="flex items-center gap-2 px-4 py-2 rounded-md bg-gray-800 text-white hover:bg-gray-700 transition-colors"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Github size={18} />
                  <span>View Code</span>
                </motion.button>
                <motion.button 
                  className="flex items-center gap-2 px-4 py-2 rounded-md bg-cyan-600 text-white hover:bg-cyan-500 transition-colors"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <ExternalLink size={18} />
                  <span>Live Demo</span>
                </motion.button>
              </div>
            </div>
            
            {/* Project Description */}
            <div className="mb-8">
              <h3 className="text-xl font-semibold text-white mb-3 flex items-center gap-2">
                <Code className="text-cyan-400" size={20} />
                Project Overview
              </h3>
              <p className="text-gray-300 leading-relaxed">{project.description}</p>
            </div>
            
            {/* Key Features */}
            {project.features && (
              <div className="mb-8">
                <h3 className="text-xl font-semibold text-white mb-4 flex items-center gap-2">
                  <Award className="text-cyan-400" size={20} />
                  Key Features & Achievements
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {project.features.map((feature, index) => (
                    <motion.div 
                      key={index}
                      className="flex items-start gap-3 p-3 bg-gray-800/50 rounded-lg border border-gray-700"
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                    >
                      <div className="w-2 h-2 rounded-full bg-cyan-400 mt-2 flex-shrink-0"></div>
                      <span className="text-gray-300">{feature}</span>
                    </motion.div>
                  ))}
                </div>
              </div>
            )}
            
            {/* Technologies Used */}
            <div className="mb-6">
              <h3 className="text-xl font-semibold text-white mb-4 flex items-center gap-2">
                <Database className="text-cyan-400" size={20} />
                Technologies Used
              </h3>
              <div className="flex flex-wrap gap-3">
                {project.technologies.map((tech, index) => (
                  <motion.span 
                    key={index}
                    className="px-4 py-2 rounded-lg bg-gray-800 text-gray-300 border border-gray-700 hover:border-cyan-500/50 transition-colors"
                    whileHover={{ scale: 1.05, y: -2 }}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.05 }}
                  >
                    {tech}
                  </motion.span>
                ))}
              </div>
            </div>
            
            {/* Learning Outcomes */}
            {project.learnings && (
              <div className="bg-gradient-to-r from-cyan-500/10 to-blue-500/10 border border-cyan-500/20 rounded-lg p-6">
                <h3 className="text-lg font-semibold text-white mb-3">Key Learnings</h3>
                <ul className="space-y-2">
                  {project.learnings.map((learning, index) => (
                    <li key={index} className="text-gray-300 flex items-start gap-2">
                      <span className="text-cyan-400 mt-1">→</span>
                      {learning}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

const Projects = () => {
  const [selectedProject, setSelectedProject] = useState(null);
  
  const projects = [
    {
      id: 1,
      title: "Lab Management and Scheduling Portal",
      shortDescription: "A comprehensive web application to streamline lab scheduling for educational institutions with role-based access control.",
      description: "Developed a full-stack web application that revolutionizes lab management in educational institutions. The system enables efficient scheduling, mark management, and provides different access levels for administrators, faculty, and examination controllers. Features a responsive dashboard with real-time updates and secure data handling.",
      role: "Frontend Developer - Dashboard & Labs Module",
      duration: "3 months",
      isRecent: true,
      icon: <Database className="text-cyan-400" size={24} />,
      features: [
        "Admin lab assignment and scheduling system",
        "Faculty dashboard for schedule management",
        "Secure mark entry and management",
        "Controller of Examinations (COE) mark locking system",
        "Real-time schedule updates and notifications",
        "Responsive design for mobile and desktop"
      ],
      technologies: ["React.js", "Nest.js", "TypeScript", "MySQL"],
      learnings: [
        "Advanced React.js component architecture and state management",
        "Backend API integration with Nest.js",
        "Database design and optimization with MySQL",
        "Implementing role-based access control systems"
      ]
    },
    {
      id: 2,
      title: "Examination Management System",
      shortDescription: "A robust system designed to streamline the complete exam process for educational institutions with automated scheduling.",
      description: "Built a comprehensive examination management system that automates the entire exam lifecycle from scheduling to result processing. The system handles multiple exam types, automated seat allocation, and provides detailed analytics for institutional decision-making.",
      role: "Backend Developer - Database Architecture",
      duration: "4 months",
      isRecent: false,
      icon: <Server className="text-cyan-400" size={24} />,
      features: [
        "Automated exam scheduling and seat allocation",
        "Multi-format exam support (MCQ, Descriptive, Practical)",
        "Real-time exam monitoring and analytics",
        "Integrated result processing and grade calculation",
        "Secure question paper management",
        "Student performance analytics and reporting"
      ],
      technologies: ["HTML", "CSS", "JavaScript", "Express.js", "MongoDB"],
      learnings: [
        "NoSQL database design with MongoDB",
        "Express.js server architecture and middleware implementation",
        "RESTful API design and documentation",
        "Frontend-backend integration strategies"
      ]
    },
    {
      id: 3,
      title: "Gym Management System (UI/UX)",
      shortDescription: "Mobile-first responsive interface for comprehensive gym management with member tracking and workout planning.",
      description: "Designed and developed a user-friendly mobile interface for a comprehensive gym management system. Focused on creating intuitive user experiences for both gym staff and members, with emphasis on mobile optimization and cross-platform compatibility.",
      role: "Frontend Developer - Mobile UI Design",
      duration: "2 months",
      isRecent: false,
      icon: <Smartphone className="text-cyan-400" size={24} />,
      features: [
        "Mobile-first responsive design",
        "Member registration and profile management",
        "Workout plan creation and tracking",
        "Equipment booking and availability system",
        "Payment integration and membership tracking",
        "Real-time gym capacity monitoring"
      ],
      technologies: ["React", "CSS3", "JavaScript", "Mobile UI Design"],
      learnings: [
        "Mobile-first design principles and responsive layouts",
        "Cross-platform UI/UX optimization",
        "Performance optimization for mobile devices",
        "User experience design for fitness applications"
      ]
    },
    {
      id: 4,
      title: "Quranium Blockchain Project",
      shortDescription: "Innovative blockchain-based application focusing on secure backend systems and decentralized architecture.",
      description: "Currently contributing to an advanced blockchain project that explores decentralized applications and secure backend systems. The project involves implementing core blockchain concepts while building scalable and efficient backend infrastructure.",
      role: "Backend Developer - Blockchain Integration",
      duration: "3 months (Ongoing)",
      isRecent: true,
      icon: <Code className="text-cyan-400" size={24} />,
      features: [
        "Blockchain core concept implementation",
        "Secure backend system architecture",
        "Decentralized application (DApp) development",
        "Smart contract integration",
        "Cryptographic security protocols",
        "Distributed ledger management"
      ],
      technologies: ["Node.js", "Blockchain", "Cryptography", "Backend Development"],
      learnings: [
        "Blockchain technology fundamentals and implementation",
        "Cryptographic protocols and security measures",
        "Decentralized application architecture",
        "Advanced backend development patterns"
      ]
    }
  ];
  
  return (
    <motion.div 
      className="w-full"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
      viewport={{ once: true, amount: 0.1 }}
    >
      <motion.div
        initial={{ y: 50, opacity: 0 }}
        whileInView={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
        className="text-center mb-16"
      >
        <h2 className="text-3xl font-bold inline-block">
          <span className="text-white">Featured</span>
          <span className="text-cyan-400 ml-2">Projects</span>
          <span className="block h-1 bg-cyan-400 mt-1"></span>
        </h2>
        <p className="text-gray-400 mt-4 max-w-2xl mx-auto">
          A showcase of my recent work spanning full-stack development, blockchain technology, and mobile applications. 
          Each project demonstrates my growth as a developer and commitment to creating impactful solutions.
        </p>
      </motion.div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {projects.map((project, index) => (
          <motion.div
            key={project.id}
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            viewport={{ once: true, amount: 0.1 }}
          >
            <ProjectCard 
              project={project} 
              onClick={setSelectedProject}
            />
          </motion.div>
        ))}
      </div>
      
      {/* Achievement Banner */}
      <motion.div 
        className="mt-16 p-8 bg-gradient-to-r from-cyan-500/10 to-blue-500/10 border border-cyan-500/20 rounded-lg"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        viewport={{ once: true }}
      >
        <div className="text-center">
          <h3 className="text-2xl font-bold text-white mb-4 flex items-center justify-center gap-3">
            <Award className="text-cyan-400" size={28} />
            Recent Achievements
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-gray-800/50 p-6 rounded-lg border border-gray-700">
              <h4 className="text-lg font-semibold text-cyan-400 mb-2">Cryptra 2k25 Coding Contest</h4>
              <p className="text-gray-300 mb-2">🏆 1st Prize Winner</p>
              <p className="text-sm text-gray-400">Coimbatore Institute of Technology, Feb 2025</p>
            </div>
            <div className="bg-gray-800/50 p-6 rounded-lg border border-gray-700">
              <h4 className="text-lg font-semibold text-cyan-400 mb-2">Codeathon Competition</h4>
              <p className="text-gray-300 mb-2">🏆 1st Prize Winner</p>
              <p className="text-sm text-gray-400">National Engineering College, Oct 2023</p>
            </div>
          </div>
        </div>
      </motion.div>
      
      {selectedProject && (
        <ProjectModal 
          project={selectedProject} 
          onClose={() => setSelectedProject(null)}
        />
      )}
    </motion.div>
  );
};

export default Projects;
