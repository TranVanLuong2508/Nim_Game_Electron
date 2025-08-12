import { useFrame } from '@react-three/fiber'
import { useRef } from 'react'
import type * as THREE from "three"
import { Text } from "@react-three/drei"


interface TurnIndicatorProp {
    position: [number, number, number]
    isActive: boolean
    color: "blue" | "red"
    playerName: string
}

const TurnIndicator = ({ position, isActive, color, playerName }: TurnIndicatorProp) => {

    const meshRef = useRef<THREE.Mesh>(null)

    useFrame((state) => {
        if (meshRef.current && isActive) {
            meshRef.current.position.y = position[1] + Math.sin(state.clock.elapsedTime * 2) * 0.1
        }
    })
    const activeColor = color === "blue" ? "#3b82f6" : "#ef4444"
    const inactiveColor = "#374151"
    return (
        <group>
            <mesh ref={meshRef} position={position} >
                <cylinderGeometry args={[0.8, 0.8, 0.3, 32]} />
                <meshStandardMaterial
                    color={isActive ? activeColor : inactiveColor}
                    emissive={isActive ? activeColor : "#000000"}
                    emissiveIntensity={isActive ? 0.3 : 0}
                    roughness={0.3}
                    metalness={0.7}
                />
            </mesh>
            <Text
                position={[position[0], position[1] + 1.2, position[2]]}
                fontSize={0.4}
                color={isActive ? (color === "blue" ? "#3b82f6" : "#ef4444") : "#1f2937"}
                anchorX="center"
                anchorY="middle"
                rotation={position[0] > 0 ? [0, -Math.PI / 8, 0] : [0, Math.PI / 8, 0]}


            >
                {playerName}
            </Text>
        </group>
    )
}

export default TurnIndicator