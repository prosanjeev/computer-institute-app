import React from 'react';
import { Box, Flex, Text, useColorModeValue } from '@chakra-ui/react';

const DashboardBigCard = ({ title, value, icon, gradient }) => {
  const textColor = useColorModeValue('gray.800', 'white');

  return (
    <Box
      bgGradient={gradient}
      p={5}  mt={10}
      // border="1px solid #d4cfcf"
      borderRadius="lg" 
      boxShadow="xl"
      _hover={{ boxShadow: 'md' }}
      transition="all 0.2s"
    >
      <Flex align="center" justify="space-between">
        <Flex align="center">
          <Box as={icon} size="24px" color={textColor} mr={3} />
          <Text fontSize="xl" fontWeight="bold" color={textColor}>
            {title}
          </Text>
        </Flex>
        <Text fontSize="2xl" fontWeight="bold" color={textColor}>
          {value}
        </Text>
      </Flex>
    </Box>
  );
};

  export default DashboardBigCard