import {
  Box,
  HStack,
  Heading,
  Icon,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
} from "@chakra-ui/react";
import { FaBars, FaUserTie } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const StudentTopNav = ({ title, onOpen }) => {
  const navigate = useNavigate();
  // const user = JSON.parse(localStorage.getItem('user'))
  const handleLogout = () => {
    localStorage.clear("isLoggedIn_student");
    navigate("/student-login");
  };
  return (
    <Box px={{ md: "4", base: "2" }} bg={{ base: "#2A3542", md: "none" }}>
      <HStack
        maxW={{ md: "80rem", base: "100vw" }}
        h="16"
        justify="space-between"
        align="center"
        mx="auto"
      >
        <Icon
          as={FaBars}
          onClick={onOpen}
          color={{ base: "white", md: "black" }}
          boxSize="25px"
          display={{
            base: "block",
            lg: "none",
          }}
        />
        <Heading
          fontWeight="medium"
          fontSize={{ md: "28px", base: "20px" }}
          color={{ base: "white", md: "black" }}
        >
          {title}
        </Heading>

        <Menu>
          <MenuButton>
            <Icon
              as={FaUserTie}
              fontSize="32px"
              mt={{ base: "1", md: "2" }}
              color={{ base: "white", md: "black" }}
            />
          </MenuButton>
          <MenuList border="1px solid #d4cfcf">
            <MenuItem onClick={handleLogout}>Logout</MenuItem>
            <MenuItem>Support</MenuItem>
          </MenuList>
        </Menu>
      </HStack>
    </Box>
  );
};

export default StudentTopNav;
