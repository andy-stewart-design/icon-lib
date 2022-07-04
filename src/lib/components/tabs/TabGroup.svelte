<script lang="ts">
	import { setContext } from 'svelte';
	import { writable } from 'svelte/store';

	interface ActiveTab {
		index: number;
		value: string | null;
	}

	let tabs: HTMLElement[] = [];
	const activeTab = writable<ActiveTab>({ index: 0, value: '' });
	const setFocus = () => tabs[$activeTab.index].focus();

	setContext('api', {
		register: (tab: HTMLElement, value: string) => {
			tabs.push(tab);
			const i = tabs.indexOf(tab);
			if (i === $activeTab.index) $activeTab.value = value;
			return tabs.indexOf(tab);
		},
		unregister: (index: number) => {
			tabs.splice(index, 1);
		},
		setActiveTab: (index: number, value: string) => {
			$activeTab.index = index;
			$activeTab.value = value;
		},
		incActiveTab: (e: KeyboardEvent) => {
			if (e.key === 'End') {
				$activeTab.index = tabs.length - 1;
			} else if ($activeTab.index + 1 >= tabs.length) {
				$activeTab.index = 0;
			} else {
				$activeTab.index += 1;
			}
			$activeTab.value = tabs[$activeTab.index].textContent;
			setFocus();
		},
		decActiveTab: (e: KeyboardEvent) => {
			if (e.key === 'Home') {
				$activeTab.index = 0;
			} else if ($activeTab.index <= 0) {
				$activeTab.index = tabs.length - 1;
			} else {
				$activeTab.index -= 1;
			}
			$activeTab.value = tabs[$activeTab.index].textContent;
			setFocus();
		},
		tabs,
		activeTab
	});
</script>

<div class="mb-4">{$activeTab.index}: {$activeTab.value}</div>
<section
	class="flex bg-slate-200 p-2 mb-4 rounded-full"
	role="tablist"
	aria-orientation="horizontal"
	dir="ltr"
	tabindex="-1"
	data-orientation="horizontal"
>
	<slot />
</section>
