import { Box, Button, Container, Flex, HStack, Skeleton, Text } from '@chakra-ui/react';
import Link from 'next/link';
import { LuArrowUpRight } from 'react-icons/lu';
import UserMenu from '../shell/UserMenu';
import type { AuthSession } from '../../lib/auth/useAuthSession';
import { getLandingPrimaryAction, getLandingSecondaryAction } from './landingActions';

interface HomeNavbarProps {
  readonly session: AuthSession;
}

export default function HomeNavbar({ session }: HomeNavbarProps) {
  const primaryAction = getLandingPrimaryAction(session.status);
  const secondaryAction = getLandingSecondaryAction(session.status);

  return (
    <Box
      as="header"
      bg="transparent"
      position="sticky"
      top={0}
      zIndex="var(--z-sticky)"
    >
      <Container maxW="var(--atlas-container)" px={{ base: 3, md: 6 }} py={{ base: 3, md: 4 }}>
        <Flex align="center" className="landing-nav-shell" gap={{ base: 2, md: 4 }} justify="space-between" minH="4rem" px={{ base: 3, md: 5 }}>
          <HStack asChild className="landing-wordmark" gap={3}>
            <Link href="/">
              <Box
                alignItems="center"
                border="1px solid var(--color-accent)"
                borderRadius="var(--radius-sm)"
                color="var(--color-accent-deep)"
                display="flex"
                fontSize="sm"
                fontWeight="700"
                h="2.35rem"
                justifyContent="center"
                w="2.35rem"
              >
                AS
              </Box>
              <Text color="var(--color-ink)" display={{ base: 'none', sm: 'block' }} fontFamily="var(--font-display)" fontSize="lg" lineHeight="1" whiteSpace="nowrap">
                Atlas Studio
              </Text>
            </Link>
          </HStack>

          <HStack as="nav" display={{ base: 'none', lg: 'flex' }} gap={6}>
            <Link className="landing-nav-link" href="#workflow">Process</Link>
            <Link className="landing-nav-link" href="#privacy">Privacy</Link>
          </HStack>

          <HStack gap={2}>
            {session.status === 'checking' && (
              <Skeleton borderRadius="var(--radius-sm)" h="2.5rem" w="8rem" />
            )}
            {session.status !== 'checking' && (
              <>
                <Button
                  asChild
                  color="var(--color-ink-soft)"
                  display={{ base: 'none', sm: 'inline-flex' }}
                  px={2}
                  size="sm"
                  variant="ghost"
                >
                  <Link href={secondaryAction.href}>{secondaryAction.label}</Link>
                </Button>
                <Button
                  asChild
                  bg="var(--color-accent)"
                  className="landing-primary-action"
                  color="var(--color-accent-ink)"
                  minH="2.75rem"
                  size="sm"
                >
                  <Link href={primaryAction.href}>
                    {primaryAction.label}
                    <LuArrowUpRight aria-hidden="true" size={14} strokeWidth={1.75} />
                  </Link>
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
