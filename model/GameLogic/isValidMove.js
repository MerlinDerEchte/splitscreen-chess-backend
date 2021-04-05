
const Types = require('./Types');
const Move = require('./Move');
const getMoves = require('./getMoves');
const getBoardAfterMove = require('./getBoardAfterMove');
const isKingAttacked = require('./isKingAttacked');
function isValidMove(move, board) {

    if (move.piece.type === Types.KING) {
        //Rochade 
        if (move.otherMovedPiece) {

            // if king is attacked you can't move him 
            if(isKingAttacked(board)){
                return false;
            }

            // check for Each field if move would be possible
            if (move.targetPosition === move.piece.getPosition() - 2) {
                for (let i = 1; i < 3; i++) {
                    const newMove = new Move(move.piece, move.piece.getPosition() - i);

                    if (!isValidMove(newMove, board)) return false;
                }
            } else if (move.targetPosition === move.piece.getPosition() + 2) {
                for (let i = 1; i < 3; i++) {
                    const newMove = new Move(move.piece, move.piece.getPosition() + i);

                    if (!isValidMove(newMove, board)) return false;
                }
            }
        }
    }


    // get POsition of the King and check if 

    
    const newBoard = getBoardAfterMove( board, move);
    const king = newBoard.getKing(board.turn);
    const enemyMoves = getMoves(newBoard);

    for (let enemyMove of enemyMoves) {
        if (enemyMove.targetPosition === king.getPosition()) {
            return false
        }
    }

    return true;
}

module.exports = isValidMove;