import { Box, Button, Field, Heading, HStack, Input, Tabs, Text, VStack } from '@chakra-ui/react';
import PageHeader from '../../../components/ui/PageHeader';
import Surface from '../../../components/ui/Surface';

const plugins = [
  { name: 'AI Translator', description: 'DeepL integration' },
  { name: 'OCR Engine', description: 'PaddleOCR adapter' },
];

const shortcuts = [
  { label: 'Open command menu', keys: 'Cmd K' },
  { label: 'Toggle dark mode', keys: 'Alt D' },
  { label: 'Save project', keys: 'Cmd S' },
];

export default function SettingsPage() {
  return (
    <Box>
      <PageHeader
        eyebrow="Preferences"
        title="Settings"
        description="Manage account preferences, plugin configuration, and editor shortcuts."
      />
      <Tabs.Root defaultValue="general">
        <Tabs.List
          bg="var(--atlas-surface)"
          borderColor="var(--atlas-border)"
          borderRadius="999px"
          borderWidth="1px"
          mb={5}
          overflowX="auto"
          p={1}
        >
          <Tabs.Trigger value="general">General</Tabs.Trigger>
          <Tabs.Trigger value="plugins">Plugins</Tabs.Trigger>
          <Tabs.Trigger value="shortcuts">Shortcuts</Tabs.Trigger>
        </Tabs.List>
        <Tabs.Content value="general">
          <Surface p={{ base: 5, md: 6 }}>
            <VStack align="stretch" gap={4} maxW="36rem">
              <Box>
                <Heading fontSize="lg" letterSpacing="-0.01em">
                  General preferences
                </Heading>
                <Text color="var(--atlas-muted)" fontSize="sm" mt={1}>
                  Keep display details easy to recognize across collaborative review.
                </Text>
              </Box>
              <Field.Root>
                <Field.Label>Display name</Field.Label>
                <Input borderRadius="var(--atlas-radius-sm)" defaultValue="H.Makki" />
              </Field.Root>
              <Button alignSelf="flex-start" className="atlas-button-motion" color="white" colorPalette="blue">
                Save changes
              </Button>
            </VStack>
          </Surface>
        </Tabs.Content>
        <Tabs.Content value="plugins">
          <Surface p={{ base: 5, md: 6 }}>
            <Heading fontSize="lg" letterSpacing="-0.01em" mb={4}>
              Installed plugins
            </Heading>
            <VStack align="stretch" gap={3}>
              {plugins.map((plugin) => (
                <HStack
                  key={plugin.name}
                  bg="var(--atlas-surface-muted)"
                  borderRadius="var(--atlas-radius-md)"
                  justify="space-between"
                  p={4}
                  w="full"
                >
                  <Box>
                    <Text color="var(--atlas-foreground)" fontWeight="800">
                      {plugin.name}
                    </Text>
                    <Text color="var(--atlas-muted)" fontSize="sm">
                      {plugin.description}
                    </Text>
                  </Box>
                  <Button className="atlas-button-motion" size="sm" variant="outline">
                    Configure
                  </Button>
                </HStack>
              ))}
            </VStack>
          </Surface>
        </Tabs.Content>
        <Tabs.Content value="shortcuts">
          <Surface p={{ base: 5, md: 6 }}>
            <Heading fontSize="lg" letterSpacing="-0.01em" mb={4}>
              Keyboard shortcuts
            </Heading>
            <VStack align="stretch" gap={3}>
              {shortcuts.map((shortcut) => (
                <HStack
                  key={shortcut.label}
                  bg="var(--atlas-surface-muted)"
                  borderRadius="var(--atlas-radius-md)"
                  justify="space-between"
                  p={4}
                  w="full"
                >
                  <Text color="var(--atlas-foreground)" fontWeight="700">
                    {shortcut.label}
                  </Text>
                  <Text
                    bg="var(--atlas-surface-solid)"
                    borderColor="var(--atlas-border)"
                    borderRadius="var(--atlas-radius-sm)"
                    borderWidth="1px"
                    color="var(--atlas-muted)"
                    fontFamily="mono"
                    fontSize="xs"
                    fontVariantNumeric="tabular-nums"
                    fontWeight="800"
                    px={2.5}
                    py={1}
                  >
                    {shortcut.keys}
                  </Text>
                </HStack>
              ))}
            </VStack>
          </Surface>
        </Tabs.Content>
      </Tabs.Root>
    </Box>
  );
}
