import { Box, Heading, Text, Button, Container, VStack } from '@chakra-ui/react';
import Link from 'next/link';

export default function ServerError() {
  return (
    <Container py={20}>
      <VStack gap={4} textAlign="center">
        <Heading>500</Heading>
        <Text>Server error</Text>
        <Link href="/"><Button>Go Home</Button></Link>
      </VStack>
    </Container>
  );
}
