import "dotenv/config"
import { PrismaClient } from "../generated/prisma/client.js";
import { PrismaPg } from "@prisma/adapter-pg";
import logger from "../utils/logger.js";
import { databaseUrl } from "./env.js";


const adapter = new PrismaPg({ 
    connectionString: databaseUrl
});

const prisma = new PrismaClient({ 
    adapter 
});

const connectDb = async () => {
    try {
        await prisma.$connect()
        logger.info("Database Connected Successfully")
    } catch (err:any) {
        logger.error(`Database connection error ${err.message}`)
        process.exit(1)
    }
}

const disconnectDb = async () => {
    await prisma.$disconnect()
    logger.info("Database disconnected successfully")
}

export {
    prisma, connectDb, disconnectDb
}