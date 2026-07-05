import React from 'react';
import { Container, Button, VStack } from '@chakra-ui/react';
import Link from 'next/link';
import { UnavailableState } from '../components/States';

export default function Custom404() {
  return (
    <Container maxW="container.md" py={20}>
      <VStack spacing={6}>
        <UnavailableState
          title="404 - Page Not Found"
          description="The page you are looking for does not exist or has been moved."
        />
        <Link href="/" passHref>
          <Button colorScheme="blue">Back to Home</Button>
        </Link>
      </VStack>
    </Container>
  );
}
