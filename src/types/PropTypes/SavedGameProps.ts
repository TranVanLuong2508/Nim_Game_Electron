interface SavedGamesProps {
    isOpen: boolean
    onClose: () => void
    onLoadGame: (gameId: string) => void
    onDeleteGame: (gameId: string) => void
    onExportGame: (gameId: string) => void // Added onExportGame prop
}
export type { SavedGamesProps }