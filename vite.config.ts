import { sveltekit } from '@sveltejs/kit/vite';
import path from 'path';

/** @type {import('vite').UserConfig} */
const config = {
	plugins: [sveltekit()],
	resolve: {
		alias: {
			$providers: path.resolve('src', 'lib', 'providers'),
			$components: path.resolve('src', 'lib', 'components'),
			$shared: path.resolve('src', 'lib', 'trpc-shared'),
			$client: path.resolve('src', 'lib', 'trpc-client')
		}
	},
	server: {
		fs: {
			allow: ['.']
		}
	},
	test: {
		globals: true,
		coverage: {
			all: true,
			skipFull: true,
			src: ['./src'],
			exclude: [
				'**/generated/**/*',
				'**/graphql-client/**/*',
				'**/*.d.ts',
				'**/*.spec.ts',
				'**/*.svelte',
				'**/generated-types/**/*',
				'**/*/graphql-server/executor.ts'
			]
		}
	}
};

export default config;
