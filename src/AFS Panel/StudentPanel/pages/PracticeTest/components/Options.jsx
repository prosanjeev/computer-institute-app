// src/Options.js
import React from "react";
import { Box, Radio, RadioGroup, Stack, Text } from "@chakra-ui/react";
import { CustomCard } from "../../../../components/chakra/CustomCard";

const Options = ({ options, selectedOption, onChange, disabled }) => {
  return (
    <RadioGroup value={selectedOption} onChange={onChange}>
      <Stack direction="column" gap={8}>
        {options.map((option) => (
          <Box
            key={option.id}
            border="1px solid #d4cfcf"
            borderRadius="10px"
            pl={4} w='full'
            boxShadow="sm"
            bgColor={selectedOption === option.id ? "#baedb2" : "#faf7f7"} // Set background color based on selection
          >
            <Radio
              bg="white"
              value={option.id}
              isDisabled={disabled}
              // sizes="full"
            >
              <CustomCard
                // bgColor="white"
                ml={1}
                bgColor={selectedOption === option.id ? "#e6f0fc" : "white"} // Set background color based on selection
                // border="1px solid #d4cfcf"
                borderRadius="0 10px 10px 0"
                bgSize="cover"
                bgRepeat="no-repeat"
                w={{ md: "690px", base:"80vw" }}
               
                p={5}
                boxShadow="sm"
                // _hover={{ boxShadow: "sm" }}
                // transition="all 0.2s"
              >
                <Text fontSize="24px"> {option.text}</Text>
              </CustomCard>
            </Radio>
          </Box>
        ))}
      </Stack>
    </RadioGroup>
  );
};

export default Options;