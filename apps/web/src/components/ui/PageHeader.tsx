import { Box, Flex, Heading, Text, VStack } from '@chakra-ui/react';
import type { ReactNode } from 'react';

interface PageHeaderProps {
  readonly eyebrow?: string;
  readonly title: string;
  readonly description?: string;
  readonly action?: ReactNode;
}

export default function PageHeader({
  eyebrow,
  title,
  description,
  action,
}: PageHeaderProps) {
  return (
    <Flex
      align={{ base: 'flex-start', md: 'center' }}
      direction={{ base: 'column', md: 'row' }}
      gap={4}
      justify="space-between"
      mb={{ base: 6, md: 8 }}
    >
      <VStack align="flex-start" gap={2} maxW="42rem">
        {eyebrow && (
          <Text
            color="var(--atlas-primary)"
            fontSize="xs"
            fontWeight="800"
            letterSpacing="0.12em"
            textTransform="uppercase"
          >
            {eyebrow}
          </Text>
        )}
        <Heading
          as="h1"
          color="var(--atlas-foreground)"
          fontSize={{ base: '2rem', md: '2.7rem' }}
          fontWeight="800"
          letterSpacing="-0.035em"
          lineHeight="1"
          textWrap="balance"
        >
          {title}
        </Heading>
        {description && (
          <Text
            color="var(--atlas-muted)"
            fontSize={{ base: 'sm', md: 'md' }}
            lineHeight="1.7"
            maxW="52ch"
          >
            {description}
          </Text>
        )}
      </VStack>
      {action && <Box flexShrink={0}>{action}</Box>}
    </Flex>
  );
}
