const Player = require('./Player');
const Colors = require('./GameLogic/Colors');
const Game = require('./GameLogic/Game');
class Gameroom{
    constructor(id, Game, lastUpdate){
        this.id = id;
        this.players = [];
        this.Game = Game;
        this.lastUpdate = lastUpdate;
    }
    getID(){
        return this.id;
    }

    getPlayers(){
        return this.players;
    }

    addPlayer(id, socketId){

        if(this.players.length === 0){
            const randomColor = Math.random() > 0.5 ? Colors.WHITE : Colors.BLACK;
            const newPlayer = new Player(id, socketId, randomColor);
            this.players.push(newPlayer)

        }else if(this.players.length === 1 ){
            
            const newPlayerColor = this.players[0].getColor() === Colors.WHITE ?  Colors.BLACK : Colors.WHITE;
            const newPlayer = new Player(id, socketId, newPlayerColor);
            this.players.push(newPlayer);
        }
    }

    getGame(){
        return this.Game;
    }

    setLastUpdate(update){
        this.lastUpdate = update;
    }
        
}

module.exports = Gameroom;