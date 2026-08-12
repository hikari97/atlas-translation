import type { AuthSession } from '../../lib/auth/useAuthSession';
import LandingHero from './LandingHero';
import LandingPrivacyStatement from './LandingPrivacyStatement';
import LandingWorkbench from './LandingWorkbench';

interface PublicLandingContentProps {
  readonly session: AuthSession;
}

export default function PublicLandingContent({ session }: PublicLandingContentProps) {
  return (
    <>
      <LandingHero session={session} />
      <LandingWorkbench />
      <LandingPrivacyStatement session={session} />
    </>
  );
}
