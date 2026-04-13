type CellProps = {
    isAlive: boolean,
    onToggle: () => void
}

export function Cell({ isAlive, onToggle }: CellProps) {
    return (
        <button style={{
            // width: '2rem',
            // height: '2rem',
            display: 'block',
            backgroundColor: isAlive? 'black' : 'white',
            border: '1px solid gray'
        }}
        onClick={onToggle}
        ></button>
    );
}