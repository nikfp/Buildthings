import { z, string } from 'zod';
import type { toZod } from 'tozod';

import type { NewAddressInput, UpdateAddressInput } from '../../generated-types/graphql';

export const newAddressSchema: toZod<NewAddressInput> = z.object({
	city: string().min(2).max(50),
	street: string().min(5).max(50)
});

export const updateAddressSchema: toZod<UpdateAddressInput> = newAddressSchema.extend({
	id: string().uuid()
});

export type { NewAddressInput, UpdateAddressInput };
