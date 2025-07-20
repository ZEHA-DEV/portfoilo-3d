'use client';
import { motion, useMotionValue, useTransform } from 'framer-motion';
import { contact } from '@/lib/data'; // Assuming this data file exists and contains contact info, languages, interests.
import { Mail, MapPin, Calendar, Download, Github, Linkedin, Twitter, Send, Sun, Sparkles, Coffee, Award } from 'lucide-react';
import { useState, useRef } from 'react';
import { useInView } from 'react-intersection-observer';

// Islamic color palette (consistent with other components)
const ISLAMIC_COLORS = {
  primary: '#1e3a5f',    // Deep blue
  secondary: '#c9a961',  // Gold
  accent: '#2c5f2d',     // Islamic green
  light: '#f4f4f9',      // Off white
  turquoise: '#4a9d9c',  // Turquoise
  burgundy: '#6d1f2c',   // Deep red
  darkPrimary: '#0d1f3a', // Darker blue for deep backgrounds
  darkSecondary: '#8b6914', // Darker gold
};

// Optimized contact card component with 3D hover effect
function ContactCard({ children, delay = 0, className = "" }: { 
  children: React.ReactNode, 
  delay?: number, 
  className?: string 
}) {
  const cardRef = useRef<HTMLDivElement>(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  
  // Adjusted rotation for a more subtle effect
  const rotateX = useTransform(mouseY, [-100, 100], [3, -3]);
  const rotateY = useTransform(mouseX, [-100, 100], [-3, 3]);
  
  const handleMouseMove = (e: React.MouseEvent) => {
    if (!cardRef.current) return;
    
    const rect = cardRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    
    // Divide by 5 for even more subtle movement
    mouseX.set((e.clientX - centerX) / 5);
    mouseY.set((e.clientY - centerY) / 5);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  return (
    <motion.div
      ref={cardRef}
      className={`relative ${className}`}
      style={{
        rotateX: rotateX,
        rotateY: rotateY,
        transformStyle: 'preserve-3d'
      }}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }} // Trigger when 20% in view
      transition={{ 
        duration: 0.7, // Slightly longer duration
        delay,
        ease: [0.25, 0.46, 0.45, 0.94]
      }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      whileHover={{ z: 10 }}
    >
      {children}
    </motion.div>
  );
}

export function Contact() {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { ref: sectionRef, inView } = useInView({
    threshold: 0.1,
    triggerOnce: true
  });

  const socialLinks = [
    { 
      name: 'GitHub', 
      icon: Github, 
      url: 'https://github.com/zeyadhany',
      color: `hover:text-[${ISLAMIC_COLORS.light}]`,
      bgColor: `hover:bg-[${ISLAMIC_COLORS.primary}]/40`
    },
    { 
      name: 'LinkedIn', 
      icon: Linkedin, 
      url: 'https://linkedin.com/in/ZEHA-DEV',
      color: `hover:text-[${ISLAMIC_COLORS.turquoise}]`,
      bgColor: `hover:bg-[${ISLAMIC_COLORS.turquoise}]/20`
    },
    { 
      name: 'Twitter', 
      icon: Twitter, 
      url: 'https://twitter.com/zeyadhany',
      color: `hover:text-[${ISLAMIC_COLORS.secondary}]`,
      bgColor: `hover:bg-[${ISLAMIC_COLORS.secondary}]/20`
    },
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    // Here you would typically send the form data to your backend
    console.log('Form submitted:', formData);
    
    setIsSubmitting(false);
    setFormData({ name: '', email: '', message: '' });
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  return (
    <section ref={sectionRef} id="contact" className="min-h-screen py-20 px-4 relative overflow-hidden bg-gradient-to-br from-[${ISLAMIC_COLORS.darkPrimary}] to-[${ISLAMIC_COLORS.primary}]">
      {/* Subtle Islamic geometric background animation */}
      <div className="absolute inset-0 overflow-hidden opacity-10">
        <motion.div
          className={`absolute top-20 left-20 w-72 h-72 border border-[${ISLAMIC_COLORS.secondary}]/30 rounded-full`}
          animate={{
            scale: [1, 1.1, 1],
            rotate: [0, 180, 360],
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: "linear"
          }}
        />
        <motion.div
          className={`absolute bottom-20 right-20 w-96 h-96 border border-[${ISLAMIC_COLORS.turquoise}]/20 rounded-full`}
          animate={{
            scale: [1.1, 1, 1.1],
            rotate: [360, 180, 0],
          }}
          transition={{
            duration: 30,
            repeat: Infinity,
            ease: "linear"
          }}
        />
         <motion.div
          className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 border border-[${ISLAMIC_COLORS.accent}]/15 rounded-full`}
          animate={{
            scale: [1, 0.9, 1],
            opacity: [0, 0.5, 0],
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={inView ? { opacity: 1 } : { opacity: 0 }}
        transition={{ duration: 0.8 }}
        className="max-w-6xl mx-auto relative z-10"
      >
        {/* Section header */}
        <div className="text-center mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className={`text-5xl md:text-6xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-[${ISLAMIC_COLORS.secondary}] to-[${ISLAMIC_COLORS.turquoise}] font-serif drop-shadow-[0_0_20px_rgba(201,169,97,0.3)]`}
          >
            Let&apos;s Connect
          </motion.h2>
          
          <motion.div
            className={`h-1 bg-gradient-to-r from-[${ISLAMIC_COLORS.secondary}] to-[${ISLAMIC_COLORS.turquoise}] mx-auto rounded-full mb-8`}
            initial={{ width: 0 }}
            animate={inView ? { width: '120px' } : { width: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
          />
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className={`text-lg text-[${ISLAMIC_COLORS.light}]/80 max-w-2xl mx-auto leading-relaxed`}
          >
            {contact.availability}
          </motion.p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Contact Information */}
          <ContactCard delay={0.2}>
            <div className={`bg-gradient-to-br from-[${ISLAMIC_COLORS.primary}]/90 to-[${ISLAMIC_COLORS.darkPrimary}]/90 backdrop-blur-sm rounded-2xl p-8 border border-[${ISLAMIC_COLORS.turquoise}]/30 h-full`}>
              <div className="space-y-8">
                <div>
                  <h3 className={`text-2xl font-bold text-white mb-6 flex items-center gap-3 font-serif`}>
                    <Sparkles className={`w-6 h-6 text-[${ISLAMIC_COLORS.secondary}]`} />
                    Get In Touch
                  </h3>
                  
                  <div className="space-y-4">
                    <motion.a
                      href={`mailto:${contact.email}`}
                      className={`flex items-center gap-4 p-4 bg-[${ISLAMIC_COLORS.primary}]/50 rounded-xl hover:bg-[${ISLAMIC_COLORS.primary}]/70 transition-all duration-300 group border border-[${ISLAMIC_COLORS.accent}]/30`}
                      whileHover={{ scale: 1.02, x: 5 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <div className={`p-3 bg-[${ISLAMIC_COLORS.turquoise}]/20 rounded-lg group-hover:bg-[${ISLAMIC_COLORS.turquoise}]/30 transition-colors border border-[${ISLAMIC_COLORS.turquoise}]/30`}>
                        <Mail className={`w-5 h-5 text-[${ISLAMIC_COLORS.turquoise}]`} />
                      </div>
                      <div>
                        <p className={`font-semibold text-[${ISLAMIC_COLORS.light}]`}>Email</p>
                        <p className={`text-[${ISLAMIC_COLORS.light}]/70 text-sm`}>{contact.email}</p>
                      </div>
                    </motion.a>

                    <motion.div 
                      className={`flex items-center gap-4 p-4 bg-[${ISLAMIC_COLORS.primary}]/50 rounded-xl border border-[${ISLAMIC_COLORS.accent}]/30`}
                      initial={{ opacity: 0, x: -20 }}
                      animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
                      transition={{ delay: 0.6 }}
                    >
                      <div className={`p-3 bg-[${ISLAMIC_COLORS.accent}]/20 rounded-lg border border-[${ISLAMIC_COLORS.accent}]/30`}>
                        <MapPin className={`w-5 h-5 text-[${ISLAMIC_COLORS.accent}]`} />
                      </div>
                      <div>
                        <p className={`font-semibold text-[${ISLAMIC_COLORS.light}]`}>Location</p>
                        <p className={`text-[${ISLAMIC_COLORS.light}]/70 text-sm`}>Tanta, Egypt</p>
                      </div>
                    </motion.div>

                    <motion.div 
                      className={`flex items-center gap-4 p-4 bg-[${ISLAMIC_COLORS.primary}]/50 rounded-xl border border-[${ISLAMIC_COLORS.accent}]/30`}
                      initial={{ opacity: 0, x: -20 }}
                      animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
                      transition={{ delay: 0.7 }}
                    >
                      <div className={`p-3 bg-[${ISLAMIC_COLORS.secondary}]/20 rounded-lg border border-[${ISLAMIC_COLORS.secondary}]/30`}>
                        <Calendar className={`w-5 h-5 text-[${ISLAMIC_COLORS.secondary}]`} />
                      </div>
                      <div>
                        <p className={`font-semibold text-[${ISLAMIC_COLORS.light}]`}>Availability</p>
                        <p className={`text-[${ISLAMIC_COLORS.light}]/70 text-sm`}>Open for opportunities</p>
                      </div>
                    </motion.div>
                  </div>
                </div>

                {/* Languages & Interests */}
                <div className="space-y-6">
                  <div>
                    <h4 className={`text-lg font-semibold text-[${ISLAMIC_COLORS.light}] mb-3`}>Languages</h4>
                    <div className="flex flex-wrap gap-2">
                      {contact.languages.map((language, index) => (
                        <motion.span
                          key={index}
                          className={`px-3 py-1 bg-[${ISLAMIC_COLORS.turquoise}]/10 text-[${ISLAMIC_COLORS.turquoise}] rounded-full text-sm border border-[${ISLAMIC_COLORS.turquoise}]/20`}
                          initial={{ opacity: 0, scale: 0.8 }}
                          animate={inView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
                          transition={{ delay: 0.8 + index * 0.1 }}
                          whileHover={{ scale: 1.05, backgroundColor: `rgba(74, 157, 156, 0.2)` }}
                        >
                          {language}
                        </motion.span>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h4 className={`text-lg font-semibold text-[${ISLAMIC_COLORS.light}] mb-3`}>Interests</h4>
                    <ul className="space-y-2">
                      {contact.interests.map((interest, index) => (
                        <motion.li 
                          key={index} 
                          className={`flex items-center text-[${ISLAMIC_COLORS.light}]/80`}
                          initial={{ opacity: 0, x: -10 }}
                          animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: -10 }}
                          transition={{ delay: 1 + index * 0.1 }}
                        >
                          <span className={`w-1.5 h-1.5 bg-[${ISLAMIC_COLORS.secondary}] rounded-full mr-3 flex-shrink-0`}></span>
                          <span className="text-sm">{interest}</span>
                        </motion.li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Motivational footer */}
                <motion.div
                  className={`p-4 bg-gradient-to-r from-[${ISLAMIC_COLORS.secondary}]/10 to-[${ISLAMIC_COLORS.turquoise}]/10 rounded-lg border border-[${ISLAMIC_COLORS.secondary}]/20 text-center`}
                  initial={{ opacity: 0, y: 20 }}
                  animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                  transition={{ delay: 1.2 }}
                >
                  <div className={`flex items-center justify-center gap-2 text-[${ISLAMIC_COLORS.light}]/80 mb-2`}>
                    <Award className={`w-4 h-4 text-[${ISLAMIC_COLORS.secondary}]`} />
                    <span className="font-semibold text-sm">Seek Knowledge</span>
                    <Award className={`w-4 h-4 text-[${ISLAMIC_COLORS.secondary}]`} />
                  </div>
                  <p className={`text-xs text-[${ISLAMIC_COLORS.light}]/60`}>
                    Powered by curiosity and lots of coffee
                  </p>
                  <motion.div
                    className="flex justify-center mt-2"
                    animate={{ scale: [1, 1.2, 1] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  >
                    <Coffee className={`w-4 h-4 text-[${ISLAMIC_COLORS.accent}]`} />
                  </motion.div>
                </motion.div>
              </div>
            </div>
          </ContactCard>

          {/* Contact Form & Actions */}
          <ContactCard delay={0.4}>
            <div className="space-y-6">
              {/* Download CV Card */}
              <motion.a
                href="/cv/Zeyad-Hany-CV.pdf"
                download
                className={`block p-6 bg-gradient-to-br from-[${ISLAMIC_COLORS.accent}]/10 to-[${ISLAMIC_COLORS.turquoise}]/10 rounded-xl border border-[${ISLAMIC_COLORS.accent}]/20 hover:border-[${ISLAMIC_COLORS.accent}]/40 transition-all duration-300 group`}
                whileHover={{ 
                  scale: 1.02, 
                  boxShadow: `0 20px 40px ${ISLAMIC_COLORS.accent}30` 
                }}
                whileTap={{ scale: 0.98 }}
              >
                <div className="flex items-center gap-4">
                  <div className={`p-3 bg-[${ISLAMIC_COLORS.accent}]/20 rounded-lg group-hover:bg-[${ISLAMIC_COLORS.accent}]/30 transition-colors border border-[${ISLAMIC_COLORS.accent}]/30`}>
                    <Download className={`w-6 h-6 text-[${ISLAMIC_COLORS.accent}]`} />
                  </div>
                  <div>
                    <h4 className={`text-lg font-semibold text-[${ISLAMIC_COLORS.light}]`}>Download CV</h4>
                    <p className={`text-[${ISLAMIC_COLORS.light}]/70 text-sm`}>Get my complete resume</p>
                  </div>
                </div>
              </motion.a>

              {/* Social Links */}
              <div className="space-y-4">
                <h4 className={`text-lg font-semibold text-[${ISLAMIC_COLORS.light}]`}>Connect With Me</h4>
                <div className="grid gap-3">
                  {socialLinks.map((link, index) => (
                    <motion.a
                      key={index}
                      href={link.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`flex items-center gap-4 p-4 bg-[${ISLAMIC_COLORS.primary}]/50 rounded-xl hover:bg-[${ISLAMIC_COLORS.primary}]/70 transition-all duration-300 group border border-[${ISLAMIC_COLORS.accent}]/30 ${link.bgColor}`}
                      whileHover={{ scale: 1.02, x: 5 }}
                      whileTap={{ scale: 0.98 }}
                      initial={{ opacity: 0, x: -20 }}
                      animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
                      transition={{ delay: 0.6 + index * 0.1 }}
                    >
                      <div className={`p-2 bg-[${ISLAMIC_COLORS.darkPrimary}]/50 rounded-lg group-hover:bg-[${ISLAMIC_COLORS.primary}]/50 transition-colors`}>
                        <link.icon className={`w-5 h-5 text-[${ISLAMIC_COLORS.light}] ${link.color} transition-colors`} />
                      </div>
                      <span className={`text-[${ISLAMIC_COLORS.light}]/80 group-hover:text-white transition-colors font-medium`}>
                        {link.name}
                      </span>
                    </motion.a>
                  ))}
                </div>
              </div>

              {/* Contact Form */}
              <motion.div 
                className={`p-6 bg-[${ISLAMIC_COLORS.primary}]/50 rounded-xl border border-[${ISLAMIC_COLORS.accent}]/30`}
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ delay: 0.8 }}
              >
                <h4 className={`text-lg font-semibold text-[${ISLAMIC_COLORS.light}] mb-4`}>Quick Message</h4>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <motion.input
                    type="text"
                    name="name"
                    placeholder="Your Name"
                    value={formData.name}
                    onChange={handleInputChange}
                    className={`w-full p-3 bg-[${ISLAMIC_COLORS.darkPrimary}]/70 rounded-lg border border-[${ISLAMIC_COLORS.primary}]/50 focus:border-[${ISLAMIC_COLORS.turquoise}] focus:outline-none text-white placeholder-[${ISLAMIC_COLORS.light}]/50 transition-all duration-300`}
                    whileFocus={{ scale: 1.02, borderColor: `rgba(74, 157, 156, 0.5)` }}
                    required
                  />
                  <motion.input
                    type="email"
                    name="email"
                    placeholder="Your Email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className={`w-full p-3 bg-[${ISLAMIC_COLORS.darkPrimary}]/70 rounded-lg border border-[${ISLAMIC_COLORS.primary}]/50 focus:border-[${ISLAMIC_COLORS.turquoise}] focus:outline-none text-white placeholder-[${ISLAMIC_COLORS.light}]/50 transition-all duration-300`}
                    whileFocus={{ scale: 1.02, borderColor: `rgba(74, 157, 156, 0.5)` }}
                    required
                  />
                  <motion.textarea
                    name="message"
                    placeholder="Your Message"
                    rows={4}
                    value={formData.message}
                    onChange={handleInputChange}
                    className={`w-full p-3 bg-[${ISLAMIC_COLORS.darkPrimary}]/70 rounded-lg border border-[${ISLAMIC_COLORS.primary}]/50 focus:border-[${ISLAMIC_COLORS.turquoise}] focus:outline-none text-white placeholder-[${ISLAMIC_COLORS.light}]/50 resize-none transition-all duration-300`}
                    whileFocus={{ scale: 1.02, borderColor: `rgba(74, 157, 156, 0.5)` }}
                    required
                  />
                  <motion.button
                    type="submit"
                    disabled={isSubmitting}
                    className={`w-full py-3 bg-gradient-to-r from-[${ISLAMIC_COLORS.accent}] to-[${ISLAMIC_COLORS.turquoise}] text-white rounded-lg font-semibold hover:shadow-lg hover:shadow-[${ISLAMIC_COLORS.accent}]/25 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed`}
                    whileHover={!isSubmitting ? { scale: 1.02 } : {}}
                    whileTap={!isSubmitting ? { scale: 0.98 } : {}}
                  >
                    <div className="flex items-center justify-center gap-2">
                      {isSubmitting ? (
                        <>
                          <motion.div
                            className={`w-4 h-4 border-2 border-[${ISLAMIC_COLORS.light}]/30 border-t-[${ISLAMIC_COLORS.light}] rounded-full`}
                            animate={{ rotate: 360 }}
                            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                          />
                          <span>Sending...</span>
                        </>
                      ) : (
                        <>
                          <Send size={16} />
                          <span>Send Message</span>
                        </>
                      )}
                    </div>
                  </motion.button>
                </form>
              </motion.div>
            </div>
          </ContactCard>
        </div>

        {/* Footer */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.8, delay: 1 }}
          className={`text-center mt-16 pt-8 border-t border-[${ISLAMIC_COLORS.primary}]/50`}
        >
          <p className={`text-[${ISLAMIC_COLORS.light}]/70 text-sm`}>
            © 2025 Zeyad Hany. Built with Next.js, Three.js, and lots of ☕
          </p>
          <motion.div
            className="flex justify-center mt-4"
            animate={{ opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <span className={`text-[${ISLAMIC_COLORS.secondary}] text-xs`}>
              <span className="block mb-1 font-serif">الحمد لله</span>
              All praise is due to Allah
            </span>
          </motion.div>
        </motion.div>
      </motion.div>
    </section>
  );
}