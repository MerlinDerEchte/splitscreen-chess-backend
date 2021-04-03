const PieceFilterConditionTypes = require('./PieceFilterConditionTypes');
class PieceFilterCondition{
    constructor(property, value, pieceFilterConditionType){
        this.property = property;
        this.value = value;
        this.pieceFilterConditionType = pieceFilterConditionType;
    }    
}

module.exports = PieceFilterCondition;