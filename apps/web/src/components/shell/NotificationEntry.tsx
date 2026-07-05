import React, { useState } from 'react';
import {
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  IconButton,
  Box,
  Text,
  VStack,
  MenuDivider,
  HStack,
  Circle,
} from '@chakra-ui/react';

interface NotificationItem {
  readonly id: string;
  readonly message: string;
  readonly timestamp: string;
  readonly unread: boolean;
}

const mockNotifications: readonly NotificationItem[] = [
  { id: '1', message: 'OCR text bubble detection on page 1 complete.', timestamp: '5m ago', unread: true },
  { id: '2', message: 'Translation of page 2 ready for typesetting review.', timestamp: '1h ago', unread: true },
  { id: '3', message: 'Project "Demon Slayer Ch 1" exported to PDF.', timestamp: '2h ago', unread: false },
];

export default function NotificationEntry() {
  const [list, setList] = useState<readonly NotificationItem[]>(mockNotifications);
  const unreadCount = list.filter((n) => n.unread).length;

  const markAllRead = () => {
    setList(list.map((n) => ({ ...n, unread: false })));
  };

  return (
    <Menu>
      <MenuButton
        as={IconButton}
        variant="ghost"
        aria-label="View Notifications"
        icon={
          <Box position="relative">
            <span>🔔</span>
            {unreadCount > 0 && (
              <Circle
                size="16px"
                bg="red.500"
                color="white"
                fontSize="9px"
                fontWeight="bold"
                position="absolute"
                top="-6px"
                right="-6px"
                display="flex"
                alignItems="center"
                justifyContent="center"
              >
                {unreadCount}
              </Circle>
            )}
          </Box>
        }
      />
      <MenuList minW="280px" zIndex={11}>
        <Box px={4} py={2}>
          <HStack justify="space-between">
            <Text fontWeight="bold" fontSize="sm">Notifications</Text>
            {unreadCount > 0 && (
              <Text fontSize="xs" color="blue.500" cursor="pointer" onClick={markAllRead}>
                Mark all as read
              </Text>
            )}
          </HStack>
        </Box>
        <MenuDivider />
        <VStack align="stretch" spacing={0} maxH="250px" overflowY="auto">
          {list.length === 0 ? (
            <Box p={4} textAlign="center">
              <Text color="gray.400" fontSize="sm">No notifications.</Text>
            </Box>
          ) : (
            list.map((n) => (
              <MenuItem key={n.id}>
                <VStack align="start" spacing={1} w="100%">
                  <HStack justify="space-between" w="100%">
                    <Box w="8px" h="8px" borderRadius="full" bg={n.unread ? 'blue.500' : 'transparent'} />
                    <Text fontSize="10px" color="gray.400">{n.timestamp}</Text>
                  </HStack>
                  <Text fontSize="xs" noOfLines={2} color={n.unread ? 'gray.800' : 'gray.500'}>
                    {n.message}
                  </Text>
                </VStack>
              </MenuItem>
            ))
          )}
        </VStack>
      </MenuList>
    </Menu>
  );
}
