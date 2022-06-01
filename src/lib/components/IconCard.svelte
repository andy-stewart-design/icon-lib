<script lang="ts">
	import type { Icons } from '$lib/types/icons';
	import { clipboard } from '$lib/actions/useClipboard';
	import { toggleToast, activeSVG, timeoutDuration } from '$lib/stores/toast';

	export let icon: Icons;
	const { name, path, src, category } = icon;

	export let index: number;
	const _index = index <= 9 ? `0${index}` : index;

	const onCopy = () => {
		$activeSVG = name;
		toggleToast();
	};
</script>

<button
	class="grid group relative hover:bg-blue-600 hover:bg-opacity-10"
	use:clipboard={path}
	on:useclipboard={onCopy}
>
	<div
		class="relative flex flex-col gap-y-2 border text-gray-800 border-gray-800 border-opacity-10 rounded-sm hover:text-blue-600"
	>
		<div class="grid grid-cols-2 py-1 px-2">
			<p class="text-[11px] text-left">{_index}</p>
			<p class="text-[11px] text-right">{category}</p>
		</div>
		<div class="flex justify-center items-center p-6">
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
