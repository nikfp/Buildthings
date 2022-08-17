import { redirect } from '@sveltejs/kit';
import type { LayoutLoad } from './$types';

export const load: LayoutLoad = async function ({ url, session }) {
	console.log('Layout Loading');
	if (!session.user) {
		if (url.pathname !== '/sign-in' && url.pathname !== '/sign-up') {
			throw redirect(302, `/sign-in?redirect=${url.pathname}&query=${url.search}`);
		}
	}

	return {};
};
