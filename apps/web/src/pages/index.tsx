import { Box } from '@chakra-ui/react';
import HomeNavbar from '../components/home/HomeNavbar';
import LandingFooter from '../components/home/LandingFooter';
import PublicLandingContent from '../components/home/PublicLandingContent';
import { useAuthSession } from '../lib/auth/useAuthSession';

export default function HomePage() {
  const session = useAuthSession();

  return (
    <Box bg="var(--color-paper)" className="landing-page" minH="100dvh">
      <a className="skip-link" href="#main-content">
        Skip to content
      </a>
      <HomeNavbar session={session} />

      <Box as="main" id="main-content">
        <PublicLandingContent session={session} />
      </Box>
      <LandingFooter session={session} />
    </Box>
  );
}
