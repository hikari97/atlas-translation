import { Box, Heading, Text, Button, Container, VStack } from '@chakra-ui/react';
import Link from 'next/link';

export default function NotFound() {
  return (
    <Container py={20}>
      <VStack gap={4} textAlign="center">
        <Heading>404</Heading>
        <Text>Page not found</Text>
        <Link href="/"><Button>Go Home</Button></Link>
      </VStack>
    </Container>
  );
}
