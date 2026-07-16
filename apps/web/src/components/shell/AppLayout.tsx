import { type ReactNode } from 'react';
import { Box, Flex } from '@chakra-ui/react';
import { useRouter } from 'next/router';
import Sidebar from './Sidebar';
import Topbar from './Topbar';

export default function AppLayout({ children }: { children: ReactNode }) {
  const router = useRouter();
  const isEditor = router.pathname.startsWith('/editor');

  return (
    <Box minH="100dvh">
      <a className="skip-link" href="#main-content">
        Skip to content
      </a>
      <Topbar />
      <Flex align="stretch">
        <Sidebar />
        <Box
          as="main"
          flex="1"
          id="main-content"
          minW={0}
          px={isEditor ? 0 : { base: 4, md: 6 }}
          py={isEditor ? 0 : { base: 5, md: 8 }}
        >
          <Box maxW={isEditor ? 'none' : 'var(--atlas-container)'} mx="auto">
            {children}
          </Box>
        </Box>
      </Flex>
    </Box>
  );
}
