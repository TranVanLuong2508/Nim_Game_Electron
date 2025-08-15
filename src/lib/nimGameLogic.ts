import type { Move } from "@/types/move";
import type { Difficulty, Player } from "@/types/commonType";
// import Level from "@/constants/Level";
import { randomNumberInRange } from "@/lib/random";

export const DEFAULT_PILES = [3, 5, 7, 4]

export const calculateNimSum = (piles: number[]): number => {
    console.log('check pile before calculate', piles)
    return piles.reduce((nimSum, pile) => nimSum ^ pile, 0)
}

// const getOptimalMoveChance = (level: Difficulty) => {
//     switch (level) {
//         case Level.easy.value:
//             return 0.2
//         case Level.medium.value:
//             return 0.6
//         case Level.hard.value:
//             return 1
//         default:
//             return 0;
//     }
// }

const optimalMoveChances = {
    easy: 0.2,
    medium: 0.6,
    hard: 1
}

//lấy % cơ hội đi ngẫu nhiên theo level

const getOptimalMoveChance = (level: Difficulty) => {
    return optimalMoveChances[level] ?? 0  //nullish coalescing operator ==> nếu optimalMoveChances[level] = null hoặc undefined thì retur  0
}

//điều kiện để đi tối ưu hay là ngẫu nhiên

const shouldUseRandomMove = (level: Difficulty) => {
    const perCentOptimalMove = getOptimalMoveChance(level)
    if (Math.random() > perCentOptimalMove) { //nếu random > % đi tối ưu thì đi random
        return true
    } else {
        return false
    }
}

//đi nước đi tối ưu nếu thỏa điều kiện random

export const getOptimalMove = (piles: number[], difficulty: Difficulty = "easy"): Move => {
    const nimSum = calculateNimSum(piles)
    const availablePiles = piles // index của các pile có số lượng đá lớn hơn 0
        .map((pile, index) => pile !== 0 ? index : -1)  // ví dụ: [0,1,-1,-1,4]
        .filter((item) => item !== -1)
    //Trạng thái thua
    if (nimSum === 0) { // nim sum = 0 thì đang ở trạng thái thua, sẽ đi random vì không có nước đi tối ưu
        console.log('nimsum == 0: nimSUm ==0 && Random Move ==>', piles)
        return getRandomMove(piles)
    } else {
        //Trạng thái có lợi
        const shouldRandomMove = shouldUseRandomMove(difficulty)

        if (shouldRandomMove === true) {
            console.log('nimsum !== 0 && shouldRandomMove ==true: Random Move ==>', piles)
            return getRandomMove(piles)

        } else {

            const optimalPiles = availablePiles.filter((item) => {
                const stonePerPile = piles[item]
                const targetSize = stonePerPile ^ nimSum
                if (targetSize < stonePerPile) {
                    return true
                } else {
                    return false
                }
            })

            if (optimalPiles.length === 0) {
                console.log("Không tìm thấy pile tối ưu")
                return getRandomMove(piles)
            }

            const selectedPile = optimalPiles[randomNumberInRange(0, optimalPiles.length - 1)]
            const amountToMove = piles[selectedPile] - (piles[selectedPile] ^ nimSum)
            console.log('nimsum !== 0 && shouldRandomMove ==false: optimal Move ==>', piles)

            return {
                player: "computer",
                pileIndex: selectedPile,
                amount: amountToMove,
                timestamp: new Date(),
            }
        }
    }
}

//đưa ra gợi ý
export const getBestMoveToHint = (piles: number[], player: Player): Move => {
    // console.log('check hint pile and player', piles, player)
    const nimSum = calculateNimSum(piles)
    const availablePiles = piles
        .map((pile, index) => pile !== 0 ? index : -1)
        .filter((item) => item !== -1)
    //losing state
    if (nimSum === 0) {
        console.log('Random Move ==>', piles)
        return {
            ...getRandomMove(piles),
            player: player
        }
    } else {
        //winning state
        const optimalPiles = availablePiles.filter((item) => {
            const stonePerPile = piles[item]
            const targetSize = stonePerPile ^ nimSum
            if (targetSize < stonePerPile) {
                return true
            } else {
                return false
            }
        })

        if (optimalPiles.length === 0) {
            console.log("Không tìm thấy pile tối ưu")
            return {
                ...getRandomMove(piles),
                player: player
            }
        }

        const selectedPile = optimalPiles[randomNumberInRange(0, optimalPiles.length - 1)]
        const amountToMove = piles[selectedPile] - (piles[selectedPile] ^ nimSum)
        // console.log('optimal Move ==>', piles, amountToMove)

        return {
            player: player,
            pileIndex: selectedPile,
            amount: amountToMove,
            timestamp: new Date(),
        }
    }
}

// xử lý trường hợp đi ngẫu nhiên

export const getRandomMove = (piles: number[]): Move => {
    const availablePiles = piles.map((stoneCount, index) => ({ stoneCount, index })).filter(({ stoneCount }) => stoneCount > 0)
    //tạo 1 mảng object có dạng {stoneCount, index}

    if (availablePiles.length === 0) {
        return {
            player: "computer",
            pileIndex: 0,
            amount: 0,
            timestamp: new Date(),
        }
    }

    const randomPile = availablePiles[Math.floor(Math.random() * availablePiles.length)]
    // const amountToMove = Math.floor(Math.random() * randomPile.stoneCount) + 1
    const amountToMove = randomNumberInRange(1, randomPile.stoneCount)
    console.log('check random move')

    return {
        player: "computer",
        pileIndex: randomPile.index,
        amount: amountToMove,
        timestamp: new Date(),
    }
}
//Kiểm tra game kết thúc
export const isGameOver = (piles: number[]): boolean => {
    return piles.every((pile) => pile === 0)
}

export const calculateStonePositions = (
    stoneCount: number,
    basePosition: [number, number, number] = [0, 0, 0],
): [number, number, number][] => {

    if (!basePosition || basePosition.length !== 3) { // basePositions phải có đúng 3 phần tử 
        basePosition = [0, 0, 0]
    }

    if (stoneCount <= 0) {
        return []
    }

    const positions: [number, number, number][] = []
    const stoneSpacing = 0.7 // Khoảng cách giữa các khối đá trong 1 hàng

    for (let i = 0; i < stoneCount; i++) {
        const x = basePosition[0]
        const y = basePosition[1] + 0.3 // Đặt đá trên mặt đất
        const z = basePosition[2] + i * stoneSpacing // Xếp theo chiều dài (trục Z)

        positions.push([x, y, z])
    }

    return positions
}