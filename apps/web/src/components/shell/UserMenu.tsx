import { Box, Button, MenuContent, MenuItem, MenuRoot, MenuTrigger, Text } from '@chakra-ui/react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { LuChevronDown, LuLogOut, LuUserRound } from 'react-icons/lu';
import type { AuthProfile } from '../../lib/data/authProfile';
import { queryClient } from '../../lib/data/queryClient';
import { queryKeys } from '../../lib/data/queryKeys';
import { notifyAuthSessionChanged } from '../../lib/auth/useAuthSession';
import { getProfileInitials } from '../../lib/auth/profilePresentation';

interface UserMenuProps {
  readonly logoutHref?: string;
  readonly profile?: AuthProfile;
}

export default function UserMenu({ logoutHref = '/auth/login', profile }: UserMenuProps) {
  const router = useRouter();

  const handleLogout = async () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    queryClient.removeQueries({ queryKey: queryKeys.auth.all });
    notifyAuthSessionChanged();
    await router.push(logoutHref);
  };

  return (
    <MenuRoot>
      <MenuTrigger asChild>
        <Button
          aria-label="Open user menu"
          borderRadius="var(--atlas-radius-sm)"
          className="atlas-button-motion"
          gap={2}
          h="2.65rem"
          px={2}
          variant="ghost"
        >
          <Box
            alignItems="center"
            bg="var(--atlas-primary-soft)"
            borderRadius="9px"
            color="var(--atlas-primary-strong)"
            display="flex"
            fontSize="xs"
            fontWeight="900"
            h="2rem"
            justifyContent="center"
            letterSpacing="-0.03em"
            w="2rem"
          >
            {getProfileInitials(profile?.name || 'Atlas Studio')}
          </Box>
          <Text
            color="var(--atlas-foreground)"
            display={{ base: 'none', md: 'block' }}
            fontSize="sm"
            fontWeight="800"
            maxW="9rem"
            truncate
          >
            {profile?.name || 'My account'}
          </Text>
          <LuChevronDown size={15} />
        </Button>
      </MenuTrigger>
      <MenuContent>
        <MenuItem asChild value="profile">
          <Link href="/dashboard">
            <LuUserRound /> Profile
          </Link>
        </MenuItem>
        <MenuItem color="var(--atlas-danger)" onClick={() => void handleLogout()} value="logout">
          <LuLogOut /> Sign out
        </MenuItem>
      </MenuContent>
    </MenuRoot>
  );
}
