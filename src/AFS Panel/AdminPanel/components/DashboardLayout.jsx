import { Box, Container, Flex, useDisclosure } from "@chakra-ui/react";
import React from "react";
import Sidenav from "./Sidenav";
import TopNav from "./TopNav";
import SideDrawer from "./SideDrawer";

const DashboardLayout = ({ title, children }) => {
  const { isOpen, onClose, onOpen } = useDisclosure();

  return (
    <Flex bg="#f0f3f5" align="center" h="100vh">
      <Box
        display={{
          base: "none",
          lg: "block",
        }}
      >
        <Sidenav />
      </Box>
      <SideDrawer isOpen={isOpen} onClose={onClose} />
      <Box flexGrow={1} overflow="hidden" h="100vh">
        <TopNav title={title} onOpen={onOpen} />
        <Container
          overflowX="hidden"
          h="calc(100vh - 8rem)" // Adjust the height based on the TopNav height
          mt="6"
          maxW="90rem"
          bg="#f0f3f5"
        >
          {children}
        </Container>
      </Box>
    </Flex>
  );
};

export default DashboardLayout;
