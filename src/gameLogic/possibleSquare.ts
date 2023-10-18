import { PieceTypeWithPublicName } from '../components/Square';
import calculatePossibleMovesforBishops from './bishopCalculation';
import { PieceType, Pieces } from './initialPieces';
import calculatePossibleMovesforKings, { isKingInCheck } from './kingCalculation';
import calculatePossibleMovesforKnights from './knightCalculation';
import calculatePossibleMovesforPawns from './pawnCalculation';
import calculatePossibleMovesforRooks from './rookCalculation';
import { PossibleSquare } from './utils';

export default function calculatePossibleMoves(
    pieces: Pieces, piece: PieceTypeWithPublicName, king: PieceType
): PossibleSquare[] {

    // if moving this piece will cause a check to the king with the same color
    // then no possibleMoves for this piece: return []
    let moves: PossibleSquare[] = [];
    const { isInCheck, positionsToFilled } = isKingInCheck(king, pieces);

    if(king.color === piece.info.color && king.name !== piece.info.name  && !isInCheck) {
        console.log('ok1')
        const piecesCopy = new Map(pieces);
        piecesCopy.delete(piece.publicName);
        const { isInCheck } = isKingInCheck(king, piecesCopy);

        if(isInCheck) return [];
    }

    switch(piece.info.name) {
        case 'WP':
        case 'BP':
            moves = calculatePossibleMovesforPawns(piece.info, pieces);
            break;
        case 'WR':
        case 'BR':
            moves = calculatePossibleMovesforRooks(piece.info, pieces);
            break;
        case 'WB':
        case 'BB':
            moves = calculatePossibleMovesforBishops(piece.info, pieces);
            break;
        case 'WQ':
        case 'BQ':
            moves = [
                ...calculatePossibleMovesforRooks(piece.info, pieces),
                ...calculatePossibleMovesforBishops(piece.info, pieces)
            ];
            break;
        case 'WKN':
        case 'BKN':
            moves = calculatePossibleMovesforKnights(piece.info, pieces);
            break;
        case 'WKG':
        case 'BKG':
            moves = calculatePossibleMovesforKings(piece.info, pieces);
            break;
        default: return [];
    }

    if(isInCheck) {
        const newMoves: PossibleSquare[] = [];
        console.log(moves, positionsToFilled)
        positionsToFilled.forEach(position => {
            moves.forEach(pos => {
                if(position.x === pos.x && position.y === pos.y) {
                    newMoves.push(position);
                }
            })
        });
        return newMoves;
    }

    return moves;
}