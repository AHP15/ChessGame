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

io.on('connection', (socket) => {

    socket.on('create-game', (game) => {
        console.log(game);
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

        socket.join(info.gameId);

        if(editedGame.white.id) {
            editedGame.black = {
                id: info.userId,
                username: info.username,
            };
        } else {
            editedGame.white = {
                id: info.userId,
                username: info.username,
            };
        }

        games.set(editedGame.id, editedGame);

        io.to(info.gameId).emit('joined-game', editedGame);
    });

    socket.on('send-move', (info) => {
        socket.broadcast.to(info.gameId).emit('move-recieved', info.pieces);
    });
});


const port = 8080;
server.listen(port, () => {
    console.log('Server listening on', `http://localhost:${port}`);
});
