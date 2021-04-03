const Move = require('./Move');
const  Types =  require('./Types');
const Colors = require('./Colors');
const Piece = require('./Piece');
const PieceFilter = require('./PieceFilter');
const PieceFilterCondition = require('./PieceFilterCondition');
const PieceFilterConditionTypes = require('./PieceFilterConditionTypes');


function initializeGame() {

    let nextActivePieces = [];
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




    return {
        activePieces: nextActivePieces,
        activePiecesHistory: [],
        graveyardPieces: [],
        graveyardPiecesHistory: [],
        round: 0,
        turn: Colors.WHITE,
    }
}

function isKingSave(color, pieces) {
    let enemyColor;
    if (color === Colors.WHITE) {
        enemyColor = Colors.BLACK
    } else {
        enemyColor = Colors.WHITE
    }
    let enemyMoves = getAllMoves(pieces, enemyColor, false);

    const king = getKing(pieces, color);

    for (let i = 0; i < enemyMoves.length; i++) {
        if (enemyMoves[i].targetPosition === king.position) {

            return false;
        }
    }

    return true;
}

function isValidMove(activePieces, turn, newMove, lastMovedPiece) {
    const possibleMoves = getAllMoves(activePieces, turn, true, lastMovedPiece);

    const len = possibleMoves.length;

    for (let i = 0; i < len; i++) {
        if (possibleMoves[i].piece.id === newMove.piece.id && possibleMoves[i].targetPosition === newMove.targetPosition) {
            return true;
        }
    }
    return false;
}

function getAllMoves(allPieces, color, checkForKingSafety, lastMovedPiece) {
    let allMoves = [];
    const p_FilterCondition_Color = new PieceFilterCondition("color", color, PieceFilterConditionTypes.EQUAL);

    const p_Filter = new PieceFilter([p_FilterCondition_Color]);

    let pieces = p_Filter.filter(allPieces);

   
    pieces.forEach((piece) => {
        let moves;
        if (piece.type === Types.PAWN) {

            moves = getPawnMoves(pieces, piece, lastMovedPiece);

        } else if (piece.type === Types.BISHOP) {

            moves = getBishopMoves(pieces, piece);

        } else if (piece.type === Types.KNIGHT) {

            moves = getKnightMoves(pieces, piece);

        } else if (piece.type === Types.ROOK) {

            moves = getRookMoves(pieces, piece);

        } else if (piece.type === Types.QUEEN) {

            moves = getQueenMoves(pieces, piece);

        } else if (piece.type === Types.KING) {

            moves = getKingMoves(pieces, piece, checkForKingSafety);

        } else {
            moves = [];
        }
        moves.forEach((move) => {

            let newPiece = { ...piece };
            newPiece.lastPosition = newPiece.position;
            newPiece.position = move.targetPosition;

            let newPieces = replacePiece([...pieces], newPiece);

            if (checkForKingSafety) {

                if (isKingSave(color, newPieces)) {
                    allMoves.push(move);
                }
            } else {

                allMoves.push(move);
            }
        })

    })

    return (allMoves)
}

