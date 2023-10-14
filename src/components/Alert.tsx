import { useState } from 'react';
import styles from '../styles/Alert.module.css';

const Alert = ({gameId}: { gameId: string }) => {
    const [alert, setAlert] = useState(
        () => `Copy the following game id: ${gameId} with the person you want to play with `
    );

    if(!alert) return null;

    return (
        <div className={styles.alert}>
            {alert}
            <button onClick={() => setAlert('')} type='button'>Clear</button>
        </div>
    );
};

export default Alert;
