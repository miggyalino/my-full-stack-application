import { PrismaClient } from "@prisma/client";

// Prisma client singleton
// This is to ensure that we only have one instance of Prisma client
// This is important because having multiple instances of Prisma client can lead to memory leaks
// This happens mainly because of Next.js's hot reloading feature

const prismaClientSingleton = () => {
  return new PrismaClient();
};

declare const globalThis: {
  prismaGlobal: ReturnType<typeof prismaClientSingleton>;
} & typeof global;

const prisma = globalThis.prismaGlobal ?? prismaClientSingleton();

export default prisma;

if (process.env.NODE_ENV !== "production") globalThis.prismaGlobal = prisma;
