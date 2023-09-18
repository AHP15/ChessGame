import { PieceTypeWithPublicName } from '../components/Square';
import calculatePossibleMovesforBishops from './bishopCalculation';
import { PieceType, Pieces } from './initialPieces';
import calculatePossibleMovesforKnights from './knightCalculation';
import calculatePossibleMovesforRooks from './rookCalculation';
import { PossibleSquare } from './utils';

export default function possibleSquares(
    pieces: Pieces, piece: PieceTypeWithPublicName, king: PieceType
): PossibleSquare[] {

    // if moving this piece will cause a check to the king with the same color
    // then no possibleMoves for this piece: return []
    if(king.color === piece.info.color && king.name !== piece.info.name) {

    }

    switch(piece.info.name) {
        case 'WR':
        case 'BR':
            return calculatePossibleMovesforRooks(piece.info, pieces);
        case 'WB':
        case 'BB':
            return calculatePossibleMovesforBishops(piece.info, pieces);
        case 'WQ':
        case 'BQ':
            return [
                ...calculatePossibleMovesforRooks(piece.info, pieces),
                ...calculatePossibleMovesforBishops(piece.info, pieces)
            ];
        case 'WKN':
        case 'BKN':
            return calculatePossibleMovesforKnights(piece.info, pieces);
        default: return [];
    }
}