import { Box, Button, Container, Flex, HStack, Skeleton, Text } from '@chakra-ui/react';
import Link from 'next/link';
import UserMenu from '../shell/UserMenu';
import type { AuthSession } from '../../lib/auth/useAuthSession';

interface HomeNavbarProps {
  readonly session: AuthSession;
}

const authenticatedLinks = [
  { href: '/dashboard', label: 'Dashboard' },
  { href: '/dashboard/images', label: 'Image editor' },
] as const;

export default function HomeNavbar({ session }: HomeNavbarProps) {
  return (
    <Box
      as="header"
      backdropFilter="blur(18px)"
      bg="var(--atlas-surface)"
      borderBottomWidth="1px"
      borderColor="var(--atlas-border)"
      position="sticky"
      top={0}
      zIndex={20}
    >
      <Container maxW="var(--atlas-container)" px={{ base: 4, md: 6 }} py={3}>
        <Flex align="center" gap={4} justify="space-between">
          <HStack asChild className="atlas-focus-ring" gap={3}>
            <Link href="/">
              <Box
                alignItems="center"
                bg="var(--atlas-primary)"
                borderRadius="var(--atlas-radius-sm)"
                color="white"
                display="flex"
                fontSize="sm"
                fontWeight="900"
                h="2.35rem"
                justifyContent="center"
                letterSpacing="-0.04em"
                w="2.35rem"
              >
                AS
              </Box>
              <Box>
                <Text fontWeight="850" letterSpacing="-0.02em" lineHeight="1">
                  Atlas Studio
                </Text>
                {session.status === 'authenticated' && (
                  <Text color="var(--atlas-muted)" fontSize="xs" lineHeight="1.35">
                    Workspace active
                  </Text>
                )}
              </Box>
            </Link>
          </HStack>

          {session.status === 'authenticated' && (
            <HStack as="nav" display={{ base: 'none', md: 'flex' }} gap={1}>
              {authenticatedLinks.map((item) => (
                <Button asChild key={item.href} size="sm" variant="ghost">
                  <Link href={item.href}>{item.label}</Link>
                </Button>
              ))}
            </HStack>
          )}

          <HStack gap={2}>
            {session.status === 'checking' && (
              <Skeleton borderRadius="var(--atlas-radius-sm)" h="2.5rem" w="8rem" />
            )}
            {session.status === 'anonymous' && (
              <>
                <Button asChild size="sm" variant="ghost">
                  <Link href="/auth/login">Sign in</Link>
                </Button>
                <Button
                  asChild
                  className="atlas-button-motion"
                  color="white"
                  colorPalette="blue"
                  size="sm"
                >
                  <Link href="/auth/register">Register</Link>
                </Button>
              </>
            )}
            {session.status === 'authenticated' && (
              <UserMenu logoutHref="/" profile={session.profile} />
            )}
          </HStack>
        </Flex>
      </Container>
    </Box>
  );
}
