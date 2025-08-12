import type { GameState } from "@/types/gameState"
import type { GameSettings } from "@/types/settings"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import GameMenuDropDown from "@/components/game/GameMenuDropDown"
import { Badge } from "@/components/ui/badge"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import type { Move } from "@/types/move"
import type { GameMode, Player } from "@/types/commonType"
import { useEffect, useRef, useState } from "react"


interface GameHUDProps {
    gameState: GameState
    settings: GameSettings
    onSaveGame: () => void
    onResetGame: () => void
    onExitGame: () => void
    onExportGame: () => void
    hintMove: Move | null
    onPlayerTimeout: () => Promise<void>
}

const GameHud = ({ gameState, onSaveGame, onExportGame, onResetGame, onExitGame, hintMove, onPlayerTimeout, settings }: GameHUDProps) => {

    const getPlayerName = (player: Player | null): string => {
        if (gameState.mode === "PVE") {
            return player === "player1" ? "Bạn" : "Computer"
        } else
            return player === "player1" ? settings.pvp.player1Name : settings.pvp.player2Name
    }

    const totalStones = gameState.piles.reduce((sum, pile) => sum + pile, 0) //tổng số lương đá trong tất cả các pile
    {/* Top Right - Pile Status and Menu */ }
    const COUNTDOWN_SECONDS = 60
    const [hintString, setHintString] = useState("")

    const [countdown, setCountdown] = useState(COUNTDOWN_SECONDS);
    const countdownRef = useRef<NodeJS.Timeout | null>(null);
    const isPlayerTurn =
        gameState.gameStatus === "playing" &&
        (
            (gameState.mode === "PVE" && gameState.currentPlayer === "player1") ||
            (gameState.mode === "PVP" && (gameState.currentPlayer === "player1" || gameState.currentPlayer === "player2"))
        );




    useEffect(() => {
        const getHintMoveString = (mode: GameMode, hint: Move | null) => {
            if (mode === "PVE" && hint !== null) {
                return ` Bạn nên lấy ${hint.amount} viên đá từ Pile ${String.fromCharCode(65 + hint.pileIndex)} để có được nước đi tối ưu nhất`
            }
            if (mode === "PVP" && hint !== null) {
                const playerName = getPlayerName(hintMove?.player ?? null)
                return `${playerName} nên lấy ${hint.amount} viên đá từ Pile ${String.fromCharCode(65 + hint.pileIndex)} để có được nước đi tối ưu nhất`
            }
            return ""
        }
        setHintString(getHintMoveString(gameState.mode, hintMove))
    }, [hintMove, gameState.mode])

    useEffect(() => {
        if (!isPlayerTurn || gameState.gameStatus !== "playing") {
            setCountdown(COUNTDOWN_SECONDS);
            if (countdownRef.current) {
                clearInterval(countdownRef.current);
                countdownRef.current = null;
            }
            return;
        }

        setCountdown(COUNTDOWN_SECONDS);
        if (countdownRef.current) clearInterval(countdownRef.current);

        countdownRef.current = setInterval(() => {
            setCountdown((prev) => prev - 1);
        }, 1000);

        return () => {
            if (countdownRef.current) {
                clearInterval(countdownRef.current);
                countdownRef.current = null;
            }
        };
    }, [gameState.currentPlayer, gameState.gameStatus, isPlayerTurn]);

    useEffect(() => {
        if (countdown === 0) {
            onPlayerTimeout();
            setCountdown(COUNTDOWN_SECONDS); // reset timer sau khi timeout
        }
    }, [countdown, onPlayerTimeout]);

    return (
        <>
            {/* Top Right - Pile Status and Menu */}
            <div className="absolute top-12 right-[16px] flex items-start space-x-2">
                {isPlayerTurn && gameState.gameStatus === "playing" && (
                    <div className="absolute  right-11 -top-6 left-1/2 transform -translate-x-1/2 text-sm font-semibold text-red-600 whitespace-nowrap">
                        Còn lại: {countdown}s
                    </div>
                )}

                {/* Game Menu Dropdown - Moved to left */}
                <div className="flex items-start">
                    <GameMenuDropDown
                        onSaveGame={onSaveGame}
                        onExportGame={onExportGame}
                        onResetGame={onResetGame}
                        onExitGame={onExitGame}
                    />
                </div>

                {/* Pile Status Card */}
                <Card className="bg-white/90 backdrop-blur-sm border-gray-200 gap-0">
                    <CardHeader className="pb-1 p-0">
                        <CardTitle className="text-sm whitespace-nowrap text-center p-0">Thông tin Game</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-1">
                        {gameState.piles.map((count, index) => (
                            <div key={index} className="flex justify-between items-center text-sm">
                                <span>Pile {String.fromCharCode(65 + index)}:</span>
                                <Badge variant="outline">{count}</Badge>
                            </div>
                        ))}
                        <div className="pt-1 border-t">
                            <div className="flex justify-between items-center text-sm font-medium">
                                <span>Tổng:</span>
                                <Badge>{totalStones}</Badge>
                            </div>
                        </div>
                        <div className="flex justify-center">
                            <Dialog>
                                <DialogTrigger asChild>
                                    <button
                                        type="button"
                                        disabled={gameState.currentPlayer === "computer" ? true : false}
                                        className="transition-all duration-200 hover:scale-105 hover:shadow-md disabled:hover:scale-100 disabled:hover:shadow-none"
                                    >
                                        <Badge className="cursor-pointer hover:bg-primary/90 transition-colors duration-200">
                                            Xem gợi ý
                                        </Badge>
                                    </button>
                                </DialogTrigger>
                                <DialogContent>
                                    <DialogHeader>
                                        <DialogTitle>
                                            Đây là gợi ý nước đi cho bạn
                                        </DialogTitle>
                                        <DialogDescription>
                                            {hintString}
                                        </DialogDescription>
                                    </DialogHeader>
                                </DialogContent>
                            </Dialog>
                        </div>
                    </CardContent>
                </Card>
            </div>

            {/* Game Status Overlay - Center */}
            {gameState.gameStatus !== "playing" && (
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                    <Card className="bg-white/95 backdrop-blur-sm border-gray-200 shadow-xl">
                        <CardContent className="p-6 text-center">
                            <div
                                className={`text-2xl font-bold mb-2 ${gameState.gameStatus === "won" ? "text-green-600" : "text-red-600"}`}
                            >
                                {gameState.gameStatus === "won"
                                    ? "🎉 You Won!"
                                    : gameState.gameStatus === "lost"
                                        ? "😔 You Lost!"
                                        : "Game Over"}
                            </div>
                            <p className="text-gray-600">
                                {gameState.gameStatus === "won" ? "Congratulations! You played well!" : "Better luck next time!"}
                            </p>
                        </CardContent>
                    </Card>
                </div>
            )}

            {/* Computer Thinking Indicator */}
            {gameState.currentPlayer === "computer" && gameState.gameStatus === "playing" && (
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                    <Card className="bg-white/95 backdrop-blur-sm border-gray-200">
                        <CardContent className="p-4 flex items-center space-x-3">
                            <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-gray-900"></div>
                            <span className="text-gray-700 font-medium">Computer is thinking...</span>
                        </CardContent>
                    </Card>
                </div>
            )}

            {/* Bottom - Move History - Limited to 3 moves */}
            {gameState.moveHistory.length > 0 && (
                <div className="absolute bottom-4 left-4 right-4">
                    <Card className="bg-white/90 backdrop-blur-sm border-gray-200 gap-0">
                        <CardHeader className="pb-1">
                            <CardTitle className="text-sm whitespace-nowrap">Lượt đi gần nhất</CardTitle>
                        </CardHeader>
                        <CardContent className="max-h-32 overflow-y-auto">
                            <div className="space-y-1">
                                {gameState.moveHistory.slice(-3).reverse().map((move, index) => (
                                    <div key={index} className="text-xs flex justify-between items-center">
                                        <span>
                                            {getPlayerName(move.player)}{" "}
                                            đã lấy {move.amount} viên đá từ Pile {String.fromCharCode(65 + move.pileIndex)}
                                        </span>
                                        <span className="text-gray-500">{new Date(move.timestamp).toLocaleTimeString()}</span>
                                    </div>
                                ))}
                            </div>
                        </CardContent>
                    </Card>
                </div>
            )}
        </>
    )
}

export default GameHud