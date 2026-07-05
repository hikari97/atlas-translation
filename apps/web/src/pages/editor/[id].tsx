import React, { useState } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import dynamic from 'next/dynamic';
import {
  Box,
  Flex,
  Heading,
  Text,
  Button,
  ButtonGroup,
  IconButton,
  VStack,
  HStack,
  useColorMode,
} from '@chakra-ui/react';
import Link from 'next/link';
import PagesPanel from '../../components/editor/PagesPanel';
import LayersPanel from '../../components/editor/LayersPanel';
import InspectorPanel from '../../components/editor/InspectorPanel';

// Load ComicCanvas dynamically with SSR disabled since Konva requires window/DOM APIs.
const ComicCanvas = dynamic(() => import('../../components/ComicCanvas'), {
  ssr: false,
  loading: () => <Box p={8} textAlign="center">Loading Editor Canvas...</Box>,
});

export default function EditorWorkspacePage() {
  const router = useRouter();
  const { id } = router.query;
  const { colorMode } = useColorMode();

  // Panels visibility state
  const [showLeftPanel, setShowLeftPanel] = useState(true);
  const [showRightPanel, setShowRightPanel] = useState(true);
  const [activeTool, setActiveTool] = useState<'select' | 'text' | 'crop'>('select');
  const [zoom, setZoom] = useState(100);
  
  // Navigation states
  const [activePageId, setActivePageId] = useState('1');
  const [activeLayerId, setActiveLayerId] = useState<string | undefined>('1');
  const [activeBubbleId, setActiveBubbleId] = useState<string | undefined>('1');

  // Undo/Redo mock state
  const [historyIndex, setHistoryIndex] = useState(0);
  const [historySize, setHistorySize] = useState(1);

  const handleUndo = () => {
    if (historyIndex > 0) setHistoryIndex(historyIndex - 1);
  };

  const handleRedo = () => {
    if (historyIndex < historySize - 1) setHistoryIndex(historyIndex + 1);
  };

  return (
    <Box minH="100vh" display="flex" flexDirection="column" bg={colorMode === 'light' ? 'gray.50' : 'gray.900'}>
      <Head>
        <title>Editor Workspace — Atlas Studio</title>
      </Head>

      {/* Editor Sub-Header (Toolbar / Control Bar) */}
      <Box
        py={3}
        px={6}
        bg={colorMode === 'light' ? 'white' : 'gray.800'}
        borderBottom="1px solid"
        borderColor={colorMode === 'light' ? 'gray.200' : 'gray.700'}
      >
        <Flex justify="space-between" align="center" wrap="wrap" gap={3}>
          <HStack spacing={4}>
            <Link href="/projects" passHref>
              <Button size="xs" variant="ghost">⬅ Projects</Button>
            </Link>
            <Heading size="xs" color="gray.500">Project: {id}</Heading>
          </HStack>

          {/* Active Tools Selector */}
          <HStack spacing={2}>
            <ButtonGroup size="sm" isAttached variant="outline">
              <Button onClick={() => setActiveTool('select')} isActive={activeTool === 'select'}>Select</Button>
              <Button onClick={() => setActiveTool('text')} isActive={activeTool === 'text'}>Bubble Text</Button>
              <Button onClick={() => setActiveTool('crop')} isActive={activeTool === 'crop'}>Redraw</Button>
            </ButtonGroup>

            <Divider orientation="vertical" h="20px" mx={2} />

            <ButtonGroup size="sm" isAttached variant="outline">
              <IconButton aria-label="Zoom In" icon={<span>➕</span>} onClick={() => setZoom(Math.min(zoom + 10, 200))} />
              <Button isDisabled>{zoom}%</Button>
              <IconButton aria-label="Zoom Out" icon={<span>➖</span>} onClick={() => setZoom(Math.max(zoom - 10, 50))} />
            </ButtonGroup>
          </HStack>

          {/* Undo / Redo */}
          <HStack spacing={2}>
            <ButtonGroup size="sm" variant="outline">
              <IconButton aria-label="Undo" icon={<span>↩️</span>} onClick={handleUndo} isDisabled={historyIndex === 0} />
              <IconButton aria-label="Redo" icon={<span>↪️</span>} onClick={handleRedo} isDisabled={historyIndex === historySize - 1} />
            </ButtonGroup>
            <Button size="xs" colorScheme="blue">Save</Button>
          </HStack>
        </Flex>
      </Box>

      {/* Main Workspace Resizable Split Layout */}
      <Flex flex="1" overflow="hidden">
        
        {/* Left Side Panels (Pages & Layers stacked vertically) */}
        {showLeftPanel && (
          <Flex direction="column" h="100%">
            <Box flex="1" overflowY="auto" borderBottom="1px solid" borderColor="gray.200">
              <PagesPanel activePageId={activePageId} onSelectPage={(id) => setActivePageId(id)} />
            </Box>
            <Box flex="1" overflowY="auto">
              <LayersPanel activeLayerId={activeLayerId} onSelectLayer={(id) => setActiveLayerId(id)} />
            </Box>
          </Flex>
        )}

        {/* Center Canvas Workspace Area */}
        <Box flex="1" p={6} overflow="auto" display="flex" justifyContent="center" alignItems="center">
          <Box transform={`scale(${zoom / 100})`} transformOrigin="center" transition="transform 0.1s">
            <ComicCanvas />
          </Box>
        </Box>

        {/* Right Side Panel (Inspector Panel) */}
        {showRightPanel && (
          <InspectorPanel activeBubbleId={activeBubbleId} />
        )}

      </Flex>

      {/* Editor Status Bar */}
      <Box
        py={2}
        px={6}
        bg={colorMode === 'light' ? 'gray.100' : 'gray.800'}
        borderTop="1px solid"
        borderColor={colorMode === 'light' ? 'gray.200' : 'gray.700'}
        fontSize="xs"
        color="gray.500"
      >
        <Flex justify="space-between" align="center">
          <Text>Status: Ready</Text>
          <HStack spacing={4}>
            <Text cursor="pointer" onClick={() => setShowLeftPanel(!showLeftPanel)}>
              [Toggle Sidebar Panel]
            </Text>
            <Text cursor="pointer" onClick={() => setShowRightPanel(!showRightPanel)}>
              [Toggle Inspector]
            </Text>
            <Text>Selected Shape: {activeBubbleId}</Text>
          </HStack>
        </Flex>
      </Box>

    </Box>
  );
}

// Simple Divider import
import { Divider } from '@chakra-ui/react';
