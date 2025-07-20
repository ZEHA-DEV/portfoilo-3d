'use client';
import { motion } from 'framer-motion';
import { useMemo, useEffect, useRef, useState } from 'react';

// Islamic color palette
const ISLAMIC_COLORS = {
  primary: '#1e3a5f',    // Deep blue
  secondary: '#c9a961',  // Gold
  accent: '#2c5f2d',     // Islamic green
  light: '#f4f4f9',      // Off white
  turquoise: '#4a9d9c',  // Turquoise
  burgundy: '#6d1f2c',   // Deep red
  darkGold: '#8b6914',   // Dark gold
};

export function BackgroundShapes() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  // Islamic-inspired particles
  const particles = useMemo(() => {
    const particleArray = [];
    for (let i = 0; i < 12; i++) {
      particleArray.push({
        id: i,
        x: Math.random() * 100,
        y: Math.random() * 100,
        size: Math.random() * 4 + 2,
        opacity: Math.random() * 0.4 + 0.1,
        color: Math.random() > 0.5 ? 'gold' : 'turquoise',
      });
    }
    return particleArray;
  }, []);

  // Islamic geometric shapes
  const shapes = useMemo(() => {
    const shapeArray = [];
    const shapeTypes = ['star8', 'hexagon', 'crescent', 'arabesque'];
    
    for (let i = 0; i < 6; i++) {
      shapeArray.push({
        id: i,
        type: shapeTypes[Math.floor(Math.random() * shapeTypes.length)],
        size: Math.random() * 80 + 40,
        x: Math.random() * 100,
        y: Math.random() * 100,
        opacity: Math.random() * 0.2 + 0.05,
        duration: Math.random() * 25 + 20,
        delay: Math.random() * 5,
        color: ['gold', 'turquoise', 'green'][Math.floor(Math.random() * 3)],
      });
    }
    return shapeArray;
  }, []);

  // Optimized mouse tracking
  useEffect(() => {
    let throttleTimer: NodeJS.Timeout;
    
    const handleMouseMove = (e: MouseEvent) => {
      if (throttleTimer) return;
      
      throttleTimer = setTimeout(() => {
        setMousePosition({
          x: (e.clientX / window.innerWidth) * 100,
          y: (e.clientY / window.innerHeight) * 100,
        });
        throttleTimer = null as any;
      }, 16);
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      if (throttleTimer) clearTimeout(throttleTimer);
    };
  }, []);

  const getShapeElement = (shape: any) => {
    const baseClasses = "absolute filter blur-sm transition-all duration-500";
    const getColorClasses = () => {
      switch (shape.color) {
        case 'gold':
          return 'bg-gradient-to-br from-[#c9a961]/20 to-[#8b6914]/10 border border-[#c9a961]/20';
        case 'turquoise':
          return 'bg-gradient-to-br from-[#4a9d9c]/20 to-[#2c5f2d]/10 border border-[#4a9d9c]/20';
        case 'green':
          return 'bg-gradient-to-br from-[#2c5f2d]/20 to-[#1e3a5f]/10 border border-[#2c5f2d]/20';
        default:
          return '';
      }
    };

    switch (shape.type) {
      case 'star8':
        return (
          <div
            className={`${baseClasses}`}
            style={{
              width: shape.size,
              height: shape.size,
              background: shape.color === 'gold' 
                ? 'linear-gradient(135deg, rgba(201, 169, 97, 0.15), rgba(139, 105, 20, 0.08))'
                : shape.color === 'turquoise'
                ? 'linear-gradient(135deg, rgba(74, 157, 156, 0.15), rgba(44, 95, 45, 0.08))'
                : 'linear-gradient(135deg, rgba(44, 95, 45, 0.15), rgba(30, 58, 95, 0.08))',
              clipPath: 'polygon(50% 0%, 61% 20%, 83% 15%, 71% 35%, 85% 54%, 64% 48%, 50% 70%, 36% 48%, 15% 54%, 29% 35%, 17% 15%, 39% 20%)',
            }}
          />
        );
      case 'hexagon':
        return (
          <div
            className={`${baseClasses} ${getColorClasses()}`}
            style={{
              width: shape.size,
              height: shape.size * 0.866,
              clipPath: 'polygon(30% 0%, 70% 0%, 100% 50%, 70% 100%, 30% 100%, 0% 50%)',
            }}
          />
        );
      case 'crescent':
        return (
          <div
            className={`${baseClasses}`}
            style={{
              width: shape.size,
              height: shape.size,
              position: 'relative',
              overflow: 'hidden',
            }}
          >
            <div
              style={{
                width: '100%',
                height: '100%',
                borderRadius: '50%',
                background: shape.color === 'gold' 
                  ? 'rgba(201, 169, 97, 0.15)'
                  : shape.color === 'turquoise'
                  ? 'rgba(74, 157, 156, 0.15)'
                  : 'rgba(44, 95, 45, 0.15)',
              }}
            />
            <div
              style={{
                position: 'absolute',
                top: '-10%',
                left: '20%',
                width: '80%',
                height: '80%',
                borderRadius: '50%',
                background: 'rgba(18, 18, 28, 1)',
              }}
            />
          </div>
        );
      case 'arabesque':
        return (
          <div
            className={`${baseClasses} ${getColorClasses()}`}
            style={{
              width: shape.size,
              height: shape.size,
              borderRadius: '50% 0 50% 0',
              transform: 'rotate(45deg)',
            }}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div ref={containerRef} className="fixed inset-0 overflow-hidden pointer-events-none z-0">
      {/* Islamic gradient background */}
      <div 
        className="absolute inset-0 transition-all duration-1000 ease-out"
        style={{
          background: `
            radial-gradient(circle at ${mousePosition.x}% ${mousePosition.y}%, 
              rgba(201, 169, 97, 0.05) 0%, 
              transparent 40%),
            radial-gradient(circle at ${100 - mousePosition.x}% ${100 - mousePosition.y}%, 
              rgba(74, 157, 156, 0.05) 0%, 
              transparent 40%),
            linear-gradient(135deg, rgba(30, 58, 95, 0.02), transparent 50%, rgba(44, 95, 45, 0.02))
          `
        }}
      />
      
      {/* Animated Islamic shapes */}
      {shapes.map((shape) => (
        <motion.div
          key={shape.id}
          className="absolute"
          initial={{
            x: `${shape.x}vw`,
            y: `${shape.y}vh`,
            opacity: 0,
            scale: 0.5,
          }}
          animate={{
            x: [
              `${shape.x}vw`,
              `${shape.x + 8}vw`,
              `${shape.x - 6}vw`,
              `${shape.x}vw`
            ],
            y: [
              `${shape.y}vh`,
              `${shape.y - 10}vh`,
              `${shape.y + 8}vh`,
              `${shape.y}vh`
            ],
            opacity: [0, shape.opacity, shape.opacity * 0.8, 0],
            scale: [0.5, 1, 0.9, 0.5],
            rotate: shape.type === 'star8' ? [0, 45, 90, 135, 180] : [0, 180, 360],
          }}
          transition={{
            duration: shape.duration,
            delay: shape.delay,
            repeat: Infinity,
            repeatType: 'loop',
            ease: 'easeInOut',
          }}
          style={{
            left: `${shape.x}%`,
            top: `${shape.y}%`,
            transform: `translate(-50%, -50%)`,
          }}
        >
          {getShapeElement(shape)}
        </motion.div>
      ))}

      {/* Floating particles with Islamic colors */}
      {particles.map((particle) => (
        <motion.div
          key={`particle-${particle.id}`}
          className="absolute pointer-events-none"
          initial={{
            x: `${particle.x}vw`,
            y: `${particle.y}vh`,
            opacity: 0,
          }}
          animate={{
            x: [
              `${particle.x}vw`,
              `${particle.x + 6}vw`,
              `${particle.x - 4}vw`,
              `${particle.x}vw`
            ],
            y: [
              `${particle.y}vh`,
              `${particle.y + 8}vh`,
              `${particle.y - 6}vh`,
              `${particle.y}vh`
            ],
            opacity: [0, particle.opacity, particle.opacity * 0.6, 0],
            scale: [0.8, 1.2, 1, 0.8],
          }}
          transition={{
            duration: 15 + particle.id,
            delay: particle.id * 0.5,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        >
          <div
            className="rounded-full blur-sm"
            style={{
              background: particle.color === 'gold' 
                ? 'radial-gradient(circle, rgba(201, 169, 97, 0.6), rgba(201, 169, 97, 0.1))'
                : 'radial-gradient(circle, rgba(74, 157, 156, 0.6), rgba(74, 157, 156, 0.1))',
              width: `${particle.size}px`,
              height: `${particle.size}px`,
              boxShadow: particle.color === 'gold'
                ? '0 0 10px rgba(201, 169, 97, 0.3)'
                : '0 0 10px rgba(74, 157, 156, 0.3)',
            }}
          />
        </motion.div>
      ))}

      {/* Islamic geometric grid pattern */}
      <motion.div 
        className="absolute inset-0 opacity-[0.03]"
        animate={{
          backgroundPosition: ['0% 0%', '100% 100%'],
        }}
        transition={{
          duration: 60,
          repeat: Infinity,
          ease: 'linear',
        }}
        style={{
          backgroundImage: `
            repeating-linear-gradient(
              45deg,
              rgba(201, 169, 97, 0.05),
              rgba(201, 169, 97, 0.05) 10px,
              transparent 10px,
              transparent 20px
            ),
            repeating-linear-gradient(
              -45deg,
              rgba(74, 157, 156, 0.05),
              rgba(74, 157, 156, 0.05) 10px,
              transparent 10px,
              transparent 20px
            )
          `,
        }}
      />

      {/* Subtle Islamic light rays */}
      <div className="absolute inset-0 opacity-10">
        <motion.div
          className="absolute w-full h-full"
          animate={{
            background: [
              'radial-gradient(ellipse 40% 30% at 20% 40%, rgba(201, 169, 97, 0.08), transparent)',
              'radial-gradient(ellipse 50% 40% at 80% 60%, rgba(74, 157, 156, 0.08), transparent)',
              'radial-gradient(ellipse 40% 30% at 50% 50%, rgba(44, 95, 45, 0.08), transparent)',
              'radial-gradient(ellipse 40% 30% at 20% 40%, rgba(201, 169, 97, 0.08), transparent)',
            ],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
      </div>

      {/* Floating Islamic orbs */}
      {[...Array(3)].map((_, i) => (
        <motion.div
          key={`orb-${i}`}
          className="absolute rounded-full pointer-events-none"
          style={{
            width: `${80 + i * 20}px`,
            height: `${80 + i * 20}px`,
            background: `radial-gradient(circle, ${
              i === 0 ? 'rgba(201, 169, 97, 0.08)' 
              : i === 1 ? 'rgba(74, 157, 156, 0.08)' 
              : 'rgba(44, 95, 45, 0.08)'
            }, transparent)`,
            filter: 'blur(20px)',
          }}
          animate={{
            x: [`${20 + i * 25}vw`, `${40 + i * 20}vw`, `${20 + i * 25}vw`],
            y: [`${30 + i * 15}vh`, `${50 + i * 10}vh`, `${30 + i * 15}vh`],
            scale: [1, 1.2, 0.9, 1],
          }}
          transition={{
            duration: 12 + i * 3,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
      ))}
    </div>
  );
}