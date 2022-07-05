<script lang="ts">
	import { getContext, onMount } from 'svelte';

	const {
		registerTab,
		unregisterTab,
		activeTab,
		setActiveTab,
		incActiveTab,
		decActiveTab,
		ariaID
	} = getContext('api');

	let ref: HTMLSpanElement;
	export let index: number = -1;
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
		index = registerTab(ref, value);
		if (isActive) $activeTab.value = value;

		return () => unregisterTab(index);
	});
</script>

<button
	bind:this={ref}
	id={`tabs-${ariaID}-tab-${index + 1}`}
	class="py-2 px-4 rounded-full"
	class:active={isActive}
	on:click={() => setActiveTab(index, value)}
	on:focus={(e) => e.target?.addEventListener('keydown', handleKeydown)}
	type="button"
	role="tab"
	tabindex={isActive ? 0 : -1}
	data-state={isActive ? 'active' : 'inactive'}
	data-orientation="horizontal"
	aria-selected={isActive}
	aria-controls={`tabs-${ariaID}-panel-${index + 1}`}
>
	<slot />
</button>

<style>
	.active {
		@apply bg-blue-600 text-white;
	}
</style>
