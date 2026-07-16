import { useEffect } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { Box, Button, Flex, Grid, Heading, HStack, Text, VStack } from '@chakra-ui/react';
import { LuArrowRight, LuLockKeyhole, LuSparkles } from 'react-icons/lu';
import CreditBalanceCard from '../../components/dashboard/CreditBalanceCard';
import ImageEditorLaunchCard from '../../components/dashboard/ImageEditorLaunchCard';
import ProfileOverviewCard from '../../components/dashboard/ProfileOverviewCard';
import Surface from '../../components/ui/Surface';
import { useAuthProfileQuery } from '../../lib/data/authProfile';

export default function DashboardPage() {
  const router = useRouter();
  const profileQuery = useAuthProfileQuery();
  const profile = profileQuery.data;
  const firstName = profile?.name.split(/\s+/)[0] || 'there';

  useEffect(() => {
    if (router.isReady && !localStorage.getItem('token')) {
      void router.replace('/auth/login');
    }
  }, [router]);

  return (
    <>
      <Head>
        <title>Dashboard · Atlas Studio</title>
        <meta
          content="View your Atlas Studio profile, credit balance, and available comic localization tools."
          name="description"
        />
      </Head>

      <VStack align="stretch" gap={{ base: 7, md: 9 }}>
        <Flex
          align={{ base: 'flex-start', md: 'flex-end' }}
          direction={{ base: 'column', md: 'row' }}
          gap={5}
          justify="space-between"
        >
          <Box maxW="44rem">
            <HStack color="var(--atlas-primary)" gap={2} mb={3}>
              <LuSparkles size={16} />
              <Text fontSize="sm" fontWeight="800">
                Atlas workspace
              </Text>
            </HStack>
            <Heading
              as="h1"
              color="var(--atlas-foreground)"
              fontSize={{ base: '2.4rem', md: '3.75rem' }}
              fontWeight="880"
              letterSpacing="-0.06em"
              lineHeight="0.96"
              textWrap="balance"
            >
              Good to see you, {firstName}.
            </Heading>
            <Text
              color="var(--atlas-muted)"
              fontSize={{ base: 'sm', md: 'md' }}
              lineHeight="1.75"
              maxW="58ch"
              mt={4}
            >
              Manage your account and open the tools you need. Your image sessions stay temporary and are ready to download from the editor.
            </Text>
          </Box>
          <Button
            asChild
            className="atlas-button-motion"
            color="white"
            colorPalette="blue"
            flexShrink={0}
            size="lg"
          >
            <Link href="/dashboard/images">
              Open image editor <LuArrowRight />
            </Link>
          </Button>
        </Flex>

        {profileQuery.error && (
          <Surface
            borderColor="rgba(180, 35, 24, 0.24)"
            color="var(--atlas-danger)"
            p={4}
          >
            <Text fontSize="sm">
              {(profileQuery.error as Error).message} Sign in again if your session has expired.
            </Text>
          </Surface>
        )}

        <Grid
          alignItems="start"
          gap={{ base: 5, lg: 6 }}
          templateColumns={{ base: '1fr', lg: 'minmax(0, 1.4fr) minmax(19rem, 0.72fr)' }}
        >
          <ImageEditorLaunchCard />
          <VStack align="stretch" gap={{ base: 5, lg: 6 }}>
            <CreditBalanceCard />
            <ProfileOverviewCard
              isLoading={!profile}
              profile={profile}
            />
          </VStack>
        </Grid>

        <Surface
          as="section"
          display="grid"
          gap={5}
          gridTemplateColumns={{ base: 'auto 1fr', md: 'auto 1fr auto' }}
          p={{ base: 5, md: 6 }}
        >
          <Box
            alignItems="center"
            bg="var(--atlas-primary-soft)"
            borderRadius="var(--atlas-radius-md)"
            color="var(--atlas-primary-strong)"
            display="flex"
            h="3rem"
            justifyContent="center"
            w="3rem"
          >
            <LuLockKeyhole size={20} />
          </Box>
          <Box alignSelf="center">
            <Text color="var(--atlas-foreground)" fontWeight="850">
              Stateless by default
            </Text>
            <Text color="var(--atlas-muted)" fontSize="sm" lineHeight="1.65" mt={1}>
              Uploaded and generated images are not added to a project or library. Download the result before closing the editor.
            </Text>
          </Box>
          <Button
            alignSelf="center"
            asChild
            className="atlas-button-motion"
            gridColumn={{ base: '1 / -1', md: 'auto' }}
            variant="outline"
          >
            <Link href="/dashboard/images">Start a session</Link>
          </Button>
        </Surface>
      </VStack>
    </>
  );
}
