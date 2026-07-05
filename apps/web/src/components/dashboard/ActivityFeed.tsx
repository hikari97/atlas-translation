import React from 'react';
import { Box, VStack, Text, Heading, HStack, Circle } from '@chakra-ui/react';

interface ActivityItem {
  readonly id: string;
  readonly user: string;
  readonly action: string;
  readonly target: string;
  readonly timestamp: string;
  readonly color: string;
}

const mockActivities: readonly ActivityItem[] = [
  { id: '1', user: 'H.Makki', action: 'updated speech bubbles on', target: 'Demon Slayer Ch 1', timestamp: '10m ago', color: 'blue.500' },
  { id: '2', user: 'AI Worker', action: 'translated page 3 of', target: 'One Piece Ch 1000', timestamp: '1h ago', color: 'green.500' },
  { id: '3', user: 'Editor Team', action: 'approved typesetting layout on', target: 'Attack on Titan Ch 139', timestamp: '3h ago', color: 'orange.500' },
];

export default function ActivityFeed() {
  return (
    <Box p={5} borderWidth={1} borderRadius="lg" bg="white" boxShadow="sm">
      <Heading size="xs" textTransform="uppercase" color="gray.500" mb={4}>
        Activity Feed
      </Heading>
      <VStack align="stretch" spacing={4}>
        {mockActivities.map((activity) => (
          <HStack key={activity.id} spacing={3} align="start">
            <Circle size="8px" bg={activity.color} mt={1.5} />
            <VStack align="start" spacing={0} flex="1">
              <Text fontSize="sm" color="gray.700">
                <Text as="span" fontWeight="bold">{activity.user}</Text>{' '}
                {activity.action}{' '}
                <Text as="span" fontWeight="semibold" color="blue.600">{activity.target}</Text>
              </Text>
              <Text fontSize="xs" color="gray.400">{activity.timestamp}</Text>
            </VStack>
          </HStack>
        ))}
      </VStack>
    </Box>
  );
}
