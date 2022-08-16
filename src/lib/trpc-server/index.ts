import * as trpc from '@trpc/server';
import { string, z } from 'zod';
import { addressRouter } from './Address/address';
import { contactrouter } from './Contact/contact';
import { customerRouter } from './Customer/customer';
import { projectRouter } from './Project/project';

export const router = trpc
	.router()
	.merge('address:', addressRouter)
	.merge('customer:', customerRouter)
	.merge('project:', projectRouter)
	.merge('contact:', contactrouter);

export type Router = typeof router;
