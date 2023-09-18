import { PieceType, Pieces } from './initialPieces';
import { PossibleSquare, traverseChessLine } from './utils';

export default function calculatePossibleMovesforRooks(
    piece: PieceType, pieces: Pieces
): PossibleSquare[] {
    let moves: PossibleSquare[] = [];

    let testVerticalLineToTop = traverseChessLine(
        piece,
        pieces,
        (x, y) => x <= 7 && y <= 7,
        x => x,
        y => ++y
    );

    let testVerticalLineToBottom = traverseChessLine(
        piece,
        pieces,
        (x, y) => x >= 0 && y >= 0,
        x => x,
        y => --y
    );

    let testHorizontalLineToLeft = traverseChessLine(
        piece,
        pieces,
        (x, y) => x >= 0 && y >= 0,
        x => --x,
        y => y
    );

    let testHorizontalLineToRight = traverseChessLine(
        piece,
        pieces,
        (x, y) => x <= 7 && y <= 7,
        x => ++x,
        y => y
    );
    
    moves = [
        ...testVerticalLineToTop,
        ...testVerticalLineToBottom,
        ...testHorizontalLineToLeft,
        ...testHorizontalLineToRight
    ];


    return moves;
}