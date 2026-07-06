import { Box, Container, Heading, Text, Button, Card, VStack } from '@chakra-ui/react';
import Link from 'next/link';

export default function ProjectDetailPage() {
  return (
    <Container maxW="container.lg" py={6}>
      <Link href="/dashboard/projects"><Button variant="ghost" mb={4}>⬅ Back to Projects</Button></Link>
      <Card.Root>
        <Card.Body>
          <VStack gap={4}>
            <Heading>Project Detail</Heading>
            <Text>Project ID page</Text>
          </VStack>
        </Card.Body>
      </Card.Root>
    </Container>
  );
}
