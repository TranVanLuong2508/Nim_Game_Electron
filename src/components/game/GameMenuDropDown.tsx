import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { MoreVertical, Save, Download, RotateCcw, Home } from "lucide-react"

interface GameMenuDropdownProps {
    onSaveGame: () => void
    onExportGame: () => void
    onResetGame: () => void
    onExitGame: () => void
}

const GameMenuDropDown = ({ onSaveGame, onExportGame, onResetGame, onExitGame }: GameMenuDropdownProps) => {
    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="outline" size="sm" className="bg-white/90 backdrop-blur-sm">
                    <MoreVertical className="h-4 w-4" />
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-48">
                <DropdownMenuItem onClick={onSaveGame} className="cursor-pointer">
                    <Save className="h-4 w-4 mr-2" />
                    Save Game
                </DropdownMenuItem>
                <DropdownMenuItem onClick={onExportGame} className="cursor-pointer">
                    <Download className="h-4 w-4 mr-2" />
                    Export
                </DropdownMenuItem>
                <DropdownMenuItem onClick={onResetGame} className="cursor-pointer">
                    <RotateCcw className="h-4 w-4 mr-2" />
                    Reset
                </DropdownMenuItem>
                <DropdownMenuItem onClick={onExitGame} className="cursor-pointer">
                    <Home className="h-4 w-4 mr-2" />
                    Menu
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}

export default GameMenuDropDown