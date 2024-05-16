import React from "react";
import { Link } from "react-router-dom";
import { Button, Divider, HStack, Img, Stack, Text } from "@chakra-ui/react";
import { c_name, c_shortName } from "../../../../info/Info";

const AboutBox = () => {

  return (
    <HStack m="40px auto" w="80%" gap={5} flexWrap={{base:'wrap', lg:'nowrap'}} >
        <Stack >
            <Text fontSize="28px" fontWeight="700" color="#444444">WELCOME TO {c_name}</Text>
            <Divider width="60px" h="3px" bgColor="#ff6c00" borderRadius="100px 0 100px 0" my={5} />
            <Text fontSize={{base:"16px", md:'20px'}} color="#777777">
            {c_shortName} is a cutting-edge e-learning platform that empowers students to learn coding in an engaging and effective way. With a diverse range of courses covering popular programming languages and technologies, {c_shortName} caters to learners of all levels, from beginners to advanced coders. The platform offers hands-on projects, interactive coding challenges, and expert guidance to help students build practical skills and confidence. {c_shortName}'s intuitive interface and personalized learning paths ensure that every student receives a tailored learning experience. Whether you're aspiring to become a web developer, data scientist, or app designer, {c_shortName} provides the tools and resources you need to succeed. Join {c_shortName} today and start your coding journey!
            </Text>
            <Link to="#"><Button colorScheme="gray" size='xs'>Read More..</Button></Link>
        </Stack>
      <Img h='400px'  src="https://png.pngtree.com/png-clipart/20230913/original/pngtree-coder-clipart-boy-working-with-computer-game-on-the-desk-vector-png-image_11072679.png" alt="about-image" />
    </HStack>
  );
};

export default AboutBox;
