<script lang="ts">
	import { getContext, onMount } from 'svelte';

	const { register, unregister, setActiveTab, incActiveTab, decActiveTab, activeTab } =
		getContext('api');

	let ref: HTMLSpanElement;
	let index: number = -1;
	let value: string = '';
	$: isActive = $activeTab.index === index;

	const handleKeydown = (e: Event): void => {
		const ke = e as KeyboardEvent;
		if (ke.key === 'ArrowRight' || ke.key === 'End') {
			ke.preventDefault();
			incActiveTab(ke);
			e.target!.removeEventListener('keydown', handleKeydown);
		} else if (ke.key === 'ArrowLeft' || ke.key === 'Home') {
			ke.preventDefault();
			decActiveTab(ke);
			e.target!.removeEventListener('keydown', handleKeydown);
		}
	};

	onMount(() => {
		if (ref.textContent) value = ref.textContent;
		index = register(ref, value);
		if (isActive) $activeTab.value = value;

		return () => unregister(index);
	});
</script>

<button
	bind:this={ref}
	class="py-2 px-4 rounded-full"
	class:active={isActive}
	on:click={() => setActiveTab(index, value)}
	on:focus={(e) => e.target?.addEventListener('keydown', handleKeydown)}
	type="button"
	role="tab"
	tabindex={isActive ? 0 : -1}
	data-state={isActive ? 'active' : 'inactive'}
	data-orientation="horizontal"
>
	<slot />
</button>

<!--
	<button
		type="button"
		role="tab"
		aria-selected="true"
		aria-controls="radix-783-content-tab1"
		data-state="active"
		id="radix-783-trigger-tab1"
		class="c-fszlVu"
		tabindex="0"
		data-orientation="horizontal"
		data-radix-collection-item="">Account</button
	><button
		type="button"
		role="tab"
		aria-selected="false"
		aria-controls="radix-783-content-tab2"
		data-state="inactive"
		id="radix-783-trigger-tab2"
		class="c-fszlVu"
		tabindex="-1"
		data-orientation="horizontal"
		data-radix-collection-item="">Password</button
	>
</div> -->
<style>
	.active {
		@apply bg-blue-600 text-white;
	}
</style>
