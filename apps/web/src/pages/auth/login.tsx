import { useState } from 'react';
import { Box, Container, Heading, Button, Card, Field, Input, VStack, Text } from '@chakra-ui/react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useLoginMutation } from '../../lib/data/mutationHooks';

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const loginMutation = useLoginMutation();

  const handleSubmit = async () => {
    try {
      await loginMutation.mutateAsync({ email, password });
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
            <Heading size="lg">Sign In</Heading>
            <Text color="gray.500">Enter your credentials to continue</Text>
            {loginMutation.error && <Text color="red.500" fontSize="sm">{(loginMutation.error as Error).message}</Text>}
            <Field.Root><Field.Label>Email</Field.Label><Input type="email" placeholder="email@example.com" value={email} onChange={(e: React.ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)} /></Field.Root>
            <Field.Root><Field.Label>Password</Field.Label><Input type="password" value={password} onChange={(e: React.ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)} /></Field.Root>
            <Button w="full" colorScheme="blue" onClick={handleSubmit} loading={loginMutation.isPending}>Sign In</Button>
            <Link href="/auth/register" style={{ width: '100%' }}><Button variant="outline" w="full">Create Account</Button></Link>
            <Link href="/" style={{ width: '100%' }}><Button variant="ghost" w="full">Back to Home</Button></Link>
          </VStack>
        </Card.Body>
      </Card.Root>
    </Container>
  );
}
