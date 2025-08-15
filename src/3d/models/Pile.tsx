import React from 'react'
import { Text } from "@react-three/drei"
import Stone from '@/3d/models/Stone'
import type { PileProps } from '@/types/PropTypes/PileProps'
import { calculateStonePositions } from '@/lib/nimGameLogic'

const Pile = ({ stones, pileIndex, position, selectedStones, onStoneClick, removingStones }: PileProps) => {
    // Đảm bảo các giá trị
    const stoneCount = Math.max(0, stones || 0)
    const safePosition: [number, number, number] = position || [0, 0, 0]
    const safeSelectedStones = selectedStones || []
    const safeRemovingStones = removingStones || []

    if (stoneCount === 0) { //khi pile rỗng
        return (
            <group>
                {/* Hiển thị label cho pile rỗng khi nó không có viên đá nào */}
                <Text
                    position={[safePosition[0], safePosition[1] + 1, safePosition[2]]}
                    fontSize={0.4}
                    color="#9ca3af"
                    anchorX="center"
                    anchorY="middle"
                    rotation={[-Math.PI / 6, 0, 0]}

                >
                    {/* {Chuyển Index thành ký tự A, B, C} */}
                    {`Pile ${String.fromCharCode(65 + pileIndex)} (0)`}
                </Text>
            </group>
        )
    }

    const stonePositions = calculateStonePositions(stoneCount, safePosition)

    return ( // khi pile có đá
        //  {gom các object tức là các stone thành 1 nhóm để có thể áp dụng các thuộc tính}
        <group>
            {stonePositions.map((pos, index) => {
                // Logic click: có thể lấy từ cuối hàng (stones cuối cùng theo trục Z)
                const stoneNumber = stoneCount - index // Đánh số từ cuối về đầu
                const isClickable = true // Tất cả stones đều có thể click
                return (
                    <Stone
                        key={`Pile: ${pileIndex}-${index}`}
                        position={pos}
                        onClick={() => {
                            onStoneClick(pileIndex, stoneNumber)
                        }}
                        isSelected={safeSelectedStones.includes(index)}
                        isRemoving={safeRemovingStones.includes(index)}
                        isClickable={isClickable}

                    />
                )
            })}
            <Text
                position={[safePosition[0], safePosition[1] + 1.2, safePosition[2] - 1]}
                fontSize={0.5}
                color="#1f2937"
                anchorX="center"
                anchorY="middle"
                rotation={[-Math.PI / 6, 0, 0]}

            >
                {`Pile ${String.fromCharCode(65 + pileIndex)}`}
            </Text>
            <Text
                position={[safePosition[0], safePosition[1] + 0.7, safePosition[2] - 0.7]}
                fontSize={0.3}
                color="#6b7280"
                anchorX="center"
                anchorY="middle"
                rotation={[-Math.PI / 6, 0, 0]}
            >
                {`${stoneCount} viên`}
            </Text>
            {/* <mesh position={[safePosition[0], safePosition[1] - 0.1, safePosition[2] + (stoneCount * 0.7) / 2]}>
                <boxGeometry args={[0.1, 0.05, stoneCount * 0.7]} />
                <meshStandardMaterial color="#d1d5db" transparent opacity={0.5} />
            </mesh> */}
        </group>
    )
}

export default Pile