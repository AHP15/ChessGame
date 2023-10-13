import { Display } from '../App';

const Home = ({ setDisplay }: { setDisplay: (display: Display) => void }) => {
    return (
        <div>
            <button type="button" onClick={() => setDisplay(Display.joinGame)}>
                Join Game
            </button>
            <button type="button" onClick={() => setDisplay(Display.createGame)}>
                Create New Game
            </button>
        </div>
    );
};
export default Home;
