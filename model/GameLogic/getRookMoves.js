const Move = require('./Move');


function getRookMoves(board, piece) {
    let possibleMovesRook = [];

    let rookRow = Math.floor(piece.position / 8);
    let rookCol = piece.position % 8;
    let continueCountingRook = true

    //row left
    for (let i = 1; continueCountingRook; i++) {

        let nextCol = rookCol - i;
        let nextPosition = rookRow * 8 + nextCol;

        if (nextCol > -1 &&
            board.getPieceByPosition(nextPosition) === null
        ) {
            possibleMovesRook.push(new Move(piece, nextPosition));
        } else if (nextCol > -1 &&
            board.getPieceByPosition(nextPosition).color !== piece.color
        ) {
            const removedPiece = board.getPieceByPosition(nextPosition);
            possibleMovesRook.push(new Move(piece, nextPosition, removedPiece));
            continueCountingRook = false;
        } else {
            continueCountingRook = false;
        }
    }

    //row right
    continueCountingRook = true;
    for (let i = 1; continueCountingRook; i++) {
        let nextCol = rookCol + i
        let nextPosition = rookRow * 8 + nextCol;

        if (nextCol < 8
            &&
            board.getPieceByPosition(nextPosition) === null
        ) {
            possibleMovesRook.push(new Move(piece, nextPosition));
        } else if (nextCol < 8 &&
            board.getPieceByPosition(nextPosition).color !== piece.color
        ) {
            const removedPiece = board.getPieceByPosition(nextPosition);
            possibleMovesRook.push(new Move(piece, nextPosition, removedPiece));
            continueCountingRook = false;
        } else {
            continueCountingRook = false;
        }
    }


    //col top 
    continueCountingRook = true;
    for (let i = 1; continueCountingRook; i++) {
        let nextRow = rookRow + i;
        let nextPosition = (nextRow * 8) + rookCol;

        if (nextRow < 8 && board.getPieceByPosition(nextPosition) === null
        ) {
            possibleMovesRook.push(new Move(piece, nextPosition));
        } else if (nextRow < 8 && board.getPieceByPosition(nextPosition).color !== piece.color
        ) {
            const removedPiece = board.getPieceByPosition(nextPosition);
            possibleMovesRook.push(new Move(piece, nextPosition, removedPiece));
            continueCountingRook = false;
        } else {
            continueCountingRook = false;
        }
    }
    // col bot
    continueCountingRook = true;
    for (let i = 1; continueCountingRook; i++) {
        let nextRow = rookRow - i;
        let nextPosition = (nextRow * 8) + rookCol;

        if (nextRow > -1 && board.getPieceByPosition(nextPosition) === null
        ) {
            possibleMovesRook.push(new Move(piece, nextPosition));
        } else if (nextRow > -1 && board.getPieceByPosition(nextPosition).color !== piece.color
        ) {
            const removedPiece = board.getPieceByPosition(nextPosition);
            possibleMovesRook.push(new Move(piece, nextPosition, removedPiece));
            continueCountingRook = false;
        } else {
            continueCountingRook = false;
        }
    }

    return possibleMovesRook;
}

module.exports = getRookMoves;