function getBishopMoves(allPieces, piece) {
    let possibleMovesBishop = [];

    let bishopRow = Math.floor(piece.position / 8);
    let bishopCol = piece.position % 8;
    let continueCountingBishop = true

    //bot left
    for (let i = 1; continueCountingBishop; i++) {

        let nextCol = bishopCol - i;
        let nextRow = bishopRow - i;
        let nextPosition = nextRow * 8 + nextCol;
        const pieceOnTarget = getPieceByPosition(allPieces, nextPosition);

        if (nextRow < 8 && nextRow > -1 && nextCol < 8 && nextCol > -1 &&
            pieceOnTarget === null
        ) {
            possibleMovesBishop.push(new Move(piece, nextPosition));
        } else if (nextRow < 8 && nextRow > -1 && nextCol < 8 && nextCol > -1 &&
            pieceOnTarget.color !== piece.color
        ) {
            possibleMovesBishop.push(new Move(piece, nextPosition, pieceOnTarget))
            continueCountingBishop = false;
        } else {
            continueCountingBishop = false;
        }
    }

    //bot right
    continueCountingBishop = true;
    for (let i = 1; continueCountingBishop; i++) {
        let nextCol = bishopCol + i
        let nextRow = bishopRow - i;
        let nextPosition = nextRow * 8 + nextCol;
        const pieceOnTarget = getPieceByPosition(allPieces, nextPosition);

        if (nextRow < 8 && nextRow > -1 && nextCol < 8 && nextCol > -1 &&
            pieceOnTarget === null
        ) {
            possibleMovesBishop.push(new Move(piece, nextPosition))
        } else if (nextRow < 8 && nextRow > -1 && nextCol < 8 && nextCol > -1 &&
            pieceOnTarget.color !== piece.color
        ) {
            possibleMovesBishop.push(new Move(piece, nextPosition, pieceOnTarget))
            continueCountingBishop = false;
        } else {
            continueCountingBishop = false;
        }
    }


    //top left 
    continueCountingBishop = true;
    for (let i = 1; continueCountingBishop; i++) {
        let nextCol = bishopCol - i
        let nextRow = bishopRow + i;
        let nextPosition = (nextRow * 8) + nextCol;
        const pieceOnTarget = getPieceByPosition(allPieces, nextPosition);
        if (nextRow < 8 && nextRow > -1 && nextCol < 8 && nextCol > -1 &&
            pieceOnTarget === null
        ) {
            possibleMovesBishop.push(new Move(piece, nextPosition))
        } else if (nextRow < 8 && nextRow > -1 && nextCol < 8 && nextCol > -1 &&
            pieceOnTarget.color !== piece.color
        ) {
            possibleMovesBishop.push(new Move(piece, nextPosition, pieceOnTarget))
            continueCountingBishop = false;
        } else {
            continueCountingBishop = false;
        }
    }
    // top right
    continueCountingBishop = true;
    for (let i = 1; continueCountingBishop; i++) {
        let nextCol = bishopCol + i
        let nextRow = bishopRow + i;
        let nextPosition = (nextRow * 8) + nextCol;
        const pieceOnTarget = getPieceByPosition(allPieces, nextPosition);

        if (nextRow < 8 && nextRow > -1 && nextCol < 8 && nextCol > -1 &&
            pieceOnTarget === null
        ) {
            possibleMovesBishop.push(new Move(piece, nextPosition))
        } else if (nextRow < 8 && nextRow > -1 && nextCol < 8 && nextCol > -1 &&
            pieceOnTarget.color !== piece.color
        ) {
            possibleMovesBishop.push(new Move(piece, nextPosition, pieceOnTarget))
            continueCountingBishop = false;
        } else {
            continueCountingBishop = false;
        }
    }
    return possibleMovesBishop;

}

function getKnightMoves(allPieces, piece) {
    let possibleMovesKnight = [];
    let kinghtRow = Math.floor(piece.position / 8);
    let knightCol = piece.position % 8;
    const possibleKnightTargetsAsRowCol = [[kinghtRow + 1, knightCol + 2], [kinghtRow + 2, knightCol + 1], [kinghtRow + 1, knightCol - 2], [kinghtRow + 2, knightCol - 1],
    [kinghtRow - 1, knightCol + 2], [kinghtRow - 2, knightCol + 1], [kinghtRow - 1, knightCol - 2], [kinghtRow - 2, knightCol - 1]];
    possibleKnightTargetsAsRowCol.forEach((pos) => {

        if (pos[0] > -1 && pos[1] > -1 && pos[0] < 8 && pos[1] < 8) {
            let nextPosition = pos[0] * 8 + pos[1];
            const pieceOnTarget = getPieceByPosition(allPieces, nextPosition);

            if (pieceOnTarget === null) {
                possibleMovesKnight.push(new Move(piece, nextPosition));
            } else if (pieceOnTarget.color !== piece.color) {
                possibleMovesKnight.push(new Move(piece, nextPosition, pieceOnTarget));
            }
        }
    })
    return (possibleMovesKnight);
}

