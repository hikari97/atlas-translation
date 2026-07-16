import React, { useRef } from 'react';
import { Box, Button, Heading, HStack, Text, VStack } from '@chakra-ui/react';
import { useCreatePageMutation } from '../../lib/data/mutationHooks';
import StatusBadge from '../ui/StatusBadge';

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

    const sortedFiles = Array.from(files).sort((a, b) => {
      return a.name.localeCompare(b.name, undefined, { numeric: true, sensitivity: 'base' });
    });

    try {
      await createPageMutation.mutateAsync({ projectId, files: sortedFiles });
    } catch (err) {
      console.error('Failed to upload pages:', err);
    }

    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  return (
    <Box
      bg="var(--atlas-surface)"
      borderColor="var(--atlas-border)"
      borderRightWidth={{ base: 0, lg: '1px' }}
      display="flex"
      flexDirection="column"
      h="100%"
      minW={{ base: '100%', lg: '17rem' }}
      p={4}
      w={{ base: '100%', lg: '17rem' }}
    >
      <HStack justify="space-between" mb={4}>
        <Box>
          <Heading fontSize="sm" letterSpacing="-0.01em">
            Pages
          </Heading>
          <Text color="var(--atlas-muted)" fontSize="xs">
            {pages.length} total
          </Text>
        </Box>
        <Button
          className="atlas-button-motion"
          color="white"
          colorPalette="blue"
          loading={createPageMutation.isPending}
          onClick={handleUploadClick}
          size="xs"
        >
          Add
        </Button>
        <input
          accept="image/*"
          hidden
          multiple
          onChange={handleFileChange}
          ref={fileInputRef}
          type="file"
        />
      </HStack>
      <VStack align="stretch" gap={3} flex="1" overflowY="auto">
        {pages.length === 0 && (
          <Box
            bg="var(--atlas-surface-muted)"
            borderRadius="var(--atlas-radius-md)"
            color="var(--atlas-muted)"
            fontSize="sm"
            lineHeight="1.6"
            p={4}
          >
            Upload comic pages to begin editing.
          </Box>
        )}
        {pages.map((page) => {
          const active = page._id === activePageId;

          return (
            <Box
              key={page._id}
              bg={active ? 'var(--atlas-primary-soft)' : 'var(--atlas-surface-solid)'}
              borderColor={active ? 'var(--atlas-primary)' : 'var(--atlas-border)'}
              borderRadius="var(--atlas-radius-md)"
              borderWidth="1px"
              className="atlas-focus-ring"
              cursor="pointer"
              onClick={() => onSelectPage(page._id)}
              p={3}
              transition="all 180ms ease"
              _hover={{
                borderColor: 'var(--atlas-primary)',
                transform: 'translateY(-1px)',
              }}
            >
              <HStack align="flex-start" justify="space-between">
                <Box>
                  <Text color="var(--atlas-foreground)" fontSize="sm" fontWeight="800">
                    Page {page.pageNumber}
                  </Text>
                  <Text color="var(--atlas-muted)" fontSize="xs">
                    Canvas source
                  </Text>
                </Box>
                <StatusBadge status={page.status} />
              </HStack>
            </Box>
          );
        })}
      </VStack>
    </Box>
  );
}
