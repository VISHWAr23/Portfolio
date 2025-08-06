import { motion } from 'framer-motion';
import { useState } from 'react';
import { Code2, Database, Globe, Server, Palette, Cloud } from 'lucide-react';

const SkillCard = ({ skill, index, isSelected, onClick }) => {
  return (
    <motion.div
      className={`
        relative p-6 rounded-xl cursor-pointer transition-all duration-300
        ${isSelected 
          ? 'bg-gradient-to-br from-cyan-500/10 to-blue-500/10 border-cyan-400/50 shadow-lg' 
          : 'bg-gray-800/30 border-gray-700/30 hover:border-cyan-400/30'
        }
        border backdrop-blur-sm
      `}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
      whileHover={{ y: -5, transition: { duration: 0.2 } }}
      onClick={onClick}
    >
      {/* Skill Icon */}
      <div className="flex items-center justify-center w-16 h-16 mx-auto mb-4 rounded-lg bg-gray-700/30">
        <img 
          src={skill.icon} 
          alt={skill.name}
          className="w-10 h-10 object-contain"
        />
      </div>
      
      {/* Skill Name */}
      <h3 className={`text-lg font-semibold text-center mb-2 transition-colors ${
        isSelected ? 'text-cyan-400' : 'text-white'
      }`}>
        {skill.name}
      </h3>
      
      {/* Selected Indicator */}
      {isSelected && (
        <motion.div 
          className="absolute bottom-0 left-1/2 w-8 h-1 bg-cyan-400 rounded-t-full"
          style={{ x: '-50%' }}
          initial={{ width: 0 }}
          animate={{ width: 32 }}
          transition={{ duration: 0.3 }}
        />
      )}
    </motion.div>
  );
};

const SkillDetails = ({ skill }) => {
  if (!skill) return null;

  const getCategoryIcon = (category) => {
    const icons = {
      'Language': <Code2 className="w-5 h-5" />,
      'Frontend': <Globe className="w-5 h-5" />,
      'Backend': <Server className="w-5 h-5" />,
      'Database': <Database className="w-5 h-5" />,
      'Design': <Palette className="w-5 h-5" />,
      'Cloud': <Cloud className="w-5 h-5" />
    };
    return icons[category] || <Code2 className="w-5 h-5" />;
  };

  return (
    <motion.div
      className="bg-gray-800/40 backdrop-blur-sm rounded-xl p-8 border border-gray-700/30"
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3 }}
    >
      <div className="flex items-center gap-4 mb-6">
        <div className="w-20 h-20 rounded-xl bg-gradient-to-br from-cyan-500/20 to-blue-500/20 p-4 border border-cyan-400/30">
          <img 
            src={skill.icon} 
            alt={skill.name}
            className="w-full h-full object-contain"
          />
        </div>
        <div>
          <h2 className="text-3xl font-bold text-white mb-2">{skill.name}</h2>
          <div className="flex items-center gap-2 text-cyan-400">
            {getCategoryIcon(skill.category)}
            <span className="text-sm font-medium">{skill.category}</span>
          </div>
        </div>
      </div>
      
      <p className="text-gray-300 leading-relaxed text-lg">
        {skill.description}
      </p>
      
      {/* <div className="flex items-center gap-2 mt-6">
        <span className="text-sm text-gray-400">Experience:</span>
        <div className="flex gap-1">
          {[...Array(5)].map((_, i) => (
            <div
              key={i}
              className={`w-2 h-2 rounded-full transition-colors duration-300 ${
                i < skill.experience ? 'bg-cyan-400' : 'bg-gray-600'
              }`}
            />
          ))}
        </div>
        <span className="text-sm text-cyan-400 ml-2">{skill.experience}/5</span>
      </div> */}
    </motion.div>
  );
};

