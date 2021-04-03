const Colors = require('./GameLogic/Colors');
class Player{
    constructor(id, socketId){
        this.id = id;
        this.socketId = socketId;
        this.color
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
}

module.exports = Player;