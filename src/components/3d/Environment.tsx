'use client';
import { Suspense, useRef, useMemo, useState, useEffect } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import {
  Environment as EnvironmentImpl,
  OrbitControls,
  Float,
  Sphere,
  MeshDistortMaterial,
  Stars,
  Text3D,
  Center,
  MeshWobbleMaterial,
  Html,
  useTexture,
  Icosahedron,
  Box,
  Torus,
  Cone,
  Octahedron,
} from '@react-three/drei'
import { EffectComposer, Bloom, ChromaticAberration, Vignette } from '@react-three/postprocessing'
import * as THREE from 'three'
import { useSpring, animated } from '@react-spring/three'

// Islamic color palette
const ISLAMIC_COLORS = {
  primary: '#1e3a5f',    // Deep blue
  secondary: '#c9a961',  // Gold
  accent: '#2c5f2d',     // Islamic green
  light: '#f4f4f9',      // Off white
  turquoise: '#4a9d9c',  // Turquoise
  burgundy: '#6d1f2c',   // Deep red
}

// Performance optimization: Reduce particle count based on device
const getParticleCount = () => {
  if (typeof window !== 'undefined') {
    const isMobile = window.innerWidth < 768;
    return isMobile ? 500 : 1500;
  }
  return 1000;
}

