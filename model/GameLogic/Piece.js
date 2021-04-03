const Types = require('./Types');
const Colors = require('./Colors');
class Piece{
    constructor(type,color,hasMoved, position, id,  lastPosition){
        
        this.color = color;
        this.type = type;
        this.position = position;
        this.id = id;
        this.hasMoved = hasMoved;
        this.lastPosition = lastPosition;
    }

    move(target){
        this.lastPosition = this.position;
        this.position = target;
        this.hasMoved = true;
    }

    isPawn(){
        if(this.type === Types.PAWN){
            return true;
        }else{
            return false;
        }
    }
    isBishop(){
        if(this.type === Types.BISHOP){
            return true;
        }else{
            return false;
        }
    }
    isKnight(){
        if(this.type === Types.KNIGHT){
            return true;
        }else{
            return false;
        }
    }
    isQueen(){
        if(this.type === Types.QUEEN){
            return true;
        }else{
            return false;
        }
    }

    isKing(){
        if(this.type === Types.KING){
            return true;
        }else{
            return false;
        }
    }
    isRook(){
        if(this.type === Types.ROOK){
            return true;
        }else{
            return false;
        }
    }

    isWhite(){
        return this.color === Colors.WHITE;

    }
    isBlack(){
        return this.color === Colors.BLACK;
    }

    getPosition(){
        return this.position;
    }
    setPosition(position){
        this.position = position;
    }

    getID(){
        return this.id;
    }

    copy(){
        return new Piece(
            this.type,
            this.color,
            this.hasMoved,
            this.position,
            this.id,
            this.lastPosition)
    }

}

module.exports = Piece;