import { useEffect, useState } from 'react';
import { useSocket } from '../context/socket';
import styles from '../styles/PlayerInfo.module.css';

const PlayerInfo = (
    { username, time, player }: { username: string, time: number, player: string }
) => {
    const socket = useSocket();
    const [name, setName] = useState(() => username !== '' ? username: 'Guest');

    const [timePassed, setTimePassed] = useState({
        seconds: 0,
        minutes: time
    });

    useEffect(() => {
        socket.on('joined-game',() => {
            if(username) return;
            const game = JSON.parse(localStorage.getItem('game') as string);
            setName(game[player].username);
        });

        socket.on('time', ({time, white}) => {
            if(white && player !== 'white') return;
            if(!white && player === 'white') return;
            setTimePassed(time);
        });
    }, []);

    return (
        <div className={styles.player}>
            <h3 className={styles.username}>{name}</h3>
            <h3>
                {timePassed.minutes}
                :{timePassed.seconds < 10 ? `0${timePassed.seconds}`: timePassed.seconds}
            </h3>
        </div>
    );
};
export default PlayerInfo;
