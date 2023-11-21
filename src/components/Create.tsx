import { FormEvent, useEffect, useState } from 'react';
import styles from '../styles/Create.module.css';

import { v4 as uuidv4 } from 'uuid';
import { useSocket } from '../context/socket';
import { Display } from '../App';

const userId = uuidv4();
const gameId = uuidv4();

const CreateGame = ({ setDisplay }: { setDisplay: (display: Display) => void }) => {

    const [game, setGame] = useState({
        id: '',
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
    const [alert, setAlert] = useState('');

    const socket = useSocket();

    useEffect(() => {
        setAlert('');
    }, [username, game]);

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();

        if(!username) {
            setAlert('Please Enter your name');
            return;
        }

        if(!game.black && !game.white) {
            setAlert('Please would play as a white or black');
            return;
        }

        if(!game.time) {
            setAlert('Please Specify the game time');
            return;
        }

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
        <form onSubmit={handleSubmit} className={styles.form}>
            {alert && <p className={styles.alert}>{alert}</p>}
            <button className={`${styles.back_btn} display_btn`} onClick={() => setDisplay(Display.home)} type="button">
                Back to home
            </button>
            <h1>Create Game</h1>
            <input
                className="display_btn"
                type="text"
                placeholder="Enter your name"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
            />

            <h3>Play As</h3>
            <div className={styles.btns}>
                <button 
                   type="button"
                   className={`${game.white.id && styles.btn_selected} display_btn`}
                    onClick={
                        () => setGame(prev => ({
                            ...prev,
                            white: { id: userId, username: ''},
                            black: { id: '', username: ''}
                        }))
                    }
                >White</button>
                <button type="button"
                    className={`${game.black.id && styles.btn_selected} display_btn`}
                    onClick={
                        () => setGame(prev => ({
                            ...prev,
                            black: { id: userId, username: ''},
                            white: { id: '', username: ''},
                        }))
                    }
                >Black</button>
            </div>
            <div className={styles.btns}>
                <button
                  type="button"
                  className={`${game.time === 3 && styles.btn_selected} display_btn`}
                  onClick={() => setGame(prev => ({ ...prev, time: 3 }))}
                  >3 min</button>
                <button
                  type="button"
                  className={`${game.time === 5 && styles.btn_selected} display_btn`}
                  onClick={() => setGame(prev => ({ ...prev, time: 5 }))}>5 min</button>
                <button
                  type="button"
                  className={`${game.time === 10 && styles.btn_selected} display_btn`}
                  onClick={() => setGame(prev => ({ ...prev, time: 10 }))}>10 min</button>
                <button
                  type="button"
                  className={`${game.time === 30 && styles.btn_selected} display_btn`}
                  onClick={() => setGame(prev => ({ ...prev, time: 30 }))}>30 min</button>
            </div>
            <button
              type="submit"
              className="display_btn"
            >Start Game</button>
        </form>
    );
};

export default CreateGame;