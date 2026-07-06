import { Box, Container, Heading, Text, Card, VStack, Field, Input } from '@chakra-ui/react';

export default function SettingsPage() {
  return (
    <Container maxW="container.md" py={6}>
      <Heading mb={2}>Settings</Heading>
      <Text color="gray.500" mb={6}>Manage your preferences</Text>
      <Card.Root>
        <Card.Body>
          <VStack align="stretch" gap={4}>
            <Field.Root>
              <Field.Label>API Key</Field.Label>
              <Input placeholder="Enter your API key" />
            </Field.Root>
          </VStack>
        </Card.Body>
      </Card.Root>
    </Container>
  );
}
