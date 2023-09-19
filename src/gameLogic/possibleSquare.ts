import { PieceTypeWithPublicName } from '../components/Square';
import calculatePossibleMovesforBishops from './bishopCalculation';
import { PieceType, Pieces } from './initialPieces';
import calculatePossibleMovesforKings from './kingCalculation';
import calculatePossibleMovesforKnights from './knightCalculation';
import calculatePossibleMovesforPawns from './pawnCalculation';
import calculatePossibleMovesforRooks from './rookCalculation';
import { PossibleSquare } from './utils';

export default function calculatePossibleMoves(
    pieces: Pieces, piece: PieceTypeWithPublicName, king: PieceType
): PossibleSquare[] {

    // if moving this piece will cause a check to the king with the same color
    // then no possibleMoves for this piece: return []
    if(king.color === piece.info.color && king.name !== piece.info.name) {
        // to be implemented later
    }

    switch(piece.info.name) {
        case 'WP':
        case 'BP':
            return calculatePossibleMovesforPawns(piece.info, pieces);
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
        case 'WKG':
        case 'BKG':
            return calculatePossibleMovesforKings(piece.info, pieces);
        default: return [];
    }
}