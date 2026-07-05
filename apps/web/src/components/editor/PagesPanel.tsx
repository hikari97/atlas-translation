import React, { useState } from 'react';
import { Box, VStack, HStack, Text, Heading, Badge, Image, IconButton, useColorMode } from '@chakra-ui/react';

interface PageItem {
  readonly id: string;
  readonly pageNumber: number;
  readonly status: 'pending' | 'ocr' | 'translated' | 'completed';
  readonly imageUrl?: string;
}

interface PagesPanelProps {
  readonly activePageId: string;
  readonly onSelectPage: (id: string) => void;
}

export default function PagesPanel({ activePageId, onSelectPage }: PagesPanelProps) {
  const { colorMode } = useColorMode();
  const [pages, setPages] = useState<readonly PageItem[]>([
    { id: '1', pageNumber: 1, status: 'translated' },
    { id: '2', pageNumber: 2, status: 'ocr' },
    { id: '3', pageNumber: 3, status: 'pending' },
  ]);

  const movePageUp = (index: number) => {
    if (index === 0) return;
    const items = [...pages];
    const temp = items[index]!;
    items[index] = items[index - 1]!;
    items[index - 1] = temp;
    
    // Recalculate page numbers
    const updated = items.map((item, i) => ({ ...item, pageNumber: i + 1 }));
    setPages(updated);
  };

  const movePageDown = (index: number) => {
    if (index === pages.length - 1) return;
    const items = [...pages];
    const temp = items[index]!;
    items[index] = items[index + 1]!;
    items[index + 1] = temp;

    const updated = items.map((item, i) => ({ ...item, pageNumber: i + 1 }));
    setPages(updated);
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
        Comic Pages ({pages.length})
      </Heading>
      <VStack align="stretch" spacing={3}>
        {pages.map((page, index) => {
          const isActive = page.id === activePageId;
          return (
            <Box
              key={page.id}
              p={3}
              borderWidth={isActive ? 2 : 1}
              borderColor={isActive ? 'blue.500' : 'gray.200'}
              borderRadius="md"
              bg={isActive ? 'blue.50' : 'transparent'}
              _hover={{ bg: isActive ? 'blue.50' : 'gray.50' }}
              cursor="pointer"
              onClick={() => onSelectPage(page.id)}
            >
              <VStack align="stretch" spacing={2}>
                <HStack justify="space-between">
                  <Text fontSize="xs" fontWeight="bold" color={isActive ? 'blue.600' : 'gray.500'}>
                    Page {page.pageNumber}
                  </Text>
                  <Badge
                    colorScheme={
                      page.status === 'translated'
                        ? 'green'
                        : page.status === 'ocr'
                        ? 'blue'
                        : 'gray'
                    }
                    fontSize="9px"
                  >
                    {page.status}
                  </Badge>
                </HStack>
                
                {/* Mock Thumbnail Preview */}
                <Box h="80px" bg="gray.200" borderRadius="sm" display="flex" alignItems="center" justifyContent="center">
                  <Text fontSize="2xl">📄</Text>
                </Box>

                <HStack justify="flex-end" spacing={1}>
                  <IconButton
                    size="xs"
                    aria-label="Move Up"
                    icon={<span>▲</span>}
                    onClick={(e) => { e.stopPropagation(); movePageUp(index); }}
                    isDisabled={index === 0}
                  />
                  <IconButton
                    size="xs"
                    aria-label="Move Down"
                    icon={<span>▼</span>}
                    onClick={(e) => { e.stopPropagation(); movePageDown(index); }}
                    isDisabled={index === pages.length - 1}
                  />
                </HStack>
              </VStack>
            </Box>
          );
        })}
      </VStack>
    </Box>
  );
}
