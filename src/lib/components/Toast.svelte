<script lang="ts">
	import { fly } from 'svelte/transition';
	import { quadOut } from 'svelte/easing';
	import { toastIsActive, activeSVG } from '$lib/stores/toast';
</script>

{#if $toastIsActive}
	<div
		transition:fly={{ y: 20, duration: 250, easing: quadOut }}
		class="fixed bottom-8 left-1/2 -translate-x-1/2 bg-black text-white p-3 px-4 rounded shadow-md select-none"
	>
		{`${$activeSVG} SVG Copied`}
	</div>
{/if}
