import type { Customer } from '$providers/database';
import { z } from 'zod';
import type { toZod } from 'tozod';
import { nameRegex } from '../utilities/utilities';

export const updateCustomerSchema: toZod<Customer> = z.object({
	id: z.string().uuid(),
	name: z
		.string()
		.trim()
		.min(5, 'Customer name must be at least 5 characters')
		.max(50, 'Customer name cannot exceed ')
		.regex(nameRegex, 'Customer name contains an invalid character'),
	phone: z
		.string()
		.trim()
		.min(7, 'Must be a valid phone number')
		.max(15, 'Must be a valid phone number'),
	addressId: z.string().uuid('Address ID must be valid')
});
export const newCustomerSchema = updateCustomerSchema.omit({ id: true });

export const getCustomerByIdInputSchema = updateCustomerSchema.pick({ id: true });
