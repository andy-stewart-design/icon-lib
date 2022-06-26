<script lang="ts">
	import { iconIndex, categories } from '$lib/data/icons';
	import Listbox from '$lib/components/Listbox.svelte';
	import Searchbar from '$lib/components/Searchbar.svelte';
	import Toast from '$lib/components/Toast.svelte';
	import IconCard from '$lib/components/IconCard.svelte';

	let selectedItem: string;
	let searchedText: string = '';

	$: _icons = iconIndex.filter((icon: { category: string }) => {
		if (selectedItem === categories[0]) return true;
		return selectedItem === icon.category;
	});

	$: __icons = _icons.filter((icon: { name: string }) => {
		if (searchedText === '') return true;
		return icon.name.toLocaleLowerCase().includes(searchedText.toLocaleLowerCase());
	});
</script>

<main class="p-4 md:p-8 lg:p-16 text-slate-800 bg-slate-100">
	<div class="icon-grid inline-block mb-8">
		<div class="relative col-span-full sm:col-span-2">
			<Listbox bind:selectedItem />
		</div>
		<div class="relative col-span-full sm:col-span-2 lg:col-span-4 xl:col-span-6">
			<Searchbar bind:searchedText iconCount={_icons.length} />
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
		@apply grid grid-cols-3 sm:grid-cols-4 lg:grid-cols-6 xl:grid-cols-8 gap-6;
	}
</style>
