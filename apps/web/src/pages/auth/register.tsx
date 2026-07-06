import { useState } from 'react';
import { Box, Container, Heading, Button, Card, Field, Input, VStack, Text } from '@chakra-ui/react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useRegisterMutation } from '../../lib/data/mutationHooks';

export default function RegisterPage() {
  const router = useRouter();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const registerMutation = useRegisterMutation();

  const handleSubmit = async () => {
    try {
      await registerMutation.mutateAsync({ name, email, password });
      router.push('/dashboard');
    } catch (err) {
      // error handled by mutation
    }
  };

  return (
    <Container maxW="sm" py={20}>
      <Card.Root>
        <Card.Body>
          <VStack gap={4}>
            <Heading size="lg">Create Account</Heading>
            <Text color="gray.500">Sign up for Atlas Studio</Text>
            {registerMutation.error && <Text color="red.500" fontSize="sm">{(registerMutation.error as Error).message}</Text>}
            <Field.Root><Field.Label>Name</Field.Label><Input placeholder="Your name" value={name} onChange={(e: React.ChangeEvent<HTMLInputElement>) => setName(e.target.value)} /></Field.Root>
            <Field.Root><Field.Label>Email</Field.Label><Input type="email" placeholder="email@example.com" value={email} onChange={(e: React.ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)} /></Field.Root>
            <Field.Root><Field.Label>Password</Field.Label><Input type="password" value={password} onChange={(e: React.ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)} /></Field.Root>
            <Button w="full" colorScheme="blue" onClick={handleSubmit} loading={registerMutation.isPending}>Create Account</Button>
            <Link href="/auth/login" style={{ width: '100%' }}><Button variant="outline" w="full">Already have account? Sign In</Button></Link>
          </VStack>
        </Card.Body>
      </Card.Root>
    </Container>
  );
}
