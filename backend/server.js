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

app.post('/game/new', (req, res) => {
    const { game } = req.body;
    games.set(game.id, game);
    res.status(201).json({ message: 'game greated!' })
});

app.get('/game/:id', (req, res) => {
    const id = req.params.id;
});

app.get('*', (req, res) => {
    res.redirect('/index.html');
});


const games = new Map();

io.on('connection', (socket) => {

    socket.on('create-game', (game) => {
        games.set(game.id, game);
        socket.join(game.id);
    });;

    socket.on('get-game-info', (gameID) => {
        socket.join(gameID);
        socket.emit('game-info', games.get(gameID));
    });
});


const port = 8080;
server.listen(port, () => {
    console.log('Server listening on', `http://localhost:${port}`);
});
