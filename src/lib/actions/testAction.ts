import type { Action } from '../types/actions';

export const test: Action<any> = (node) => {
	const click = async () => {
		try {
			await navigator.clipboard.writeText(node.innerHTML);
			console.log(node.innerHTML);

			const testEvent = new CustomEvent('testevent', { detail: node.innerHTML });
			node.dispatchEvent(testEvent);
		} catch (err) {
			console.log('error:', err);
		}
	};

	node.addEventListener('click', click, true);

	return {
		update: (t: string) => (node.innerHTML = t),
		destroy: () => node.removeEventListener('click', click, true)
	};
};
