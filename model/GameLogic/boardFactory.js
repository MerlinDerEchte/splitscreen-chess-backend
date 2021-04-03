const Board = require('./Board');
const pieceFactory = require('./pieceFactory');
function boardFactory(obj){

    const activePieces = obj.activePieces.map(piece => pieceFactory(piece));
    const graveyardPieces = obj.graveyardPieces.map(piece => pieceFactory(piece));
    const turn = obj.turn;
    const round = obj.round;
    const lastMvoedPiece = pieceFactory(lastMvoedPiece);
    const isGameOver = obj.isGameOver; 
    return new Board(activePieces,graveyardPieces,turn,round,lastMovedPiece,isGameOver);
}
module.exports  = boardFactory;