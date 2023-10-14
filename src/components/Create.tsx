import { FormEvent, useState } from 'react';
import styles from '../styles/Home.module.css';

import { v4 as uuidv4 } from 'uuid';
import { useSocket } from '../context/socket';
import { Display } from '../App';

const userId = uuidv4();
const gameId = uuidv4();

const CreateGame = ({ setDisplay }: { setDisplay: (display: Display) => void }) => {

    const [game, setGame] = useState({
        id: '',
        username: '',
        white: {
            id: '',
            username: '',
        },
        black: {
            id: '',
            username: '',
        },
        time: 0,
    });
    const [username, setUsername] = useState('');

    const socket = useSocket();

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();

        const gameInfo = game;
        gameInfo.id = gameId;
        if(gameInfo.white.id) gameInfo.white.username = username;
        if(gameInfo.black.id) gameInfo.black.username = username;

        socket.emit('create-game', gameInfo);
        localStorage.setItem('game', JSON.stringify(gameInfo));
        localStorage.setItem('userId', userId);
        setDisplay(Display.playGame);
    }

    return (
        <form onSubmit={handleSubmit}>
            <button onClick={() => setDisplay(Display.home)} type="button">
                Back to home
            </button>
            <input
                type="text"
                placeholder="Enter your name"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
            />

            <h3>Play As</h3>
            <div className={styles.btns}>
                <button 
                   type="button"
                    onClick={
                        () => setGame(prev => ({ ...prev, white: { id: userId, username: ''}}))
                    }
                >White</button>
                <button type="button"
                    onClick={
                        () => setGame(prev => ({ ...prev, black: { id: userId, username: ''} }))
                    }
                >Black</button>
            </div>
            <div className={styles.btns}>
                <button type="button" onClick={() => setGame(prev => ({ ...prev, time: 3 }))}>3 min</button>
                <button type="button" onClick={() => setGame(prev => ({ ...prev, time: 5 }))}>5 min</button>
                <button type="button" onClick={() => setGame(prev => ({ ...prev, time: 10 }))}>10 min</button>
                <button type="button" onClick={() => setGame(prev => ({ ...prev, time: 30 }))}>30 min</button>
            </div>
            <button type="submit" className={styles.submit_btn}>Start Game</button>
        </form>
    );
};

export default CreateGame;