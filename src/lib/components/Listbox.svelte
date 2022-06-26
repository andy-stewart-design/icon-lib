<script lang="ts">
	import { categories } from '$lib/data/icons';
	import { focusOnMount } from '$lib/actions/focusOnMount';
	import separate from '$lib/svg/seperate-vertical-16p.svg';
	import selected from '$lib/svg/selected.svg';

	let activeItem: number = 0;
	export let selectedItem: string = categories[activeItem];
	const len: number = categories.length - 1;
	let isOpen: boolean = false;
	let listboxButton: HTMLElement;

	const generateUUID = (): string => {
		const alphabet = 'abcdefghijklmnopqrstuvwxyz';
		const lett: string = alphabet[Math.floor(Math.random() * alphabet.length)];
		const num: number = Math.floor(Math.random() * 1000);
		return lett + num;
	};

	const toggleOpenState = (): void => {
		isOpen = !isOpen;
		let value = isOpen ? 'true' : 'false';
		listboxButton.setAttribute('aria-expanded', value);
		if (isOpen) {
			listboxButton.setAttribute('aria-controls', `listbox-options-:${generateUUID()}:`);
		} else {
			listboxButton.removeAttribute('aria-controls');
			listboxButton.focus();
		}
	};

	const incActiveItem = (): number => (activeItem >= len ? (activeItem = 0) : (activeItem += 1));
	const decActiveItem = (): number => (activeItem <= 0 ? (activeItem = len) : (activeItem -= 1));
	const updateSelected = (): void => {
		selectedItem = categories[activeItem];
		setTimeout(() => {
			toggleOpenState();
		}, 0);
	};

	const keyboardHandler = async (e: KeyboardEvent) => {
		if (isOpen && e.key === 'Tab') {
			toggleOpenState();
			// e.preventDefault();
			// e.shiftKey ? decActiveItem() : incActiveItem();
		} else if ((isOpen && e.key === 'ArrowUp') || (isOpen && e.key === 'ArrowLeft')) {
			e.preventDefault();
			decActiveItem();
		} else if ((isOpen && e.key === 'ArrowDown') || (isOpen && e.key === 'ArrowRight')) {
			e.preventDefault();
			incActiveItem();
		} else if (isOpen && e.key === 'Escape') {
			toggleOpenState();
			activeItem = categories.indexOf(selectedItem);
		} else if (isOpen && e.key === 'Enter') {
			updateSelected();
		}
	};

	const setAria = (node: HTMLElement): void => {
		const att = node.previousElementSibling?.getAttribute('aria-controls');
		if (att) node.setAttribute('id', att);
	};
</script>

<button
	bind:this={listboxButton}
	on:click={toggleOpenState}
	class="relative w-full min-w-[240px] flex justify-between items-center text-left bg-slate-200 py-4 px-5 focus:outline-none focus-visible:border-blue-600 focus-visible:ring focus-visible:ring-blue-600 focus-visible:ring-opacity-20 rounded-full transition-colors duration-300 focus-within:bg-blue-600/10"
	class:btn-isActive={isOpen}
	type="button"
	aria-haspopup="true"
	aria-expanded="false"
>
	{selectedItem}
	<div class="w-4">
		{@html separate}
	</div>
</button>
{#if isOpen}
	<ul
		class="absolute top-16 left-0 bg-white rounded-sm shadow-lg w-full z-10 overflow-hidden focus:outline-none focus-visible:border-blue-600"
		role="listbox"
		aria-orientation="vertical"
		tabindex="0"
		use:focusOnMount={keyboardHandler}
		use:setAria
	>
		{#each categories as category, index}
			{@const isSelected = categories.indexOf(selectedItem) === index}
			<li
				class="flex py-2 px-5"
				class:item-active={index === activeItem}
				aria-selected={isSelected ? 'true' : 'false'}
				on:click={updateSelected}
				on:mouseenter={() => {
					activeItem = index;
				}}
			>
				<p class="flex-grow">{category}</p>
				{#if isSelected}
					<div class="w-6">
						{@html selected}
					</div>
				{/if}
			</li>
		{/each}
	</ul>
{/if}

<style>
	.item-active {
		@apply text-white bg-blue-600;
	}
	.btn-isActive {
		@apply bg-blue-600/10;
	}
</style>
