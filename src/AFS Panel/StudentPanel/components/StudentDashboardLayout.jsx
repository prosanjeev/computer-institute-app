import { Box, Container, Flex, useDisclosure } from "@chakra-ui/react";
import StudentSidenav from "./StudentSidenav";
import StudentSideDrawer from "./StudentSideDrawer";
import StudentTopNav from "./StudentTopNav";

const StudentDashboardLayout = ({ title, children }) => {
  const { isOpen, onClose, onOpen } = useDisclosure();

  return (
    <Flex bg="#F0F3F5">
      <Box
        display={{
          base: "none", 
          lg: "flex",
        }}
      >
       <StudentSidenav/>
      </Box>
      
      <StudentSideDrawer isOpen={isOpen} onClose={onClose} />
      <Box flexGrow={1}>
        <StudentTopNav title={title} onOpen={onOpen}/>
       
        <Container
          overflowX="hidden"
          overflowY="auto"
          h="calc(100vh - 88px)"
          mt="10"
          maxW={{ md: "90rem", base: "100vw" }}
          mx="auto"
        >
          {children}
        </Container>
      </Box>
    </Flex>
  );
};

export default StudentDashboardLayout;
