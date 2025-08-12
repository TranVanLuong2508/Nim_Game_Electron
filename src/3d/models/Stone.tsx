import type { StoneProps } from '@/types/PropTypes/StoneProps'
import { useRef, useState } from 'react'
import { useFrame } from "@react-three/fiber"
import * as THREE from "three"
import StoneColor from '@/constants/StoneColor'
import type { ThreeEvent } from "@react-three/fiber"

const Stone = ({ position, onClick, isSelected, isRemoving, isClickable = true }: StoneProps) => {
    const meshRef = useRef<THREE.Mesh>(null)
    const [isHover, setIsHover] = useState(false)

    const handlePointerOver = () => {
        if (isClickable) {
            setIsHover(true)
            document.body.style.cursor = 'pointer'
        }
    }

    const handlePointerGoOut = () => {
        setIsHover(false)
        document.body.style.cursor = 'default'
    }
    useFrame((state) => {
        if (meshRef.current) {
            if (isRemoving) {
                meshRef.current.position.y += 0.15 // di chuyển lên theo trục y
                //xoay quanh trục x và trục z
                meshRef.current.rotation.x += 0.1
                meshRef.current.rotation.z += 0.05
                //thu nhỏ dần đều đến khi biến mất
                meshRef.current.scale.setScalar(Math.max(0, meshRef.current.scale.x - 0.03))
            } else if (isHover && isClickable) {
                //dao động nhẹ theo chiều cao
                meshRef.current.position.y = position[1] + Math.sin(state.clock.elapsedTime * 4) * 0.1 + 0.3
                //phóng to 1.3
                meshRef.current.scale.setScalar(1.3)
                // Thêm hiệu ứng xoay nhẹ khi hover
                meshRef.current.rotation.y = state.clock.elapsedTime * 2
            } else if (isSelected) {
                //nỏi lên và phóng to 1.2
                meshRef.current.position.y = position[1] + 0.4
                meshRef.current.scale.setScalar(1.2)
            } else {
                //chuyển động về trạng thái ban đầu ( không có sự kiên gì tác đông lên nó)
                meshRef.current.position.y = THREE.MathUtils.lerp(meshRef.current.position.y, position[1], 0.05)
                meshRef.current.scale.setScalar(THREE.MathUtils.lerp(meshRef.current.scale.x, 1, 0.05))
                meshRef.current.rotation.y = THREE.MathUtils.lerp(meshRef.current.rotation.y, 0, 0.05)
            }
        }
    })

    return (
        <mesh
            ref={meshRef}
            position={position}
            castShadow
            receiveShadow
            onPointerOver={() => handlePointerOver()}
            onPointerOut={() => handlePointerGoOut()}
            // onClick={() => {
            //     if (isClickable && onClick) {
            //         onClick()
            //     }
            // }}
            onContextMenu={(event: ThreeEvent<MouseEvent>) => {
                event.stopPropagation()
                if (isClickable && onClick) {
                    onClick()
                }
                // console.log("chk clckck", event.clientX, event.clientY)
            }}
        >
            <dodecahedronGeometry args={[0.25]} />
            <meshStandardMaterial
                color={
                    isRemoving ? StoneColor.remove
                        : isSelected ? StoneColor.select
                            : isHover && isClickable ? StoneColor.hover
                                : isClickable ? StoneColor.click : StoneColor.noneClick
                }
                roughness={0.2}
                metalness={0.8}
                emissive={isRemoving ? "#dc2626" : isSelected ? "#f59e0b" : isHover && isClickable ? "#3b82f6" : "#000000"}
                emissiveIntensity={isRemoving ? 0.4 : isSelected ? 0.3 : isHover && isClickable ? 0.3 : 0}
            />
        </mesh>
    )
}

export default Stone