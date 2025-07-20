'use client';
import { motion } from 'framer-motion';
import { projects } from '@/lib/data';
import Image from 'next/image';
import { ExternalLink, Github, Eye, ArrowRight, Play, Zap, Code, Trophy, Calendar } from 'lucide-react';
import { useState, memo } from 'react';
import { useInView } from 'react-intersection-observer';

// Type for project data
interface Project {
  title: string;
  image: string;
  status: string;
  category: string;
  period: string;
  impact: string;
  technologies: string[];
  features: string[];
  description: string[];
  liveUrl: string;
  githubUrl: string;
}

// Optimized project card with minimal but effective animations
const ProjectCard = memo(({ project, index }: { project: Project, index: number }) => {
  const [isFlipped, setIsFlipped] = useState(false);
  const { ref, inView } = useInView({
    threshold: 0.2,
    triggerOnce: true
  });

  return (
    <motion.div
      ref={ref}
      className="group relative h-[600px] perspective-1000"
      initial={{ opacity: 0, y: 30 }}
      animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
      transition={{ 
        duration: 0.6, 
        delay: index * 0.1,
        ease: [0.25, 0.46, 0.45, 0.94]
      }}
    >
      {/* Card container with flip */}
      <motion.div
        className="relative w-full h-full cursor-pointer"
        animate={{ rotateY: isFlipped ? 180 : 0 }}
        transition={{ duration: 0.8, ease: "easeInOut" }}
        style={{ transformStyle: 'preserve-3d' }}
      >
        {/* Front side - Optimized design */}
        <motion.div
          className="absolute inset-0 bg-gradient-to-br from-neutral-900 via-neutral-800 to-neutral-900 backdrop-blur-sm rounded-2xl border border-neutral-700/50 overflow-hidden shadow-2xl"
          style={{ backfaceVisibility: 'hidden' }}
          whileHover={{ 
            scale: 1.02,
            borderColor: 'rgba(147, 51, 234, 0.3)',
            boxShadow: '0 25px 50px rgba(0, 0, 0, 0.5)'
          }}
          transition={{ duration: 0.3 }}
        >
          {/* Project image with clean overlay */}
          <div className="relative h-64 overflow-hidden">
            <Image
              src={project.image}
              alt={project.title}
              fill
              className="object-cover transition-transform duration-700 group-hover:scale-105"
              priority={index < 3}
              quality={85}
            />
            
            {/* Gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
            
            {/* Status badges - cleaner design */}
            <div className="absolute top-4 left-4">
              <span className="px-3 py-1 text-xs font-medium bg-green-500/90 text-white rounded-full backdrop-blur-sm">
                {project.status}
              </span>
            </div>
            
            <div className="absolute top-4 right-4">
              <span className="px-3 py-1 text-xs font-medium bg-purple-500/90 text-white rounded-full backdrop-blur-sm">
                {project.category}
              </span>
            </div>

            {/* Quick action buttons - only show on hover */}
            <motion.div
              className="absolute inset-0 flex items-center justify-center gap-4"
              initial={{ opacity: 0 }}
              whileHover={{ opacity: 1 }}
              transition={{ duration: 0.3 }}
            >
              <motion.a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 bg-white/90 backdrop-blur-sm rounded-full text-gray-900 hover:bg-white transition-colors"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                onClick={(e) => e.stopPropagation()}
              >
                <ExternalLink size={20} />
              </motion.a>
              
              <motion.button
                onClick={(e) => {
                  e.stopPropagation();
                  setIsFlipped(true);
                }}
                className="p-3 bg-purple-500/90 backdrop-blur-sm rounded-full text-white hover:bg-purple-600 transition-colors"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
              >
                <Eye size={20} />
              </motion.button>
              
              <motion.a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 bg-gray-900/90 backdrop-blur-sm rounded-full text-white hover:bg-gray-800 transition-colors"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                onClick={(e) => e.stopPropagation()}
              >
                <Github size={20} />
              </motion.a>
            </motion.div>
          </div>

          {/* Content section - cleaner layout */}
          <div className="p-6 space-y-4">
            <div className="flex justify-between items-start">
              <h3 className="text-xl font-bold text-white group-hover:text-purple-300 transition-colors">
                {project.title}
              </h3>
              <div className="flex items-center gap-1 text-xs text-neutral-400">
                <Calendar size={14} />
                <span>{project.period}</span>
              </div>
            </div>

            {/* Impact metric */}
            <div className="flex items-center gap-2 text-sm">
              <Trophy className="w-4 h-4 text-yellow-500" />
              <span className="text-neutral-300 font-medium">{project.impact}</span>
            </div>

            {/* Tech stack - simplified */}
            <div className="flex flex-wrap gap-2">
              {project.technologies.slice(0, 4).map((tech: string, techIndex: number) => (
                <span
                  key={techIndex}
                  className="px-2 py-1 text-xs bg-purple-500/10 text-purple-300 rounded-md border border-purple-500/20"
                >
                  {tech}
                </span>
              ))}
              {project.technologies.length > 4 && (
                <span className="px-2 py-1 text-xs bg-neutral-700 text-neutral-400 rounded-md">
                  +{project.technologies.length - 4} more
                </span>
              )}
            </div>

            {/* Key features preview */}
            <div className="space-y-2">
              <h4 className="text-sm font-semibold text-neutral-300 flex items-center gap-2">
                <Zap className="w-4 h-4 text-yellow-500" />
                Key Features
              </h4>
              <ul className="space-y-1">
                {project.features.slice(0, 2).map((feature: string, featureIndex: number) => (
                  <li
                    key={featureIndex}
                    className="text-sm text-neutral-400 flex items-start gap-2"
                  >
                    <span className="w-1 h-1 bg-purple-500 rounded-full mt-2 flex-shrink-0" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Action buttons */}
            <div className="flex gap-3 pt-4">
              <motion.a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 py-2.5 px-4 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-lg text-sm font-medium text-center hover:shadow-lg transition-all duration-300"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <div className="flex items-center justify-center gap-2">
                  <Play size={14} />
                  <span>Live Demo</span>
                </div>
              </motion.a>
              
              <motion.button
                onClick={() => setIsFlipped(true)}
                className="px-4 py-2.5 border border-purple-500 text-purple-400 rounded-lg text-sm font-medium hover:bg-purple-500/10 transition-all duration-300"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <div className="flex items-center gap-2">
                  <ArrowRight size={14} />
                  <span>Details</span>
                </div>
              </motion.button>
            </div>
          </div>
        </motion.div>

        {/* Back side - Detailed view */}
        <motion.div
          className="absolute inset-0 bg-gradient-to-br from-neutral-900 to-neutral-800 rounded-2xl border border-neutral-700/50 p-6 overflow-y-auto"
          style={{ 
            backfaceVisibility: 'hidden',
            transform: 'rotateY(180deg)'
          }}
        >
          <div className="space-y-6">
            {/* Header with close button */}
            <div className="flex justify-between items-center">
              <h3 className="text-2xl font-bold text-white">{project.title}</h3>
              <motion.button
                onClick={() => setIsFlipped(false)}
                className="p-2 hover:bg-neutral-700 rounded-lg transition-colors"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <ArrowRight size={20} className="rotate-180 text-neutral-400" />
              </motion.button>
            </div>

            {/* Project overview */}
            <div className="space-y-3">
              <h4 className="text-lg font-semibold text-purple-400">Project Overview</h4>
              <div className="space-y-2">
                {project.description.map((desc: string, descIndex: number) => (
                  <p
                    key={descIndex}
                    className="text-sm text-neutral-300 leading-relaxed"
                  >
                    {desc}
                  </p>
                ))}
              </div>
            </div>

            {/* All technologies */}
            <div className="space-y-3">
              <h4 className="text-lg font-semibold text-purple-400 flex items-center gap-2">
                <Code size={18} />
                Technologies Used
              </h4>
              <div className="flex flex-wrap gap-2">
                {project.technologies.map((tech: string, techIndex: number) => (
                  <span
                    key={techIndex}
                    className="px-3 py-1 text-xs bg-purple-500/10 text-purple-400 rounded-full border border-purple-500/20"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            {/* Complete features */}
            <div className="space-y-3">
              <h4 className="text-lg font-semibold text-purple-400">Complete Feature Set</h4>
              <ul className="space-y-2">
                {project.features.map((feature: string, featureIndex: number) => (
                  <li
                    key={featureIndex}
                    className="text-sm text-neutral-300 flex items-start gap-3"
                  >
                    <span className="w-1.5 h-1.5 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full mt-2 flex-shrink-0" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Action buttons */}
            <div className="flex gap-3 pt-4">
              <motion.a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 py-3 px-4 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-lg text-sm font-medium text-center hover:shadow-lg transition-all"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                Visit Live Site
              </motion.a>
              
              <motion.a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 py-3 px-4 border border-purple-500 text-purple-400 rounded-lg text-sm font-medium text-center hover:bg-purple-500/10 transition-colors"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                View Code
              </motion.a>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </motion.div>
  );
});

ProjectCard.displayName = 'ProjectCard';

export function Projects() {
  const { ref: sectionRef, inView } = useInView({
    threshold: 0.1,
    triggerOnce: true
  });

  return (
    <section ref={sectionRef} id="projects" className="min-h-screen py-20 px-4 relative overflow-hidden">
      {/* Subtle background elements */}
      <div className="absolute inset-0 overflow-hidden opacity-5">
        {[...Array(3)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-96 h-96 border border-purple-500/20 rounded-full"
            style={{
              left: `${20 + i * 30}%`,
              top: `${10 + i * 25}%`,
            }}
            animate={{
              scale: [1, 1.1, 1],
              opacity: [0.1, 0.2, 0.1],
            }}
            transition={{
              duration: 8 + i * 2,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
        ))}
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={inView ? { opacity: 1 } : { opacity: 0 }}
        transition={{ duration: 0.8 }}
        className="max-w-7xl mx-auto relative z-10"
      >
        {/* Section header */}
        <div className="text-center mb-16">
          <motion.h2
            className="text-5xl md:text-6xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-purple-500 via-pink-500 to-blue-500"
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            Featured Projects
          </motion.h2>
          
          <motion.div
            className="h-1 bg-gradient-to-r from-purple-500 to-pink-500 mx-auto rounded-full mb-8"
            initial={{ width: 0 }}
            animate={inView ? { width: '120px' } : { width: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
          />
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-lg text-neutral-400 max-w-2xl mx-auto leading-relaxed"
          >
            A showcase of my latest work, where innovation meets implementation. 
            Each project represents a unique challenge and creative solution.
          </motion.p>
        </div>

        {/* Projects grid - optimized layout */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {projects.map((project, index) => (
            <ProjectCard key={project.title} project={project} index={index} />
          ))}
        </div>

        {/* Call to action */}
        <motion.div
          className="text-center mt-16"
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          <motion.a
            href="https://github.com/zeyadhany"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-full font-semibold text-lg hover:shadow-lg hover:shadow-purple-500/25 transition-all duration-300"
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.95 }}
          >
            <Github size={24} />
            <span>Explore All Projects</span>
            <ArrowRight size={20} />
          </motion.a>
        </motion.div>
      </motion.div>
    </section>
  );
}