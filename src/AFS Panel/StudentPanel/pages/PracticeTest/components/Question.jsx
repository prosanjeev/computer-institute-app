import { Box, Text } from '@chakra-ui/react';

const Question = ({ question, serialNumber }) => {
  return (
    <Box
    // bgGradient={gradient}
    
    p={2}  mt={10}
    // borderBottom="1px solid #d4cfcf"  
    // w={{md:"640px"}}
    w='full'
    // bordershShadow="sm"
    >
      <Text fontSize="24px"  mb={2}>Question {serialNumber}: {question.text}</Text>
    </Box>
  );
};

export default Question;
