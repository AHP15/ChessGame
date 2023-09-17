import { PieceTypeWithPublicName } from '../components/Square';
import { PieceType, Pieces } from './initialPieces';
import { PossibleSquare } from './utils';

export default function possibleSquare(
    pieces: Pieces, piece: PieceTypeWithPublicName, king: PieceType
): PossibleSquare[] {

    // if moving this piece will cause a check to the king with the same color
    // then no possibleMoves for this piece: return []
    if(king.color === piece.info.color && king.name !== piece.info.name) {

    }

    switch(piece.info.name) {
        default: return [];
    }
}