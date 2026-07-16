import type { ChangeEvent } from 'react';
import {
  Box,
  Button,
  Field,
  Grid,
  Heading,
  HStack,
  IconButton,
  Input,
  NativeSelect,
  Presence,
  Text,
  VStack,
} from '@chakra-ui/react';
import { LuMessageCircle, LuPalette, LuSave, LuSettings, LuX } from 'react-icons/lu';

interface TranslateSettingsPanelProps {
  readonly open: boolean;
  readonly provider: string;
  readonly targetLanguage: string;
  readonly onClose: () => void;
  readonly onProviderChange: (value: string) => void;
  readonly onTargetLanguageChange: (value: string) => void;
}

export default function TranslateSettingsPanel({
  open,
  provider,
  targetLanguage,
  onClose,
  onProviderChange,
  onTargetLanguageChange,
}: TranslateSettingsPanelProps) {
  const handleProviderChange = (event: ChangeEvent<HTMLSelectElement>) => {
    onProviderChange(event.target.value);
  };

  const handleLanguageChange = (event: ChangeEvent<HTMLSelectElement>) => {
    onTargetLanguageChange(event.target.value);
  };

  return (
    <Presence
      className="editor-settings-panel"
      present={open}
      unmountOnExit
      bg="var(--editor-surface-raised)"
      borderColor="var(--editor-border)"
      borderRadius="18px"
      borderWidth="1px"
      boxShadow="var(--editor-floating-shadow)"
      bottom={{ base: 3, md: 'auto' }}
      left={{ base: 3, md: 5 }}
      maxH={{ base: 'calc(100% - 1.5rem)', md: 'calc(100% - 6rem)' }}
      maxW={{ base: 'calc(100% - 1.5rem)', md: '26rem' }}
      overflowY="auto"
      p={{ base: 4, md: 5 }}
      position="absolute"
      right={{ base: 3, md: 'auto' }}
      top={{ base: 'auto', md: '4.85rem' }}
      w={{ base: 'auto', md: '26rem' }}
      zIndex={4}
    >
      <VStack align="stretch" gap={4}>
        <HStack align="flex-start" gap={3} justify="space-between">
          <HStack align="flex-start" gap={3}>
            <Box
              alignItems="center"
              bg="var(--editor-primary-soft)"
              borderRadius="12px"
              color="var(--editor-primary)"
              display="flex"
              flexShrink={0}
              h="2.6rem"
              justifyContent="center"
              w="2.6rem"
            >
              <LuSettings size={20} />
            </Box>
            <Box minW={0}>
              <Heading color="var(--editor-text)" fontSize="md" letterSpacing="-0.01em">
                Translate settings
              </Heading>
              <Text color="var(--editor-muted)" fontSize="xs" mt={1}>
                Atur model, bahasa, dan tampilan teks hasil translate.
              </Text>
            </Box>
          </HStack>
          <IconButton
            aria-label="Close translate settings"
            borderRadius="10px"
            color="var(--editor-muted)"
            onClick={onClose}
            size="xs"
            variant="ghost"
            _hover={{ bg: 'var(--editor-surface-soft)', color: 'var(--editor-text)' }}
          >
            <LuX size={16} />
          </IconButton>
        </HStack>

        <VStack
          align="stretch"
          bg="var(--editor-surface-soft)"
          borderColor="var(--editor-border)"
          borderRadius="14px"
          borderWidth="1px"
          gap={3}
          p={3}
        >
          <Field.Root>
            <Field.Label color="var(--editor-muted)" fontSize="sm" fontWeight="750">
              Translation model
            </Field.Label>
            <NativeSelect.Root size="sm">
              <NativeSelect.Field
                borderColor="var(--editor-border-strong)"
                borderRadius="10px"
                onChange={handleProviderChange}
                value={provider}
              >
                <option value="gemini">Gemini</option>
                <option value="openai">OpenAI</option>
                <option value="openrouter">OpenRouter</option>
              </NativeSelect.Field>
              <NativeSelect.Indicator />
            </NativeSelect.Root>
          </Field.Root>

          <Grid gap={3} templateColumns={{ base: '1fr', sm: '1fr 1fr' }}>
            <Field.Root>
              <Field.Label color="var(--editor-muted)" fontSize="sm" fontWeight="750">
                Target language
              </Field.Label>
              <NativeSelect.Root size="sm">
                <NativeSelect.Field
                  borderColor="var(--editor-border-strong)"
                  borderRadius="10px"
                  onChange={handleLanguageChange}
                  value={targetLanguage}
                >
                  <option value="id">Indonesia</option>
                  <option value="en">English</option>
                </NativeSelect.Field>
                <NativeSelect.Indicator />
              </NativeSelect.Root>
            </Field.Root>

            <Field.Root>
              <Field.Label color="var(--editor-muted)" fontSize="sm" fontWeight="750">
                Alignment
              </Field.Label>
              <NativeSelect.Root size="sm">
                <NativeSelect.Field borderColor="var(--editor-border-strong)" borderRadius="10px">
                  <option>Auto</option>
                  <option>Center</option>
                  <option>Left</option>
                </NativeSelect.Field>
                <NativeSelect.Indicator />
              </NativeSelect.Root>
            </Field.Root>
          </Grid>

          <Grid gap={3} templateColumns={{ base: '1fr', sm: '1fr 1fr' }}>
            <Field.Root>
              <Field.Label color="var(--editor-muted)" fontSize="sm" fontWeight="750">
                Font family
              </Field.Label>
              <NativeSelect.Root size="sm">
                <NativeSelect.Field borderColor="var(--editor-border-strong)" borderRadius="10px">
                  <option>WildWords</option>
                  <option>Komika Axis</option>
                  <option>Manga Standard</option>
                </NativeSelect.Field>
                <NativeSelect.Indicator />
              </NativeSelect.Root>
            </Field.Root>

            <Field.Root>
              <Field.Label color="var(--editor-muted)" fontSize="sm" fontWeight="750">
                Min font size
              </Field.Label>
              <Input borderColor="var(--editor-border-strong)" borderRadius="10px" defaultValue="12" size="sm" />
            </Field.Root>
          </Grid>
        </VStack>

        <HStack gap={2} justify="space-between" wrap="wrap">
          <Button bg="var(--editor-primary-soft)" color="var(--editor-primary)" size="sm" variant="plain">
            <LuPalette /> Style
          </Button>
          <Button bg="var(--editor-primary-soft)" color="var(--editor-primary)" size="sm" variant="plain">
            <LuMessageCircle /> Bubble
          </Button>
          <Button borderColor="var(--editor-border-strong)" color="var(--editor-muted)" size="sm" variant="outline">
            <LuSave /> Save
          </Button>
        </HStack>
      </VStack>
    </Presence>
  );
}
