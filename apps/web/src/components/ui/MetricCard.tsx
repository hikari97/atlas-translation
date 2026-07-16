import { HStack, Text, VStack } from '@chakra-ui/react';
import type { ReactNode } from 'react';
import Surface from './Surface';

interface MetricCardProps {
  readonly label: string;
  readonly value: string;
  readonly helper?: string;
  readonly icon?: ReactNode;
}

export default function MetricCard({ label, value, helper, icon }: MetricCardProps) {
  return (
    <Surface p={5}>
      <HStack align="flex-start" justify="space-between">
        <VStack align="flex-start" gap={2}>
          <Text
            color="var(--atlas-muted)"
            fontSize="xs"
            fontWeight="800"
            letterSpacing="0.1em"
            textTransform="uppercase"
          >
            {label}
          </Text>
          <Text
            color="var(--atlas-foreground)"
            fontSize={{ base: '2rem', md: '2.35rem' }}
            fontVariantNumeric="tabular-nums"
            fontWeight="800"
            letterSpacing="-0.045em"
            lineHeight="1"
          >
            {value}
          </Text>
          {helper && (
            <Text color="var(--atlas-muted)" fontSize="sm">
              {helper}
            </Text>
          )}
        </VStack>
        {icon && (
          <HStack
            align="center"
            bg="var(--atlas-primary-soft)"
            borderRadius="var(--atlas-radius-md)"
            color="var(--atlas-primary)"
            h="2.5rem"
            justify="center"
            w="2.5rem"
          >
            {icon}
          </HStack>
        )}
      </HStack>
    </Surface>
  );
}
