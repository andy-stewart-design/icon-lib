import adapter from '@sveltejs/adapter-auto';
import dsv from '@rollup/plugin-dsv';
import svg from 'vite-plugin-svgstring';
import preprocess from 'svelte-preprocess';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	// Consult https://github.com/sveltejs/svelte-preprocess
	// for more information about preprocessors
	preprocess: [
		preprocess({
			postcss: true
		})
	],

	kit: {
		adapter: adapter(),
		vite: {
			plugins: [dsv(), svg()]
		}
	}
};

export default config;
