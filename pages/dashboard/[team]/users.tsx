import { Badge, Box, Button, Spinner, Table, Thead, Tbody, Tr, Th, Td } from "@chakra-ui/react";
import { NextPage } from "next";

import useTeam from "lib/useTeam";
import useUser from "lib/useUser";

import Dashboard from "components/Dashboard";

const UsersPage: NextPage = () => {
  const { user } = useUser({ redirectTo: "/login" });
  const { team, error } = useTeam();

  if (!user || !user.isLoggedIn || !team) {
    return <Spinner />;
  }

  if (error) return <>Could not find team.</>;

  return (
    <Dashboard title="Users">
      <Box borderWidth={1} borderRadius="lg" bg="white" boxShadow="md">
        <Box p={6}>
          <Button>Add user</Button>
        </Box>

        <Table mt={4}>
          <Thead>
            <Tr>
              <Th>Name</Th>
              <Th>Email</Th>
              <Th>Role</Th>
            </Tr>
          </Thead>
          <Tbody>
            {team.users.map(({ user, role }, i) => (
              <Tr key={i}>
                <Td>{user.name}</Td>
                <Td>{user.email}</Td>
                <Td>
                  <Badge>{role}</Badge>
                </Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </Box>
    </Dashboard>
  );
};

export default UsersPage;
