import React from "react";
import Login from "../../../components/adminAndCenterAuth/Login";
import { Box, Center, Flex, Stack, Text } from "@chakra-ui/react";

const AdminLogin = () => {
  return (
    <Stack flexWrap='wrap' gap={1}>
       <Center >
            <Stack fontSize='20px'>
              <Text>Credentials</Text>
              <Text>Email: sanjeevcse2k23@gmail.com</Text>
              <Text>Password: 12345678</Text>
            </Stack>
          </Center>
     
      <Login title="Admin Login" />
    </Stack>
  );
};

export default AdminLogin;
