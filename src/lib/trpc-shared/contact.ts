import type { Contact } from '$providers/database';
import { z } from 'zod';
import type { toZod } from 'tozod';
import { nameRegex } from '../utilities/utilities';

export const updateContactSchema: toZod<Contact> = z.object({
	id: z.string().uuid('Contact Id must be valid'),
	customerId: z.string().uuid('Customer Id must be valid'),
	firstName: z
		.string()
		.trim()
		.min(1, 'Name is required')
		.max(50, 'Name is too long')
		.regex(nameRegex, 'Name contains an invalid character'),
	lastName: z
		.string()
		.trim()
		.max(50, 'Name is too long')
		.regex(nameRegex, 'Name contains an invalid character')
		.nullable(),

	phone: z
		.string()
		.trim()
		.min(7, 'Must be a valid phone number')
		.max(15, 'Must be a valid phone number')
});

export const newContactSchema = updateContactSchema.omit({ id: true });
