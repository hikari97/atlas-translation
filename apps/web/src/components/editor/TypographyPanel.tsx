import { Field, Heading, HStack, Input, VStack } from '@chakra-ui/react';
import Surface from '../ui/Surface';

export default function TypographyPanel() {
  return (
    <Surface p={4}>
      <Heading fontSize="sm" letterSpacing="-0.01em" mb={4}>
        Typography
      </Heading>
      <VStack gap={4}>
        <Field.Root>
          <Field.Label>Font size</Field.Label>
          <Input borderRadius="var(--atlas-radius-sm)" defaultValue={16} type="number" />
        </Field.Root>
        <HStack gap={4} w="full">
          <Field.Root flex={1}>
            <Field.Label>Spacing</Field.Label>
            <Input borderRadius="var(--atlas-radius-sm)" defaultValue={0} type="number" />
          </Field.Root>
          <Field.Root flex={1}>
            <Field.Label>Stroke</Field.Label>
            <Input borderRadius="var(--atlas-radius-sm)" defaultValue={1} type="number" />
          </Field.Root>
        </HStack>
      </VStack>
    </Surface>
  );
}
