import { Box, Container, Heading, Text, Card, VStack, Field, Input, Tabs, HStack, Button } from '@chakra-ui/react';

export default function SettingsPage() {
  return (
    <Container maxW="container.lg" py={6}>
      <Heading mb={2}>Settings</Heading>
      <Text color="gray.500" mb={6}>Manage your preferences</Text>
      <Tabs.Root defaultValue="general">
        <Tabs.List mb={4}>
          <Tabs.Trigger value="general">General</Tabs.Trigger>
          <Tabs.Trigger value="plugins">Plugins</Tabs.Trigger>
          <Tabs.Trigger value="shortcuts">Shortcuts</Tabs.Trigger>
        </Tabs.List>
        <Tabs.Content value="general">
          <Card.Root><Card.Body><VStack gap={4}>
            <Field.Root><Field.Label>Display Name</Field.Label><Input defaultValue="H.Makki" /></Field.Root>
            <Button alignSelf="flex-start" colorScheme="blue">Save</Button>
          </VStack></Card.Body></Card.Root>
        </Tabs.Content>
        <Tabs.Content value="plugins">
          <Card.Root><Card.Body>
            <Heading size="sm" mb={4}>Installed Plugins</Heading>
            <VStack gap={3}>
              <HStack justify="space-between" w="full"><Box><Text fontWeight="semibold">AI Translator</Text><Text fontSize="sm" color="gray.500">DeepL integration</Text></Box><Button size="sm" variant="outline">Configure</Button></HStack>
              <HStack justify="space-between" w="full"><Box><Text fontWeight="semibold">OCR Engine</Text><Text fontSize="sm" color="gray.500">PaddleOCR adapter</Text></Box><Button size="sm" variant="outline">Configure</Button></HStack>
            </VStack>
          </Card.Body></Card.Root>
        </Tabs.Content>
        <Tabs.Content value="shortcuts">
          <Card.Root><Card.Body><VStack gap={3}>
            <HStack justify="space-between" w="full"><Text>Open Command Menu</Text><Text fontFamily="mono">⌘K</Text></HStack>
            <HStack justify="space-between" w="full"><Text>Toggle Dark Mode</Text><Text fontFamily="mono">⌥D</Text></HStack>
            <HStack justify="space-between" w="full"><Text>Save Project</Text><Text fontFamily="mono">⌘S</Text></HStack>
          </VStack></Card.Body></Card.Root>
        </Tabs.Content>
      </Tabs.Root>
    </Container>
  );
}
