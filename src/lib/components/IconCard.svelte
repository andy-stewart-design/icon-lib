<script lang="ts">
	import type { Icons } from '$lib/types/icons';
	import { clipboard } from '$lib/actions/useClipboard';
	import { toggleToast, activeSVG, timeoutDuration } from '$lib/stores/toast';

	export let icon: Icons;
	const { name, path, src } = icon;

	let isActive: boolean = false;
	let timer: ReturnType<typeof setTimeout>;

	const runTimer = () => {
		timer = setTimeout(() => {
			isActive = false;
		}, timeoutDuration);
	};

	const toggleType = () => {
		isActive = true;
		clearTimeout(timer);
		runTimer();
	};

	const onCopy = () => {
		$activeSVG = name;
		toggleToast();
		toggleType();
	};
</script>

<div class="flex flex-col gap-y-2 w-32 p-1 border border-black border-opacity-10 rounded">
	<button class="group relative p-8" use:clipboard={path} on:useclipboard={onCopy}>
		<img
			class="transition-opacity group-hover:opacity-10"
			src={`/img/icons/${src}`}
			alt="cube icon"
		/>
		<div
			class="absolute top-0 left-0 w-full h-full flex justify-center items-center bg-blue-500 bg-opacity-0 transition-colors group-hover:bg-opacity-10"
		>
			<p class="text-blue-600 text-sm opacity-0 transition-opacity group-hover:opacity-100">
				{isActive ? 'SVG copied' : 'copy SVG'}
			</p>
		</div>
	</button>
	<p class="text-sm text-center w-full mb-2">{name}</p>
</div>
