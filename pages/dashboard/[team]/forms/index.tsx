import { Box, Text, Spinner } from "@chakra-ui/react";
import { NextPage } from "next";

import useTeam from "lib/useTeam";
import useUser from "lib/useUser";

import Dashboard from "components/Dashboard";

const FormsPage: NextPage = () => {
  const { user } = useUser({ redirectTo: "/login" });
  const { team, error } = useTeam();

  if (!user || !user.isLoggedIn || !team) {
    return <Spinner />;
  }

  if (error) return <>Could not find team.</>;

  return (
    <Dashboard title="Forms">
      <Box borderWidth={1} borderRadius="lg" bg="white" p={6} boxShadow="md">
        <Text>Nothing to see here yet.</Text>
      </Box>
    </Dashboard>
  );
};

export default FormsPage;
