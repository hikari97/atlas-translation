import { Box, Heading, Button, VStack, ButtonGroup } from '@chakra-ui/react';

export default function ImageTools() {
  return (
    <Box p={4} borderWidth={1} borderRadius="md">
      <Heading size="sm" mb={4}>Image Tools</Heading>
      <VStack gap={3}>
        <ButtonGroup attached w="full"><Button flex={1}>Brush</Button><Button flex={1}>Eraser</Button></ButtonGroup>
        <ButtonGroup attached w="full"><Button flex={1}>Mask</Button><Button flex={1}>Restore</Button></ButtonGroup>
        <ButtonGroup attached w="full"><Button flex={1}>Crop</Button><Button flex={1}>Inpaint</Button></ButtonGroup>
      </VStack>
    </Box>
  );
}
