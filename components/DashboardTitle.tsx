import { Box, Heading, Spacer } from "@chakra-ui/react";

export default function DashboardTitle({
  title,
  actions,
}: {
  title: string | JSX.Element;
  actions?: JSX.Element;
}) {
  return (
    <>
      <Box bg="white" height="100%" px={10} display="flex" alignItems="center" boxShadow="md">
        <Heading size="md">{title}</Heading>
        <Spacer />
        {actions}
        <Box ml={12} width="180px"></Box>
      </Box>
    </>
  );
}
