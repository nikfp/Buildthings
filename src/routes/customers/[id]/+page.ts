import type { PageLoad } from './$types';

export const load: PageLoad = (event) => {
	const id = event.params['id'];
	return {
		id
	};
};
