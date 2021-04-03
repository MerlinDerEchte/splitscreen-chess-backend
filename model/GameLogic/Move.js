const Piece = require('./Piece');
class Move{
    constructor(piece, targetPosition, removePiece, otherMovedPiece, otherTargetPosition){
        this.piece = piece.copy();
        this.targetPosition = targetPosition;
        this.removePiece = removePiece;
        this.otherMovedPiece = otherMovedPiece;
        this.otherTargetPosition = otherTargetPosition;
    }
}

module.exports = Move ;