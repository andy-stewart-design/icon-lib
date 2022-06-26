<script lang="ts">
	import { fade } from 'svelte/transition';
	import search from '$lib/svg/search.svg';
	import close from '$lib/svg/close.svg';

	export let iconCount: number = 100;
	export let searchedText: string = '';
	let inputText: string = '';

	const commitSearch = () => (searchedText = inputText);
	const clearSearch = () => {
		inputText = '';
		commitSearch();
	};

	const keyboardHandler = (e: KeyboardEvent) => {
		if (e.key === 'Enter') commitSearch();
		else if (e.key === 'Backspace') {
			setTimeout(() => {
				if (inputText === '') commitSearch();
			}, 0);
		}
	};
</script>

<div
	class="flex items-center gap-x-3 w-full bg-slate-200 rounded-full px-5 transition-colors duration-300 focus-within:bg-blue-600/10"
>
	<button
		on:click={commitSearch}
		class="pr-3 border-r border-black border-opacity-20 transition-colors duration-200 hover:text-blue-600"
	>
		<div class="w-6">
			{@html search}
		</div>
	</button>
	<input
		bind:value={inputText}
		on:keydown={keyboardHandler}
		class="grow py-4 bg-transparent focus:outline-none"
		type="text"
		placeholder={`Search ${iconCount} icons`}
	/>
	<div class="w-6 h-6">
		{#if inputText !== ''}
			<button
				on:click={clearSearch}
				transition:fade={{ duration: 100 }}
				class="w-full transition-colors duration-200 hover:text-blue-600"
			>
				{@html close}
			</button>
		{/if}
	</div>
</div>
