import prisma from '../../providers/database';
import { newProjectSchema, updateProjectSchema } from './validators';
import type { NewProjectInput, UpdateProjectInput } from './validators';
import { logger } from '../../../utilities/logger';

const location = 'projectservice';

export async function getProjects() {
	return await prisma.project.findMany();
}

export async function getProjectById(id: string) {
	return await prisma.project.findUnique({ where: { id }, rejectOnNotFound: true });
}

export async function getProjectsByCustomerId(id: string) {
	return await prisma.project.findMany({ where: { customerId: id } });
}

export async function getProjectsByAddressId(addressId: string) {
	return await prisma.project.findMany({ where: { addressId } });
}

export async function getProjectsByContactId(contactId: string) {
	return await prisma.project.findMany({
		where: {
			contacts: {
				some: {
					id: contactId
				}
			}
		}
	});
}

export async function createProject(input: NewProjectInput) {
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

export async function updateProject(input: UpdateProjectInput) {
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
