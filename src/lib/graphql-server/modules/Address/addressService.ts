import prisma from '../../providers/database';
import { newAddressSchema, updateAddressSchema } from './validators';
import type { NewAddressInput, UpdateAddressInput } from './validators';
import { logger } from '../../../utilities/logger';

const location = 'address';

export async function getAddresses() {
	return await prisma.address.findMany();
}

export async function getAddressById(id: string) {
	return await prisma.address.findUnique({ where: { id }, rejectOnNotFound: true });
}

export async function createAddress(input: NewAddressInput) {
	try {
		const data = newAddressSchema.parse(input);

		const dbAddress = await prisma.address.findMany({
			where: {
				street: data.street,
				city: data.city
			}
		});

		if (dbAddress.length > 0) return Promise.reject(new Error('Duplicate address found'));

		const address = await prisma.address.create({ data });

		return Promise.resolve(address);
	} catch (error) {
		const message =
			(error as Error).message || 'An error occured during the create address operation';
		logger(location, message);
		throw error as Error;
	}
}

export async function updateAddress(input: UpdateAddressInput) {
	try {
		const data = updateAddressSchema.parse(input);

		const dbAddress = await prisma.address.findUnique({
			where: {
				id: data.id
			}
		});

		if (!dbAddress) return Promise.reject(new Error('Address to update not found'));

		const address = await prisma.address.create({ data });

		return Promise.resolve(address);
	} catch (error) {
		const message =
			(error as Error).message || 'An error occured during the update address operation';
		logger(location, message);
		throw error as Error;
	}
}
