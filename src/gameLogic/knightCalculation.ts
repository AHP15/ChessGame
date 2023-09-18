import { PieceType, Pieces } from './initialPieces';
import squareInfo from './squareInfo';
import { PossibleSquare } from './utils';

export default function calculatePossibleMovesforKnights(
    piece: PieceType, pieces: Pieces
): PossibleSquare[] {

    let X = piece.x
    let Y = piece.y
    let color = piece.color;

    let allPositions = [
        {x: X+1, y: Y+2},
        {x: X-1, y: Y+2},
        {x: X+1, y: Y-2},
        {x: X-1, y: Y-2},
        {x: X+2, y: Y+1},
        {x: X-2, y: Y+1},
        {x:X+2, y: Y-1},
        {x:X-2, y: Y-1},
    ];

    let moves = allPositions.filter(position => {
        let {freeSquare, capturingPossible} = squareInfo(
            position, color, pieces
        );
        return freeSquare || capturingPossible;
    });

    return moves;
}
