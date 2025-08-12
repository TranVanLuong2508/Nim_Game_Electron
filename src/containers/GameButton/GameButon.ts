import { BotMessageSquare, Users, Save } from "lucide-react"
import type { GameButtons } from "@/types/gameButtons"

const gameButtons: GameButtons = {
    PVEButton: {
        id: "PVP",
        text: "Người với Máy",
        icon: BotMessageSquare,
        gradient: "from-purple-400/30 via-pink-300/25 to-purple-300/30",
        hoverGradient: "from-purple-300/40 via-pink-200/35 to-purple-200/40",
        glowColor: "rgba(147, 51, 234, 0.2)",
        spaceColor: "bg-gradient-to-r from-purple-500/15 via-pink-400/12 to-purple-400/15",
    },

    PVPButton: {
        id: "PVE",
        text: "Người với Người",
        icon: Users,
        gradient: "from-blue-400/30 via-cyan-300/25 to-blue-300/30",
        hoverGradient: "from-blue-300/40 via-cyan-200/35 to-blue-200/40",
        glowColor: "rgba(59, 130, 246, 0.2)",
        spaceColor: "bg-gradient-to-r from-blue-500/15 via-cyan-400/12 to-blue-400/15",
    },
    SavedGameButton: {
        id: "SAVED",
        text: "Game đã lưu",
        icon: Save,
        gradient: "from-teal-400/30 via-emerald-300/25 to-cyan-300/30",
        hoverGradient: "from-teal-300/40 via-emerald-200/35 to-cyan-200/40",
        glowColor: "rgba(20, 184, 166, 0.2)",
        spaceColor: "bg-gradient-to-r from-teal-500/15 via-emerald-400/12 to-cyan-400/15",
    },
}

export default gameButtons