function getKingMoves(allPieces, piece, checkForKingSafety) {

    let possibleMovesKing = [];
    let kingRow = Math.floor(piece.position / 8);
    let kingCol = piece.position % 8;
    const possibleMovesKingAsRowCol = [[kingRow + 1, kingCol + 1], [kingRow + 1, kingCol + 0], [kingRow + 1, kingCol - 1],
    [kingRow, kingCol - 1], [kingRow, kingCol + 1],
    [kingRow - 1, kingCol + 1], [kingRow - 1, kingCol], [kingRow - 1, kingCol - 1]];

    possibleMovesKingAsRowCol.forEach((pos) => {
        if (pos[0] > -1 && pos[1] > -1 && pos[0] < 8 && pos[1] < 8) {
            const nextPosition = pos[0] * 8 + pos[1];
            const pieceOnTarget = getPieceByPosition(allPieces, nextPosition);
            if (pieceOnTarget === null) {
                possibleMovesKing.push(new Move(piece, nextPosition));
            } else if (pieceOnTarget.color !== piece.color) {
                possibleMovesKing.push(new Move(piece, nextPosition, pieceOnTarget));
            }
        }
    })

    let activePiecesWithoutMovingPieces = [...allPieces].filter((itPiece) => itPiece.id !== piece.id)

    if (checkForKingSafety === true) {


        let newKingMinus1 = { ...piece };
        let newKingMinus2 = { ...piece };
        let newKingPlus1 = { ...piece };
        let newkingPlus2 = { ...piece };

        newKingMinus1.position = piece.position - 1;
        newKingMinus2.position = piece.position - 2;
        newKingPlus1.position = piece.position + 1;
        newkingPlus2.position = piece.position + 2;
        let newPiecesMinus1 = [...activePiecesWithoutMovingPieces];
        let newPiecesMinus2 = [...activePiecesWithoutMovingPieces];
        let newPiecesPlus1 = [...activePiecesWithoutMovingPieces];
        let newPiecesPlus2 = [...activePiecesWithoutMovingPieces];

        newPiecesMinus1.push(newKingMinus1);
        newPiecesMinus2.push(newKingMinus2);
        newPiecesPlus1.push(newKingPlus1);
        newPiecesPlus2.push(newkingPlus2);


        if (piece.hasMoved === false &&
            isKingSave(piece.color, allPieces) === true &&
            isKingSave(piece.color, newPiecesMinus1) === true &&
            isKingSave(piece.color, newPiecesMinus2) === true &&
            getPieceByPosition(allPieces, piece.position - 1) === null &&
            getPieceByPosition(allPieces, piece.position - 2) === null &&
            getPieceByPosition(allPieces, piece.position - 3) === null &&
            getPieceByPosition(allPieces, piece.position - 4) !== null &&
            getPieceByPosition(allPieces, piece.position - 4).type === Types.ROOK &&
            getPieceByPosition(allPieces, piece.position - 4).hasMoved === false) {
            possibleMovesKing.push(new Move(piece, piece.position - 2, null, getPieceByPosition(allPieces, piece.position - 4), piece.position - 1))
        }
        if (piece.hasMoved === false &&
            isKingSave(piece.color, allPieces) === true &&
            isKingSave(piece.color, newPiecesPlus1) === true &&
            isKingSave(piece.color, newPiecesPlus2) === true &&
            getPieceByPosition(allPieces, piece.position + 1) === null &&
            getPieceByPosition(allPieces, piece.position + 2) === null &&

            getPieceByPosition(allPieces, piece.position + 3) !== null &&
            getPieceByPosition(allPieces, piece.position + 3).type === Types.ROOK &&
            getPieceByPosition(allPieces, piece.position + 3).hasMoved === false) {
            possibleMovesKing.push(new Move(piece, piece.position + 2, null, getPieceByPosition(allPieces, piece.position + 3), piece.position + 1));
        }
    }
    return possibleMovesKing;
}

function getKing(allPieces, color) {

    let king = allPieces.filter((p) => p.type === Types.KING && p.color === color);
    return king[0];
}

function getMovesByPiece(piece, allMoves) {
    const moves = allMoves.filter(m => m.piece.id === piece.id);

    if (moves.length > 0) {
        return moves;
    } else {
        return [];
    }
}

function getMoveWithTargetField(allMoves, targetPosition) {

    if (allMoves) {
        const len = allMoves.length;

        for (let i = 0; i < len; i++) {

            if (allMoves[i].targetPosition === targetPosition) {
                return allMoves[i];
            }
        }

        return null;
    } else {
        return null;
    }
}

