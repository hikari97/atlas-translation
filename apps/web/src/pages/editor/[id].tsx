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
import { useTriggerTranslationMutation, useUpdateBubbleMutation } from '../../lib/data/mutationHooks';
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

  const [showLeftPanel, setShowLeftPanel] = useState(true);
  const [showRightPanel, setShowRightPanel] = useState(true);
  const [activeTool, setActiveTool] = useState<'select' | 'text' | 'crop'>('select');
  const [zoom, setZoom] = useState(100);
  const [targetLanguage, setTargetLanguage] = useState('id');

  const [activePageId, setActivePageId] = useState<string | undefined>(undefined);
  const [activeBubbleId, setActiveBubbleId] = useState<string | undefined>(undefined);
  const [activeLayerId, setActiveLayerId] = useState<string | undefined>('1');
  const [activeJobId, setActiveJobId] = useState<string>('');
  const [pollingEnabled, setPollingEnabled] = useState(false);

  const { data: project } = useProjectDetailQuery(projectId);
  const { data: pages } = usePagesQuery(projectId);
  const { data: bubbles } = useBubblesQuery(activePageId || '');
  const { data: jobStatus } = useJobStatusQuery(activeJobId, pollingEnabled);
  const translateMutation = useTriggerTranslationMutation();
  const updateBubbleMutation = useUpdateBubbleMutation();

  const activeBubble = bubbles?.find(b => b._id === activeBubbleId);

  useEffect(() => {
    if (pages && pages.length > 0 && !activePageId) {
      setActivePageId(pages[0]._id);
    }
  }, [pages, activePageId]);

  useEffect(() => {
    if (jobStatus) {
      if (jobStatus.status === 'completed' || jobStatus.status === 'failed') {
        setPollingEnabled(false);
        setActiveJobId('');
        queryClient.invalidateQueries({ queryKey: ['bubbles', activePageId] });
        queryClient.invalidateQueries({ queryKey: ['pages', projectId] });
      }
    }
  }, [jobStatus, queryClient, activePageId, projectId]);

  const handleTranslationTrigger = async () => {
    if (!activePageId) return;
    try {
      const res = await translateMutation.mutateAsync({ pageId: activePageId, targetLanguage });
      setActiveJobId(res.jobId);
      setPollingEnabled(true);
    } catch (err) {
      console.error('Failed to trigger translation:', err);
    }
  };
  
  const handleDragBubbleEnd = async (bubbleId: string, x: number, y: number) => {
    await updateBubbleMutation.mutateAsync({ id: bubbleId, x, y });
  };
  
  const handleUpdateText = async (id: string, text: string) => {
    await updateBubbleMutation.mutateAsync({ id, translatedText: text });
    queryClient.invalidateQueries({ queryKey: ['bubbles', activePageId] });
  };

  const imageUrl = pages?.find(p => p._id === activePageId)?.image ? `http://localhost:3001${pages.find(p => p._id === activePageId)?.image}` : undefined;

  return (
    <Box minH="100vh" display="flex" flexDirection="column" bg="gray.50">
      <Head><title>Editor Workspace</title></Head>

      {/* Editor Sub-Header (Toolbar / Control Bar) */}
      <Box py={3} px={6} bg="white" borderBottomWidth="1px">
        <Flex justify="space-between" align="center">
          <HStack><Link href="/dashboard/projects"><Button size="xs">Back</Button></Link><Heading size="xs">{project?.name}</Heading></HStack>
          
          <HStack gap={2}>
            <Button
              size="xs"
              colorScheme="blue"
              onClick={handleTranslationTrigger}
              loading={translateMutation.isPending || pollingEnabled}
              disabled={!activePageId}
            >
              🔀 Auto Translate
            </Button>
            <select value={targetLanguage} onChange={(e) => setTargetLanguage(e.target.value)} style={{"fontSize":"12px","padding":"4px"}}><option value="id">ID</option><option value="en">EN</option></select>
          </HStack>
          
          <HStack>
            <ButtonGroup size="sm" variant="outline">
              <Button onClick={() => setActiveTool('select')} variant={activeTool === 'select' ? 'solid' : 'outline'}>Select</Button>
              <Button onClick={() => setActiveTool('text')} variant={activeTool === 'text' ? 'solid' : 'outline'}>Bubble Text</Button>
            </ButtonGroup>
            <IconButton aria-label="Zoom In" size="sm" onClick={() => setZoom(Math.min(zoom + 10, 200))}>➕</IconButton>
            <IconButton aria-label="Zoom Out" size="sm" onClick={() => setZoom(Math.max(zoom - 10, 50))}>➖</IconButton>
          </HStack>
        </Flex>
        {pollingEnabled && jobStatus && <ProgressRoot value={jobStatus.progress} size="xs"><ProgressTrack><ProgressRange /></ProgressTrack></ProgressRoot>}
      </Box>

      <Flex flex="1" overflow="hidden">
        {showLeftPanel && <Flex direction="column"><PagesPanel projectId={projectId} pages={pages} activePageId={activePageId} onSelectPage={setActivePageId} /><LayersPanel activeLayerId={activeLayerId} onSelectLayer={setActiveLayerId} /></Flex>}
        <Box flex="1" p={6} overflow="auto"><ComicCanvas imageUrl={imageUrl} zoom={zoom} bubbles={bubbles} activeBubbleId={activeBubbleId} onSelectBubble={setActiveBubbleId} onDragBubbleEnd={handleDragBubbleEnd} /></Box>
        {showRightPanel && <InspectorPanel bubble={activeBubble} onUpdateText={handleUpdateText} />}
      </Flex>
    </Box>
  );
}
