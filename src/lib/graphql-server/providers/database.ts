import { PrismaClient } from '@prisma/.prisma/client';
import type { User, Customer } from '@prisma/.prisma/client';

const prisma = new PrismaClient();

export default prisma;

export type { User, Customer };
