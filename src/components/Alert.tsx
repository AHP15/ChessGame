import { useState } from 'react';
import styles from '../styles/Alert.module.css';

const Alert = ({gameId}: { gameId: string }) => {
    const [id, setId] = useState(gameId);

    if(!id) return null;

    return (
        <div className={styles.alert}>
            <p>Copy the following game id with the person you want to play: </p>
            <span>{id}</span>
            <button className="display_btn" onClick={() => setId('')} type='button'>Clear</button>
        </div>
    );
};

export default Alert;
