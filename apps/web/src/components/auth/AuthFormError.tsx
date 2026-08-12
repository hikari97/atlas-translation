import { Box, HStack, Text } from '@chakra-ui/react';
import { LuCircleAlert } from 'react-icons/lu';

interface AuthFormErrorProps {
  readonly message: string;
}

/** Displays an API-level authentication error without replacing field validation. */
export default function AuthFormError({ message }: AuthFormErrorProps) {
  return (
    <Box
      bg="rgba(180, 35, 24, 0.07)"
      borderColor="rgba(180, 35, 24, 0.2)"
      borderRadius="var(--atlas-radius-sm)"
      borderWidth="1px"
      color="var(--atlas-danger)"
      p={3}
      role="alert"
    >
      <HStack align="flex-start" gap={2}>
        <Box flexShrink={0} mt="0.125rem">
          <LuCircleAlert size={16} />
        </Box>
        <Text fontSize="sm" lineHeight="1.5">
          {message}
        </Text>
      </HStack>
    </Box>
  );
}