function getPawnMoves(allPieces, piece, lastMovedPiece) {
    if (piece.color === Colors.WHITE) {
        let pawnRow = Math.floor(piece.position / 8);
        let pawnCol = piece.position % 8;
        let possibleMovesPawn = [];


        if (getPieceByPosition(allPieces, piece.position + 8) === null) {
            possibleMovesPawn.push(new Move(piece, piece.position + 8))
            if (getPieceByPosition(allPieces, piece.position + 16) === null && piece.hasMoved === false) {
                possibleMovesPawn.push(new Move(piece, piece.position + 16));
            }
        }
        let leftTacklePiece = getPieceByPosition(allPieces, piece.position + 7);
        if (leftTacklePiece !== null &&
            leftTacklePiece.color === Colors.BLACK &&
            pawnCol > 0) {
            possibleMovesPawn.push(new Move(piece, piece.position + 7, leftTacklePiece));
        }
        let rightTacklePiece = getPieceByPosition(allPieces, piece.position + 9);
        if (rightTacklePiece !== null &&
            rightTacklePiece.color === Colors.BLACK &&
            pawnCol < 7) {
            possibleMovesPawn.push(new Move(piece, piece.position + 9, rightTacklePiece));
        }

        // en passant
        if (lastMovedPiece && lastMovedPiece.type === Types.PAWN) {

            if (pawnCol === 0) {

                if (
                    lastMovedPiece.color === Colors.BLACK &&
                    lastMovedPiece.position === piece.position + 1 &&
                    lastMovedPiece.lastPosition === lastMovedPiece.position + 16) {
                    possibleMovesPawn.push(new Move(piece, piece.position + 9, lastMovedPiece))
                }

            } else if (pawnCol === 7) {

                if (lastMovedPiece.color === Colors.BLACK &&
                    lastMovedPiece.position === piece.position - 1 &&
                    lastMovedPiece.lastPosition === lastMovedPiece.position + 16) {
                    possibleMovesPawn.push(new Move(piece, piece.position + 7, lastMovedPiece));
                }

            } else {
                if (lastMovedPiece.color === Colors.BLACK &&
                    lastMovedPiece.position === piece.position + 1 &&
                    lastMovedPiece.lastPosition === lastMovedPiece.position + 16) {
                    possibleMovesPawn.push(new Move(piece, piece.position + 9, lastMovedPiece))
                }


                if (lastMovedPiece.color === Colors.BLACK &&
                    lastMovedPiece.position === piece.position - 1 &&
                    lastMovedPiece.lastPosition === lastMovedPiece.position + 16) {
                    possibleMovesPawn.push(new Move(piece, piece.position + 7, lastMovedPiece));
                }

            }
        }
        return (possibleMovesPawn);

    } else if (piece.color === Colors.BLACK) {
        let pawnCol = piece.position % 8
        let possibleMovesPawn = [];
        if (getPieceByPosition(allPieces, piece.position - 8) === null) {
            possibleMovesPawn.push(new Move(piece, piece.position - 8));
            if (getPieceByPosition(allPieces, piece.position - 16) === null && piece.hasMoved === false) {
                possibleMovesPawn.push(new Move(piece, piece.position - 16));
            }
        }
        let rightTacklePiece = getPieceByPosition(allPieces, piece.position - 7);
        if (rightTacklePiece !== null &&
            rightTacklePiece.color === Colors.WHITE &&
            pawnCol < 7) {

            possibleMovesPawn.push(new Move(piece, piece.position - 7, rightTacklePiece));
        }
        let leftTacklePiece = getPieceByPosition(allPieces, piece.position - 9);
        if (leftTacklePiece !== null &&
            leftTacklePiece.color === Colors.WHITE &&
            pawnCol > 0) {
            possibleMovesPawn.push(new Move(piece, piece.position - 9, leftTacklePiece));
        }

        // en passant
        if (lastMovedPiece && lastMovedPiece.type === Types.PAWN) {


            if (pawnCol === 0) {

                if (lastMovedPiece.color === Colors.WHITE &&
                    lastMovedPiece.position === piece.position + 1 &&
                    lastMovedPiece.lastPosition === lastMovedPiece.position - 16) {

                    possibleMovesPawn.push(new Move(piece, piece.position - 7, lastMovedPiece));
                }

            } else if (pawnCol === 7) {

                if (lastMovedPiece.color === Colors.WHITE &&
                    lastMovedPiece.position === piece.position - 1 &&
                    lastMovedPiece.lastPosition === lastMovedPiece.position - 16) {

                    possibleMovesPawn.push(new Move(piece, piece.position - 9, lastMovedPiece));
                }

            } else {
                if (lastMovedPiece.color === Colors.WHITE &&
                    lastMovedPiece.position === piece.position + 1 &&
                    lastMovedPiece.lastPosition === lastMovedPiece.position - 16) {

                    possibleMovesPawn.push(new Move(piece, piece.position - 7, lastMovedPiece));
                }


                if (lastMovedPiece.color === Colors.WHITE &&
                    lastMovedPiece.position === piece.position - 1 &&
                    lastMovedPiece.lastPosition === lastMovedPiece.position - 16) {

                    possibleMovesPawn.push(new Move(piece, piece.position - 9, lastMovedPiece));
                }

            }


        }
        return (possibleMovesPawn);

    }
}


