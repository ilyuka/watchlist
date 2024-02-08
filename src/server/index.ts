import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
    await prisma.test.create({
        data: {
            testname: "firstOne",
            users: [1, 2, 3],
        },
    });

    const allTests = await prisma.test.findMany({});
    console.log(allTests);
}

main()
    .then(async () => {
        await prisma.$disconnect();
    })
    .catch(async (e) => {
        console.error(e);
        await prisma.$disconnect();
        process.exit(1);
    });
