import type { Address } from '$providers/database';
import { z } from 'zod';
import type { toZod } from 'tozod';

export const updateAddressSchema: toZod<Address> = z.object({
	id: z.string().uuid(),
	city: z
		.string()
		.trim()
		.min(2, 'City name must be valid')
		.max(50, 'City name must not exceed 50 characters')
		.regex(/[a-zA-Z0-9.#\- ]+/, 'City contains an invalid character'),
	street: z
		.string()
		.trim()
		.min(2, 'Street address must be valid')
		.max(50, 'Street address is too long')
		.regex(/[a-zA-Z0-9.#\- ]+/, 'Street address contains an invalid character')
});

export const newAddressSchema = updateAddressSchema.omit({ id: true });

export const getAddressByIdSchema = updateAddressSchema.pick({ id: true });
