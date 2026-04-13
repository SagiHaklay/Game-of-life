import { ReactNode, useReducer } from "react";
import { GameContext, GameDispatchContext, gameReducer, GameState } from "./GameContext";

export function GameProvider({ children }: { children?: ReactNode }) {
    const initialState: GameState = {
        cells: [[]],
        generation: 0,
        width: 0,
        height: 0
    };
    const [game, dispatch] = useReducer(gameReducer, initialState);
    return (
        <GameContext value={game}>
            <GameDispatchContext value={dispatch}>
                {children}
            </GameDispatchContext>
        </GameContext>
    );
}