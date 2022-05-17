import { writable } from 'svelte/store';

export const timeoutDuration: number = 2000;
let timer: ReturnType<typeof setTimeout>;

export const toastIsActive = writable(false);
export const activeSVG = writable('');

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
