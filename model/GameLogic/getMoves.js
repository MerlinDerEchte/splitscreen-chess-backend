
const Types = require('./Types');
const Colors = require('./Colors');
const PieceFilterCondition = require('./PieceFilterCondition');
const PieceFilterConditionTypes = require('./PieceFilterConditionTypes');
const PieceFilter = require('./PieceFilter');
const getPieceMoves = require('./getPieceMoves');
//function getMoves(board, checkForKingSafety) 
function getMoves(board) {
    
    let allMoves = [];

    const p_FilterCondition_Color = new PieceFilterCondition("color", board.turn, PieceFilterConditionTypes.EQUAL);

    const p_Filter = new PieceFilter([p_FilterCondition_Color]);

    let pieces = p_Filter.filter(board.activePieces);

    pieces.forEach((piece) => {
        
        allMoves.push(...getPieceMoves(piece , board));
    });



    return allMoves;

    
}

module.exports = getMoves;