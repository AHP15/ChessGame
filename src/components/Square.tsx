import { PieceType, Pieces } from '../gameLogic/initialPieces';
import { SquareType } from '../gameLogic/matrix';
import calculatePossibleMoves from '../gameLogic/possibleSquare';
import submitMove from '../gameLogic/submitMove';
import { PossibleSquare } from '../gameLogic/utils';

import styles from '../styles/Board.module.css';
import { Game } from './Board';


export type PieceTypeWithPublicName = {
    publicName: string,
    info: PieceType,
};


function getPiece(pieces: Pieces, square: SquareType): PieceTypeWithPublicName | null {
    for (let [k, v] of pieces.entries()) {
        if (v.x === square.x && v.y === square.y) {
            return {
                publicName: k,
                info: v,
            };
        }
    }
    return null;
}

const isPossibleSquare = (possibleSquares: PossibleSquare[], square: SquareType) => {
    for (let squarePosition of possibleSquares) {
        if (squarePosition?.x === square.x && squarePosition?.y === square.y) {
            return true;
        };
    }
    return false;
}

type changePossibleSquares = (squares: PossibleSquare[]) => void;
type changeSelectedPiece = (piece: PieceTypeWithPublicName | null) => void;
type changePieces = (pieces: Pieces) => void;

const Square = (
    {
        game,
        square,
        rotate,
        setPossibleSquares,
        setSelectedPiece,
        setPieces,
    }:{
        game: Game,
        square: SquareType,
        rotate: boolean,
        setPossibleSquares: changePossibleSquares,
        setSelectedPiece: changeSelectedPiece,
        setPieces: changePieces,
    }
) => {

    const piece: PieceTypeWithPublicName | null = getPiece(game.pieces, square);
    const possibleSquare: boolean = isPossibleSquare(game.possibleSquares, square);

    const handleClick = () => {
        const inTurn = JSON.parse(localStorage.getItem('inTurn') as string);
        if(!inTurn) return;
        /*
         When the player click in a square we have 2 cases:
         a-click on an empty square
         a.1- a and a piece is selected and is not a possible square
         a.2- a and a.1 and the current square is a possible square (from previeus click)

         b-click on a square that has a piece
         b.1- b and piece is a player piece (they have the same color)
         b.2- b and piece isn't a player piece (opponent piece) and a piece is selected and is not a possible square
         b.3- b and piece isn't a player piece (opponent piece) and a piece is selected and is a possible square (from previeus click)
        */
        
        let isPieceSelected = game.selectedPiece;
        let squareContainsPieceOfPlayer = piece?.info.color === game.player;
        //this function reset the selectedPiece and possiblesquares from
        //the game state
        const clear = () => {
            setSelectedPiece(null);
            setPossibleSquares([]);
        }

        // case a:
        if (!piece) {
            // a.1
            if (isPieceSelected && !possibleSquare) return clear();
            // a.2
            if (isPieceSelected && possibleSquare) {
                let calculateNewPieces = submitMove(game.pieces, game.selectedPiece, square);
                //I don't need to clear the selectedPiece and possibleSquares.
                //the setPieces function will do that look at Board.js
                setPieces(calculateNewPieces);
                return;
            }
        }
        // case b:
        else {
            // b.1
            if (squareContainsPieceOfPlayer) {
                let calculatePossiblesquares = calculatePossibleMoves(
                    game.pieces,
                    piece,
                    game.king
                );

                setSelectedPiece(piece);
                setPossibleSquares(calculatePossiblesquares);
                return;
            }
            // b.2
            if (!squareContainsPieceOfPlayer && isPieceSelected && !possibleSquare) {
                return clear();
            }

            if (!squareContainsPieceOfPlayer && isPieceSelected && possibleSquare) {
                let calculateNewPieces = submitMove(game.pieces, game.selectedPiece, square);
                setPieces(calculateNewPieces);
                return;
            }
        }
    };

    return (
        <div
            onClick={handleClick}
            style={{ backgroundColor: square.background }}
            className={styles[rotate ? 'rotate_square' : 'square']}
        >
            {piece && <img
                className={styles.image_piece}
                src={`/${piece.info.image}`}
                alt={piece.info.name}
            />}

            {
                possibleSquare && <div className={styles.possible_square}></div>
            }
        </div>
    );
};

export default Square;
