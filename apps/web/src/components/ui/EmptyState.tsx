import { Box, Heading, Text, VStack } from '@chakra-ui/react';
import type { ReactNode } from 'react';
import { LuInbox } from 'react-icons/lu';
import Surface from './Surface';

interface EmptyStateProps {
  readonly title: string;
  readonly description: string;
  readonly action?: ReactNode;
}

export default function EmptyState({ title, description, action }: EmptyStateProps) {
  return (
    <Surface p={{ base: 6, md: 8 }} textAlign="center">
      <VStack gap={4}>
        <Box
          alignItems="center"
          bg="var(--atlas-primary-soft)"
          borderRadius="var(--atlas-radius-md)"
          color="var(--atlas-primary)"
          display="inline-flex"
          h="3rem"
          justifyContent="center"
          w="3rem"
        >
          <LuInbox size={22} />
        </Box>
        <VStack gap={1}>
          <Heading fontSize="lg" letterSpacing="-0.01em">
            {title}
          </Heading>
          <Text color="var(--atlas-muted)" lineHeight="1.7" maxW="32rem">
            {description}
          </Text>
        </VStack>
        {action && <Box>{action}</Box>}
      </VStack>
    </Surface>
  );
}
