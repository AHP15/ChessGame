import { Display } from '../App';
import initialPieces from '../gameLogic/initialPieces';
import styles from '../styles/Home.module.css';


localStorage.setItem('pieces', JSON.stringify([...initialPieces.entries()]))

const Home = ({ setDisplay }: { setDisplay: (display: Display) => void }) => {
    return (
        <div className={styles.home}>
            <img src="/pawn.png" alt="pawn icon" />
            <button className="display_btn" type="button" onClick={() => setDisplay(Display.joinGame)}>
                Join Game
            </button>
            <button className="display_btn" type="button" onClick={() => setDisplay(Display.createGame)}>
                Create New Game
            </button>
        </div>
    );
};
export default Home;
