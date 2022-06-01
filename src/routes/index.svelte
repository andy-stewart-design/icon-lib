<script lang="ts">
	import { iconIndex, categories } from '$lib/data/icons';
	import Toast from '$lib/components/Toast.svelte';
	import IconCard from '$lib/components/IconCard.svelte';
	import icon from '$lib/svg/seperate-vertical-16p.svg';

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
	<div class="icon-grid inline-block mb-4">
		<div class="relative col-span-2">
			<button
				on:click={toggleOpenState}
				class="flex justify-between items-center text-left border rounded-sm p-4 w-full min-w-[240px]"
			>
				{selectedItem}
				<div class="w-4">
					{@html icon}
				</div>
			</button>
			{#if isOpen}
				<ul
					class="absolute top-16 left-0 bg-white border rounded-sm w-full z-10 overflow-hidden"
					aria-orientation="vertical"
					tabindex="0"
					use:focusOnMount
				>
					{#each categories as category, index}
						<li
							class="py-2 px-4"
							class:item-active={index === activeItem}
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
	</div>

	<div class="icon-grid">
		{#each _icons as icon, index (icon.src)}
			<IconCard {icon} {index} />
		{/each}
	</div>
</main>

<Toast />

<style>
	.icon-grid {
		@apply grid grid-cols-3 sm:grid-cols-4 lg:grid-cols-6 gap-4;
	}
	.item-active {
		@apply text-blue-600 bg-blue-600 bg-opacity-10;
	}
</style>
