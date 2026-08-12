import { Box, Button, Container, Flex, Grid, Heading, HStack, Text, VStack } from '@chakra-ui/react';
import Link from 'next/link';
import { LuArrowRight, LuBadgeCheck, LuClock3, LuLockKeyhole } from 'react-icons/lu';
import CreditBalanceCard from '../dashboard/CreditBalanceCard';
import ImageEditorLaunchCard from '../dashboard/ImageEditorLaunchCard';
import ProfileOverviewCard from '../dashboard/ProfileOverviewCard';
import Surface from '../ui/Surface';
import type { AuthProfile } from '../../lib/data/authProfile';
import { getProfileFirstName } from '../../lib/auth/profilePresentation';

interface AuthenticatedHomeContentProps {
  readonly profile: AuthProfile | undefined;
}

export default function AuthenticatedHomeContent({ profile }: AuthenticatedHomeContentProps) {
  const firstName = getProfileFirstName(profile?.name);

  return (
    <Container maxW="var(--atlas-container)" px={{ base: 4, md: 6 }} py={{ base: 12, md: 18 }}>
      <VStack align="stretch" gap={{ base: 12, md: 16 }}>
        <Grid
          alignItems="center"
          gap={{ base: 8, lg: 12 }}
          templateColumns={{ base: '1fr', lg: 'minmax(0, 1.18fr) minmax(20rem, 0.72fr)' }}
        >
          <VStack align="flex-start" gap={6}>
            <HStack color="var(--atlas-primary-strong)" gap={2}>
              <LuBadgeCheck size={17} />
              <Text fontSize="sm" fontWeight="800">
                Signed-in workspace
              </Text>
            </HStack>
            <Box>
              <Heading
                as="h1"
                color="var(--atlas-foreground)"
                fontSize={{ base: '3rem', md: '5rem' }}
                fontWeight="900"
                letterSpacing="-0.07em"
                lineHeight="0.93"
                maxW="11ch"
                textWrap="balance"
              >
                Welcome back, {firstName}.
              </Heading>
              <Text
                color="var(--atlas-muted)"
                fontSize={{ base: 'md', md: 'lg' }}
                lineHeight="1.8"
                maxW="38rem"
                mt={5}
              >
                Start a fresh image session or review your account overview. No project setup is
                required, and generated files stay temporary until you download them.
              </Text>
            </Box>
            <Flex direction={{ base: 'column', sm: 'row' }} gap={3} w={{ base: 'full', sm: 'auto' }}>
              <Button
                asChild
                className="atlas-button-motion"
                color="white"
                colorPalette="blue"
                size="lg"
              >
                <Link href="/dashboard/images">
                  Open image editor <LuArrowRight />
                </Link>
              </Button>
              <Button asChild className="atlas-button-motion" size="lg" variant="outline">
                <Link href="/dashboard">View dashboard</Link>
              </Button>
            </Flex>
          </VStack>

          <Surface overflow="hidden" p={{ base: 6, md: 7 }}>
            <HStack align="flex-start" justify="space-between">
              <Box>
                <Text color="var(--atlas-muted)" fontSize="sm" fontWeight="750">
                  Current session
                </Text>
                <Text fontSize="xl" fontWeight="880" letterSpacing="-0.03em" mt={1}>
                  Ready when you are
                </Text>
              </Box>
              <Box
                bg="var(--atlas-primary-soft)"
                borderRadius="10px"
                color="var(--atlas-primary-strong)"
                px={2.5}
                py={1.5}
              >
                <Text fontSize="xs" fontWeight="850">
                  Active
                </Text>
              </Box>
            </HStack>

            <VStack align="stretch" gap={4} mt={8}>
              <HStack
                bg="var(--atlas-surface-muted)"
                borderRadius="var(--atlas-radius-md)"
                gap={3}
                p={4}
              >
                <Box color="var(--atlas-primary)">
                  <LuClock3 size={20} />
                </Box>
                <Box>
                  <Text fontSize="sm" fontWeight="820">
                    New editor session
                  </Text>
                  <Text color="var(--atlas-muted)" fontSize="xs" mt={0.5}>
                    Upload, translate, refine, download
                  </Text>
                </Box>
              </HStack>
              <HStack
                bg="var(--atlas-surface-muted)"
                borderRadius="var(--atlas-radius-md)"
                gap={3}
                p={4}
              >
                <Box color="var(--atlas-primary)">
                  <LuLockKeyhole size={20} />
                </Box>
                <Box>
                  <Text fontSize="sm" fontWeight="820">
                    Stateless processing
                  </Text>
                  <Text color="var(--atlas-muted)" fontSize="xs" mt={0.5}>
                    No image or project result is persisted
                  </Text>
                </Box>
              </HStack>
            </VStack>
          </Surface>
        </Grid>

        <Box as="section">
          <Flex align={{ base: 'flex-start', md: 'flex-end' }} direction={{ base: 'column', md: 'row' }} gap={3} justify="space-between" mb={6}>
            <Box>
              <Text color="var(--atlas-primary)" fontSize="sm" fontWeight="800">
                Quick access
              </Text>
              <Heading fontSize={{ base: '2rem', md: '2.75rem' }} letterSpacing="-0.055em" mt={2}>
                Your workspace at a glance.
              </Heading>
            </Box>
            <Text color="var(--atlas-muted)" fontSize="sm">
              Account data is refreshed from your authenticated profile.
            </Text>
          </Flex>
          <Grid
            alignItems="start"
            gap={{ base: 5, lg: 6 }}
            templateColumns={{ base: '1fr', lg: 'minmax(0, 1.4fr) minmax(19rem, 0.72fr)' }}
          >
            <ImageEditorLaunchCard />
            <VStack align="stretch" gap={{ base: 5, lg: 6 }}>
              <CreditBalanceCard />
              <ProfileOverviewCard isLoading={!profile} profile={profile} />
            </VStack>
          </Grid>
        </Box>
      </VStack>
    </Container>
  );
}
