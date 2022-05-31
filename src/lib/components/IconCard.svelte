<script lang="ts">
	import type { Icons } from '$lib/types/icons';
	import { clipboard } from '$lib/actions/useClipboard';
	import { toggleToast, activeSVG, timeoutDuration } from '$lib/stores/toast';

	export let icon: Icons;
	const { name, path, src, category } = icon;

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

<button
	class="grid group relative hover:bg-blue-600 hover:bg-opacity-10"
	use:clipboard={path}
	on:useclipboard={onCopy}
>
	<div
		class="flex flex-col gap-y-2 border text-gray-800 border-gray-800 border-opacity-10 rounded-md"
	>
		<div class="flex justify-center items-center p-6 pt-8 group-hover:text-blue-600">
			<div class="w-full max-w-[40px]">
				<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" xml:space="preserve">
					<path fill="currentColor" d={path} />
				</svg>
			</div>
		</div>
		<!-- <div
			class="absolute top-0 left-0 w-full h-full flex justify-center items-center bg-blue-600 bg-opacity-0 rounded-sm transition-colors group-hover:bg-opacity-75"
		>
			<p class="text-white text-sm opacity-0 transition-opacity group-hover:opacity-100">
				{isActive ? 'SVG copied' : 'copy SVG'}
			</p>
		</div> -->
		<div
			class="flex flex-col items-center w-full p-2 pb-4 border-t border-gray-800 border-opacity-10"
		>
			<p class="text-sm text-center w-full mb-2">{name}</p>
			<p class="text-xs text-center bg-blue-600 bg-opacity-10 pt-px pb-0.5 px-2 rounded-full">
				{category}
			</p>
		</div>
	</div>
</button>
