<script lang="ts">
	import type { Icons } from '$lib/types/icons';
	import { clipboard } from '$lib/actions/useClipboard';
	import { toggleToast, activeSVG } from '$lib/stores/toast';

	export let icon: Icons;
	const { name, path, category } = icon;

	export let index: number;
	const _index = index + 1 <= 9 ? `0${index + 1}` : index + 1;

	const onCopy = () => {
		$activeSVG = name;
		toggleToast();
	};
</script>

<button
	class="grid group relative rounded-sm hover:bg-blue-600 hover:bg-opacity-10 pt-8 pb-6"
	type="button"
	use:clipboard={path}
	on:useclipboard={onCopy}
>
	<div
		class="relative flex flex-col gap-y-2 border-gray-800 border-opacity-10 group-hover:text-blue-600 group-hover:border-blue-600"
	>
		<!-- <div class="grid grid-cols-2 py-1 px-2">
			<p class="text-[11px] text-left">{_index}</p>
			<p class="text-[11px] text-right">{category}</p>
		</div> -->
		<div class="flex justify-center items-center  px-4">
			<div class="w-full max-w-[40px]">
				<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" xml:space="preserve">
					<path fill="currentColor" d={path} />
				</svg>
			</div>
		</div>
		<div class="flex flex-col items-center w-full pt-2 px-2">
			<p class="font-medium text-xs text-center w-full mb-2">{name}</p>
		</div>
	</div>
</button>
