import { Box, Text } from '@chakra-ui/react';
import Head from 'next/head';
import AuthenticatedHomeContent from '../components/home/AuthenticatedHomeContent';
import HomeLoadingState from '../components/home/HomeLoadingState';
import HomeNavbar from '../components/home/HomeNavbar';
import PublicLandingContent from '../components/home/PublicLandingContent';
import { useAuthSession } from '../lib/auth/useAuthSession';

export default function HomePage() {
  const session = useAuthSession();
  const isAuthenticated = session.status === 'authenticated';

  return (
    <Box minH="100dvh">
      <Head>
        <title>{isAuthenticated ? 'Home · Atlas Studio' : 'Atlas Studio · AI comic localization'}</title>
        <meta
          content="Translate comic and manga images, generate clean artwork, edit text, and download the result from one focused workspace."
          name="description"
        />
      </Head>

      <a className="skip-link" href="#main-content">
        Skip to content
      </a>
      <HomeNavbar session={session} />

      <Box as="main" id="main-content">
        {session.status === 'checking' && <HomeLoadingState />}
        {session.status === 'anonymous' && <PublicLandingContent />}
        {isAuthenticated && <AuthenticatedHomeContent profile={session.profile} />}
      </Box>

      <Box
        as="footer"
        borderTopWidth="1px"
        borderColor="var(--atlas-border)"
        color="var(--atlas-muted)"
        py={8}
        textAlign="center"
      >
        <Text fontSize="sm">
          {isAuthenticated
            ? 'Atlas Studio workspace · Images remain temporary until downloaded.'
            : '2026 Atlas Studio. Built for focused comic localization.'}
        </Text>
      </Box>
    </Box>
  );
}
