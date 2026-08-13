import { Box, Container, Flex, HStack, Text, VStack } from '@chakra-ui/react';
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
    <Box as="footer" bg="var(--color-paper-raised)" borderTop="var(--rule-ink)" py={{ base: 8, md: 10 }}>
      <Container maxW="var(--atlas-container)" px={{ base: 4, md: 6 }}>
        <VStack align="stretch" gap={7}>
          <Flex align={{ base: 'flex-start', md: 'center' }} direction={{ base: 'column', md: 'row' }} gap={5} justify="space-between">
            <Box>
              <Text color="var(--color-ink)" fontFamily="var(--font-display)" fontSize="var(--text-lg)" letterSpacing="-0.025em">
                Atlas Studio
              </Text>
              <Text color="var(--color-muted)" fontSize="sm" mt={2}>
                Images remain temporary until downloaded.
              </Text>
            </Box>
            <HStack as="nav" aria-label="Product" color="var(--color-ink-soft)" gap={6} wrap="wrap">
              <Link className="landing-footer-link" href={secondaryAction.href}>{secondaryAction.label}</Link>
              <Link className="landing-footer-link" href={primaryAction.href}>{primaryAction.label}</Link>
            </HStack>
          </Flex>

          <Flex
            align={{ base: 'flex-start', md: 'center' }}
            borderTop="var(--rule-hairline)"
            direction={{ base: 'column', md: 'row' }}
            gap={5}
            justify="space-between"
            pt={6}
          >
            <HStack as="nav" aria-label="Legal" color="var(--color-ink-soft)" gap={{ base: 4, md: 6 }} wrap="wrap">
              <Link className="landing-footer-link" href="/privacy-policy">Privacy Policy</Link>
              <Link className="landing-footer-link" href="/terms-and-conditions">Terms and Conditions</Link>
              <Link className="landing-footer-link" href="/cookie-policy">Cookie Policy</Link>
            </HStack>
            <Text color="var(--color-muted)" fontSize="sm">© 2026 Atlas Studio</Text>
          </Flex>
        </VStack>
      </Container>
    </Box>
  );
}
