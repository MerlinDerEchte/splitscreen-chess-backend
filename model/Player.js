const Colors = require('./GameLogic/Colors');
class Player{
    constructor(id, socketId, color){
        this.id = id;
        this.socketId = socketId;
        this.color = color;
    }

    getColor(){
        return this.color;
    }

    setColor(color){
        this.color = color;
    }

    setSocketId(id){
        this.socketId = id;
    }

    removeSocketId(){
        this.socketId = null;
    }
}

module.exports = Player;