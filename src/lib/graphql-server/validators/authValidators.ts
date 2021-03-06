import { string, z } from 'zod';

export const signinSchema = z.object({
	email: string().email().min(5, "Email must be at least 5 characters"),
	password: string()
});

export type SignInSchema = z.infer<typeof signinSchema>;

export const signupSchema = signinSchema
	.extend({
		confirm: string()
	})
	.refine((values) => values.password === values.confirm, {
		message: 'Passwords must match!',
		path: ['confirm']
	})
	.transform(({ email, password }) => {
		return { email, password };
	});

export type SignUpSchema = z.infer<typeof signupSchema>;
