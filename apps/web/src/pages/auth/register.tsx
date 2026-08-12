import { useState, type ChangeEvent, type FormEvent } from 'react';
import { Box, Button, Container, Heading, HStack, Text, VStack } from '@chakra-ui/react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { LuLockKeyhole, LuMail, LuUserRound } from 'react-icons/lu';
import { useRegisterMutation } from '../../lib/data/mutationHooks';
import Surface from '../../components/ui/Surface';
import { AuthField, AuthPasswordField } from '../../components/auth/AuthField';
import AuthFormError from '../../components/auth/AuthFormError';
import {
  MINIMUM_PASSWORD_LENGTH,
  validateRegisterForm,
  type RegisterFormErrors,
} from '../../lib/auth/formValidation';

export default function RegisterPage() {
  const router = useRouter();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errors, setErrors] = useState<RegisterFormErrors>({});
  const registerMutation = useRegisterMutation();

  const updateField = (
    field: keyof RegisterFormErrors,
    setter: (value: string) => void,
  ) => (event: ChangeEvent<HTMLInputElement>) => {
    setter(event.target.value);
    setErrors((current) => ({ ...current, [field]: undefined }));
    registerMutation.reset();
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const nextErrors = validateRegisterForm({ confirmPassword, email, name, password });

    if (Object.keys(nextErrors).length > 0) {
      setErrors(nextErrors);
      return;
    }

    try {
      await registerMutation.mutateAsync({ name: name.trim(), email: email.trim(), password });
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
          <form noValidate onSubmit={handleSubmit}>
            <VStack align="stretch" gap={5}>
              <Box>
                <Heading fontSize="xl" letterSpacing="-0.02em">
                  Create account
                </Heading>
                <Text color="var(--atlas-muted)" fontSize="sm" mt={1}>
                  Add your details to begin using Atlas Studio.
                </Text>
              </Box>
              {registerMutation.error && <AuthFormError message={(registerMutation.error as Error).message} />}
              <AuthField
                autoComplete="name"
                error={errors.name}
                icon={<LuUserRound size={18} />}
                label="Full name"
                name="name"
                onChange={updateField('name', setName)}
                placeholder="Your full name"
                value={name}
              />
              <AuthField
                autoComplete="email"
                error={errors.email}
                icon={<LuMail size={18} />}
                label="Email address"
                name="email"
                onChange={updateField('email', setEmail)}
                placeholder="you@example.com"
                type="email"
                value={email}
              />
              <AuthPasswordField
                autoComplete="new-password"
                error={errors.password}
                helperText={`Use at least ${MINIMUM_PASSWORD_LENGTH} characters.`}
                icon={<LuLockKeyhole size={18} />}
                label="Password"
                name="password"
                onChange={updateField('password', setPassword)}
                placeholder="Create a secure password"
                value={password}
              />
              <AuthPasswordField
                autoComplete="new-password"
                error={errors.confirmPassword}
                icon={<LuLockKeyhole size={18} />}
                label="Confirm password"
                name="confirmPassword"
                onChange={updateField('confirmPassword', setConfirmPassword)}
                placeholder="Repeat your password"
                value={confirmPassword}
              />
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
