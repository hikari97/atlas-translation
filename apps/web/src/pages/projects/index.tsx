import React from 'react';
import { Box, Container, Button, VStack } from '@chakra-ui/react';
import Link from 'next/link';
import PageHeader from '../../components/shell/PageHeader';

export default function ProjectsPage() {
  return (
    <Container maxW="container.lg" py={6}>
      <VStack align="stretch" spacing={6}>
        <PageHeader
          title="Projects"
          description="List of localized manga, comics, and translations."
        >
          <Link href="/" passHref>
            <Button colorScheme="blue" size="sm">New Project</Button>
          </Link>
        </PageHeader>
        <Box p={8} borderWidth={1} borderRadius="lg" bg="white" boxShadow="sm">
          No projects found.
        </Box>
      </VStack>
    </Container>
  );
}
