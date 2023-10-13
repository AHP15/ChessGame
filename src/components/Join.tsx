import { FormEvent, useState } from 'react';
import { useSocket } from '../context/socket';
import { v4 as uuidv4 } from 'uuid';
import { Display } from '../App';

const JoinGame = ({ setDisplay }: { setDisplay: (display: Display) => void }) => {
    const userId = uuidv4();
    const [username, setUsername] = useState('');
    const [gameId, setGameId] = useState('');

    const socket = useSocket();

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        socket.emit('join-game', {username, gameId, userId});
        setDisplay(Display.playGame);
    };

    return(
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
            <input
              type="text"
              placeholder="Enter the Game's id"
              value={gameId}
              onChange={(e) => setGameId(e.target.value)}
            />
            <button type="submit">Join</button>
        </form>
    );
};

export default JoinGame;