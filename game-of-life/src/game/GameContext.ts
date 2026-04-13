import { createContext, useContext } from "react";

export type GameState = {
    cells: boolean[][],
    generation: number,
    width: number,
    height: number
};

type GameAction = {
    type: 'init' | 'next' | 'toggled',
    width?: number,
    height?: number,
    position?: Position
};

export type Position = {
    row: number,
    column: number
}



export const GameContext = createContext(null);
export const GameDispatchContext = createContext(null);

export function gameReducer(game: GameState, action: GameAction): GameState {
    switch (action.type) {
        case "init":
            const width = action.width || 0;
            const height = action.height || 0;
            let cells = [];
            for (let i = 0; i < height; i++) {
                let row = [];
                for (let j = 0; j < width; j++) {
                    row.push(false);
                }
                cells.push(row);
            }
            return {
                cells, width, height,
                generation: 0
            };
        case "next":
            const nextGenCells = game.cells.map((rowsArr, row) => {
                return rowsArr.map((cell, column) => {
                    const neighborCount = getLivingNeighborCount(game, {row, column});
                    if (neighborCount === 3) return true;
                    if (neighborCount === 2) return cell;
                    return false;
                });
            });
            return {
                ...game,
                cells: nextGenCells,
                generation: game.generation + 1
            };
        case "toggled":
            return {
                ...game,
                cells: game.cells.map((rowsArr, i) => {
                    if (i !== action.position.row) return [...rowsArr];
                    return rowsArr.map((cell, j) => j === action.position.column? !cell : cell);
                })
            };
    }
}

export function useGame() {
    return useContext(GameContext);
}

export function useGameDispatch() {
    return useContext(GameDispatchContext);
}

function getLivingNeighborCount(game: GameState, position: Position) {
    const dirs: Position[] = [
        {row: -1, column: -1}, {row: -1, column: 0}, {row: -1, column: 1},
        {row: 0, column: -1}, {row: 0, column: 1},
        {row: 1, column: -1}, {row: 1, column: 0}, {row: 1, column: 1},
    ];
    const livingNeighbors = dirs.filter(d => {
        const row = position.row + d.row;
        const col = position.column + d.column;
        return row >= 0 && row < game.height && col >= 0 && col < game.width && game.cells[row][col];
    });
    return livingNeighbors.length;
}