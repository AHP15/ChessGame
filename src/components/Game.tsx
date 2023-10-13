import { io } from 'socket.io-client';
import { useEffect, useState } from 'react';

import Board from './Board';
import { useParams } from 'react-router-dom';

const Game = () => {
    const [pending, setPending] = useState(true);
    const { gameId } = useParams();
    const socket = io();

    useEffect(() => {
        socket.on('connect_error', () => console.log('error'));

        const localState = JSON.parse(localStorage.getItem('game') as string);
        if(localState) { // state has been already set
            socket.emit('create-game', localState);
            setPending(false);
            return;
        }

        socket.emit('get-game-info', gameId);
    
        socket.on('game-info', (game) => {
            localStorage.setItem('game', JSON.stringify(game));
            setPending(false);
        });

        socket.on('game-not-found', () => {});
    }, []);

    if(pending) return <h1>Pending</h1>

    return (
        <div>
            <Board player={"white"} />
        </div>
    );
};

export default Game;