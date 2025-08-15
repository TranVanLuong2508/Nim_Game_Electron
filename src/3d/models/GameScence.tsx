import { OrbitControls, Sky, Environment } from "@react-three/drei"
import Pile from '@/3d/models/Pile'
import type { StoneSelection, GameSettings } from '@/types/settings'
import type { GameState } from '@/types/gameState'
import TurnIndicators from '@/3d/models/TurnIndicators'

interface GameScenceProps {
    piles: number[]
    selectedStones: StoneSelection
    onStoneClick: (pileIndex: number, stoneIndex: number) => void
    removingStones: StoneSelection
    gameState: GameState
    settings: GameSettings
    resetGame: () => void
}

const GameScence = ({
    piles,
    selectedStones,
    onStoneClick,
    removingStones,
    gameState,
    settings,
}: GameScenceProps) => {

    const safePiles = Array.isArray(piles) ? piles : []

    //vị trí của pile
    const getPilePosition = (index: number): [number, number, number] => {
        const spacing = 2 // Khoảng cách giữa các pile (cột)
        const totalPiles = safePiles.length
        const startX = -((totalPiles - 1) * spacing) / 2 // Căn giữa tất cả các pile lùi lại để mảng pile nằm giữa trục tọa độ

        return [startX + index * spacing, 0, -2] // Z = -2 để bắt đầu từ phía trước
    }
    return (
        <>
            <Sky sunPosition={[100, 20, 100]} />
            {/* {tạo mặt trời với preset là bình minh} */}
            <Environment preset='dawn' />
            <ambientLight intensity={0.6} />
            <directionalLight
                position={[10, 10, 5]}
                intensity={1.2}
                castShadow
                shadow-mapSize-width={2048}
                shadow-mapSize-height={2048}
                shadow-camera-far={50}
                shadow-camera-left={-15}
                shadow-camera-right={15}
                shadow-camera-top={15}
                shadow-camera-bottom={-15}
            />
            {/* Bàn chơi game, chứa các pile */}
            <mesh rotation={[- Math.PI / 2, 0, 0]} position={[0, -0.5, 0]} receiveShadow >
                <planeGeometry args={[25, 30]} />
                <meshStandardMaterial color="#f8fafc" roughness={0.8} />
            </mesh >

            <TurnIndicators gameState={gameState} settings={settings} />

            {/* Piles */}
            {safePiles.map((stones, index) => {
                const position = getPilePosition(index)
                const stones_safe = Math.max(0, stones || 0)

                return (
                    <Pile
                        key={index}
                        stones={stones_safe}
                        pileIndex={index}
                        position={position}
                        selectedStones={selectedStones?.[index] || []}
                        onStoneClick={onStoneClick}
                        removingStones={removingStones?.[index] || []}
                    />
                )
            })}

            <OrbitControls
                enablePan={true}
                enableZoom={true}
                enableRotate={true}
                minDistance={10}
                maxDistance={30}
                maxPolarAngle={Math.PI / 2}
            />
        </>
    )
}

export default GameScence