
const PieceFilterConditionTypes = require('./PieceFilterConditionTypes');
const PieceFilterCondition = require('./PieceFilterCondition');
const PieceFilter = require('./PieceFilter');
const Types = require('./Types');
const Colors = require('./Colors');
class Board {

    constructor(activePieces, graveyardPieces, turn, round, lastMovedPiece,isGameOver) {
        this.activePieces = activePieces;
        this.graveyardPieces = graveyardPieces;
        this.turn = turn;
        this.round = round;
        this.lastMovedPiece = lastMovedPiece;
        this.isGameOver = isGameOver;
    }

    getPieceByPosition(position) {

        const position_FilterCondition = new PieceFilterCondition('position', position, PieceFilterConditionTypes.EQUAL);
        const positionFilter = new PieceFilter([position_FilterCondition]);
        const pieces = positionFilter.filter(this.activePieces);

        if (pieces.length > 0) {
            return pieces[0];
        } else {
            return null;
        }
    }


    getKing(color) {

        const type_King_FilterCondition = new PieceFilterCondition('type', Types.KING, PieceFilterConditionTypes.EQUAL);
        const color_FilterCondition = new PieceFilterCondition('color', color, PieceFilterConditionTypes.EQUAL);
        const kingFilter = new PieceFilter([type_King_FilterCondition, color_FilterCondition]);

        const pieces = kingFilter.filter(this.activePieces);
        if (pieces.length > 0) {
            return pieces[0]
        } else {
            return null
        }
    }

    getTurn() {
        return this.turn;
    }

    switchTurn(){

        if(this.turn === Colors.WHITE){
            this.turn = Colors.BLACK;
        }else{
            this.turn = Colors.WHITE;
        }
    }


    copy() {

        const newActivePieces = this.activePieces.map(p => p.copy());
        const newGraveyardPieces = this.graveyardPieces.map(p => p.copy());
        const newTurn = this.turn;
        const newRound = this.round;
        const newLastMovedPiece = this.lastMovedPiece;
        const isGameOver = this.isGameOver;

        return new Board(
            newActivePieces,
            newGraveyardPieces,
            newTurn,
            newRound,
            newLastMovedPiece,
            isGameOver)
    }

    copyWithExchangedPieces(pieces){

        const newBoard = this.copy();
        const idFilterConditions = pieces.map(piece => {
            return(new PieceFilterCondition('id', piece.id, PieceFilterConditionTypes.UNEQUAL));
        });
       
        const idPieceFilter = new PieceFilter(idFilterConditions);
        newBoard.activePieces = idPieceFilter.filter(newBoard.activePieces);
        newBoard.activePieces.push(...pieces);
        return newBoard;
    }

    removePiece(piece){
        
        const idFilterCondition = new PieceFilterCondition('id',piece.id,PieceFilterConditionTypes.UNEQUAL);
        const idFilter = new PieceFilter([idFilterCondition]);
        this.activePieces = idFilter.filter(this.activePieces);
    }

    
}

module.exports = Board;