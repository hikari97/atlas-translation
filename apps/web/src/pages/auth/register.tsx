import { Box, Container, Heading, Button, Card, Field, Input, VStack, Text } from '@chakra-ui/react';
import Link from 'next/link';

export default function RegisterPage() {
  return (
    <Container maxW="sm" py={20}>
      <Card.Root>
        <Card.Body>
          <VStack gap={4}>
            <Heading size="lg">Create Account</Heading>
            <Text color="gray.500">Sign up for Atlas Studio</Text>
            <Field.Root><Field.Label>Name</Field.Label><Input placeholder="Your name" /></Field.Root>
            <Field.Root><Field.Label>Email</Field.Label><Input placeholder="email@example.com" /></Field.Root>
            <Field.Root><Field.Label>Password</Field.Label><Input type="password" /></Field.Root>
            <Button w="full">Create Account</Button>
            <Text fontSize="sm">
              Already have an account?{' '}
              <Link href="/auth/login" style={{ color: 'var(--chakra-colors-blue-500)' }}>Sign in</Link>
            </Text>
            <Link href="/" style={{ width: '100%' }}><Button variant="outline" w="full">Back to Home</Button></Link>
          </VStack>
        </Card.Body>
      </Card.Root>
    </Container>
  );
}
