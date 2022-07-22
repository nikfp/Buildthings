import adapter from '@sveltejs/adapter-auto';
import preprocess from 'svelte-preprocess';
import houdini from 'houdini/preprocess';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	// Consult https://github.com/sveltejs/svelte-preprocess
	// for more information about preprocessors
	preprocess: [preprocess(), houdini()],

	kit: {
		adapter: adapter(),
		package: {
			files: (filepath) => {
				const isTestFile = /\S*\.spec.ts$|\S*\.setup.ts$/.test(filepath);
				return !isTestFile;
			}
		}
	}
};

export default config;
