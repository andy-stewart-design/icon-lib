<script lang="ts">
	import type { Icons } from '$lib/types/icons';
	import { iconIndex } from '$lib/data/icons';
	import Toast from '$lib/components/Toast.svelte';
	import IconCard from '$lib/components/IconCard.svelte';

	const icons: Icons[] = [
		{
			name: 'Cube',
			src: 'cube.svg',
			path: `m21.485 6.126-9-5c-.303-.168-.669-.168-.972 0l-9 5C2.197 6.302 2 6.637 2 7v10c0 .363.197.698.514.874l9 5c.152.084.319.126.486.126s.334-.042.486-.126l9-5c.317-.176.514-.511.514-.874V7c0-.363-.197-.698-.515-.874zM12 3.144 18.94 7 12 10.856 5.059 7 12 3.144zM4 8.699l7 3.889V20.3l-7-3.89V8.699zm9 11.602v-7.712L20 8.7v7.712l-7 3.889z`
		},
		{
			name: 'Download',
			src: 'download.svg',
			path: `m11.293 17.707-7-7 1.414-1.414L11 14.586V1h2v13.586l5.293-5.293 1.414 1.414-7 7c-.195.195-.451.293-.707.293s-.512-.098-.707-.293zM19 18v3H5v-3H3v4c0 .553.448 1 1 1h16c.553 0 1-.447 1-1v-4h-2z`
		}
	];

	console.log(iconIndex);
</script>

<div class="flex gap-4">
	{#each icons as icon}
		<IconCard {icon} />
	{/each}
</div>

<Toast />
