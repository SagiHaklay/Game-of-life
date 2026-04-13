import { useGame, useGameDispatch } from "../game/GameContext";
import { Cell } from "./Cell";

export function CellGrid() {
    const game = useGame();
    const dispatch = useGameDispatch();
    // dispatch({
    //     type: 'init',
    //     width: 8,
    //     height: 8
    // });
    return (
        <div style={{
            display: 'grid',
            gridTemplateColumns: `repeat(${game.width}, 1fr)`,
            gridTemplateRows: `repeat(${game.height}, 1fr)`,
            border: '1px solid black',
            width: '80vh',
            height: '80vh',
            margin: 'auto'
        }}>
            {game.cells.map((rowsArr, row) => {
                return rowsArr.map((isAlive, column) => {
                    return (
                        <Cell 
                            key={`${row},${column}`}
                            isAlive={isAlive} 
                            onToggle={() => {
                                dispatch({
                                    type: 'toggled',
                                    position: { row, column }
                                });
                            }}
                        ></Cell>
                    );
                })
            })}
        </div>
    );
}