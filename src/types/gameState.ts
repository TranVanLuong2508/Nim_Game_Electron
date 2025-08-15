// Chứa GameMode, GameStatus, Player, GameState, SavedGame.
import type { GameMode, GameStatus, Player } from "@/types/commonType"
import type { Move } from "@/types/move"


export interface GameState {
    id: string
    mode: GameMode
    piles: number[]
    currentPlayer: Player
    gameStatus: GameStatus
    isAnimating: boolean
    moveHistory: Move[]
    createdAt: Date
    lastModified: Date
}

// export const validateGameState = (state: Partial<GameState>): GameState => {
//     return {
//         id: state.id || crypto.randomUUID(),
//         mode: state.mode || "PVE",
//         piles: Array.isArray(state.piles) ? state.piles : [3, 5, 7, 4],
//         currentPlayer: state.currentPlayer || "player1",
//         gameStatus: state.gameStatus || "playing",
//         isAnimating: state.isAnimating || false,
//         moveHistory: Array.isArray(state.moveHistory) ? state.moveHistory : [],
//         createdAt: state.createdAt || new Date(),
//         lastModified: state.lastModified || new Date(),
//     }
// }