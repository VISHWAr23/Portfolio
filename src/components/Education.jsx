import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  GraduationCap, 
  Award, 
  BookOpen, 
  Briefcase, 
  MapPin, 
  Calendar,
  Clock,
  Star,
  CheckCircle,
  User,
  TrendingUp
} from 'lucide-react';

// Enhanced Timeline Item Component
const TimelineItem = ({ 
  year, 
  title, 
  institution, 
  description, 
  icon: Icon, 
  isLast, 
  delay = 0, 
  status,
  highlights = [],
  location 
}) => {
  return (
    <motion.div 
      className="flex gap-4 md:gap-6 relative group"
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay, ease: "easeOut" }}
      viewport={{ once: true, amount: 0.1 }}
    >
      {/* Timeline line */}
      {!isLast && (
        <motion.div 
          className="absolute left-5 md:left-7 top-16 w-0.5 h-full bg-gradient-to-b from-cyan-500 to-gray-800"
          initial={{ scaleY: 0 }}
          whileInView={{ scaleY: 1 }}
          transition={{ duration: 0.8, delay: delay + 0.3 }}
          style={{ transformOrigin: 'top' }}
        />
      )}
      
      {/* Icon bubble */}
      <div className="relative z-10 mt-2 flex-shrink-0">
        <motion.div 
          className="w-10 h-10 md:w-14 md:h-14 rounded-full bg-gradient-to-br from-cyan-500 to-blue-500 border-2 border-white/20 flex items-center justify-center text-white shadow-lg"
          whileHover={{ 
            scale: 1.1, 
            boxShadow: "0 0 20px rgba(6, 182, 212, 0.4)" 
          }}
        >
          <Icon size={window.innerWidth < 768 ? 18 : 22} />
        </motion.div>
        
        {/* Status indicator */}
        {status && (
          <motion.div
            className={`absolute -top-1 -right-1 w-3 h-3 md:w-4 md:h-4 rounded-full border-2 border-gray-900 ${
              status === 'current' ? 'bg-green-400' : 'bg-blue-400'
            }`}
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
          />
        )}
      </div>
      
      {/* Content */}
      <motion.div 
        className="flex-1 pb-8 md:pb-12 min-w-0"
        whileHover={{ x: 5 }}
        transition={{ type: "spring", stiffness: 300 }}
      >
        <motion.div className="bg-gray-900/50 backdrop-blur-sm border border-gray-800 rounded-lg md:rounded-xl p-4 md:p-6 hover:border-cyan-500/50 transition-all duration-300">
          {/* Header */}
          <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2 md:gap-3 mb-3 md:mb-4">
            <div className="flex flex-col sm:flex-row sm:items-center gap-2 md:gap-3 min-w-0">
              <motion.span 
                className="text-xs md:text-sm font-mono bg-gradient-to-r from-cyan-500/20 to-blue-500/20 text-cyan-400 px-2 md:px-3 py-1 md:py-1.5 rounded-full border border-cyan-500/30 w-fit"
                whileHover={{ scale: 1.05 }}
              >
                {year}
              </motion.span>
              {location && (
                <div className="flex items-center gap-1 text-gray-400 text-xs md:text-sm">
                  <MapPin size={12} />
                  <span className="truncate">{location}</span>
                </div>
              )}
            </div>
            
            {status && (
              <motion.div
                className={`flex items-center gap-1 text-xs px-2 py-1 rounded-full w-fit flex-shrink-0 ${
                  status === 'current' 
                    ? 'bg-green-500/20 text-green-400 border border-green-500/30'
                    : 'bg-blue-500/20 text-blue-400 border border-blue-500/30'
                }`}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: delay + 0.5 }}
              >
                <CheckCircle size={10} />
                <span>{status === 'current' ? 'Ongoing' : 'Completed'}</span>
              </motion.div>
            )}
          </div>

          {/* Title and Institution */}
          <h3 className="text-lg md:text-xl font-bold text-white mb-2 group-hover:text-cyan-300 transition-colors">
            {title}
          </h3>
          <p className="text-gray-300 mb-3 font-medium flex items-center gap-2 text-sm md:text-base">
            <span className="w-2 h-2 bg-cyan-400 rounded-full flex-shrink-0"></span>
            <span className="min-w-0 break-words">{institution}</span>
          </p>

          {/* Description */}
          <p className="text-gray-400 leading-relaxed mb-4 text-sm md:text-base">
            {description}
          </p>

          {/* Highlights */}
          {highlights.length > 0 && (
            <motion.div 
              className="space-y-2"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ delay: delay + 0.7 }}
            >
              <h4 className="text-cyan-400 font-semibold text-xs md:text-sm flex items-center gap-2">
                <Star size={12} />
                Key Highlights
              </h4>
              <ul className="space-y-1">
                {highlights.map((highlight, idx) => (
                  <motion.li 
                    key={idx}
                    className="text-gray-300 text-xs md:text-sm flex items-start gap-2"
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: delay + 0.8 + (idx * 0.1) }}
                  >
                    <span className="text-cyan-400 mt-0.5 flex-shrink-0">•</span>
                    <span className="min-w-0 break-words">{highlight}</span>
                  </motion.li>
                ))}
              </ul>
            </motion.div>
          )}
        </motion.div>
      </motion.div>
    </motion.div>
  );
};

