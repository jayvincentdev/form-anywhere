import { Spinner } from "@chakra-ui/react";
import { NextPage } from "next";
import { useRouter } from "next/router";

import useUser from "lib/useUser";

const DashboardIndex: NextPage = () => {
  const { user } = useUser({ redirectTo: "/login" });
  const router = useRouter();

  if (!user || !user.isLoggedIn) {
    return <Spinner />;
  }

  if ("teams" in user && user.teams.length == 1) {
    // Redirect to the team dashboard.
    router.push(`/dashboard/${user.teams[0].team.slug}`);
  }

  return <>YOU HAVE MULTIPLE TEAMS.</>;
};

export default DashboardIndex;
