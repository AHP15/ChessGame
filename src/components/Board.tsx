import { useCallback, useState } from 'react';

import getMatrix from '../gameLogic/matrix';
import initialPieces, { PieceType, Pieces } from '../gameLogic/initialPieces';
import Square from './Square';

import styles from '../styles/Board.module.css';
import { PossibleSquare } from '../gameLogic/utils';


export interface Game {
    pieces: Pieces,
    king: PieceType | any,
    possibleSquares: PossibleSquare[]
};


const Board = ({ player }: { player: string }) => {
    const [game, setGame] = useState<Game>({
        pieces: initialPieces,
        king: player === 'white' ? initialPieces.get('KGE1'): initialPieces.get('KGD8'),
        possibleSquares: [],
    });

    const changePossibleSquares = useCallback((squares: PossibleSquare[]) => setGame(prev => ({
        ...prev,
        possibleSquares: squares, // get squares from event handler inside Square.tsx
    })), []);

    return (
        <div className={styles[player === 'black' ? 'rotate_board' : 'board']}>
            {
                getMatrix().map(row => row.map(square => (
                    <Square
                        key={square.name}
                        game={game}
                        setPossibleSquares={changePossibleSquares}
                        square={square}
                        rotate={player === 'black'}
                    />
                )))
            }
        </div>
    );
};
export default Board;
