import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Send,
  Github,
  Linkedin,
  Mail,
  MapPin,
  Phone,
  Copy,
  Check,
  Calendar,
  Download,
  MessageSquare,
  Sparkles,
} from 'lucide-react';

// Replace with your actual Formspree endpoint
const FORM_ENDPOINT = "https://formspree.io/f/meozryzl"; // Get this from formspree.io

const Contact = () => {
  const [formState, setFormState] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });

  const [formStatus, setFormStatus] = useState({
    isSubmitting: false,
    isSubmitted: false,
    error: null,
  });

  const [copiedField, setCopiedField] = useState(null);
  const [draftSaved, setDraftSaved] = useState(false);
  const [messageCount, setMessageCount] = useState(0);
  const [showAvailability, setShowAvailability] = useState(true);

  const maxMessageLength = 500;

  // Auto-save draft functionality
  useEffect(() => {
    const timer = setTimeout(() => {
      if (formState.message.length > 10) {
        localStorage.setItem('contactDraft', JSON.stringify(formState));
        setDraftSaved(true);
        setTimeout(() => setDraftSaved(false), 2000);
      }
    }, 2000);

    return () => clearTimeout(timer);
  }, [formState]);

  // Load draft on component mount
  useEffect(() => {
    const savedDraft = localStorage.getItem('contactDraft');
    if (savedDraft) {
      setFormState(JSON.parse(savedDraft));
    }
  }, []);

  // Update message character count
  useEffect(() => {
    setMessageCount(formState.message.length);
  }, [formState.message]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    // Limit message length
    if (name === 'message' && value.length > maxMessageLength) {
      return;
    }

    setFormState({
      ...formState,
      [name]: value,
    });
  };

  const validateForm = () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const nameRegex = /^[a-zA-Z\s]{2,}$/;

    if (!nameRegex.test(formState.name)) {
      return 'Please enter a valid name (at least 2 characters, letters only)';
    }

    if (!emailRegex.test(formState.email)) {
      return 'Please enter a valid email address';
    }

    if (formState.subject.length < 3) {
      return 'Subject must be at least 3 characters long';
    }

    if (formState.message.length < 10) {
      return 'Message must be at least 10 characters long';
    }

    return null;
  };

  // Updated handleSubmit with real Formspree integration
  const handleSubmit = async (e) => {
    e.preventDefault();

    const validationError = validateForm();
    if (validationError) {
      setFormStatus({
        isSubmitting: false,
        isSubmitted: false,
        error: validationError,
      });
      return;
    }

    setFormStatus({ isSubmitting: true, isSubmitted: false, error: null });

    // Create FormData for Formspree
    const formData = new FormData();
    formData.append('name', formState.name);
    formData.append('email', formState.email);
    formData.append('subject', formState.subject);
    formData.append('message', formState.message);

    try {
      const response = await fetch(FORM_ENDPOINT, {
        method: 'POST',
        body: formData,
        headers: {
          'Accept': 'application/json'
        },
      });

      if (response.ok) {
        setFormStatus({
          isSubmitting: false,
          isSubmitted: true,
          error: null,
        });

        // Clear form and localStorage
        setFormState({
          name: '',
          email: '',
          subject: '',
          message: '',
        });
        localStorage.removeItem('contactDraft');

        // Reset success state after 5 seconds
        setTimeout(() => {
          setFormStatus({ isSubmitting: false, isSubmitted: false, error: null });
        }, 5000);
      } else {
        const data = await response.json();
        if (data.errors) {
          setFormStatus({
            isSubmitting: false,
            isSubmitted: false,
            error: data.errors.map(error => error.message).join(', ')
          });
        } else {
          setFormStatus({
            isSubmitting: false,
            isSubmitted: false,
            error: 'Failed to send message. Please try again.'
          });
        }
      }
    } catch (error) {
      setFormStatus({
        isSubmitting: false,
        isSubmitted: false,
        error: 'Network error. Please check your connection and try again.',
      });
    }
  };

  const copyToClipboard = async (text, field) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedField(field);
      setTimeout(() => setCopiedField(null), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  const inputClasses = `w-full bg-gray-900/50 backdrop-blur-sm text-gray-300 border border-gray-700 rounded-lg px-4 py-3
    focus:outline-none focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/20
    transition-all duration-300 placeholder-gray-500
    hover:border-gray-600 hover:bg-gray-900/70`;

  const contactInfo = [
    {
      icon: <Phone size={22} />,
      label: 'Phone',
      value: '+91 9626684381',
      copyValue: '+919626684381',
      href: 'tel:+919626684381',
    },
    {
      icon: <Mail size={22} />,
      label: 'Email',
      value: 'vishwarajkumar05@gmail.com',
      copyValue: 'vishwarajkumar05@gmail.com',
      href: 'mailto:vishwarajkumar05@gmail.com',
    },
    {
      icon: <Linkedin size={22} />,
      label: 'LinkedIn',
      value: 'linkedin.com/in/vishwar23',
      copyValue: 'https://linkedin.com/in/vishwar23',
      href: 'https://linkedin.com/in/vishwar23',
    },
    {
      icon: <Github size={22} />,
      label: 'GitHub',
      value: 'github.com/vishwar23',
      copyValue: 'https://github.com/vishwar23',
      href: 'https://github.com/vishwar23',
    },
    {
      icon: <MapPin size={22} />,
      label: 'Location',
      value: 'Virudhunagar, Tamil Nadu 626102',
      copyValue: 'Virudhunagar, Tamil Nadu 626102, India',
    },
  ];

  // Floating particles background (hidden on small screens for performance)
  const particles = Array.from({ length: 50 }, (_, i) => (
    <motion.div
      key={i}
      className="absolute w-1 h-1 bg-cyan-400/20 rounded-full hidden sm:block"
      animate={{
        x: [0, Math.random() * 100 - 50],
        y: [0, Math.random() * 100 - 50],
        opacity: [0, 1, 0],
      }}
      transition={{
        duration: Math.random() * 3 + 2,
        repeat: Infinity,
        delay: Math.random() * 2,
      }}
      style={{
        left: `${Math.random() * 100}%`,
        top: `${Math.random() * 100}%`,
      }}
    />
  ));

  return (
    <div className="relative overflow-hidden min-h-screen bg-black px-4 sm:px-6 md:px-12 py-10">
      {/* Floating Particles Background */}
      <div className="absolute inset-0 pointer-events-none">{particles}</div>

      {/* Main Content */}
      <motion.div
        className="relative z-10 max-w-7xl mx-auto"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true, amount: 0.1 }}
      >
        {/* Header Section */}
        <motion.div
          initial={{ y: 50, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16 max-w-3xl mx-auto"
        >
          <div className="relative inline-block">
            <motion.div
              className="absolute -inset-6 bg-gradient-to-r from-cyan-600/20 to-blue-600/20 rounded-lg blur-xl"
              animate={{
                scale: [1, 1.05, 1],
                opacity: [0.5, 0.8, 0.5],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
            />
            <h2 className="relative text-4xl font-bold text-white">
              <span>Let's Build</span>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-400 ml-2">
                Something Amazing
              </span>
              <motion.div
                className="h-1 bg-gradient-to-r from-cyan-400 to-blue-400 mt-2 rounded-full"
                initial={{ width: 0 }}
                whileInView={{ width: '100%' }}
                transition={{ duration: 1, delay: 0.5 }}
              />
            </h2>
          </div>
          <motion.p
            className="text-gray-400 mt-6 max-w-xl mx-auto text-lg leading-relaxed"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            Ready to transform your ideas into reality? Let's connect and create something extraordinary together!
          </motion.p>
        </motion.div>

        {/* Availability Status */}
        <AnimatePresence>
          {showAvailability && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="flex justify-center mb-8"
            >
              <motion.div
                className="flex items-center gap-3 bg-green-500/10 border border-green-500/30 rounded-full px-6 py-3 select-none"
                whileHover={{ scale: 1.05 }}
              >
                <motion.div
                  className="w-3 h-3 bg-green-400 rounded-full"
                  animate={{
                    scale: [1, 1.2, 1],
                    opacity: [1, 0.7, 1],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                  }}
                />
                <span className="text-green-400 font-medium text-sm sm:text-base">
                  Available for opportunities
                </span>
                <Calendar size={16} className="text-green-400" />
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Information Section */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="space-y-8"
          >
            <div>
              <motion.h3
                className="text-3xl font-bold text-white mb-2 flex items-center gap-3"
                whileHover={{ x: 10 }}
                transition={{ type: 'spring', stiffness: 300 }}
              >
                <Sparkles className="text-cyan-400" size={28} />
                Contact Information
              </motion.h3>
              <p className="text-gray-400 text-sm sm:text-base">Choose your preferred way to connect</p>
            </div>

            <div className="space-y-4">
              {contactInfo.map((item, index) => (
                <motion.div
                  key={index}
                  className="group relative"
                  initial={{ opacity: 0, x: -30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <motion.div
                    className="flex items-center gap-4 p-4 rounded-xl bg-gray-900/30 backdrop-blur-sm border border-gray-800 hover:border-cyan-500/50 transition-all duration-300 cursor-pointer"
                    whileHover={{
                      scale: 1.02,
                      boxShadow: '0 8px 32px rgba(0, 255, 204, 0.1)',
                    }}
                    onClick={() => item.href && window.open(item.href, '_blank')}
                    tabIndex={0}
                    role="link"
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' && item.href) window.open(item.href, '_blank');
                    }}
                    aria-label={`${item.label}: ${item.value}`}
                  >
                    <motion.div
                      className="w-14 h-14 rounded-xl bg-gradient-to-br from-cyan-500/20 to-blue-500/20 border border-cyan-500/30 flex items-center justify-center text-cyan-400 group-hover:from-cyan-500/30 group-hover:to-blue-500/30 transition-all duration-300"
                      whileHover={{ rotate: 5 }}
                    >
                      {item.icon}
                    </motion.div>
                    <div className="flex-1 min-w-0">
                      <p className="text-gray-400 text-xs sm:text-sm font-medium truncate">{item.label}</p>
                      <p className="text-white font-semibold group-hover:text-cyan-300 transition-colors truncate">
                        {item.value}
                      </p>
                    </div>
                    <motion.button
                      onClick={(e) => {
                        e.stopPropagation();
                        copyToClipboard(item.copyValue, item.label);
                      }}
                      className="p-2 rounded-lg bg-gray-800/50 hover:bg-cyan-500/20 text-gray-400 hover:text-cyan-400 transition-all duration-300 opacity-0 group-hover:opacity-100 focus:opacity-100 outline-none"
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      aria-label={`Copy ${item.label}`}
                    >
                      {copiedField === item.label ? (
                        <Check size={16} className="text-green-400" />
                      ) : (
                        <Copy size={16} />
                      )}
                    </motion.button>
                  </motion.div>
                </motion.div>
              ))}
            </div>

            {/* Quick Actions */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="space-y-4"
            >
              <h4 className="text-xl font-bold text-white flex items-center gap-2">
                <MessageSquare className="text-cyan-400" size={20} />
                Quick Actions
              </h4>
              <div className="flex flex-wrap gap-3">
                <motion.a
                  href="https://github.com/vishwar23"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-4 py-2 bg-gray-900/50 border border-gray-700 rounded-lg text-gray-300 hover:text-cyan-400 hover:border-cyan-500/50 transition-all duration-300"
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  aria-label="View Projects on GitHub"
                >
                  <Github size={16} />
                  <span>View Projects</span>
                </motion.a>
                <motion.a
                  href="https://linkedin.com/in/vishwar23"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-4 py-2 bg-gray-900/50 border border-gray-700 rounded-lg text-gray-300 hover:text-cyan-400 hover:border-cyan-500/50 transition-all duration-300"
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  aria-label="Connect on LinkedIn"
                >
                  <Linkedin size={16} />
                  <span>Connect</span>
                </motion.a>
                <motion.button
                  onClick={() => window.open('/Vishwa_resume.pdf', '_blank')}
                  className="flex items-center gap-2 px-4 py-2 bg-gray-900/50 border border-gray-700 rounded-lg text-gray-300 hover:text-cyan-400 hover:border-cyan-500/50 transition-all duration-300"
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  aria-label="Open Resume"
                >
                  <Download size={16} />
                  <span>Resume</span>
                </motion.button>
              </div>
            </motion.div>
          </motion.div>

          {/* Message Form Section */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="relative"
          >
            <div className="sticky top-8 max-w-lg mx-auto sm:mx-0">
              <motion.div
                className="bg-gray-900/20 backdrop-blur-sm border border-gray-800 rounded-2xl p-8 shadow-2xl"
                whileHover={{
                  boxShadow: '0 20px 40px rgba(0, 255, 204, 0.1)',
                }}
                transition={{ duration: 0.3 }}
              >
                <motion.h3
                  className="text-2xl font-bold text-white mb-6 flex items-center gap-3"
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  transition={{ delay: 0.2 }}
                >
                  <Send className="text-cyan-400" size={24} />
                  Send a Message
                </motion.h3>

                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Hidden fields for Formspree */}
                  <input type="hidden" name="_captcha" value="false" />

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.4, delay: 0.1 }}
                      viewport={{ once: true }}
                    >
                      <label htmlFor="name" className="block text-gray-300 text-sm font-medium mb-2">
                        Your Name
                      </label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        placeholder="John Doe"
                        value={formState.name}
                        onChange={handleChange}
                        className={inputClasses}
                        required
                        aria-required="true"
                      />
                    </motion.div>

                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.4, delay: 0.2 }}
                      viewport={{ once: true }}
                    >
                      <label htmlFor="email" className="block text-gray-300 text-sm font-medium mb-2">
                        Email Address
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        placeholder="john@example.com"
                        value={formState.email}
                        onChange={handleChange}
                        className={inputClasses}
                        required
                        aria-required="true"
                      />
                    </motion.div>
                  </div>

                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: 0.3 }}
                    viewport={{ once: true }}
                  >
                    <label htmlFor="subject" className="block text-gray-300 text-sm font-medium mb-2">
                      Subject
                    </label>
                    <input
                      type="text"
                      id="subject"
                      name="subject"
                      placeholder="Project Collaboration Opportunity"
                      value={formState.subject}
                      onChange={handleChange}
                      className={inputClasses}
                      required
                      aria-required="true"
                    />
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: 0.4 }}
                    viewport={{ once: true }}
                  >
                    <div className="flex justify-between items-center mb-2">
                      <label htmlFor="message" className="block text-gray-300 text-sm font-medium">
                        Your Message
                      </label>
                      <motion.span
                        className={`text-xs ${
                          messageCount > maxMessageLength * 0.8 ? 'text-yellow-400' : 'text-gray-500'
                        }`}
                        animate={{
                          color:
                            messageCount > maxMessageLength * 0.9
                              ? '#ef4444'
                              : messageCount > maxMessageLength * 0.8
                              ? '#eab308'
                              : '#6b7280',
                        }}
                        aria-live="polite"
                      >
                        {messageCount}/{maxMessageLength}
                      </motion.span>
                    </div>
                    <textarea
                      id="message"
                      name="message"
                      rows="6"
                      placeholder="Tell me about your project, ideas, or how we can work together..."
                      value={formState.message}
                      onChange={handleChange}
                      className={`${inputClasses} resize-none scrollbar-thin scrollbar-thumb-cyan-600 scrollbar-track-transparent`}
                      required
                      aria-required="true"
                    />
                  </motion.div>

                  {/* Draft Saved Indicator */}
                  <AnimatePresence>
                    {draftSaved && (
                      <motion.div
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.8 }}
                        className="flex items-center gap-2 text-green-400 text-sm"
                        aria-live="polite"
                      >
                        <Check size={16} />
                        <span>Draft saved automatically</span>
                      </motion.div>
                    )}
                  </AnimatePresence>

                  {/* Error Display */}
                  <AnimatePresence>
                    {formStatus.error && (
                      <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        className="p-4 bg-red-500/10 border border-red-500/30 rounded-lg text-red-400 text-sm"
                        role="alert"
                      >
                        {formStatus.error}
                      </motion.div>
                    )}
                  </AnimatePresence>

                  {/* Success Display */}
                  <AnimatePresence>
                    {formStatus.isSubmitted && (
                      <motion.div
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.8 }}
                        className="p-4 bg-green-500/10 border border-green-500/30 rounded-lg text-green-400 text-sm flex items-center gap-2"
                        role="alert"
                      >
                        <Check size={16} />
                        <span>Message sent successfully! I'll get back to you soon.</span>
                      </motion.div>
                    )}
                  </AnimatePresence>

                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: 0.5 }}
                    viewport={{ once: true }}
                  >
                    <motion.button
                      type="submit"
                      disabled={formStatus.isSubmitting}
                      className={`w-full px-8 py-4 bg-gradient-to-r from-cyan-600 to-blue-600 text-white rounded-xl font-semibold
                        flex items-center justify-center gap-3 transition-all duration-300
                        ${formStatus.isSubmitting ? 'opacity-70 cursor-not-allowed' : 'hover:from-cyan-500 hover:to-blue-500 hover:shadow-lg hover:shadow-cyan-500/25'}
                      `}
                      whileHover={
                        !formStatus.isSubmitting
                          ? {
                              scale: 1.02,
                              boxShadow: '0 10px 30px rgba(0, 255, 204, 0.3)',
                            }
                          : {}
                      }
                      whileTap={!formStatus.isSubmitting ? { scale: 0.98 } : {}}
                      aria-live="polite"
                    >
                      <AnimatePresence mode="wait">
                        {formStatus.isSubmitting ? (
                          <motion.div
                            key="loading"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="flex items-center gap-3"
                          >
                            <motion.div
                              animate={{ rotate: 360 }}
                              transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                              className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full"
                            />
                            <span>Sending Message...</span>
                          </motion.div>
                        ) : (
                          <motion.div
                            key="send"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="flex items-center gap-3"
                          >
                            <span>Send Message</span>
                            <Send size={18} />
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </motion.button>
                  </motion.div>
                </form>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
};

export default Contact;
