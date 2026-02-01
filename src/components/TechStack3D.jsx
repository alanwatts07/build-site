import { useRef, useMemo } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Text, OrbitControls } from '@react-three/drei'
import * as THREE from 'three'

const techStack = [
  { name: 'React', color: '#61DAFB', size: 1.2 },
  { name: 'Python', color: '#3776AB', size: 1.2 },
  { name: 'TypeScript', color: '#3178C6', size: 1.1 },
  { name: 'Next.js', color: '#ffffff', size: 1.0 },
  { name: 'Claude API', color: '#D97706', size: 1.1 },
  { name: 'FastAPI', color: '#009688', size: 0.9 },
  { name: 'PostgreSQL', color: '#336791', size: 0.9 },
  { name: 'TailwindCSS', color: '#38BDF8', size: 0.9 },
  { name: 'Git', color: '#F05032', size: 0.8 },
  { name: 'Docker', color: '#2496ED', size: 0.8 },
  { name: 'WebSocket', color: '#FF6B6B', size: 0.8 },
  { name: 'XGBoost', color: '#FF9F43', size: 0.9 },
  { name: 'NLP', color: '#A78BFA', size: 1.0 },
  { name: 'Deep Learning', color: '#F472B6', size: 1.0 },
  { name: 'REST APIs', color: '#10B981', size: 0.9 },
  { name: 'Linux', color: '#FCC624', size: 0.8 },
]

function TechNode({ tech, position, index }) {
  const meshRef = useRef()
  const textRef = useRef()
  const initialPos = useMemo(() => position, [])

  useFrame((state) => {
    const time = state.clock.elapsedTime
    // Gentle floating motion
    meshRef.current.position.x = initialPos[0] + Math.sin(time * 0.5 + index) * 0.3
    meshRef.current.position.y = initialPos[1] + Math.cos(time * 0.4 + index * 0.5) * 0.2
    meshRef.current.position.z = initialPos[2] + Math.sin(time * 0.3 + index * 0.7) * 0.3

    // Always face camera
    if (textRef.current) {
      textRef.current.lookAt(state.camera.position)
    }
  })

  return (
    <group ref={meshRef} position={position}>
      {/* Glowing sphere */}
      <mesh>
        <sphereGeometry args={[0.15 * tech.size, 16, 16]} />
        <meshBasicMaterial color={tech.color} transparent opacity={0.6} />
      </mesh>
      {/* Outer glow */}
      <mesh>
        <sphereGeometry args={[0.25 * tech.size, 16, 16]} />
        <meshBasicMaterial color={tech.color} transparent opacity={0.15} />
      </mesh>
      {/* Tech name */}
      <Text
        ref={textRef}
        position={[0, 0.4 * tech.size, 0]}
        fontSize={0.2 * tech.size}
        color={tech.color}
        anchorX="center"
        anchorY="middle"
      >
        {tech.name}
      </Text>
    </group>
  )
}

function TechCloud() {
  const groupRef = useRef()

  // Distribute points on a sphere using fibonacci spiral
  const positions = useMemo(() => {
    const points = []
    const phi = Math.PI * (3 - Math.sqrt(5)) // golden angle

    for (let i = 0; i < techStack.length; i++) {
      const y = 1 - (i / (techStack.length - 1)) * 2 // y goes from 1 to -1
      const radius = Math.sqrt(1 - y * y) // radius at y
      const theta = phi * i // golden angle increment

      const x = Math.cos(theta) * radius * 3
      const z = Math.sin(theta) * radius * 3
      points.push([x, y * 2, z])
    }
    return points
  }, [])

  useFrame((state) => {
    // Slow rotation of entire cloud
    groupRef.current.rotation.y = state.clock.elapsedTime * 0.05
  })

  return (
    <group ref={groupRef}>
      {techStack.map((tech, i) => (
        <TechNode
          key={tech.name}
          tech={tech}
          position={positions[i]}
          index={i}
        />
      ))}
      {/* Center core */}
      <mesh>
        <sphereGeometry args={[0.5, 32, 32]} />
        <meshBasicMaterial color="#6366f1" transparent opacity={0.2} />
      </mesh>
      <mesh>
        <sphereGeometry args={[0.3, 32, 32]} />
        <meshBasicMaterial color="#6366f1" transparent opacity={0.4} />
      </mesh>
    </group>
  )
}

function ConnectionLines() {
  const linesRef = useRef()

  const lineGeometry = useMemo(() => {
    const points = []
    // Create some random connections
    for (let i = 0; i < 20; i++) {
      const theta1 = Math.random() * Math.PI * 2
      const phi1 = Math.random() * Math.PI
      const theta2 = Math.random() * Math.PI * 2
      const phi2 = Math.random() * Math.PI

      const r = 2.5
      points.push(
        new THREE.Vector3(
          r * Math.sin(phi1) * Math.cos(theta1),
          r * Math.cos(phi1),
          r * Math.sin(phi1) * Math.sin(theta1)
        ),
        new THREE.Vector3(
          r * Math.sin(phi2) * Math.cos(theta2),
          r * Math.cos(phi2),
          r * Math.sin(phi2) * Math.sin(theta2)
        )
      )
    }
    return new THREE.BufferGeometry().setFromPoints(points)
  }, [])

  useFrame((state) => {
    linesRef.current.rotation.y = state.clock.elapsedTime * 0.03
    linesRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.02) * 0.1
  })

  return (
    <lineSegments ref={linesRef} geometry={lineGeometry}>
      <lineBasicMaterial color="#6366f1" transparent opacity={0.1} />
    </lineSegments>
  )
}

export default function TechStack3D() {
  return (
    <div className="w-full h-[500px] relative">
      <Canvas
        camera={{ position: [0, 0, 8], fov: 60 }}
        style={{ background: 'transparent' }}
      >
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} />
        <TechCloud />
        <ConnectionLines />
        <OrbitControls
          enableZoom={false}
          enablePan={false}
          autoRotate
          autoRotateSpeed={0.5}
          minPolarAngle={Math.PI / 4}
          maxPolarAngle={Math.PI * 3 / 4}
        />
      </Canvas>

      {/* Overlay gradient for blending */}
      <div className="absolute inset-0 pointer-events-none bg-gradient-to-b from-transparent via-transparent to-[#0a0a0f]" />

      {/* Instructions */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 text-xs text-gray-500">
        drag to rotate • scroll to explore
      </div>
    </div>
  )
}