const Skills = () => {
  const [selectedSkill, setSelectedSkill] = useState(0);

  const skills = [
    {
      name: "Java",
      icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/java/java-original.svg",
      description: "Enterprise-grade object-oriented programming language used for building scalable and robust applications. Experienced in developing backend services, data structures, and algorithmic problem-solving.",
      category: "Language",
      experience: 4
    },
    {
      name: "TypeScript",
      icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg",
      description: "Strongly typed JavaScript superset that enhances code quality and developer productivity. Proficient in building type-safe applications with modern development practices.",
      category: "Language",
      experience: 4
    },
    {
      name: "Python",
      icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg",
      description: "Versatile programming language used for web development, data analysis, and automation. Comfortable with Python frameworks and libraries for various development tasks.",
      category: "Language",
      experience: 4
    },
    {
      name: "React.js",
      icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg",
      description: "Modern frontend library for building dynamic and interactive user interfaces. Experienced in component-based architecture, state management, and modern React patterns.",
      category: "Frontend",
      experience: 4
    },
    {
      name: "Node.js",
      icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg",
      description: "JavaScript runtime environment for building scalable server-side applications. Proficient in creating RESTful APIs, handling asynchronous operations, and backend development.",
      category: "Backend",
      experience: 4
    },
    {
      name: "Nest.js",
      icon: "https://cdnjs.cloudflare.com/ajax/libs/simple-icons/3.2.0/nestjs.svg",
      description: "Progressive Node.js framework for building efficient and scalable server-side applications. Experienced in creating enterprise-grade APIs with TypeScript and decorators.",
      category: "Backend",
      experience: 4
    },
    {
      name: "MongoDB",
      icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg",
      description: "NoSQL database solution for flexible and scalable data storage. Comfortable with document-based data modeling, aggregation pipelines, and database optimization.",
      category: "Database",
      experience: 4
    },
    {
      name: "MySQL",
      icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original.svg",
      description: "Relational database management system for structured data storage. Proficient in SQL queries, database design, stored procedures, and performance optimization.",
      category: "Database",
      experience: 4
    },
    {
      name: "Git",
      icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg",
      description: "Distributed version control system for tracking code changes and collaboration. Experienced with branching strategies, merge conflicts resolution, and team workflows.",
      category: "Tools",
      experience: 5
    },
    {
      name: "Docker",
      icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg",
      description: "Containerization platform for application deployment and development environment consistency. Knowledgeable in creating Docker images, containers, and deployment strategies.",
      category: "DevOps",
      experience: 3
    },
    {
      name: "AWS",
      icon: "https://cdn.jsdelivr.net/gh/lobehub/lobe-icons@latest/packages/static-png/light/aws.png",
      description: "Cloud computing platform offering comprehensive services for application hosting and deployment. Familiar with EC2, S3, Lambda, and other core AWS services.",
      category: "Cloud",
      experience: 3
    },
    {
      name: "HTML5",
      icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg",
      description: "Modern markup language for creating structured web content. Proficient in semantic HTML, accessibility standards, and modern web development practices.",
      category: "Frontend",
      experience: 5
    }
  ];

  const categories = [...new Set(skills.map(skill => skill.category))];

  return (
    <motion.div 
      className="w-full py-20 bg-black"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
    >
      <div className="container mx-auto px-4">
        {/* Header */}
        <motion.div 
          className="text-center mb-16"
          initial={{ y: 20, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl font-bold text-white mb-4">
            Technical Skills
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            A comprehensive overview of my technical expertise and proficiency across different technologies and tools.
          </p>
        </motion.div>

        {/* Category Filter */}
        <motion.div 
          className="flex flex-wrap justify-center gap-3 mb-12"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          viewport={{ once: true }}
        >
          {categories.map((category, index) => (
            <motion.button
              key={category}
              className="px-4 py-2 rounded-full text-sm font-medium bg-gray-800/50 text-gray-400 border border-gray-700/50 hover:border-cyan-400/50 hover:text-cyan-400 transition-all"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.1 }}
            >
              {category}
            </motion.button>
          ))}
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Skills Grid */}
          <div className="lg:col-span-2">
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {skills.map((skill, index) => (
                <SkillCard
                  key={skill.name}
                  skill={skill}
                  index={index}
                  isSelected={index === selectedSkill}
                  onClick={() => setSelectedSkill(index)}
                />
              ))}
            </div>
          </div>

          {/* Skill Details */}
          <div className="lg:col-span-1">
            <SkillDetails skill={skills[selectedSkill]} />
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default Skills;
