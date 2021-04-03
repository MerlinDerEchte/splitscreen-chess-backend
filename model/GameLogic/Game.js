

class Game {
    constructor(
        Board, BoardHistory,winner
    ) {

        this.Board = Board;
        this.BoardHistory = BoardHistory || [];
        this.winner = winner || null;
    }

    copy(){
        const newBoard = this.Board.copy();
        const newBoardHistory = this.BoardHistory.map(board => board.copy());
        const newWinner = this.winner;
        return new Game(newBoard, newBoardHistory, newWinner);
    }


    

}

module.exports = Game