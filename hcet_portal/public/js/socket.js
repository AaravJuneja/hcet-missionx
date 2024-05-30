const socket = io();

socket.on('connect', () => {
    console.log('Connected to server');
});

socket.on('message', (msg) => {
    console.log('New message:', msg);
});

socket.on('disconnect', () => {
    console.log('Disconnected from server');
});

function sendMessage(msg) {
    socket.emit('message', msg);
}