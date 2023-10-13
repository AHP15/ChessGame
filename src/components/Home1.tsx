import styles from '../styles/Home.module.css';
import { FormEvent, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';

const Home = () => {
    const [state, setState] = useState({
        gameID: uuidv4(),
        white: '',
        black: '',
        time: 0,
    });


    const handleSubmit = (e: FormEvent) => {
       e.preventDefault();
       localStorage.setItem('game', JSON.stringify(state));
    };

    return (
        <div className={styles.home}>
            <h1>Chess</h1>
            <form onSubmit={handleSubmit}>
                <h3>Play As</h3>
                <div className={styles.btns}>
                    <button type="button"
                      onClick={() => setState(prev => ({ ...prev, white: uuidv4() }))}>White</button>
                    <button type="button"
                      onClick={() => setState(prev => ({ ...prev, black: uuidv4() }))}>Black</button>
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
