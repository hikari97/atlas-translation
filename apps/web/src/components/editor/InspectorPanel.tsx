import React, { useState } from 'react';
import { Box, Field, Heading, HStack, Text, Textarea, VStack } from '@chakra-ui/react';
import type { BubbleDto } from '../../lib/data/fetchHooks';
import StatusBadge from '../ui/StatusBadge';

interface InspectorPanelProps {
  readonly bubble: BubbleDto | undefined;
  readonly onUpdateText?: (id: string, text: string) => void | Promise<void>;
}

export default function InspectorPanel({ bubble, onUpdateText }: InspectorPanelProps) {
  const [draft, setDraft] = useState<{ readonly bubbleId: string | undefined; readonly text: string }>({
    bubbleId: undefined,
    text: '',
  });
  const selectedBubbleId = bubble?._id;
  const translatedText = draft.bubbleId === selectedBubbleId
    ? draft.text
    : bubble?.translatedText || '';

  const handleTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const val = e.target.value;
    setDraft({ bubbleId: selectedBubbleId, text: val });
    if (onUpdateText && bubble) {
      onUpdateText(bubble._id, val);
    }
  };

  return (
    <Box
      bg="var(--atlas-surface)"
      borderColor="var(--atlas-border)"
      borderLeftWidth={{ base: 0, xl: '1px' }}
      borderTopWidth={{ base: '1px', xl: 0 }}
      p={4}
      w={{ base: '100%', xl: '22rem' }}
    >
      <HStack align="flex-start" justify="space-between" mb={4}>
        <Box>
          <Heading fontSize="sm" letterSpacing="-0.01em">
            Inspector
          </Heading>
          <Text color="var(--atlas-muted)" fontSize="xs">
            Bubble text and metadata
          </Text>
        </Box>
        {bubble && <StatusBadge status={bubble.status} />}
      </HStack>
      <VStack align="stretch" gap={4}>
        <Box bg="var(--atlas-surface-muted)" borderRadius="var(--atlas-radius-md)" p={3}>
          <Text color="var(--atlas-muted)" fontSize="xs" fontWeight="800" mb={1}>
            Selected bubble
          </Text>
          <Text color="var(--atlas-foreground)" fontFamily="mono" fontSize="xs" wordBreak="break-all">
            {bubble?._id || 'None'}
          </Text>
        </Box>
        <Field.Root>
          <Field.Label>Original text</Field.Label>
          <Textarea
            borderRadius="var(--atlas-radius-sm)"
            minH="7rem"
            readOnly
            size="sm"
            value={bubble?.originalText || ''}
          />
        </Field.Root>
        <Field.Root>
          <Field.Label>Translated text</Field.Label>
          <Textarea
            borderRadius="var(--atlas-radius-sm)"
            disabled={!bubble}
            minH="9rem"
            onChange={handleTextChange}
            placeholder="Translated text"
            value={translatedText}
          />
        </Field.Root>
        {bubble && (
          <HStack
            bg="var(--atlas-surface-muted)"
            borderRadius="var(--atlas-radius-md)"
            justify="space-between"
            p={3}
          >
            <Text color="var(--atlas-muted)" fontSize="xs">
              Confidence
            </Text>
            <Text color="var(--atlas-foreground)" fontSize="xs" fontVariantNumeric="tabular-nums" fontWeight="800">
              {bubble.confidence}%
            </Text>
          </HStack>
        )}
      </VStack>
    </Box>
  );
}
