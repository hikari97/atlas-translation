import type { ChangeEvent, ReactNode } from 'react';
import {
  Box,
  Button,
  Field,
  Grid,
  HStack,
  IconButton,
  Input,
  NativeSelect,
  ProgressRange,
  ProgressRoot,
  ProgressTrack,
  Tabs,
  Text,
  Textarea,
  VStack,
  type BoxProps,
} from '@chakra-ui/react';
import { LuDownload, LuImage, LuLanguages, LuPlus, LuX } from 'react-icons/lu';

import type {
  BubbleTextAlign,
  BubbleTypographySettings,
} from '../../lib/editor/typography';
import type { EditorBubble, EditorPage } from '../../lib/editor/workspace';
import {
  BUBBLE_FONT_FAMILIES,
  BUBBLE_FONT_SIZE_MAX,
  BUBBLE_FONT_SIZE_MIN,
  BUBBLE_TEXT_ALIGNMENTS,
  clampBubbleFontSize,
  isBubbleTextAlign,
} from '../../lib/editor/typography';
import StatusBadge from '../ui/StatusBadge';

type EditorPanelTabValue = 'actions' | 'pages' | 'bubble';

interface EditorPanelTab {
  readonly content: ReactNode;
  readonly count?: number;
  readonly label: string;
  readonly minW: string;
  readonly value: EditorPanelTabValue;
}

interface EditorSidePanelProps extends Omit<BoxProps, 'direction'> {
  readonly layout: 'rail' | 'tabs';
  readonly activeBubble: EditorBubble | undefined;
  readonly jobStatus: EditorProcessStatus | undefined;
  readonly pages: readonly EditorPage[] | undefined;
  readonly pollingEnabled: boolean;
  readonly selectedPageId: string | undefined;
  readonly bubbleTypography: BubbleTypographySettings;
  readonly translatedDraft: string;
  readonly isTranslating: boolean;
  readonly isUploading: boolean;
  readonly onOpenUpload: () => void;
  readonly onDownload: () => void;
  readonly onClosePage: (pageId: string) => void;
  readonly onSelectPage: (pageId: string) => void;
  readonly onTranslate: () => void;
  readonly onUpdateFontColor: (fontColor: string) => void;
  readonly onUpdateFontFamily: (fontFamily: string) => void;
  readonly onUpdateFontSize: (fontSize: number) => void;
  readonly onUpdateTextAlign: (textAlign: BubbleTextAlign) => void;
  readonly onUpdateText: (event: ChangeEvent<HTMLTextAreaElement>) => void;
}

interface EditorProcessStatus {
  readonly message: string;
  readonly progress: number;
}

function SidePanelCard({ children, p = 4, ...props }: BoxProps) {
  return (
    <Box
      bg="var(--editor-surface)"
      borderColor="var(--editor-border)"
      borderRadius="18px"
      borderWidth="1px"
      boxShadow="var(--editor-shadow)"
      p={p}
      {...props}
    >
      {children}
    </Box>
  );
}

function EditorTabTrigger({
  count,
  label,
  minW,
  value,
}: Omit<EditorPanelTab, 'content'>) {
  return (
    <Tabs.Trigger
      borderRadius="10px"
      color="var(--editor-muted)"
      flex="1"
      fontSize="sm"
      fontWeight="850"
      minW={minW}
      px={3}
      py={2}
      value={value}
      _selected={{
        bg: 'var(--editor-surface-raised)',
        boxShadow: 'var(--editor-shadow)',
        color: 'var(--editor-text)',
      }}
    >
      {label}
      {typeof count === 'number' ? ` (${count})` : null}
    </Tabs.Trigger>
  );
}

