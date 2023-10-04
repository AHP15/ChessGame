import { useGame } from '../context/game';
import styles from '../styles/Home.module.css';
import { FormEvent, useState } from 'react';

const Home = () => {
    const [state, setState] = useState({
        username: '',
        player: '',
        time: 0,
    });

    const { startGame } = useGame();

    const handleSubmit = (e: FormEvent) => {
       e.preventDefault();
       startGame(state);
    };

    return (
        <div className={styles.home}>
            <h1>Chess</h1>
            <form onSubmit={handleSubmit}>
                <input
                   type="text"
                   value={state.username}
                   onChange={(e) => setState((prev) => ({ ...prev, username: e.target.value }))}
                   placeholder="Enter your name"
                />
                <h3>Play As</h3>
                <div className={styles.btns}>
                    <button type="button" onClick={() => setState(prev => ({ ...prev, player: 'white' }))}>White</button>
                    <button type="button" onClick={() => setState(prev => ({ ...prev, player: 'black' }))}>Black</button>
                </div>
                <div className={styles.btns}>
                    <button type="button" onClick={() => setState(prev => ({ ...prev, time: 3 }))}>3 min</button>
                    <button type="button" onClick={() => setState(prev => ({ ...prev, time: 5 }))}>5 min</button>
                    <button type="button" onClick={() => setState(prev => ({ ...prev, time: 10 }))}>10 min</button>
                    <button type="button" onClick={() => setState(prev => ({ ...prev, time: 30 }))}>30 min</button>
                </div>
                <button type="submit" className={styles.submit_btn}>Start Game</button>
            </form>
        </div>
    );
};
export default Home;
