import { z, string } from 'zod';
import type { toZod } from 'tozod';

import type { UpdateCustomerInput, NewCustomerInput } from '../../generated-types/graphql';

export const newCustomerSchema: toZod<NewCustomerInput> = z.object({
	name: string().min(5).max(50),
	phone: string().min(7).max(15)
});

export const updateCustomerSchema: toZod<UpdateCustomerInput> = newCustomerSchema.extend({
	id: string().uuid()
});

export type { NewCustomerInput, UpdateCustomerInput };
