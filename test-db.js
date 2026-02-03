const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
    try {
        const foodItems = await prisma.foodItem.findMany();
        console.log('Success!', foodItems);
    } catch (e) {
        console.error('Failed!', e);
    } finally {
        await prisma.$disconnect();
    }
}

main();
