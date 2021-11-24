import { Spinner } from "@chakra-ui/react";
import { NextPage } from "next";
import { useRouter } from "next/router";

import useUser from "../../../lib/useUser";

const DashboardPage: NextPage = () => {
  const router = useRouter();
  const { user } = useUser({ redirectTo: "/login" });

  const { team } = router.query;

  if (!user || !user.isLoggedIn) {
    return <Spinner />;
  }

  return <>TEAM PAGE.</>;
};

export default DashboardPage;
