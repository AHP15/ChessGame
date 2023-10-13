import { FormEvent, useState } from 'react';
import styles from '../styles/Home.module.css';

import { v4 as uuidv4 } from 'uuid';
import { useSocket } from '../context/socket';
import { Display } from '../App';

const CreateGame = ({ setDisplay }: { setDisplay: (display: Display) => void }) => {

    const userId = uuidv4();
    const [game, setGame] = useState({
        gameId: uuidv4(),
        userId,
        username: '',
        white: '',
        black: '',
        time: 0,
    });

    const socket = useSocket();

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        socket.emit('create-game', game);
        localStorage.setItem('game', JSON.stringify(game));
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
                value={game.username}
                onChange={(e) => setGame(prev => ({ ...prev, username: e.target.value }))}
            />

            <h3>Play As</h3>
            <div className={styles.btns}>
                <button 
                   type="button"
                    onClick={() => setGame(prev => ({ ...prev, white: userId}))}
                >White</button>
                <button type="button"
                    onClick={() => setGame(prev => ({ ...prev, black: userId }))}
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