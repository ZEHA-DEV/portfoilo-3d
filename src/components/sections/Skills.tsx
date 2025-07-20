'use client';
import { motion, useMotionValue, useTransform, AnimatePresence } from 'framer-motion';
import { skills } from '@/lib/data';
import { useState, useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { useInView } from 'react-intersection-observer';
import { Zap, Star, Sparkles, Code, Database, Wrench, Globe, Brain, Rocket } from 'lucide-react';

// Interactive skill bubble component
function SkillBubble({ skill, index, category }: { skill: string, index: number, category: string }) {
  const [isHovered, setIsHovered] = useState(false);
  const bubbleRef = useRef<HTMLDivElement>(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  
  const rotateX = useTransform(mouseY, [-100, 100], [10, -10]);
  const rotateY = useTransform(mouseX, [-100, 100], [-10, 10]);
  
  const categoryColors = {
    programming: { bg: 'from-blue-500/20 to-cyan-500/20', border: 'border-blue-500/30', text: 'text-blue-400', icon: Code },
    frontend: { bg: 'from-purple-500/20 to-pink-500/20', border: 'border-purple-500/30', text: 'text-purple-400', icon: Globe },
    backend: { bg: 'from-green-500/20 to-emerald-500/20', border: 'border-green-500/30', text: 'text-green-400', icon: Database },
    databases: { bg: 'from-orange-500/20 to-red-500/20', border: 'border-orange-500/30', text: 'text-orange-400', icon: Database },
    tools: { bg: 'from-yellow-500/20 to-amber-500/20', border: 'border-yellow-500/30', text: 'text-yellow-400', icon: Wrench },
    other: { bg: 'from-indigo-500/20 to-purple-500/20', border: 'border-indigo-500/30', text: 'text-indigo-400', icon: Brain }
  };
  
  const colorScheme = categoryColors[category as keyof typeof categoryColors] || categoryColors.other;
  const IconComponent = colorScheme.icon;

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!bubbleRef.current) return;
    
    const rect = bubbleRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    
    mouseX.set(e.clientX - centerX);
    mouseY.set(e.clientY - centerY);
  };

  // GSAP magnetic effect
  useEffect(() => {
    if (!bubbleRef.current) return;
    
    const element = bubbleRef.current;
    
    const handleMouseEnter = () => {
      gsap.to(element, {
        scale: 1.1,
        duration: 0.3,
        ease: "power2.out"
      });
    };
    
    const handleMouseLeave = () => {
      gsap.to(element, {
        scale: 1,
        duration: 0.3,
        ease: "power2.out"
      });
      mouseX.set(0);
      mouseY.set(0);
    };
    
    element.addEventListener('mouseenter', handleMouseEnter);
    element.addEventListener('mouseleave', handleMouseLeave);
    
    return () => {
      element.removeEventListener('mouseenter', handleMouseEnter);
      element.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);

  return (
    <motion.div
      ref={bubbleRef}
      className={`relative group cursor-pointer`}
      initial={{ opacity: 0, scale: 0, y: 20 }}
      whileInView={{ opacity: 1, scale: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ 
        duration: 0.5, 
        delay: index * 0.1,
        type: "spring",
        stiffness: 100
      }}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{
        rotateX: rotateX,
        rotateY: rotateY,
        transformStyle: 'preserve-3d'
      }}
    >
      <motion.div
        className={`relative px-4 py-3 bg-gradient-to-br ${colorScheme.bg} backdrop-blur-sm rounded-full border ${colorScheme.border} ${colorScheme.text} text-sm font-medium transition-all duration-300 overflow-hidden`}
        whileHover={{ 
          boxShadow: `0 10px 30px ${colorScheme.text.includes('blue') ? 'rgba(59, 130, 246, 0.3)' : 
                                    colorScheme.text.includes('purple') ? 'rgba(147, 51, 234, 0.3)' :
                                    colorScheme.text.includes('green') ? 'rgba(34, 197, 94, 0.3)' :
                                    colorScheme.text.includes('orange') ? 'rgba(249, 115, 22, 0.3)' :
                                    colorScheme.text.includes('yellow') ? 'rgba(245, 158, 11, 0.3)' :
                                    'rgba(99, 102, 241, 0.3)'}`,
        }}
      >
        {/* Animated background particles */}
        <motion.div
          className="absolute inset-0 opacity-20"
          animate={isHovered ? {
            background: [
              'radial-gradient(circle at 20% 50%, rgba(255,255,255,0.3) 0%, transparent 50%)',
              'radial-gradient(circle at 80% 50%, rgba(255,255,255,0.3) 0%, transparent 50%)',
              'radial-gradient(circle at 20% 50%, rgba(255,255,255,0.3) 0%, transparent 50%)'
            ]
          } : {}}
          transition={{ duration: 2, repeat: Infinity }}
        />
        
        <div className="relative z-10 flex items-center gap-2">
          <motion.div
            animate={isHovered ? { rotate: 360 } : { rotate: 0 }}
            transition={{ duration: 0.6 }}
          >
            <IconComponent size={16} />
          </motion.div>
          <span>{skill}</span>
        </div>
        
        {/* Ripple effect */}
        <AnimatePresence>
          {isHovered && (
            <motion.div
              className={`absolute inset-0 border-2 ${colorScheme.border} rounded-full`}
              initial={{ scale: 1, opacity: 0.5 }}
              animate={{ scale: 2, opacity: 0 }}
              exit={{ scale: 1, opacity: 0 }}
              transition={{ duration: 0.6 }}
            />
          )}
        </AnimatePresence>
      </motion.div>
      
      {/* Floating sparkles */}
      <AnimatePresence>
        {isHovered && (
          <>
            {[...Array(3)].map((_, i) => (
              <motion.div
                key={i}
                className={`absolute w-1 h-1 ${colorScheme.text.replace('text-', 'bg-')} rounded-full`}
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                }}
                initial={{ scale: 0, opacity: 0 }}
                animate={{ 
                  scale: [0, 1, 0],
                  opacity: [0, 1, 0],
                  y: [0, -20, 0]
                }}
                exit={{ scale: 0, opacity: 0 }}
                transition={{ 
                  duration: 1,
                  delay: i * 0.2,
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

// Category header with animated icon
function CategoryHeader({ category, icon: Icon, index }: { category: string, icon: any, index: number }) {
  const [isVisible, setIsVisible] = useState(false);
  const { ref, inView } = useInView({ threshold: 0.5, triggerOnce: true });
  
  useEffect(() => {
    if (inView) setIsVisible(true);
  }, [inView]);

  return (
    <motion.div
      ref={ref}
      className="relative mb-8"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: index * 0.2 }}
    >
      <div className="flex items-center gap-4 mb-4">
        <motion.div
          className="p-3 bg-gradient-to-br from-purple-500/20 to-pink-500/20 rounded-lg border border-purple-500/30"
          animate={isVisible ? {
            rotate: [0, 360],
            scale: [1, 1.1, 1]
          } : {}}
          transition={{ 
            duration: 2, 
            repeat: Infinity, 
            repeatType: "loop",
            ease: "easeInOut"
          }}
        >
          <Icon className="w-6 h-6 text-purple-400" />
        </motion.div>
        
        <motion.h3
          className="text-2xl font-bold capitalize text-neutral-200"
          animate={isVisible ? {
            backgroundPosition: ['0% 50%', '100% 50%', '0% 50%']
          } : {}}
          transition={{ duration: 4, repeat: Infinity }}
          style={{
            backgroundImage: 'linear-gradient(90deg, #a855f7, #ec4899, #3b82f6, #a855f7)',
            backgroundSize: '200% 200%',
            backgroundClip: 'text',
            WebkitBackgroundClip: 'text',
            color: 'transparent'
          }}
        >
          {category.replace('_', ' ')}
        </motion.h3>
      </div>
      
      {/* Animated progress bar */}
      <motion.div
        className="h-1 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full"
        initial={{ width: 0 }}
        animate={isVisible ? { width: '100%' } : { width: 0 }}
        transition={{ duration: 1, delay: 0.5 }}
      />
    </motion.div>
  );
}

export function Skills() {
  const categories = Object.entries(skills);
  const { ref: sectionRef, inView } = useInView({
    threshold: 0.1,
    triggerOnce: false
  });

  const categoryIcons = {
    programming: Code,
    frontend: Globe,
    backend: Database,
    databases: Database,
    tools: Wrench,
    other: Brain
  };

  return (
    <section ref={sectionRef} id="skills" className="min-h-screen py-20 px-4 relative overflow-hidden">
      {/* Dynamic background with floating elements */}
      <div className="absolute inset-0 overflow-hidden opacity-20">
        {[...Array(15)].map((_, i) => (
          <motion.div
            key={i}
            className={`absolute w-2 h-2 rounded-full ${
              i % 3 === 0 ? 'bg-purple-500' : 
              i % 3 === 1 ? 'bg-pink-500' : 'bg-blue-500'
            }`}
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -30, 0],
              opacity: [0.2, 1, 0.2],
              scale: [0.5, 1, 0.5]
            }}
            transition={{
              duration: 3 + i * 0.5,
              repeat: Infinity,
              ease: "easeInOut",
              delay: i * 0.2
            }}
          />
        ))}
      </div>

      {/* Animated grid background */}
      <motion.div 
        className="absolute inset-0 opacity-[0.02]"
        animate={{
          backgroundPosition: ['0% 0%', '100% 100%'],
        }}
        transition={{
          duration: 40,
          repeat: Infinity,
          ease: 'linear',
        }}
        style={{
          backgroundImage: `
            linear-gradient(rgba(147, 51, 234, 0.3) 1px, transparent 1px),
            linear-gradient(90deg, rgba(147, 51, 234, 0.3) 1px, transparent 1px)
          `,
          backgroundSize: '100px 100px',
        }}
      />

      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 1 }}
        viewport={{ once: true }}
        className="max-w-6xl mx-auto relative z-10"
      >
        {/* Section header with holographic effect */}
        <div className="text-center mb-20">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="relative"
          >
            <motion.h2
              className="text-5xl md:text-7xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-purple-500 via-pink-500 to-blue-500 relative"
              animate={inView ? {
                backgroundPosition: ['0% 50%', '100% 50%', '0% 50%']
              } : {}}
              transition={{ duration: 8, repeat: Infinity }}
              style={{ backgroundSize: '200% 200%' }}
            >
              Technical Arsenal
              
              {/* Holographic scan lines */}
              <motion.div
                className="absolute inset-0 pointer-events-none"
                animate={{
                  backgroundImage: [
                    'linear-gradient(transparent 0%, rgba(0, 255, 255, 0.1) 50%, transparent 100%)',
                    'linear-gradient(transparent 0%, rgba(0, 255, 255, 0.1) 50%, transparent 100%)'
                  ],
                  backgroundPosition: ['0% 0%', '0% 100%']
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: 'linear'
                }}
              />
            </motion.h2>
            
            {/* Animated subtitle */}
            <motion.p
              className="text-xl text-neutral-400 max-w-3xl mx-auto leading-relaxed"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              viewport={{ once: true }}
            >
              My technological toolkit spans the full spectrum of modern development, 
              from bleeding-edge frontend frameworks to robust backend architectures.
            </motion.p>
          </motion.div>
        </div>

        {/* Skills categories with enhanced layout */}
        <div className="space-y-16">
          {categories.map(([category, items], index) => (
            <motion.div
              key={category}
              className="relative"
              initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: index * 0.2 }}
            >
              {/* Category background */}
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-purple-500/5 to-pink-500/5 rounded-2xl blur-3xl"
                animate={{
                  scale: [1, 1.05, 1],
                  opacity: [0.3, 0.5, 0.3]
                }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              />
              
              <div className="relative bg-neutral-900/30 backdrop-blur-sm rounded-2xl p-8 border border-neutral-700/30">
                <CategoryHeader 
                  category={category} 
                  icon={categoryIcons[category as keyof typeof categoryIcons] || Brain}
                  index={index}
                />
                
                {/* Skills grid with stagger animation */}
                <motion.div
                  className="flex flex-wrap gap-3"
                  variants={{
                    hidden: { opacity: 0 },
                    visible: {
                      opacity: 1,
                      transition: {
                        staggerChildren: 0.1,
                        delayChildren: index * 0.3
                      }
                    }
                  }}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                >
                  {items.map((skill: string, skillIndex: number) => (
                    <SkillBubble
                      key={skillIndex}
                      skill={skill}
                      index={skillIndex}
                      category={category}
                    />
                  ))}
                </motion.div>
                
                {/* Category stats */}
                <motion.div
                  className="mt-6 flex items-center justify-between text-sm text-neutral-400"
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.2 + 0.5 }}
                >
                  <span className="flex items-center gap-2">
                    <Star className="w-4 h-4 text-yellow-500" />
                    {items.length} Technologies
                  </span>
                  <span className="flex items-center gap-2">
                    <Zap className="w-4 h-4 text-blue-500" />
                    Production Ready
                  </span>
                </motion.div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Interactive skill constellation */}
        <motion.div
          className="mt-20 text-center"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <motion.div
            className="inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-purple-600/20 to-pink-600/20 border border-purple-500/30 rounded-full backdrop-blur-sm"
            whileHover={{ 
              scale: 1.05,
              boxShadow: "0 20px 40px rgba(147, 51, 234, 0.3)"
            }}
          >
            <Rocket className="w-6 h-6 text-purple-400" />
            <span className="text-lg font-semibold text-neutral-200">
              Always Learning, Always Growing
            </span>
            <Sparkles className="w-6 h-6 text-pink-400" />
          </motion.div>
        </motion.div>
      </motion.div>
    </section>
  );
}