function EditorPanelTabs({
  defaultValue,
  tabs,
}: {
  readonly defaultValue: EditorPanelTabValue;
  readonly tabs: readonly EditorPanelTab[];
}) {
  return (
    <Tabs.Root
      defaultValue={defaultValue}
      display="flex"
      flexDirection="column"
      h="full"
      minH={0}
    >
      <Tabs.List
        bg="var(--editor-surface-soft)"
        borderColor="var(--editor-border)"
        borderRadius="14px"
        borderWidth="1px"
        flexShrink={0}
        gap={1}
        overflowX="auto"
        p={1}
      >
        {tabs.map((tab) => (
          <EditorTabTrigger
            count={tab.count}
            key={tab.value}
            label={tab.label}
            minW={tab.minW}
            value={tab.value}
          />
        ))}
      </Tabs.List>

      {tabs.map((tab) => (
        <Tabs.Content
          flex="1"
          key={tab.value}
          minH={0}
          overflowY="auto"
          pt={3}
          value={tab.value}
        >
          {tab.content}
        </Tabs.Content>
      ))}
    </Tabs.Root>
  );
}

function ActionsPanel({
  jobStatus,
  pollingEnabled,
  selectedPageId,
  isTranslating,
  isUploading,
  onOpenUpload,
  onDownload,
  onTranslate,
}: Pick<
  EditorSidePanelProps,
  | 'jobStatus'
  | 'pollingEnabled'
  | 'selectedPageId'
  | 'isTranslating'
  | 'isUploading'
  | 'onOpenUpload'
  | 'onDownload'
  | 'onTranslate'
>) {
  return (
    <VStack
      align="stretch"
      gap={3}
    >
      <Grid
        gap={3}
        templateColumns={{ base: 'repeat(2, minmax(0, 1fr))', xl: '1fr' }}
      >
        <Button
          bg="var(--editor-primary)"
          borderRadius="12px"
          color="white"
          disabled={!selectedPageId}
          fontWeight="850"
          loading={isTranslating || pollingEnabled}
          onClick={onTranslate}
          size={{ base: 'md', xl: 'lg' }}
          _hover={{ bg: 'var(--editor-primary-hover)' }}
        >
          <LuLanguages /> Translate
        </Button>
        <Button
          borderColor="var(--editor-border-strong)"
          borderRadius="12px"
          color="var(--editor-text)"
          disabled={!selectedPageId}
          fontWeight="850"
          onClick={onDownload}
          size={{ base: 'md', xl: 'lg' }}
          variant="outline"
        >
          <LuDownload /> Download
        </Button>
      </Grid>

      <Button
        bg="var(--editor-surface-soft)"
        borderColor="var(--editor-border)"
        borderRadius="12px"
        borderWidth="1px"
        color="var(--editor-text)"
        fontWeight="850"
        h={{ base: '2.9rem', xl: '2.85rem' }}
        loading={isUploading}
        onClick={onOpenUpload}
        variant="plain"
        _hover={{
          bg: 'var(--editor-primary-soft)',
          borderColor: 'var(--editor-primary)',
        }}
      >
        <LuPlus /> Add images
      </Button>

      {pollingEnabled && jobStatus && (
        <Box>
          <HStack
            justify="space-between"
            mb={1}
          >
            <Text
              color="var(--editor-muted)"
              fontSize="xs"
              lineClamp={1}
            >
              {jobStatus.message || 'Processing translation'}
            </Text>
            <Text
              color="var(--editor-muted)"
              fontSize="xs"
              fontVariantNumeric="tabular-nums"
            >
              {jobStatus.progress}%
            </Text>
          </HStack>
          <ProgressRoot
            value={jobStatus.progress}
            size="xs"
          >
            <ProgressTrack
              bg="var(--editor-surface-soft)"
              borderRadius="999px"
            >
              <ProgressRange
                bg="var(--editor-primary)"
                borderRadius="999px"
              />
            </ProgressTrack>
          </ProgressRoot>
        </Box>
      )}
    </VStack>
  );
}

