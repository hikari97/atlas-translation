import React, { useState, useEffect } from 'react';
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
  ProgressRoot,
  ProgressTrack,
  ProgressRange,
  Badge,
} from '@chakra-ui/react';
import Link from 'next/link';

import PagesPanel from '../../components/editor/PagesPanel';
import LayersPanel from '../../components/editor/LayersPanel';
import InspectorPanel from '../../components/editor/InspectorPanel';

import { useProjectDetailQuery, usePagesQuery, useBubblesQuery, useJobStatusQuery } from '../../lib/data/fetchHooks';
import { useTriggerOcrMutation, useTriggerTranslationMutation, useUpdateBubbleMutation } from '../../lib/data/mutationHooks';
import { useQueryClient } from '@tanstack/react-query';

const ComicCanvas = dynamic(() => import('../../components/ComicCanvas'), {
  ssr: false,
  loading: () => <Box p={8} textAlign="center">Loading Editor Canvas...</Box>,
});

export default function EditorWorkspacePage() {
  const router = useRouter();
  const { id } = router.query;
  const projectId = id as string;
  const queryClient = useQueryClient();

  // Panels visibility state
  const [showLeftPanel, setShowLeftPanel] = useState(true);
  const [showRightPanel, setShowRightPanel] = useState(true);
  const [activeTool, setActiveTool] = useState<'select' | 'text' | 'crop'>('select');
  const [zoom, setZoom] = useState(100);

  // Navigation states
  const [activePageId, setActivePageId] = useState<string | undefined>(undefined);
  const [activeLayerId, setActiveLayerId] = useState<string | undefined>('1');
  const [activeBubbleId, setActiveBubbleId] = useState<string | undefined>(undefined);

  // Active Job states for Polling
  const [activeJobId, setActiveJobId] = useState<string>('');
  const [pollingEnabled, setPollingEnabled] = useState(false);

  // API Queries
  const { data: project } = useProjectDetailQuery(projectId);
  const { data: pages } = usePagesQuery(projectId);
  const { data: bubbles } = useBubblesQuery(activePageId || "");
  const { data: jobStatus } = useJobStatusQuery(activeJobId, pollingEnabled);

  // API Mutations
  const ocrMutation = useTriggerOcrMutation();
  const translateMutation = useTriggerTranslationMutation();
  const updateBubbleMutation = useUpdateBubbleMutation();

  // Auto select first page on load
  useEffect(() => {
    if (pages && pages.length > 0 && !activePageId) {
      setActivePageId(pages[0]._id);
    }
  }, [pages, activePageId]);

  // Handle Polling termination and cache invalidation
  useEffect(() => {
    if (jobStatus) {
      if (jobStatus.status === 'completed') {
        setPollingEnabled(false);
        setActiveJobId('');
        queryClient.invalidateQueries({ queryKey: ['bubbles', activePageId] });
        queryClient.invalidateQueries({ queryKey: ['pages', projectId] });
      } else if (jobStatus.status === 'failed') {
        setPollingEnabled(false);
        setActiveJobId('');
      }
    }
  }, [jobStatus, queryClient, activePageId, projectId]);

  const handleOcrTrigger = async () => {
    if (!activePageId) return;
    try {
      const res = await ocrMutation.mutateAsync({ pageId: activePageId });
      setActiveJobId(res.jobId);
      setPollingEnabled(true);
    } catch (err) {
      console.error('Failed to trigger OCR:', err);
    }
  };

  const handleTranslationTrigger = async () => {
    if (!activePageId) return;
    try {
      const res = await translateMutation.mutateAsync({ pageId: activePageId, targetLanguage: 'id' });
      setActiveJobId(res.jobId);
      setPollingEnabled(true);
    } catch (err) {
      console.error('Failed to trigger translation:', err);
    }
  };


  // Get active page image URL
  const activePage = pages?.find(p => p._id === activePageId);
  const imageUrl = activePage?.image ? `http://localhost:3001${activePage.image}` : undefined;


  const handleDragBubbleEnd = async (bubbleId: string, x: number, y: number) => {
    try {
      await updateBubbleMutation.mutateAsync({ id: bubbleId, x, y });
      queryClient.invalidateQueries({ queryKey: ['bubbles', activePageId] });
    } catch (err) {
      console.error('Failed to update bubble position:', err);
    }
  };

  return (
    <Box minH="100vh" display="flex" flexDirection="column" bg="gray.50">
      <Head>
        <title>Editor Workspace — Atlas Studio</title>
      </Head>

      {/* Editor Sub-Header (Toolbar / Control Bar) */}
      <Box py={3} px={6} bg="white" borderBottom="1px solid" borderColor="gray.200">
        <Flex justify="space-between" align="center" wrap="wrap" gap={3}>
          <HStack gap={4}>
            <Link href="/dashboard/projects" passHref>
              <Button size="xs" variant="ghost">⬅ Back to Projects</Button>
            </Link>
            <Heading size="xs" color="gray.500">Project: {project?.name}</Heading>
          </HStack>

          {/* AI Workflow Action Buttons */}
          <HStack gap={2}>
            <Button
              size="xs"
              colorScheme="blue"
              onClick={handleOcrTrigger}
              loading={ocrMutation.isPending || (pollingEnabled && jobStatus?.type === 'ocr')}
              disabled={!activePageId}
            >
              🔍 Detect Text (OCR)
            </Button>
            <Button
              size="xs"
              colorScheme="green"
              onClick={handleTranslationTrigger}
              loading={translateMutation.isPending || (pollingEnabled && jobStatus?.type === 'translation')}
              disabled={!activePageId}
            >
              🔀 Auto Translate
            </Button>
          </HStack>

          {/* Active Tools Selector */}
          <HStack gap={2}>
            <ButtonGroup size="sm" variant="outline">
              <Button onClick={() => setActiveTool('select')} variant={activeTool === 'select' ? 'solid' : 'outline'}>Select</Button>
              <Button onClick={() => setActiveTool('text')} variant={activeTool === 'text' ? 'solid' : 'outline'}>Bubble Text</Button>
            </ButtonGroup>
            <ButtonGroup size="xs" variant="outline">
              <Button onClick={() => setZoom(Math.max(zoom - 10, 50))} disabled={zoom <= 50}>Zoom -</Button>
              <Button disabled>{zoom}%</Button>
              <Button onClick={() => setZoom(Math.min(zoom + 10, 200))} disabled={zoom >= 200}>Zoom +</Button>
            </ButtonGroup>
          </HStack>
        </Flex>

        {/* Polling Progress Bar */}
        {pollingEnabled && jobStatus && (
          <Box mt={2}>
            <HStack justify="space-between" mb={1} fontSize="xs">
              <Text>Processing {jobStatus.type.toUpperCase()} Job...</Text>
              <Badge colorScheme="blue">{jobStatus.progress}%</Badge>
            </HStack>
            <ProgressRoot value={jobStatus.progress} max={100}>
              <ProgressTrack h="6px"><ProgressRange /></ProgressTrack>
            </ProgressRoot>
          </Box>
        )}
      </Box>

      {/* Main Workspace Split Layout */}
      <Flex flex="1" overflow="hidden">
        {/* Left Side Panels */}
        {showLeftPanel && (
          <Flex direction="column" h="100%">
            <Box flex="1" overflowY="auto" borderBottom="1px solid" borderColor="gray.200">
              <PagesPanel projectId={projectId} pages={pages} activePageId={activePageId} onSelectPage={(id: string) => setActivePageId(id)} />
            </Box>
            <Box flex="1" overflowY="auto">
              <LayersPanel activeLayerId={activeLayerId} onSelectLayer={(id: string | undefined) => setActiveLayerId(id)} />
            </Box>
          </Flex>
        )}

        {/* Center Canvas Workspace Area */}
        <Box flex="1" p={6} overflow="auto" display="flex" justifyContent="center" alignItems="center">
          <Box w="100%">
            <ComicCanvas imageUrl={imageUrl} zoom={zoom} bubbles={bubbles} activeBubbleId={activeBubbleId} onSelectBubble={(id) => setActiveBubbleId(id)} onDragBubbleEnd={handleDragBubbleEnd} />
          </Box>
        </Box>

        {/* Right Side Panel (Inspector Panel) */}
        {showRightPanel && (
          <InspectorPanel activeBubbleId={activeBubbleId} onUpdateText={async (id: string, text: string) => { try { await updateBubbleMutation.mutateAsync({ id, translatedText: text, status: 'translated' }); queryClient.invalidateQueries({ queryKey: ['bubbles', activePageId] }); } catch (err) { console.error(err); } }} />
        )}
      </Flex>
    </Box>
  );
}
