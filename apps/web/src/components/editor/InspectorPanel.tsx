import React, { useEffect, useState } from 'react';
import { Box, Heading, Text, VStack, Field, Textarea } from '@chakra-ui/react';
import type { BubbleDto } from '../../lib/data/fetchHooks';

interface InspectorPanelProps {
  readonly bubble: BubbleDto | undefined;
  readonly onUpdateText?: (id: string, text: string) => void | Promise<void>;
}

export default function InspectorPanel({ bubble, onUpdateText }: InspectorPanelProps) {
  const [translatedText, setTranslatedText] = useState('');

  useEffect(() => {
    setTranslatedText(bubble?.translatedText || '');
  }, [bubble]);

  const handleTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const val = e.target.value;
    setTranslatedText(val);
    if (onUpdateText && bubble) {
      onUpdateText(bubble._id, val);
    }
  };

  return (
    <Box w="300px" p={4} borderLeftWidth="1px">
      <Heading size="xs" mb={4}>Inspector</Heading>
      <VStack align="stretch" gap={4}>
        <Text fontSize="xs" color="gray.500">Selected Bubble ID: {bubble?._id || 'None'}</Text>
        <Field.Root>
          <Field.Label>Original Text (Read-only)</Field.Label>
          <Textarea value={bubble?.originalText || ''} readOnly size="sm" />
        </Field.Root>
        <Field.Root>
          <Field.Label>Translated Text</Field.Label>
          <Textarea placeholder="Translated text" value={translatedText} onChange={handleTextChange} disabled={!bubble} />
        </Field.Root>
      </VStack>
    </Box>
  );
}
