import { PrismaClient } from '@prisma/.prisma/client';
import type { User, Customer, Project, Address } from '@prisma/.prisma/client';

const prisma = new PrismaClient();

export default prisma;

export { User, Customer, Project, Address };