function PagesPanel({
  pages,
  selectedPageId,
  onClosePage,
  onSelectPage,
}: Pick<
  EditorSidePanelProps,
  'pages' | 'selectedPageId' | 'onClosePage' | 'onSelectPage'
>) {
  return (
    <VStack
      align="stretch"
      gap={3}
      h="full"
      minH={0}
    >
      <HStack
        justify="space-between"
        flexShrink={0}
      >
        <HStack
          color="var(--editor-muted)"
          gap={2}
        >
          <LuImage size={18} />
          <Text
            fontSize="sm"
            fontWeight="850"
          >
            Pages
          </Text>
        </HStack>
        <Text
          color="var(--editor-subtle)"
          fontSize="xs"
          fontVariantNumeric="tabular-nums"
        >
          {pages?.length || 0}
        </Text>
      </HStack>

      {pages && pages.length > 0 ? (
        <VStack
          align="stretch"
          gap={2}
          minH={0}
          overflowY="auto"
          pr={1}
        >
          {pages.map((page) => {
            const selected = page._id === selectedPageId;

            return (
              <Box
                key={page._id}
                bg={
                  selected
                    ? 'var(--editor-primary-soft)'
                    : 'var(--editor-surface-soft)'
                }
                borderColor={selected ? 'var(--editor-primary)' : 'transparent'}
                borderRadius="14px"
                borderWidth="1px"
                cursor="pointer"
                onClick={() => onSelectPage(page._id)}
                p={{ base: 2.5, xl: 3 }}
                transition="all 180ms ease"
                _hover={{ borderColor: 'var(--editor-primary)' }}
              >
                <HStack
                  align="flex-start"
                  justify="space-between"
                >
                  <Box minW={0}>
                    <Text
                      color="var(--editor-text)"
                      fontSize="sm"
                      fontWeight="850"
                    >
                      Page {page.pageNumber}
                    </Text>
                    <Text
                      color="var(--editor-muted)"
                      fontSize="xs"
                      lineClamp={1}
                    >
                      {page.fileName}
                    </Text>
                  </Box>
                  <HStack gap={1}>
                    <StatusBadge status={page.status} />
                    <IconButton
                      aria-label={`Close ${page.fileName}`}
                      borderRadius="8px"
                      color="var(--editor-muted)"
                      onClick={(event) => {
                        event.stopPropagation();
                        onClosePage(page._id);
                      }}
                      size="xs"
                      variant="ghost"
                      _hover={{
                        bg: 'rgba(180, 35, 24, 0.10)',
                        color: 'var(--atlas-danger)',
                      }}
                    >
                      <LuX size={15} />
                    </IconButton>
                  </HStack>
                </HStack>
              </Box>
            );
          })}
        </VStack>
      ) : (
        <VStack
          color="var(--editor-muted)"
          flex="1"
          justify="center"
          minH="5rem"
        >
          <Text>Belum ada halaman.</Text>
        </VStack>
      )}
    </VStack>
  );
}

