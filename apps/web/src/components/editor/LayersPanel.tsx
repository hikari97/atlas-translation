import React, { useState } from 'react';
import { Box, VStack, HStack, Text, Heading, Badge } from '@chakra-ui/react';

interface LayerItem {
  readonly id: string;
  readonly name: string;
  readonly visible: boolean;
}

interface LayersPanelProps {
  readonly activeLayerId: string | undefined;
  readonly onSelectLayer: (id: string | undefined) => void;
}

export default function LayersPanel({ activeLayerId, onSelectLayer }: LayersPanelProps) {
  const [layers] = useState<readonly LayerItem[]>([
    { id: '1', name: 'Background Image', visible: true },
    { id: '2', name: 'Speech Bubble Text', visible: true },
  ]);

  return (
    <Box w="240px" p={4} borderTopWidth="1px">
      <Heading size="xs" mb={4}>Layers</Heading>
      <VStack align="stretch" gap={2}>
        {layers.map((l) => (
          <Box
            key={l.id}
            p={2}
            borderWidth={1}
            borderRadius="md"
            borderColor={l.id === activeLayerId ? 'blue.500' : 'gray.200'}
            onClick={() => onSelectLayer(l.id)}
            cursor="pointer"
          >
            <Text fontSize="xs">{l.name}</Text>
          </Box>
        ))}
      </VStack>
    </Box>
  );
}
