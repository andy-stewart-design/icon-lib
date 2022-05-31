<script lang="ts">
	import type { Icons } from '$lib/types/icons';
	import { clipboard } from '$lib/actions/useClipboard';
	import { toggleToast, activeSVG, timeoutDuration } from '$lib/stores/toast';

	export let icon: Icons;
	export let index: number;
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
		class="relative flex flex-col gap-y-2 border text-gray-800 border-gray-800 border-opacity-10 rounded-md"
	>
		<p class="absolute top-[6px] left-2 text-xs">{index}</p>
		<p class="absolute top-[6px] right-2 text-xs text-right">{category}</p>
		<div class="flex justify-center items-center p-6 pt-12 group-hover:text-blue-600">
			<div class="w-full max-w-[40px]">
				<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" xml:space="preserve">
					<path fill="currentColor" d={path} />
				</svg>
			</div>
		</div>
		<div class="flex flex-col items-center w-full pt-2 px-2">
			<p class="text-sm text-center w-full mb-2">{name}</p>
			<!-- <p class="text-xs text-center bg-blue-600 bg-opacity-10 pt-px pb-0.5 px-2 rounded-full">
				{category}
			</p> -->
		</div>
	</div>
</button>