export function Environment() {
  const [isLoaded, setIsLoaded] = useState(false);
  const [quality, setQuality] = useState('medium');

  useEffect(() => {
    // Detect device performance
    const checkPerformance = () => {
      const isMobile = window.innerWidth < 768;
      const isLowEnd = navigator.hardwareConcurrency < 4;
      
      if (isMobile || isLowEnd) {
        setQuality('low');
      } else if (navigator.hardwareConcurrency >= 8) {
        setQuality('high');
      }
    };

    checkPerformance();
    const timer = setTimeout(() => setIsLoaded(true), 500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="fixed inset-0 -z-10">
      <Canvas
        camera={{ position: [0, 0, 20], fov: 45 }}
        gl={{ 
          antialias: quality !== 'low', 
          alpha: true,
          powerPreference: quality === 'low' ? "low-power" : "high-performance",
          preserveDrawingBuffer: true,
        }}
        dpr={quality === 'low' ? 1 : [1, 2]}
        shadows={quality === 'high'}
      >
        <Suspense fallback={null}>
          {/* Islamic-inspired Lighting */}
          <ambientLight intensity={0.2} color={ISLAMIC_COLORS.light} />
          <directionalLight 
            position={[10, 10, 5]} 
            intensity={0.6} 
            color={ISLAMIC_COLORS.secondary}
            castShadow={quality === 'high'}
          />
          <pointLight position={[-10, -10, -10]} color={ISLAMIC_COLORS.primary} intensity={0.4} />
          <pointLight position={[10, 10, 10]} color={ISLAMIC_COLORS.accent} intensity={0.3} />
          
          {/* Main Islamic Geometric Elements */}
          <IslamicGeometricPattern />
          
          {/* Floating Islamic Elements */}
          <FloatingIslamicElements />
          
          {/* Interactive Particles with Islamic colors */}
          <InteractiveParticles quality={quality} />
          
          {/* Islamic Calligraphy or Text */}
          <IslamicTextElements />
          
          {/* Animated Islamic Patterns */}
          <AnimatedIslamicRings />

          {/* Subtle Stars */}
          <Stars
            radius={100}
            depth={50}
            count={quality === 'low' ? 1000 : 3000}
            factor={4}
            saturation={0}
            fade
            speed={0.2}
          />

          {/* Environment */}
          <EnvironmentImpl preset="dawn" />

          {/* Controls */}
          <OrbitControls
            enableZoom={false}
            enablePan={false}
            autoRotate={true}
            autoRotateSpeed={0.15}
            maxPolarAngle={Math.PI / 1.8}
            minPolarAngle={Math.PI / 3}
            enableDamping
            dampingFactor={0.05}
          />

          {/* Post-processing - only on high quality */}
          {quality !== 'low' && (
            <EffectComposer>
              <Bloom 
                intensity={0.3} 
                luminanceThreshold={0.9} 
                luminanceSmoothing={0.9} 
              />
              <Vignette eskil={false} offset={0.1} darkness={0.3} />
            </EffectComposer>
          )}
        </Suspense>
      </Canvas>

      {/* Loading indicator with Islamic style */}
      {!isLoaded && (
        <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-[#1e3a5f]/90 to-[#2c5f2d]/90 backdrop-blur-sm z-10">
          <div className="text-center">
            <div className="text-[#c9a961] text-lg font-serif mb-2">
              بِسْمِ اللَّهِ
            </div>
            <div className="text-[#f4f4f9] text-sm">
              Loading Portfolio...
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
// Islamic Geometric Pattern - Main centerpiece
function IslamicGeometricPattern() {
  const groupRef = useRef<THREE.Group>(null);
  const [hovered, setHovered] = useState(false);

  const { scale } = useSpring({
    scale: hovered ? 1.1 : 1,
    config: { mass: 1, tension: 280, friction: 60 }
  });

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.z = state.clock.elapsedTime * 0.1;
    }
  });

  // Create 8-pointed star geometry
  const starShape = useMemo(() => {
    const shape = new THREE.Shape();
    const outerRadius = 2;
    const innerRadius = 0.8;
    const spikes = 8;

    for (let i = 0; i < spikes * 2; i++) {
      const angle = (i / (spikes * 2)) * Math.PI * 2;
      const radius = i % 2 === 0 ? outerRadius : innerRadius;
      const x = Math.cos(angle) * radius;
      const y = Math.sin(angle) * radius;
      
      if (i === 0) {
        shape.moveTo(x, y);
      } else {
        shape.lineTo(x, y);
      }
    }
    shape.closePath();
    return shape;
  }, []);

  return (
    <animated.group 
      ref={groupRef} 
      scale={scale}
      onPointerOver={() => setHovered(true)}
      onPointerOut={() => setHovered(false)}
    >
      {/* Central 8-pointed star */}
      <mesh position={[0, 0, 0]}>
        <extrudeGeometry args={[starShape, { depth: 0.5, bevelEnabled: true, bevelThickness: 0.1 }]} />
        <meshPhysicalMaterial
          color={ISLAMIC_COLORS.secondary}
          metalness={0.8}
          roughness={0.2}
          emissive={ISLAMIC_COLORS.secondary}
          emissiveIntensity={0.2}
        />
      </mesh>

      {/* Surrounding geometric pattern */}
      {[...Array(6)].map((_, i) => {
        const angle = (i / 6) * Math.PI * 2;
        const x = Math.cos(angle) * 4;
        const y = Math.sin(angle) * 4;
        
        return (
          <mesh key={i} position={[x, y, 0]} rotation={[0, 0, angle]}>
            <octahedronGeometry args={[0.8, 0]} />
            <meshStandardMaterial
              color={i % 2 === 0 ? ISLAMIC_COLORS.turquoise : ISLAMIC_COLORS.accent}
              metalness={0.6}
              roughness={0.3}
            />
          </mesh>
        );
      })}
    </animated.group>
  );
}

// Floating Islamic Elements
function FloatingIslamicElements() {
  const elements = useMemo(() => [
    { text: 'الله', position: [-8, 3, -5] },
    { text: 'الرحمن', position: [8, -2, -5] },
    { text: 'الرحيم', position: [-6, -4, -3] },
    { text: 'النور', position: [6, 4, -4] },
    { text: 'السلام', position: [0, -5, -6] },
  ], []);

  return (
    <>
      {elements.map((element, index) => (
        <Float
          key={index}
          speed={1.5}
          rotationIntensity={0.2}
          floatIntensity={0.5}
          floatingRange={[-0.5, 0.5]}
        >
          <Html
            position={element.position}
            center
            style={{
              fontSize: '24px',
              color: ISLAMIC_COLORS.secondary,
              fontFamily: 'serif',
              fontWeight: 'bold',
              textShadow: `0 0 20px ${ISLAMIC_COLORS.secondary}50`,
              userSelect: 'none',
              whiteSpace: 'nowrap',
            }}
          >
            {element.text}
          </Html>
        </Float>
      ))}

      {/* Floating geometric shapes */}
      {[...Array(5)].map((_, i) => (
        <Float
          key={`shape-${i}`}
          speed={2 + i * 0.3}
          rotationIntensity={0.3}
          floatIntensity={0.4}
        >
          <mesh
            position={[
              (Math.random() - 0.5) * 15,
              (Math.random() - 0.5) * 10,
              (Math.random() - 0.5) * 8
            ]}
          >
            <icosahedronGeometry args={[0.5, 0]} />
            <meshStandardMaterial
              color={i % 2 === 0 ? ISLAMIC_COLORS.turquoise : ISLAMIC_COLORS.burgundy}
              metalness={0.7}
              roughness={0.3}
              transparent
              opacity={0.8}
            />
          </mesh>
        </Float>
      ))}
    </>
  );
}

// Interactive Particles with Islamic colors
function InteractiveParticles({ quality }: { quality: string }) {
  const particlesRef = useRef<THREE.Points>(null);
  const mouse = useRef({ x: 0, y: 0 });
  const { viewport } = useThree();

  const particleCount = quality === 'low' ? 500 : quality === 'medium' ? 1000 : 1500;

  const [positions, colors] = useMemo(() => {
    const pos = new Float32Array(particleCount * 3);
    const col = new Float32Array(particleCount * 3);
    
    const colorPalette = [
      new THREE.Color(ISLAMIC_COLORS.secondary),
      new THREE.Color(ISLAMIC_COLORS.turquoise),
      new THREE.Color(ISLAMIC_COLORS.accent),
    ];

    for (let i = 0; i < particleCount; i++) {
      // Create particles in a sphere formation
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(Math.random() * 2 - 1);
      const radius = 15 + Math.random() * 15;

      pos[i * 3] = radius * Math.sin(phi) * Math.cos(theta);
      pos[i * 3 + 1] = radius * Math.sin(phi) * Math.sin(theta);
      pos[i * 3 + 2] = radius * Math.cos(phi);

      // Assign colors from Islamic palette
      const color = colorPalette[Math.floor(Math.random() * colorPalette.length)];
      col[i * 3] = color.r;
      col[i * 3 + 1] = color.g;
      col[i * 3 + 2] = color.b;
    }

    return [pos, col];
  }, [particleCount]);

  useEffect(() => {
    const handleMouseMove = (event: MouseEvent) => {
      mouse.current.x = (event.clientX / window.innerWidth) * 2 - 1;
      mouse.current.y = -(event.clientY / window.innerHeight) * 2 + 1;
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  useFrame((state) => {
    if (particlesRef.current && quality !== 'low') {
      const positions = particlesRef.current.geometry.attributes.position.array as Float32Array;
      
      for (let i = 0; i < particleCount; i++) {
        const i3 = i * 3;
        const x = positions[i3];
        const y = positions[i3 + 1];
        
        // Gentle wave effect
        positions[i3 + 1] = y + Math.sin(state.clock.elapsedTime * 0.5 + x * 0.01) * 0.02;
      }
      
      particlesRef.current.geometry.attributes.position.needsUpdate = true;
      particlesRef.current.rotation.y = state.clock.elapsedTime * 0.05;
    }
  });

  return (
    <points ref={particlesRef}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" count={particleCount} array={positions} itemSize={3} />
        <bufferAttribute attach="attributes-color" count={particleCount} array={colors} itemSize={3} />
      </bufferGeometry>
      <pointsMaterial
        size={quality === 'low' ? 0.1 : 0.05}
        vertexColors
        sizeAttenuation={true}
        transparent={true}
        opacity={0.6}
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
}

// Islamic Calligraphy or Text Elements
function IslamicTextElements() {
  const textRef = useRef<THREE.Group>(null);
  
  const islamicPhrases = useMemo(() => [
    { text: 'بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ', translation: 'In the name of Allah' },
    { text: 'ما شاء الله', translation: 'As Allah wills' },
    { text: 'الحمد لله', translation: 'Praise be to Allah' },
  ], []);

  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % islamicPhrases.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [islamicPhrases.length]);

  useFrame((state) => {
    if (textRef.current) {
      textRef.current.position.y = Math.sin(state.clock.elapsedTime * 0.5) * 0.3;
    }
  });

  const { opacity } = useSpring({
    opacity: 1,
    from: { opacity: 0 },
    reset: true,
    config: { duration: 1000 }
  });

  return (
    <group ref={textRef} position={[0, -8, 0]}>
      <Html center transform>
        <animated.div
          style={{
            opacity,
            textAlign: 'center',
            pointerEvents: 'none',
          }}
        >
          <div
            style={{
              fontSize: '32px',
              color: ISLAMIC_COLORS.secondary,
              fontFamily: 'serif',
              marginBottom: '8px',
              textShadow: `0 0 30px ${ISLAMIC_COLORS.secondary}80`,
            }}
          >
            {islamicPhrases[currentIndex].text}
          </div>
          <div
            style={{
              fontSize: '14px',
              color: ISLAMIC_COLORS.light,
              fontFamily: 'sans-serif',
              opacity: 0.8,
            }}
          >
            {islamicPhrases[currentIndex].translation}
          </div>
        </animated.div>
      </Html>
    </group>
  );
}

// Animated Islamic Rings/Patterns
function AnimatedIslamicRings() {
  const ringsRef = useRef<THREE.Group>(null);
  
  useFrame((state) => {
    if (ringsRef.current) {
      ringsRef.current.rotation.y = state.clock.elapsedTime * 0.08;
      
      // Animate individual rings
      ringsRef.current.children.forEach((child, index) => {
        child.rotation.z = state.clock.elapsedTime * (0.1 + index * 0.02) * (index % 2 === 0 ? 1 : -1);
      });
    }
  });

  // Create Islamic pattern for the rings
  const createIslamicPattern = (radius: number) => {
    const points = [];
    const segments = 16;
    
    for (let i = 0; i <= segments; i++) {
      const theta = (i / segments) * Math.PI * 2;
      const r = radius + Math.sin(theta * 8) * 0.1;
      points.push(new THREE.Vector3(
        r * Math.cos(theta),
        0,
        r * Math.sin(theta)
      ));
    }
    
    return new THREE.CatmullRomCurve3(points, true);
  };

  return (
    <group ref={ringsRef}>
      {[4, 6, 8].map((radius, i) => (
        <mesh key={i} rotation={[Math.PI / 2, 0, 0]}>
          <tubeGeometry args={[createIslamicPattern(radius), 64, 0.1, 8, true]} />
          <meshPhysicalMaterial
            color={i === 1 ? ISLAMIC_COLORS.secondary : ISLAMIC_COLORS.turquoise}
            metalness={0.9}
            roughness={0.1}
            emissive={i === 1 ? ISLAMIC_COLORS.secondary : ISLAMIC_COLORS.turquoise}
            emissiveIntensity={0.1}
            transparent
            opacity={0.7}
          />
        </mesh>
      ))}
      
      {/* Add decorative elements */}
      {[...Array(8)].map((_, i) => {
        const angle = (i / 8) * Math.PI * 2;
        return (
          <mesh
            key={`decor-${i}`}
            position={[Math.cos(angle) * 10, 0, Math.sin(angle) * 10]}
          >
            <sphereGeometry args={[0.2, 16, 16]} />
            <meshStandardMaterial
              color={ISLAMIC_COLORS.secondary}
              emissive={ISLAMIC_COLORS.secondary}
              emissiveIntensity={0.5}
            />
          </mesh>
        );
      })}
    </group>
  );
}

export default Environment;