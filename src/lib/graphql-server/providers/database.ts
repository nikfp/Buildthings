import { PrismaClient } from '@prisma/client';
import type { User, Customer } from '@prisma/client';

const prisma = new PrismaClient();

export default prisma;

export type { User, Customer };
