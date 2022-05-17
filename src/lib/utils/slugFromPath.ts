export const slugFromPath = (path: string) => {
	const slice = path.replace(/^[^a-zA-Z]+/gm, '/');
	return slice.substring(0, slice.lastIndexOf('.')) || slice;
};

export const slugFromString = (string: string) => {
	return string
		.toString()
		.trim()
		.toLowerCase()
		.replace(/\s+/g, '-') //spaces to dashes
		.replace(/&/g, '-and-') //ampersand to and
		.replace(/\+/g, '-and-') //plus to and
		.replace(/[^\w-]+/g, '') //remove non-words
		.replace(/--+/g, '-') //collapse multiple dashes
		.replace(/^-+/, '') //trim starting dash
		.replace(/-+$/, ''); //trim ending dash
};
