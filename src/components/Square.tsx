import { PieceType, Pieces } from '../gameLogic/initialPieces';
import { SquareType } from '../gameLogic/matrix';
import possibleSquares from '../gameLogic/possibleSquare';
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
const Square = (
    { game, square, rotate, setPossibleSquares }
        : { game: Game, square: SquareType, rotate: boolean, setPossibleSquares: changePossibleSquares}
) => {

    const piece: PieceTypeWithPublicName | null = getPiece(game.pieces, square);
    const possibleSquare: boolean = isPossibleSquare(game.possibleSquares, square);

    const handleClick = () => {
        if(!piece) return;
        let test = possibleSquares(game.pieces, piece, game.king);
        console.log(test)
        setPossibleSquares(test);
    };

    return (
        <div
            onClick={handleClick}
            style={{ backgroundColor: square.background }}
            className={styles[rotate ? 'rotate_square' : 'square']}
        >
            {piece && <img
                className={styles.image_piece}
                src={`./${piece.info.image}`}
                alt={piece.info.name}
            />}

            {
                possibleSquare && 'Poss'
            }
        </div>
    );
};

export default Square;
