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
    res.redirect('/index.html');
});

io.on('connection', (socket) => {
    console.log('a user connected');
});


const port = 8080;
server.listen(port, () => {
    console.log('Server listening on port', port);
});
