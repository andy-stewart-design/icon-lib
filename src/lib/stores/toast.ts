import { writable, type Writable } from 'svelte/store';

export const timeoutDuration: number = 2000;
let timer: ReturnType<typeof setTimeout>;

export const toastIsActive: Writable<boolean> = writable(false);
export const activeSVG: Writable<string> = writable('');

const runTimer = () => {
	timer = setTimeout(() => {
		toastIsActive.set(false);
	}, timeoutDuration);
};

export const toggleToast = () => {
	toastIsActive.set(true);
	clearTimeout(timer);
	runTimer();
};
