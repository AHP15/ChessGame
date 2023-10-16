import { useEffect, useState } from 'react';
import styles from '../styles/Game.module.css';

import Board from './Board';
import { useSocket } from '../context/socket';
import Alert from './Alert';
import PlayerInfo from './PlayerInfo';

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
        <div className={styles.game}>
            <PlayerInfo
               player={player === 'white' ? 'black': 'white'}
               username={player === 'black'? game.white.username : game.black.username}
               time={game.time}
            />
            <Board player={player} />
            <PlayerInfo
               player={player === 'white' ? 'white': 'black'}
               username={player === 'white'? game.white.username : game.black.username}
               time={game.time}
            />
            <Alert gameId={game.id} />
        </div>
    );
};

export default Game;