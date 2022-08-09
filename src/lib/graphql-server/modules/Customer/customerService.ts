import prisma from '$providers/database';
import { newCustomerSchema, updateCustomerSchema } from './validators';
import type { NewCustomerInput, UpdateCustomerInput } from './validators';
import { logger } from '../../../utilities/logger';

const location = 'customerService';

export async function getCustomers() {
	return prisma.customer.findMany();
}

export async function getCustomerById(id: string) {
	return prisma.customer.findUnique({ where: { id }, rejectOnNotFound: true });
}

export async function getCustomersByAddressId(addressId: string) {
	return await prisma.customer.findMany({ where: { addressId } });
}

export async function getCustomerByContactId(contactId: string) {
	return await prisma.customer.findFirst({
		where: {
			contacts: {
				some: {
					id: contactId
				}
			}
		},
		rejectOnNotFound: true
	});
}

export async function createCustomer(input: NewCustomerInput) {
	try {
		const { name, addressId } = newCustomerSchema.parse(input);

		const customers = prisma.customer.findMany({ where: { name } });
		const address = prisma.address.findUnique({ where: { id: addressId } });

		if ((await customers).length > 0) return Promise.reject(new Error('Customer already exists'));
		if (!(await address)) return Promise.reject(new Error('Address not found'));

		const dbCustomer = await prisma.customer.create({ data: { name, addressId } });

		return Promise.resolve(dbCustomer);
	} catch (error) {
		const message =
			(error as Error).message || 'An error occured during the create customer operation';
		logger(location, message);
		throw error as Error;
	}
}

export async function updateCustomer(input: UpdateCustomerInput) {
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
