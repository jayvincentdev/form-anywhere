import { compare } from "bcryptjs";

import { prisma } from "../../lib/prisma";
import { withSessionRoute } from "../../lib/withSession";

export type LoginResponse = {
  isLoggedIn: boolean;
};

export default withSessionRoute<LoginResponse>(async (req, res) => {
  const { email, password } = req.body;

  const user = await prisma.user.findUnique({
    where: {
      email,
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

  // No user matching email, return 403.
  if (!user) {
    return res.status(403).json({ isLoggedIn: false });
  }

  const match = await compare(password, user.password);

  // Password does not match.
  if (!match) {
    return res.status(401).json({ isLoggedIn: false });
  }

  // Set userId to session, and set the first organisation as the one being viewed.
  (req.session as any).user = {
    id: user.id,
    teamSlug: user.teams[0].team.slug,
  };
  await req.session.save();

  // Output some JSON from API response.
  res.json({ isLoggedIn: true });
});
