import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { MoreVertical, Save, Download, RotateCcw, Home } from "lucide-react"
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"

interface GameMenuDropdownProps {
    onSaveGame: () => void
    onExportGame: () => void
    onResetGame: () => void
    onExitGame: () => void
}

const GameMenuDropDown = ({ onSaveGame, onExportGame, onResetGame, onExitGame }: GameMenuDropdownProps) => {
    const handleSaveAndExit = () => {
        onSaveGame()
        onExitGame()
    }

    const handleSaveAndReset = () => {
        onSaveGame()
        onResetGame()
    }

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="outline" size="sm" className="bg-white/90 backdrop-blur-sm cursor-pointer">
                    <MoreVertical className="h-4 w-4" />
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-48">
                <DropdownMenuItem onClick={onSaveGame} className="cursor-pointer">
                    <Save className="h-4 w-4 mr-2" />
                    Lưu ván chơi
                </DropdownMenuItem>
                <DropdownMenuItem onClick={onExportGame} className="cursor-pointer">
                    <Download className="h-4 w-4 mr-2" />
                    Xuất file
                </DropdownMenuItem>

                {/* Nút Chơi lại với xác nhận */}
                <Dialog>
                    <DialogTrigger asChild>
                        <DropdownMenuItem
                            className="cursor-pointer"
                            onSelect={(e) => e.preventDefault()}
                        >
                            <RotateCcw className="h-4 w-4 mr-2" />
                            Chơi lại
                        </DropdownMenuItem>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-[425px]">
                        <DialogHeader>
                            <DialogTitle>
                                <div className="text-center">Chơi lại</div>
                            </DialogTitle>
                            <DialogDescription>
                                <div className="text-center">Bạn có chắc chắn muốn chơi lại không ?</div>
                            </DialogDescription>
                        </DialogHeader>
                        <DialogFooter className="flex gap-2">
                            <DialogClose asChild>
                                <Button variant="outline" >
                                    Hủy
                                </Button>
                            </DialogClose>
                            <DialogClose asChild>
                                <Button onClick={handleSaveAndReset}>
                                    Chơi lại
                                </Button>
                            </DialogClose>
                        </DialogFooter>
                    </DialogContent>
                </Dialog>

                {/* Nút Về trang chủ với xác nhận */}
                <Dialog>
                    <DialogTrigger asChild>
                        <DropdownMenuItem
                            className="cursor-pointer"
                            onSelect={(e) => e.preventDefault()}
                        >
                            <Home className="h-4 w-4 mr-2" />
                            Về trang chủ
                        </DropdownMenuItem>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-[425px]">
                        <DialogHeader>
                            <DialogTitle>
                                <div className="text-center">Thoát về menu chính</div>
                            </DialogTitle>
                            <DialogDescription>
                                <div className="text-center">Bạn có muốn lưu game trước khi thoát không?</div>
                            </DialogDescription>
                        </DialogHeader>
                        <DialogFooter className="flex gap-2">
                            <DialogClose asChild>
                                <Button variant="outline" onClick={onExitGame}>
                                    Không lưu
                                </Button>
                            </DialogClose>
                            <DialogClose asChild>
                                <Button onClick={handleSaveAndExit}>
                                    Lưu và thoát
                                </Button>
                            </DialogClose>
                        </DialogFooter>
                    </DialogContent>
                </Dialog>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}

export default GameMenuDropDown
