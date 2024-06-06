import React, { useState } from "react";
import {
  InputGroup,
  InputLeftElement,
  Input,
  Box,
} from "@chakra-ui/react";
import { SearchIcon } from "@chakra-ui/icons";

function SearchBar({users}) {
  const [search, setSearch] = useState("");

  const handleChange = (e) => {
    setSearch(e.target.value);
  };

  let filteredUsers = [];

  if (search !== "") {
    filteredUsers = users.filter((item) =>
      item.centerName.toLowerCase().includes(search.toLowerCase())
    );
  } else {
    filteredUsers = users;
  }

  return (
    <Box>
      <InputGroup maxW="md" mx="auto" mb="4">
        <InputLeftElement pointerEvents="none">
          <SearchIcon color="gray.300" />
        </InputLeftElement>
        <Input
          onChange={handleChange}
          type="text"
          placeholder="Search..."
          focusBorderColor="blue.500"
          bg="white"
          _placeholder={{ color: "gray.400" }}
          borderRadius="md"
          boxShadow="sm"
          _hover={{ boxShadow: "md" }}
        />
      </InputGroup>
    </Box>
  );
}

export default SearchBar;
