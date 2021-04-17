

class Game {
    constructor(
        Board, BoardHistory
    ) {

        this.Board = Board;
        this.BoardHistory = BoardHistory || [];
    }

    copy(){
        const newBoard = this.Board.copy();
        const newBoardHistory = this.BoardHistory.map(board => board.copy());
        
        return new Game(newBoard, newBoardHistory, newWinner);
    }
}

module.exports = Game