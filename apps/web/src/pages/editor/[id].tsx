import React from 'react';
import { Box, Heading, Text, Container, Button } from '@chakra-ui/react';
import { useRouter } from 'next/router';
import Link from 'next/link';

export default function EditorPage() {
  const router = useRouter();
  const { id } = router.query;

  return (
    <Container maxW="container.xl" py={12}>
      <Box p={8} borderWidth={1} borderRadius="lg" bg="white" boxShadow="sm">
        <Heading mb={4}>Comic Localization Editor</Heading>
        <Text mb={6} color="gray.600">Editing Project ID: {id}</Text>
        <Link href="/" passHref>
          <Button colorScheme="blue">Back to Home</Button>
        </Link>
      </Box>
    </Container>
  );
}
