import type { Player } from "@/types/commonType"

export interface Move {
    player: Player
    pileIndex: number
    amount: number
    timestamp: Date
}