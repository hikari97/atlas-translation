import React, { useState, useEffect } from 'react';
import { Box, Flex, VStack, HStack, Text } from '@chakra-ui/react';
import { Stage, Layer, Rect, Text as KonvaText, Image as KonvaImage } from 'react-konva';

interface KonvaDragEvent {
  readonly target: {
    x(): number;
    y(): number;
  };
}

export interface BubbleItem {
  readonly _id: string;
  readonly originalText: string;
  readonly translatedText: string;
  readonly x: number;
  readonly y: number;
  readonly width: number;
  readonly height: number;
  readonly status: string;
}

interface ComicCanvasProps {
  readonly imageUrl?: string;
  readonly zoom: number;
  readonly bubbles?: readonly BubbleItem[];
  readonly activeBubbleId?: string;
  readonly onSelectBubble?: (id: string | undefined) => void;
  readonly onDragBubbleEnd?: (id: string, x: number, y: number) => void;
}

export default function ComicCanvas({
  imageUrl,
  zoom,
  bubbles = [],
  activeBubbleId,
  onSelectBubble,
  onDragBubbleEnd,
}: ComicCanvasProps) {
  const [imageObj, setImageObj] = useState<HTMLImageElement | undefined>(undefined);
  const [stageSize, setStageSize] = useState({ width: 600, height: 800 });

  useEffect(() => {
    if (!imageUrl) {
      setImageObj(undefined);
      setStageSize({ width: 600, height: 800 });
      return;
    }
    const img = new window.Image();
    img.src = imageUrl;
    img.onload = () => {
      setImageObj(img);
      setStageSize({
        width: img.width,
        height: img.height
      });
    };
  }, [imageUrl]);

  const handleDragEnd = (id: string, e: KonvaDragEvent) => {
    if (onDragBubbleEnd) {
      onDragBubbleEnd(id, Math.round(e.target.x()), Math.round(e.target.y()));
    }
  };

  return (
    <Box p={5} borderWidth={1} borderRadius="lg" bg="white" w="100%">
      <Flex justify="space-between" align="center" mb={4} wrap="wrap" gap={3}>
        <VStack align="start" gap={0}>
          <Text fontSize="lg" fontWeight="bold">Interactive Comic Canvas Editor</Text>
          <Text fontSize="xs" color="gray.500">
            Click a bubble to select. Drag text to position. Use arrow keys to nudge.
          </Text>
        </VStack>
      </Flex>

      <Box
        borderWidth="1px"
        borderRadius="md"
        bg="gray.100"
        overflow="auto"
        p={4}
        maxH="650px"
        w="100%"
      >
        <Flex minH="100%" justify="center" align="flex-start" py={2}>
          <Stage
            width={stageSize.width * (zoom / 100)}
            height={stageSize.height * (zoom / 100)}
            scaleX={zoom / 100}
            scaleY={zoom / 100}
            style={{ background: '#fff', border: '1px solid #ddd', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)' }}
          >
            <Layer>
              {/* Background page image render */}
              {imageObj && (
                <KonvaImage
                  image={imageObj}
                  x={0}
                  y={0}
                  width={stageSize.width}
                  height={stageSize.height}
                />
              )}

              {/* Fallback Grid lines if no image loaded */}
              {!imageObj && Array.from({ length: 8 }).map((_, i) => (
                <Rect key={`grid-v-${i}`} x={i * 80} y={0} width={1} height={stageSize.height} fill="#f0f0f0" />
              ))}
              {!imageObj && Array.from({ length: 12 }).map((_, i) => (
                <Rect key={`grid-h-${i}`} x={0} y={i * 80} width={stageSize.width} height={1} fill="#f0f0f0" />
              ))}

              {/* Render real text bubbles from DB */}
              {bubbles.map((bubble) => {
                const isSelected = bubble._id === activeBubbleId;
                const displayText = bubble.translatedText || bubble.originalText || 'Empty Bubble';

                return (
                  <React.Fragment key={bubble._id}>
                    {/* Bounding box guide for selected bubble */}
                    {isSelected && (
                      <Rect
                        x={bubble.x - 4}
                        y={bubble.y - 4}
                        width={bubble.width + 8}
                        height={bubble.height + 8}
                        stroke="#3182ce"
                        strokeWidth={1}
                      />
                    )}

                    {/* Text Render */}
                    <KonvaText
                      x={bubble.x}
                      y={bubble.y}
                      width={bubble.width}
                      height={bubble.height}
                      text={displayText}
                      fontSize={16}
                      fontFamily="Arial"
                      fontStyle={bubble.translatedText ? 'normal' : 'italic'}
                      fill={bubble.translatedText ? '#000' : '#4a5568'}
                      draggable
                      onClick={() => onSelectBubble && onSelectBubble(bubble._id)}
                      onDragEnd={(e: KonvaDragEvent) => handleDragEnd(bubble._id, e)}
                    />
                  </React.Fragment>
                );
              })}
            </Layer>
          </Stage>
        </Flex>
      </Box>
    </Box>
  );
}
