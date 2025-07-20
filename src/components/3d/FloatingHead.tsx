import { useRef, useMemo, useState } from 'react'
import { useFrame, useThree } from '@react-three/fiber'
import { useGLTF, Float, MeshDistortMaterial, Sphere } from '@react-three/drei'
import { useSpring, animated } from '@react-spring/three'
import * as THREE from 'three'

// Islamic color palette (matching the environment)
const ISLAMIC_COLORS = {
  primary: '#1e3a5f',
  secondary: '#c9a961',
  accent: '#2c5f2d',
  light: '#f4f4f9',
  turquoise: '#4a9d9c',
  burgundy: '#6d1f2c',
}

export function FloatingHead({ isRotating = true }: { isRotating?: boolean }) {
  const headRef = useRef<THREE.Mesh>(null)
  const groupRef = useRef<THREE.Group>(null)
  const [hovered, setHovered] = useState(false)
  const { viewport } = useThree()
  
  // Try to load the GLB model, with fallback to a stylized sphere
  const gltfResult = useGLTF('/3d/head.glb', true, (error) => {
    console.warn('GLTF model not found, using fallback geometry')
  })

  // Spring animation for hover effect
  const { scale, emissiveIntensity } = useSpring({
    scale: hovered ? 1.1 : 1,
    emissiveIntensity: hovered ? 0.5 : 0.2,
    config: { mass: 1, tension: 280, friction: 60 }
  })

  // Create Islamic geometric halo effect
  const haloGeometry = useMemo(() => {
    const points = []
    const segments = 8
    
    for (let i = 0; i <= segments; i++) {
      const theta = (i / segments) * Math.PI * 2
      const x = Math.cos(theta) * 2
      const y = Math.sin(theta) * 2
      points.push(new THREE.Vector3(x, y, 0))
    }
    
    return points
  }, [])

  useFrame((state) => {
    if (!groupRef.current) return

    // Smooth follow mouse
    const mouseX = state.mouse.x * viewport.width * 0.02
    const mouseY = state.mouse.y * viewport.height * 0.02

    groupRef.current.rotation.y = lerp(
      groupRef.current.rotation.y,
      mouseX,
      0.05
    )
    groupRef.current.rotation.x = lerp(
      groupRef.current.rotation.x,
      -mouseY,
      0.05
    )

    // Gentle floating animation
    if (isRotating) {
      groupRef.current.position.y = Math.sin(state.clock.elapsedTime * 0.5) * 0.3
      groupRef.current.rotation.z = Math.sin(state.clock.elapsedTime * 0.3) * 0.05
    }

    // Animate halo
    if (headRef.current) {
      const halo = headRef.current.parent?.children.find(child => child.name === 'halo')
      if (halo) {
        halo.rotation.z = state.clock.elapsedTime * 0.2
      }
    }
  })

  // Render with GLTF model if available
  if (gltfResult?.nodes?.head) {
    return (
      <Float
        speed={1.5}
        rotationIntensity={0.1}
        floatIntensity={0.5}
        floatingRange={[-0.1, 0.1]}
      >
        <animated.group
          ref={groupRef}
          scale={scale}
          onPointerOver={() => setHovered(true)}
          onPointerOut={() => setHovered(false)}
        >
          {/* Main head mesh */}
          <mesh
            ref={headRef}
            geometry={gltfResult.nodes.head.geometry}
            position={[0, 0, 0]}
            scale={[1, 1, 1]}
            castShadow
            receiveShadow
          >
            <meshPhysicalMaterial
              color={ISLAMIC_COLORS.light}
              metalness={0.3}
              roughness={0.6}
              emissive={ISLAMIC_COLORS.secondary}
              emissiveIntensity={emissiveIntensity}
              clearcoat={0.3}
              clearcoatRoughness={0.4}
            />
          </mesh>

          {/* Islamic geometric halo */}
          <RenderHalo haloGeometry={haloGeometry} />
          
          {/* Orbiting elements */}
          <OrbitingIslamicElements />
        </animated.group>
      </Float>
    )
  }

  // Fallback: Stylized Islamic-themed head representation
  return (
    <Float
      speed={1.5}
      rotationIntensity={0.1}
      floatIntensity={0.5}
      floatingRange={[-0.1, 0.1]}
    >
      <animated.group
        ref={groupRef}
        scale={scale}
        onPointerOver={() => setHovered(true)}
        onPointerOut={() => setHovered(false)}
      >
        {/* Stylized head using sphere with distortion */}
        <Sphere args={[1.5, 64, 64]} position={[0, 0, 0]}>
          <MeshDistortMaterial
            color={ISLAMIC_COLORS.light}
            distort={0.2}
            speed={2}
            metalness={0.3}
            roughness={0.6}
            emissive={ISLAMIC_COLORS.secondary}
            emissiveIntensity={emissiveIntensity}
          />
        </Sphere>

        {/* Face details with Islamic geometric style */}
        <group position={[0, 0, 1.5]}>
          {/* Eyes */}
          <mesh position={[-0.3, 0.2, 0]}>
            <sphereGeometry args={[0.1, 16, 16]} />
            <meshStandardMaterial color={ISLAMIC_COLORS.primary} emissive={ISLAMIC_COLORS.turquoise} emissiveIntensity={0.3} />
          </mesh>
          <mesh position={[0.3, 0.2, 0]}>
            <sphereGeometry args={[0.1, 16, 16]} />
            <meshStandardMaterial color={ISLAMIC_COLORS.primary} emissive={ISLAMIC_COLORS.turquoise} emissiveIntensity={0.3} />
          </mesh>
        </group>

        {/* Islamic geometric halo */}
        <RenderHalo haloGeometry={haloGeometry} />
        
        {/* Orbiting elements */}
        <OrbitingIslamicElements />
      </animated.group>
    </Float>
  )
}

