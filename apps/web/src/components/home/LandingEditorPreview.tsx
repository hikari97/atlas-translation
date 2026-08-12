import { Box, Flex, HStack, Text, VStack } from '@chakra-ui/react';
import { LuDownload, LuLanguages, LuScanText, LuWandSparkles } from 'react-icons/lu';

const tools = [
  { icon: LuScanText, label: 'Detect text' },
  { icon: LuLanguages, label: 'Translate image' },
  { icon: LuWandSparkles, label: 'Inpaint artwork' },
] as const;

/** Presents a lightweight visual model of the real image localization editor. */
export default function LandingEditorPreview() {
  return (
    <Box
      aria-label="Preview of the Atlas Studio image localization editor"
      as="figure"
      bg="var(--color-paper-raised)"
      border="var(--rule-ink)"
      borderRadius="var(--radius-lg)"
      boxShadow="var(--shadow-editor)"
      className="landing-editor-preview"
      m={0}
      overflow="hidden"
    >
      <Flex
        align="center"
        borderBottom="var(--rule-hairline)"
        gap={3}
        justify="space-between"
        minH="3.75rem"
        px={{ base: 4, md: 5 }}
      >
        <HStack gap={3} minW={0}>
          <Box bg="var(--color-accent)" borderRadius="var(--radius-sm)" h="0.65rem" w="0.65rem" />
          <Text color="var(--color-ink)" fontSize="sm" fontWeight="700" truncate>
            Chapter 01 · Page 08
          </Text>
        </HStack>
        <HStack color="var(--color-muted)" gap={2}>
          <Text display={{ base: 'none', sm: 'block' }} fontSize="xs">
            Ready to download
          </Text>
          <LuDownload size={16} />
        </HStack>
      </Flex>

      <Box display="grid" gridTemplateColumns={{ base: '3.25rem minmax(0, 1fr)', md: '4rem minmax(0, 1fr)' }} minH={{ base: '25rem', md: '34rem' }}>
        <VStack
          borderRight="var(--rule-hairline)"
          gap={2}
          py={4}
        >
          {tools.map((tool, index) => {
            const Icon = tool.icon;

            return (
              <Box
                alignItems="center"
                aria-label={tool.label}
                bg={index === 1 ? 'var(--color-accent-soft)' : 'transparent'}
                borderRadius="var(--radius-sm)"
                color={index === 1 ? 'var(--color-accent-deep)' : 'var(--color-muted)'}
                display="flex"
                h="2.5rem"
                justifyContent="center"
                key={tool.label}
                w="2.5rem"
              >
                <Icon size={17} />
              </Box>
            );
          })}
        </VStack>

        <Box bg="var(--color-paper-soft)" p={{ base: 3, md: 5 }}>
          <Box
            bg="var(--color-paper-blue)"
            border="var(--rule-hairline)"
            borderRadius="var(--radius-lg)"
            className="landing-comic-canvas"
            h="full"
            minH="22rem"
            overflow="hidden"
            position="relative"
          >
            <Box className="landing-panel-shadow" />
            <Box className="landing-panel-face" />
            <Box className="landing-panel-motion" />

            <Box className="landing-bubble landing-bubble-original">
              <Text color="var(--color-ink-soft)" fontFamily="var(--font-display)" fontSize={{ base: 'sm', md: 'md' }} lineHeight="1.1">
                ここから始めよう
              </Text>
            </Box>

            <Box className="landing-bubble landing-bubble-translated">
              <Text color="var(--color-ink)" fontFamily="var(--font-display)" fontSize={{ base: 'sm', md: 'lg' }} lineHeight="1.05">
                Let us begin here.
              </Text>
            </Box>

            <Box className="landing-selection-frame">
              <Box className="landing-selection-handle landing-selection-handle-one" />
              <Box className="landing-selection-handle landing-selection-handle-two" />
              <Box className="landing-selection-handle landing-selection-handle-three" />
              <Box className="landing-selection-handle landing-selection-handle-four" />
            </Box>

            <Box
              bg="var(--color-ink)"
              borderRadius="var(--radius-sm)"
              bottom={{ base: 3, md: 5 }}
              color="var(--color-accent-ink)"
              left={{ base: 3, md: 5 }}
              px={3}
              py={2}
              position="absolute"
            >
              <Text fontSize="xs" fontWeight="700">
                Inpainted · text removed
              </Text>
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}
