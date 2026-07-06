import { Box, Heading, Field, Input, VStack, HStack } from '@chakra-ui/react';

export default function TypographyPanel() {
  return (
    <Box p={4} borderWidth={1} borderRadius="md">
      <Heading size="sm" mb={4}>Typography</Heading>
      <VStack gap={4}>
        <Field.Root><Field.Label>Font Size</Field.Label><Input type="number" defaultValue={16} /></Field.Root>
        <HStack gap={4} w="full">
          <Field.Root flex={1}><Field.Label>Spacing</Field.Label><Input type="number" defaultValue={0} /></Field.Root>
          <Field.Root flex={1}><Field.Label>Stroke</Field.Label><Input type="number" defaultValue={1} /></Field.Root>
        </HStack>
      </VStack>
    </Box>
  );
}
