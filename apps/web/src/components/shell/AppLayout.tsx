import { type ReactNode } from 'react';
import { Box, Flex } from '@chakra-ui/react';
import Sidebar from './Sidebar';
import Topbar from './Topbar';

export default function AppLayout({ children }: { children: ReactNode }) {
  return (
    <Box minH="100vh">
      <Topbar />
      <Flex>
        <Sidebar />
        <Box as="main" flex="1" p={6}>{children}</Box>
      </Flex>
    </Box>
  );
}
