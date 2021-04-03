const Piece = require('./Piece');

function pieceFactory(obj){
    return new Piece(obj.type, obj.color, obj.hasMoved, obj.position, obj.id, obj.lastPosition);
}

module.exports = createPipieceFactoryece;