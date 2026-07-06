import { Box, Container, Heading, Text, Grid, Card, Field, Textarea, Button, Badge, HStack, VStack } from '@chakra-ui/react';

const bubbles = [
  { id: '1', original: '俺が退治してやる！', translated: 'I will destroy them!', status: 'review', confidence: 92 },
  { id: '2', original: '待ってくれ！', translated: 'Wait for me!', status: 'approved', confidence: 88 },
];

export default function TranslationWorkbenchPage() {
  return (
    <Container maxW="container.lg" py={6}>
      <Heading mb={2}>Translation Workbench</Heading>
      <Text color="gray.500" mb={6}>Review and edit translated speech bubbles</Text>
      <VStack gap={4}>
        {bubbles.map((b) => (
          <Card.Root key={b.id} w="full">
            <Card.Body>
              <HStack justify="space-between" mb={3}>
                <Badge>Confidence: {b.confidence}%</Badge>
                <Badge colorScheme={b.status === 'approved' ? 'green' : 'orange'}>{b.status}</Badge>
              </HStack>
              <Grid templateColumns="1fr 1fr" gap={4}>
                <Field.Root><Field.Label>Original</Field.Label><Textarea value={b.original} readOnly /></Field.Root>
                <Field.Root><Field.Label>Translation</Field.Label><Textarea defaultValue={b.translated} /></Field.Root>
              </Grid>
              <HStack mt={3} gap={2}>
                <Button size="sm" colorScheme="green">Approve</Button>
                <Button size="sm" variant="outline">Revise</Button>
              </HStack>
            </Card.Body>
          </Card.Root>
        ))}
      </VStack>
    </Container>
  );
}
