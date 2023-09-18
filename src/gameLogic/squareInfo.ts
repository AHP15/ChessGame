
import { PossibleSquare } from './utils';
import { Pieces } from './initialPieces';

type SquareInfo = {
    freeSquare: boolean,
    capturingPossible: boolean,
};

export default function squareInfo(square: PossibleSquare, color: string, pieces: Pieces): SquareInfo{
    let freeSquare = true, capturingPossible = false;

    for(let piece of pieces.values()){
        if(piece.x === square.x && piece.y === square.y){
            freeSquare = false;
        }
        if(piece.x === square.x && piece.y === square.y && piece.color !== color){
            capturingPossible = true;
        }
    }
    
    return { freeSquare, capturingPossible };
}