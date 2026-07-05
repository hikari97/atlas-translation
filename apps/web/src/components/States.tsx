import React from 'react';
import { Box, Spinner, Text, VStack, Stack, Skeleton, Button, Heading } from '@chakra-ui/react';

interface LoadingSpinnerProps {
  message?: string;
}

export function LoadingSpinner({ message = 'Loading...' }: LoadingSpinnerProps) {
  return (
    <Box display="flex" alignItems="center" justifyContent="center" py={12} w="100%">
      <VStack spacing={4}>
        <Spinner size="xl" color="blue.500" thickness="4px" />
        <Text color="gray.500" fontSize="sm" fontWeight="medium">{message}</Text>
      </VStack>
    </Box>
  );
}

interface SkeletonLoaderProps {
  rows?: number;
  variant?: 'list' | 'card' | 'table';
}

export function SkeletonLoader({ rows = 3, variant = 'list' }: SkeletonLoaderProps) {
  return (
    <Stack spacing={4} w="100%" py={4}>
      {Array.from({ length: rows }).map((_, i) => (
        <Box key={i} p={4} borderWidth={1} borderRadius="md" bg="white">
          {variant === 'list' && (
            <VStack align="start" spacing={3}>
              <Skeleton h="20px" w="40%" />
              <Skeleton h="15px" w="80%" />
            </VStack>
          )}
          {variant === 'card' && (
            <VStack align="stretch" spacing={3}>
              <Skeleton h="120px" borderRadius="md" />
              <Skeleton h="20px" w="60%" />
              <Skeleton h="15px" w="40%" />
            </VStack>
          )}
          {variant === 'table' && (
            <Box display="flex" justifyContent="space-between">
              <Skeleton h="20px" w="20%" />
              <Skeleton h="20px" w="30%" />
              <Skeleton h="20px" w="15%" />
            </Box>
          )}
        </Box>
      ))}
    </Stack>
  );
}

interface EmptyStateProps {
  title: string;
  description: string;
  emoji?: string;
  actionLabel?: string;
  onAction?: () => void;
}

export function EmptyState({ title, description, emoji = '📂', actionLabel, onAction }: EmptyStateProps) {
  return (
    <Box
      p={10}
      textAlign="center"
      borderWidth="1px"
      borderStyle="dashed"
      borderRadius="lg"
      bg="gray.50"
      w="100%"
    >
      <VStack spacing={4}>
        <Text fontSize="4xl">{emoji}</Text>
        <Heading size="md" color="gray.700">{title}</Heading>
        <Text color="gray.500" maxW="sm" fontSize="sm">{description}</Text>
        {actionLabel && onAction && (
          <Button colorScheme="blue" size="sm" onClick={onAction}>
            {actionLabel}
          </Button>
        )}
      </VStack>
    </Box>
  );
}

interface UnavailableStateProps {
  title?: string;
  description?: string;
  onRetry?: () => void;
}

export function UnavailableState({
  title = 'Service Unavailable',
  description = 'Failed to load content. Please check your connection and try again.',
  onRetry,
}: UnavailableStateProps) {
  return (
    <Box p={10} textAlign="center" borderWidth={1} borderRadius="lg" bg="red.50" w="100%">
      <VStack spacing={4}>
        <Text fontSize="4xl">⚠️</Text>
        <Heading size="md" color="red.700">{title}</Heading>
        <Text color="red.600" maxW="sm" fontSize="sm">{description}</Text>
        {onRetry && (
          <Button colorScheme="red" size="sm" onClick={onRetry}>
            Retry Request
          </Button>
        )}
      </VStack>
    </Box>
  );
}
