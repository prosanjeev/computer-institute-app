import "./DownFooter.css";
import { Link } from "react-router-dom";
import { IoIosArrowForward } from "react-icons/io";
import { IoCallOutline } from "react-icons/io5";
import { MdMailOutline } from "react-icons/md";
import {
  Box,
  Divider,
  Flex,
  HStack,
  Heading,
  Icon,
  Image,
  Text,
  VStack,
} from "@chakra-ui/react";
import QueryForm from "./components/QueryForm";
import { c_address, c_email, c_name, c_phone } from "../../info/Info";
import { social_handles } from "./components/social";

const DownFooter = () => {
  const useFulLink = [
    { text: "Home", link: "/" },
    { text: "About Us", link: "/about-company" },
    { text: "Contact Us", link: "/contact" },
    { text: "Student Login", link: "/student-login" },
    { text: "Student Verification", link: "/student-verification" },
    { text: "Certificate Verification", link: "/certificate-verification" },
  ];

  return (
    <>
      <Box
        w="100vw"
        borderTop="1px solid #DADCE0"
        position="relative"
        // p={6}
        _before={{
          content: '""',
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          // bgGradient:
          //   "linear(to-r, rgba(0.28, 0.23, 0.21,0.7), rgba(0.2, 0.4, 0.6, 0.8))",
          bgGradient:
            "linear(to-r, rgba(3, 76, 127, 0.7), rgba(3, 76, 127, 0.8))",

          zIndex: 0,
        }}
        bgImage="url('/11mountain.webp')"
        bgSize="contain"
        bgPosition="start"
        bgRepeat="no-repeat"
      >
        <Flex
          direction={{ base: "column", md: "row" }}
          className="footer-contantant"
          gap={4}
          position="relative"
          zIndex={1}
          p={6}
        >
          <Box
            flex="1"
            mr={{ base: 0, md: 4 }}
            mb={{ base: 4, md: 0 }}
            color="#c4c4c6"
          >
            <Heading as="h3" size="md" className="footer-title">
              CONTACT US
            </Heading>
            <Divider className="footer-hr-line" w={12} bgColor="white" />
            <Text className="footer-about">
              {c_name}, {c_address}
            </Text>
            <VStack align="start" mt={2}>
              <Flex align="center">
                <IoCallOutline />
                <Text fontWeight="500" ml={2}>
                  {c_phone}
                </Text>
              </Flex>
              <Flex align="center">
                <MdMailOutline />
                <Text fontWeight="500" ml={2}>
                  {c_email}
                </Text>
              </Flex>

              <Flex gap={4} my={2}>
                {social_handles.map((data) => (
                  <Box
                    key={data.platform}
                    borderRadius="100%"
                    border="1px solid #c4c4c6"
                    cursor='pointer'
                  >
                    <Image
                      src={data.image.url}
                      alt={data.platform}
                      h="40px"
                      w="40px"
                      p="4px"
                      transition="transform 0.5s"
                      _hover={{ transform: "scale(1.25)" }}
                    />
                  </Box>
                ))}
              </Flex>
            </VStack>
          </Box>
          <Box flex="1" mr={{ base: 0, md: 4 }} mb={{ base: 4, md: 0 }}>
            <Heading as="h3" size="md" className="footer-title">
              USEFUL LINKS
            </Heading>
            <Divider className="footer-hr-line" w={12} bgColor="white" />
            <VStack align="start" mt={2}>
              {useFulLink.map((list) => (
                <Link key={list.text} to={list.link}>
                  <HStack color="#c4c4c6">
                    <Icon as={IoIosArrowForward} />
                    <Text> {list.text}</Text>
                  </HStack>
                </Link>
              ))}
            </VStack>
          </Box>
          <Box flex="1">
            <Heading as="h3" size="md" className="footer-title">
              QUERY US
            </Heading>
            <Divider className="footer-hr-line" w={12} bgColor="white" />
            <QueryForm />
          </Box>
        </Flex>
      </Box>
      <Flex
        bg="#034C7F"
        flexWrap="wrap"
        align="center"
        justify="center"
        py={8}
        gap={1}
      >
        <Text color="white" fontWeight="500">
          {c_name} © 2023 |{" "}
        </Text>
        <Link to="#" color="blue">
          <Text color="white"> Privacy Policy</Text>
        </Link>
      </Flex>
    </>
  );
};

export default DownFooter;
