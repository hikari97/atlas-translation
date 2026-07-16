import { Button, ButtonGroup, Heading, VStack } from '@chakra-ui/react';
import Surface from '../ui/Surface';

export default function ImageTools() {
  return (
    <Surface p={4}>
      <Heading fontSize="sm" letterSpacing="-0.01em" mb={4}>
        Image tools
      </Heading>
      <VStack gap={3}>
        <ButtonGroup attached size="sm" w="full">
          <Button flex={1} variant="outline">Brush</Button>
          <Button flex={1} variant="outline">Eraser</Button>
        </ButtonGroup>
        <ButtonGroup attached size="sm" w="full">
          <Button flex={1} variant="outline">Mask</Button>
          <Button flex={1} variant="outline">Restore</Button>
        </ButtonGroup>
        <ButtonGroup attached size="sm" w="full">
          <Button flex={1} variant="outline">Crop</Button>
          <Button flex={1} variant="outline">Inpaint</Button>
        </ButtonGroup>
      </VStack>
    </Surface>
  );
}
