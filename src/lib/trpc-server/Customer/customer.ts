import { router } from '@trpc/server';
import prisma from '$providers/database';
import {
	getCustomerByIdInputSchema,
	newCustomerSchema,
	updateCustomerSchema
} from '../../trpc-shared/customer';
import { logger } from '../../utilities/logger';

const location = 'customer';

export const customerRouter = router()
	.query('getAll', {
		resolve: async () => {
			return await prisma.customer.findMany();
		}
	})
	.query('getById', {
		input: getCustomerByIdInputSchema,
		resolve: async ({ input }) => {
			await prisma.customer.findUniqueOrThrow({ where: { id: input.id } });
		}
	})
	.query('getDetails', {
		input: getCustomerByIdInputSchema,
		resolve: async ({ input }) => {
			return await prisma.customer.findUniqueOrThrow({
				where: { id: input.id },
				include: {
					projects: {
						include: {
							address: true
						}
					},
					address: true
				}
			});
		}
	})
	.mutation('create', {
		input: newCustomerSchema,
		resolve: async ({ input }) => {
			try {
				const data = newCustomerSchema.parse(input);

				const { name, addressId } = data;

				const customers = prisma.customer.findMany({ where: { name } });
				const address = prisma.address.findUnique({ where: { id: addressId } });

				if ((await customers).length > 0)
					return Promise.reject(new Error('Customer already exists'));
				if (!(await address)) return Promise.reject(new Error('Address not found'));

				const dbCustomer = await prisma.customer.create({ data });

				return Promise.resolve(dbCustomer);
			} catch (error) {
				const message =
					(error as Error).message || 'An error occured during the create customer operation';
				logger(location, message);
				throw error as Error;
			}
		}
	})
	.mutation('update', {
		input: updateCustomerSchema,
		resolve: async ({ input }) => {
			try {
				const data = updateCustomerSchema.parse(input);
				const address = await prisma.address.findUnique({ where: { id: data.addressId } });

				if (!address) return Promise.reject(new Error('Address not found'));

				const customer = await prisma.customer.update({ where: { id: data.id }, data });

				return customer;
			} catch (error) {
				const message =
					(error as Error).message || 'An error occurred during the update customer operation';
				logger(location, message);
				throw error as Error;
			}
		}
	});
