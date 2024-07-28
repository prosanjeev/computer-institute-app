import { CustomCard } from "../../../../components/chakra/CustomCard";
import { Box, Flex, Icon, Stack, Text } from "@chakra-ui/react";

const WelcomeCard = () => {
  const today = new Date();
  const options = { year: "numeric", month: "long", day: "numeric" };
  const currentDate = today.toLocaleDateString("en-US", options);
  return (
    <CustomCard
      p={5}
      bgColor="#white"
      // border="1px solid black"
      borderRadius="10px"
      //   bgImage={imgUrl}
      bgSize="cover"
      bgRepeat="no-repeat"
      // boxShadow="2px 2px 4px  black"
      boxShadow="xl"
    //   _hover={{ boxShadow: "md" }}
      transition="all 0.2s"
    >
      <Flex justify="space-between" align="center" gap={8} py={4} px={4}>
        {/* <Icon pt={1}  color="" boxSize="80px" as={icon} /> */}
        <Stack px="4" gap={10}>
          <Text fontSize="11px">{currentDate}</Text>
          <Stack gap={3}>
            <Text fontWeight="medium" fontSize="21px">
              Welcome back, John!
            </Text>
            <Text fontSize="10.6px">
              Always stay updated in your student portal
            </Text>
          </Stack>
        </Stack>
      </Flex>
    </CustomCard>
  );
};

export default WelcomeCard;
