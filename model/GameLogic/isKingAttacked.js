const getMoves = require("./getMoves");



function isKingAttacked(board){

    const newBoard = board.copy();
    const king = board.getKing(board.turn)
    
    newBoard.switchTurn();
    const allMoves = getMoves(newBoard);

    for( let move of allMoves){
        if(move.targetPosition === king.getPosition) return false;
    }
    return true;
}

module.exports = isKingAttacked;