import { Icon, Stack, Text } from "@chakra-ui/react";
import { CustomCard } from "../../../../components/chakra/CustomCard";

const StDashboardCard = ({  name, icon }) => {
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
      _hover={{ boxShadow: "md" }}
      transition="all 0.2s"
    >
      <Stack justify="space-between" align='center' gap={8} py={4}>
        <Icon pt={1}  color="" boxSize="80px" as={icon} />
        <Stack px="4">
          {/* <Text
          mt="1"
          fontWeight="800"
          textStyle="h1"
          textAlign="right"
          // color={ "white"}
        >
          {info}
        </Text> */}
          <Text fontWeight="medium" textStyle="h6">
            {name}
          </Text>
        </Stack>
      </Stack>
    </CustomCard>
  );
};

export default StDashboardCard;
