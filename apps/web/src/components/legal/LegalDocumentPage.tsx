/* Hallmark · macrostructure: Long Document · tone: luxury · anchor hue: ultramarine */
/* Hallmark · pre-emit critique: P5 H5 E5 S5 R5 V4 */
import { Box, Container, Grid, Heading, Link as ChakraLink, Text, VStack } from '@chakra-ui/react';
import Link from 'next/link';
import HomeNavbar from '../home/HomeNavbar';
import LandingFooter from '../home/LandingFooter';
import type { LegalDocument } from '../../lib/legal/legalDocuments';
import { useAuthSession } from '../../lib/auth/useAuthSession';

interface LegalDocumentPageProps {
  readonly document: LegalDocument;
}

function getSectionId(heading: string): string {
  return heading.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
}

/** Renders a public legal document with shared Atlas navigation and typography. */
export default function LegalDocumentPage({ document }: LegalDocumentPageProps) {
  const session = useAuthSession();

  return (
    <Box className="landing-page" minH="100dvh">
      <a className="skip-link" href="#main-content">Skip to content</a>
      <HomeNavbar session={session} />

      <Box as="main" id="main-content">
        <Container maxW="var(--atlas-container)" px={{ base: 4, md: 6 }} py={{ base: 14, md: 24 }}>
          <Grid gap={{ base: 12, lg: 20 }} templateColumns={{ base: 'minmax(0, 1fr)', lg: 'minmax(12rem, 0.34fr) minmax(0, 1fr)' }}>
            <VStack align="flex-start" gap={5}>
              <ChakraLink asChild color="var(--color-accent-deep)" fontSize="sm" fontWeight="700">
                <Link href="/">Back to Atlas Studio</Link>
              </ChakraLink>
              <Box>
                <Heading
                  as="h1"
                  color="var(--color-ink)"
                  fontFamily="var(--font-display)"
                  fontSize={{ base: 'var(--text-2xl)', md: 'var(--text-3xl)' }}
                  fontStyle="normal"
                  fontWeight="400"
                  letterSpacing="-0.04em"
                  lineHeight="1.04"
                  minW={0}
                  overflowWrap="anywhere"
                >
                  {document.title}
                </Heading>
                <Text color="var(--color-muted)" fontSize="sm" mt={4}>
                  Last updated {document.lastUpdated}
                </Text>
              </Box>
              <Text color="var(--color-muted)" lineHeight="1.75" maxW="60ch">
                {document.description}
              </Text>
            </VStack>

            <VStack align="stretch" gap={0}>
              {document.sections.map((section) => (
                <Box
                  as="section"
                  borderTop="var(--rule-hairline)"
                  id={getSectionId(section.heading)}
                  key={section.heading}
                  py={{ base: 8, md: 10 }}
                >
                  <Heading
                    as="h2"
                    color="var(--color-ink)"
                    fontFamily="var(--font-display)"
                    fontSize="var(--text-xl)"
                    fontStyle="normal"
                    fontWeight="400"
                    lineHeight="1.15"
                    minW={0}
                    overflowWrap="anywhere"
                  >
                    {section.heading}
                  </Heading>
                  <VStack align="stretch" gap={4} mt={5}>
                    {section.paragraphs.map((paragraph) => (
                      <Text color="var(--color-ink-soft)" key={paragraph} lineHeight="1.8" maxW="72ch">
                        {paragraph}
                      </Text>
                    ))}
                  </VStack>
                </Box>
              ))}
            </VStack>
          </Grid>
        </Container>
      </Box>

      <LandingFooter session={session} />
    </Box>
  );
}
