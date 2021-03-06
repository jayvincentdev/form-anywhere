import { Box, Text, Spinner } from "@chakra-ui/react";
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

  return (
    <Dashboard>
      <Box borderWidth={1} borderRadius="lg" bg="white" p={6} boxShadow="md">
        <Text>You can view this page because you are signed in.</Text>
      </Box>
    </Dashboard>
  );
};

export default DashboardPage;
