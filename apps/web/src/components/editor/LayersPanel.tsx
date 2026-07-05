import React, { useState } from 'react';
import { Box, VStack, HStack, Text, Heading, IconButton, useColorMode } from '@chakra-ui/react';

interface LayerItem {
  readonly id: string;
  readonly name: string;
  readonly type: 'image' | 'text' | 'mask';
  readonly visible: boolean;
  readonly locked: boolean;
}

interface LayersPanelProps {
  readonly activeLayerId: string | undefined;
  readonly onSelectLayer: (id: string | undefined) => void;
}

export default function LayersPanel({ activeLayerId, onSelectLayer }: LayersPanelProps) {
  const { colorMode } = useColorMode();
  const [layers, setLayers] = useState<readonly LayerItem[]>([
    { id: '1', name: 'Original Comic Layout', type: 'image', visible: true, locked: true },
    { id: '2', name: 'Speech Bubble 1 (JA)', type: 'text', visible: true, locked: false },
    { id: '3', name: 'Typeset Translation (EN)', type: 'text', visible: false, locked: false },
  ]);

  const toggleVisibility = (id: string) => {
    setLayers(
      layers.map((l) => (l.id === id ? { ...l, visible: !l.visible } : l))
    );
  };

  const toggleLock = (id: string) => {
    setLayers(
      layers.map((l) => (l.id === id ? { ...l, locked: !l.locked } : l))
    );
  };

  const moveLayerUp = (index: number) => {
    if (index === 0) return;
    const items = [...layers];
    const temp = items[index]!;
    items[index] = items[index - 1]!;
    items[index - 1] = temp;
    setLayers(items);
  };

  const moveLayerDown = (index: number) => {
    if (index === layers.length - 1) return;
    const items = [...layers];
    const temp = items[index]!;
    items[index] = items[index + 1]!;
    items[index + 1] = temp;
    setLayers(items);
  };

  return (
    <Box
      w="250px"
      bg={colorMode === 'light' ? 'white' : 'gray.800'}
      borderRight="1px solid"
      borderColor={colorMode === 'light' ? 'gray.200' : 'gray.700'}
      p={4}
      overflowY="auto"
    >
      <Heading size="xs" textTransform="uppercase" color="gray.500" mb={4}>
        Layers Manager ({layers.length})
      </Heading>
      <VStack align="stretch" spacing={2}>
        {layers.map((layer, index) => {
          const isActive = layer.id === activeLayerId;
          return (
            <Box
              key={layer.id}
              p={3}
              borderWidth={1}
              borderRadius="md"
              borderColor={isActive ? 'blue.500' : 'gray.200'}
              bg={isActive ? 'blue.50' : 'transparent'}
              _hover={{ bg: isActive ? 'blue.50' : 'gray.50' }}
              cursor="pointer"
              onClick={() => onSelectLayer(layer.id)}
            >
              <VStack align="stretch" spacing={2}>
                <HStack justify="space-between">
                  <Text fontSize="sm" fontWeight={isActive ? 'bold' : 'normal'} noOfLines={1}>
                    {layer.name}
                  </Text>
                  <Text fontSize="10px" color="gray.400" textTransform="uppercase">
                    {layer.type}
                  </Text>
                </HStack>
                <HStack justify="space-between">
                  {/* Visibility & Lock controls */}
                  <HStack spacing={1}>
                    <IconButton
                      size="xs"
                      aria-label="Toggle Visibility"
                      icon={<span>{layer.visible ? '👁️' : '🕶️'}</span>}
                      onClick={(e) => { e.stopPropagation(); toggleVisibility(layer.id); }}
                    />
                    <IconButton
                      size="xs"
                      aria-label="Toggle Lock"
                      icon={<span>{layer.locked ? '🔒' : '🔓'}</span>}
                      onClick={(e) => { e.stopPropagation(); toggleLock(layer.id); }}
                    />
                  </HStack>

                  {/* Ordering controls */}
                  <HStack spacing={1}>
                    <IconButton
                      size="xs"
                      aria-label="Move Up"
                      icon={<span>▲</span>}
                      onClick={(e) => { e.stopPropagation(); moveLayerUp(index); }}
                      isDisabled={index === 0}
                    />
                    <IconButton
                      size="xs"
                      aria-label="Move Down"
                      icon={<span>▼</span>}
                      onClick={(e) => { e.stopPropagation(); moveLayerDown(index); }}
                      isDisabled={index === layers.length - 1}
                    />
                  </HStack>
                </HStack>
              </VStack>
            </Box>
          );
        })}
      </VStack>
    </Box>
  );
}
