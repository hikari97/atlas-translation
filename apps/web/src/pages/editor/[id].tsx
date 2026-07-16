import React, { useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import dynamic from 'next/dynamic';
import {
  Box,
  Button,
  Flex,
  Grid,
  Heading,
  HStack,
  IconButton,
  Text,
  VStack,
} from '@chakra-ui/react';
import {
  LuDownload,
  LuFileImage,
  LuLanguages,
  LuPlus,
  LuSettings,
  LuX,
  LuZoomIn,
  LuZoomOut,
} from 'react-icons/lu';
import EditorSidePanel from '../../components/editor/EditorSidePanel';
import TranslateSettingsPanel from '../../components/editor/TranslateSettingsPanel';
import type { ComicCanvasHandle } from '../../components/ComicCanvas';
import { translateImageStateless } from '../../lib/data/statelessTranslation';
import type { BubbleTextAlign, BubbleTypographySettings } from '../../lib/editor/typography';
import { DEFAULT_BUBBLE_TYPOGRAPHY, clampBubbleFontSize } from '../../lib/editor/typography';
import type {
  EditorBubble,
  EditorPage,
  EditorWorkspaceCommand,
  EditorWorkspaceState,
} from '../../lib/editor/workspace';
import {
  AddEditorPagesCommand,
  ApplyTranslationResultCommand,
  RemoveEditorPageCommand,
  SetPageStatusCommand,
  UpdateEditorBubbleCommand,
} from '../../lib/editor/workspace';

const ComicCanvas = dynamic(() => import('../../components/ComicCanvas'), {
  ssr: false,
  loading: () => (
    <Box color="var(--editor-muted)" p={8} textAlign="center">
      Loading editor canvas...
    </Box>
  ),
});

type EditorTool = 'settings' | 'translate' | 'download' | 'close';

const toolItems: readonly {
  readonly id: EditorTool;
  readonly label: string;
  readonly icon: React.ComponentType<{ readonly size?: number }>;
}[] = [
  { id: 'settings', label: 'Settings', icon: LuSettings },
  { id: 'translate', label: 'Translate', icon: LuLanguages },
  { id: 'download', label: 'Download PNG', icon: LuDownload },
  { id: 'close', label: 'Close image', icon: LuX },
];

function getBubbleTypography(
  bubble: EditorBubble | undefined,
  override: BubbleTypographySettings | undefined,
): BubbleTypographySettings {
  return {
    fontFamily: override?.fontFamily || bubble?.font || DEFAULT_BUBBLE_TYPOGRAPHY.fontFamily,
    fontSize: override?.fontSize || bubble?.fontSize || DEFAULT_BUBBLE_TYPOGRAPHY.fontSize,
    fontColor: override?.fontColor || bubble?.fontColor || DEFAULT_BUBBLE_TYPOGRAPHY.fontColor,
    textAlign: override?.textAlign || bubble?.textAlign || DEFAULT_BUBBLE_TYPOGRAPHY.textAlign,
  };
}

export default function EditorWorkspacePage() {
  const router = useRouter();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const canvasRef = useRef<ComicCanvasHandle>(null);
  const objectUrlsRef = useRef<string[]>([]);

  const [workspace, setWorkspace] = useState<EditorWorkspaceState>({ pages: [] });
  const [activeTool, setActiveTool] = useState<EditorTool>('settings');
  const [showSettingsPanel, setShowSettingsPanel] = useState(false);
  const [zoom, setZoom] = useState(100);
  const [previewMode, setPreviewMode] = useState<'original' | 'translated'>('original');
  const [provider, setProvider] = useState('gemini');
  const [targetLanguage, setTargetLanguage] = useState('id');
  const [activePageId, setActivePageId] = useState<string | undefined>(undefined);
  const [activeBubbleId, setActiveBubbleId] = useState<string | undefined>(undefined);
  const [isTranslating, setIsTranslating] = useState(false);
  const [translationError, setTranslationError] = useState<string | undefined>(undefined);
  const [draftText, setDraftText] = useState<{ readonly bubbleId: string | undefined; readonly text: string }>({
    bubbleId: undefined,
    text: '',
  });
  const [bubbleTypographyOverrides, setBubbleTypographyOverrides] = useState<
    Readonly<Record<string, BubbleTypographySettings>>
  >({});

  const pages = workspace.pages;
  const selectedPageId = activePageId || pages[0]?._id;
  const activePage = pages.find((page) => page._id === selectedPageId);
  const bubbles = activePage?.bubbles || [];
  const activeBubble = bubbles.find((bubble) => bubble._id === activeBubbleId);
  const translatedDraft = draftText.bubbleId === activeBubble?._id
    ? draftText.text
    : activeBubble?.translatedText || '';
  const activeBubbleTypography = getBubbleTypography(
    activeBubble,
    activeBubble ? bubbleTypographyOverrides[activeBubble._id] : undefined,
  );
  const translatedBackgroundUrl = activePage?.inpaintedImageUrl;
  const isTranslatedPreview = previewMode === 'translated' && Boolean(translatedBackgroundUrl);
  const imageUrl = isTranslatedPreview ? translatedBackgroundUrl : activePage?.image;
  const jobStatus = isTranslating
    ? { message: 'AI Worker sedang memproses gambar', progress: 55 }
    : undefined;

  const executeCommand = (command: EditorWorkspaceCommand) => {
    setWorkspace((currentState) => command.execute(currentState));
  };

  useEffect(() => {
    if (router.isReady && !localStorage.getItem('token')) {
      void router.replace('/auth/login');
    }
  }, [router]);

  useEffect(() => {
    const objectUrls = objectUrlsRef.current;
    return () => objectUrls.forEach((url) => URL.revokeObjectURL(url));
  }, []);

  const openUploadDialog = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = event.target.files;

    if (!selectedFiles || selectedFiles.length === 0) {
      return;
    }

    const sortedFiles = Array.from(selectedFiles).sort((left, right) => (
      left.name.localeCompare(right.name, undefined, { numeric: true, sensitivity: 'base' })
    ));

    const newPages: EditorPage[] = sortedFiles.map((file, index) => {
      const imageUrl = URL.createObjectURL(file);
      objectUrlsRef.current.push(imageUrl);

      return {
        _id: crypto.randomUUID(),
        bubbles: [],
        file,
        fileName: file.name,
        image: imageUrl,
        pageNumber: pages.length + index + 1,
        status: 'pending',
      };
    });

    executeCommand(new AddEditorPagesCommand(newPages));
    setActivePageId((currentPageId) => currentPageId || newPages[0]?._id);
    setTranslationError(undefined);

    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleTranslationTrigger = async () => {
    if (!activePage || isTranslating) {
      return;
    }

    setIsTranslating(true);
    setTranslationError(undefined);
    executeCommand(new SetPageStatusCommand(activePage._id, 'processing'));

    try {
      const result = await translateImageStateless({
        file: activePage.file,
        provider,
        targetLanguage,
      });
      executeCommand(new ApplyTranslationResultCommand(
        activePage._id,
        result.text,
        result.inpainted,
      ));
      setPreviewMode('translated');
    } catch (error) {
      executeCommand(new SetPageStatusCommand(activePage._id, 'failed'));
      setTranslationError(error instanceof Error ? error.message : 'Image translation failed.');
    } finally {
      setIsTranslating(false);
    }
  };

  const handleDownload = () => {
    const pageNumber = activePage?.pageNumber || 1;
    canvasRef.current?.download(`atlas-page-${pageNumber}.png`);
  };

  const handleClosePage = (pageId: string) => {
    const pageIndex = pages.findIndex((page) => page._id === pageId);

    if (pageIndex < 0) {
      return;
    }

    const page = pages[pageIndex];
    const fallbackPage = pages[pageIndex + 1] || pages[pageIndex - 1];

    if (page.image.startsWith('blob:')) {
      URL.revokeObjectURL(page.image);
      const objectUrlIndex = objectUrlsRef.current.indexOf(page.image);

      if (objectUrlIndex >= 0) {
        objectUrlsRef.current.splice(objectUrlIndex, 1);
      }
    }

    executeCommand(new RemoveEditorPageCommand(pageId));

    if (selectedPageId === pageId) {
      setActivePageId(fallbackPage?._id);
      setActiveBubbleId(undefined);
      setPreviewMode(fallbackPage?.status === 'translated' ? 'translated' : 'original');
      setTranslationError(undefined);
    }
  };

  const handleToolClick = async (tool: EditorTool) => {
    setActiveTool(tool);

    if (tool === 'settings') {
      setShowSettingsPanel((value) => !value);
      return;
    }

    if (tool === 'translate') {
      await handleTranslationTrigger();
      return;
    }

    if (tool === 'download') {
      handleDownload();
      return;
    }

    if (tool === 'close' && selectedPageId) {
      handleClosePage(selectedPageId);
    }
  };

  const handleDragBubbleEnd = (bubbleId: string, x: number, y: number) => {
    if (selectedPageId) {
      executeCommand(new UpdateEditorBubbleCommand(selectedPageId, bubbleId, { x, y }));
    }
  };

  const handleUpdateText = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    if (!activeBubble || !selectedPageId) {
      return;
    }

    const value = event.target.value;
    setDraftText({ bubbleId: activeBubble._id, text: value });
    executeCommand(new UpdateEditorBubbleCommand(
      selectedPageId,
      activeBubble._id,
      { translatedText: value },
    ));
  };

  const updateActiveBubbleTypography = (nextTypography: Partial<BubbleTypographySettings>) => {
    if (!activeBubble) {
      return;
    }

    setBubbleTypographyOverrides((currentOverrides) => ({
      ...currentOverrides,
      [activeBubble._id]: {
        ...getBubbleTypography(activeBubble, currentOverrides[activeBubble._id]),
        ...nextTypography,
      },
    }));
  };

  const handleUpdateFontFamily = (fontFamily: string) => {
    if (!activeBubble || !selectedPageId) {
      return;
    }

    updateActiveBubbleTypography({ fontFamily });
    executeCommand(new UpdateEditorBubbleCommand(
      selectedPageId,
      activeBubble._id,
      { font: fontFamily },
    ));
  };

  const handleUpdateFontSize = (fontSize: number) => {
    if (!activeBubble || !selectedPageId) {
      return;
    }

    const nextFontSize = clampBubbleFontSize(fontSize);
    updateActiveBubbleTypography({ fontSize: nextFontSize });
    executeCommand(new UpdateEditorBubbleCommand(
      selectedPageId,
      activeBubble._id,
      { fontSize: nextFontSize },
    ));
  };

  const handleUpdateFontColor = (fontColor: string) => {
    updateActiveBubbleTypography({ fontColor });
  };

  const handleUpdateTextAlign = (textAlign: BubbleTextAlign) => {
    updateActiveBubbleTypography({ textAlign });
  };

  return (
    <Box
      bg="var(--editor-bg)"
      color="var(--editor-text)"
      display="flex"
      flexDirection="column"
      h="100dvh"
      overflow="hidden"
    >
      <Head>
        <title>Atlas AI Translator</title>
      </Head>

      <Flex
        as="header"
        align={{ base: 'stretch', md: 'center' }}
        bg="var(--editor-bg)"
        borderBottomColor="var(--editor-border)"
        borderBottomWidth="1px"
        direction={{ base: 'column', md: 'row' }}
        gap={3}
        justify="space-between"
        px={{ base: 3, lg: 5 }}
        py={{ base: 2, md: 3 }}
        flexShrink={0}
      >
        <HStack gap={3}>
          <Box
            alignItems="center"
            bg="var(--editor-primary)"
            borderRadius="12px"
            color="white"
            display="flex"
            fontSize="sm"
            fontWeight="950"
            h="2.6rem"
            justifyContent="center"
            letterSpacing="-0.04em"
            w="2.6rem"
          >
            AT
          </Box>
          <Box minW={0}>
            <Heading color="var(--editor-text)" fontSize={{ base: 'xl', md: '2xl' }} letterSpacing="-0.04em" lineHeight="1">
              Atlas AI Translator
            </Heading>
            <Text color="var(--editor-muted)" fontSize="sm" lineClamp={1} mt={1}>
              Upload, translate, edit, and download from one workspace.
            </Text>
          </Box>
        </HStack>

        <HStack gap={2} justify={{ base: 'space-between', md: 'flex-end' }} wrap="wrap">
          <Text
            bg="var(--editor-surface)"
            borderColor="var(--editor-border)"
            borderRadius="12px"
            borderWidth="1px"
            color="var(--editor-muted)"
            fontSize="xs"
            fontWeight="800"
            px={3}
            py={2}
          >
            Direct editor
          </Text>
        </HStack>
      </Flex>

      <Grid
        flex="1"
        gap={{ base: 2, md: 3, lg: 4 }}
        gridTemplateAreas={{
          base: '"tools" "canvas" "panel"',
          lg: '"tools canvas" "panel panel"',
          xl: '"tools canvas rail"',
        }}
        minH={0}
        overflow="hidden"
        p={{ base: 2, md: 3, lg: 5 }}
        templateColumns={{ base: '1fr', lg: '4.25rem minmax(0, 1fr)', xl: '4.25rem minmax(0, 1fr) 20rem' }}
        templateRows={{ base: 'auto minmax(0, 1fr) minmax(10rem, 12rem)', lg: 'minmax(0, 1fr) 12rem', xl: 'minmax(0, 1fr)' }}
      >
        <Flex
          as="nav"
          bg="var(--editor-surface)"
          borderColor="var(--editor-border)"
          borderRadius="18px"
          borderWidth="1px"
          boxShadow="var(--editor-shadow)"
          direction={{ base: 'row', lg: 'column' }}
          gap={2}
          gridArea="tools"
          h={{ base: 'auto', lg: 'fit-content' }}
          justify="center"
          p={{ base: 1.5, lg: 2 }}
          flexShrink={0}
          wrap={{ base: 'wrap', lg: 'nowrap' }}
        >
          {toolItems.map((tool) => {
            const Icon = tool.icon;
            const active = tool.id === 'settings' ? showSettingsPanel : activeTool === tool.id;

            return (
              <IconButton
                key={tool.id}
                aria-label={tool.label}
                bg={active ? 'var(--editor-primary-soft)' : 'transparent'}
                borderColor={active ? 'var(--editor-primary)' : 'transparent'}
                borderRadius="14px"
                borderWidth="1px"
                color={active ? 'var(--editor-primary)' : 'var(--editor-muted)'}
                disabled={tool.id !== 'settings' && !selectedPageId}
                h={{ base: '2.55rem', md: '2.75rem', lg: '3rem' }}
                onClick={() => void handleToolClick(tool.id)}
                size="sm"
                transition="all 180ms ease"
                w={{ base: '2.55rem', md: '2.75rem', lg: '3rem' }}
                _hover={{ bg: 'var(--editor-surface-soft)', color: 'var(--editor-text)' }}
              >
                <Icon size={20} />
              </IconButton>
            );
          })}
        </Flex>

        <Box gridArea="canvas" minH={0} minW={0} position="relative">
          <Box
            bg="var(--editor-surface)"
            borderColor="var(--editor-border)"
            borderRadius="26px"
            borderWidth="1px"
            boxShadow="var(--editor-shadow)"
            h="full"
            minH={0}
            overflow="hidden"
            p={{ base: 2, md: 3, xl: 4 }}
            position="relative"
          >
            <Box
              borderColor="var(--editor-border)"
              borderRadius="20px"
              borderStyle="dashed"
              borderWidth="1px"
              h="full"
              minH={0}
              overflow="hidden"
              position="relative"
            >
              <HStack
                bg="var(--editor-surface-raised)"
                borderColor="var(--editor-border)"
                borderRadius="14px"
                borderWidth="1px"
                boxShadow="var(--editor-floating-shadow)"
                left="50%"
                p={1}
                position="absolute"
                top={4}
                transform="translateX(-50%)"
                zIndex={3}
              >
                <Button
                  bg={previewMode === 'original' ? 'var(--editor-primary-soft)' : 'transparent'}
                  color={previewMode === 'original' ? 'var(--editor-primary)' : 'var(--editor-muted)'}
                  fontWeight="850"
                  minW="7.5rem"
                  onClick={() => setPreviewMode('original')}
                  size="sm"
                  variant="plain"
                >
                  Original
                </Button>
                <Button
                  bg={previewMode === 'translated' ? 'var(--editor-primary-soft)' : 'transparent'}
                  color={previewMode === 'translated' ? 'var(--editor-primary)' : 'var(--editor-muted)'}
                  disabled={!translatedBackgroundUrl}
                  fontWeight="800"
                  minW="7.5rem"
                  onClick={() => setPreviewMode('translated')}
                  size="sm"
                  variant="plain"
                >
                  Translated
                </Button>
              </HStack>

              <TranslateSettingsPanel
                open={showSettingsPanel}
                onClose={() => setShowSettingsPanel(false)}
                onProviderChange={setProvider}
                onTargetLanguageChange={setTargetLanguage}
                provider={provider}
                targetLanguage={targetLanguage}
              />

              {translationError && imageUrl && (
                <Box
                  bg="var(--editor-surface-raised)"
                  borderColor="var(--atlas-danger)"
                  borderRadius="12px"
                  borderWidth="1px"
                  bottom={4}
                  color="var(--atlas-danger)"
                  fontSize="sm"
                  left={4}
                  maxW="min(32rem, calc(100% - 8rem))"
                  p={3}
                  position="absolute"
                  zIndex={4}
                >
                  {translationError}
                </Box>
              )}

              <ComicCanvas
                ref={canvasRef}
                activeBubbleId={activeBubbleId}
                bubbles={bubbles}
                emptyState={
                  <VStack color="var(--editor-muted)" gap={4} px={4} textAlign="center">
                    <Box color="var(--editor-subtle)">
                      <LuFileImage size={52} />
                    </Box>
                    <Box>
                      <Text color="var(--editor-text)" fontSize="lg" fontWeight="850">
                        Pilih gambar untuk mulai translate
                      </Text>
                      <Text color="var(--editor-muted)" fontSize="sm" mt={1}>
                        Gambar hanya disimpan di memori browser selama editor terbuka.
                      </Text>
                      {translationError && (
                        <Text color="var(--atlas-danger)" fontSize="sm">
                          {translationError}
                        </Text>
                      )}
                    </Box>
                    <Button
                      bg="var(--editor-primary)"
                      borderRadius="12px"
                      className="atlas-button-motion"
                      color="white"
                      fontWeight="850"
                      onClick={openUploadDialog}
                      size="md"
                      _hover={{ bg: 'var(--editor-primary-hover)' }}
                    >
                      <LuPlus /> Add images
                    </Button>
                  </VStack>
                }
                imageUrl={imageUrl}
                onDragBubbleEnd={handleDragBubbleEnd}
                onSelectBubble={setActiveBubbleId}
                showBubbles={isTranslatedPreview}
                typographyOverrides={bubbleTypographyOverrides}
                zoom={zoom}
              />

              <HStack bottom={4} position="absolute" right={4} zIndex={3}>
                <IconButton
                  aria-label="Zoom out"
                  bg="var(--editor-surface-raised)"
                  borderColor="var(--editor-border)"
                  borderRadius="999px"
                  borderWidth="1px"
                  boxShadow="var(--editor-floating-shadow)"
                  color="var(--editor-text)"
                  onClick={() => setZoom(Math.max(zoom - 10, 50))}
                  size="sm"
                >
                  <LuZoomOut size={18} />
                </IconButton>
                <Text
                  bg="var(--editor-surface-raised)"
                  borderColor="var(--editor-border)"
                  borderRadius="999px"
                  borderWidth="1px"
                  color="var(--editor-muted)"
                  fontSize="xs"
                  fontVariantNumeric="tabular-nums"
                  fontWeight="800"
                  px={3}
                  py={2}
                >
                  {zoom}%
                </Text>
                <IconButton
                  aria-label="Zoom in"
                  bg="var(--editor-surface-raised)"
                  borderColor="var(--editor-border)"
                  borderRadius="999px"
                  borderWidth="1px"
                  boxShadow="var(--editor-floating-shadow)"
                  color="var(--editor-text)"
                  onClick={() => setZoom(Math.min(zoom + 10, 200))}
                  size="sm"
                >
                  <LuZoomIn size={18} />
                </IconButton>
              </HStack>
            </Box>
          </Box>
        </Box>

        <EditorSidePanel
          activeBubble={activeBubble}
          bubbleTypography={activeBubbleTypography}
          display={{ base: 'block', xl: 'none' }}
          gridArea="panel"
          isTranslating={isTranslating}
          isUploading={false}
          jobStatus={jobStatus}
          layout="tabs"
          onClosePage={handleClosePage}
          onDownload={handleDownload}
          onOpenUpload={openUploadDialog}
          onSelectPage={setActivePageId}
          onTranslate={() => void handleTranslationTrigger()}
          onUpdateFontColor={handleUpdateFontColor}
          onUpdateFontFamily={(fontFamily) => void handleUpdateFontFamily(fontFamily)}
          onUpdateFontSize={(fontSize) => void handleUpdateFontSize(fontSize)}
          onUpdateText={handleUpdateText}
          onUpdateTextAlign={handleUpdateTextAlign}
          pages={pages}
          pollingEnabled={isTranslating}
          selectedPageId={selectedPageId}
          translatedDraft={translatedDraft}
        />

        <EditorSidePanel
          activeBubble={activeBubble}
          bubbleTypography={activeBubbleTypography}
          display={{ base: 'none', xl: 'flex' }}
          gridArea="rail"
          isTranslating={isTranslating}
          isUploading={false}
          jobStatus={jobStatus}
          layout="rail"
          onClosePage={handleClosePage}
          onDownload={handleDownload}
          onOpenUpload={openUploadDialog}
          onSelectPage={setActivePageId}
          onTranslate={() => void handleTranslationTrigger()}
          onUpdateFontColor={handleUpdateFontColor}
          onUpdateFontFamily={(fontFamily) => void handleUpdateFontFamily(fontFamily)}
          onUpdateFontSize={(fontSize) => void handleUpdateFontSize(fontSize)}
          onUpdateText={handleUpdateText}
          onUpdateTextAlign={handleUpdateTextAlign}
          pages={pages}
          pollingEnabled={isTranslating}
          selectedPageId={selectedPageId}
          translatedDraft={translatedDraft}
        />
      </Grid>

      <input
        ref={fileInputRef}
        accept="image/*"
        hidden
        multiple
        onChange={handleFileChange}
        type="file"
      />
    </Box>
  );
}
