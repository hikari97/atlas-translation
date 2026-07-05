import React from 'react';
import { Box, VStack, Button, Heading, useColorMode } from '@chakra-ui/react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { getNavigationItems, isRouteActive } from '../../lib/navigation';

export default function Sidebar() {
  const router = useRouter();
  const { colorMode } = useColorMode();
  const links = getNavigationItems();

  return (
    <Box
      as="nav"
      aria-label="Main Navigation"
      w="240px"
      bg={colorMode === 'light' ? 'white' : 'gray.800'}
      borderRight="1px solid"
      borderColor={colorMode === 'light' ? 'gray.200' : 'gray.700'}
      minH="100vh"
      p={5}
    >
      <VStack align="stretch" spacing={6}>
        <Heading size="xs" textTransform="uppercase" color="gray.500" letterSpacing="wider">
          Workspace
        </Heading>
        <VStack align="stretch" spacing={2}>
          {links.map((link) => {
            const active = isRouteActive(router.pathname, link.path);
            return (
              <Link href={link.path} key={link.path} passHref>
                <Button
                  size="sm"
                  variant={active ? 'solid' : 'ghost'}
                  colorScheme={active ? 'blue' : 'gray'}
                  justifyContent="flex-start"
                  w="100%"
                  aria-current={active ? 'page' : undefined}
                >
                  {link.label}
                </Button>
              </Link>
            );
          })}
        </VStack>
      </VStack>
    </Box>
  );
}
