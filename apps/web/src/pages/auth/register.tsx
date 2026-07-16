import { useState, type FormEvent } from 'react';
import { Box, Button, Container, Field, Heading, HStack, Input, Text, VStack } from '@chakra-ui/react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useRegisterMutation } from '../../lib/data/mutationHooks';
import Surface from '../../components/ui/Surface';

export default function RegisterPage() {
  const router = useRouter();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const registerMutation = useRegisterMutation();

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    try {
      await registerMutation.mutateAsync({ name, email, password });
      await router.push('/dashboard');
    } catch {
      // error handled by mutation
    }
  };

  return (
    <Container
      alignItems="center"
      display="flex"
      justifyContent="center"
      maxW="6xl"
      minH="100dvh"
      py={{ base: 8, md: 16 }}
    >
      <Surface
        display="grid"
        gridTemplateColumns={{ base: '1fr', lg: '0.9fr 1.1fr' }}
        maxW="58rem"
        overflow="hidden"
        w="full"
      >
        <Box
          bg="var(--atlas-primary-soft)"
          borderRightWidth={{ base: 0, lg: '1px' }}
          borderBottomWidth={{ base: '1px', lg: 0 }}
          borderColor="var(--atlas-border)"
          p={{ base: 7, md: 10 }}
        >
          <VStack align="flex-start" gap={5}>
            <Box
              alignItems="center"
              bg="var(--atlas-primary)"
              borderRadius="var(--atlas-radius-md)"
              color="white"
              display="flex"
              fontWeight="900"
              h="3rem"
              justifyContent="center"
              letterSpacing="-0.04em"
              w="3rem"
            >
              AS
            </Box>
            <Box>
              <Heading
                color="var(--atlas-foreground)"
                fontSize={{ base: '2rem', md: '2.5rem' }}
                fontWeight="850"
                letterSpacing="-0.045em"
                lineHeight="1"
                mb={3}
              >
                Open your translator
              </Heading>
              <Text color="var(--atlas-muted)" lineHeight="1.7">
                Upload pages, run AI translation, and refine the result without setting up a project first.
              </Text>
            </Box>
          </VStack>
        </Box>

        <Box asChild p={{ base: 7, md: 10 }}>
          <form onSubmit={handleSubmit}>
            <VStack align="stretch" gap={5}>
              <Box>
                <Heading fontSize="xl" letterSpacing="-0.02em">
                  Create account
                </Heading>
                <Text color="var(--atlas-muted)" fontSize="sm" mt={1}>
                  Add your details to begin using Atlas Studio.
                </Text>
              </Box>
              {registerMutation.error && (
                <Box
                  bg="rgba(180, 35, 24, 0.08)"
                  borderColor="rgba(180, 35, 24, 0.22)"
                  borderRadius="var(--atlas-radius-sm)"
                  borderWidth="1px"
                  color="var(--atlas-danger)"
                  fontSize="sm"
                  p={3}
                >
                  {(registerMutation.error as Error).message}
                </Box>
              )}
              <Field.Root required>
                <Field.Label>Name</Field.Label>
                <Input
                  autoComplete="name"
                  borderRadius="var(--atlas-radius-sm)"
                  onChange={(event: React.ChangeEvent<HTMLInputElement>) => setName(event.target.value)}
                  placeholder="Your name"
                  value={name}
                />
              </Field.Root>
              <Field.Root required>
                <Field.Label>Email</Field.Label>
                <Input
                  autoComplete="email"
                  borderRadius="var(--atlas-radius-sm)"
                  onChange={(event: React.ChangeEvent<HTMLInputElement>) => setEmail(event.target.value)}
                  placeholder="email@example.com"
                  type="email"
                  value={email}
                />
              </Field.Root>
              <Field.Root required>
                <Field.Label>Password</Field.Label>
                <Input
                  autoComplete="new-password"
                  borderRadius="var(--atlas-radius-sm)"
                  onChange={(event: React.ChangeEvent<HTMLInputElement>) => setPassword(event.target.value)}
                  type="password"
                  value={password}
                />
              </Field.Root>
              <Button
                className="atlas-button-motion"
                color="white"
                colorPalette="blue"
                loading={registerMutation.isPending}
                type="submit"
                w="full"
              >
                Create account
              </Button>
              <HStack justify="center">
                <Button asChild size="sm" variant="ghost">
                  <Link href="/auth/login">Already have an account? Sign in</Link>
                </Button>
              </HStack>
            </VStack>
          </form>
        </Box>
      </Surface>
    </Container>
  );
}
