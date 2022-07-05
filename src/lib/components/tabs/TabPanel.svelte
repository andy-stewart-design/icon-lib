<script lang="ts">
	import { getContext, onMount } from 'svelte';

	const { registerPanel, unregisterPanel, activeTab, ariaID } = getContext('api');

	let ref: HTMLDivElement;
	export let index: number = -1;

	$: isActive = $activeTab.index === index;

	onMount(() => {
		index = registerPanel(ref);
		return () => unregisterPanel(index);
	});
</script>

<div
	bind:this={ref}
	id={`tabs-${ariaID}-panel-${index + 1}`}
	class:hidden={!isActive}
	role="tabpanel"
	tabindex="0"
	hidden={!isActive}
	aria-labelledby={`tabs-${ariaID}-tab-${index + 1}`}
	aria-hidden={isActive}
>
	<slot />
</div>
