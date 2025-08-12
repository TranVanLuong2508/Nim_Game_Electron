import type { GameSettings } from "@/types/settings";
import type { SavedGame } from "@/types/savedGame";
import { getRandomPiles } from "@/lib/random";
import Level from "@/constants/Level";
const STORAGE_KEYS = {
    SETTINGS: "nim-game-settings",
    SAVED_GAMES: "nim-saved-games",
    CURRENT_GAME: "nim-current-game",
} as const // constant, no change


//set default value for default settings
export const defaultSettings: GameSettings = {
    pve: {
        difficulty: "easy",
        playerGoesFirst: true,
        randomPiles: getRandomPiles(Level.easy.value)
    },
    pvp: {
        player1Name: "Player 1",
        player2Name: "Player 2",
        customPiles: getRandomPiles(Level.medium.value),
        player1GoesFirst: true
    },
}


// convert settings to JSON String and save in localStorgae
export const saveSettings = (settings: GameSettings): void => {
    if (typeof window !== "undefined") {
        localStorage.setItem(STORAGE_KEYS.SETTINGS, JSON.stringify(settings))
    }
}


//read Settings from localStorage
export const loadSettings = (): GameSettings => {
    if (typeof window === "undefined") return defaultSettings

    try {
        const stored = localStorage.getItem(STORAGE_KEYS.SETTINGS)
        return stored ? { ...defaultSettings, ...JSON.parse(stored) } : defaultSettings
    } catch {
        return defaultSettings
    }
}


//save game - json list
export const saveGame = (savedGame: SavedGame): void => {
    if (typeof window === "undefined") return

    try {
        const existingGames = loadSavedGames()
        const updatedGames = existingGames.filter((game) => game.gameState.id !== savedGame.gameState.id)
        updatedGames.push(savedGame)

        localStorage.setItem(STORAGE_KEYS.SAVED_GAMES, JSON.stringify(updatedGames))
    } catch (error) {
        console.error("Failed to save game:", error)
    }
}


//load all saved game
export const loadSavedGames = (): SavedGame[] => {
    if (typeof window === "undefined") return []

    try {
        const stored = localStorage.getItem(STORAGE_KEYS.SAVED_GAMES)
        return stored ? JSON.parse(stored) : []
    } catch {
        return []
    }
}


// delete one game by Id
export const deleteSavedGame = (gameId: string): void => {
    if (typeof window === "undefined") return

    try {
        const existingGames = loadSavedGames()
        const updatedGames = existingGames.filter((game) => game.gameState.id !== gameId)
        localStorage.setItem(STORAGE_KEYS.SAVED_GAMES, JSON.stringify(updatedGames))
    } catch (error) {
        console.error("Failed to delete game:", error)
    }
}


//export game to JSON file
export const exportGameToFile = (savedGame: SavedGame): void => {
    try {
        const dataStr = JSON.stringify(savedGame, null, 2)
        const dataBlob = new Blob([dataStr], { type: "application/json" })
        const url = URL.createObjectURL(dataBlob)

        const link = document.createElement("a")
        link.href = url
        link.download = `nim-game-${savedGame.gameState.id}.json`
        document.body.appendChild(link)
        link.click()
        document.body.removeChild(link)

        URL.revokeObjectURL(url)
    } catch (error) {
        console.error("Failed to export game:", error)
    }
}


//import game by JSON file
export const importGameFromFile = (file: File): Promise<SavedGame> => {
    return new Promise((resolve, reject) => {
        const reader = new FileReader()

        reader.onload = (event) => {
            try {
                const result = event.target?.result as string
                const savedGame = JSON.parse(result) as SavedGame
                resolve(savedGame)
            } catch (error) {
                console.log('check error', error)
                reject(new Error("Invalid file format"))
            }
        }

        reader.onerror = () => reject(new Error("Failed to read file"))
        reader.readAsText(file)
    })
}





