import {
  Box,
  Flex,
  HStack,
  Heading,
  Icon,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Text,
} from "@chakra-ui/react";
import { FaBars, FaUserTie } from "react-icons/fa";
import FranchiseNavWallate from "./FranchiseNavWallate";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const FranchiseTopNav = ({ title, onOpen, branchData }) => {
  const navigate = useNavigate();
  const handleLogout = () => {
    localStorage.clear("user");
    toast.success("Logout Successful!");
    navigate("/franchise-login");
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

        <HStack gap={{ md: "6", base: "2" }} align="center">
          <Flex gap={3} align="center">
            <Text
              color={{ base: "white", md: "black" }}
              fontSize="20px"
              display={{ base: "none", md: "block" }}
            >
              Balance
            </Text>
            <FranchiseNavWallate branchData={branchData} />
          </Flex>
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
      </HStack>
    </Box>
  );
};

export default FranchiseTopNav;
