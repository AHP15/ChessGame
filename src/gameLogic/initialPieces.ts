export type PieceType = {
    name: string,
    x: number,
    y: number,
    color: string,
    isFirstMove?: boolean,
    canPromote?: boolean,
    image: string,
};

export type Pieces = Map<string, PieceType>;

export const promotionPiecesForWhite: Pieces = new Map<string, PieceType>([
    ['RH1', { name:"WR", x:0, y:0, color:"white", isFirstMove:true, image: 'white-rook.png' }],
    ['KNG1', {name:"WKN", x:0, y:0, color:"white", image: 'right-white-knight.png'}],
    ['BF1', {name:"WB", x:0, y:0, color:"white", image: 'white-bishop.png'}],
    ['QD1', {name:"WQ", x:0, y:0, color:"white", image: 'white-queen.png'}],
]);

export const promotionPiecesForBlack: Pieces = new Map<string, PieceType>([
    ['RA8', {name:"BR", x:0, y:0, color:"black", isFirstMove:true, image: 'black-rook.png'}],
    ['KNB8', {name:"BKN", x:0, y:0, color:"black", image: 'left-black-knight.png'}],
    ['BC8', {name:"BB", x:0, y:0, color:"black", image: 'black-bishop.png'}],
    ['QE8', {name:"BQ", x:0, y:0, color:"black", image: 'black-queen.png'}],
])

export default new Map<string, PieceType>([
    // white rooks
    ['RH1', { name:"WR", x:7, y:0, color:"white", isFirstMove:true, image: 'white-rook.png' }],
    ['RA1', { name:"WR", x:0, y:0, color:"white", isFirstMove:true, image: 'white-rook.png'}],
    // white knights
    ['KNG1', {name:"WKN", x:6, y:0, color:"white", image: 'right-white-knight.png'}],
    ['KNB1', {name:"WKN", x:1, y:0, color:"white", image: 'left-white-knight.png'}],
    // white bishops
    ['BF1', {name:"WB", x:5, y:0, color:"white", image: 'white-bishop.png'}],
    ['BC1', {name:"WB", x:2, y:0, color:"white", image: 'white-bishop.png'}],
    // white queen
    ['QD1', {name:"WQ", x:3, y:0, color:"white", image: 'white-queen.png'}],
    // white king
    ['KGE1', {name:"WKG", x:4, y:0, color:"white", isFirstMove:true, image: 'white-king.png'}],
    // white pawns
    ['PA2', {name:"WP", x:0, y:1, color:"white", isFirstMove:true, canPromote: false, image: 'white-pawn.png'}],
    ['PB2', {name:"WP", x:1, y:1, color:"white", isFirstMove:true, canPromote: false, image: 'white-pawn.png'}],
    ['PC2', {name:"WP", x:2, y:1, color:"white", isFirstMove:true, canPromote: false, image: 'white-pawn.png'}],
    ['PD2', {name:"WP", x:3, y:1, color:"white", isFirstMove:true, canPromote: false, image: 'white-pawn.png'}],
    ['PE2', {name:"WP", x:4, y:1, color:"white", isFirstMove:true, canPromote: false, image: 'white-pawn.png'}],
    ['PF2', {name:"WP", x:5, y:1, color:"white", isFirstMove:true, canPromote: false, image: 'white-pawn.png'}],
    ['PG2', {name:"WP", x:6, y:1, color:"white", isFirstMove:true, canPromote: false, image: 'white-pawn.png'}],
    ['PH2', {name:"WP", x:7, y:1, color:"white", isFirstMove:true, canPromote: false, image: 'white-pawn.png'}],

    // black rooks
    ['RA8', {name:"BR", x:0, y:7, color:"black", isFirstMove:true, image: 'black-rook.png'}],
    ['RH8', {name:"BR", x:7, y:7, color:"black", isFirstMove:true, image: 'black-rook.png'}],
    // black knights
    ['KNB8', {name:"BKN", x:1, y:7, color:"black", image: 'left-black-knight.png'}],
    ['KNG8', {name:"BKN", x:6, y:7, color:"black", image: 'right-black-knight.png'}],
    // black bishops
    ['BC8', {name:"BB", x:2, y:7, color:"black", image: 'black-bishop.png'}],
    ['BF8', {name:"BB", x:5, y:7, color:"black", image: 'black-bishop.png'}],
    // black queen
    ['QE8', {name:"BQ", x:3, y:7, color:"black", image: 'black-queen.png'}],
    // black king
    ['KGD8', {name:"BKG", x:4, y:7, color:"black",isFirstMove:true, image: 'black-king.png'}],
    // back pawns
    ['PA7', {name:"BP", x:0, y:6, color:"black", isFirstMove:true, canPromote: false, image: 'black-pawn.png'}],
    ['PB7', {name:"BP", x:1, y:6, color:"black", isFirstMove:true, canPromote: false, image: 'black-pawn.png'}],
    ['PC7', {name:"BP", x:2, y:6, color:"black", isFirstMove:true, canPromote: false, image: 'black-pawn.png'}],
    ['PD7', {name:"BP", x:3, y:6, color:"black", isFirstMove:true, canPromote: false, image: 'black-pawn.png'}],
    ['PE7', {name:"BP", x:4, y:6, color:"black", isFirstMove:true, canPromote: false, image: 'black-pawn.png'}],
    ['PF7', {name:"BP", x:5, y:6, color:"black", isFirstMove:true, canPromote: false, image: 'black-pawn.png'}],
    ['PG7', {name:"BP", x:6, y:6, color:"black", isFirstMove:true, canPromote: false, image: 'black-pawn.png'}],
    ['PH7', {name:"BP", x:7, y:6, color:"black", isFirstMove:true, canPromote: false, image: 'black-pawn.png'}],
]);