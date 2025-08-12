import { useState } from "react"
import NimGame3D from "@/3d/scenes/NimGame3D"
import { useGameSettings } from "@/hooks/useGameSettings"
import type { GameMode } from "@/types/commonType"
import type { SavedGame } from "@/types/savedGame"
import HomePage from "@/containers/Home/HomePage"
type AppState = "home" | "game"

export default function Page() {
    const [appState, setAppState] = useState<AppState>("home")
    const [selectedMode, setSelectedMode] = useState<GameMode>("PVE")

    const [loadedGame, setLoadedGame] = useState<SavedGame | undefined>()
    const { settings, updatePVESettings, updatePVPSettings } = useGameSettings()

    const handleSelectMode = (mode: GameMode) => {
        setSelectedMode(mode)
        setLoadedGame(undefined)
    }

    const handleStartGame = () => {
        setAppState("game")
    }

    const handleLoadGame = (savedGame: SavedGame) => {
        setSelectedMode(savedGame.gameState.mode)
        setLoadedGame(savedGame)
        setAppState("game")
    }

    const handleExitGame = () => {
        setLoadedGame(undefined)
        setAppState("home")
    }

    // const handleBackToMenu = () => {
    //     setAppState("menu")
    // }

    // const handleOpenSettings = () => {
    //     setAppState("settings")
    // }

    // const handleOpenSavedGames = () => {
    //     setAppState("saved-games")
    // }
    // console.log('check settings', settings)

    switch (appState) {
        case "home":
            return (
                <HomePage
                    onSelectMode={handleSelectMode}
                    mode={selectedMode}
                    onStartGame={handleStartGame}
                    onLoadGame={handleLoadGame}
                    updatePVESettings={updatePVESettings}
                    updatePVPSettings={updatePVPSettings}
                    settings={settings}
                />
            )
        case "game":
            return <NimGame3D mode={selectedMode} settings={settings} onExitGame={handleExitGame} savedGame={loadedGame} />

        default:
            return null
    }
}