function getPieceByPosition(allPieces, fieldNumber) {

    let pieces = allPieces.filter((piece) => {

        if (piece.position === fieldNumber) {
            return true;
        } else {
            return false;
        }
    });

    if (pieces.length > 0) {
        return pieces[0]
    } else {
        return null
    };
}

function getQueenMoves(allPieces, piece) {
    let possibleQueenMoves = [];
    possibleQueenMoves = [...getBishopMoves(allPieces, piece), ...getRookMoves(allPieces, piece)]
    return possibleQueenMoves;
}

function getRookMoves(allPieces, piece) {
    let possibleMovesRook = [];

    let rookRow = Math.floor(piece.position / 8);
    let rookCol = piece.position % 8;
    let continueCountingRook = true

    //row left
    for (let i = 1; continueCountingRook; i++) {

        let nextCol = rookCol - i;
        let nextPosition = rookRow * 8 + nextCol;

        if (nextCol > -1 &&
            getPieceByPosition(allPieces, nextPosition) === null
        ) {
            possibleMovesRook.push(new Move(piece, nextPosition));
        } else if (nextCol > -1 &&
            getPieceByPosition(allPieces, nextPosition).color !== piece.color
        ) {
            const removedPiece = getPieceByPosition(allPieces, nextPosition);
            possibleMovesRook.push(new Move(piece, nextPosition, removedPiece));
            continueCountingRook = false;
        } else {
            continueCountingRook = false;
        }
    }

    //row right
    continueCountingRook = true;
    for (let i = 1; continueCountingRook; i++) {
        let nextCol = rookCol + i
        let nextPosition = rookRow * 8 + nextCol;

        if (nextCol < 8
            &&
            getPieceByPosition(allPieces, nextPosition) === null
        ) {
            possibleMovesRook.push(new Move(piece, nextPosition));
        } else if (nextCol < 8 &&
            getPieceByPosition(allPieces, nextPosition).color !== piece.color
        ) {
            const removedPiece = getPieceByPosition(allPieces, nextPosition);
            possibleMovesRook.push(new Move(piece, nextPosition, removedPiece));
            continueCountingRook = false;
        } else {
            continueCountingRook = false;
        }
    }


    //col top 
    continueCountingRook = true;
    for (let i = 1; continueCountingRook; i++) {
        let nextRow = rookRow + i;
        let nextPosition = (nextRow * 8) + rookCol;

        if (nextRow < 8 && getPieceByPosition(allPieces, nextPosition) === null
        ) {
            possibleMovesRook.push(new Move(piece, nextPosition));
        } else if (nextRow < 8 && getPieceByPosition(allPieces, nextPosition).color !== piece.color
        ) {
            const removedPiece = getPieceByPosition(allPieces, nextPosition);
            possibleMovesRook.push(new Move(piece, nextPosition, removedPiece));
            continueCountingRook = false;
        } else {
            continueCountingRook = false;
        }
    }
    // col bot
    continueCountingRook = true;
    for (let i = 1; continueCountingRook; i++) {
        let nextRow = rookRow - i;
        let nextPosition = (nextRow * 8) + rookCol;

        if (nextRow > -1 && getPieceByPosition(allPieces, nextPosition) === null
        ) {
            possibleMovesRook.push(new Move(piece, nextPosition));
        } else if (nextRow > -1 && getPieceByPosition(allPieces, nextPosition).color !== piece.color
        ) {
            const removedPiece = getPieceByPosition(allPieces, nextPosition);
            possibleMovesRook.push(new Move(piece, nextPosition, removedPiece));
            continueCountingRook = false;
        } else {
            continueCountingRook = false;
        }
    }

    return possibleMovesRook;
}

