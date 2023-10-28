import { PieceTypeWithPublicName } from '../components/Square';
import { Pieces } from './initialPieces';
import { SquareType } from './matrix';


export default function submitMove(
    pieces: Pieces,
    piece: PieceTypeWithPublicName,
    newSquare: SquareType,
): Pieces {
 
    for(let [k,p] of pieces.entries()){
        if(p.x === newSquare.x && p.y === newSquare.y){
            pieces.delete(k);
        }
    }

    let pieceWithNewPosition = {
        ...piece.info,
        x: newSquare.x,
        y: newSquare.y,
    };

    let pieceName = piece.info.name;
    switch(pieceName) {
        case 'WR':
        case 'BR':
        case 'WKG':
        case 'BKG':
            pieceWithNewPosition.isFirstMove = false;
            break;
        case 'WP':
        case 'BP':
            pieceWithNewPosition.isFirstMove = false;
            if(pieceWithNewPosition.y === 7 || pieceWithNewPosition.y === 0) {
                pieceWithNewPosition.canPromote = true;
            }
    }

    //See if this move is castling moving
    //If so: move the rook too
    if(pieceName === "WKG" || pieceName === "BKG") {

        let rightCastlingXvalue = 6;
        let rightCastlingYvalue = 0;

        let leftCastlingXvalue = 2;
        let leftCastlingYvalue = 0;

        if(newSquare.x === rightCastlingXvalue && newSquare.y === rightCastlingYvalue) { // it is a right castling
            let rightRook: any = pieceName === 'WKG' ? pieces.get('RH1') : pieces.get('RH8');
            let rightRookName = pieceName === 'WKG' ? 'RH1' : 'RH8';

            pieces.set(rightRookName, { ...rightRook, x: newSquare.x - 1 });
        }

        if(newSquare.x === leftCastlingXvalue && newSquare.y === leftCastlingYvalue) { // it is a left castling
            let leftRook: any = pieceName === 'WKG' ? pieces.get('RA1') : pieces.get('RA8');
            let leftRookName = pieceName === 'WKG' ? 'RA1' : 'RA8';
            
            pieces.set(leftRookName, { ...leftRook, x: newSquare.x + 1 });
        }
    }

    pieces.set(piece.publicName, pieceWithNewPosition);

    return pieces;
}