import { Box, Container, Flex, HStack, Text } from '@chakra-ui/react';
import Link from 'next/link';
import type { AuthSession } from '../../lib/auth/useAuthSession';
import { getLandingPrimaryAction, getLandingSecondaryAction } from './landingActions';

interface LandingFooterProps {
  readonly session: AuthSession;
}

export default function LandingFooter({ session }: LandingFooterProps) {
  const primaryAction = getLandingPrimaryAction(session.status);
  const secondaryAction = getLandingSecondaryAction(session.status);

  return (
    <Box as="footer" bg="var(--color-paper-raised)" borderTop="var(--rule-ink)" py={7}>
      <Container maxW="var(--atlas-container)" px={{ base: 4, md: 6 }}>
        <Flex align={{ base: 'flex-start', lg: 'center' }} direction={{ base: 'column', lg: 'row' }} gap={{ base: 5, lg: 8 }} justify="space-between">
          <Text color="var(--color-ink)" fontFamily="var(--font-display)" fontSize="var(--text-lg)" letterSpacing="-0.025em">
            Atlas Studio
          </Text>
          <Text color="var(--color-muted)" fontSize="sm">
            Images remain temporary until downloaded.
          </Text>
          <HStack color="var(--color-ink-soft)" gap={6} wrap="wrap">
            <Link className="landing-footer-link" href={secondaryAction.href}>{secondaryAction.label}</Link>
            <Link className="landing-footer-link" href={primaryAction.href}>{primaryAction.label}</Link>
          </HStack>
          <Text color="var(--color-muted)" fontSize="sm">© 2026</Text>
        </Flex>
      </Container>
    </Box>
  );
}
