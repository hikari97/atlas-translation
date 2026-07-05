import React, { useState } from 'react';
import {
  Box,
  Container,
  VStack,
  Heading,
  Text,
  Grid,
  Flex,
  GridItem,
  Progress,
  HStack,
  Badge,
  Button,
  useToast,
  Divider,
  ButtonGroup,
  IconButton,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
} from '@chakra-ui/react';
import Link from 'next/link';
import PageHeader from '../../components/shell/PageHeader';

interface QueuedFile {
  readonly id: string;
  readonly name: string;
  readonly size: number;
  readonly progress: number;
  readonly status: 'pending' | 'uploading' | 'completed' | 'failed';
}

interface LibraryAsset {
  readonly id: string;
  readonly filename: string;
  readonly size: string;
  readonly uploadedAt: string;
  readonly pageNumber: number;
}

export default function LibraryPage() {
  const toast = useToast();
  const [queue, setQueue] = useState<readonly QueuedFile[]>([]);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [assets, setAssets] = useState<readonly LibraryAsset[]>([
    { id: '1', filename: 'naruto_cover.png', size: '1.2 MB', uploadedAt: '1h ago', pageNumber: 1 },
    { id: '2', filename: 'onepiece_page1.jpg', size: '850 KB', uploadedAt: '2h ago', pageNumber: 2 },
  ]);

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    const files = Array.from(e.dataTransfer.files);
    
    const newItems: QueuedFile[] = [];
    for (const file of files) {
      const validTypes = ['image/png', 'image/jpeg', 'image/jpg', 'image/webp'];
      if (!validTypes.includes(file.type)) {
        toast({ title: 'Invalid File', description: `"${file.name}" is not a supported image format.`, status: 'error', duration: 3000 });
        continue;
      }
      if (file.size > 10 * 1024 * 1024) {
        toast({ title: 'File Too Large', description: `"${file.name}" exceeds the 10MB limit.`, status: 'error', duration: 3000 });
        continue;
      }

      newItems.push({
        id: Date.now().toString() + Math.random().toString(),
        name: file.name,
        size: file.size,
        progress: 0,
        status: 'pending',
      });
    }

    if (newItems.length > 0) {
      setQueue((prev) => [...prev, ...newItems]);
      newItems.forEach((item) => simulateUpload(item.id));
    }
  };

  const simulateUpload = (id: string) => {
    let progress = 0;
    setQueue((prev) => prev.map((q) => (q.id === id ? { ...q, status: 'uploading' } : q)));

    const interval = setInterval(() => {
      progress += 20;
      setQueue((prev) =>
        prev.map((q) => {
          if (q.id === id) {
            if (progress >= 100) {
              clearInterval(interval);
              setTimeout(() => {
                setAssets((currentAssets) => [
                  ...currentAssets,
                  {
                    id: q.id,
                    filename: q.name,
                    size: `${(q.size / 1024 / 1024).toFixed(1)} MB`,
                    uploadedAt: 'Just now',
                    pageNumber: currentAssets.length + 1,
                  },
                ]);
                setQueue((currentQueue) => currentQueue.filter((item) => item.id !== id));
              }, 500);
              return { ...q, progress: 100, status: 'completed' };
            }
            return { ...q, progress };
          }
          return q;
        })
      );
    }, 400);
  };

  const handleBulkDelete = () => {
    setAssets([]);
    toast({ title: 'Bulk Action', description: 'All library assets cleared.', status: 'info', duration: 3000 });
  };

  const movePageUp = (index: number) => {
    if (index === 0) return;
    const items = [...assets];
    const temp = items[index]!;
    items[index] = items[index - 1]!;
    items[index - 1] = temp;
    // Recalculate page numbers
    const updated = items.map((item, i) => ({ ...item, pageNumber: i + 1 }));
    setAssets(updated);
  };

  const movePageDown = (index: number) => {
    if (index === assets.length - 1) return;
    const items = [...assets];
    const temp = items[index]!;
    items[index] = items[index + 1]!;
    items[index + 1] = temp;
    const updated = items.map((item, i) => ({ ...item, pageNumber: i + 1 }));
    setAssets(updated);
  };

  return (
    <Container maxW="container.lg" py={6}>
      <VStack align="stretch" spacing={6}>
        <PageHeader
          title="Asset Library"
          description="Upload and manage comic pages, original assets, and typeset layouts."
        >
          <Link href="/" passHref>
            <Button size="sm" variant="ghost">Back to Dashboard</Button>
          </Link>
        </PageHeader>

        {/* Drag and Drop Zone */}
        <Box
          p={10}
          border="2px dashed"
          borderColor="blue.300"
          borderRadius="lg"
          bg="blue.50"
          textAlign="center"
          onDragOver={handleDragOver}
          onDrop={handleDrop}
          cursor="pointer"
          transition="all 0.2s"
          _hover={{ bg: 'blue.100', borderColor: 'blue.500' }}
        >
          <VStack spacing={2}>
            <Text fontSize="4xl">📤</Text>
            <Heading size="sm" color="blue.700">Drag & Drop Image Files</Heading>
            <Text fontSize="xs" color="blue.600">Supports PNG, JPG, JPEG, WebP (Max 10MB per file)</Text>
          </VStack>
        </Box>

        {/* Uploading Queue UI */}
        {queue.length > 0 && (
          <Box p={5} borderWidth={1} borderRadius="lg" bg="white" boxShadow="xs">
            <Heading size="xs" textTransform="uppercase" color="gray.500" mb={4}>
              Uploading Queue ({queue.length})
            </Heading>
            <VStack align="stretch" spacing={4}>
              {queue.map((item) => (
                <Box key={item.id}>
                  <HStack justify="space-between" mb={1} fontSize="xs">
                    <Text fontWeight="semibold" noOfLines={1}>{item.name}</Text>
                    <Badge colorScheme={item.status === 'completed' ? 'green' : 'blue'}>
                      {item.status} ({item.progress}%)
                    </Badge>
                  </HStack>
                  <Progress value={item.progress} size="xs" colorScheme="blue" borderRadius="md" />
                </Box>
              ))}
            </VStack>
          </Box>
        )}

        {/* Asset Library Catalog control bar */}
        <Box p={5} borderWidth={1} borderRadius="lg" bg="white" boxShadow="sm">
          <Flex justify="space-between" align="center" mb={4} wrap="wrap" gap={3}>
            <Heading size="xs" textTransform="uppercase" color="gray.500">
              Asset Catalog ({assets.length} items)
            </Heading>
            <HStack spacing={2}>
              <ButtonGroup size="xs" isAttached variant="outline">
                <Button onClick={() => setViewMode('grid')} isActive={viewMode === 'grid'}>Grid View</Button>
                <Button onClick={() => setViewMode('list')} isActive={viewMode === 'list'}>List View</Button>
              </ButtonGroup>
              {assets.length > 0 && (
                <Button size="xs" colorScheme="red" variant="outline" onClick={handleBulkDelete}>
                  Clear All
                </Button>
              )}
            </HStack>
          </Flex>

          <Divider mb={4} />

          {assets.length === 0 ? (
            <Text color="gray.400" fontSize="sm" textAlign="center" py={10}>No assets in library.</Text>
          ) : viewMode === 'grid' ? (
            <Grid templateColumns={{ base: '1fr', sm: 'repeat(2, 1fr)', md: 'repeat(3, 1fr)' }} gap={4}>
              {assets.map((asset, index) => (
                <GridItem key={asset.id} p={4} borderWidth={1} borderRadius="md" bg="gray.50">
                  <VStack align="start" spacing={2}>
                    <HStack justify="space-between" w="100%">
                      <Badge colorScheme="purple">Page {asset.pageNumber}</Badge>
                      <HStack spacing={1}>
                        <IconButton
                          size="xs"
                          aria-label="Move Up"
                          icon={<span>▲</span>}
                          onClick={() => movePageUp(index)}
                          isDisabled={index === 0}
                        />
                        <IconButton
                          size="xs"
                          aria-label="Move Down"
                          icon={<span>▼</span>}
                          onClick={() => movePageDown(index)}
                          isDisabled={index === assets.length - 1}
                        />
                      </HStack>
                    </HStack>
                    <Text fontWeight="semibold" fontSize="sm" noOfLines={1}>{asset.filename}</Text>
                    <HStack justify="space-between" w="100%" fontSize="xs" color="gray.400">
                      <Text>{asset.size}</Text>
                      <Text>{asset.uploadedAt}</Text>
                    </HStack>
                  </VStack>
                </GridItem>
              ))}
            </Grid>
          ) : (
            <Box overflowX="auto">
              <Table variant="simple" size="sm">
                <Thead>
                  <Tr>
                    <Th>Page No</Th>
                    <Th>File Name</Th>
                    <Th>Size</Th>
                    <Th>Uploaded</Th>
                    <Th>Order Actions</Th>
                  </Tr>
                </Thead>
                <Tbody>
                  {assets.map((asset, index) => (
                    <Tr key={asset.id}>
                      <Td fontWeight="bold">{asset.pageNumber}</Td>
                      <Td>{asset.filename}</Td>
                      <Td>{asset.size}</Td>
                      <Td>{asset.uploadedAt}</Td>
                      <Td>
                        <HStack spacing={1}>
                          <Button size="xs" onClick={() => movePageUp(index)} isDisabled={index === 0}>
                            Move Up
                          </Button>
                          <Button size="xs" onClick={() => movePageDown(index)} isDisabled={index === assets.length - 1}>
                            Move Down
                          </Button>
                        </HStack>
                      </Td>
                    </Tr>
                  ))}
                </Tbody>
              </Table>
            </Box>
          )}
        </Box>
      </VStack>
    </Container>
  );
}