function BubblePanel({
  activeBubble,
  bubbleTypography,
  translatedDraft,
  onUpdateFontColor,
  onUpdateFontFamily,
  onUpdateFontSize,
  onUpdateTextAlign,
  onUpdateText,
}: Pick<
  EditorSidePanelProps,
  | 'activeBubble'
  | 'bubbleTypography'
  | 'translatedDraft'
  | 'onUpdateFontColor'
  | 'onUpdateFontFamily'
  | 'onUpdateFontSize'
  | 'onUpdateTextAlign'
  | 'onUpdateText'
>) {
  const handleFontSizeChange = (event: ChangeEvent<HTMLInputElement>) => {
    onUpdateFontSize(clampBubbleFontSize(Number(event.target.value)));
  };

  const handleFontColorChange = (event: ChangeEvent<HTMLInputElement>) => {
    onUpdateFontColor(event.target.value);
  };

  const handleFontFamilyChange = (event: ChangeEvent<HTMLSelectElement>) => {
    onUpdateFontFamily(event.target.value);
  };

  const handleTextAlignChange = (event: ChangeEvent<HTMLSelectElement>) => {
    if (isBubbleTextAlign(event.target.value)) {
      onUpdateTextAlign(event.target.value);
    }
  };

  if (!activeBubble) {
    return (
      <VStack
        color="var(--editor-muted)"
        h="full"
        justify="center"
        minH="5.5rem"
        textAlign="center"
      >
        <Text fontSize="sm">Pilih bubble di preview untuk mengedit teks.</Text>
      </VStack>
    );
  }

  return (
    <VStack
      align="stretch"
      gap={4}
      px={2}
    >
      <HStack
        justify="space-between"
        mb={3}
      >
        <Text
          color="var(--editor-text)"
          fontSize="sm"
          fontWeight="850"
        >
          Selected bubble
        </Text>
        <StatusBadge status={activeBubble.status} />
      </HStack>
      <Field.Root>
        <Field.Label color="var(--editor-muted)">Translation</Field.Label>
        <Textarea
          borderColor="var(--editor-border-strong)"
          borderRadius="12px"
          minH={{ base: '4.8rem', xl: '7rem' }}
          onChange={onUpdateText}
          value={translatedDraft}
        />
      </Field.Root>

      <VStack
        align="stretch"
        bg="var(--editor-surface-soft)"
        borderColor="var(--editor-border)"
        borderRadius="14px"
        borderWidth="1px"
        gap={3}
        p={3}
      >
        <Text
          color="var(--editor-text)"
          fontSize="sm"
          fontWeight="850"
        >
          Typography
        </Text>

        <Grid
          gap={3}
          templateColumns={{ base: '1fr', sm: '1fr 1fr', xl: '1fr' }}
        >
          <Field.Root>
            <Field.Label
              color="var(--editor-muted)"
              fontSize="xs"
              fontWeight="800"
            >
              Font family
            </Field.Label>
            <NativeSelect.Root size="sm">
              <NativeSelect.Field
                borderColor="var(--editor-border-strong)"
                borderRadius="10px"
                onChange={handleFontFamilyChange}
                value={bubbleTypography.fontFamily}
              >
                {BUBBLE_FONT_FAMILIES.map((fontFamily) => (
                  <option
                    key={fontFamily}
                    value={fontFamily}
                  >
                    {fontFamily}
                  </option>
                ))}
              </NativeSelect.Field>
              <NativeSelect.Indicator />
            </NativeSelect.Root>
          </Field.Root>

          <Field.Root>
            <Field.Label
              color="var(--editor-muted)"
              fontSize="xs"
              fontWeight="800"
            >
              Font size
            </Field.Label>
            <Input
              borderColor="var(--editor-border-strong)"
              borderRadius="10px"
              max={BUBBLE_FONT_SIZE_MAX}
              min={BUBBLE_FONT_SIZE_MIN}
              onChange={handleFontSizeChange}
              size="sm"
              type="number"
              value={bubbleTypography.fontSize}
            />
          </Field.Root>
        </Grid>

        <Grid
          gap={3}
          templateColumns={{ base: '1fr', sm: '1fr 1fr', xl: '1fr' }}
        >
          <Field.Root>
            <Field.Label
              color="var(--editor-muted)"
              fontSize="xs"
              fontWeight="800"
            >
              Font color
            </Field.Label>
            <HStack>
              <Input
                borderColor="var(--editor-border-strong)"
                borderRadius="10px"
                h="2.25rem"
                onChange={handleFontColorChange}
                p={1}
                type="color"
                value={bubbleTypography.fontColor}
                w="3.25rem"
              />
              <Input
                borderColor="var(--editor-border-strong)"
                borderRadius="10px"
                readOnly
                size="sm"
                value={bubbleTypography.fontColor}
              />
            </HStack>
          </Field.Root>

          <Field.Root>
            <Field.Label
              color="var(--editor-muted)"
              fontSize="xs"
              fontWeight="800"
            >
              Font align
            </Field.Label>
            <NativeSelect.Root size="sm">
              <NativeSelect.Field
                borderColor="var(--editor-border-strong)"
                borderRadius="10px"
                onChange={handleTextAlignChange}
                value={bubbleTypography.textAlign}
              >
                {BUBBLE_TEXT_ALIGNMENTS.map((textAlign) => (
                  <option
                    key={textAlign}
                    value={textAlign}
                  >
                    {textAlign}
                  </option>
                ))}
              </NativeSelect.Field>
              <NativeSelect.Indicator />
            </NativeSelect.Root>
          </Field.Root>
        </Grid>
      </VStack>
    </VStack>
  );
}

