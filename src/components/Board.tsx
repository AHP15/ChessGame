import { useCallback, useEffect, useState } from 'react';

import getMatrix from '../gameLogic/matrix';
import {
    PieceType,
    Pieces,
    promotionPiecesForWhite,
    promotionPiecesForBlack
} from '../gameLogic/initialPieces';
import Square, { PieceTypeWithPublicName } from './Square';

import styles from '../styles/Board.module.css';
import { PossibleSquare } from '../gameLogic/utils';
import { useSocket } from '../context/socket';
import Promotion from './Promotion';


export interface Game {
    id: string,
    player: string,
    pieces: Pieces,
    king: PieceType | any,
    selectedPiece: PieceTypeWithPublicName | any,
    possibleSquares: PossibleSquare[],
    promotionPieces: (string | PieceType)[][],
    showPromotions: boolean
};

const Board = ({ player }: { player: string }) => {
    const piecesData = new Map(JSON.parse(localStorage.getItem('pieces')as string)) as Pieces;
    const gameData = JSON.parse(localStorage.getItem('game')as string);
    
    const [game, setGame] = useState<Game>({
        id: gameData.id,
        player,
        pieces: piecesData,
        king: player === 'white' ? piecesData.get('KGE1'): piecesData.get('KGD8'),
        selectedPiece: null,
        possibleSquares: [],
        promotionPieces: player === 'white'? [...promotionPiecesForWhite.entries()] : [...promotionPiecesForBlack.entries()],
        showPromotions: false,
    });
    const socket = useSocket();

    const changePossibleSquares = useCallback((squares: PossibleSquare[]) => setGame(prev => ({
        ...prev,
        possibleSquares: squares, // get squares from event handler inside Square.tsx
    })), []);

    const changeSelectedPiece = useCallback((piece: PieceTypeWithPublicName | null) => setGame(prev => ({
        ...prev,
        selectedPiece: piece,
    })), []);

    const changePieces = useCallback((pieces: Pieces, isPromostion: boolean = false) => {
        let promotionAvailable = false;
        [...pieces.values()].forEach((piece: PieceType) => {
            if(player === 'white' && piece.name === 'WP' && piece.y === 7) {
                promotionAvailable = true;
            }
            else if(player !== 'white' && piece.name === 'BP' && piece.y === 0) {
                promotionAvailable = true;
            }
        });

        setGame(prev => ({
            ...prev,
            possibleSquares: [], //reset possibleSquares
            selectedPiece: null,
            pieces,
            showPromotions: promotionAvailable
        }));
        socket.emit('send-move', { gameId: game.id, pieces: [... pieces.entries()] });
        localStorage.setItem('pieces', JSON.stringify([... pieces.entries()]));

        if(!isPromostion) {
            localStorage.setItem(
                'inTurn',
                JSON.stringify(!JSON.parse(localStorage.getItem('inTurn') as string))
            );
        }
    }, []);


    useEffect(() => {
        socket.on('move-recieved', (pieces) => {
            setGame(prev => ({
                ...prev,
                pieces: new Map(pieces),
            }));
            localStorage.setItem('pieces', JSON.stringify([... pieces.entries()]));
            localStorage.setItem(
                'inTurn',
                JSON.stringify(!JSON.parse(localStorage.getItem('inTurn') as string))
            );
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

            {
                game.showPromotions && (
                    <div className={styles.promotions}>
                        {
                            game.promotionPieces.map(([key, piece]) => (
                                <Promotion
                                    key={key as KeyType}
                                    pieces={game.pieces}
                                    setPieces={changePieces}
                                    publicName={key as string}
                                    piece={piece as PieceType}
                                />
                            ))
                        }
                    </div>
                )
            }
        </div>
    );
};
export default Board;
