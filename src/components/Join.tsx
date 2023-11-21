import { FormEvent, useEffect, useState } from 'react';
import { useSocket } from '../context/socket';
import { v4 as uuidv4 } from 'uuid';
import { Display } from '../App';
import styles from '../styles/Create.module.css';

const JoinGame = ({ setDisplay }: { setDisplay: (display: Display) => void }) => {
    const userId = uuidv4();
    const [username, setUsername] = useState('');
    const [gameId, setGameId] = useState('');
    const [alert, setAlert] = useState('');

    const socket = useSocket();

    useEffect(() => {
        setAlert('');
    }, [username, gameId]);

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();

        if(!username || !gameId) {
            setAlert('Username and game id are required');
            return;
        }
        localStorage.setItem('userId', userId);
        socket.emit('join-game', {username, gameId, userId});
        setDisplay(Display.playGame);
    };

    return(
        <form onSubmit={handleSubmit} className={styles.form}>
            {alert && <p className={styles.alert}>{alert}</p>}
            <button className={`${styles.back_btn} display_btn`} onClick={() => setDisplay(Display.home)} type="button">
                Back to home
            </button>
            <h1>Join Game</h1>
            <input
              type="text"
              className="display_btn"
              placeholder="Enter your name"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            <input
              type="text"
              className="display_btn"
              placeholder="Enter the Game's id"
              value={gameId}
              onChange={(e) => setGameId(e.target.value)}
            />
            <button className="display_btn" type="submit">Join</button>
        </form>
    );
};

export default JoinGame;