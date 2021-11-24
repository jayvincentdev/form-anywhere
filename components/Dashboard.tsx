import React, { ReactNode } from "react";
import { Box } from "@chakra-ui/react";

import DashboardNav from "components/DashboardNav";
import DashboardTitle from "components/DashboardTitle";

export default function Dashboard({
  title = "Dashboard",
  actions,
  children,
}: {
  title?: string | JSX.Element;
  actions?: JSX.Element;
  children: ReactNode;
}) {
  return (
    <>
      <Box position="fixed" top={0} left={0} bottom={0} w={72}>
        <DashboardNav />
      </Box>

      <Box position="fixed" zIndex={1} top={0} left={72} right={0} h={16}>
        <DashboardTitle title={title} />
      </Box>

      <Box as="main" mt={16} ml={72} p={10}>
        {children}
      </Box>
    </>
  );
}
