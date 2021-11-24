import { MouseEvent } from "react";
import {
  Box,
  Link,
  Button,
  MenuButton,
  Menu,
  MenuList,
  MenuItem,
  List,
  MenuGroup,
  ListItem,
  useToast,
} from "@chakra-ui/react";
import { ChevronDownIcon } from "@chakra-ui/icons";
import axios from "axios";

import useTeam from "lib/useTeam";
import useUser from "lib/useUser";
import { LoginResponse } from "api/login";

import ActiveLink from "components/ActiveLink";

export default function DashboardLeft() {
  const toast = useToast();
  const { user, mutateUser } = useUser({ redirectTo: "/login" });
  const { team } = useTeam();

  // Log the user out.
  const handleLogout = async (e: MouseEvent) => {
    e.preventDefault();
    await mutateUser(axios.post<LoginResponse>("/api/logout").then((res) => res.data));
    toast({
      title: "You have been logged out",
      status: "success",
    });
  };

  if (!user || !("teams" in user) || !team) return <></>;

  return (
    <>
      <Box bg="#0a223e" padding={3} height="100%">
        {team && (
          <Menu>
            <MenuButton
              as={Button}
              color="#fff"
              variant="ghost"
              _hover={{ bg: "rgba(255,255,255,0.05)" }}
              _active={{ bg: "rgba(255,255,255,0.05)" }}
              width="100%"
              size="lg"
              p={3}
              textAlign="left"
              rightIcon={<ChevronDownIcon />}
            >
              {team.name}
            </MenuButton>
            <MenuList>
              <MenuGroup title="Your teams">
                {user.teams.map(({ team }) => (
                  <MenuItem key={team.id}>{team.name}</MenuItem>
                ))}
              </MenuGroup>
            </MenuList>
          </Menu>
        )}

        <List p={3} mt={3} spacing={3} color="#fff" styleType="none">
          <ListItem>
            <ActiveLink href={`/dashboard/${team.slug}`}>
              <Link>Dashboard</Link>
            </ActiveLink>
          </ListItem>
          <ListItem>
            <ActiveLink href={`/dashboard/${team.slug}/forms`}>
              <Link>Forms</Link>
            </ActiveLink>
          </ListItem>
          <ListItem>
            <ActiveLink href={`/dashboard/${team.slug}/billing`}>
              <Link>Billing</Link>
            </ActiveLink>
          </ListItem>
          <ListItem>
            <ActiveLink href={`/dashboard/${team.slug}/users`}>
              <Link>Users</Link>
            </ActiveLink>
          </ListItem>
          <ListItem>
            <ActiveLink href={`/dashboard/${team.slug}/settings`}>
              <Link>Team settings</Link>
            </ActiveLink>
          </ListItem>
          <ListItem>
            <Link href="/api/logout" onClick={handleLogout}>
              Logout
            </Link>
          </ListItem>
        </List>
      </Box>
    </>
  );
}
