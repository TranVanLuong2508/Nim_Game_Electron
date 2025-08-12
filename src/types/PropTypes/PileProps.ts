interface PileProps {
    stones: number
    pileIndex: number
    position: [number, number, number]
    selectedStones: number[]
    onStoneClick: (pileIndex: number, stoneIndex: number) => void
    removingStones: number[]
}

export type { PileProps }