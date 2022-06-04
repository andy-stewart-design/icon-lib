<script lang="ts">
	import { iconIndex, categories } from '$lib/data/icons';
	import { activeItem } from '$lib/stores/filter';
	import { focusOnMount } from '$lib/actions/focusOnMount';
	import Toast from '$lib/components/Toast.svelte';
	import IconCard from '$lib/components/IconCard.svelte';
	import icon from '$lib/svg/seperate-vertical-16p.svg';

	let selectedItem: string = categories[$activeItem];
	const len: number = categories.length - 1;
	let isOpen: boolean = false;
	// ToDo: create select component
	let listboxButton: HTMLElement;
	const toggleOpenState = () => {
		let expanded = listboxButton.getAttribute('aria-expanded');
		let value = expanded === 'false' ? 'true' : 'false';
		// console.log(value);
		listboxButton.setAttribute('aria-expanded', value);
		isOpen = !isOpen;
	};
	const incActiveItem = () => ($activeItem >= len ? ($activeItem = 0) : ($activeItem += 1));
	const decActiveItem = () => ($activeItem <= 0 ? ($activeItem = len) : ($activeItem -= 1));
	const updateSelected = () => {
		selectedItem = categories[$activeItem];
		toggleOpenState();
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
			$activeItem = categories.indexOf(selectedItem);
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
			<!-- ToDo: set up aria-controls -->
			<button
				bind:this={listboxButton}
				on:click={toggleOpenState}
				class="flex justify-between items-center text-left border rounded-sm py-3 px-4 w-full min-w-[240px]"
				type="button"
				aria-haspopup="true"
				aria-expanded="false"
			>
				{selectedItem}
				<div class="w-4">
					{@html icon}
				</div>
			</button>
			{#if isOpen}
				<ul
					class="absolute top-16 left-0 bg-white border rounded-sm w-full z-10 overflow-hidden"
					role="listbox"
					aria-orientation="vertical"
					tabindex="0"
					use:focusOnMount={keyboardHandler}
				>
					{#each categories as category, index}
						<li
							class="py-2 px-4"
							class:item-active={index === $activeItem}
							aria-selected={categories.indexOf(selectedItem) === index ? 'true' : 'false'}
							on:click={updateSelected}
							on:mouseenter={() => {
								$activeItem = index;
							}}
						>
							{category}
						</li>
					{/each}
				</ul>
			{/if}
		</div>
		<div class="py-3">
			<p>{_icons.length} of {iconIndex.length} icons</p>
		</div>
	</div>

	<div class="icon-grid">
		{#each _icons as icon, index (icon.src)}
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
	.item-active {
		@apply text-blue-600 bg-blue-600 bg-opacity-10;
	}
</style>
