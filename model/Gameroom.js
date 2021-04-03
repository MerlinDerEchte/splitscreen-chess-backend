const Player = require('./Player');
const Colors = require('./GameLogic/Colors');
const Game = require('./GameLogic/Game');
class Gameroom{
    constructor(id, Game){
        this.id = id;
        this.players = [];
        this.Game = Game;
    }
    getID(){
        return this.id;
    }

    getPlayers(){
        return this.players;
    }

    addPlayer(id, socketId){

        if(this.players.length === 0){
            const newPlayer = new Player(id, socketId);
            const randomColor = Math.random() > 0.5 ? Colors.WHITE : Colors.BLACK;
            newPlayer.setColor(randomColor);
            this.players.push(newPlayer)
        }else if(this.players.length === 1 ){
            const newPlayer = new Player(id, socketId);
            const newPlayerColor = this.players[0].getColor() === Colors.WHITE ?  Colors.BLACK : Colors.WHITE;
            newPlayer.setColor(newPlayerColor);
            this.players.push(newPlayer);
            //this.initializeGame();
        }
    }

    getGame(){
        return this.Game;
    }
        
}

module.exports = Gameroom;