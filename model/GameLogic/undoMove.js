const Game = require('./Game');


function undoMove(Game){
    if(Game.Board.round > 0){
        const newGame = Game.copy();
        newGame.Board = newGame.BoardHistory.pop();
     
        return newGame
    }
}

module.exports = undoMove