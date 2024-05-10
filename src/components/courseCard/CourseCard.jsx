import { Box, Image, Text, Button, Badge, Stack } from "@chakra-ui/react";

const CourseCard = ({ url, title, details }) => {
  return (
    <Stack
      maxW="sm"
      borderWidth="1px"
      borderRadius="2xl"
      overflow="hidden"
      p="8"
      textAlign="center"
      gap={10} 
      fontFamily="Google Sans, sans-serif" // Set Google Sans as the font family


    >
      <Image src={url} alt={title} h='220px' borderRadius='20' />

      <Stack p="2" gap={10}>
        <Stack>
          <Box
            color="gray.500"
            fontWeight="700"
            letterSpacing="wide"
            fontSize="16px"
            textTransform="uppercase"
          >
            Course
          </Box>
          <Box
            fontWeight="600"
            fontSize="32px"
            lineHeight="40px"
            isTruncated
          >
            <Text>{title}</Text>
          </Box>
        </Stack>       

        <Box>
          <Text color="gray.500" fontSize="sm">
          {details}
          </Text>
        </Box>

        <Box>
          <Button colorScheme="teal" variant="outline">
           Start Course
          </Button>
        </Box>
      </Stack>
    </Stack>
  );
};

export default CourseCard;
