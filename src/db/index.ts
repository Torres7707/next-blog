import { PrismaClient } from "@prisma/client";

// Extend the global namespace to include prisma
declare global {
	var prisma: PrismaClient;
}

// Declare prisma instance
let prisma: PrismaClient;

// In production, always create a new PrismaClient instance
if (process.env.NODE_ENV === "production") {
	prisma = new PrismaClient();
} else {
	// In development, reuse the existing connection or create a new one
	// This prevents multiple connections during hot reloading
	if (!global.prisma) {
		global.prisma = new PrismaClient();
	}
	prisma = global.prisma;
}

export { prisma };
