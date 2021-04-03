const Move = require('./Move');
const Types = require('./Types');
function getKingMoves(board, piece) {

    let possibleMovesKing = [];
    let kingRow = Math.floor(piece.getPosition() / 8);
    let kingCol = piece.getPosition() % 8;
    const possibleKingTargetsAsRowCol = [[kingRow + 1, kingCol + 1], [kingRow + 1, kingCol + 0], [kingRow + 1, kingCol - 1],
    [kingRow, kingCol - 1], [kingRow, kingCol + 1],
    [kingRow - 1, kingCol + 1], [kingRow - 1, kingCol], [kingRow - 1, kingCol - 1]];

    possibleKingTargetsAsRowCol.forEach((pos) => {
        if (pos[0] > -1 && pos[1] > -1 && pos[0] < 8 && pos[1] < 8) {
            const nextPosition = pos[0] * 8 + pos[1];
            const pieceOnTarget = board.getPieceByPosition(nextPosition);

            if (pieceOnTarget === null) {
                possibleMovesKing.push(new Move(piece, nextPosition));
            } else if (pieceOnTarget.color !== piece.color) {
                possibleMovesKing.push(new Move(piece, nextPosition, pieceOnTarget));
            }
        }
    })

    //Rochade


    //if (checkForKingSafety === true) {

   /*  const kingOneToTheLeft = piece.copy();
    kingOneToTheLeft.move(piece.getPosition() - 1);


    const kingTwoToTheLeft = piece.copy();
    kingTwoToTheLeft.move(piece.getPosition() - 2)


    const kingOneToTheRight = piece.copy();
    kingOneToTheRight.move(piece.getPosition() + 1);


    const kingTwoToTheRight = piece.copy();
    kingTwoToTheRight.move(piece.getPosition() + 2)


    const newBoard_kingOneToTheLeft = Board.copyWithExchangedPieces([kingOneToTheLeft]);
    const newBoard_kingTwoToTheLeft = Board.copyWithExchangedPieces([kingTwoToTheLeft]);
    const newBoard_kingOneToTheRight = Board.copyWithExchangedPieces([kingOneToTheRight]);
    const newBoard_kingTwoToTheRight = Board.copyWithExchangedPieces([kingTwoToTheRight]); */


    if (piece.hasMoved === false &&
        /* isKingSave(Board) === true &&
        isKingSave(newBoard_kingOneToTheLeft) === true &&
        isKingSave(newBoard_kingTwoToTheLeft) === true && */
        board.getPieceByPosition(piece.getPosition() - 1) === null &&
        board.getPieceByPosition(piece.getPosition() - 2) === null &&
        board.getPieceByPosition(piece.getPosition() - 3) === null &&
        board.getPieceByPosition(piece.getPosition() - 4) !== null &&
        board.getPieceByPosition(piece.getPosition() - 4).type === Types.ROOK &&
        board.getPieceByPosition(piece.getPosition() - 4).hasMoved === false) {
        possibleMovesKing.push(new Move(piece, piece.getPosition() - 2, null, board.getPieceByPosition(piece.getPosition() - 4), piece.getPosition() - 1))
    }
    if (piece.hasMoved === false &&
        /* isKingSave(Board) === true &&
        isKingSave(newBoard_kingOneToTheRight) === true &&
        isKingSave(newBoard_kingTwoToTheRight) === true && */
        board.getPieceByPosition(piece.getPosition() + 1) === null &&
        board.getPieceByPosition(piece.getPosition() + 2) === null &&

        board.getPieceByPosition(piece.getPosition() + 3) !== null &&
        board.getPieceByPosition(piece.getPosition() + 3).type === Types.ROOK &&
        board.getPieceByPosition(piece.getPosition() + 3).hasMoved === false) {
        possibleMovesKing.push(new Move(piece, piece.getPosition() + 2, null, board.getPieceByPosition(piece.getPosition() + 3), piece.getPosition() + 1));
    }
    //}
    return possibleMovesKing;
}

module.exports = getKingMoves;