import { Box, Button, Container, Flex, Grid, Heading, Text, VStack } from '@chakra-ui/react';
import Link from 'next/link';
import { LuLanguages, LuLayers3, LuScanText } from 'react-icons/lu';
import Surface from '../ui/Surface';

const features = [
  {
    title: 'Bubble-aware OCR',
    description: 'Detect dialogue regions and turn every result into editable canvas text.',
    icon: LuScanText,
  },
  {
    title: 'Provider-ready AI',
    description: 'Choose a supported image model without locking the editor to one vendor.',
    icon: LuLanguages,
  },
  {
    title: 'Temporary by design',
    description: 'Process, refine, and download an image without creating a project or library entry.',
    icon: LuLayers3,
  },
] as const;

export default function PublicLandingContent() {
  return (
    <>
      <Box className="atlas-noise" overflow="hidden" position="relative">
        <Container maxW="var(--atlas-container)" px={{ base: 4, md: 6 }} py={{ base: 16, md: 24 }}>
          <Grid
            alignItems="center"
            gap={{ base: 10, lg: 14 }}
            templateColumns={{ base: '1fr', lg: '1.02fr 0.98fr' }}
          >
            <VStack align="flex-start" gap={6}>
              <Text
                color="var(--atlas-primary)"
                fontSize="sm"
                fontWeight="850"
                letterSpacing="0.12em"
                textTransform="uppercase"
              >
                AI comic localization platform
              </Text>
              <Heading
                as="h1"
                color="var(--atlas-foreground)"
                fontSize={{ base: '3.2rem', md: '5.6rem' }}
                fontWeight="900"
                letterSpacing="-0.07em"
                lineHeight="0.92"
                maxW="10ch"
                textWrap="balance"
              >
                Translate the page, not the workflow.
              </Heading>
              <Text
                color="var(--atlas-muted)"
                fontSize={{ base: 'md', md: 'lg' }}
                lineHeight="1.8"
                maxW="38rem"
              >
                Upload a comic page, generate translated and clean artwork, refine the lettering,
                then download the result—all from one focused editor.
              </Text>
              <Flex
                direction={{ base: 'column', sm: 'row' }}
                gap={3}
                w={{ base: 'full', sm: 'auto' }}
              >
                <Button
                  asChild
                  className="atlas-button-motion"
                  color="white"
                  colorPalette="blue"
                  size="lg"
                >
                  <Link href="/auth/register">Create an account</Link>
                </Button>
                <Button asChild className="atlas-button-motion" size="lg" variant="outline">
                  <Link href="/auth/login">Sign in to continue</Link>
                </Button>
              </Flex>
            </VStack>

            <Surface aria-label="Atlas Studio editor preview" overflow="hidden" p={3}>
              <Box
                bg="var(--atlas-surface-muted)"
                borderRadius="var(--atlas-radius-lg)"
                display="grid"
                gap={3}
                gridTemplateColumns="0.55fr 1.45fr"
                minH={{ base: '23rem', md: '31rem' }}
                p={3}
              >
                <VStack align="stretch" gap={3}>
                  {[1, 2, 3].map((page) => (
                    <Box
                      key={page}
                      bg={page === 1 ? 'var(--atlas-primary-soft)' : 'var(--atlas-surface-solid)'}
                      borderColor={page === 1 ? 'var(--atlas-primary)' : 'var(--atlas-border)'}
                      borderRadius="var(--atlas-radius-md)"
                      borderWidth="1px"
                      h="5rem"
                      p={3}
                    >
                      <Text color="var(--atlas-muted)" fontSize="xs" fontWeight="800">
                        Page {page}
                      </Text>
                    </Box>
                  ))}
                </VStack>
                <Box
                  bg="linear-gradient(145deg, #fdfefe, #dfe7ee)"
                  borderColor="var(--atlas-border)"
                  borderRadius="var(--atlas-radius-lg)"
                  borderWidth="1px"
                  overflow="hidden"
                  position="relative"
                >
                  <Box bg="rgba(23, 32, 42, 0.08)" h="38%" />
                  <Box
                    bg="white"
                    borderColor="var(--atlas-border-strong)"
                    borderRadius="999px"
                    borderWidth="1px"
                    left="12%"
                    p={3}
                    position="absolute"
                    top="18%"
                    w="42%"
                  >
                    <Text color="#17202a" fontSize="xs" fontWeight="850">
                      Original text
                    </Text>
                  </Box>
                  <Box
                    bg="white"
                    borderColor="var(--atlas-primary)"
                    borderRadius="var(--atlas-radius-md)"
                    borderWidth="2px"
                    bottom="18%"
                    p={4}
                    position="absolute"
                    right="10%"
                    w="48%"
                  >
                    <Text color="#17202a" fontSize="sm" fontWeight="850">
                      Translated bubble
                    </Text>
                    <Text color="#687382" fontSize="xs" mt={1}>
                      Editable on canvas
                    </Text>
                  </Box>
                </Box>
              </Box>
            </Surface>
          </Grid>
        </Container>
      </Box>

      <Container
        id="features"
        maxW="var(--atlas-container)"
        px={{ base: 4, md: 6 }}
        py={{ base: 10, md: 16 }}
      >
        <Grid
          gap={4}
          templateColumns={{ base: '1fr', lg: 'minmax(0, 1.15fr) minmax(18rem, 0.85fr)' }}
        >
          {features.map((feature, index) => {
            const Icon = feature.icon;

            return (
              <Surface
                key={feature.title}
                gridRow={{ lg: index === 0 ? 'span 2' : 'auto' }}
                minH={{ lg: index === 0 ? '20rem' : 'auto' }}
                p={{ base: 6, lg: index === 0 ? 9 : 6 }}
              >
                <VStack align="flex-start" gap={4} h="full" justify="center">
                  <Box
                    alignItems="center"
                    bg="var(--atlas-primary-soft)"
                    borderRadius="var(--atlas-radius-md)"
                    color="var(--atlas-primary)"
                    display="flex"
                    h="2.75rem"
                    justifyContent="center"
                    w="2.75rem"
                  >
                    <Icon size={20} />
                  </Box>
                  <Box>
                    <Heading
                      fontSize={index === 0 ? { base: 'xl', lg: '2rem' } : 'lg'}
                      letterSpacing="-0.025em"
                      mb={2}
                    >
                      {feature.title}
                    </Heading>
                    <Text color="var(--atlas-muted)" lineHeight="1.7" maxW="48ch">
                      {feature.description}
                    </Text>
                  </Box>
                </VStack>
              </Surface>
            );
          })}
        </Grid>
      </Container>
    </>
  );
}
