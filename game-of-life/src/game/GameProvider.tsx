import { ReactNode, useReducer } from "react";
import { GameContext, GameDispatchContext, gameReducer, GameState } from "./GameContext";

export function GameProvider({ children }: { children?: ReactNode }) {
    let cells = [];
    const width = 10;
    const height = 10;
    for (let i = 0; i < height; i++) {
        let row = [];
        for (let j = 0; j < width; j++) {
            row.push(false);
        }
        cells.push(row);
    }
    const initialState: GameState = {
        cells,
        generation: 0,
        width,
        height
    };
    const [game, dispatch] = useReducer(gameReducer, initialState);
    // dispatch({
    //     type: 'init',
    //     width: 8,
    //     height: 8
    // });
    return (
        <GameContext value={game}>
            <GameDispatchContext value={dispatch}>
                {children}
            </GameDispatchContext>
        </GameContext>
    );
}