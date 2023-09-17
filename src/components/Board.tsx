import { useState } from 'react';

import getMatrix from '../gameLogic/matrix';
import initialPieces, { Pieces } from '../gameLogic/initialPieces';
import Square from './Square';

import styles from '../styles/Board.module.css';


interface Game {
    pieces: Pieces,
};

const Board = ({ player }: { player: string }) => {
    const [game, setgame] = useState<Game>({
        pieces: initialPieces,
    });

    return (
        <div className={styles[player === 'black' ? 'rotate_board' : 'board']}>
            {
                getMatrix(player).map(row => row.map(square => (
                    <Square
                       key={square.name}
                       pieces={game.pieces}
                       square={square}
                       rotate={player === 'black'}
                    />
                )))
            }
        </div>
    );
};
export default Board;
