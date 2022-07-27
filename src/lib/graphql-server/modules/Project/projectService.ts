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

export async function createProject(input: NewProjectInput) {
	try {
		const { name, customerId } = newProjectSchema.parse(input);

		const dbProject = await prisma.project.create({ data: { name, customerId } });

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

		const customer = await prisma.customer.findUnique({
			where: {
				id: data.customerId
			}
		});

		if (!customer) {
			throw new Error('Customer not found for create project operation');
		}

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
