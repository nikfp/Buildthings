import type { PageLoad } from './$types';

export const load: PageLoad = async (event) => {
	const id = event.params['id'];
	return {
		id
	};
};
