

const Move = require('./Move');
const Piece = require('./Piece');

function moveFactory(obj) {
    let otherMovedPiece;
    let removePiece;

    const objPiece = obj.piece;
    const piece = new Piece(
        objPiece.type,
        objPiece.color,
        objPiece.hasMoved,
        objPiece.position,
        objPiece.id,
        objPiece.lastPosition);


    const objOtherMovedPiece = obj.otherMovedPiece;
    if (objOtherMovedPiece) {
        otherMovedPiece = new Piece(
            objOtherMovedPiece.type,
            objOtherMovedPiece.color,
            objOtherMovedPiece.hasMoved,
            objOtherMovedPiece.position,
            objOtherMovedPiece.id,
            objOtherMovedPiece.lastPosition);
    }

    const objRemovePiece = obj.removePiece;
    if (objRemovePiece) {
        removePiece = new Piece(
            objRemovePiece.type,
            objRemovePiece.color,
            objRemovePiece.hasMoved,
            objRemovePiece.position,
            objRemovePiece.id,
            objRemovePiece.lastPosition);
    }

    const createdMove = new Move(
        piece,
        obj.targetPosition,
        removePiece,
        otherMovedPiece,
        obj.otherTargetPosition)

    return createdMove
}

module.exports = moveFactory;