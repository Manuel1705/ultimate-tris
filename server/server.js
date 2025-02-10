// Install the ws library using: npm install ws
import { WebSocketServer } from 'ws';

const wss = new WebSocketServer({ port: 3000 });

wss.on('connection', (ws) => {
    console.log('Client connected');

    ws.on('message', (message) => {
        message = JSON.parse(message);
        console.log('Received:', message);
        // Broadcast the received message to all connected clients
        wss.clients.forEach((client) => {
            if (client.readyState == client.OPEN) {
                client.send(JSON.stringify(message));
            }
        });
    });

    ws.on('close', () => {
        console.log('Client disconnected');
    });
});

console.log('WebSocket server is running on ws://localhost:3000');