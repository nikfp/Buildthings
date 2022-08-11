import * as trpc from '@trpc/server';
import { string, z } from 'zod';
import { addressRouter } from './Address/address';
import { customerRouter } from './Customer/customer';
import { projectRouter } from './Project/project';

import { moreSchema } from './validators';

export const router = trpc
	.router()
	.query('hello', {
		resolve: () => 'world'
	})
	.mutation('makeit', {
		input: z.object({
			name: string().min(3),
			title: string().min(1)
		}),
		resolve: (args) => {
			const { name, title } = args.input;
			return {
				newName: `${name} is new!`,
				newTitle: `${title} is new!`
			};
		}
	})
	.mutation('sayit', {
		input: z.object({ words: string() }),
		resolve: (args) => {
			return `You said: ${args.input}`;
		}
	})
	.mutation('more', {
		input: moreSchema,
		resolve: (args) => {
			return `count: ${args.input.count}, things: ${args.input.things}`;
		}
	})
	.merge('address:', addressRouter)
	.merge('customer:', customerRouter)
	.merge('project:', projectRouter);

export type Router = typeof router;
