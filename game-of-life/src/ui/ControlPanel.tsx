import { useEffect, useState } from "react";
import { useGame, useGameDispatch } from "../game/GameContext";

export function ControlPanel() {
    const game = useGame();
    const dispatch = useGameDispatch();
    const [isPlaying, setPlaying] = useState(false);
    useEffect(() => {
        let intervalId: number | null;
        if (isPlaying) {
            intervalId ??= setInterval(() => {
                dispatch({
                    type: "next"
                });
            }, 1000);
        }
        return () => {
            if (intervalId) {
                clearInterval(intervalId);
                intervalId = null;
            }
        } 
    }, [isPlaying]);

    return (
        <div style={{
            display: 'flex',
            justifyContent: 'space-around',
            alignItems: 'center',
            padding: '1rem'
        }}>
            <button onClick={() => {
                setPlaying(false);
                dispatch({
                    type: 'init'
                });
            }}>Reset</button>
            <span>Generation: {game.generation}</span>
            <button onClick={() => {
                setPlaying(false);
                dispatch({
                    type: 'next'
                });
            }}>Next Generation</button>
            <button onClick={() => setPlaying(p => !p)}>
                {isPlaying? 'Pause' : 'Play'}
            </button>
        </div>
    );
}