function getTargetFieldsForPiece(pieceMoves) {

    const targetFields = pieceMoves.map(m => m.targetPosition);
    return targetFields;
}

function movePiece(newMove, turn, round, activePieces, graveyardPieces, activePiecesHistory, graveyardPiecesHistory, lastMovedPiece) {

    let nextGraveyardPieces = JSON.parse(JSON.stringify(graveyardPieces));
    let nextActivePieces = JSON.parse(JSON.stringify(activePieces));
    let nextActivePiecesHistory = JSON.parse(JSON.stringify(activePiecesHistory));
    let nextGraveyardPiecesHistory = JSON.parse(JSON.stringify(graveyardPiecesHistory));

    if (isValidMove(activePieces, turn, newMove, lastMovedPiece)) {

        nextActivePiecesHistory.push(JSON.parse(JSON.stringify(activePieces)));
        nextGraveyardPiecesHistory.push(graveyardPieces);

        if (newMove.removePiece) {
            const removedPiece = newMove.removePiece;
            const newRemovedPiece = new Piece(
                removedPiece.type,
                removedPiece.color,
                removedPiece.hasMoved,
                removedPiece.position,
                removedPiece.id,
                removedPiece.lastPosition);
            nextGraveyardPieces.push(newRemovedPiece);
            nextActivePieces = removePiece(nextActivePieces, newRemovedPiece);

        } else if (newMove.otherMovedPiece) {
            const otherMovedPiece = newMove.otherMovedPiece;
            let newOtherMovedPiece = new Piece(
                otherMovedPiece.type,
                otherMovedPiece.color,
                otherMovedPiece.hasMoved,
                otherMovedPiece.position,
                otherMovedPiece.id,
                otherMovedPiece.lastPosition
            );
            newOtherMovedPiece.move(newMove.otherTargetPosition);
            nextActivePieces = replacePiece(nextActivePieces, newOtherMovedPiece);
        }
        
        const copiedPiece = newMove.piece;
        let nextPiece;


        nextPiece = new Piece(

            copiedPiece.type,
            copiedPiece.color,
            copiedPiece.hasMoved,
            copiedPiece.position,
            copiedPiece.id,
            copiedPiece.lastPosition);



        nextPiece.move(newMove.targetPosition);
        nextActivePieces = replacePiece(nextActivePieces, nextPiece);


        let nextTurn = turn === Colors.WHITE ? Colors.BLACK : Colors.WHITE;

        let isGameOver = getAllMoves(nextActivePieces, nextTurn, true).length === 0 ? true : false;
        
        return {
            activePieces: nextActivePieces,
            activePiecesHistory: nextActivePiecesHistory,
            graveyardPieces: nextGraveyardPieces,
            graveyardPiecesHistory: nextGraveyardPiecesHistory,
            gameOver: isGameOver,
            round: round + 1,
            turn: nextTurn,
        }
    }

    return null;

}

function replacePiece(pieces, newPiece) {
    let newPieces = pieces.filter((piece) => {
        if (piece.id === newPiece.id || piece.position === newPiece.position) {
            return false
        } else {
            return true
        }
    });
    newPieces.push(newPiece)
    return newPieces;
}

function removePiece(allPieces, piece) {
    let nextPieces = allPieces.filter((p) => p.id !== piece.id)

    return nextPieces;
}

module.exports = {
    getAllMoves,
    getKing,
    getMovesByPiece,
    getMoveWithTargetField,
    getPieceByPosition,
    getTargetFieldsForPiece,
    initializeGame,
    isKingSave,
    movePiece
}