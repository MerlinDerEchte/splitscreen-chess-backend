const Move = require('./Move');
const Colors = require('./Colors');
const Types = require('./Types');

function getPawnMoves(board, piece) {
    if (piece.color === Colors.WHITE) {
        let pawnRow = Math.floor(piece.getPosition() / 8);
        let pawnCol = piece.getPosition() % 8;
        let possibleMovesPawn = [];


        if (board.getPieceByPosition(piece.getPosition() + 8) === null) {
            possibleMovesPawn.push(new Move(piece, piece.getPosition() + 8))
            if (board.getPieceByPosition(piece.getPosition() + 16) === null && piece.hasMoved === false) {
                possibleMovesPawn.push(new Move(piece, piece.getPosition() + 16));
            }
        }
        let leftTacklePiece = board.getPieceByPosition(piece.getPosition() + 7);
        if (leftTacklePiece !== null &&
            leftTacklePiece.color === Colors.BLACK &&
            pawnCol > 0) {
            possibleMovesPawn.push(new Move(piece, piece.getPosition() + 7, leftTacklePiece));
        }
        let rightTacklePiece = board.getPieceByPosition(piece.getPosition() + 9);
        if (rightTacklePiece !== null &&
            rightTacklePiece.color === Colors.BLACK &&
            pawnCol < 7) {
            possibleMovesPawn.push(new Move(piece, piece.getPosition() + 9, rightTacklePiece));
        }

        // en passant
        if (board.lastMovedPiece && board.lastMovedPiece.type === Types.PAWN) {

            if (pawnCol === 0) {

                if (
                    board.lastMovedPiece.color === Colors.BLACK &&
                    board.lastMovedPiece.getPosition() === piece.getPosition() + 1 &&
                    board.lastMovedPiece.lastPosition === board.lastMovedPiece.getPosition() + 16) {
                    possibleMovesPawn.push(new Move(piece, piece.getPosition() + 9, board.lastMovedPiece))
                }

            } else if (pawnCol === 7) {

                if (
                    board.lastMovedPiece.color === Colors.BLACK &&
                    board.lastMovedPiece.getPosition() === piece.getPosition() - 1 &&
                    board.lastMovedPiece.lastPosition === board.lastMovedPiece.getPosition() + 16) {
                    possibleMovesPawn.push(new Move(piece, piece.getPosition() + 7,board.lastMovedPiece));
                }

            } else {
                if (
                    board.lastMovedPiece.color === Colors.BLACK &&
                    board.lastMovedPiece.getPosition() === piece.getPosition() + 1 &&
                    board.lastMovedPiece.lastPosition ===board.lastMovedPiece.getPosition() + 16) {
                    possibleMovesPawn.push(new Move(piece, piece.getPosition() + 9,board.lastMovedPiece))
                }


                if (
                    board.lastMovedPiece.color === Colors.BLACK &&
                    board.lastMovedPiece.getPosition() === piece.getPosition() - 1 &&
                    board.lastMovedPiece.lastPosition === board.lastMovedPiece.getPosition() + 16) {
                    possibleMovesPawn.push(new Move(piece, piece.getPosition() + 7,board.lastMovedPiece));
                }

            }
        }
        return (possibleMovesPawn);

    } else if (piece.color === Colors.BLACK) {
        let pawnCol = piece.getPosition() % 8
        let possibleMovesPawn = [];
        if (board.getPieceByPosition(piece.getPosition() - 8) === null) {
            possibleMovesPawn.push(new Move(piece, piece.getPosition() - 8));
            if (board.getPieceByPosition(piece.getPosition() - 16) === null && piece.hasMoved === false) {
                possibleMovesPawn.push(new Move(piece, piece.getPosition() - 16));
            }
        }
        let rightTacklePiece = board.getPieceByPosition(piece.getPosition() - 7);
        if (rightTacklePiece !== null &&
            rightTacklePiece.color === Colors.WHITE &&
            pawnCol < 7) {

            possibleMovesPawn.push(new Move(piece, piece.getPosition() - 7, rightTacklePiece));
        }
        let leftTacklePiece = board.getPieceByPosition(piece.getPosition() - 9);
        if (leftTacklePiece !== null &&
            leftTacklePiece.color === Colors.WHITE &&
            pawnCol > 0) {
            possibleMovesPawn.push(new Move(piece, piece.getPosition() - 9, leftTacklePiece));
        }

        // en passant
        if (board.lastMovedPiece && board.lastMovedPiece.type === Types.PAWN) {


            if (pawnCol === 0) {

                if (
                    board.lastMovedPiece.color === Colors.WHITE &&
                    board.lastMovedPiece.getPosition() === piece.getPosition() + 1 &&
                    board.lastMovedPiece.lastPosition === board.lastMovedPiece.getPosition() - 16) {

                    possibleMovesPawn.push(new Move(piece, piece.getPosition() - 7,board.lastMovedPiece));
                }

            } else if (pawnCol === 7) {

                if (
                    board.lastMovedPiece.color === Colors.WHITE &&
                    board.lastMovedPiece.getPosition() === piece.getPosition() - 1 &&
                    board.lastMovedPiece.lastPosition === board.lastMovedPiece.getPosition() - 16) {

                    possibleMovesPawn.push(new Move(piece, piece.getPosition() - 9,board.lastMovedPiece));
                }

            } else {
                if (
                    board.lastMovedPiece.color === Colors.WHITE &&
                    board.lastMovedPiece.getPosition() === piece.getPosition() + 1 &&
                    board.lastMovedPiece.lastPosition === board.lastMovedPiece.getPosition() - 16) {

                    possibleMovesPawn.push(new Move(piece, piece.getPosition() - 7,board.lastMovedPiece));
                }
                if (
                    board.lastMovedPiece.color === Colors.WHITE &&
                    board.lastMovedPiece.getPosition() === piece.getPosition() - 1 &&
                    board.lastMovedPiece.lastPosition === board.lastMovedPiece.getPosition() - 16) {

                    possibleMovesPawn.push(new Move(piece, piece.getPosition() - 9,board.lastMovedPiece));
                }

            }
        }
        return (possibleMovesPawn);

    }
}
module.exports  = getPawnMoves;