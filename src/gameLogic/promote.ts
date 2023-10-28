import { PieceType, Pieces } from './initialPieces';

export function promote (
    pieces: Pieces,
    publicName: string,
    piece: PieceType
) : Pieces {
    for(let [k, v] of pieces.entries()) {
        if(v.name === 'WP' || v.name === 'BP') {
            if(v.y === 7 || v.y === 0) {
                pieces.set(publicName, { ...piece, x: v.x, y: v.y });
                pieces.delete(k);
                break;
            }
        }
    }
    return pieces;
}