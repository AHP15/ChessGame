import { PieceType, Pieces } from './initialPieces';
import { PossibleSquare, traverseChessLine } from './utils';


export default function calculatePossibleMovesforBishops(
    piece: PieceType, pieces: Pieces
): PossibleSquare[] {
    let moves: PossibleSquare[] = [];

    let testLineToRightTop = traverseChessLine(
        piece,
        pieces,
        (x, y) => x <= 7 && y <= 7,
        x => ++x,
        y => ++y
    );

    let testLineToLeftBottom = traverseChessLine(
        piece,
        pieces,
        (x, y) => x >= 0 && y >= 0,
        x => --x,
        y => --y
    );

    let testLineToLeftTop = traverseChessLine(
        piece,
        pieces,
        (x, y) => x >= 0 && y <= 7,
        x => --x,
        y => ++y
    );

    let testLineToRightBottom = traverseChessLine(
        piece,
        pieces,
        (x, y) => x <= 7 && y >= 0,
        x => ++x,
        y => --y
    );

    moves = [
        ...testLineToRightTop,
        ...testLineToLeftBottom,
        ...testLineToLeftTop,
        ...testLineToRightBottom
    ];

    return moves; 
}
