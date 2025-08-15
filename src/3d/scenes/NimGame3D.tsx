import { Canvas } from "@react-three/fiber"

import GameScence from '@/3d/models/GameScence'
import type { GameMode } from '@/types/commonType'
import type { GameSettings } from '@/types/settings'
import type { SavedGame } from '@/types/savedGame'
import { useNimGame } from '@/hooks/useNimGame'
import { exportGameToFile } from '@/lib/storage'
import GameHud from '@/components/game/GameHUD'

interface NimGame3DProps {
    mode: GameMode
    settings: GameSettings
    onExitGame: () => void
    savedGame?: SavedGame
}
const NimGame3D = ({ mode, settings, onExitGame, savedGame }: NimGame3DProps) => {

    const { gameState, selectedStones, removingStones, handleStoneClick,
        saveCurrentGame, loadGame, resetGame, hintMove, makePlayerMoveAutomatically, hintCount, allHintCounts, markHintAsUsed, canUseHint }
        = useNimGame(mode, settings)

    if (savedGame && gameState.id !== savedGame.gameState.id) {
        loadGame(savedGame)
    }

    const handleExportGame = () => {
        const currentSavedGame: SavedGame = {
            gameState,
            settings,
            selectedStones,
        }
        exportGameToFile(currentSavedGame)
    }

    console.log('check hint count : ', hintCount)
    return (
        <div className="w-full h-screen bg-gradient-to-b from-sky-200 to-blue-100 relative">
            {/* 3D Canvas - điều chỉnh camera cho view hàng dọc */}
            <Canvas shadows camera={{ position: [0, 12, 8], fov: 60 }} className="w-full h-full">
                <GameScence
                    piles={gameState.piles}
                    selectedStones={selectedStones}
                    onStoneClick={handleStoneClick}
                    removingStones={removingStones}
                    gameState={gameState}
                    settings={settings}
                    resetGame={resetGame}
                />
            </Canvas>

            {/* Game HUD Overlay */}
            <GameHud
                onPlayerTimeout={makePlayerMoveAutomatically}
                hintMove={hintMove}
                gameState={gameState}
                settings={settings}
                onSaveGame={saveCurrentGame}
                onResetGame={resetGame}
                onExitGame={onExitGame}
                onExportGame={handleExportGame}
                allHintCounts={allHintCounts}
                hintCount={hintCount}
                markHintAsUsed={markHintAsUsed}
                canUseHint={canUseHint}
            // Truyền số lượt gợi ý còn lại
            />
        </div>
    )
}

export default NimGame3D