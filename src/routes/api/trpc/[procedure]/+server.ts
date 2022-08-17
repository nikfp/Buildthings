import type { RequestHandler } from '@sveltejs/kit';
import type { Dict } from '@trpc/server';
import { resolveHTTPResponse } from '@trpc/server';
import { router } from '$lib/trpc-server';

const handler: RequestHandler = async function ({ request, url }) {
	const formattedRequest = request as Request & {
		headers: Dict<string | string[]>;
	};

	const req = {
		method: formattedRequest.method,
		headers: formattedRequest.headers,
		query: url.searchParams,
		body: await formattedRequest.text()
	};

	const httpResponse = await resolveHTTPResponse({
		router,
		req,
		path: url.pathname.split('/').pop() ?? '',
		createContext: async () => Promise.resolve({})
		// responseMeta
	});

	const { status, headers, body } = httpResponse as {
		status: number;
		headers: Record<string, string>;
		body: string;
	};

	return new Response(body, { status, headers });
};

export { handler as GET, handler as POST };
