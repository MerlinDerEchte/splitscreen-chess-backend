const Move = require('./Move');


function getKnightMoves(board, piece) {
    let possibleMovesKnight = [];
    let kinghtRow = Math.floor(piece.getPosition() / 8);
    let knightCol = piece.getPosition() % 8;
    const possibleKnightTargetsAsRowCol = [[kinghtRow + 1, knightCol + 2], [kinghtRow + 2, knightCol + 1], [kinghtRow + 1, knightCol - 2], [kinghtRow + 2, knightCol - 1],
    [kinghtRow - 1, knightCol + 2], [kinghtRow - 2, knightCol + 1], [kinghtRow - 1, knightCol - 2], [kinghtRow - 2, knightCol - 1]];
    possibleKnightTargetsAsRowCol.forEach((pos) => {

        if (pos[0] > -1 && pos[1] > -1 && pos[0] < 8 && pos[1] < 8) {
            let nextPosition = pos[0] * 8 + pos[1];
            const pieceOnTarget = board.getPieceByPosition(nextPosition);

            if (pieceOnTarget === null) {
                possibleMovesKnight.push(new Move(piece, nextPosition));
            } else if (pieceOnTarget.color !== piece.color) {
                possibleMovesKnight.push(new Move(piece, nextPosition, pieceOnTarget));
            }
        }
    })
    return (possibleMovesKnight);
}

module.exports = getKnightMoves;