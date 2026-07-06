import React, { useState, useEffect } from 'react';
import { Box, Heading, Text, VStack, Field, Textarea } from '@chakra-ui/react';

interface InspectorPanelProps {
  readonly activeBubbleId: string | undefined;
  readonly onUpdateText?: (id: string, text: string) => void | Promise<void>;
}

export default function InspectorPanel({ activeBubbleId, onUpdateText }: InspectorPanelProps) {
  const [text, setText] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const val = e.target.value;
    setText(val);
    if (onUpdateText && activeBubbleId) {
      onUpdateText(activeBubbleId, val);
    }
  };

  return (
    <Box w="300px" p={4} borderLeftWidth="1px">
      <Heading size="xs" mb={4}>Inspector</Heading>
      <VStack align="stretch" gap={4}>
        <Text fontSize="xs" color="gray.500">Selected: {activeBubbleId || 'None'}</Text>
        <Field.Root>
          <Field.Label>Bubble Text</Field.Label>
          <Textarea placeholder="Translated text" value={text} onChange={handleChange} disabled={!activeBubbleId} />
        </Field.Root>
      </VStack>
    </Box>
  );
}
