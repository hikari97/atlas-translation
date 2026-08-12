import { Box, Container, Grid, Heading, HStack, Text } from '@chakra-ui/react';
import { LuDownload, LuLanguages, LuScanText, LuWandSparkles } from 'react-icons/lu';

const workflow = [
  {
    title: 'Read the page',
    description: 'Bubble-aware detection locates dialogue and preserves the position of each text region.',
    icon: LuScanText,
  },
  {
    title: 'Rebuild the artwork',
    description: 'The selected image model removes translated text areas and returns a clean inpainted image.',
    icon: LuWandSparkles,
  },
  {
    title: 'Set every line',
    description: 'Edit translation, alignment, font, colour, border, and placement directly on the canvas.',
    icon: LuLanguages,
  },
  {
    title: 'Download the result',
    description: 'Export the finished page to your device without creating a project or permanent image record.',
    icon: LuDownload,
  },
] as const;

const models = ['Gemini image', 'OpenAI image', 'Grok image'] as const;

export default function LandingWorkbench() {
  return (
    <>
      <Box as="section" borderTop="var(--rule-hairline)" id="workflow" py={{ base: 20, md: 28 }}>
        <Container maxW="var(--atlas-container)" px={{ base: 4, md: 6 }}>
          <Grid
            gap={{ base: 12, lg: 20 }}
            templateColumns={{ base: 'minmax(0, 1fr)', lg: 'minmax(16rem, 0.65fr) minmax(0, 1.35fr)' }}
          >
            <Box>
              <Heading
                as="h2"
                color="var(--color-ink)"
                fontFamily="var(--font-display)"
                fontSize={{ base: 'var(--text-2xl)', md: 'var(--text-3xl)' }}
                fontStyle="normal"
                fontWeight="400"
                letterSpacing="-0.035em"
                lineHeight="1.05"
                maxW="12ch"
              >
                One page in. One finished page out.
              </Heading>
              <Text color="var(--color-muted)" lineHeight="1.75" maxW="56ch" mt={6}>
                Atlas keeps the technical work visible and editable. You remain in control from detection to final lettering.
              </Text>
            </Box>

            <Box as="ol" borderTop="var(--rule-hairline)" listStyleType="none" m={0} p={0}>
              {workflow.map((step, index) => {
                const Icon = step.icon;

                return (
                  <Grid
                    alignItems="start"
                    as="li"
                    borderBottom="var(--rule-hairline)"
                    gap={{ base: 4, md: 7 }}
                    key={step.title}
                    py={{ base: 6, md: 8 }}
                    templateColumns={{ base: '2.5rem minmax(0, 1fr)', md: '3.5rem minmax(10rem, 0.7fr) minmax(0, 1.3fr)' }}
                  >
                    <Text color="var(--color-accent-deep)" fontSize="sm" fontVariantNumeric="tabular-nums" pt={1}>
                      {String(index + 1).padStart(2, '0')}
                    </Text>
                    <HStack align="flex-start" color="var(--color-ink)" gap={3}>
                      <Box color="var(--color-accent-deep)" flexShrink={0} mt={1}>
                        <Icon size={18} />
                      </Box>
                      <Heading as="h3" fontFamily="var(--font-display)" fontSize="var(--text-lg)" fontStyle="normal" fontWeight="400" lineHeight="1.15">
                        {step.title}
                      </Heading>
                    </HStack>
                    <Text color="var(--color-muted)" gridColumn={{ base: '2', md: 'auto' }} lineHeight="1.7" maxW="68ch">
                      {step.description}
                    </Text>
                  </Grid>
                );
              })}
            </Box>
          </Grid>
        </Container>
      </Box>

      <Box as="section" bg="var(--color-ink)" color="var(--color-accent-ink)" py={{ base: 16, md: 20 }}>
        <Container maxW="var(--atlas-container)" px={{ base: 4, md: 6 }}>
          <Grid
            alignItems="end"
            gap={{ base: 10, lg: 16 }}
            templateColumns={{ base: 'minmax(0, 1fr)', lg: 'minmax(0, 1.3fr) minmax(18rem, 0.7fr)' }}
          >
            <Heading
              as="h2"
              fontFamily="var(--font-display)"
              fontSize={{ base: 'var(--text-2xl)', md: 'var(--text-3xl)' }}
              fontStyle="normal"
              fontWeight="400"
              letterSpacing="-0.035em"
              lineHeight="1.05"
              maxW="17ch"
            >
              Choose the image intelligence that suits the page.
            </Heading>
            <Text color="var(--color-rule)" lineHeight="1.7" maxW="56ch">
              Gemini can run through the configured direct provider. OpenAI and Grok image models are available through the provider interface.
            </Text>
          </Grid>
          <Grid
            borderBottom="var(--rule-dark)"
            borderTop="var(--rule-dark)"
            gap={0}
            mt={{ base: 10, md: 14 }}
            templateColumns={{ base: 'minmax(0, 1fr)', md: 'repeat(3, minmax(0, 1fr))' }}
          >
            {models.map((model) => (
              <Box
                borderBottom={{ base: 'var(--rule-dark)', md: 'none' }}
                borderRight={{ base: 'none', md: 'var(--rule-dark)' }}
                key={model}
                py={6}
                px={{ base: 0, md: 6 }}
                _last={{ borderBottom: 'none', borderRight: 'none' }}
              >
                <Text fontFamily="var(--font-display)" fontSize="var(--text-md)">
                  {model}
                </Text>
              </Box>
            ))}
          </Grid>
        </Container>
      </Box>
    </>
  );
}
