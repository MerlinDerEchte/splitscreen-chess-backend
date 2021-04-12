const PieceFilter = require('./PieceFilter');
const PieceFilterCondition = require('./PieceFilterCondition');
const PieceFilterConditionTypes = require('./PieceFilterConditionTypes');
const Colors = require('./Colors');
const isGameOver = require('./isGameOver');
const getBoardAfterMove = require('./getBoardAfterMove');

function makeMove(game, move){
    
    
    const newPiece = move.piece.copy();
    newPiece.move(move.targetPosition);

    const newGame = game.copy();
    const newBoard = getBoardAfterMove(newGame.Board , move) ;
    
    newBoard.isGameOver = isGameOver(newBoard);
    newGame.Board = newBoard;
    newGame.BoardHistory.push(game.Board);
    return newGame;
    
}

module.exports = makeMove;