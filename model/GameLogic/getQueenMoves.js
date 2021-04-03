const Move = require('./Move');
const getRookMoves = require('./getRookMoves');
const getBishopMoves = require('./getBishopMoves');


function getQueenMoves(board, piece) {
    let possibleQueenMoves = [];
    possibleQueenMoves = [...getBishopMoves(board, piece), ...getRookMoves(board, piece)]
    return possibleQueenMoves;
}

module.exports = getQueenMoves;