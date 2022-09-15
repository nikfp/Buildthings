import { PrismaClient, type Prisma } from '@prisma/.prisma/client';
import type {
	User,
	Customer,
	Project,
	Address,
	Contact,
	ContactsOnProjects
} from '@prisma/.prisma/client';

const prisma = new PrismaClient();

export default prisma;

export { User, Customer, Project, Address, Contact, Prisma, ContactsOnProjects };
