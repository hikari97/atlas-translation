import React from 'react';
import {
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Button,
  Avatar,
  Text,
  VStack,
  MenuDivider,
  HStack,
} from '@chakra-ui/react';
import Link from 'next/link';

export default function UserMenu() {
  const user = {
    name: 'H.Makki',
    email: 'makki@atlas.studio',
    role: 'Administrator',
  };

  return (
    <Menu>
      <MenuButton
        as={Button}
        variant="ghost"
        rounded="full"
        cursor="pointer"
        minW={0}
        p={0}
      >
        <Avatar
          size="sm"
          name={user.name}
          bg="blue.500"
          color="white"
        />
      </MenuButton>
      <MenuList zIndex={11}>
        <Box px={4} py={2}>
          <VStack align="start" spacing={0}>
            <Text fontWeight="bold" fontSize="sm">{user.name}</Text>
            <Text fontSize="xs" color="gray.500">{user.email}</Text>
          </VStack>
        </Box>
        <MenuDivider />
        <Link href="/settings" passHref>
          <MenuItem>Profile Settings</MenuItem>
        </Link>
        <Link href="/settings" passHref>
          <MenuItem>Shortcuts Configuration</MenuItem>
        </Link>
        <MenuDivider />
        <Link href="/auth/login" passHref>
          <MenuItem color="red.500">Sign Out</MenuItem>
        </Link>
      </MenuList>
    </Menu>
  );
}

// Inline Box wrapper since Box is required but might not be imported inside the menu scope
import { Box } from '@chakra-ui/react';
