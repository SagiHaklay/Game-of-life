import { useGame, useGameDispatch } from "../game/GameContext";

export function ControlPanel() {
    const game = useGame();
    const dispatch = useGameDispatch();

    return (
        <div style={{
            display: 'flex',
            justifyContent: 'space-around',
            alignItems: 'center',
            padding: '1rem'
        }}>
            <button onClick={() => {
                dispatch({
                    type: 'init'
                });
            }}>Reset</button>
            <span>Generation: {game.generation}</span>
            <button onClick={() => {
                dispatch({
                    type: 'next'
                });
            }}>Next Generation</button>
        </div>
    );
}