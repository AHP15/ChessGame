import express from 'express';
import { Server } from 'socket.io';

import path, { dirname } from 'path';
import { fileURLToPath } from 'url';
import { createServer } from 'node:http';

const app =  express();
const server = createServer(app);
const io = new Server(server);

const __dirname = dirname(fileURLToPath(import.meta.url));
app.use(express.static(path.join(__dirname, 'public')));

app.get('*', (req, res) => {
    res.redirect('index.html');
});


const games = new Map();

let timeForWhite;
let secondsForWhite = 0;

let timeForBlack;
let secondsForBlack = 0;

let timerForWhite;
let timerForBlack;

let timerToStart;

function generateTimer(callback) {
    return setInterval(callback, 1000);
}

function generateTimerForWhite(gameId) {
    return generateTimer(() => {
        if(secondsForWhite <= 0) {
            secondsForWhite = 59;
            timeForWhite--;
        } else {
            secondsForWhite--;
        }

        let time = {
            seconds: secondsForWhite,
            minutes: timeForWhite,
        };

        io.to(gameId).emit('time', {time, white: true});
    });
}

function generateTimerForBlack(gameId) {
    return generateTimer(() => {
        if(secondsForBlack <= 0) {
            secondsForBlack = 59;
            timeForBlack--;
        } else {
            secondsForBlack--;
        }

        let time = {
            seconds: secondsForBlack,
            minutes: timeForBlack,
        };

        io.to(gameId).emit('time', {time, white: false});
    });
}

io.on('connection', (socket) => {

    socket.on('create-game', (game) => {
        timeForWhite = game.time;
        timeForBlack = game.time;

        games.set(game.id, game);
        socket.join(game.id);
    });

    socket.on('join-game', (info) => {
        const editedGame = games.get(info.gameId);

        if(!editedGame) {
            socket.emit('game-not-found');
            return;
        }

        socket.join(info.gameId);

        if(editedGame.white.id) {
            editedGame.black = {
                id: info.userId,
                username: info.username,
            };
            timerToStart = 'white';
        } else {
            editedGame.white = {
                id: info.userId,
                username: info.username,
            };
            timerToStart = 'black';
        }

        games.set(editedGame.id, editedGame);

        io.to(info.gameId).emit('joined-game', editedGame);

        if(timerToStart === 'white') {
            timerForWhite = generateTimerForWhite(info.gameId);
        } else {
            timerForBlack = generateTimerForBlack(info.gameId);
        }
    });

    socket.on('send-move', (info) => {
        socket.broadcast.to(info.gameId).emit('move-recieved', info.pieces);
        
        if(timerToStart === 'white') {
            clearInterval(timerForWhite);
            timerToStart = 'black';
            timerForBlack = generateTimerForBlack(info.gameId);
        } else {
            clearInterval(timerForBlack);
            timerToStart = 'white';
            timerForWhite = generateTimerForWhite(info.gameId);
        }
    });

    socket.on('promote', (info) => {
        socket.broadcast.to(info.gameId).emit('promotion-recieved', info.pieces);
    });

    socket.on('rejoin-game', (gameId) => {
        socket.join(gameId);
        if(timerToStart === 'white') {
            clearInterval(timerForWhite);
            timerForWhite = generateTimerForWhite(gameId);
        } else {
            clearInterval(timeForBlack);
            timerForBlack = generateTimerForBlack(gameId);
        }

        socket.emit('rejoined-game');
    });
});


const port = 8080;
server.listen(port, () => {
    console.log('Server listening on', `http://localhost:${port}`);
});
