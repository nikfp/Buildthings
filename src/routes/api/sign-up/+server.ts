import { json as json$1 } from '@sveltejs/kit';
import { createSession, getUserByEmail, registerUser } from '$lib/services/userService';
import { serialize } from 'cookie';
import type { RequestHandler } from '@sveltejs/kit';

export const POST: RequestHandler = async function ({ request }) {
	const { email, password } = await request.json();
	const user = await getUserByEmail(email);

	if (user) {
		return json$1({
			message: 'User already exists'
		}, {
			status: 409
		});
	}

	const newUser = await registerUser({
		email,
		password
	});

	if (!newUser) {
		return json$1({ message: 'Failed to register user' }, {
			status: 500
		});
	}

	const session = await createSession(newUser.id);

	if (!session) {
		return json$1({ message: 'Failed to created session' }, {
			status: 500
		});
	}

	const { id, expires } = session;
	return json$1({
		message: 'Successfully signed up'
	}, {
		status: 201,
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
