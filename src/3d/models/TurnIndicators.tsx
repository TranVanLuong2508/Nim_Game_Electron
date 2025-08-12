import TurnIndicator from "@/3d/models/TurnIndicator"
import type { TurnIndicatorsProps } from "@/types/PropTypes/TurnIndicatorsProps"


const TurnIndicators = ({ gameState, settings }: TurnIndicatorsProps) => {
    const isPlayer1Turn = gameState.currentPlayer === "player1"
    const isPlayer2Turn = gameState.currentPlayer === "player2" || gameState.currentPlayer === "computer"
    const getPlayerName = (player: "player1" | "player2") => {
        if (gameState.mode === "PVE") {
            return player === "player1" ? "Bạn" : "Computer"
        }
        return player === "player1" ? settings.pvp.player1Name : settings.pvp.player2Name
    }
    return (
        <group>
            {/* Player 1 Indicator - Bên trái */}
            <TurnIndicator
                position={[-10, 1, -4]}
                isActive={isPlayer1Turn}
                color="blue"
                playerName={getPlayerName("player1")}
            />

            {/* Player 2/Computer Indicator - Bên phải */}
            <TurnIndicator
                position={[10, 1, -4]}
                isActive={isPlayer2Turn}
                color="red"
                playerName={gameState.mode === "PVE" ? "Computer" : getPlayerName("player2")}
            />
        </group>
    )
}

export default TurnIndicators