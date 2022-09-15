import { router } from '@trpc/server';
import prisma from '$providers/database';
import { logger } from '../../utilities/logger';
import { addContactToProjectSchema, RemoveContactSchema } from '$shared/contactOnProject';

const location = 'contact';

export const contactOnProjectRouter = router()
	.mutation('addContactToProject', {
		input: addContactToProjectSchema,
		resolve: async ({ input }) => {
			try {
				const result = await prisma.contactsOnProjects.create({
					data: input
				});
				return result;
			} catch (error) {
				const message =
					(error as Error).message || 'An error occured during the connect contact operation';
				logger(location, message);
				throw error as Error;
			}
		}
	})
	.mutation('removeContactFromProject', {
		input: RemoveContactSchema,
		resolve: async ({ input }) => {
			const { projectId, contactId } = input;
			try {
				const value = await prisma.project.update({
					where: {
						id: projectId
					},
					data: {
						contacts: {
							disconnect: {
								contactId_projectId: {
									contactId,
									projectId
								}
							}
						}
					}
				});

				if (value) return true;

				return false;
			} catch (error) {
				const message =
					(error as Error).message || 'An error occured during the disconnect contact operation';
				logger(location, message);
				throw error as Error;
			}
		}
	});
