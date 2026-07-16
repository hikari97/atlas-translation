import { Box, Circle, Flex, Heading, Text, VStack } from '@chakra-ui/react';
import Surface from '../ui/Surface';

const activities = [
  { id: '1', user: 'H.Makki', action: 'updated bubbles on', target: 'Ch 1', time: '10m ago' },
  { id: '2', user: 'AI', action: 'translated page 3 of', target: 'Ch 1000', time: '1h ago' },
];

export default function ActivityFeed() {
  return (
    <Surface p={5}>
      <Heading fontSize="md" letterSpacing="-0.01em" mb={4}>
        Activity feed
      </Heading>
      <VStack align="stretch" gap={4}>
        {activities.map((activity) => (
          <Flex key={activity.id} align="flex-start" gap={3}>
            <Circle bg="var(--atlas-primary)" flexShrink={0} mt={1.5} size="8px" />
            <Box minW={0}>
              <Text color="var(--atlas-foreground)" fontSize="sm" lineHeight="1.55">
                <Text as="span" fontWeight="800">
                  {activity.user}
                </Text>{' '}
                {activity.action}{' '}
                <Text as="span" color="var(--atlas-primary)" fontWeight="750">
                  {activity.target}
                </Text>
              </Text>
              <Text color="var(--atlas-subtle)" fontSize="xs" mt={0.5}>
                {activity.time}
              </Text>
            </Box>
          </Flex>
        ))}
      </VStack>
    </Surface>
  );
}
