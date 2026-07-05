import React, { type ReactNode, useState, useEffect } from 'react';
import { Box, Flex, useDisclosure, Drawer, DrawerOverlay, DrawerContent, DrawerCloseButton, DrawerBody, Button, useColorMode } from '@chakra-ui/react';
import { useRouter } from 'next/router';
import Sidebar from './Sidebar';
import Topbar from './Topbar';
import Breadcrumbs from './Breadcrumbs';
import CommandMenu from './CommandMenu';
import { useKeyboardShortcut } from '../../hooks/useKeyboardShortcut';
import { LoadingSpinner } from '../States';

interface AppLayoutProps {
  readonly children: ReactNode;
}

export default function AppLayout({ children }: AppLayoutProps) {
  const router = useRouter();
  const { isOpen: isMenuOpen, onOpen: onOpenMenu, onClose: onCloseMenu } = useDisclosure();
  const { isOpen: isCmdOpen, onOpen: onOpenCmd, onClose: onCloseCmd, onToggle: onToggleCmd } = useDisclosure();
  const { toggleColorMode } = useColorMode();
  const [loading, setLoading] = useState(false);

  // Listen to Cmd+K / Ctrl+K
  useKeyboardShortcut('k', onToggleCmd, { metaKey: true });
  useKeyboardShortcut('k', onToggleCmd, { ctrlKey: true });

  // Listen to Alt+D
  useKeyboardShortcut('d', toggleColorMode, { altKey: true });

  useEffect(() => {
    const handleStart = () => setLoading(true);
    const handleComplete = () => setLoading(false);

    router.events.on('routeChangeStart', handleStart);
    router.events.on('routeChangeComplete', handleComplete);
    router.events.on('routeChangeError', handleComplete);

    return () => {
      router.events.off('routeChangeStart', handleStart);
      router.events.off('routeChangeComplete', handleComplete);
      router.events.off('routeChangeError', handleComplete);
    };
  }, [router]);

  return (
    <Box minH="100vh" display="flex" flexDirection="column">
      <Topbar onOpenMobileMenu={onOpenMenu} />
      <Flex flex="1">
        {/* Desktop Sidebar */}
        <Box display={{ base: 'none', md: 'block' }}>
          <Sidebar />
        </Box>

        {/* Mobile Drawer Navigation */}
        <Drawer isOpen={isMenuOpen} placement="left" onClose={onCloseMenu} size="xs">
          <DrawerOverlay />
          <DrawerContent>
            <DrawerCloseButton />
            <DrawerBody p={0}>
              <Sidebar />
            </DrawerBody>
          </DrawerContent>
        </Drawer>

        {/* Command Menu Palette Dialog */}
        <CommandMenu isOpen={isCmdOpen} onClose={onCloseCmd} />

        {/* Main Content Area */}
        <Box as="main" role="main" flex="1" p={6} bg="gray.50" overflowX="auto">
          {/* Quick Command Trigger in layout */}
          <Flex justify="space-between" align="center" mb={4}>
            <Breadcrumbs />
            <Button size="xs" variant="outline" colorScheme="blue" onClick={onOpenCmd} aria-keyshortcuts="Control+K">
              ⌨️ Open Command Menu (⌘K)
            </Button>
          </Flex>
          
          <Box mt={2}>
            {loading ? (
              <LoadingSpinner message="Navigating to page..." />
            ) : (
              children
            )}
          </Box>
        </Box>
      </Flex>
    </Box>
  );
}
