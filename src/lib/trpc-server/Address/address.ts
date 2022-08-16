import { router } from '@trpc/server';
import prisma from '$providers/database';
import { logger } from '../../utilities/logger';
import {
	newAddressSchema,
	updateAddressSchema,
	getAddressByIdSchema
} from '../../trpc-shared/address';

const location = 'address';

export const addressRouter = router()
	.query('getAll', {
		resolve: async () => {
			return await prisma.address.findMany();
		}
	})
	.query('getById', {
		input: getAddressByIdSchema,
		resolve: async ({ input }) => {
			return await prisma.address.findUniqueOrThrow({ where: { id: input.id } });
		}
	})
	.mutation('create', {
		input: newAddressSchema,
		resolve: async ({ input }) => {
			try {
				const data = newAddressSchema.parse(input);

				const dbAddress = await prisma.address.count({
					where: {
						street: data.street,
						city: data.city
					}
				});

				if (dbAddress > 0) return Promise.reject(new Error('Duplicate address found'));

				const address = await prisma.address.create({ data });

				return Promise.resolve(address);
			} catch (error) {
				const message =
					(error as Error).message || 'An error occured during the create address operation';
				logger(location, message);
				throw error as Error;
			}
		}
	})
	.mutation('update', {
		input: updateAddressSchema,
		resolve: async ({ input }) => {
			try {
				const data = updateAddressSchema.parse(input);

				const address = await prisma.address.update({
					where: {
						id: data.id
					},
					data
				});

				return Promise.resolve(address);
			} catch (error) {
				const message =
					(error as Error).message || 'An error occured during the update address operation';
				logger(location, message);
				throw error as Error;
			}
		}
	});
