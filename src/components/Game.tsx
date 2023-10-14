import { useEffect, useState } from 'react';

import Board from './Board';
import { useSocket } from '../context/socket';

const Game = () => {
    const [pending, setPending] = useState(true);
    const socket = useSocket();

    useEffect(() => {
        socket.on('connect_error', () => console.log('error'));

        const localState = JSON.parse(localStorage.getItem('game') as string);
        if(localState) {
            setPending(false);
        }
    
        socket.on('joined-game', (game) => {
            localStorage.setItem('game', JSON.stringify(game));
            setPending(false);
        });

        socket.on('game-not-found', () => {
            alert('game not found');
        });
    }, []);

    if(pending) return <h1>Pending</h1>

    const game = JSON.parse(localStorage.getItem('game') as string);
    const userId = localStorage.getItem('userId');
    const player = game.white.id === userId ? "white": "black";

    return (
        <div>
            <Board player={player} />
        </div>
    );
};

export default Game;