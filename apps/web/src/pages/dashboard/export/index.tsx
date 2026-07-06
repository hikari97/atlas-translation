import { Box, Container, Heading, Text, Card, Button, HStack, VStack, Badge, Field, Input, ProgressRoot, ProgressTrack, ProgressRange } from '@chakra-ui/react';

export default function ExportPage() {
  return (
    <Container maxW="container.lg" py={6}>
      <Heading mb={2}>Export Preview</Heading>
      <Text color="gray.500" mb={6}>Preview and export your localization project</Text>
      <HStack gap={6} align="stretch">
        <Card.Root flex={1}>
          <Card.Body>
            <Heading size="sm" mb={4}>Export Settings</Heading>
            <VStack gap={4}>
              <Field.Root><Field.Label>File Name</Field.Label><Input defaultValue="project-export" /></Field.Root>
              <Button w="full" colorScheme="blue">Export Now</Button>
            </VStack>
          </Card.Body>
        </Card.Root>
        <Card.Root flex={1}>
          <Card.Body>
            <Heading size="sm" mb={4}>Progress</Heading>
            <Box mb={4}>
              <HStack justify="space-between" mb={1}><Text fontSize="sm">Processing...</Text><Text fontSize="sm">45%</Text></HStack>
              <ProgressRoot value={45} max={100}><ProgressTrack h="8px"><ProgressRange /></ProgressTrack></ProgressRoot>
            </Box>
            <HStack justify="space-between" w="full"><Text>Validation</Text><Badge colorScheme="green">Passed</Badge></HStack>
          </Card.Body>
        </Card.Root>
      </HStack>
    </Container>
  );
}
