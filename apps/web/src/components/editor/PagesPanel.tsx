import React, { useRef } from 'react';
import { Box, VStack, HStack, Text, Heading, Badge, Button } from '@chakra-ui/react';
import { useCreatePageMutation } from '../../lib/data/mutationHooks';

interface PageItem {
  readonly _id: string;
  readonly pageNumber: number;
  readonly status: 'pending' | 'ocr' | 'translated' | 'typesetting' | 'completed';
}

interface PagesPanelProps {
  readonly projectId: string;
  readonly pages: readonly PageItem[] | undefined;
  readonly activePageId: string | undefined;
  readonly onSelectPage: (id: string) => void;
}

export default function PagesPanel({ projectId, pages = [], activePageId, onSelectPage }: PagesPanelProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const createPageMutation = useCreatePageMutation();

  const handleUploadClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0 || !projectId) return;

    // Urutkan file secara ascending berdasarkan nama file
    const sortedFiles = Array.from(files).sort((a, b) => {
      // Natural sort (page9.jpg < page10.jpg)
      return a.name.localeCompare(b.name, undefined, { numeric: true, sensitivity: 'base' });
    });

    try {
      // Kirim seluruh files yang sudah diurutkan dalam satu request
      await createPageMutation.mutateAsync({ projectId, files: sortedFiles });
    } catch (err) {
      console.error('Failed to upload pages:', err);
    }

    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  return (
    <Box w="240px" p={4} borderRightWidth="1px" display="flex" flexDirection="column" h="100%">
      <HStack justify="space-between" mb={4}>
        <Heading size="xs">Pages ({pages.length})</Heading>
        <Button size="xs" colorScheme="blue" onClick={handleUploadClick} loading={createPageMutation.isPending}>
          + Add
        </Button>
        <input
          type="file"
          ref={fileInputRef}
          onChange={handleFileChange}
          accept="image/*"
          multiple
          style={{ display: 'none' }}
        />
      </HStack>
      <VStack align="stretch" gap={3} flex="1" overflowY="auto">
        {pages.map((p) => (
          <Box
            key={p._id}
            p={3}
            borderWidth={1}
            borderRadius="md"
            borderColor={p._id === activePageId ? 'blue.500' : 'gray.200'}
            onClick={() => onSelectPage(p._id)}
            cursor="pointer"
          >
            <HStack justify="space-between">
              <Text fontSize="sm">Page {p.pageNumber}</Text>
              <Badge>{p.status}</Badge>
            </HStack>
          </Box>
        ))}
      </VStack>
    </Box>
  );
}
