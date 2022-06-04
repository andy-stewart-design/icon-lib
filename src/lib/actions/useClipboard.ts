import type { Action } from 'svelte/types/runtime/action';

export const clipboard: Action<HTMLElement, string> = (node, text) => {
	const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" xml:space="preserve"><path d="${text}"/></svg>`;
	const click = async () => {
		try {
			await navigator.clipboard.writeText(svg);
			const useClipboard = new CustomEvent('useclipboard', { detail: { text } });
			node.dispatchEvent(useClipboard);
		} catch (err) {
			console.log('error:', err);
		}
	};
	node.addEventListener('click', click, true);

	return {
		update: (t: string) => (text = t),
		destroy: () => node.removeEventListener('click', click, true)
	};
};
