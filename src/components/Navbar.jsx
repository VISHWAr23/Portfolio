import { useState } from 'react';
import { motion } from 'framer-motion';
import { AiOutlineHome, AiOutlineUser, AiOutlineLaptop, AiOutlineProject } from 'react-icons/ai';
import { BiBookAlt } from 'react-icons/bi';
import { MdOutlineContactMail } from 'react-icons/md';

const Navbar = ({ activeSection }) => {
  const links = [
    { id: 'home', text: 'Home', icon: <AiOutlineHome className="md:text-3xl text-2xl" /> },
    { id: 'about', text: 'About', icon: <AiOutlineUser className="md:text-3xl text-2xl" /> },
    { id: 'skills', text: 'Skills', icon: <AiOutlineLaptop className="md:text-3xl text-2xl" /> },
    { id: 'education', text: 'Education', icon: <BiBookAlt className="md:text-3xl text-2xl" /> },
    { id: 'projects', text: 'Projects', icon: <AiOutlineProject className="md:text-3xl text-2xl" /> },
    { id: 'contact', text: 'Contact', icon: <MdOutlineContactMail className="md:text-3xl text-2xl" /> }
  ];

  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      {/* Navigation */}
      <header className="fixed top-1/2 right-2 md:right-4 -translate-y-1/2 z-50">
        <nav className="flex flex-col gap-1.5 md:gap-2 bg-black/80 backdrop-blur-sm p-1.5 md:p-2 rounded-full border border-cyan-500/30">
          {links.map(link => (
            <div key={link.id} className="relative group">
              <motion.button
                className={`p-2 md:p-3 rounded-full transition-colors duration-300
                  ${activeSection === link.id ? 'bg-cyan-400 text-black' : 'text-gray-400 hover:text-cyan-400'}`}
                onClick={() => scrollToSection(link.id)}
                whileHover={{ scale: 1.15 }}
                transition={{ type: 'spring', stiffness: 400, damping: 10 }}
                type="button"
              >
                {link.icon}
              </motion.button>

              {/* Tooltip */}
              <div className="absolute right-full top-1/2 -translate-y-1/2 mr-1.5 md:mr-2 px-2 py-1 bg-black/80 rounded-lg
                              invisible opacity-0 group-hover:visible group-hover:opacity-100 transition-all duration-300">
                <span className="text-cyan-400 whitespace-nowrap text-xs md:text-sm">{link.text}</span>
                {/* Arrow */}
                <div className="absolute top-1/2 -translate-y-1/2 right-[-5px] w-0 h-0 
                                border-l-[5px] border-l-black/80 border-y-[3.5px] border-y-transparent" />
              </div>
            </div>
          ))}
        </nav>
      </header>
    </>
  );
};

export default Navbar;
