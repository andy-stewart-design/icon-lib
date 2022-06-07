<script lang="ts">
	import { iconIndex, categories } from '$lib/data/icons';
	import Listbox from '$lib/components/Listbox.svelte';
	import Toast from '$lib/components/Toast.svelte';
	import IconCard from '$lib/components/IconCard.svelte';

	let selectedItem: string;

	$: _icons = iconIndex.filter((icon: { category: string }) => {
		if (selectedItem === categories[0]) return true;
		return selectedItem === icon.category;
	});
</script>

<main class="p-4 md:p-8 lg:p-16">
	<div class="icon-grid inline-block mb-4">
		<div class="relative col-span-2">
			<Listbox bind:selectedItem />
		</div>
		<div class="py-3 col-span-1 sm:col-span-2 lg:col-span-4 text-right">
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
</style>
