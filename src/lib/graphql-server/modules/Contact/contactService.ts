import prisma from '$providers/database';
import { newContactSchema, updateContactSchema } from './validators';
import type { NewContactInput, UpdateContactInput } from './validators';
import { logger } from '../../../utilities/logger';

const location = 'contactService';

export async function getContacts() {
	return await prisma.contact.findMany();
}

export async function getContactByID(id: string) {
	return await prisma.contact.findUnique({ where: { id } });
}

export async function getContactsForCustomerId(customerId: string) {
	return await prisma.contact.findMany({ where: { customerId } });
}

export async function getContactsForProjectId(projectId: string) {
	return await prisma.project.findUnique({ where: { id: projectId } }).contacts();
}

export async function createContact(input: NewContactInput) {
	try {
		const { firstName, lastName, customerId, phone } = newContactSchema.parse(input);

		const customer = prisma.customer.findFirst({ where: { id: customerId } });

		if (!customer) return Promise.reject(new Error('Customer not found'));

		const dbContact = await prisma.contact.create({
			data: { firstName, lastName, phone, customerId }
		});

		return Promise.resolve(dbContact);
	} catch (error) {
		const message =
			(error as Error).message || 'An error occured during the create contact operation';
		logger(location, message);
		throw error as Error;
	}
}

export async function updateContact(input: UpdateContactInput) {
	try {
		const data = updateContactSchema.parse(input);
		const customer = await prisma.customer.findUnique({ where: { id: data.customerId } });

		if (!customer) return Promise.reject(new Error('Customer not found'));

		const contact = await prisma.contact.update({ where: { id: data.id }, data });

		return contact;
	} catch (error) {
		const message =
			(error as Error).message || 'An error occurred during the update customer operation';
		logger(location, message);
		throw error as Error;
	}
}
