import { ChevronDownIcon } from "@chakra-ui/icons";
import { Button, Card, Menu, MenuButton, MenuDivider, MenuItem, MenuList, Text } from "@chakra-ui/react";
import React from "react";
// import { useSelector } from 'react-redux';

const FranchiseNavWallate = ({ branchData }) => {
  return (
    <Card px={2} boxShadow='md'>
      <Menu>
        <MenuButton
          as={Button}
          rightIcon={<ChevronDownIcon />}
          bg="transparent" color='black'
          _hover={{ bg: "transparent" }}
          _active={{ bg: "transparent" }}
          _focus={{ boxShadow: "none" }}
        >
          <Text fontSize="28px" fontWeight="600" >
            {branchData && branchData.wallet ? branchData.wallet : 0}₹
          </Text>
        </MenuButton>
        <MenuList>
          <MenuItem>
            <Text fontSize="md" >Balance: {branchData && branchData.wallet ? branchData.wallet : 0}₹</Text>
          </MenuItem>
          <MenuDivider />
          <MenuItem>Add Funds</MenuItem>
          {/* <MenuItem>Withdraw</MenuItem> */}
          <MenuItem>Transaction History</MenuItem>
        </MenuList>
      </Menu>
    </Card>
  );
};

export default FranchiseNavWallate;
