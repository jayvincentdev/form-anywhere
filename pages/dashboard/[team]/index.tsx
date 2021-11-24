import { Spinner } from "@chakra-ui/react";
import { NextPage } from "next";

import useTeam from "lib/useTeam";
import useUser from "lib/useUser";

import Dashboard from "components/Dashboard";

const DashboardPage: NextPage = () => {
  const { user } = useUser({ redirectTo: "/login" });
  const { team, error } = useTeam();

  if (!user || !user.isLoggedIn || !team) {
    return <Spinner />;
  }

  if (error) return <>Could not find team.</>;

  return <Dashboard>Blah.</Dashboard>;
};

export default DashboardPage;
