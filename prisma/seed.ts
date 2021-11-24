import { Role } from "@prisma/client";
import { hash } from "bcryptjs";

import { prisma } from "lib/prisma";

async function main() {
  const encryptedPassword = await hash("secret", 12);

  // Create team.
  const team = await prisma.team.create({
    data: {
      name: "Housekeep",
      slug: "housekeep",
    },
  });

  [
    {
      email: "jay.vincent@housekeep.com",
      name: "Jay Vincent",
      role: Role.OWNER,
    },
    {
      email: "avin.rabheru@housekeep.com",
      name: "Avin Rabheru",
      role: Role.MEMBER,
    },
  ].map(async (userInfo) => {
    // Create user.
    const user = await prisma.user.create({
      data: {
        name: userInfo.name,
        email: userInfo.email,
        password: encryptedPassword,
      },
    });
    // Assign to team.
    await prisma.usersOnTeams.create({
      data: {
        user: {
          connect: { id: user.id },
        },
        team: {
          connect: { id: team.id },
        },
        role: userInfo.role,
      },
    });
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
