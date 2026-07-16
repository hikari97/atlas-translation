import { IconButton, MenuContent, MenuItem, MenuRoot, MenuTrigger } from '@chakra-ui/react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { LuLogOut, LuUserRound } from 'react-icons/lu';

export default function UserMenu() {
  const router = useRouter();

  const handleLogout = async () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    await router.push('/auth/login');
  };

  return (
    <MenuRoot>
      <MenuTrigger asChild>
        <IconButton
          aria-label="Open user menu"
          borderRadius="var(--atlas-radius-sm)"
          className="atlas-button-motion"
          variant="ghost"
        >
          <LuUserRound />
        </IconButton>
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
