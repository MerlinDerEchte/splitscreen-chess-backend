const PieceFilterConditionTypes = require('./PieceFilterConditionTypes')
class PieceFilter {
    constructor(conditions) {
        this.conditions = conditions;
    }

    filter(pieces) {
        const newPieces = pieces.filter(piece => {
            for (let cond of this.conditions) {
                if (cond.pieceFilterConditionType === PieceFilterConditionTypes.EQUAL) {
                    if (piece[cond.property] !== cond.value) {
                        return false;
                    }
                } else {
                    if (piece[cond.property] === cond.value) {
                        return false;
                    }
                }
            }
            return true;
        })
        return newPieces;

    }

}

module.exports = PieceFilter;