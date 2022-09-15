import type { ContactsOnProjects } from '$providers/database';
import { z } from 'zod';
import type { toZod } from 'tozod';

export const addContactToProjectSchema: toZod<ContactsOnProjects> = z.object({
	contactId: z.string().uuid('Contact ID must be valid'),
	projectId: z.string().uuid('Project ID must be valid'),
	role: z
		.string()
		.trim()
		.min(1, 'Role must be defined')
		.max(50, 'Role is too long. Please shorten.')
});

export const RemoveContactSchema = addContactToProjectSchema.omit({
	role: true
});