export default function EditorSidePanel({
  layout,
  activeBubble,
  jobStatus,
  pages,
  pollingEnabled,
  selectedPageId,
  bubbleTypography,
  translatedDraft,
  isTranslating,
  isUploading,
  onOpenUpload,
  onDownload,
  onClosePage,
  onSelectPage,
  onTranslate,
  onUpdateFontColor,
  onUpdateFontFamily,
  onUpdateFontSize,
  onUpdateTextAlign,
  onUpdateText,
  ...containerProps
}: EditorSidePanelProps) {
  const actionsPanel = (
    <ActionsPanel
      isTranslating={isTranslating}
      isUploading={isUploading}
      jobStatus={jobStatus}
      onOpenUpload={onOpenUpload}
      onDownload={onDownload}
      onTranslate={onTranslate}
      pollingEnabled={pollingEnabled}
      selectedPageId={selectedPageId}
    />
  );
  const pagesPanel = (
    <PagesPanel
      onClosePage={onClosePage}
      onSelectPage={onSelectPage}
      pages={pages}
      selectedPageId={selectedPageId}
    />
  );
  const bubblePanel = (
    <BubblePanel
      activeBubble={activeBubble}
      bubbleTypography={bubbleTypography}
      onUpdateFontColor={onUpdateFontColor}
      onUpdateFontFamily={onUpdateFontFamily}
      onUpdateFontSize={onUpdateFontSize}
      onUpdateText={onUpdateText}
      onUpdateTextAlign={onUpdateTextAlign}
      translatedDraft={translatedDraft}
    />
  );
  const mobileTabs: readonly EditorPanelTab[] = [
    {
      content: actionsPanel,
      label: 'Actions',
      minW: '6.75rem',
      value: 'actions',
    },
    {
      content: pagesPanel,
      count: pages?.length || 0,
      label: 'Pages',
      minW: '7.5rem',
      value: 'pages',
    },
    {
      content: bubblePanel,
      label: 'Bubble',
      minW: '6.75rem',
      value: 'bubble',
    },
  ];
  const desktopTabs: readonly EditorPanelTab[] = [
    {
      content: pagesPanel,
      count: pages?.length || 0,
      label: 'Pages',
      minW: '7.5rem',
      value: 'pages',
    },
    {
      content: bubblePanel,
      label: 'Selected bubble',
      minW: '9.75rem',
      value: 'bubble',
    },
  ];

  if (layout === 'tabs') {
    return (
      <SidePanelCard
        minH={0}
        overflow="hidden"
        p={2}
        {...containerProps}
      >
        <EditorPanelTabs
          defaultValue="actions"
          tabs={mobileTabs}
        />
      </SidePanelCard>
    );
  }

  return (
    <VStack
      align="stretch"
      gap={4}
      minH={0}
      minW={0}
      overflow="hidden"
      {...containerProps}
    >
      <SidePanelCard flexShrink={0}>{actionsPanel}</SidePanelCard>

      <SidePanelCard
        flex={1}
        minH={0}
        overflow="hidden"
        p={2}
      >
        <EditorPanelTabs
          defaultValue="pages"
          tabs={desktopTabs}
        />
      </SidePanelCard>
    </VStack>
  );
}
