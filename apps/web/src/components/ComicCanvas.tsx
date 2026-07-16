import React, { forwardRef, useEffect, useImperativeHandle, useRef, useState } from 'react';
import { Box, Center } from '@chakra-ui/react';
import type Konva from 'konva';
import { Stage, Layer, Rect, Text as KonvaText, Image as KonvaImage } from 'react-konva';
import type { BubbleTypographySettings } from '../lib/editor/typography';
import { DEFAULT_BUBBLE_TYPOGRAPHY } from '../lib/editor/typography';

const CANVAS_SELECTION_STROKE = '#2f86e9';
const CANVAS_PLACEHOLDER_FILL = '#6f7883';

export interface BubbleItem {
  readonly _id: string;
  readonly addFontBorder?: boolean;
  readonly originalText: string;
  readonly translatedText: string;
  readonly x: number;
  readonly y: number;
  readonly width: number;
  readonly height: number;
  readonly font?: string;
  readonly fontColor?: string;
  readonly fontSize?: number;
  readonly lineWidth?: number;
  readonly rotation?: number;
  readonly strokeColor?: string;
  readonly textAlign?: 'left' | 'center' | 'right';
}

interface ComicCanvasProps {
  readonly imageUrl?: string;
  readonly zoom: number;
  readonly bubbles?: readonly BubbleItem[];
  readonly activeBubbleId?: string;
  readonly emptyState?: React.ReactNode;
  readonly showBubbles?: boolean;
  readonly typographyOverrides?: Readonly<Record<string, BubbleTypographySettings>>;
  readonly onSelectBubble?: (id: string | undefined) => void;
  readonly onDragBubbleEnd?: (id: string, x: number, y: number) => void;
}

export interface ComicCanvasHandle {
  /** Downloads the current rendered canvas, including translated bubble text. */
  download: (filename: string) => void;
}

interface LoadedCanvasImage {
  readonly element: HTMLImageElement;
  readonly source: string;
}

const ComicCanvas = forwardRef<ComicCanvasHandle, ComicCanvasProps>(function ComicCanvas({
  imageUrl,
  zoom,
  bubbles = [],
  activeBubbleId,
  emptyState,
  showBubbles = true,
  typographyOverrides = {},
  onSelectBubble,
  onDragBubbleEnd,
}, ref) {
  const stageRef = useRef<Konva.Stage>(null);
  const [loadedImage, setLoadedImage] = useState<LoadedCanvasImage | undefined>(undefined);
  const [stageSize, setStageSize] = useState({ width: 600, height: 800 });

  useEffect(() => {
    setLoadedImage(undefined);

    if (!imageUrl) {
      return undefined;
    }

    let cancelled = false;
    const img = new window.Image();
    img.onload = () => {
      if (cancelled) {
        return;
      }

      setLoadedImage({ element: img, source: imageUrl });
      setStageSize({ width: img.width, height: img.height });
    };
    img.src = imageUrl;

    return () => {
      cancelled = true;
      img.onload = null;
    };
  }, [imageUrl]);

  const activeImage = loadedImage?.source === imageUrl ? loadedImage : undefined;

  const handleDragEnd = (id: string, event: Konva.KonvaEventObject<DragEvent>) => {
    if (onDragBubbleEnd) {
      onDragBubbleEnd(id, Math.round(event.target.x()), Math.round(event.target.y()));
    }
  };

  useImperativeHandle(ref, () => ({
    download: (filename: string) => {
      const stage = stageRef.current;

      if (!stage) {
        return;
      }

      const link = document.createElement('a');
      link.download = filename;
      link.href = stage.toDataURL({ pixelRatio: 1 / stage.scaleX() });
      link.click();
    },
  }), []);

  if (!imageUrl) {
    return (
      <Center h="full" minH={0} w="full">
        {emptyState}
      </Center>
    );
  }

  return (
    <Box
      aria-label="Comic preview scroll area"
      h="full"
      minH={0}
      overflow="auto"
      p={{ base: 2, md: 3, lg: 4, xl: 8 }}
      role="region"
      w="full"
    >
      <Box minH="full" minW="max-content" mx="auto" w="fit-content">
        <Box
          bg="var(--editor-surface)"
          borderColor="var(--editor-border)"
          borderRadius="18px"
          borderWidth="1px"
          boxShadow="var(--editor-shadow)"
          overflow="hidden"
        >
          <Stage
            height={stageSize.height * (zoom / 100)}
            ref={stageRef}
            scaleX={zoom / 100}
            scaleY={zoom / 100}
            width={stageSize.width * (zoom / 100)}
          >
            <Layer>
              {activeImage && (
                <KonvaImage
                  image={activeImage.element}
                  key={activeImage.source}
                  width={stageSize.width}
                  height={stageSize.height}
                />
              )}

              {showBubbles && bubbles.map((bubble) => {
                const isSelected = bubble._id === activeBubbleId;
                const displayText = bubble.translatedText || bubble.originalText || '...';
                const typography = typographyOverrides[bubble._id];
                const fontFamily = typography?.fontFamily || bubble.font || DEFAULT_BUBBLE_TYPOGRAPHY.fontFamily;
                const fontSize = typography?.fontSize || bubble.fontSize || DEFAULT_BUBBLE_TYPOGRAPHY.fontSize;
                const fontColor = typography?.fontColor || bubble.fontColor || DEFAULT_BUBBLE_TYPOGRAPHY.fontColor;
                const textAlign = typography?.textAlign || bubble.textAlign || DEFAULT_BUBBLE_TYPOGRAPHY.textAlign;

                return (
                  <React.Fragment key={bubble._id}>
                    {isSelected && (
                      <Rect
                        dash={[8, 4]}
                        height={bubble.height + 8}
                        stroke={CANVAS_SELECTION_STROKE}
                        strokeWidth={2}
                        width={bubble.width + 8}
                        x={bubble.x - 4}
                        y={bubble.y - 4}
                      />
                    )}
                    <KonvaText
                      draggable
                      align={textAlign}
                      fill={bubble.translatedText ? fontColor : CANVAS_PLACEHOLDER_FILL}
                      fontFamily={fontFamily}
                      fontSize={fontSize}
                      fontStyle="600"
                      height={bubble.height}
                      lineHeight={1.22}
                      onClick={() => onSelectBubble && onSelectBubble(bubble._id)}
                      onDragEnd={(event) => handleDragEnd(bubble._id, event)}
                      padding={2}
                      rotation={bubble.rotation || 0}
                      stroke={bubble.addFontBorder ? bubble.strokeColor : undefined}
                      strokeWidth={bubble.addFontBorder ? bubble.lineWidth || 0 : 0}
                      text={displayText}
                      width={bubble.width}
                      x={bubble.x}
                      y={bubble.y}
                    />
                  </React.Fragment>
                );
              })}
            </Layer>
          </Stage>
        </Box>
      </Box>
    </Box>
  );
});

ComicCanvas.displayName = 'ComicCanvas';

export default ComicCanvas;
