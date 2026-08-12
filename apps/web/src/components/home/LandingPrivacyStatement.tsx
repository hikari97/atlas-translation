import { Box, Button, Container, Flex, Heading, Text, VStack } from '@chakra-ui/react';
import Link from 'next/link';
import { LuArrowUpRight, LuLockKeyhole } from 'react-icons/lu';
import type { AuthSession } from '../../lib/auth/useAuthSession';
import { getLandingPrimaryAction } from './landingActions';

interface LandingPrivacyStatementProps {
  readonly session: AuthSession;
}

export default function LandingPrivacyStatement({ session }: LandingPrivacyStatementProps) {
  const primaryAction = getLandingPrimaryAction(session.status);

  return (
    <Box as="section" bg="var(--color-paper-raised)" borderTop="var(--rule-ink)" id="privacy" py={{ base: 20, md: 32 }}>
      <Container maxW="var(--atlas-container)" px={{ base: 4, md: 6 }}>
        <Flex align={{ base: 'flex-start', lg: 'flex-end' }} direction={{ base: 'column', lg: 'row' }} gap={{ base: 10, lg: 16 }} justify="space-between">
          <VStack align="flex-start" gap={6} maxW="52rem">
            <Box alignItems="center" border="var(--rule-hairline)" borderRadius="var(--radius-sm)" color="var(--color-accent-deep)" display="flex" h="2.75rem" justifyContent="center" w="2.75rem">
              <LuLockKeyhole size={18} />
            </Box>
            <Heading
              as="h2"
              color="var(--color-ink)"
              fontFamily="var(--font-display)"
              fontSize={{ base: 'var(--text-2xl)', md: 'var(--text-3xl)' }}
              fontStyle="normal"
              fontWeight="400"
              letterSpacing="-0.04em"
              lineHeight="1.03"
              maxW="18ch"
              minW={0}
              overflowWrap="anywhere"
            >
              Your image is a session, not an archive.
            </Heading>
            <Text color="var(--color-muted)" fontSize={{ base: 'md', md: 'lg' }} lineHeight="1.75" maxW="65ch">
              The backend reads the uploaded page, performs detection, translation, and inpainting, then returns the result to the browser. Atlas does not require a project or image library for this workflow.
            </Text>
          </VStack>

          <Button
            asChild
            bg="var(--color-accent)"
            className="landing-primary-action"
            color="var(--color-accent-ink)"
            flexShrink={0}
            h="3.5rem"
          >
            <Link href={primaryAction.href}>
              {primaryAction.label}
              <LuArrowUpRight aria-hidden="true" size={16} strokeWidth={1.75} />
            </Link>
          </Button>
        </Flex>
      </Container>
    </Box>
  );
}
