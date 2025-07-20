'use client';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';
import { useState, useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollToPlugin } from 'gsap/ScrollToPlugin'; // Import ScrollToPlugin
import { Menu, X, Home, User, Code, Briefcase, Mail, Rocket } from 'lucide-react';

// Register GSAP ScrollToPlugin
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollToPlugin);
}

// Islamic color palette (consistent with other components)
const ISLAMIC_COLORS = {
  primary: '#1e3a5f',    // Deep blue
  secondary: '#c9a961',  // Gold
  accent: '#2c5f2d',     // Islamic green
  light: '#f4f4f9',      // Off white
  turquoise: '#4a9d9c',  // Turquoise
  burgundy: '#6d1f2c',   // Deep red
  darkPrimary: '#0d1f3a', // Darker blue for backgrounds
};

export function Navigation() {
  const [isOpen, setIsOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const [scrollProgress, setScrollProgress] = useState(0);
  const navRef = useRef<HTMLElement>(null);
  
  const { scrollYProgress } = useScroll();
  const navOpacity = useTransform(scrollYProgress, [0, 0.1], [0.8, 0.95]);
  const navBlur = useTransform(scrollYProgress, [0, 0.1], [10, 20]);

  const navigationItems = [
    { id: 'home', label: 'Home', icon: Home },
    { id: 'about', label: 'About', icon: User },
    { id: 'skills', label: 'Skills', icon: Code },
    { id: 'projects', label: 'Projects', icon: Briefcase },
    { id: 'contact', label: 'Contact', icon: Mail },
  ];

  // Smooth scroll function with easing
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      const headerOffset = 80;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

      gsap.to(window, {
        duration: 1.5,
        scrollTo: { y: offsetPosition, autoKill: false },
        ease: "power2.inOut"
      });
      
      setActiveSection(sectionId);
      setIsOpen(false);
    }
  };

  // Track scroll progress and active section
  useEffect(() => {
    const updateScrollProgress = () => {
      const scrolled = window.scrollY;
      const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
      const progress = maxScroll > 0 ? scrolled / maxScroll : 0; // Avoid division by zero
      setScrollProgress(progress);
    };

    const updateActiveSection = () => {
      const sections = navigationItems.map(item => item.id);
      const scrollPosition = window.scrollY + 100; // Offset for active section detection

      for (let i = sections.length - 1; i >= 0; i--) {
        const section = document.getElementById(sections[i]);
        if (section && section.offsetTop <= scrollPosition) {
          setActiveSection(sections[i]);
          break;
        }
      }
    };

    const handleScroll = () => {
      updateScrollProgress();
      updateActiveSection();
    };

    window.addEventListener('scroll', handleScroll, { passive: true }); // Use passive listener
    return () => window.removeEventListener('scroll', handleScroll);
  }, [navigationItems]);

  // GSAP magnetic effect for nav items
  useEffect(() => {
    if (!navRef.current) return;

    // Use a more specific selector to avoid conflicts
    const navItems = navRef.current.querySelectorAll('.desktop-nav-item');
    
    navItems.forEach((item) => {
      // Ensure GSAP target is an HTMLElement
      const target = item as HTMLElement; 

      const handleMouseEnter = () => {
        gsap.to(target, {
          scale: 1.1,
          duration: 0.3,
          ease: "power2.out"
        });
      };
      
      const handleMouseLeave = () => {
        gsap.to(target, {
          scale: 1,
          duration: 0.3,
          ease: "power2.out"
        });
      };
      
      item.addEventListener('mouseenter', handleMouseEnter);
      item.addEventListener('mouseleave', handleMouseLeave);
      
      return () => {
        item.removeEventListener('mouseenter', handleMouseEnter);
        item.removeEventListener('mouseleave', handleMouseLeave);
      };
    });
  }, []); // Re-run effect only if navRef changes (which it won't after first render)

  return (
    <>
      {/* Progress bar */}
      <motion.div
        className={`fixed top-0 left-0 right-0 h-1 z-50 origin-left 
          bg-gradient-to-r from-[${ISLAMIC_COLORS.secondary}] via-[${ISLAMIC_COLORS.turquoise}] to-[${ISLAMIC_COLORS.accent}]`}
        style={{ scaleX: scrollProgress }}
      />

      {/* Main navigation */}
      <motion.nav
        ref={navRef}
        className="fixed top-4 left-1/2 transform -translate-x-1/2 z-40"
        style={{
          opacity: navOpacity,
          backdropFilter: `blur(${navBlur}px)`,
        }}
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        <div className={`bg-[${ISLAMIC_COLORS.primary}]/40 backdrop-blur-md border border-[${ISLAMIC_COLORS.secondary}]/20 rounded-full px-6 py-3 shadow-2xl`}>
          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navigationItems.map((item) => {
              const IconComponent = item.icon;
              const isActive = activeSection === item.id;
              
              return (
                <motion.button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  className={`desktop-nav-item relative flex items-center gap-2 px-4 py-2 rounded-full transition-all duration-300 ${
                    isActive
                      ? `text-white bg-gradient-to-r from-[${ISLAMIC_COLORS.turquoise}]/30 to-[${ISLAMIC_COLORS.secondary}]/30 border border-[${ISLAMIC_COLORS.turquoise}]/50`
                      : `text-[${ISLAMIC_COLORS.light}] hover:text-white hover:bg-[${ISLAMIC_COLORS.secondary}]/10`
                  }`}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <IconComponent size={18} />
                  <span className="font-medium">{item.label}</span>
                  
                  {/* Active indicator */}
                  {isActive && (
                    <motion.div
                      className={`absolute inset-0 bg-gradient-to-r from-[${ISLAMIC_COLORS.turquoise}]/20 to-[${ISLAMIC_COLORS.secondary}]/20 rounded-full`}
                      layoutId="activeSection"
                      transition={{ type: "spring", stiffness: 380, damping: 30 }}
                    />
                  )}
                  
                  {/* Ripple effect */}
                  <motion.div
                    className={`absolute inset-0 bg-[${ISLAMIC_COLORS.light}]/10 rounded-full opacity-0`}
                    whileHover={{ opacity: 1, scale: 1.2 }}
                    transition={{ duration: 0.3 }}
                  />
                </motion.button>
              );
            })}
            
            {/* Launch button */}
            <motion.button
              onClick={() => scrollToSection('contact')}
              className={`flex items-center gap-2 px-6 py-2 bg-gradient-to-r from-[${ISLAMIC_COLORS.accent}] to-[${ISLAMIC_COLORS.turquoise}] text-white rounded-full font-semibold transition-all duration-300 hover:shadow-lg hover:shadow-[${ISLAMIC_COLORS.accent}]/25`}
              whileHover={{ scale: 1.05, boxShadow: `0 10px 30px ${ISLAMIC_COLORS.accent}40` }}
              whileTap={{ scale: 0.95 }}
            >
              <Rocket size={18} />
              <span>Let&apos;s Connect</span>
            </motion.button>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center justify-between">
            <motion.div
              className={`text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-[${ISLAMIC_COLORS.secondary}] to-[${ISLAMIC_COLORS.turquoise}] font-serif drop-shadow-[0_0_10px_rgba(201,169,97,0.5)]`}
              whileHover={{ scale: 1.05 }}
            >
              ZH
            </motion.div>
            
            <motion.button
              onClick={() => setIsOpen(!isOpen)}
              className={`p-2 text-[${ISLAMIC_COLORS.light}] hover:text-white transition-colors`}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <AnimatePresence mode="wait">
                {isOpen ? (
                  <motion.div
                    key="close"
                    initial={{ rotate: -90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: 90, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <X size={24} />
                  </motion.div>
                ) : (
                  <motion.div
                    key="menu"
                    initial={{ rotate: 90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: -90, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <Menu size={24} />
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.button>
          </div>
        </div>
      </motion.nav>

      {/* Mobile menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="fixed inset-0 z-30 md:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            {/* Backdrop */}
            <motion.div
              className={`absolute inset-0 bg-[${ISLAMIC_COLORS.primary}]/80 backdrop-blur-sm`}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
            />
            
            {/* Menu content */}
            <motion.div
              className={`absolute top-24 left-4 right-4 bg-[${ISLAMIC_COLORS.darkPrimary}]/95 backdrop-blur-md border border-[${ISLAMIC_COLORS.turquoise}]/30 rounded-2xl p-6 shadow-2xl`}
              initial={{ y: -50, opacity: 0, scale: 0.95 }}
              animate={{ y: 0, opacity: 1, scale: 1 }}
              exit={{ y: -50, opacity: 0, scale: 0.95 }}
              transition={{ type: "spring", damping: 20, stiffness: 300 }}
            >
              <div className="space-y-4">
                {navigationItems.map((item, index) => {
                  const IconComponent = item.icon;
                  const isActive = activeSection === item.id;
                  
                  return (
                    <motion.button
                      key={item.id}
                      onClick={() => scrollToSection(item.id)}
                      className={`w-full flex items-center gap-4 p-4 rounded-xl transition-all duration-300 ${
                        isActive
                          ? `bg-gradient-to-r from-[${ISLAMIC_COLORS.turquoise}]/20 to-[${ISLAMIC_COLORS.secondary}]/20 border border-[${ISLAMIC_COLORS.turquoise}]/30 text-white`
                          : `text-[${ISLAMIC_COLORS.light}] hover:text-white hover:bg-[${ISLAMIC_COLORS.primary}]/10`
                      }`}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                      whileHover={{ scale: 1.02, x: 10 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <IconComponent size={20} />
                      <span className="font-medium text-lg">{item.label}</span>
                      
                      {isActive && (
                        <motion.div
                          className={`ml-auto w-2 h-2 bg-gradient-to-r from-[${ISLAMIC_COLORS.turquoise}] to-[${ISLAMIC_COLORS.secondary}] rounded-full`}
                          layoutId="mobileActiveIndicator"
                        />
                      )}
                    </motion.button>
                  );
                })}
                
                {/* Mobile CTA */}
                <motion.button
                  onClick={() => scrollToSection('contact')}
                  className={`w-full flex items-center justify-center gap-3 p-4 bg-gradient-to-r from-[${ISLAMIC_COLORS.accent}] to-[${ISLAMIC_COLORS.turquoise}] text-white rounded-xl font-semibold mt-6`}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 }}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Rocket size={20} />
                  <span>Let&apos;s Connect</span>
                </motion.button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating action button (scroll to top) */}
      <AnimatePresence>
        {scrollProgress > 0.2 && (
          <motion.button
            onClick={() => scrollToSection('home')}
            className={`fixed bottom-8 right-8 p-4 bg-gradient-to-r from-[${ISLAMIC_COLORS.secondary}] to-[${ISLAMIC_COLORS.turquoise}] text-white rounded-full shadow-lg z-30`}
            initial={{ opacity: 0, scale: 0, y: 100 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0, y: 100 }}
            whileHover={{ 
              scale: 1.1, 
              boxShadow: `0 20px 40px ${ISLAMIC_COLORS.secondary}40` 
            }}
            whileTap={{ scale: 0.9 }}
            transition={{ type: "spring", stiffness: 260, damping: 20 }}
          >
            <Home size={24} />
          </motion.button>
        )}
      </AnimatePresence>

      {/* Section indicators */}
      <div className="fixed left-8 top-1/2 transform -translate-y-1/2 z-30 hidden lg:block">
        <div className="space-y-4">
          {navigationItems.map((item) => (
            <motion.button
              key={item.id}
              onClick={() => scrollToSection(item.id)}
              className={`block w-3 h-3 rounded-full border-2 transition-all duration-300 ${
                activeSection === item.id
                  ? `bg-[${ISLAMIC_COLORS.turquoise}] border-[${ISLAMIC_COLORS.turquoise}] scale-125`
                  : `border-[${ISLAMIC_COLORS.primary}] hover:border-[${ISLAMIC_COLORS.accent}]`
              }`}
              whileHover={{ scale: 1.2 }}
              title={item.label}
            />
          ))}
        </div>
      </div>
    </>
  );
}