// import { PrismaClient } from "@prisma/client"; //if the client is generated to "node_modules"
import { PrismaClient } from "@/generated/prisma"; //generated to (../src/generated/prisma),
import { withAccelerate } from "@prisma/extension-accelerate";
import { PrismaPg } from "@prisma/adapter-pg";
import { Pool } from "pg";
import "dotenv/config";

//prevents your application from opening too many database connections during development,
const globalForPrisma = global as unknown as { prisma: PrismaClient };

const pool = new Pool({ connectionString: process.env.DATABASE_URL });
const adapter = new PrismaPg(pool);

// initialize prisma and export it for use
const prisma =
  globalForPrisma.prisma ||
  new PrismaClient({ adapter }).$extends(withAccelerate());

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;

export { prisma };
