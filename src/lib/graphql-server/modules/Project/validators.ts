import { z, string } from 'zod';
import type { toZod } from 'tozod';

import type { NewProjectInput, UpdateProjectInput } from '../../generated-types/graphql';

export const newProjectSchema: toZod<NewProjectInput> = z.object({
	name: string().min(5).max(50),
	customerId: string().uuid()
});

export const updateProjectSchema: toZod<UpdateProjectInput> = newProjectSchema.extend({
	id: string().uuid()
});

export type { NewProjectInput, UpdateProjectInput };
