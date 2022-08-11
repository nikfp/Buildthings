import type { Project } from '$providers/database';
import { z } from 'zod';
import type { toZod } from 'tozod';
import { nameRegex } from '../utilities/utilities';

export const updateProjectSchema: toZod<Project> = z.object({
	id: z.string().uuid(),
	name: z
		.string()
		.trim()
		.min(1)
		.max(50)
		.regex(nameRegex, 'Project name contains an invalid character'),
	addressId: z.string().uuid(),
	customerId: z.string().uuid()
});

export const newProjectSchema = updateProjectSchema.omit({ id: true });

export const getProjectWithDetailsSchema = updateProjectSchema.pick({ id: true });
