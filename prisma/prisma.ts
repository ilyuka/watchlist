import { PrismaClient } from "@prisma/client";

const prisma: PrismaClient = new PrismaClient();
console.log("Created prisma client");
export default prisma;
