export interface Tab {
	ref: HTMLButtonElement | null;
	value: string;
	index: number;
	isActive: boolean;
	isDisabled: boolean;
}
