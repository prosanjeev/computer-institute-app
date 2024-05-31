import {  HStack, Icon, Stack, Text } from "@chakra-ui/react";
import { CustomCard } from "../chakra/CustomCard";

const DashboardCard = ({ imgUrl, name, info, inverted, icon }) => {
  return (
    <CustomCard
    // bgColor={inverted ? "p.purple" : "white"}

    bgColor="#white"
    // border="1px solid black"
    borderRadius="20px 0 15px 0"
    bgImage={imgUrl}
    bgSize="cover"
    bgRepeat="no-repeat"
    // boxShadow="2px 2px 4px  black"
    boxShadow="xl"
    _hover={{ boxShadow: 'md' }}
    transition="all 0.2s"
  >
    <HStack justify="space-between">
      <Icon pt={1} pl={5} color=""  boxSize="50px" as={icon} />
      <Stack px="4">
        <Text
          mt="1"
          fontWeight="800"
          textStyle="h1"
          textAlign="right"
          // color={ "white"}
        >
          {info}
        </Text>
        <Text
          fontWeight="medium"
          textStyle="h6"

          // color={ "white"}
        >
          {name}
        </Text>
      </Stack>
    </HStack>
  </CustomCard>
  )
}

export default DashboardCard