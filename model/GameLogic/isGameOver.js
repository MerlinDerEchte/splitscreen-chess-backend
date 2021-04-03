const getValidMoves = require('./getValidMoves');


function isGameOver(board){
    const allMoves = getValidMoves(board);

    return allMoves.length === 0;
}

module.exports = isGameOver;