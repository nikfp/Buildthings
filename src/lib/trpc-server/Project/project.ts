import { router } from '@trpc/server';
import prisma from '$providers/database';
import {
	newProjectSchema,
	updateProjectSchema,
	getProjectWithDetailsSchema
} from '../../trpc-shared/project';
import { logger } from '../../utilities/logger';

const location = 'project';

export const projectRouter = router()
	.query('getAll', {
		resolve: async () => {
			return await prisma.project.findMany();
		}
	})
	.query('getWithDetails', {
		resolve: async () => {
			return await prisma.project.findMany({
				include: {
					customer: true,
					address: true
				}
			});
		}
	})
	.query('getByIdWithDetails', {
		input: getProjectWithDetailsSchema,
		resolve: async ({ input }) => {
			return await prisma.project.findUniqueOrThrow({
				where: {
					id: input.id
				},
				include: {
					customer: true,
					address: true,
					contacts: true
				}
			});
		}
	})
	.mutation('create', {
		input: newProjectSchema,
		resolve: async ({ input }) => {
			try {
				const { name, customerId, addressId } = newProjectSchema.parse(input);

				const address = prisma.address.findUnique({ where: { id: addressId } });
				const customer = prisma.customer.findUnique({ where: { id: customerId } });

				if (!(await address)) return Promise.reject(new Error('Address not found'));
				if (!(await customer)) return Promise.reject(new Error('Customer not found'));

				const dbProject = await prisma.project.create({ data: { name, customerId, addressId } });

				return Promise.resolve(dbProject);
			} catch (error) {
				const message =
					(error as Error).message || 'An error occured during the create project operation';
				logger(location, message);
				throw error as Error;
			}
		}
	})
	.mutation('update', {
		input: updateProjectSchema,
		resolve: async ({ input }) => {
			try {
				const data = updateProjectSchema.parse(input);

				const customer = prisma.customer.findUnique({
					where: {
						id: data.customerId
					}
				});

				const address = prisma.address.findUnique({ where: { id: data.addressId } });

				if (!(await address)) return Promise.reject(new Error('Address not found'));
				if (!(await customer)) return Promise.reject(new Error('Customer not found'));

				const project = await prisma.project.update({
					where: { id: data.id },
					data
				});

				return project;
			} catch (error) {
				const message =
					(error as Error).message || 'An error occurred during the update project operation';
				logger(location, message);
				throw error as Error;
			}
		}
	});
