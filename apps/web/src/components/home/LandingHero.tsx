import { Box, Button, Container, Flex, Grid, Heading, Text, VStack } from '@chakra-ui/react';
import Link from 'next/link';
import { LuArrowRight } from 'react-icons/lu';
import type { AuthSession } from '../../lib/auth/useAuthSession';
import LandingEditorPreview from './LandingEditorPreview';
import { getLandingPrimaryAction, getLandingSecondaryAction } from './landingActions';

interface LandingHeroProps {
  readonly session: AuthSession;
}

export default function LandingHero({ session }: LandingHeroProps) {
  const primaryAction = getLandingPrimaryAction(session.status);
  const secondaryAction = getLandingSecondaryAction(session.status);

  return (
    <Box as="section" pb={{ base: 20, md: 28 }} pt={{ base: 12, md: 20 }}>
      <Container maxW="var(--atlas-container)" px={{ base: 4, md: 6 }}>
        <Grid
          alignItems="center"
          gap={{ base: 12, lg: 16 }}
          templateColumns={{ base: 'minmax(0, 1fr)', lg: 'minmax(0, 0.88fr) minmax(0, 1.12fr)' }}
        >
          <VStack align="flex-start" className="landing-hero-copy" gap={7} minW={0}>
            <Text color="var(--color-muted)" fontFamily="var(--font-display)" fontSize="md">
              Comic localization, composed with care.
            </Text>
            <Heading
              as="h1"
              color="var(--color-ink)"
              fontFamily="var(--font-display)"
              fontSize={{ base: 'var(--text-display-mobile)', md: 'var(--text-display)' }}
              fontStyle="normal"
              fontWeight="400"
              letterSpacing="-0.045em"
              lineHeight="0.98"
              maxW={{ base: '13ch', md: '10ch' }}
              minW={0}
              overflowWrap="anywhere"
            >
              Translate every page. Keep nothing behind.
            </Heading>
            <Text color="var(--color-muted)" fontSize={{ base: 'md', md: 'lg' }} lineHeight="1.75" maxW="60ch">
              Detect dialogue, remove the original lettering, translate the image with your chosen AI model, and refine every line before downloading the final page.
            </Text>
            <Flex direction={{ base: 'column', sm: 'row' }} gap={3} w={{ base: 'full', sm: 'auto' }}>
              <Button
                asChild
                bg="var(--color-accent)"
                className="landing-primary-action"
                color="var(--color-accent-ink)"
                h="3.25rem"
                px={6}
              >
                <Link href={primaryAction.href}>
                  {primaryAction.label} <LuArrowRight />
                </Link>
              </Button>
              <Button
                asChild
                borderColor="var(--color-rule-strong)"
                className="landing-secondary-action"
                color="var(--color-ink)"
                h="3.25rem"
                px={6}
                variant="outline"
              >
                <Link href={secondaryAction.href}>{secondaryAction.label}</Link>
              </Button>
            </Flex>
            <Text color="var(--color-muted)" fontSize="sm">
              No project setup. No stored image results. Download when you are finished.
            </Text>
          </VStack>

          <Box className="landing-hero-preview" minW={0}>
            <LandingEditorPreview />
          </Box>
        </Grid>
      </Container>
    </Box>
  );
}
