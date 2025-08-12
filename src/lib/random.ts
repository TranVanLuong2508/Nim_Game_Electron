import type { Difficulty } from "@/types/commonType";
import Level from "@/constants/Level";

export const randomNumberInRange = (minNumber: number, maxNumber: number): number => {
    return Math.floor(Math.random() * (maxNumber - minNumber + 1)) + minNumber; //random from [min-max]
}

export const getRandomPiles = (difficulty: Difficulty): number[] => {
    let numPiles, maxStones
    switch (difficulty) {
        case Level.easy.value:
            numPiles = Level.easy.numPile
            maxStones = Level.easy.maxStones
            break
        case Level.medium.value:
            numPiles = Level.medium.numPile
            maxStones = Level.medium.maxStones
            break
        case Level.hard.value:
            numPiles = Level.hard.numPile
            maxStones = Level.hard.maxStones
            break
        default:
            numPiles = 3;
            maxStones = 5
    }
    const minStone: number = 1
    const piles: number[] = []
    for (let i = 0; i < numPiles; i++) {
        const stones = randomNumberInRange(minStone, maxStones)
        piles.push(stones)
    }
    console.log(';check random pile', difficulty, piles)
    return piles
}
