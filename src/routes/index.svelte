<script lang="ts">
	import { iconIndex, categories } from '$lib/data/icons';
	import Listbox from '$lib/components/Listbox.svelte';
	import Toast from '$lib/components/Toast.svelte';
	import IconCard from '$lib/components/IconCard.svelte';
	import search from '$lib/svg/search.svg';
	import close from '$lib/svg/close.svg';

	let selectedItem: string;
	let inputText: string = '';
	let searchedText: string = '';

	$: _icons = iconIndex.filter((icon: { category: string }) => {
		if (selectedItem === categories[0]) return true;
		return selectedItem === icon.category;
	});

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

	$: __icons = _icons.filter((icon: { name: string }) => {
		if (searchedText === '') return true;
		return icon.name.toLocaleLowerCase().includes(searchedText.toLocaleLowerCase());
	});
</script>

<main class="p-4 md:p-8 lg:p-16 bg-slate-100">
	<div class="icon-grid inline-block mb-4">
		<div class="relative col-span-full sm:col-span-2">
			<Listbox bind:selectedItem />
		</div>
		<div class="relative col-span-full sm:col-span-2 lg:col-span-4">
			<div class="flex items-center gap-x-3 w-full bg-slate-200 rounded-sm px-4">
				<button on:click={commitSearch} class="w-6">
					{@html search}
				</button>
				<input
					bind:value={inputText}
					on:keydown={keyboardHandler}
					class="grow py-4 bg-transparent"
					type="text"
					placeholder={`Search ${_icons.length} icons`}
				/>
				<div class="w-6 h-6">
					{#if inputText !== ''}
						<button on:click={clearSearch} class="w-full">
							{@html close}
						</button>
					{/if}
				</div>
			</div>
		</div>
		<!-- <div class="py-3 col-span-1 sm:col-span-2 lg:col-span-4 text-right">
			<p>{_icons.length} of {iconIndex.length} icons</p>
		</div> -->
	</div>

	<div class="icon-grid">
		{#each __icons as icon, index (icon.name)}
			<IconCard {icon} {index} />
		{/each}
	</div>

	<div class="w-full text-xs text-opacity-60 text-center pt-16">Made by Andy Stewart</div>
</main>

<Toast />

<style>
	.icon-grid {
		@apply grid grid-cols-3 sm:grid-cols-4 lg:grid-cols-6 gap-4;
	}
</style>
