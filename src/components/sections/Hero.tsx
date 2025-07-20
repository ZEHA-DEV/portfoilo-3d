'use client';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { useState, useEffect, useCallback, useMemo, useRef } from 'react';
import { professionalSummary } from "@/lib/data"; // Assuming this exists
import { ChevronDown, Download, Github, Linkedin, Sparkles, Code, Sun, Rocket } from 'lucide-react'; // Changed Zap to Sun for more Islamic feel
import { gsap } from 'gsap';
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

// Floating icon component with magnetic effect
function FloatingIcon({ icon: Icon, delay, iconColorClass }: { icon: any, delay: number, iconColorClass: string }) {
  const iconRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    if (!iconRef.current) return;
    
    gsap.to(iconRef.current, {
      y: "random(-20, 20)",
      x: "random(-15, 15)",
      rotation: "random(-15, 15)",
      duration: "random(3, 5)",
      repeat: -1,
      yoyo: true,
      ease: "power2.inOut",
      delay: delay
    });
  }, [delay]);

  return (
    <motion.div
      ref={iconRef}
      className={`absolute ${iconColorClass} opacity-20 hover:opacity-60 transition-opacity cursor-pointer`}
      whileHover={{ scale: 1.5, opacity: 0.8 }}
      initial={{ opacity: 0, scale: 0 }}
      animate={{ opacity: 0.2, scale: 1 }}
      transition={{ delay: delay + 2 }}
    >
      <Icon size={24} />
    </motion.div>
  );
}

// Interactive hologram text effect (adjusted for Islamic colors)
function HologramText({ text, className }: { text: string, className: string }) {
  const [glitchActive, setGlitchActive] = useState(false);
  
  useEffect(() => {
    const interval = setInterval(() => {
      setGlitchActive(true);
      setTimeout(() => setGlitchActive(false), 200);
    }, 8000);
    
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative">
      <motion.h1
        className={`${className} relative z-10`}
        animate={glitchActive ? {
          x: [0, -2, 2, -1, 1, 0],
          textShadow: [
            '0 0 0 transparent',
            `2px 0 0 ${ISLAMIC_COLORS.turquoise}, -2px 0 0 ${ISLAMIC_COLORS.secondary}`,
            `-2px 0 0 ${ISLAMIC_COLORS.turquoise}, 2px 0 0 ${ISLAMIC_COLORS.secondary}`,
            '0 0 0 transparent'
          ]
        } : {}}
        transition={{ duration: 0.2 }}
      >
        {text}
      </motion.h1>
      
      {/* Hologram scan lines */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        animate={{
          backgroundImage: [
            `linear-gradient(transparent 0%, ${ISLAMIC_COLORS.turquoise}08 2%, transparent 4%)`,
            `linear-gradient(transparent 96%, ${ISLAMIC_COLORS.turquoise}08 98%, transparent 100%)`
          ]
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: 'linear'
        }}
      />
    </div>
  );
}

// Interactive particle cursor trail (adjusted for Islamic colors)
function ParticleCursor() {
  const [particles, setParticles] = useState<Array<{
    id: number;
    x: number;
    y: number;
    life: number;
  }>>([]);
  const particleId = useRef(0);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const newParticle = {
        id: particleId.current++,
        x: e.clientX,
        y: e.clientY,
        life: 1
      };
      
      // Limit number of particles for performance
      setParticles(prev => [...prev.slice(-15), newParticle]); // Reduced from 20 to 15
    };

    window.addEventListener('mousemove', handleMouseMove);
    
    const interval = setInterval(() => {
      setParticles(prev => 
        prev.map(p => ({ ...p, life: p.life - 0.07 })) // Faster fade
            .filter(p => p.life > 0)
      );
    }, 16);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      clearInterval(interval);
    };
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-50">
      {particles.map((particle) => (
        <motion.div
          key={particle.id}
          className={`absolute w-2 h-2 rounded-full`}
          style={{
            left: particle.x - 4,
            top: particle.y - 4,
            opacity: particle.life,
            scale: particle.life,
            background: `radial-gradient(circle, ${ISLAMIC_COLORS.secondary}, ${ISLAMIC_COLORS.turquoise})`,
            filter: 'blur(1px)' // Subtle blur for glow
          }}
          initial={{ scale: 0, opacity: 1 }}
          animate={{ scale: 0.5, opacity: 0 }}
          transition={{ duration: 1 }}
        />
      ))}
    </div>
  );
}

