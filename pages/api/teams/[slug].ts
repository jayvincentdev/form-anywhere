import { Team, Role, User } from "@prisma/client";

import { prisma } from "../../../lib/prisma";
import { withSessionRoute } from "../../../lib/withSession";

export type TeamResponse = Team & {
  users: {
    user: User;
    role: Role;
  }[];
};

export default withSessionRoute<TeamResponse>(async (req, res) => {
  // Get logged in userId from the session.
  const userId = (req.session as any)?.user?.id;
  // Get the team slug from the route param.
  const teamSlug = req.query.slug as string;

  if (!userId) {
    return res.status(401).end();
  }

  // Find team in DB.
  const team = await prisma.team.findUnique({
    where: {
      slug: teamSlug,
    },
    include: {
      users: {
        select: {
          role: true,
          user: true,
        },
      },
    },
  });

  if (!team) {
    return res.status(403).end();
  }

  // Does logged in user belong to the team?
  const userBelongsToTeam = team.users.some(({ user }) => user.id === userId);

  if (!userBelongsToTeam) {
    return res.status(403).end();
  }

  return res.json({
    ...team,
  });
});
