// Chứa PVESettings, PVPSettings, GameSettings.
import type { Difficulty } from "@/types/commonType"
export interface PVESettings {
    difficulty: Difficulty
    playerGoesFirst: boolean
    randomPiles?: number[]
}

export interface PVPSettings {
    player1Name: string
    player2Name: string
    customPiles?: number[],
    player1GoesFirst: boolean
}


export interface GameSettings {
    pve: PVESettings,
    pvp: PVPSettings,
}

export interface StoneSelection {
    [pileIndex: number]: number[]
}

// 0: [1, 3],   // Ở pile 0, chọn viên số 1 và số 3
// 2: [0]       // Ở pile 2, chọn viên số 0