export function Hero() {
  const [displayedText, setDisplayedText] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const heroRef = useRef<HTMLElement>(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  
  // Smooth mouse following
  const springX = useSpring(mouseX, { stiffness: 150, damping: 15 });
  const springY = useSpring(mouseY, { stiffness: 150, damping: 15 });
  
  // Transform values for parallax effect
  const rotateX = useTransform(springY, [-300, 300], [5, -5]);
  const rotateY = useTransform(springX, [-300, 300], [-5, 5]);
  
  const { ref: inViewRef, inView } = useInView({
    threshold: 0.3,
    triggerOnce: false
  });
  
  // Titles adjusted for Islamic color palette
  const titles = useMemo(() => [
    { text: 'React.js Developer', color: `from-[${ISLAMIC_COLORS.turquoise}] to-[${ISLAMIC_COLORS.accent}]` },
    { text: 'Frontend Engineer', color: `from-[${ISLAMIC_COLORS.secondary}] to-[${ISLAMIC_COLORS.turquoise}]` },
    { text: 'Full-Stack Developer', color: `from-[${ISLAMIC_COLORS.accent}] to-[${ISLAMIC_COLORS.turquoise}]` },
    { text: 'TypeScript Expert', color: `from-[${ISLAMIC_COLORS.burgundy}] to-[${ISLAMIC_COLORS.secondary}]` },
    { text: 'UI/UX Enthusiast', color: `from-[${ISLAMIC_COLORS.primary}] to-[${ISLAMIC_COLORS.secondary}]` }
  ], []);

  // Advanced typewriter effect with realistic timing
  useEffect(() => {
    const currentTitle = titles[currentIndex];
    let index = 0;
    let isDeleting = false;
    setDisplayedText(''); // Reset text when title changes
    
    const typeSpeed = 100; // Slightly faster typing
    const deleteSpeed = 40; // Slightly faster deleting
    const pauseTime = 1800; // Slightly shorter pause
    
    let timer: NodeJS.Timeout;

    const handleTyping = () => {
      if (!isDeleting) {
        setDisplayedText(currentTitle.text.slice(0, index));
        index++;
        if (index > currentTitle.text.length) {
          isDeleting = true;
          timer = setTimeout(handleTyping, pauseTime); // Pause after typing
          return;
        }
      } else {
        setDisplayedText(currentTitle.text.slice(0, index));
        index--;
        if (index < 0) {
          isDeleting = false;
          setCurrentIndex((prev) => (prev + 1) % titles.length);
          // Do not clear interval here, it will be cleared by the return cleanup
          return;
        }
      }
      timer = setTimeout(handleTyping, isDeleting ? deleteSpeed : typeSpeed);
    };

    timer = setTimeout(handleTyping, typeSpeed); // Start initial typing
    
    return () => clearTimeout(timer);
  }, [currentIndex, titles]);

  // Mouse move handler for 3D effect
  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    if (!heroRef.current) return;
    
    const rect = heroRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    
    mouseX.set(e.clientX - centerX);
    mouseY.set(e.clientY - centerY);
  }, [mouseX, mouseY]);

  const scrollToProjects = useCallback(() => {
    const element = document.getElementById('projects');
    element?.scrollIntoView({ behavior: 'smooth' });
  }, []);

  // Visibility check
  useEffect(() => {
    setIsVisible(true);
  }, []);

  const currentTitleColor = titles[currentIndex]?.color || `from-[${ISLAMIC_COLORS.secondary}] to-[${ISLAMIC_COLORS.turquoise}]`;

  return (
    <>
      <ParticleCursor />
      <section
        ref={(node) => {
          heroRef.current = node;
          inViewRef(node);
        }}
        id="home"
        className={`min-h-screen flex flex-col justify-center items-center text-center p-4 relative overflow-hidden bg-gradient-to-br from-[${ISLAMIC_COLORS.darkPrimary}] to-[${ISLAMIC_COLORS.primary}]`}
        onMouseMove={handleMouseMove}
        style={{ perspective: '1000px' }}
      >
        {/* Floating tech icons (colors mapped to Islamic palette) */}
        <div className="absolute inset-0 overflow-hidden">
          <FloatingIcon icon={Code} delay={0} iconColorClass={`text-[${ISLAMIC_COLORS.turquoise}]`} />
          <FloatingIcon icon={Rocket} delay={0.5} iconColorClass={`text-[${ISLAMIC_COLORS.accent}]`} />
          <FloatingIcon icon={Sun} delay={1} iconColorClass={`text-[${ISLAMIC_COLORS.secondary}]`} />
          <FloatingIcon icon={Sparkles} delay={1.5} iconColorClass={`text-[${ISLAMIC_COLORS.light}]`} />
          
          {/* Positioned icons */}
          <div className="absolute top-20 left-20"><FloatingIcon icon={Code} delay={2} iconColorClass={`text-[${ISLAMIC_COLORS.turquoise}]`} /></div>
          <div className="absolute top-32 right-32"><FloatingIcon icon={Rocket} delay={2.5} iconColorClass={`text-[${ISLAMIC_COLORS.accent}]`} /></div>
          <div className="absolute bottom-40 left-16"><FloatingIcon icon={Sun} delay={3} iconColorClass={`text-[${ISLAMIC_COLORS.secondary}]`} /></div>
          <div className="absolute bottom-20 right-20"><FloatingIcon icon={Sparkles} delay={3.5} iconColorClass={`text-[${ISLAMIC_COLORS.light}]`} /></div>
        </div>

        {/* Main content with 3D transform */}
        <motion.div
          style={{
            rotateX: rotateX,
            rotateY: rotateY,
          }}
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="max-w-6xl mx-auto relative z-10"
        >
          {/* Holographic name */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 30 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="mb-8"
          >
            <HologramText 
              text="Zeyad Hany"
              className={`text-6xl md:text-8xl lg:text-9xl font-bold bg-clip-text text-transparent bg-gradient-to-b from-[${ISLAMIC_COLORS.light}] via-[${ISLAMIC_COLORS.light}]/80 to-[${ISLAMIC_COLORS.light}]/60 mb-6 tracking-tight font-serif`}
            />
            
            {/* Animated underline */}
            <motion.div
              className={`h-1 bg-gradient-to-r from-[${ISLAMIC_COLORS.secondary}] via-[${ISLAMIC_COLORS.turquoise}] to-[${ISLAMIC_COLORS.accent}] mx-auto rounded-full`}
              initial={{ width: 0 }}
              animate={{ width: inView ? '200px' : 0 }}
              transition={{ duration: 1, delay: 1 }}
            />
          </motion.div>
          
          {/* Advanced typewriter with gradient animation */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="h-20 mb-8 flex items-center justify-center"
          >
            <div className="relative">
              <motion.p 
                className={`text-3xl md:text-4xl lg:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r ${currentTitleColor} inline-block font-serif`}
                animate={{ opacity: [0.7, 1, 0.7] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                {displayedText}
                <motion.span
                  className={`text-[${ISLAMIC_COLORS.secondary}] ml-1`}
                  animate={{ opacity: [0, 1, 0] }}
                  transition={{ duration: 1, repeat: Infinity }}
                >
                  |
                </motion.span>
              </motion.p>
              
             {useMemo(() => {
                // Extract the colors from the tailwind class string using regex
                const fromColorMatch = currentTitleColor.split(' ')[0].match(/$$(.*?)$$/);
                const fromColor = fromColorMatch ? fromColorMatch[1] : '';

                const toColorMatch = currentTitleColor.split(' ')[1].match(/$$(.*?)$$/);
                const toColor = toColorMatch ? toColorMatch[1] : '';

                return (
                  <motion.div
                    className="absolute inset-0 blur-xl opacity-30"
                    animate={{
                      background: `linear-gradient(45deg, ${fromColor} 0%, ${toColor} 100%)`
                    }}
                  />
                );
              }, [currentTitleColor])}
            </div>
          </motion.div>

          {/* Enhanced description with reveal animation */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="mb-12"
          >
            <motion.p
              className={`text-lg md:text-xl lg:text-2xl text-[${ISLAMIC_COLORS.light}]/80 max-w-4xl mx-auto leading-relaxed relative font-serif`}
              variants={{
                hidden: { opacity: 0 },
                visible: {
                  opacity: 1,
                  transition: {
                    staggerChildren: 0.03,
                  }
                }
              }}
              initial="hidden"
              animate={isVisible ? "visible" : "hidden"}
            >
              {professionalSummary.split('').map((char, index) => (
                <motion.span
                  key={index}
                  variants={{
                    hidden: { opacity: 0, y: 20 },
                    visible: { opacity: 1, y: 0 }
                  }}
                  className="inline-block"
                >
                  {char === ' ' ? '\u00A0' : char}
                </motion.span>
              ))}
            </motion.p>
            
            {/* Description glow border */}
            <motion.div
              className={`absolute inset-0 border border-[${ISLAMIC_COLORS.secondary}]/20 rounded-lg blur-sm`}
              animate={{ opacity: [0.2, 0.5, 0.2] }}
              transition={{ duration: 3, repeat: Infinity }}
            />
          </motion.div>

          {/* Interactive CTA buttons with advanced animations */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.2 }}
            className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-16"
          >
            <motion.button
              onClick={scrollToProjects}
              className={`group relative px-10 py-5 bg-gradient-to-r from-[${ISLAMIC_COLORS.accent}] via-[${ISLAMIC_COLORS.turquoise}] to-[${ISLAMIC_COLORS.secondary}] text-white rounded-full font-bold text-lg overflow-hidden`}
              whileHover={{ 
                scale: 1.05,
                boxShadow: `0 20px 40px ${ISLAMIC_COLORS.accent}40` // Adjusted shadow color
              }}
              whileTap={{ scale: 0.95 }}
            >
              <span className="relative z-10 flex items-center gap-2">
                <Rocket size={20} />
                Explore My Journey
              </span>
              
              {/* Animated background (swap colors for hover effect) */}
              <motion.div
                className={`absolute inset-0 bg-gradient-to-r from-[${ISLAMIC_COLORS.secondary}] to-[${ISLAMIC_COLORS.accent}]`}
                initial={{ x: '-100%' }}
                whileHover={{ x: '0%' }}
                transition={{ duration: 0.3 }}
              />
              
              {/* Sparkle effect (can remain white or use light Islamic color) */}
              <motion.div
                className="absolute inset-0"
                animate={{
                  background: [
                    `radial-gradient(circle at 20% 50%, ${ISLAMIC_COLORS.light}30 0%, transparent 50%)`,
                    `radial-gradient(circle at 80% 50%, ${ISLAMIC_COLORS.light}30 0%, transparent 50%)`,
                    `radial-gradient(circle at 20% 50%, ${ISLAMIC_COLORS.light}30 0%, transparent 50%)`
                  ]
                }}
                transition={{ duration: 2, repeat: Infinity }}
              />
            </motion.button>
            
            <motion.a
              href="/cv/Zeyad-Hany-CV.pdf"
              download
              className={`group relative px-10 py-5 border-2 border-[${ISLAMIC_COLORS.secondary}] text-[${ISLAMIC_COLORS.secondary}] rounded-full font-bold text-lg hover:bg-[${ISLAMIC_COLORS.secondary}]/10 transition-all duration-300 overflow-hidden`}
              whileHover={{ 
                scale: 1.05,
                borderColor: ISLAMIC_COLORS.turquoise, // Subtle color change on hover
                color: ISLAMIC_COLORS.turquoise
              }}
              whileTap={{ scale: 0.95 }}
            >
              <span className="relative z-10 flex items-center gap-2">
                <Download size={20} />
                Download CV
              </span>
              
              {/* Animated border effect */}
              <motion.div
                className={`absolute inset-0 border-2 border-[${ISLAMIC_COLORS.turquoise}] rounded-full`}
                initial={{ scale: 0, opacity: 0 }}
                whileHover={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.3 }}
              />
            </motion.a>
          </motion.div>

          {/* Enhanced social links with magnetic effect */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.5 }}
            className="flex justify-center gap-8 mb-16"
          >
            {[
              { icon: Github, href: "https://github.com/zeyadhany", colorClass: `hover:text-[${ISLAMIC_COLORS.light}]` },
              { icon: Linkedin, href: "https://linkedin.com/in/zeyadhany", colorClass: `hover:text-[${ISLAMIC_COLORS.turquoise}]` }
            ].map(({ icon: Icon, href, colorClass }, index) => (
              <motion.a
                key={href}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className={`group relative p-4 rounded-full bg-[${ISLAMIC_COLORS.primary}]/50 backdrop-blur-sm text-[${ISLAMIC_COLORS.light}]/70 ${colorClass} transition-all duration-300`}
                whileHover={{ 
                  scale: 1.1,
                  rotateY: 360,
                  boxShadow: `0 10px 30px ${ISLAMIC_COLORS.secondary}30` // Adjusted shadow color
                }}
                whileTap={{ scale: 0.9 }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.7 + index * 0.1 }}
              >
                <Icon size={28} />
                
                {/* Ripple effect */}
                <motion.div
                  className={`absolute inset-0 rounded-full border border-[${ISLAMIC_COLORS.turquoise}]/50`}
                  initial={{ scale: 1, opacity: 0 }}
                  whileHover={{ scale: 2, opacity: 0 }}
                  transition={{ duration: 0.6 }}
                />
              </motion.a>
            ))}
          </motion.div>
        </motion.div>

        {/* Enhanced scroll indicator with pulse animation */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 2 }}
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
        >
          <motion.button
            onClick={scrollToProjects}
            className={`group relative text-[${ISLAMIC_COLORS.light}]/70 hover:text-white transition-colors p-4`}
            animate={{ 
              y: [0, 15, 0],
            }}
            transition={{ 
              duration: 2, 
              repeat: Infinity,
              ease: "easeInOut"
            }}
            whileHover={{ scale: 1.2 }}
          >
            <ChevronDown size={40} />
            
            {/* Pulsing ring */}
            <motion.div
              className={`absolute inset-0 rounded-full border border-[${ISLAMIC_COLORS.secondary}]/30`}
              animate={{ 
                scale: [1, 1.5, 1],
                opacity: [0.3, 0, 0.3]
              }}
              transition={{ 
                duration: 2, 
                repeat: Infinity,
                ease: "easeInOut"
              }}
            />
            
            {/* Text label */}
            <motion.div
              className={`absolute -top-8 left-1/2 transform -translate-x-1/2 text-xs font-medium opacity-0 group-hover:opacity-100 transition-opacity text-[${ISLAMIC_COLORS.light}]`}
              initial={{ opacity: 0, y: 10 }}
              whileHover={{ opacity: 1, y: 0 }}
            >
              Explore
            </motion.div>
          </motion.button>
        </motion.div>

        {/* Interactive background elements (Islamic-colored particles) */}
        <div className="absolute inset-0 overflow-hidden opacity-20">
          {[...Array(10)].map((_, i) => (
            <motion.div
              key={i}
              className={`absolute w-1 h-1 rounded-full`}
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                background: i % 2 === 0 ? ISLAMIC_COLORS.secondary : ISLAMIC_COLORS.turquoise,
              }}
              animate={{
                scale: [0, 1, 0],
                opacity: [0, 1, 0],
              }}
              transition={{
                duration: 3,
                delay: i * 0.5,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            />
          ))}
        </div>
      </section>
    </>
  );
}