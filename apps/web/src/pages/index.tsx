import { Box, Text } from '@chakra-ui/react';
import AuthenticatedHomeContent from '../components/home/AuthenticatedHomeContent';
import HomeNavbar from '../components/home/HomeNavbar';
import PublicLandingContent from '../components/home/PublicLandingContent';
import { useAuthSession } from '../lib/auth/useAuthSession';

export default function HomePage() {
  const session = useAuthSession();
  const isAuthenticated = session.status === 'authenticated';

  return (
    <Box minH="100dvh">
      <a className="skip-link" href="#main-content">
        Skip to content
      </a>
      <HomeNavbar session={session} />

      <Box as="main" id="main-content">
        {session.status !== 'authenticated' && <PublicLandingContent />}
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
