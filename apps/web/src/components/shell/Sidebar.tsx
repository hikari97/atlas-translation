import { Box, Heading } from '@chakra-ui/react';
import Link from 'next/link';

export default function Sidebar() {
  return (
    <Box w="240px" p={5} display={{ base: 'none', md: 'block' }}>
      <Heading size="sm" mb={3}>Dashboard</Heading>
      <Box as="nav">
        <Link href="/dashboard" style={{ display: 'block', padding: '8px', textDecoration: 'none' }}>Overview</Link>
        <Link href="/dashboard/projects" style={{ display: 'block', padding: '8px', textDecoration: 'none' }}>Projects</Link>
        <Link href="/dashboard/translate" style={{ display: 'block', padding: '8px', textDecoration: 'none' }}>Translation</Link>
        <Link href="/dashboard/library" style={{ display: 'block', padding: '8px', textDecoration: 'none' }}>Library</Link>
        <Link href="/dashboard/ai-jobs" style={{ display: 'block', padding: '8px', textDecoration: 'none' }}>AI Jobs</Link>
        <Link href="/dashboard/export" style={{ display: 'block', padding: '8px', textDecoration: 'none' }}>Export</Link>
        <Link href="/dashboard/settings" style={{ display: 'block', padding: '8px', textDecoration: 'none' }}>Settings</Link>
      </Box>
    </Box>
  );
}
