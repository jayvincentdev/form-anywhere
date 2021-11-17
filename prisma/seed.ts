import { PrismaClient } from "@prisma/client";
import { hash } from "bcryptjs";
const prisma = new PrismaClient();

async function main() {
  const encryptedPassword = await hash("secret", 12);

  await prisma.user.upsert({
    where: { email: "jay.vincent@housekeep.com" },
    update: {},
    create: {
      email: "jay.vincent@housekeep.com",
      name: "Jay Vincent",
      password: encryptedPassword,
    },
  });

  await prisma.user.upsert({
    where: { email: "avin.rabheru@housekeep.com" },
    update: {},
    create: {
      email: "avin.rabheru@housekeep.com",
      name: "Avin Rabheru",
      password: encryptedPassword,
    },
  });
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
