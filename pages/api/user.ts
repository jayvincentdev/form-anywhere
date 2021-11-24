import { User, Role, Team } from "@prisma/client";

import { prisma } from "../../lib/prisma";
import { withSessionRoute } from "../../lib/withSession";
import { LoginResponse } from "./login";

export type UserResponse = Omit<User, "password"> & {
  teams: {
    team: Team;
    role: Role;
  }[];
  isLoggedIn: boolean;
};

export default withSessionRoute<UserResponse | LoginResponse>(async (req, res) => {
  const userId = (req.session as any)?.user?.id;

  if (!userId) {
    return res.json({ isLoggedIn: false });
  }

  // Find user in DB.
  const user = await prisma.user.findUnique({
    where: {
      id: userId,
    },
    include: {
      teams: {
        select: {
          role: true,
          team: true,
        },
      },
    },
  });

  if (!user) {
    return res.json({ isLoggedIn: false });
  }

  // Don't send password hash in response.
  delete (user as any).password;

  res.status(200).json({
    ...user,
    isLoggedIn: true,
  });
});
