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