import { useCallback, useEffect, useState } from 'react';

import getMatrix from '../gameLogic/matrix';
import { PieceType, Pieces } from '../gameLogic/initialPieces';
import Square, { PieceTypeWithPublicName } from './Square';

import styles from '../styles/Board.module.css';
import { PossibleSquare } from '../gameLogic/utils';
import { useSocket } from '../context/socket';


export interface Game {
    id: string,
    player: string,
    pieces: Pieces,
    king: PieceType | any,
    selectedPiece: PieceTypeWithPublicName | any,
    possibleSquares: PossibleSquare[],
    inTurn: boolean,
};


const Board = ({ player, inTurn }: { player: string, inTurn: boolean }) => {
    const piecesData = new Map(JSON.parse(localStorage.getItem('pieces')as string)) as Pieces;
    const gameData = JSON.parse(localStorage.getItem('game')as string);
    
    const [game, setGame] = useState<Game>({
        id: gameData.id,
        player,
        pieces: piecesData,
        king: player === 'white' ? piecesData.get('KGE1'): piecesData.get('KGD8'),
        selectedPiece: null,
        possibleSquares: [],
        inTurn,
    });
    const socket = useSocket();

    const changePossibleSquares = useCallback((squares: PossibleSquare[]) => setGame(prev => ({
        ...prev,
        possibleSquares: squares, // get squares from event handler inside Square.tsx
    })), []);

    const changeSelectedPiece = useCallback((piece: PieceTypeWithPublicName | null) => setGame(prev => ({
        ...prev,
        selectedPiece: piece
    })), []);

    const changePieces = useCallback((pieces: Pieces) => {
        setGame(prev => ({
            ...prev,
            possibleSquares: [], //reset possibleSquares
            selectedPiece: null,
            pieces,
            onTurn: !prev.inTurn,
        }));
        socket.emit('send-move', { gameId: game.id, pieces: [... pieces.entries()] });
        localStorage.setItem('pieces', JSON.stringify([... pieces.entries()]));
        localStorage.setItem('inTurn', JSON.stringify(game.inTurn));
    }, []);

    useEffect(() => {
        socket.on('move-recieved', (pieces) => {
            setGame(prev => ({
                ...prev,
                pieces: new Map(pieces),
                onTurn: !prev.inTurn,
            }));
            localStorage.setItem('pieces', JSON.stringify([... pieces.entries()]));
            localStorage.setItem('inTurn', JSON.stringify(game.inTurn));
        });
    }, []);

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
