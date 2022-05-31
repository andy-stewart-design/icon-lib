<script lang="ts">
	import { iconIndex, categories } from '$lib/data/icons';
	import Toast from '$lib/components/Toast.svelte';
	import IconCard from '$lib/components/IconCard.svelte';
	import { onMount } from 'svelte';

	let isOpen: boolean = false;
	let activeItem: number = 0;
	let selectedItem: string = categories[activeItem];
	const len: number = categories.length - 1;

	const toggleOpenState = () => (isOpen = !isOpen);
	const incActiveItem = () => (activeItem >= len ? (activeItem = 0) : (activeItem += 1));
	const decActiveItem = () => (activeItem <= 0 ? (activeItem = len) : (activeItem -= 1));
	const updateSelected = () => {
		selectedItem = categories[activeItem];
		toggleOpenState();
	};
	const focusOnMount = (node: HTMLElement) => {
		node.focus();
		window.addEventListener('keydown', keyboardHandler);
		return {
			destroy: () => {
				window.removeEventListener('keydown', keyboardHandler);
			}
		};
	};
	const keyboardHandler = (e: KeyboardEvent) => {
		if (isOpen && e.key === 'Tab') {
			e.preventDefault();
			e.shiftKey ? decActiveItem() : incActiveItem();
		} else if (isOpen && e.key === 'ArrowUp') {
			e.preventDefault();
			decActiveItem();
		} else if (isOpen && e.key === 'ArrowDown') {
			e.preventDefault();
			incActiveItem();
		} else if (isOpen && e.key === 'Escape') {
			toggleOpenState();
		} else if (isOpen && e.key === 'Enter') {
			updateSelected();
		}
	};

	$: _icons = iconIndex.filter((icon: { category: string }) => {
		if (selectedItem === categories[0]) return true;
		return selectedItem === icon.category;
	});
</script>

<main class="p-4 md:p-8 lg:p-16">
	<div class="relative inline-block mb-4">
		<button on:click={toggleOpenState} class="text-left border p-4 min-w-[240px]"
			>{selectedItem}</button
		>
		{#if isOpen}
			<ul
				class="absolute top-16 left-0 bg-white border p-4 w-full z-10"
				aria-orientation="vertical"
				tabindex="0"
				use:focusOnMount
			>
				{#each categories as category, index}
					<li
						class:text-blue-600={index === activeItem}
						on:click={updateSelected}
						on:mouseenter={() => {
							activeItem = index;
						}}
					>
						{category}
					</li>
				{/each}
			</ul>
		{/if}
	</div>

	<div class="grid grid-cols-3 sm:grid-cols-4 lg:grid-cols-6 gap-4">
		{#each _icons as icon, index (icon.src)}
			<IconCard {icon} {index} />
		{/each}
	</div>
</main>

<Toast />
