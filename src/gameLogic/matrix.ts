
export type SquareType = {
    name: string,
    x: number,
    y: number,
    background: string,
};

type Row = SquareType[];

export default function getMatrix(): Row[] {
    let matrix: Row[] = [];
    let letters = "ABCDEFGH";
    for (let i = 0; i < 8; i++) {
        let row: Row = [];
        for (let j = 0; j < 8; j++) {
            let squareName = letters[j];
            let value = ((i % 2 === 0 && j % 2 === 0) || (i % 2 !== 0 && j % 2 !== 0)) ? "rgb(162, 99, 16)" : "burlywood";
            row.push({
                name: squareName + (i + 1),// addition (i+1), and then concatenation.
                x: j,
                y: i,
                background: value,
            })
        }
        
        matrix.unshift(row);
    }

    return matrix;
}