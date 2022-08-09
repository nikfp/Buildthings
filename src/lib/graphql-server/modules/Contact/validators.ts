import { z, string } from 'zod';
import type { toZod } from 'tozod';

import type { UpdateContactInput, NewContactInput } from '../../generated-types/graphql';

export const newContactSchema: toZod<NewContactInput> = z.object({
	customerId: string().uuid(),
	firstName: string().min(1).max(50),
	lastName: string().min(1).max(50).optional(),
	phone: string().min(7).max(12)
});

export const updateContactSchema: toZod<UpdateContactInput> = newContactSchema.extend({
	id: string().uuid()
});

export type { UpdateContactInput, NewContactInput };
