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

    let moves: PossibleSquare[] = [];

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

    const { isInCheck, positionsToFilled } = isKingInCheck(king, pieces);
    if(isInCheck && king.name !== piece.info.name) {
        const newMoves: PossibleSquare[] = [];
        positionsToFilled.forEach(position => {
            moves.forEach(pos => {
                if(position.x === pos.x && position.y === pos.y) {
                    newMoves.push(position);
                }
            })
        });
        return newMoves;
    }


    if(king.name !== piece.info.name) {
        let finalMoves: PossibleSquare[] = [];
        const piecesCopy = new Map(pieces);
        let pieceCopy = piece;
        moves.forEach(position => {
            piecesCopy.set(
                pieceCopy.publicName,
                {...pieceCopy.info, x: position.x, y: position.y}
            );
            const { isInCheck, attackingPosition } = isKingInCheck(king, piecesCopy);
            if(!isInCheck) {
                finalMoves.push(position);
            }
            if(attackingPosition) {
                finalMoves.push(attackingPosition);
            }
        });
        return finalMoves;
    }

    return moves;
}