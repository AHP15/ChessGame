import { PieceType, Pieces } from '../gameLogic/initialPieces';
import { SquareType } from '../gameLogic/matrix';

import styles from '../styles/Board.module.css';


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

const Square = (
    { pieces, square, rotate }
    :{ pieces: Pieces, square: SquareType, rotate: boolean }
) => {

    const piece: PieceTypeWithPublicName | null = getPiece(pieces, square);

    return (
        <div
            style={{ backgroundColor: square.background }}
            className={styles[rotate ? 'rotate_square' : 'square']}
        >
            {piece && <img
                className={styles.image_piece}
                src={`./${piece.info.image}`}
                alt={piece.info.name}
            />}
        </div>
    );
};

export default Square;
