

const getMoves = require('./getMoves');
const isValidMove = require('./isValidMove');

function getValidMoves(board){

    const allMoves = getMoves(board);
    
    
    const allValidMoves = allMoves.filter(move => {
        return isValidMove(move,board);
    })    
    return allValidMoves;

}

module.exports = getValidMoves;