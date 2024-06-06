import React from 'react';
import { Box, Text } from '@chakra-ui/react';

const Marquee = () => {
  return (
    <Box
      overflow="hidden"
      whiteSpace="nowrap"
      position="relative"
      backgroundColor="gray.200"
      p={4}
    >
      <Box
        display="inline-block" top={1.5}
        position="absolute"
        minWidth="100%"
        animation="marquee 80s linear infinite" 
      >
        <Text fontSize="lg" mx={1}>
          Welcome to Computer Institute App
        </Text>
       
      </Box>

      <style>
        {`
          @keyframes marquee {
            0% { transform: translateX(100%); }
            50% { transform: translateX(-100%); }
            100% { transform: translateX(100%); }
          }
        `}
      </style>
    </Box>
  );
};

export default Marquee;
