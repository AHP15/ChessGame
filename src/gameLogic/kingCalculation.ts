import { PieceType, Pieces } from './initialPieces';
import squareInfo from './squareInfo';
import { Condition, Effect, PossibleSquare } from './utils';

const WHITE_COLOR = 'white';

function pieceInSquare(square: PossibleSquare, pieces: Pieces): PieceType | null {
    let data = null;
    for (let piece of pieces.values()) {
        if (piece.x === square.x && piece.y === square.y) {
            data = piece;
        }
    }
    return data;
}

type AttackedBy = {
    white: string[],
    black: string[],
};

function isKingAttacked(
    king: PieceType,
    pieces: Pieces,
    condition: Condition,
    effectX: Effect,
    effectY: Effect,
    attackedBy: AttackedBy
): {
    isInCheck: boolean,
    positionsToFilled: PossibleSquare[],
    attackingPosition: PossibleSquare | null
} {

    let X = king.x;
    let Y = king.y;
    let color = king.color;
    let square;
    let piece: PieceType | null;
    //positions to be filled if there is a check
    let positionsToFilled: PossibleSquare[] = [];
    let isInCheck = false;

    // in the first eteration I should check if the king is attacked by pawns
    let isFirstEteration = true;

    while (condition(X, Y)) {
        X = effectX(X);
        Y = effectY(Y);
        square = { x: X, y: Y };
        piece = pieceInSquare(square, pieces);

        if (color === WHITE_COLOR) {
            positionsToFilled.push(square);
            if (piece && attackedBy.black.indexOf(piece.name) !== -1) {
                isInCheck = true;
            }

            if(isFirstEteration && piece && piece.name === 'BP') {
                isInCheck = true;
            }
        }
        else {
            positionsToFilled.push(square);
            if (piece && attackedBy.white.indexOf(piece.name) !== -1) {
                isInCheck = true;
            }

            if(isFirstEteration && piece && piece.name === 'WP') {
                isInCheck = true;
            }
        }

        if (piece) break;
        isFirstEteration = false;
    }
    return {
        isInCheck,
        positionsToFilled: isInCheck ? positionsToFilled : [],
        attackingPosition: isInCheck? {x: piece!.x, y: piece!.y}: null,
    };
}

export function isKingInCheck(king: PieceType, pieces: Pieces) {
    let positionsToFilled: PossibleSquare[] = [];
    let isInCheck = false;
    let attackingPosition: PossibleSquare | null = null;

    const attackedByQueenOrRook = {
        white: ["WQ", "WR"],//white queen or white rook
        black: ["BQ", "BR"],//black queen or black rook
    };
    const attackedByQueenOrBishop = {
        white: ["WQ", "WB"],//white queen or white bishop
        black: ["BQ", "BB"],//black queen or black bishop
    };

    let isKingAttackedFromTopVerticalLine = isKingAttacked(
        king,
        pieces,
        (x, y) => x <= 7 && y <= 7,
        x => x,
        y => ++y,
        attackedByQueenOrRook
    );
    let isKingAttackedFromBottomVerticalLine = isKingAttacked(
        king,
        pieces,
        (x, y) => x <= 7 && y >= 0,
        x => x,
        y => --y,
        attackedByQueenOrRook
    );
    let isKingAttackedFromLeftHorizontalLine = isKingAttacked(
        king,
        pieces,
        (x, y) => x >= 0 && y <= 7,
        x => --x,
        y => y,
        attackedByQueenOrRook
    );
    let isKingAttackedFromRightHorizontalLine = isKingAttacked(
        king,
        pieces,
        (x, y) => x <= 7 && y <= 7,
        x => ++x,
        y => y,
        attackedByQueenOrRook
    );

    let isKingAttackedFromTopRightLine = isKingAttacked(
        king,
        pieces,
        (x, y) => x <= 7 && y <= 7,
        x => ++x,
        y => ++y,
        attackedByQueenOrBishop
    );
    let isKingAttackedFromTopLeftLine = isKingAttacked(
        king,
        pieces,
        (x, y) => x >= 0 && y <= 7,
        x => --x,
        y => ++y,
        attackedByQueenOrBishop
    );
    let isKingAttackedFromBottomRightLine = isKingAttacked(
        king,
        pieces,
        (x, y) => x <= 7 && y >= 0,
        x => ++x,
        y => --y,
        attackedByQueenOrBishop
    );
    let isKingAttackedFromBottomLeftLine = isKingAttacked(
        king,
        pieces,
        (x, y) => x >= 0 && y >= 0,
        x => --x,
        y => --y,
        attackedByQueenOrBishop
    );


    const ALL_TESTS = [
        isKingAttackedFromTopVerticalLine,
        isKingAttackedFromBottomVerticalLine,
        isKingAttackedFromLeftHorizontalLine,
        isKingAttackedFromRightHorizontalLine,
        isKingAttackedFromTopRightLine,
        isKingAttackedFromTopLeftLine,
        isKingAttackedFromBottomRightLine,
        isKingAttackedFromBottomLeftLine
    ];

    ALL_TESTS.forEach(test => {
        if (test.isInCheck) {
            isInCheck = true;
            positionsToFilled = [...positionsToFilled, ...test.positionsToFilled];
            attackingPosition = test.attackingPosition;
        }
    });

    return { isInCheck, positionsToFilled, attackingPosition };
}


function testCasling(king: PieceType, pieces: Pieces, square: PossibleSquare, effectX: Effect) {
    //The number 2 here represent two squares
    //ether to the right or the left of the board
    let i = 0;
    while (i++ < 2) {
        square = { x: effectX(square.x), y: square.y };
        let { freeSquare } = squareInfo(square, king.color, pieces);
        king = {
            ...king,
            x: square.x,
            y: square.y
        }
        if (!freeSquare || isKingInCheck(king, pieces).isInCheck) return null;
    }
    return square;
}

export default function calculatePossibleMovesforKings(
    piece: PieceType, pieces: Pieces
): PossibleSquare[] {

    let X = piece.x;
    let Y = piece.y;
    let positions = [
        { x: X + 1, y: Y },
        { x: X + 1, y: Y + 1 },
        { x: X, y: Y + 1 },
        { x: X - 1, y: Y + 1 },
        { x: X - 1, y: Y },
        { x: X - 1, y: Y - 1 },
        { x: X, y: Y - 1 },
        { x: X + 1, y: Y - 1 },
    ];
    let king = piece;
    let color = piece.color;

    let moves = positions.filter(position => {
        let { freeSquare, capturingPossible } = squareInfo(
            position, color, pieces
        );
        let kingWithNewPosition = {
            ...king,
            x: position.x,
            y: position.y
        };
        if (isKingInCheck(kingWithNewPosition, pieces).isInCheck) return false;

        return freeSquare || capturingPossible;
    });
    
    
    //test for casling possiblity
    let rightRook = color === WHITE_COLOR ? pieces.get('RH1') : pieces.get('RH8');
    let leftRook = color === WHITE_COLOR ? pieces.get('RA1') : pieces.get('RA8');
    let rightCasling;
    let leftCasling;
    let square = { x: X, y: Y };


    if (piece.isFirstMove && rightRook?.isFirstMove) {
        rightCasling = testCasling(
            king,
            pieces,
            square,
            x => ++x
        );
        if (rightCasling) {
            moves.push(rightCasling)
        }
    }

    if (piece.isFirstMove && leftRook?.isFirstMove) {
        leftCasling = testCasling(
            king,
            pieces,
            square,
            x => --x
        );
        if (leftCasling) {
            moves.push(leftCasling)
        }
    }
    
    return moves;
}
