interface StoneProps {
    position: [number, number, number]
    onClick: () => void
    isSelected: boolean
    isRemoving: boolean
    isClickable?: boolean
}

export type { StoneProps }