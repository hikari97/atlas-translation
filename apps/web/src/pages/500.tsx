import React from 'react';
import { Container, Button, VStack } from '@chakra-ui/react';
import Link from 'next/link';
import { UnavailableState } from '../components/States';

export default function Custom500() {
  const handleReload = () => {
    window.location.reload();
  };

  return (
    <Container maxW="container.md" py={20}>
      <VStack spacing={6}>
        <UnavailableState
          title="500 - Server Error"
          description="An internal server error occurred. Please try reloading the page."
          onRetry={handleReload}
        />
        <Link href="/" passHref>
          <Button variant="outline">Back to Home</Button>
        </Link>
      </VStack>
    </Container>
  );
}
