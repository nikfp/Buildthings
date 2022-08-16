import { router } from '@trpc/server';
import prisma from '$providers/database';
import { logger } from '../../utilities/logger';
import { newContactSchema, updateContactSchema } from '$shared/contact';

const location = 'contact';

export const contactrouter = router()
	.query('getAll', {
		resolve: async () => {
			return await prisma.contact.findMany({
				include: {
					customer: true
				}
			});
		}
	})
	.mutation('create', {
		input: newContactSchema,
		resolve: async ({ input }) => {
			try {
				const data = newContactSchema.parse(input);

				await prisma.customer.findUniqueOrThrow({
					where: {
						id: data.customerId
					}
				});

				const contact = await prisma.contact.create({ data });

				return Promise.resolve(contact);
			} catch (error) {
				const message =
					(error as Error).message || 'An error occured during the create address operation';
				logger(location, message);
				throw error as Error;
			}
		}
	})
	.mutation('update', {
		input: updateContactSchema,
		resolve: async ({ input }) => {
			try {
				const data = updateContactSchema.parse(input);

				await prisma.customer.findUniqueOrThrow({
					where: {
						id: data.customerId
					}
				});

				const contact = await prisma.contact.update({
					where: {
						id: data.id
					},
					data
				});

				return Promise.resolve(contact);
			} catch (error) {
				const message =
					(error as Error).message || 'An error occured during the update address operation';
				logger(location, message);
				throw error as Error;
			}
		}
	});
