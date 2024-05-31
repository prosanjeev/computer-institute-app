import React from 'react';
import { 
  Box, 
  Flex, 
  Button, 
  Menu, 
  MenuButton, 
  MenuList, 
  MenuItem, 
  MenuDivider, 
  IconButton,
  Text,
  useColorModeValue 
} from '@chakra-ui/react';
import { ChevronDownIcon } from '@chakra-ui/icons';
import { FaWallet } from 'react-icons/fa';

const WalletSection = () => {
  return (
    <Flex alignItems="center">
      <Menu>
        <MenuButton 
          as={Button} 
          rightIcon={<ChevronDownIcon />}
          bg={useColorModeValue('gray', 'gray.800')}
          border="1px"
          borderColor={useColorModeValue('gray.200', 'gray.700')}
          _hover={{ bg: useColorModeValue('gray.100', 'gray.700') }}
          _focus={{ boxShadow: 'outline' }}
        >
          <FaWallet style={{ marginRight: 8 }} />
          <Text>Wallet</Text>
        </MenuButton>
        <MenuList>
          <MenuItem>
            <Text fontSize="md">Balance: $100.00</Text>
          </MenuItem>
          <MenuDivider />
          <MenuItem>Add Funds</MenuItem>
          <MenuItem>Withdraw</MenuItem>
          <MenuItem>Transaction History</MenuItem>
        </MenuList>
      </Menu>
    </Flex>
  );
};

export default WalletSection;
