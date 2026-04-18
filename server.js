const express = require('express');
const next = require('next');
const http = require('http');
const { Server } = require('socket.io');
const { parse } = require('url');

const port = parseInt(process.env.PORT || '3000', 10);
const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handle = app.getRequestHandler();

app.prepare().then(() => {
  const server = express();
  const httpServer = http.createServer(server);
  const io = new Server(httpServer, {
    cors: {
      origin: '*'
    }
  });

  io.on('connection', (socket) => {
    socket.on('join-room', (room) => {
      socket.join(room);
    });

    socket.on('send-message', (message) => {
      if (message?.receiverId) {
        io.to(message.receiverId).emit('receive-message', message);
      }
    });

    socket.on('disconnect', () => {
      // cleanup if needed
    });
  });

  server.all('*', (req, res) => {
    return handle(req, res, parse(req.url, true));
  });

  httpServer.listen(port, () => {
    // eslint-disable-next-line no-console
    console.log(`> Ready on http://localhost:${port}`);
  });
});
