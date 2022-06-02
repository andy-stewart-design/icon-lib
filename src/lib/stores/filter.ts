import { writable, type Writable } from 'svelte/store';

export const activeItem: Writable<number> = writable(0);
