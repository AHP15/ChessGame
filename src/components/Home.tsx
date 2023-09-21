import styles from '../styles/Home.module.css';

const Home = () => {
    return (
        <div className={styles.home}>
            <h1>Chess</h1>
            <form>
                <input type="text" placeholder="Enter your name" />
                <h3>Play As</h3>
                <div className={styles.btns}>
                    <button>White</button>
                    <button>Black</button>
                </div>
                <div className={styles.btns}>
                    <button>3 min</button>
                    <button>5 min</button>
                    <button>10 min</button>
                    <button>30 min</button>
                </div>
                <button type="submit" className={styles.submit_btn}>Start Game</button>
            </form>
        </div>
    );
};
export default Home;
