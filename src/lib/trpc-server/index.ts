import * as trpc from '@trpc/server';
import { addressRouter } from './Address/address';
import { contactrouter } from './Contact/contact';
import { contactOnProjectRouter } from './ContactToPRoject/contactToProject';
import { customerRouter } from './Customer/customer';
import { projectRouter } from './Project/project';

export const router = trpc
	.router()
	.merge('address:', addressRouter)
	.merge('contact:', contactrouter)
	.merge('contactOnProject:', contactOnProjectRouter)
	.merge('customer:', customerRouter)
	.merge('project:', projectRouter);

export type Router = typeof router;
