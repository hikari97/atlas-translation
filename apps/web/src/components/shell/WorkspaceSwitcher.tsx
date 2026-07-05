import React, { useState } from 'react';
import {
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Button,
  Text,
  VStack,
  useColorMode,
} from '@chakra-ui/react';

interface Workspace {
  readonly id: string;
  readonly name: string;
  readonly role: string;
}

const mockWorkspaces: readonly Workspace[] = [
  { id: '1', name: 'Personal Workspace', role: 'Owner' },
  { id: '2', name: 'Manga Translation Team', role: 'Editor' },
  { id: '3', name: 'Professional Publisher', role: 'Viewer' },
];

export default function WorkspaceSwitcher() {
  const { colorMode } = useColorMode();
  const [activeWorkspace, setActiveWorkspace] = useState<Workspace>(mockWorkspaces[0]!);

  return (
    <Menu>
      <MenuButton
        as={Button}
        size="sm"
        variant="outline"
        rightIcon={<span>▼</span>}
        borderColor={colorMode === 'light' ? 'gray.200' : 'gray.600'}
        textAlign="left"
        px={3}
      >
        <VStack align="start" spacing={0}>
          <Text fontSize="xs" fontWeight="bold" color="gray.500" textTransform="uppercase">
            Workspace
          </Text>
          <Text fontSize="sm" noOfLines={1} maxW="150px">
            {activeWorkspace.name}
          </Text>
        </VStack>
      </MenuButton>
      <MenuList>
        {mockWorkspaces.map((workspace) => (
          <MenuItem
            key={workspace.id}
            onClick={() => setActiveWorkspace(workspace)}
            fontWeight={workspace.id === activeWorkspace.id ? 'bold' : 'normal'}
          >
            <VStack align="start" spacing={0} w="100%">
              <Text fontSize="sm">{workspace.name}</Text>
              <Text fontSize="xs" color="gray.400">{workspace.role}</Text>
            </VStack>
          </MenuItem>
        ))}
      </MenuList>
    </Menu>
  );
}
