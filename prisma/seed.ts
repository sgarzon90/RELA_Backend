import { PrismaClient } from '@prisma/client';
import * as bcrypt from 'bcrypt';

const prisma = new PrismaClient();

async function main() {
  const hashedPassword = await bcrypt.hash('password', 10);
  const now = new Date();
  await prisma.$executeRaw`INSERT INTO User (email, password, createdAt, updatedAt) VALUES ('test@test.com', ${hashedPassword}, ${now}, ${now})`;
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