// Statistics Card Component
const StatsCard = ({ icon: Icon, label, value, color = "cyan" }) => {
  const colorClasses = {
    cyan: "from-cyan-500/20 to-blue-500/20 border-cyan-500/30 text-cyan-400",
    green: "from-green-500/20 to-emerald-500/20 border-green-500/30 text-green-400",
    purple: "from-purple-500/20 to-pink-500/20 border-purple-500/30 text-purple-400",
    orange: "from-orange-500/20 to-red-500/20 border-orange-500/30 text-orange-400"
  };

  return (
    <motion.div
      className={`bg-gradient-to-br ${colorClasses[color]} border rounded-lg md:rounded-xl p-3 md:p-4 text-center`}
      whileHover={{ scale: 1.05, y: -5 }}
      transition={{ type: "spring", stiffness: 300 }}
    >
      <Icon size={window.innerWidth < 768 ? 20 : 24} className="mx-auto mb-2" />
      <div className="text-xl md:text-2xl font-bold text-white">{value}</div>
      <div className="text-xs md:text-sm opacity-80">{label}</div>
    </motion.div>
  );
};

// Main Education Component
const Education = () => {
  const [activeTab, setActiveTab] = useState('education');
  const [isMobile, setIsMobile] = useState(false);

  // Check for mobile screen size
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.15, delayChildren: 0.2 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 40 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } }
  };

  // Enhanced Education data
  const educationData = [
    {
      year: "2022 - Present",
      title: "B.Tech in Information Technology",
      institution: "National Engineering College",
      description: "Currently pursuing Bachelor's degree with a CGPA of 8.22 (up to 5th semester). Focused on backend development, blockchain technology, and software engineering.",
      icon: GraduationCap,
      status: "current",
      location: "Kovilpatti, Tamil Nadu",
      highlights: [
        "CGPA: 8.22/10 (5 semesters)",
        "Active CSI Event Organizer",
        "Specialized in Backend Development",
        "Blockchain Technology Focus"
      ]
    },
    {
      year: "2020 - 2022",
      title: "Higher Secondary Certificate (HSC)",
      institution: "P.A.C.M Higher Secondary School",
      description: "Completed HSC with 84% marks. Strong foundation in mathematics and computer science subjects.",
      icon: BookOpen,
      status: "completed",
      highlights: [
        "84% Overall Score",
        "Mathematics Excellence",
        "Computer Science Foundation"
      ]
    },
    {
      year: "2019 - 2020",
      title: "Secondary School Leaving Certificate (SSLC)",
      institution: "P.A.C.M Higher Secondary School",
      description: "Completed SSLC with 79% marks. Built fundamental academic skills and developed interest in technology.",
      icon: BookOpen,
      status: "completed",
      highlights: [
        "79% Overall Score",
        "Strong Academic Foundation",
        "Early Tech Interest"
      ]
    },
    {
      year: "2025",
      title: "Database Programming with SQL - Oracle",
      institution: "Oracle",
      description: "Oracle certification in database programming with SQL. Gained expertise in SQL queries, database design, and Oracle technologies.",
      icon: Award,
      status: "completed",
      highlights: [
        "Professional Oracle Certification",
        "Advanced SQL Proficiency",
        "Database Design Expertise"
      ],
      isLast: true
    }
  ];

  // Enhanced Experience data
  const experienceData = [
    {
      year: "2024 - Present",
      title: "Backend Development Internship",
      institution: "Vlinder Labs and Private Limited",
      description: "3-month on-site internship in Kovilpatti. Gaining practical experience in backend development and blockchain technology, exploring core blockchain concepts while contributing to secure and efficient backend systems.",
      icon: Briefcase,
      status: "current",
      location: "Kovilpatti, Tamil Nadu",
      highlights: [
        "Working on Quranium Project",
        "Blockchain Technology Implementation",
        "Backend Systems Development",
        "On-site Professional Experience"
      ]
    },
    {
      year: "2024",
      title: "Frontend Development Internship",
      institution: "Shunmuga AI Technologies",
      description: "2-month online internship. Worked on the frontend team with focus on mobile UI design and optimization. Helped build responsive, user-friendly interfaces.",
      icon: Briefcase,
      status: "completed",
      location: "Remote",
      highlights: [
        "Mobile UI Design Focus",
        "Gym Management System UI",
        "Responsive Interface Development",
        "User Experience Optimization"
      ]
    },
    {
      year: "2024",
      title: "Oracle Technologies Course",
      institution: "Vibhathi Labs",
      description: "3-month industry-oriented course completed online. Focused on Oracle technologies with hands-on experience in SQL, PL/SQL and Oracle APEX.",
      icon: Briefcase,
      status: "completed",
      location: "Online",
      highlights: [
        "Oracle APEX Development",
        "PL/SQL Programming",
        "Database Management",
        "Industry-Oriented Training"
      ],
      isLast: true
    }
  ];

  // Statistics data
  const statsData = [
    { icon: GraduationCap, label: "Education Years", value: "6+", color: "cyan" },
    { icon: Briefcase, label: "Internships", value: "3", color: "green" },
    { icon: Award, label: "Certifications", value: "2+", color: "purple" },
    { icon: TrendingUp, label: "CGPA", value: "8.22", color: "orange" }
  ];

  const tabData = {
    education: {
      title: "Educational Background",
      subtitle: "Academic foundation and certifications that shaped my technical expertise",
      data: educationData,
      icon: GraduationCap
    },
    experience: {
      title: "Professional Experience",
      subtitle: "Hands-on experience and practical learning through internships and courses",
      data: experienceData,
      icon: Briefcase
    }
  };

  return (
    <motion.section
      className="w-full min-h-screen py-12 md:py-20 px-4 md:px-8"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
      variants={containerVariants}
    >
      <div className="max-w-6xl mx-auto">
        {/* Header Section */}
        <motion.div
          variants={itemVariants}
          className="text-center mb-12 md:mb-16"
        >
          <div className="flex items-center justify-center gap-3 mb-4">
            <User className="text-cyan-400" size={isMobile ? 28 : 32} />
            <h1 className="text-3xl md:text-5xl font-bold">
              <span className="text-white">My</span>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-400 ml-2">Journey</span>
            </h1>
          </div>
          
          <motion.div
            className="h-1 w-16 md:w-24 bg-gradient-to-r from-cyan-400 to-blue-400 mx-auto rounded-full mb-6"
            initial={{ width: 0 }}
            whileInView={{ width: isMobile ? "4rem" : "6rem" }}
            transition={{ duration: 1, delay: 0.5 }}
          />
          
          <p className="text-gray-300 text-base md:text-lg max-w-2xl mx-auto leading-relaxed">
            Explore my educational foundation and professional experiences that shaped my expertise in 
            <span className="text-cyan-400 font-semibold"> full-stack development</span> and 
            <span className="text-blue-400 font-semibold"> emerging technologies</span>.
          </p>
        </motion.div>

        {/* Statistics Section */}
        <motion.div
          variants={itemVariants}
          className="mb-12 md:mb-16"
        >
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-6">
            {statsData.map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <StatsCard {...stat} />
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Tab Navigation */}
        <motion.div
          variants={itemVariants}
          className="flex justify-center mb-8 md:mb-12"
        >
          <div className="bg-gray-900/50 backdrop-blur-sm border border-gray-800 rounded-lg md:rounded-xl p-1 md:p-1.5">
            <div className="flex gap-1 md:gap-2">
              {Object.keys(tabData).map((tab) => {
                const TabIcon = tabData[tab].icon;
                return (
                  <motion.button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={`px-4 md:px-6 py-2 md:py-3 rounded-lg md:rounded-xl text-sm md:text-base font-medium transition-all duration-300 flex items-center gap-2 ${
                      activeTab === tab
                        ? 'bg-cyan-500 text-white shadow-lg shadow-cyan-500/25'
                        : 'text-gray-400 hover:text-cyan-300 hover:bg-gray-800/50'
                    }`}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <TabIcon size={isMobile ? 16 : 18} />
                    <span>{tab.charAt(0).toUpperCase() + tab.slice(1)}</span>
                  </motion.button>
                );
              })}
            </div>
          </div>
        </motion.div>

        {/* Tab Content */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4 }}
            className="space-y-6 md:space-y-8"
          >
            {/* Tab Header - CORRECTED */}
            {(() => {
              const { icon: TabIcon, title, subtitle } = tabData[activeTab];
              return (
                <div className="text-center mb-8 md:mb-12">
                  <h2 className="text-2xl md:text-3xl font-bold text-white mb-3 md:mb-4 flex items-center justify-center gap-3">
                    <TabIcon className="text-cyan-400" size={isMobile ? 24 : 28} />
                    {title}
                  </h2>
                  <p className="text-gray-400 text-sm md:text-base max-w-2xl mx-auto">
                    {subtitle}
                  </p>
                  <div className="w-16 md:w-20 h-1 bg-gradient-to-r from-cyan-400 to-blue-400 mx-auto rounded-full mt-4"></div>
                </div>
              );
            })()}

            {/* Timeline */}
            <div className="max-w-4xl mx-auto">
              <div className="space-y-4 md:space-y-8">
                {tabData[activeTab].data.map((item, index) => (
                  <TimelineItem 
                    key={`${activeTab}-${index}`}
                    {...item}
                    delay={index * 0.15}
                  />
                ))}
              </div>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Call to Action */}
        <motion.div
          className="text-center mt-12 md:mt-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          viewport={{ once: true }}
        >
          <motion.div
            className="inline-flex items-center gap-2 md:gap-3 bg-gradient-to-r from-cyan-500/10 to-purple-500/10 border border-cyan-500/30 rounded-full px-4 md:px-8 py-3 md:py-4"
            whileHover={{ scale: 1.02, boxShadow: "0 0 25px rgba(6, 182, 212, 0.3)" }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <CheckCircle className="text-green-400" size={isMobile ? 16 : 20} />
            <span className="text-gray-300 font-medium text-sm md:text-base">
              Ready to contribute and continue growing
            </span>
            <motion.div
              className="w-2 h-2 bg-green-400 rounded-full"
              animate={{ scale: [1, 1.5, 1], opacity: [1, 0.5, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            />
          </motion.div>
        </motion.div>
      </div>
    </motion.section>
  );
};

export default Education;
