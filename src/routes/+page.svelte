<script>
	import '../app.css';
	import { io } from 'socket.io-client';
	import { onMount } from 'svelte';

	let messages = [];

	let author = '';

	let socket;
	onMount(() => {
		socket = io();

		socket.on('message', (message) => {
			messages = [...messages, message];
		});

		if (localStorage.getItem('username')) {
			author = localStorage.getItem('username');
		}
	});

	function sendMessage(e) {
		const message = {
			author: e.target.author.value,
			content: e.target.content.value,
			date: new Date().toLocaleString()
		};

		socket.emit('message', message);
		messages = [...messages, message];

		localStorage.setItem('username', message.author);
		e.target.content.value = '';
	}
</script>

<div class="flex justify-center">
	<div class="h-[var(--fh)] p-4 flex flex-col max-w-[800px] w-full">
		<div class="h-full flex flex-col gap-3 max-h-full overflow-auto pb-4">
			{#each messages as message}
				<div>
					<p class="text-gray-400 text-xs">{message.date}</p>
					<div class="flex gap-2">
						<p class="font-bold">{message.author}</p>
						<p>{message.content}</p>
					</div>
				</div>
			{/each}
		</div>

		<form on:submit|preventDefault={sendMessage} class="border-t-gray-400 border-t-[1px] pt-4">
			<input
				class="border border-gray-500 p-1 rounded-md mb-2"
				type="text"
				placeholder="Name"
				name="author"
				value={author}
				required
			/>
			<div class="flex w-full">
				<input
					class="border border-gray-500 p-1 rounded-md rounded-r-none w-full"
					type="text"
					placeholder="Your message"
					name="content"
					required
				/>
				<input
					type="submit"
					value="Invia"
					class="border bg-gray-300 p-1 border-gray-500 rounded-md rounded-l-none border-l-0 cursor-pointer"
				/>
			</div>
		</form>
	</div>
</div>
