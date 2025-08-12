import type { GameState } from "@/types/gameState";
import type { GameSettings, StoneSelection } from "@/types/settings";

export interface SavedGame {
    gameState: GameState,
    settings: GameSettings,
    selectedStones: StoneSelection
}