import React from 'react';
import { Box, Flex, HStack, Heading, Text, Button, useColorMode, IconButton } from '@chakra-ui/react';
import WorkspaceSwitcher from './WorkspaceSwitcher';
import UserMenu from './UserMenu';
import NotificationEntry from './NotificationEntry';

interface TopbarProps {
  readonly onOpenMobileMenu?: () => void;
}

export default function Topbar({ onOpenMobileMenu }: TopbarProps) {
  const { colorMode, toggleColorMode } = useColorMode();

  return (
    <Box
      as="header"
      role="banner"
      borderBottom="1px solid"
      borderColor={colorMode === 'light' ? 'gray.200' : 'gray.700'}
      bg={colorMode === 'light' ? 'white' : 'gray.800'}
      px={6}
      py={4}
    >
      <Flex justify="space-between" align="center">
        <HStack spacing={4}>
          {onOpenMobileMenu && (
            <IconButton
              display={{ base: 'flex', md: 'none' }}
              onClick={onOpenMobileMenu}
              aria-label="Open Navigation Menu"
              variant="outline"
              size="sm"
              icon={<span>☰</span>}
            />
          )}
          <Box bg="blue.600" p={2} borderRadius="md" color="white" fontWeight="bold">
            AT
          </Box>
          <Box display={{ base: 'none', sm: 'block' }}>
            <Heading size="md" letterSpacing="tight">Atlas Studio</Heading>
            <Text fontSize="xs" color="gray.500">AI Comic Localization Platform</Text>
          </Box>
          <WorkspaceSwitcher />
        </HStack>

        <HStack spacing={4}>
          <Button size="sm" onClick={toggleColorMode} variant="ghost" aria-label="Toggle Color Mode">
            {colorMode === 'light' ? '🌙 Dark' : '☀️ Light'}
          </Button>
          <NotificationEntry />
          <UserMenu />
        </HStack>
      </Flex>
    </Box>
  );
}
