import {
  Badge,
  Box,
  Button,
  Flex,
  HStack,
  Heading,
  Icon,
  IconButton,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
} from "@chakra-ui/react";
import { FaBars, FaUserTie } from "react-icons/fa";
import { BsChatLeftText } from "react-icons/bs";
import { useNavigate } from "react-router-dom";
import { HiDocumentReport } from "react-icons/hi";
import { CiWallet } from "react-icons/ci";
import { MdOutlineNotificationsActive } from "react-icons/md";

const TopNav = ({ title, onOpen }) => {
  const navigate = useNavigate();
  // const user = JSON.parse(localStorage.getItem('user'))
  const handleLogout = () => {
    localStorage.clear("user");
    navigate("/admin-login");
  };

  const count = 5;

  return (
    <Box
      px="4"
      h="88px"
      // bg="#2A3542"
    >
      <HStack maxW="80rem" h="100%" justify="space-between" mx="auto">
        <Icon
          as={FaBars}
          color="white"
          boxSize={8}
          onClick={onOpen}
          display={{
            base: "block",
            lg: "none",
          }}
        />
        <Heading fontWeight="medium" fontSize={{ base: "28px", lg: "36px" }}>
          {title}
        </Heading>

        <Flex
          gap={8}
          justify="center"
          align="center"
          display={{
            base: "none",
            lg: "flex",
          }}
        >
          <Box position="relative" display="inline-block">
            <IconButton
              icon={<BsChatLeftText size="28px" />} // Increased icon size
              aria-label="Notifications"
              variant="ghost"
              size="lg"
            />
            {count > 0 && (
              <Badge
                position="absolute"
                top="-1"
                right="-1"
                colorScheme="purple"
                borderRadius="full"
                px="2"
                fontSize="0.8em"
              >
                {count}
              </Badge>
            )}
          </Box>

          <Box position="relative" display="inline-block">
            <IconButton
              icon={<CiWallet size="35px" />} // Increased icon size
              aria-label="Notifications"
              variant="ghost"
              size="lg"
            />
            {count > 0 && (
              <Badge
                position="absolute"
                top="-1"
                right="-1"
                colorScheme="purple"
                borderRadius="full"
                px="2"
                fontSize="0.8em"
              >
                {count}
              </Badge>
            )}
          </Box>

          <Box position="relative" display="inline-block">
            <IconButton
              icon={<MdOutlineNotificationsActive size="32px" />} // Increased icon size
              aria-label="Notifications"
              variant="ghost"
              size="lg"
            />
            {count > 0 && (
              <Badge
                position="absolute"
                top="-1"
                right="-1"
                colorScheme="purple"
                borderRadius="full"
                px="2"
                fontSize="0.8em"
              >
                {count}
              </Badge>
            )}
          </Box>

          <Button
            Settingsn
            rightIcon={<HiDocumentReport />}
            colorScheme="purple"
            fontWeight="400"
            boxShadow="xl"
            _hover={{ boxShadow: "md" }}
            transition="all 0.2s"
          >
            Generate Report
          </Button>
        </Flex>

        <Box
          display={{
            base: "block",
            lg: "none",
          }}
        >
          <Menu>
            <MenuButton>
              <Icon as={FaUserTie} fontSize="24px" />
            </MenuButton>
            <MenuList border="1px solid #d4cfcf">
              <MenuItem onClick={handleLogout}>Logout</MenuItem>
              <MenuItem>Support</MenuItem>
            </MenuList>
          </Menu>
        </Box>
      </HStack>
    </Box>
  );
};

export default TopNav;