'use client'
import { motion, useMotionValue, useTransform, AnimatePresence } from 'framer-motion';
import { education, competencies } from '@/lib/data';
import { useState, useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { useInView } from 'react-intersection-observer';
import { 
  GraduationCap, 
  Brain, 
  Zap, 
  Target, 
  Code, 
  Lightbulb, 
  Award,
  BookOpen,
  Clock,
  MapPin,
  Star,
  Rocket,
  Heart,
  Coffee,
  Moon,
  Sun
} from 'lucide-react';

// Interactive floating card component
function FloatingCard({ children, delay = 0, className = "" }: { 
  children: React.ReactNode, 
  delay?: number, 
  className?: string 
}) {
  const cardRef = useRef<HTMLDivElement>(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  
  const rotateX = useTransform(mouseY, [-300, 300], [15, -15]);
  const rotateY = useTransform(mouseX, [-300, 300], [-15, 15]);
  
  const handleMouseMove = (e: React.MouseEvent) => {
    if (!cardRef.current) return;
    
    const rect = cardRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    
    mouseX.set(e.clientX - centerX);
    mouseY.set(e.clientY - centerY);
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
      initial={{ opacity: 0, y: 50, scale: 0.9 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true }}
      transition={{ 
        duration: 0.8, 
        delay,
        type: "spring",
        stiffness: 100 
      }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      whileHover={{ z: 50 }}
    >
      {children}
    </motion.div>
  );
}

// Animated competency item
function CompetencyItem({ competency, index }: { competency: string, index: number }) {
  const [isVisible, setIsVisible] = useState(false);
  const { ref, inView } = useInView({ threshold: 0.5, triggerOnce: true });
  
  useEffect(() => {
    if (inView) setIsVisible(true);
  }, [inView]);

  return (
    <motion.div
      ref={ref}
      className="group relative"
      initial={{ opacity: 0, x: -30 }}
      animate={isVisible ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.2 }}
    >
      <div className="flex items-start gap-4 p-4 bg-gradient-to-r from-neutral-900/50 to-neutral-800/50 backdrop-blur-sm rounded-xl border border-neutral-700/30 hover:border-purple-500/30 transition-all duration-300 group-hover:bg-gradient-to-r group-hover:from-purple-500/10 group-hover:to-pink-500/10">
        <motion.div
          className="flex-shrink-0 p-2 bg-gradient-to-br from-purple-500/20 to-pink-500/20 rounded-lg border border-purple-500/30"
          animate={isVisible ? {
            rotate: [0, 360],
            scale: [1, 1.1, 1]
          } : {}}
          transition={{ 
            duration: 2, 
            delay: index * 0.3,
            repeat: Infinity, 
            repeatType: "loop",
            ease: "easeInOut"
          }}
        >
          <Target className="w-5 h-5 text-purple-400" />
        </motion.div>
        
        <div className="flex-1">
          <motion.p
            className="text-neutral-300 leading-relaxed group-hover:text-white transition-colors"
            variants={{
              hidden: { opacity: 0 },
              visible: {
                opacity: 1,
                transition: {
                  staggerChildren: 0.02,
                }
              }
            }}
            initial="hidden"
            animate={isVisible ? "visible" : "hidden"}
          >
            {competency.split('').map((char, charIndex) => (
              <motion.span
                key={charIndex}
                variants={{
                  hidden: { opacity: 0, y: 10 },
                  visible: { opacity: 1, y: 0 }
                }}
                className="inline-block"
              >
                {char === ' ' ? '\u00A0' : char}
              </motion.span>
            ))}
          </motion.p>
        </div>
        
        {/* Animated progress indicator */}
        <motion.div
          className="w-1 h-full bg-gradient-to-b from-purple-500 to-pink-500 rounded-full opacity-0 group-hover:opacity-100"
          initial={{ scaleY: 0 }}
          animate={isVisible ? { scaleY: 1 } : {}}
          transition={{ duration: 0.8, delay: index * 0.1 }}
        />
      </div>
      
      {/* Floating particles */}
      <AnimatePresence>
        {isVisible && (
          <>
            {[...Array(2)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-1 h-1 bg-purple-400 rounded-full"
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                }}
                initial={{ scale: 0, opacity: 0 }}
                animate={{ 
                  scale: [0, 1, 0],
                  opacity: [0, 1, 0],
                  y: [0, -30, 0]
                }}
                transition={{ 
                  duration: 2,
                  delay: index * 0.5 + i * 0.3,
                  repeat: Infinity
                }}
              />
            ))}
          </>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

// Interactive timeline component
function Timeline() {
  const [activeIndex, setActiveIndex] = useState(0);
  const timelineRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % 4); // Cycle through timeline points
    }, 3000);
    
    return () => clearInterval(interval);
  }, []);

  const timelineEvents = [
    { year: "2023", event: "Started Computer Science", icon: BookOpen },
    { year: "2024", event: "First React Projects", icon: Code },
    { year: "2024", event: "Advanced TypeScript", icon: Zap },
    { year: "2025", event: "Portfolio Evolution", icon: Rocket }
  ];

  return (
    <div ref={timelineRef} className="relative">
      {/* Animated timeline line */}
      <motion.div
        className="absolute left-6 top-0 w-0.5 bg-gradient-to-b from-purple-500 to-pink-500 rounded-full"
        initial={{ height: 0 }}
        whileInView={{ height: '100%' }}
        transition={{ duration: 2, ease: "easeOut" }}
      />
      
      <div className="space-y-8">
        {timelineEvents.map((item, index) => {
          const IconComponent = item.icon;
          const isActive = activeIndex === index;
          
          return (
            <motion.div
              key={index}
              className="relative flex items-center gap-6"
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
            >
              {/* Timeline dot */}
              <motion.div
                className={`relative z-10 p-3 rounded-full border-2 transition-all duration-300 ${
                  isActive 
                    ? 'bg-gradient-to-br from-purple-500 to-pink-500 border-purple-400 scale-110' 
                    : 'bg-neutral-800 border-neutral-600'
                }`}
                animate={isActive ? {
                  boxShadow: [
                    '0 0 0 0 rgba(147, 51, 234, 0.7)',
                    '0 0 0 20px rgba(147, 51, 234, 0)',
                  ]
                } : {}}
                transition={{ duration: 1.5, repeat: Infinity }}
              >
                <IconComponent 
                  className={`w-5 h-5 transition-colors ${
                    isActive ? 'text-white' : 'text-neutral-400'
                  }`} 
                />
              </motion.div>
              
              {/* Timeline content */}
              <div className="flex-1">
                <motion.div
                  className={`text-lg font-bold transition-colors ${
                    isActive ? 'text-purple-400' : 'text-neutral-400'
                  }`}
                  animate={isActive ? { scale: 1.05 } : { scale: 1 }}
                >
                  {item.year}
                </motion.div>
                <motion.div
                  className={`text-neutral-300 transition-colors ${
                    isActive ? 'text-white' : ''
                  }`}
                  animate={isActive ? { x: 10 } : { x: 0 }}
                >
                  {item.event}
                </motion.div>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}

export function About() {
  const { ref: sectionRef, inView } = useInView({
    threshold: 0.1,
    triggerOnce: false
  });

  const [timeOfDay, setTimeOfDay] = useState<'day' | 'night'>('night');
  
  useEffect(() => {
    const hour = new Date().getHours();
    setTimeOfDay(hour >= 6 && hour < 18 ? 'day' : 'night');
  }, []);

  return (
    <section ref={sectionRef} id="about" className="min-h-screen flex flex-col justify-center py-20 px-4 relative overflow-hidden">
      {/* Dynamic background based on time */}
      <div className="absolute inset-0 overflow-hidden opacity-10">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className={`absolute w-1 h-1 rounded-full ${
              timeOfDay === 'day' 
                ? i % 2 === 0 ? 'bg-yellow-400' : 'bg-orange-400'
                : i % 2 === 0 ? 'bg-purple-400' : 'bg-blue-400'
            }`}
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              scale: [0.5, 1.5, 0.5],
              opacity: [0.3, 1, 0.3],
              rotate: [0, 360]
            }}
            transition={{
              duration: 4 + i * 0.5,
              repeat: Infinity,
              ease: "easeInOut",
              delay: i * 0.3
            }}
          />
        ))}
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 1 }}
        viewport={{ once: true }}
        className="max-w-6xl mx-auto relative z-10"
      >
        {/* Section header with dynamic greeting */}
        <div className="text-center mb-16">
          <motion.div
            className="flex items-center justify-center gap-3 mb-4"
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <motion.div
              animate={{ rotate: timeOfDay === 'day' ? 360 : 0 }}
              transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
            >
              {timeOfDay === 'day' ? 
                <Sun className="w-8 h-8 text-yellow-500" /> : 
                <Moon className="w-8 h-8 text-blue-400" />
              }
            </motion.div>
            <span className="text-lg text-neutral-400">
              {timeOfDay === 'day' ? 'Good Day!' : 'Good Evening!'}
            </span>
          </motion.div>

          <motion.h2
            className="text-5xl md:text-7xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-purple-500 via-pink-500 to-blue-500"
            animate={inView ? {
              backgroundPosition: ['0% 50%', '100% 50%', '0% 50%']
            } : {}}
            transition={{ duration: 8, repeat: Infinity }}
            style={{ backgroundSize: '200% 200%' }}
          >
            About Me
          </motion.h2>
          
          <motion.p
            className="text-xl text-neutral-400 max-w-3xl mx-auto leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            Passionate developer crafting digital experiences with code, creativity, and endless curiosity.
          </motion.p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-start">
          {/* Education section with enhanced design */}
          <FloatingCard delay={0.2} className="h-full">
            <div className="relative bg-gradient-to-br from-neutral-900/90 to-neutral-800/90 backdrop-blur-sm rounded-2xl p-8 border border-neutral-700/50 h-full overflow-hidden">
              {/* Animated background pattern */}
              <motion.div
                className="absolute inset-0 opacity-5"
                animate={{
                  backgroundPosition: ['0% 0%', '100% 100%'],
                }}
                transition={{
                  duration: 20,
                  repeat: Infinity,
                  ease: 'linear',
                }}
                style={{
                  backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23a855f7' fill-opacity='1'%3E%3Ccircle cx='30' cy='30' r='1'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
                }}
              />

              <div className="relative z-10">
                <div className="flex items-center gap-4 mb-6">
                  <motion.div
                    className="p-3 bg-gradient-to-br from-purple-500/20 to-pink-500/20 rounded-lg border border-purple-500/30"
                    whileHover={{ scale: 1.1, rotate: 360 }}
                    transition={{ duration: 0.6 }}
                  >
                    <GraduationCap className="w-7 h-7 text-purple-400" />
                  </motion.div>
                  <motion.h3
                    className="text-3xl font-bold text-neutral-200"
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6, delay: 0.4 }}
                  >
                    Education Journey
                  </motion.h3>
                </div>

                <div className="space-y-4">
                  <motion.div
                    className="p-4 bg-gradient-to-r from-purple-500/10 to-pink-500/10 rounded-lg border border-purple-500/20"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.6 }}
                  >
                    <h4 className="text-xl font-semibold text-white mb-2">{education.degree}</h4>
                    <div className="space-y-2 text-sm text-neutral-300">
                      <div className="flex items-center gap-2">
                        <BookOpen className="w-4 h-4 text-blue-400" />
                        <span>{education.institution}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <MapPin className="w-4 h-4 text-green-400" />
                        <span>{education.location}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Clock className="w-4 h-4 text-yellow-400" />
                        <span>{education.period}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Award className="w-4 h-4 text-purple-400" />
                        <span>{education.details}</span>
                      </div>
                    </div>
                  </motion.div>

                  {/* Coursework with animated tags */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.8 }}
                  >
                    <h5 className="text-lg font-semibold text-neutral-300 mb-3 flex items-center gap-2">
                      <Star className="w-5 h-5 text-yellow-500" />
                      Key Coursework
                    </h5>
                    <div className="flex flex-wrap gap-2">
                      {education.coursework.map((course, index) => (
                        <motion.span
                          key={index}
                          className="px-3 py-1 text-xs bg-blue-500/10 text-blue-400 rounded-full border border-blue-500/20"
                          initial={{ opacity: 0, scale: 0.8 }}
                          whileInView={{ opacity: 1, scale: 1 }}
                          transition={{ duration: 0.4, delay: 0.9 + index * 0.1 }}
                          whileHover={{ 
                            scale: 1.1, 
                            backgroundColor: 'rgba(59, 130, 246, 0.2)',
                            boxShadow: '0 0 20px rgba(59, 130, 246, 0.3)'
                          }}
                        >
                          {course}
                        </motion.span>
                      ))}
                    </div>
                  </motion.div>
                </div>

                {/* Timeline visualization */}
                <motion.div
                  className="mt-8"
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  transition={{ duration: 0.8, delay: 1 }}
                >
                  <Timeline />
                </motion.div>
              </div>
            </div>
          </FloatingCard>

          {/* Competencies section */}
          <FloatingCard delay={0.4} className="h-full">
            <div className="relative bg-gradient-to-br from-neutral-900/90 to-neutral-800/90 backdrop-blur-sm rounded-2xl p-8 border border-neutral-700/50 h-full overflow-hidden">
              {/* Animated background */}
              <motion.div
                className="absolute inset-0 bg-gradient-to-br from-purple-500/5 to-pink-500/5 opacity-50"
                animate={{
                  scale: [1, 1.1, 1],
                  opacity: [0.3, 0.6, 0.3]
                }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              />

              <div className="relative z-10 h-full flex flex-col">
                <div className="flex items-center gap-4 mb-6">
                  <motion.div
                    className="p-3 bg-gradient-to-br from-purple-500/20 to-pink-500/20 rounded-lg border border-purple-500/30"
                    whileHover={{ scale: 1.1, rotate: 360 }}
                    transition={{ duration: 0.6 }}
                  >
                    <Brain className="w-7 h-7 text-purple-400" />
                  </motion.div>
                  <motion.h3
                    className="text-3xl font-bold text-neutral-200"
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6, delay: 0.4 }}
                  >
                    Core Competencies
                  </motion.h3>
                </div>

                <div className="flex-1 space-y-4">
                  {competencies.map((competency, index) => (
                    <CompetencyItem key={index} competency={competency} index={index} />
                  ))}
                </div>

                {/* Motivational footer */}
                <motion.div
                  className="mt-8 p-4 bg-gradient-to-r from-purple-500/10 to-pink-500/10 rounded-lg border border-purple-500/20 text-center"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 1.5 }}
                >
                  <div className="flex items-center justify-center gap-2 text-purple-400 mb-2">
                    <Heart className="w-5 h-5" />
                    <span className="font-semibold">Passion Driven</span>
                    <Heart className="w-5 h-5" />
                  </div>
                  <p className="text-sm text-neutral-300">
                    Fueled by coffee, curiosity, and the endless pursuit of elegant code.
                  </p>
                  <motion.div
                    className="flex justify-center mt-2"
                    animate={{ scale: [1, 1.2, 1] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  >
                    <Coffee className="w-5 h-5 text-amber-400" />
                  </motion.div>
                </motion.div>
              </div>
            </div>
          </FloatingCard>
        </div>

        {/* Call to action */}
        <motion.div
          className="text-center mt-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
        >
          <motion.div
            className="inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-purple-600/20 to-pink-600/20 border border-purple-500/30 rounded-full backdrop-blur-sm text-neutral-200"
            whileHover={{ 
              scale: 1.05,
              boxShadow: "0 20px 40px rgba(147, 51, 234, 0.3)"
            }}
          >
            <Lightbulb className="w-6 h-6 text-yellow-400" />
            <span className="text-lg font-semibold">
              Ready to bring ideas to life through code
            </span>
            <Rocket className="w-6 h-6 text-blue-400" />
          </motion.div>
        </motion.div>
      </motion.div>
    </section>
  );
}