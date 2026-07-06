import React, { useState, useEffect } from 'react';
import { Box, Flex, Text } from '@chakra-ui/react';
import { Stage, Layer, Rect, Text as KonvaText, Image as KonvaImage } from 'react-konva';

// ... (interfaces remain the same) ...

export interface BubbleItem {
  readonly _id: string;
  readonly originalText: string;
  readonly translatedText: string;
  readonly x: number;
  readonly y: number;
  readonly width: number;
  readonly height: number;
}

interface ComicCanvasProps {
  readonly imageUrl?: string;
  readonly zoom: number;
  readonly bubbles?: readonly BubbleItem[];
  readonly activeBubbleId?: string;
  readonly onSelectBubble?: (id: string | undefined) => void;
  readonly onDragBubbleEnd?: (id: string, x: number, y: number) => void;
}

export default function ComicCanvas({ imageUrl, zoom, bubbles = [], activeBubbleId, onSelectBubble, onDragBubbleEnd }: ComicCanvasProps) {
  const [imageObj, setImageObj] = useState<HTMLImageElement | undefined>(undefined);
  const [stageSize, setStageSize] = useState({ width: 600, height: 800 });

  // Use a local state for shapes that is derived from props
  const [localShapes, setLocalShapes] = useState(bubbles);

  useEffect(() => {
    setLocalShapes(bubbles);
  }, [bubbles]);


  useEffect(() => {
    if (!imageUrl) return;
    const img = new window.Image();
    img.src = imageUrl;
    img.onload = () => {
      setImageObj(img);
      setStageSize({ width: img.width, height: img.height });
    };
  }, [imageUrl]);

  const handleDragEnd = (id: string, e: any) => {
    if (onDragBubbleEnd) {
      onDragBubbleEnd(id, Math.round(e.target.x()), Math.round(e.target.y()));
    }
  };

  return (
    <Box p={4} borderWidth="1px" borderRadius="md" bg="gray.100">
      <Stage
        width={stageSize.width * (zoom / 100)}
        height={stageSize.height * (zoom / 100)}
        scaleX={zoom / 100}
        scaleY={zoom / 100}
      >
        <Layer>
          {imageObj && <KonvaImage image={imageObj} width={stageSize.width} height={stageSize.height} />}
          
          {localShapes.map((bubble) => {
            const isSelected = bubble._id === activeBubbleId;
            const displayText = bubble.translatedText || bubble.originalText || '...';
            
            return (
              <React.Fragment key={bubble._id}>
                {isSelected && <Rect x={bubble.x-2} y={bubble.y-2} width={bubble.width+4} height={bubble.height+4} stroke="blue" strokeWidth={2} />}
                <KonvaText
                  x={bubble.x}
                  y={bubble.y}
                  width={bubble.width}
                  height={bubble.height}
                  text={displayText}
                  fontSize={14}
                  fill={bubble.translatedText ? 'black' : 'gray'}
                  draggable
                  onClick={() => onSelectBubble && onSelectBubble(bubble._id)}
                  onDragEnd={(e) => handleDragEnd(bubble._id, e)}
                />
              </React.Fragment>
            );
          })}
        </Layer>
      </Stage>
    </Box>
  );
}