// Halo component
function RenderHalo({ haloGeometry }: { haloGeometry: THREE.Vector3[] }) {
  return (
    <group name="halo" position={[0, 0, -0.5]}>
      {haloGeometry.map((point, index) => (
        <mesh key={index} position={[point.x, point.y, point.z]}>
          <sphereGeometry args={[0.05, 8, 8]} />
          <meshStandardMaterial
            color={ISLAMIC_COLORS.secondary}
            emissive={ISLAMIC_COLORS.secondary}
            emissiveIntensity={1}
          />
        </mesh>
      ))}
      {/* Connecting lines */}
      <lineSegments>
        <edgesGeometry attach="geometry" args={[new THREE.RingGeometry(1.9, 2.1, 8)]} />
        <lineBasicMaterial attach="material" color={ISLAMIC_COLORS.secondary} opacity={0.5} transparent />
      </lineSegments>
    </group>
  )
}

// Orbiting Islamic elements
function OrbitingIslamicElements() {
  const orbitRef = useRef<THREE.Group>(null)
  
  useFrame((state) => {
    if (orbitRef.current) {
      orbitRef.current.rotation.y = state.clock.elapsedTime * 0.3
    }
  })

  return (
    <group ref={orbitRef}>
      {[...Array(4)].map((_, i) => {
        const angle = (i / 4) * Math.PI * 2
        const radius = 2.5
        return (
          <mesh
            key={i}
            position={[
              Math.cos(angle) * radius,
              Math.sin(angle) * 0.5,
              Math.sin(angle) * radius
            ]}
          >
            <octahedronGeometry args={[0.15, 0]} />
            <meshStandardMaterial
              color={i % 2 === 0 ? ISLAMIC_COLORS.turquoise : ISLAMIC_COLORS.accent}
              emissive={i % 2 === 0 ? ISLAMIC_COLORS.turquoise : ISLAMIC_COLORS.accent}
              emissiveIntensity={0.5}
            />
          </mesh>
        )
      })}
    </group>
  )
}

// Helper function for smooth interpolation
function lerp(start: number, end: number, amt: number) {
  return (1 - amt) * start + amt * end
}

// Preload the model (with error handling)
if (typeof window !== 'undefined') {
  useGLTF.preload('/3d/head.glb').catch(() => {
    console.warn('Could not preload head.glb')
  })
}