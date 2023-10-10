import { io } from 'socket.io-client';
import { useEffect, useState } from 'react';

import Board from './Board';
import { useGame } from '../context/game';

const Game = () => {
    const [pending, setPending] = useState(true);
    const { state, startGame } = useGame();
    const socket = io();

    useEffect(() => {
        socket.on('connect_error', () => console.log('error'));
        const localState = JSON.parse(localStorage.getItem('state') as string);
        if(localState) { // state has already set by Home component
            socket.emit('create-game', );
            setPending(false);
            return;
        }

        socket.emit('get-game-info')
    }, []);

    if(pending) return <h1>Pending</h1>

    return (
        <div>
            <Board player={state.player} />
        </div>
    );
};

export default Game;