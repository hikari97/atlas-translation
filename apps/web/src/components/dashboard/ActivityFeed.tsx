import { Box, Heading, Text, Flex, Circle } from '@chakra-ui/react';

const activities = [
  { id: '1', user: 'H.Makki', action: 'updated bubbles on', target: 'Ch 1', time: '10m ago', color: 'blue' },
  { id: '2', user: 'AI', action: 'translated page 3 of', target: 'Ch 1000', time: '1h ago', color: 'green' },
];

export default function ActivityFeed() {
  return (
    <Box p={5} borderWidth={1} borderRadius="md">
      <Heading size="sm" mb={4}>Activity Feed</Heading>
      {activities.map((a) => (
        <Flex key={a.id} gap={3} mb={3}>
          <Circle size="8px" bg={`${a.color}.500`} />
          <Box><Text fontSize="sm"><strong>{a.user}</strong> {a.action} <em>{a.target}</em></Text><Text fontSize="xs" color="gray.400">{a.time}</Text></Box>
        </Flex>
      ))}
    </Box>
  );
}
