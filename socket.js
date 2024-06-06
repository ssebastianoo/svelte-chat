import { Server } from 'socket.io';

export default function injectSocketIO(server) {
	if (!server) return;

	const io = new Server(server);

	io.on('connection', (socket) => {
		socket.on('message', (message) => {
			socket.broadcast.emit('message', message);
		});
	});
}
