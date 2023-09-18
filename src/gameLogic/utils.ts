import squareInfo from './squareInfo';
import { PieceType, Pieces } from './initialPieces';

export type PossibleSquare = {
    x: number,
    y: number,
};

type Condition = (x: number, y: number) => boolean;
type Effect = (x: number) => number;


export function traverseChessLine(
    piece: PieceType, pieces: Pieces, condition: Condition, effectX: Effect, effectY: Effect
) {
    let moves = [];
    let X = piece.x;
    let Y = piece.y;
    let square;
    
    while(condition(X, Y)){
        X = effectX(X);
        Y = effectY(Y);
        square = {x:X, y:Y};
        let {freeSquare, capturingPossible} = squareInfo(square, piece.color, pieces);

        if(freeSquare || capturingPossible){
            moves.push(square);
        }
        else{
            break;
        }
        if(capturingPossible) break;
    }

    return moves;
}
