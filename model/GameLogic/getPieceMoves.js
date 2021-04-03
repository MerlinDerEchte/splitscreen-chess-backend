const getPawnMoves = require('./getPawnMoves');
const getKnightMoves = require('./getKnightMoves');
const getKingMoves = require('./getKingMoves');
const getQueenMoves = require('./getQueenMoves');
const getRookMoves = require('./getRookMoves');
const getBishopMoves = require('./getBishopMoves');
const Types = require('./Types');
function getPieceMoves(piece, board){

    if (piece.type === Types.PAWN) {

        return  getPawnMoves(board, piece);

    } else if (piece.type === Types.BISHOP) {

        return  getBishopMoves(board, piece);

    } else if (piece.type === Types.KNIGHT) {

        return  getKnightMoves(board, piece);

    } else if (piece.type === Types.ROOK) {

        return getRookMoves(board, piece);

    } else if (piece.type === Types.QUEEN) {

        return getQueenMoves(board, piece);

    } else if (piece.type === Types.KING) {
        //getKingMoves(board, piece,checkForKingSafety)
        return getKingMoves(board, piece);

    } else {
        return [];
    }
}

module.exports = getPieceMoves;