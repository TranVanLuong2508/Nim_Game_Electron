export const calculateStonePositions = (
    stoneCount: number,
    basePosition: [number, number, number] = [0, 0, 0],
): [number, number, number][] => {

    if (!basePosition || basePosition.length !== 3) {
        basePosition = [0, 0, 0]
    }

    if (stoneCount <= 0) {
        return []
    }

    const positions: [number, number, number][] = []
    const stoneSpacing = 0.7 // Khoảng cách giữa các khối đá

    for (let i = 0; i < stoneCount; i++) {
        const x = basePosition[0]
        const y = basePosition[1] + 0.3 // Đặt đá trên mặt đất
        const z = basePosition[2] + i * stoneSpacing // Xếp theo chiều dài (trục Z)

        positions.push([x, y, z])
    }

    return positions
}