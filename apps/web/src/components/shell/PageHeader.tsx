import React, { type ReactNode } from 'react';
import { Box, Flex, Heading, Text, HStack, Button } from '@chakra-ui/react';
import type { ActionSlot } from '../../lib/action-slots';

interface PageHeaderProps {
  readonly title: string;
  readonly description?: string;
  readonly actions?: readonly ActionSlot[];
  readonly children?: ReactNode;
}

export default function PageHeader({ title, description, actions = [], children }: PageHeaderProps) {
  return (
    <Box pb={5} borderBottom="1px solid" borderColor="gray.100" mb={6}>
      <Flex justify="space-between" align="center" direction={{ base: 'column', sm: 'row' }} gap={4}>
        <Box>
          <Heading size="lg" fontWeight="bold" letterSpacing="tight" color="gray.800">
            {title}
          </Heading>
          {description && (
            <Text color="gray.600" fontSize="sm" mt={1}>
              {description}
            </Text>
          )}
        </Box>
        <HStack spacing={3} align="center">
          {actions.map((action) => (
            <Button
              key={action.id}
              onClick={action.onClick}
              variant={action.variant ?? 'solid'}
              colorScheme={action.colorScheme ?? 'gray'}
              isDisabled={action.disabled}
              isLoading={action.loading}
              size="sm"
            >
              {action.label}
            </Button>
          ))}
          {children}
        </HStack>
      </Flex>
    </Box>
  );
}
