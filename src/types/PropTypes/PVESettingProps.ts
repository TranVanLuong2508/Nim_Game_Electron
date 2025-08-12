import type { GameMode } from "@/types/commonType"
import type { GameSettings } from "@/types/settings"

interface PVESettingProps {
    isOpen: boolean
    onClose: () => void
    onStartGame: () => void
    mode: GameMode
    settings: GameSettings
    updatePVESettings: (updates: Partial<GameSettings["pve"]>) => void
}

export type { PVESettingProps }