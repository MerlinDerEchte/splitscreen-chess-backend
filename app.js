const express = require("express");
const http = require("http");
const socketIo = require("socket.io");
const cors = require('cors');
const uuid = require('uuid');
const port = process.env.PORT || 4001;
const index = require("./routes/index");

const Gameroom = require('./model/Gameroom');
const app = express();
const createNewGame = require('./model/GameLogic/createNewGame');
const makeMove = require('./model/GameLogic/makeMove');
const moveFactory = require('./model/GameLogic/moveFactory');
const undoMove = require('./model/GameLogic/undoMove');
app.use(index, cors());

const server = http.createServer(app);

const io = socketIo(server, {
    cors: {
        origin: true
    },
    pingInterval: 10000,
    pingTimeout: 15000,
});

let gameRooms = [];

app.get('/newgame', (req, res) => {
    // controller


    const gameID = uuid.v4();
    const newGame = createNewGame();

    console.log('creating new room  ', gameID);
    //newGame.getAllMoves();
    const newRoom = new Gameroom(gameID, newGame);

    gameRooms.push(newRoom);
    return (res.send({
        gameID: gameID
    }))
});



io.on("connection", (socket) => {

    socket.on('joingame', (gameId, playerId) => {
        console.log(playerId)
        const room = gameRooms.find(r => r.id === gameId);

        if (room) {
            if (!playerId) {
                const playerId =  uuid.v4();
                if (room) {
                    const numberPlayers = room.getPlayers().length;
                    if (numberPlayers === 0) {
                        room.addPlayer(playerId, socket.id);
                        socket.join(gameId)
                        socket.emit('joinedGame', room.getPlayers().find(p => p.socketId === socket.id).getColor(), playerId, true)
                    }
                    if (numberPlayers === 1) {
                        room.addPlayer(playerId, socket.id);
                        socket.join(gameId);
                        console.log("player, ", playerId)
                        socket.emit('joinedGame', room.getPlayers().find(p => p.socketId === socket.id).getColor(), playerId, false);
                        io.to(room.id).emit('gameReady');
                        io.to(room.id).emit('gameChanged',
                            room.Game.Board
                        );
                    } else {
                        socket.emit('roomIsFull');
                    }
                }
            } else {

                const player = room.getPlayers().find(p => p.id === playerId);
                if (player) {
                    socket.join(gameID);
                    player.setSocketId(socket.id);
                } else {
                    socket.emit("gameNotExisting");
                }
            }
        }else{
            socket.emit("gameNotExisting");
        }

    })


    socket.on('makeMove', (gameRoomID, receivedMove) => {
        console.log("receiving move")

        for (let room of gameRooms) {
            if (room.id === gameRoomID) {


                const newMove = moveFactory(JSON.parse(receivedMove));


                const newGame = makeMove(room.Game, newMove);
                room.Game = newGame;

                io.to(room.id).emit('gameChanged',
                    room.Game.Board)
            }
        }


    })

    socket.on('undoMoveRequest', gameRoomID => {
        const room = gameRooms.find(r => r.id === gameRoomID);
        if (room) {
            socket.to(room.id).emit('undoMoveRequest');
        }
    })

    socket.on('acceptUndoMove', gameRoomID => {
        const room = gameRooms.find(r => r.id === gameRoomID);
        if (room) {
            const newGame = undoMove(room.Game);
            room.Game = newGame;
            io.to(room.id).emit('gameChanged', room.Game.Board)
        }
    })



    socket.on('disconnect', () => {
        // if only one player is disconnect wait for a minute and then delete the room and notify the other player that he has won

        const room = gameRooms.find(r => {
            for (let player of r.players) {
                if (player.socketId === socket.id) return true
            }
            return false;
        })

        if (room && room.players.find(p => p.socketId === socket.id)) {

            const otherPlayer = room.players.find(p => p.socketId !== socket.id)
            if (otherPlayer) io.to(otherPlayer.socketId).emit('otherPlayerLeft');
            gameRooms = gameRooms.filter(r => r !== room);
            console.log(gameRooms)
        }


    })


});



server.listen(port, () => console.log(`Listening on port ${port}`));