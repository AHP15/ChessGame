import { PieceTypeWithPublicName } from '../components/Square';
import { Pieces } from './initialPieces';
import { SquareType } from './matrix';


export default function submitMove(
    pieces: Pieces, piece: PieceTypeWithPublicName , newSquare: SquareType
): Pieces {
 
    for(let [k,p] of pieces.entries()){
        if(p.x === newSquare.x && p.y === newSquare.y){
            pieces.delete(k);
        }
    }

    // let pieceName = piece.publicName;
    let pieceWithNewPosition = {
        ...piece.info,
        x: newSquare.x,
        y: newSquare.y,
    };

    let pieceName = piece.info.name;
    if(pieceName === 'WP' || pieceName === 'BP') {
        pieceWithNewPosition.isFirstMove = false;

        if(piece.info.x === 0 || piece.info.y === 7) {
            pieceWithNewPosition.canPromote = true;
        }
    }

    if(pieceName === 'WR' || pieceName === 'BR' || pieceName === 'WKG' || pieceName === 'BKG') {
        pieceWithNewPosition.isFirstMove = false;
    }
    
    //See if this move is castling moving
    //If so: move the rook too
    if(pieceName === "WKG" || pieceName === "BKG") {

        let rightCastlingXvalue = 6;
        let leftCastlingXvalue = 2;

        if(newSquare.x === rightCastlingXvalue) { // it is a right castling
            let rightRook: any = pieceName === 'WKG' ? pieces.get('RH1') : pieces.get('RH8');
            let rightRookName = pieceName === 'WKG' ? 'RH1' : 'RH8';

            pieces.set(rightRookName, { ...rightRook, x: newSquare.x - 1 });
        }

        if(newSquare.x === leftCastlingXvalue) { // it is a left castling
            let leftRook: any = pieceName === 'WKG' ? pieces.get('RA1') : pieces.get('RA8');
            let leftRookName = pieceName === 'WKG' ? 'RA1' : 'RA8';
            
            pieces.set(leftRookName, { ...leftRook, x: newSquare.x + 1 });
        }
    }

    pieces.set(piece.publicName, pieceWithNewPosition);

    return pieces;
}