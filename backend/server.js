import express from 'express';
import { Server } from 'socket.io';

import path, { dirname } from 'path';
import { fileURLToPath } from 'url';
import { createServer } from 'node:http';

const app = express();
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

function generateTimer(callback) {
    return setInterval(callback, 1000);
}

io.on('connection', (socket) => {

    socket.on('create-game', (game) => {
        console.log(game);
        timeForWhite = game.time;
        timeForBlack = game.time;

        games.set(game.id, game);
        socket.join(game.id);
    });

    socket.on('join-game', (info) => {
        console.log(info);
        const editedGame = games.get(info.gameId);

        if(!editedGame) {
            socket.emit('game-not-found');
            return;
        }

        let timerToStart;

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
        /*
        generateTimer(() => {
            let white = timerToStart === 'white';
            let time = {
                seconds: white ? secondsForWhite : secondsForBlack,
                minutes: white ? timeForWhite : timeForBlack,
            };
            
            if(time.seconds <= 0) {
                secondsForWhite = white ? 59: secondsForWhite;
                secondsForBlack = !white? 59: secondsForBlack;

                timeForWhite = white ? timeForWhite - 1: timeForWhite;
                timeForBlack = !white ? timeForBlack - 1: timeForBlack;
            } else {
                secondsForWhite = white ? secondsForWhite - 1: secondsForWhite;
                secondsForBlack = !white ? secondsForBlack - 1: secondsForBlack;
            }

            io.to(info.gameId).emit('time', {time, white});
        });
        */

        if(timerToStart === 'white') {
            timerForWhite = generateTimer(() => {
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

                io.to(info.gameId).emit('time', {time, white: true});
            });
        } else {
            timerForBlack = generateTimer(() => {
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

                io.to(info.gameId).emit('time', {time, white: false});
            });
        }
    });

    socket.on('send-move', (info) => {
        socket.broadcast.to(info.gameId).emit('move-recieved', info.pieces);
    });
});


const port = 8080;
server.listen(port, () => {
    console.log('Server listening on', `http://localhost:${port}`);
});
