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
    <Box as="footer" borderTop="var(--rule-hairline)" pb={8} pt={{ base: 12, md: 16 }}>
      <Container maxW="var(--atlas-container)" px={{ base: 4, md: 6 }}>
        <Flex align={{ base: 'flex-start', md: 'flex-end' }} direction={{ base: 'column', md: 'row' }} gap={8} justify="space-between">
          <Box>
            <Text color="var(--color-ink)" fontFamily="var(--font-display)" fontSize={{ base: 'var(--text-xl)', md: 'var(--text-2xl)' }} letterSpacing="-0.035em">
              Atlas Studio
            </Text>
            <Text color="var(--color-muted)" lineHeight="1.7" maxW="56ch" mt={3}>
              A focused workspace for translating comic pages and setting every line with care.
            </Text>
          </Box>
          <HStack color="var(--color-ink-soft)" gap={6} wrap="wrap">
            <Link className="landing-footer-link" href={secondaryAction.href}>{secondaryAction.label}</Link>
            <Link className="landing-footer-link" href={primaryAction.href}>{primaryAction.label}</Link>
          </HStack>
        </Flex>
        <Flex borderTop="var(--rule-hairline)" color="var(--color-muted)" direction={{ base: 'column', sm: 'row' }} fontSize="sm" gap={2} justify="space-between" mt={10} pt={5}>
          <Text>© 2026 Atlas Studio</Text>
          <Text>Images remain temporary until downloaded.</Text>
        </Flex>
      </Container>
    </Box>
  );
}
