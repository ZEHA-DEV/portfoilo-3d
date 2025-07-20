import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

// Islamic color palette
const ISLAMIC_COLORS = {
  primary: '#1e3a5f',    // Deep blue
  secondary: '#c9a961',  // Gold
  accent: '#2c5f2d',     // Islamic green
  light: '#f4f4f9',      // Off white
  turquoise: '#4a9d9c',  // Turquoise
  burgundy: '#6d1f2c',   // Deep red
};

export function LoadingScreen({ onLoadingComplete }: { onLoadingComplete: () => void }) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(timer);
          return 100;
        }
        return prev + 2;
      });
    }, 30);

    return () => clearInterval(timer);
  }, []);

  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.8 }}
      onAnimationComplete={onLoadingComplete}
      className="fixed inset-0 bg-gradient-to-br from-[#1e3a5f] via-[#0d1f3a] to-[#0a1628] z-50 flex items-center justify-center overflow-hidden"
    >
      {/* Islamic geometric pattern background */}
      <div className="absolute inset-0 opacity-10">
        <div 
          className="absolute inset-0"
          style={{
            backgroundImage: `
              repeating-linear-gradient(
                45deg,
                ${ISLAMIC_COLORS.secondary}20,
                ${ISLAMIC_COLORS.secondary}20 10px,
                transparent 10px,
                transparent 20px
              ),
              repeating-linear-gradient(
                -45deg,
                ${ISLAMIC_COLORS.turquoise}20,
                ${ISLAMIC_COLORS.turquoise}20 10px,
                transparent 10px,
                transparent 20px
              )
            `,
          }}
        />
      </div>

      <div className="text-center relative">
        {/* Islamic star pattern */}
        <motion.div
          initial={{ rotate: 0, scale: 0 }}
          animate={{ rotate: 360, scale: 1 }}
          transition={{ duration: 2, ease: "easeInOut" }}
          className="absolute inset-0 flex items-center justify-center"
        >
          <svg width="300" height="300" viewBox="0 0 300 300" className="absolute">
            <motion.path
              d="M150,30 L175,100 L245,100 L190,145 L215,215 L150,170 L85,215 L110,145 L55,100 L125,100 Z"
              fill="none"
              stroke={ISLAMIC_COLORS.secondary}
              strokeWidth="2"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ pathLength: 1, opacity: 0.3 }}
              transition={{ duration: 2, ease: "easeInOut" }}
            />
          </svg>
        </motion.div>

        {/* Bismillah or Name in Arabic style */}
        <motion.div
          initial={{ scale: 0.5, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mb-4"
        >
          <div className="text-xl text-[#c9a961] mb-2 font-serif">بِسْمِ اللَّهِ</div>
          <div 
            className="text-6xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-[#c9a961] via-[#f4d47c] to-[#c9a961] drop-shadow-[0_0_30px_rgba(201,169,97,0.5)]"
            style={{ fontFamily: 'serif' }}
          >
            ZH
          </div>
        </motion.div>

        {/* Islamic geometric loading indicator */}
        <div className="relative w-64 mx-auto">
          {/* Outer decorative frame */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.5 }}
            className="absolute inset-0 flex items-center justify-center"
          >
            <div className="w-full h-12 border border-[#c9a961]/20 rounded-sm relative">
              <div className="absolute -left-2 top-1/2 -translate-y-1/2 w-4 h-4 rotate-45 bg-[#1e3a5f] border border-[#c9a961]/30" />
              <div className="absolute -right-2 top-1/2 -translate-y-1/2 w-4 h-4 rotate-45 bg-[#1e3a5f] border border-[#c9a961]/30" />
            </div>
          </motion.div>

          {/* Progress bar */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.7 }}
            className="relative h-2 bg-[#c9a961]/10 overflow-hidden rounded-full"
          >
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.1 }}
              className="h-full bg-gradient-to-r from-[#c9a961] via-[#f4d47c] to-[#c9a961] rounded-full relative"
              style={{
                boxShadow: '0 0 20px rgba(201, 169, 97, 0.5)',
              }}
            >
              {/* Shimmer effect */}
              <motion.div
                animate={{
                  x: ['-100%', '200%'],
                }}
                transition={{
                  duration: 1.5,
                  repeat: Infinity,
                  ease: 'linear',
                }}
                className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
              />
            </motion.div>
          </motion.div>

          {/* Progress percentage */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.9 }}
            className="text-[#c9a961] text-sm mt-2 font-mono"
          >
            {progress}%
          </motion.div>
        </div>
        
        {/* Loading text with Islamic greeting */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 1 }}
          className="text-[#f4f4f9]/60 mt-8"
        >
          <span className="block text-sm mb-1">السلام عليكم</span>
          <span className="text-xs">Welcome to my portfolio</span>
        </motion.p>

        {/* Rotating Islamic geometric shapes */}
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          className="absolute -z-10 inset-0 flex items-center justify-center"
        >
          {[...Array(8)].map((_, i) => (
            <div
              key={i}
              className="absolute w-2 h-2 bg-[#c9a961]/20 rounded-full"
              style={{
                top: '50%',
                left: '50%',
                transform: `translate(-50%, -50%) rotate(${i * 45}deg) translateY(-100px)`,
              }}
            />
          ))}
        </motion.div>
      </div>

      {/* Corner decorations */}
      <div className="absolute top-8 left-8">
        <motion.div
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 0.3, scale: 1 }}
          transition={{ duration: 0.8, delay: 1.2 }}
          className="w-16 h-16 border-t-2 border-l-2 border-[#c9a961]"
        />
      </div>
      <div className="absolute top-8 right-8">
        <motion.div
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 0.3, scale: 1 }}
          transition={{ duration: 0.8, delay: 1.3 }}
          className="w-16 h-16 border-t-2 border-r-2 border-[#c9a961]"
        />
      </div>
      <div className="absolute bottom-8 left-8">
        <motion.div
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 0.3, scale: 1 }}
          transition={{ duration: 0.8, delay: 1.4 }}
          className="w-16 h-16 border-b-2 border-l-2 border-[#c9a961]"
        />
      </div>
      <div className="absolute bottom-8 right-8">
        <motion.div
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 0.3, scale: 1 }}
          transition={{ duration: 0.8, delay: 1.5 }}
          className="w-16 h-16 border-b-2 border-r-2 border-[#c9a961]"
        />
      </div>
    </motion.div>
  );
}