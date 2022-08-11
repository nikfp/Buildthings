import { z } from 'zod';

export const moreSchema = z.object({
	things: z.string(),
	count: z.number().min(1)
});
