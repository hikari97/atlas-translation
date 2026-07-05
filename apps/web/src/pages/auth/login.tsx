import React from 'react';
import { Box, Heading, Text, Container, Button } from '@chakra-ui/react';
import Link from 'next/link';

export default function LoginPage() {
  return (
    <Container maxW="container.sm" py={20}>
      <Box p={8} borderWidth={1} borderRadius="lg" bg="white" boxShadow="md" textAlign="center">
        <Heading mb={4}>Login to Atlas Studio</Heading>
        <Text mb={6} color="gray.600">AI-Powered Comic Localization Platform</Text>
        <Link href="/" passHref>
          <Button colorScheme="blue" w="100%">Enter Workspace</Button>
        </Link>
      </Box>
    </Container>
  );
}
