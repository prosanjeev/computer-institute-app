import { Box, Divider, Image, Stack, Text } from "@chakra-ui/react";
import "./IconBox.css";

function IconBox(props) {
  return (
    <Stack
      w={{ base: "90%", md: "375px" }}
      // border="1px solid "
      shadow="xl"
      borderRadius="20px"
      align="center"
      textAlign="center"
      position="relative"
      py={10} px={6}
      gap={5}
    >
      <Image boxSize={20} src={props.url} alt="icon" borderRadius='100%' />
      <Divider width="20%" borderWidth="2px" borderRadius="full" borderColor='#E0F6F8' ></Divider>
      <Text fontSize="larger" fontWeight="600" lineHeight="29px">
        {props.name}
      </Text>
      <Text fontSize='15px' lineHeight="29px"> {props.text} </Text>
      <button className="iconbox-btn"> READ MORE.. </button>
    </Stack>
  );
}

export default IconBox;
