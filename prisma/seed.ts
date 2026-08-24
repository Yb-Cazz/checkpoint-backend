import { PrismaPg } from "@prisma/adapter-pg";

import {PrismaClient} from "../src/generated/prisma/client"
import {hashPassword} from "../src/utils/handlePassword"


const adapter = new PrismaPg({ 
    connectionString: process.env.DATABASE_URL 
});

const prisma = new PrismaClient({ 
    adapter 
});

const main = async () => {
    const email = "admin@test.com"
    const password = "Admin1234"

    const hashedPassword = await hashPassword(password)

    const admin = await prisma.user.upsert({
        where: {email: email},
        update: {},
        create: {
            email: email,
            password: hashedPassword,
            firstName: "Ebube",
            lastName: "John",
            role: "ADMIN",
            phone: "09032994444",
            account_status: "active",
            availability_status: "available",
            department: "energy_services",
        }
    })

    console.log("Admin created:", email);
    console.log("Admin Id:", admin.id);
    console.log("Test password:", password);
}

main()
    .catch((err)=> {
        console.error(err)
        process.exit(1)
    })
    .finally(
        async () => {
            await prisma.$disconnect()
        }
    )