import type { GameMode } from "@/types/commonType"
import type { GameSettings } from "@/types/settings"

interface PVPSettingProps {
    isOpen: boolean
    onClose: () => void
    onStartGame: () => void
    mode: GameMode
    settings: GameSettings
    updatePVPSettings: (updates: Partial<GameSettings["pvp"]>) => void
}

export type { PVPSettingProps }