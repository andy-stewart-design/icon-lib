<script lang="ts">
	import { setContext } from 'svelte';
	import { writable } from 'svelte/store';
	import type { ActiveTab, TabsArray } from '$lib/components/tabs/tabs';

	let tabs: TabsArray[] = [];
	let panels: HTMLDivElement[] = [];
	const activeTab = writable<ActiveTab>({ index: 0, value: '' });
	const setFocus = () => tabs[$activeTab.index].node.focus();
	const ariaID = Math.floor(Math.random() * 1000000);

	setContext('api', {
		registerTab: (node: HTMLElement, value: string) => {
			tabs.push({ node, value });
			const i = tabs.findIndex((obj) => obj.node === node);
			if (i === $activeTab.index) $activeTab.value = value;
			return i;
		},
		unregisterTab: (index: number) => {
			tabs.splice(index, 1);
		},
		registerPanel: (node: HTMLDivElement) => {
			panels.push(node);
			return panels.indexOf(node);
		},
		unregisterPanel: () => {},
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
			$activeTab.value = tabs[$activeTab.index].value;
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
			$activeTab.value = tabs[$activeTab.index].value;
			setFocus();
		},
		tabs,
		activeTab,
		ariaID
	});
</script>

<div class="bg-slate-200 p-4 mb-8 rounded">
	<slot />
</div>
