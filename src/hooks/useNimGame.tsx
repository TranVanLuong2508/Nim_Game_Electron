import Level from "@/constants/Level";
import { DEFAULT_PILES, getOptimalMove, isGameOver, getBestMoveToHint, getRandomMove } from "@/lib/nimGameLogic";
import { getRandomPiles } from "@/lib/random";
import { saveGame } from "@/lib/storage";
import type { GameMode, Player } from "@/types/commonType";
import type { GameState } from "@/types/gameState";
import type { Move } from "@/types/move";
import type { SavedGame } from "@/types/savedGame";
import type { GameSettings, StoneSelection } from "@/types/settings";
import { useCallback, useEffect, useState } from "react";

export const useNimGame = (mode: GameMode, settings: GameSettings) => {
    //khởi tạo pile ban đầu
    const getInitialPiles = () => {
        if (mode === "PVE") {
            return settings?.pve?.randomPiles && Array.isArray(settings.pve.randomPiles)
                ? [...settings.pve.randomPiles]
                : [...DEFAULT_PILES]
        } else {
            return settings?.pvp?.customPiles && Array.isArray(settings.pvp.customPiles)
                ? [...settings.pvp.customPiles]
                : getRandomPiles(Level.medium.value)
        }
    }

    //người chơi đầu tiên
    const getFirstPlayer = (): Player => {
        if (mode === "PVE") {
            return settings?.pve?.playerGoesFirst ? "player1" : "computer";
        } else {
            return settings?.pvp?.player1GoesFirst ? "player1" : "player2";
        }
    }

    //tạo trạng thái gameState cho trò chơi
    const [gameState, setGameState] = useState<GameState>({
        id: crypto.randomUUID(),
        mode,
        piles: getInitialPiles(),
        currentPlayer: getFirstPlayer(),
        // mode === "PVE" && settings?.pve?.playerGoesFirst ? "player1" : mode === "PVE" ? "computer" : "player1",
        // mode === "PVE" && settings.pve.playerGoesFirst ? "player1" : mode === "PVE" ? "computer" : "player1",
        gameStatus: "playing",
        isAnimating: false,
        moveHistory: [],
        createdAt: new Date(),
        lastModified: new Date(),
    })

    const [selectedStones, setSelectedStones] = useState<StoneSelection>({})
    const [removingStones, setRemovingStones] = useState<StoneSelection>({})
    const [hintMove, setHintMove] = useState<Move | null>(null);
    const [hasUsedHintThisTurn, setHasUsedHintThisTurn] = useState(false);
    // const [hasDecrementedThisTurn, setHasDecrementedThisTurn] = useState(false);

    const [hintCount, setHintCount] = useState(() => {
        if (mode === "PVE") {
            return { player1: 3, player2: 0, computer: 0 }
        } else {
            return { player1: 3, player2: 3, computer: 0 }
        }
    })

    //tạo gợi ý
    const generateHint = useCallback(() => {
        const move = getBestMoveToHint(gameState.piles, gameState.currentPlayer);
        setHintMove(move);
    }, [gameState.piles, settings.pve.difficulty]);


    // thực hiện nước đi
    const executeMove = useCallback(
        async (pileIndex: number, amount: number, player: GameState["currentPlayer"]) => {
            setGameState((prev) => ({ ...prev, isAnimating: true }))

            // Đánh dấu stones sẽ bị xóa (từ dưới lên)
            const stonesToRemove = Array.from({ length: amount }, (_, i) => gameState.piles[pileIndex] - 1 - i)
            //ví dụ : 5 - 1 - 0, 5 - 1 - 1, 5 - 1 - 2 , ==> [4,3,2]
            setRemovingStones({ [pileIndex]: stonesToRemove })

            await new Promise((resolve) => setTimeout(resolve, 1500))

            const move: Move = {
                player,
                pileIndex,
                amount,
                timestamp: new Date(),
            }

            //cập nhật lại số đá của các pile và lịch sử 
            setGameState((prev) => ({
                ...prev,
                piles: prev.piles.map((pile, index) => (index === pileIndex ? pile - amount : pile)),
                moveHistory: [...prev.moveHistory, move],
                isAnimating: false,
                lastModified: new Date(),
            }))

            setRemovingStones({})
            setSelectedStones({})
        },
        [gameState.piles],
    )

    //click stone

    const handleStoneClick = useCallback(
        (pileIndex: number, stoneNumber: number) => {
            if (gameState.isAnimating || gameState.gameStatus !== "playing") return // click khii đang trong animation xóa đá thì khong có tác dụng
            if (gameState.mode === "PVE" && gameState.currentPlayer === "computer") return // can't click on computer turn 

            // stoneNumber là số lượng stones sẽ lấy (từ 1 đến số stones trong pile)
            const amount = Math.min(stoneNumber, gameState.piles[pileIndex])

            executeMove(pileIndex, amount, gameState.currentPlayer).then(() => {
                if (gameState.mode === "PVE") {
                    setGameState((prev) => ({ ...prev, currentPlayer: "computer" }))
                } else {
                    setGameState((prev) => ({
                        ...prev,
                        currentPlayer: prev.currentPlayer === "player1" ? "player2" : "player1",
                    }))
                }
            })
        },
        [gameState.isAnimating, gameState.gameStatus, gameState.mode, gameState.currentPlayer, executeMove],
    )

    //computer move lượt đi của máy
    const makeComputerMove = useCallback(async () => {
        const move = getOptimalMove(gameState.piles, settings.pve.difficulty)
        await executeMove(move.pileIndex, move.amount, "computer")
        setGameState((prev) => ({ ...prev, currentPlayer: "player1" }))
    }, [gameState.piles, settings.pve.difficulty, executeMove])

    useEffect(() => {
        if (
            gameState.mode === "PVE" &&
            gameState.currentPlayer === "computer" &&
            gameState.gameStatus === "playing" &&
            !gameState.isAnimating
        ) {
            const timer = setTimeout(makeComputerMove, 1500)
            return () => clearTimeout(timer)
        }
    }, [gameState.mode, gameState.currentPlayer, gameState.gameStatus, gameState.isAnimating, makeComputerMove])

    //save game
    const saveCurrentGame = useCallback(() => {
        const savedGame: SavedGame = {
            gameState,
            settings,
            selectedStones,
        }
        saveGame(savedGame)
    }, [gameState, settings, selectedStones])

    //load game

    const loadGame = useCallback((savedGame: SavedGame) => {
        setGameState(savedGame.gameState)
        setSelectedStones(savedGame.selectedStones)
        setRemovingStones({})
    }, [])

    //reset game
    const resetGame = useCallback(() => {
        setGameState({
            id: crypto.randomUUID(),
            mode,
            piles: mode === "PVE" ? getRandomPiles(settings.pve.difficulty) : getInitialPiles(),
            currentPlayer: getFirstPlayer(),
            // mode === "PVE" && settings.pve.playerGoesFirst ? "player1" : mode === "PVE" ? "computer" : "player1",
            gameStatus: "playing",
            isAnimating: false,
            moveHistory: [],
            createdAt: new Date(),
            lastModified: new Date(),
        })
        setSelectedStones({})
        setRemovingStones({})
        setHintMove(null);
        if (mode === "PVE") {
            setHintCount({ player1: 3, player2: 0, computer: 0 });
        } else {
            setHintCount({ player1: 3, player2: 3, computer: 0 });
        }
    }, [mode, settings])

    //kết thúc game
    useEffect(() => {
        if (isGameOver(gameState.piles) && gameState.gameStatus === "playing") {
            setGameState((prev) => ({
                ...prev,
                gameStatus: prev.currentPlayer === "player1" ? "lost" : "won",
            }))
        }
    }, [gameState.piles, gameState.currentPlayer, gameState.gameStatus])

    // 

    // Sinh gợi ý khi tới lượt người chơi
    useEffect(() => {

        if (gameState.gameStatus !== "playing") return;

        if (gameState.mode === "PVP") {
            if (gameState.currentPlayer === "player1" || gameState.currentPlayer === "player2") {
                generateHint();
            } else {
                setHintMove(null);  // xóa hint khi không phải lượt người chơi
            }
        } else if (gameState.mode === "PVE") {
            if (gameState.currentPlayer === "player1") {
                generateHint();
            } else {
                setHintMove(null);  // xóa hint khi không phải lượt người chơi
            }
        }
    }, [gameState.currentPlayer, gameState.mode, gameState.gameStatus, generateHint]);

    //xử lý lượt đi tự động khi hết thời gian đếm ngược
    const makePlayerMoveAutomatically = useCallback(async () => {
        console.log("makePlayerMoveAutomatically called");
        if (gameState.gameStatus !== "playing" || gameState.isAnimating) return;

        if (gameState.mode === "PVE") {
            // Ở PVE, chỉ tự chơi khi là lượt computer
            if (gameState.currentPlayer === "player1") {
                const move = getOptimalMove(gameState.piles, settings.pve.difficulty);
                await executeMove(move.pileIndex, move.amount, "player1");
                setGameState((prev) => ({ ...prev, currentPlayer: "computer" }));
            }
        } else if (gameState.mode === "PVP") {
            // Ở PVP, nếu lượt người chơi mà timeout thì bot tự làm nước đi tối ưu cho người đó
            if (gameState.currentPlayer === "player1" || gameState.currentPlayer === "player2") {
                // const move = getOptimalMove(gameState.piles, Level.medium.value); // Hoặc lấy difficulty khác nếu có
                const move = getRandomMove(gameState.piles); // Ngẫu nhiên
                await executeMove(move.pileIndex, move.amount, gameState.currentPlayer);
                setGameState((prev) => ({
                    ...prev,
                    currentPlayer: prev.currentPlayer === "player1" ? "player2" : "player1",
                }));
            }
        }
    }, [gameState, settings.pve.difficulty, executeMove]);

    //đánh dấu có dùng gợi ý để khi chuyển lượt rồi trừ

    const markHintAsUsed = useCallback(() => {
        console.log('trừ lượt gợi ý')
        setHasUsedHintThisTurn(true)
    }, []);

    //lấy số hint còn lại của player hiện tại

    const getCurrentPlayerHintCount = useCallback(() => {
        return hintCount[gameState.currentPlayer] || 0;
    }, [hintCount, gameState.currentPlayer]);

    // THÊM MỚI - useEffect để xử lý phần gợi ý khi khi chuyển lượt:
    useEffect(() => {
        // Nếu đã sử dụng hint trong lượt trước, trừ hint count
        if (hasUsedHintThisTurn) {
            if (gameState.mode === "PVE") {
                setHintCount((prev) => ({
                    ...prev,
                    player1: Math.max(0, prev.player1 - 1)
                }));
            } else {
                // PVP: trừ hint count của người chơi trước đó
                const previousPlayer = gameState.currentPlayer === "player1" ? "player2" : "player1";
                setHintCount((prev) => ({
                    ...prev,
                    [previousPlayer]: Math.max(0, prev[previousPlayer] - 1)
                }));
            }
        }
        setHasUsedHintThisTurn(true)
    }, [gameState.currentPlayer, gameState.mode]) //xem kĩ chỗ này, tại sao lại khong cần hasUsedHintThisTurn 

    //reset đánh dấu dùng gợi ý
    useEffect(() => {
        // Reset cho lượt mới setHasUsedHintThisTurn 
        setHasUsedHintThisTurn(false);
    }, [gameState.currentPlayer]);
    return {
        gameState,
        selectedStones,
        removingStones,
        handleStoneClick,
        saveCurrentGame,
        loadGame,
        resetGame,
        hintMove,
        makePlayerMoveAutomatically,
        hintCount: getCurrentPlayerHintCount(), // Thêm số lượt gợi ý còn lại
        markHintAsUsed,// Hàm giảm số lượt gợi ý
        allHintCounts: hintCount,
        canUseHint: getCurrentPlayerHintCount() > 0,  // có thể xem gợi ý
    }
}
