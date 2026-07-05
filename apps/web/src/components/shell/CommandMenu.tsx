import React, { useState } from 'react';
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  Input,
  VStack,
  Box,
  Text,
  Kbd,
  HStack,
} from '@chakra-ui/react';

interface CommandItem {
  readonly id: string;
  readonly name: string;
  readonly category: string;
  readonly shortcut?: string;
}

const commands: readonly CommandItem[] = [
  { id: 'ocr.all', name: 'Detect Text Bubbles (OCR)', category: 'Localization', shortcut: '⌥O' },
  { id: 'translate.all', name: 'Translate Comic Pages', category: 'Translation', shortcut: '⌥T' },
  { id: 'project.create', name: 'Create New Localization Project', category: 'Project' },
  { id: 'theme.toggle', name: 'Toggle Dark / Light Theme', category: 'Theme', shortcut: '⌥D' },
  { id: 'export.pdf', name: 'Export Translation to PDF', category: 'Export' },
];

interface CommandMenuProps {
  readonly isOpen: boolean;
  readonly onClose: () => void;
}

export default function CommandMenu({ isOpen, onClose }: CommandMenuProps) {
  const [search, setSearch] = useState('');

  const filtered = commands.filter((cmd) =>
    cmd.name.toLowerCase().includes(search.toLowerCase()) ||
    cmd.category.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="lg">
      <ModalOverlay />
      <ModalContent bg="white" borderRadius="lg" mt="15vh">
        <ModalHeader borderBottom="1px solid" borderColor="gray.100" py={3}>
          <HStack justify="space-between" w="100%">
            <Text fontSize="sm" fontWeight="bold" color="gray.500">Search Commands</Text>
            <HStack fontSize="xs" color="gray.400">
              <Kbd>esc</Kbd>
              <Text>to close</Text>
            </HStack>
          </HStack>
        </ModalHeader>
        <ModalBody p={0}>
          <Box p={4} borderBottom="1px solid" borderColor="gray.100">
            <Input
              autoFocus
              placeholder="Type a command or category..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              variant="unstyled"
              size="lg"
            />
          </Box>
          <VStack align="stretch" spacing={0} maxH="300px" overflowY="auto" py={2}>
            {filtered.length === 0 ? (
              <Box p={4} textAlign="center">
                <Text color="gray.400" fontSize="sm">No commands found.</Text>
              </Box>
            ) : (
              filtered.map((cmd) => (
                <Box
                  key={cmd.id}
                  px={4}
                  py={3}
                  cursor="pointer"
                  _hover={{ bg: 'blue.50', color: 'blue.600' }}
                  display="flex"
                  justifyContent="space-between"
                  alignItems="center"
                  onClick={() => {
                    alert(`Command execution triggered: ${cmd.name}`);
                    onClose();
                  }}
                >
                  <VStack align="start" spacing={0}>
                    <Text fontWeight="semibold" fontSize="sm">{cmd.name}</Text>
                    <Text fontSize="xs" color="gray.400">{cmd.category}</Text>
                  </VStack>
                  {cmd.shortcut && (
                    <Text fontSize="xs" color="gray.400" fontWeight="bold">
                      <Kbd>{cmd.shortcut}</Kbd>
                    </Text>
                  )}
                </Box>
              ))
            )}
          </VStack>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
}
