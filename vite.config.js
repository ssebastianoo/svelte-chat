import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';
import injectSocketIO from './socket.js';

const webSocketServer = {
	name: 'webSocketServer',
	configureServer(server) {
		injectSocketIO(server.httpServer);
	}
};

export default defineConfig({
	plugins: [sveltekit(), webSocketServer]
});
