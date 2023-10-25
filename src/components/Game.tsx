import { useEffect, useState } from 'react';
import styles from '../styles/Game.module.css';

import Board from './Board';
import { useSocket } from '../context/socket';
import Alert from './Alert';
import PlayerInfo from './PlayerInfo';

const Game = () => {
    const [pending, setPending] = useState(true);
    const [game, setGame] = useState(
        JSON.parse(localStorage.getItem('game') as string)
    );

    const socket = useSocket();

    useEffect(() => {
        socket.on('connect_error', () => console.log('error'));

        if(game) {
            if(game.white.id && game.black.id) {
                socket.emit('rejoin-game', game.id);
                socket.on('rejoined-game', () => {
                    setPending(false);
                });
                return;
            }
            setPending(false);
        }
    
        socket.on('joined-game', (gameData) => {
            localStorage.setItem('game', JSON.stringify(gameData));
            setGame(gameData);
            setPending(false);
        });

        socket.on('game-not-found', () => {
            alert('game not found');
        });
    }, []);

    if(pending) return <h1>Pending</h1>

    const userId = localStorage.getItem('userId');
    const player = game.white.id === userId ? "white": "black";
    localStorage.setItem('inTurn', JSON.stringify(player === 'white'));

    return (
        <div className={styles.game}>
            <PlayerInfo
               player={player === 'white' ? 'black': 'white'}
               username={player === 'black'? game.white.username : game.black.username}
               time={game.time}
            />
            <Board player={player} inTurn={player === 'white'} />
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