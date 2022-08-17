import { json as json$1 } from '@sveltejs/kit';
import type { RequestHandler } from '@sveltejs/kit';
import { createSession, getUserByEmail, validateUserCredentials } from '$lib/services/userService';
import { serialize } from 'cookie';

export const POST: RequestHandler = async function ({ request }) {
	const { email, password } = await request.json();

	const isValid = await validateUserCredentials(email, password);
	const user = await getUserByEmail(email);

	// ⚠️ CAUTION: Do not store a plain passwords. Use proper hashing and salting.
	if (!isValid || !user) {
		return json$1({
			message: 'Incorrect user or password'
		}, {
			status: 401
		});
	}

	const session = await createSession(user.id);

	if (!session) {
		return json$1({ message: 'Server error creating session' }, {
			status: 500
		});
	}

	const { id, expires } = session;
	return json$1({
		message: 'Successfully signed in'
	}, {
		headers: {
			'Set-Cookie': serialize('session_id', id, {
				path: '/',
				httpOnly: true,
				sameSite: 'strict',
				secure: true,
				expires
			})
		}
	});
};
