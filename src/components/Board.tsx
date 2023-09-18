import { useCallback, useState } from 'react';

import getMatrix from '../gameLogic/matrix';
import initialPieces, { PieceType, Pieces } from '../gameLogic/initialPieces';
import Square, { PieceTypeWithPublicName } from './Square';

import styles from '../styles/Board.module.css';
import { PossibleSquare } from '../gameLogic/utils';


export interface Game {
    player: string,
    pieces: Pieces,
    king: PieceType | any,
    selectedPiece: PieceTypeWithPublicName | any,
    possibleSquares: PossibleSquare[]
};


const Board = ({ player }: { player: string }) => {
    const [game, setGame] = useState<Game>({
        player,
        pieces: initialPieces,
        king: player === 'white' ? initialPieces.get('KGE1'): initialPieces.get('KGD8'),
        selectedPiece: null,
        possibleSquares: [],
    });

    const changePossibleSquares = useCallback((squares: PossibleSquare[]) => setGame(prev => ({
        ...prev,
        possibleSquares: squares, // get squares from event handler inside Square.tsx
    })), []);

    const changeSelectedPiece = useCallback((piece: PieceTypeWithPublicName | null) => setGame(prev => ({
        ...prev,
        selectedPiece: piece
    })), []);

    const changePieces = useCallback((pieces: Pieces) => setGame(prev => ({
        ...prev,
        possibleSquares: [], //reset possibleSquares
        selectedPiece: null,
        pieces
    })), []);

    return (
        <div className={styles[player === 'black' ? 'rotate_board' : 'board']}>
            {
                getMatrix().map(row => row.map(square => (
                    <Square
                        key={square.name}
                        game={game}
                        setPossibleSquares={changePossibleSquares}
                        setSelectedPiece={changeSelectedPiece}
                        setPieces={changePieces}
                        square={square}
                        rotate={player === 'black'}
                    />
                )))
            }
        </div>
    );
};
export default Board;
