const Game = require('./Game');
const Board = require('./Board');
const Types = require('./Types');
const Colors = require('./Colors')
const Piece = require('./Piece');

function newGameFactory(){

    const nextActivePieces = [];
    let i = 0;
    let idIndex = 0;

    for (i; i < 8; i++) {
        nextActivePieces.push(new Piece(Types.PAWN, Colors.WHITE, false, 8 + i, idIndex, null));

        idIndex = idIndex + 1;
    }

    let a = 0
    for (a; a < 2; a++) {
        nextActivePieces.push(new Piece(Types.KNIGHT, Colors.WHITE, false, 1 + a * 5, idIndex, null));
        idIndex = idIndex + 1
    }

    let b = 0
    for (b; b < 2; b++) {
        nextActivePieces.push(new Piece(Types.BISHOP, Colors.WHITE, false, 2 + b * 3, idIndex, null));
        idIndex = idIndex + 1;
    }
    let c = 0;
    for (c; c < 2; c++) {
        nextActivePieces.push(new Piece(Types.ROOK, Colors.WHITE, false, 0 + c * 7, idIndex, null));
        idIndex = idIndex + 1;
    }

    nextActivePieces.push(new Piece(Types.QUEEN, Colors.WHITE, false, 3, idIndex, null));
    idIndex = idIndex + 1;
    nextActivePieces.push(new Piece(Types.KING, Colors.WHITE, false, 4, idIndex, null));
    idIndex = idIndex + 1;

    let d = 0;
    for (d; d < 8; d++) {
        nextActivePieces.push(new Piece(Types.PAWN, Colors.BLACK, false, 48 + d, idIndex, null));
        idIndex = idIndex + 1;
    }

    let e = 0
    for (e; e < 2; e++) {
        nextActivePieces.push(new Piece(Types.KNIGHT, Colors.BLACK, false, 57 + e * 5, idIndex, null));
        idIndex = idIndex + 1
    }

    let f = 0
    for (f; f < 2; f++) {
        nextActivePieces.push(new Piece(Types.BISHOP, Colors.BLACK, false, 58 + f * 3, idIndex, null));
        idIndex = idIndex + 1;
    }
    let g = 0;
    for (g; g < 2; g++) {
        nextActivePieces.push(new Piece(Types.ROOK, Colors.BLACK, false, 56 + g * 7, idIndex, null));
        idIndex = idIndex + 1;
    }

    nextActivePieces.push(new Piece(Types.QUEEN, Colors.BLACK, false, 59, idIndex, null));
    idIndex = idIndex + 1;
    nextActivePieces.push(new Piece(Types.KING, Colors.BLACK, false, 60, idIndex, null));


    const newBoard = new Board(nextActivePieces,[],Colors.WHITE,0,false,null);

    return new Game(newBoard,[]);
}   

module.exports = newGameFactory;