import { z, string } from 'zod';
import type { toZod } from 'tozod';

import type { UpdateCustomerInput, NewCustomerInput } from '../../validators/validationTypes';

export const newCustomerSchema: toZod<NewCustomerInput> = z.object({
	name: string().min(5).max(50)
});

export const updateCustomerSchema: toZod<UpdateCustomerInput> = newCustomerSchema.extend({
	id: string().uuid()
});

export type { NewCustomerInput, UpdateCustomerInput };
