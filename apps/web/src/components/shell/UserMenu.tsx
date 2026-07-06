import { MenuRoot, MenuTrigger, MenuContent, MenuItem, IconButton } from '@chakra-ui/react';
import Link from 'next/link';

export default function UserMenu() {
  return (
    <MenuRoot>
      <MenuTrigger asChild>
        <IconButton>👤</IconButton>
      </MenuTrigger>
      <MenuContent>
        <MenuItem value="settings" asChild><Link href="/settings">Settings</Link></MenuItem>
      </MenuContent>
    </MenuRoot>
  );
}
