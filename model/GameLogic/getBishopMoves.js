
const Move = require('./Move');

function getBishopMoves(board, piece) {
    
    let possibleMovesBishop = [];

    let bishopRow = Math.floor(piece.getPosition() / 8);
    let bishopCol = piece.getPosition() % 8;
    let continueCountingBishop = true

    //bot left
    for (let i = 1; continueCountingBishop; i++) {

        let nextCol = bishopCol - i;
        let nextRow = bishopRow - i;
        let nextPosition = nextRow * 8 + nextCol;
        const pieceOnTarget = board.getPieceByPosition(nextPosition);

        if (nextRow < 8 && nextRow > -1 && nextCol < 8 && nextCol > -1 &&
            pieceOnTarget === null
        ) {
            possibleMovesBishop.push(new Move(piece, nextPosition));
        } else if (nextRow < 8 && nextRow > -1 && nextCol < 8 && nextCol > -1 &&
            pieceOnTarget.color !== piece.color
        ) {
            possibleMovesBishop.push(new Move(piece, nextPosition, pieceOnTarget))
            continueCountingBishop = false;
        } else {
            continueCountingBishop = false;
        }
    }

    //bot right
    continueCountingBishop = true;
    for (let i = 1; continueCountingBishop; i++) {
        let nextCol = bishopCol + i
        let nextRow = bishopRow - i;
        let nextPosition = nextRow * 8 + nextCol;
        const pieceOnTarget = board.getPieceByPosition(nextPosition);

        if (nextRow < 8 && nextRow > -1 && nextCol < 8 && nextCol > -1 &&
            pieceOnTarget === null
        ) {
            possibleMovesBishop.push(new Move(piece, nextPosition))
        } else if (nextRow < 8 && nextRow > -1 && nextCol < 8 && nextCol > -1 &&
            pieceOnTarget.color !== piece.color
        ) {
            possibleMovesBishop.push(new Move(piece, nextPosition, pieceOnTarget))
            continueCountingBishop = false;
        } else {
            continueCountingBishop = false;
        }
    }


    //top left 
    continueCountingBishop = true;
    for (let i = 1; continueCountingBishop; i++) {
        let nextCol = bishopCol - i
        let nextRow = bishopRow + i;
        let nextPosition = (nextRow * 8) + nextCol;
        const pieceOnTarget = board.getPieceByPosition(nextPosition);
        if (nextRow < 8 && nextRow > -1 && nextCol < 8 && nextCol > -1 &&
            pieceOnTarget === null
        ) {
            possibleMovesBishop.push(new Move(piece, nextPosition))
        } else if (nextRow < 8 && nextRow > -1 && nextCol < 8 && nextCol > -1 &&
            pieceOnTarget.color !== piece.color
        ) {
            possibleMovesBishop.push(new Move(piece, nextPosition, pieceOnTarget))
            continueCountingBishop = false;
        } else {
            continueCountingBishop = false;
        }
    }
    // top right
    continueCountingBishop = true;
    for (let i = 1; continueCountingBishop; i++) {
        let nextCol = bishopCol + i
        let nextRow = bishopRow + i;
        let nextPosition = (nextRow * 8) + nextCol;
        const pieceOnTarget = board.getPieceByPosition(nextPosition);

        if (nextRow < 8 && nextRow > -1 && nextCol < 8 && nextCol > -1 &&
            pieceOnTarget === null
        ) {
            possibleMovesBishop.push(new Move(piece, nextPosition))
        } else if (nextRow < 8 && nextRow > -1 && nextCol < 8 && nextCol > -1 &&
            pieceOnTarget.color !== piece.color
        ) {
            possibleMovesBishop.push(new Move(piece, nextPosition, pieceOnTarget))
            continueCountingBishop = false;
        } else {
            continueCountingBishop = false;
        }
    }
    return possibleMovesBishop;
}

module.exports = getBishopMoves;