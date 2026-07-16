import React, { useState } from 'react';
import { Box, Heading, HStack, Text, VStack } from '@chakra-ui/react';
import { LuEye } from 'react-icons/lu';

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
    <Box
      bg="var(--atlas-surface)"
      borderColor="var(--atlas-border)"
      borderTopWidth="1px"
      p={4}
      w={{ base: '100%', lg: '17rem' }}
    >
      <Heading fontSize="sm" letterSpacing="-0.01em" mb={4}>
        Layers
      </Heading>
      <VStack align="stretch" gap={2}>
        {layers.map((layer) => {
          const active = layer.id === activeLayerId;

          return (
            <Box
              key={layer.id}
              bg={active ? 'var(--atlas-primary-soft)' : 'var(--atlas-surface-solid)'}
              borderColor={active ? 'var(--atlas-primary)' : 'var(--atlas-border)'}
              borderRadius="var(--atlas-radius-md)"
              borderWidth="1px"
              cursor="pointer"
              onClick={() => onSelectLayer(layer.id)}
              p={3}
              transition="all 180ms ease"
              _hover={{ borderColor: 'var(--atlas-primary)' }}
            >
              <HStack justify="space-between">
                <Text color="var(--atlas-foreground)" fontSize="xs" fontWeight="750">
                  {layer.name}
                </Text>
                {layer.visible && <LuEye color="var(--atlas-muted)" size={14} />}
              </HStack>
            </Box>
          );
        })}
      </VStack>
    </Box>
  );
}
