import React, { useState, useEffect } from 'react';
import { Box, Button, ButtonGroup, Flex, Text as ChakraText, VStack, HStack, Slider, SliderTrack, SliderFilledTrack, SliderThumb } from '@chakra-ui/react';
import { Stage, Layer, Rect, Circle, Text as KonvaText } from 'react-konva';

interface KonvaDragEvent {
  readonly target: {
    x(): number;
    y(): number;
  };
}

interface Shape {
  readonly id: string;
  readonly type: 'rect' | 'circle' | 'text';
  readonly x: number;
  readonly y: number;
  readonly width?: number;
  readonly height?: number;
  readonly radius?: number;
  readonly text?: string;
  readonly color: string;
}

export default function ComicCanvas() {
  const [shapes, setShapes] = useState<readonly Shape[]>([
    { id: '1', type: 'rect', x: 80, y: 80, width: 120, height: 80, color: '#3182ce' },
    { id: '2', type: 'circle', x: 300, y: 150, radius: 50, color: '#e53e3e' },
    { id: '3', type: 'text', x: 50, y: 280, text: 'Translate this speech bubble!', color: '#2d3748' },
  ]);

  const [selectedId, setSelectedId] = useState<string | undefined>(undefined);
  const [zoom, setZoom] = useState(100);

  const addRect = () => {
    const id = Date.now().toString();
    setShapes([...shapes, { id, type: 'rect', x: 100, y: 100, width: 100, height: 100, color: '#38a169' }]);
  };

  const addCircle = () => {
    const id = Date.now().toString();
    setShapes([...shapes, { id, type: 'circle', x: 150, y: 150, radius: 45, color: '#dd6b20' }]);
  };

  const addText = () => {
    const id = Date.now().toString();
    setShapes([...shapes, { id, type: 'text', x: 120, y: 120, text: 'New Speech Bubble', color: '#1a202c' }]);
  };

  const handleDragEnd = (id: string, e: KonvaDragEvent) => {
    setShapes((prev) =>
      prev.map((shape) => {
        if (shape.id === id) {
          return {
            ...shape,
            x: e.target.x(),
            y: e.target.y(),
          };
        }
        return shape;
      })
    );
  };

  // Keyboard Nudge movement handler (TASK-009)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!selectedId) return;
      const step = e.shiftKey ? 10 : 2; // move faster if shift is held
      
      setShapes((prev) =>
        prev.map((shape) => {
          if (shape.id === selectedId) {
            let dx = 0;
            let dy = 0;
            if (e.key === 'ArrowUp') dy = -step;
            else if (e.key === 'ArrowDown') dy = step;
            else if (e.key === 'ArrowLeft') dx = -step;
            else if (e.key === 'ArrowRight') dx = step;
            
            if (dx !== 0 || dy !== 0) {
              e.preventDefault();
              return {
                ...shape,
                x: shape.x + dx,
                y: shape.y + dy,
              };
            }
          }
          return shape;
        })
      );
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [selectedId]);

  return (
    <Box p={5} borderWidth={1} borderRadius="lg" bg="white" boxShadow="md" w="100%">
      <Flex justify="space-between" align="center" mb={4} wrap="wrap" gap={3}>
        <VStack align="start" spacing={0}>
          <ChakraText fontSize="lg" fontWeight="bold">Interactive Comic Canvas Editor</ChakraText>
          <ChakraText fontSize="xs" color="gray.500">
            Drag items to position. Click to select. Use arrow keys to nudge.
          </ChakraText>
        </VStack>
        
        <HStack spacing={4}>
          <HStack spacing={2}>
            <ChakraText fontSize="xs">Zoom</ChakraText>
            <Slider aria-label="zoom-slider" min={50} max={150} value={zoom} onChange={(val) => setZoom(val)} w="100px">
              <SliderTrack>
                <SliderFilledTrack />
              </SliderTrack>
              <SliderThumb />
            </Slider>
            <ChakraText fontSize="xs" fontWeight="bold">{zoom}%</ChakraText>
          </HStack>

          <ButtonGroup size="sm" isAttached variant="outline">
            <Button onClick={addRect} colorScheme="blue">Add Rect</Button>
            <Button onClick={addCircle} colorScheme="orange">Add Circle</Button>
            <Button onClick={addText} colorScheme="purple">Add Text</Button>
            <Button onClick={() => setShapes([])} colorScheme="red">Clear</Button>
          </ButtonGroup>
        </HStack>
      </Flex>

      <Box
        border="1px solid"
        borderColor="gray.200"
        borderRadius="md"
        bg="gray.100"
        overflow="auto"
        p={4}
        display="flex"
        justifyContent="center"
        alignItems="center"
        minH="450px"
      >
        <Box transform={`scale(${zoom / 100})`} transformOrigin="center" transition="transform 0.1s">
          <Stage width={600} height={400} style={{ background: '#fff', border: '1px solid #ddd' }}>
            <Layer>
              {/* Background grids */}
              {Array.from({ length: 8 }).map((_, i) => (
                <Rect key={`grid-v-${i}`} x={i * 80} y={0} width={1} height={400} fill="#f0f0f0" />
              ))}
              {Array.from({ length: 6 }).map((_, i) => (
                <Rect key={`grid-h-${i}`} x={0} y={i * 80} width={600} height={1} fill="#f0f0f0" />
              ))}

              {shapes.map((shape) => {
                const isSelected = shape.id === selectedId;
                
                // Get bounding box dimensions for rendering selection guides (TASK-004)
                const w = shape.type === 'rect' ? (shape.width ?? 100) : shape.type === 'circle' ? (shape.radius ?? 40) * 2 : 150;
                const h = shape.type === 'rect' ? (shape.height ?? 100) : shape.type === 'circle' ? (shape.radius ?? 40) * 2 : 25;
                const offsetX = shape.type === 'circle' ? -(shape.radius ?? 40) : 0;
                const offsetY = shape.type === 'circle' ? -(shape.radius ?? 40) : 0;

                return (
                  <React.Fragment key={shape.id}>
                    {/* Bounding Box Visual Guide (dashed border) */}
                    {isSelected && (
                      <Rect
                        x={shape.x + offsetX - 4}
                        y={shape.y + offsetY - 4}
                        width={w + 8}
                        height={h + 8}
                        stroke="#3182ce"
                        strokeWidth={1}
                        dash={[4, 4]}
                      />
                    )}

                    {/* Original shape */}
                    {shape.type === 'rect' ? (
                      <Rect
                        x={shape.x}
                        y={shape.y}
                        width={shape.width ?? 100}
                        height={shape.height ?? 100}
                        fill={shape.color}
                        draggable
                        onClick={() => setSelectedId(shape.id)}
                        onDragEnd={(e: KonvaDragEvent) => handleDragEnd(shape.id, e)}
                      />
                    ) : shape.type === 'circle' ? (
                      <Circle
                        x={shape.x}
                        y={shape.y}
                        radius={shape.radius ?? 40}
                        fill={shape.color}
                        draggable
                        onClick={() => setSelectedId(shape.id)}
                        onDragEnd={(e: KonvaDragEvent) => handleDragEnd(shape.id, e)}
                      />
                    ) : (
                      <KonvaText
                        x={shape.x}
                        y={shape.y}
                        text={shape.text ?? ''}
                        fontSize={18}
                        fontStyle="bold"
                        fill={shape.color}
                        draggable
                        onClick={() => setSelectedId(shape.id)}
                        onDragEnd={(e: KonvaDragEvent) => handleDragEnd(shape.id, e)}
                      />
                    )}

                    {/* Transform Handles - 4 Corner Resize Grips (TASK-005) */}
                    {isSelected && (
                      <>
                        {/* Top-Left */}
                        <Rect x={shape.x + offsetX - 7} y={shape.y + offsetY - 7} width={6} height={6} fill="#fff" stroke="#3182ce" strokeWidth={1} />
                        {/* Top-Right */}
                        <Rect x={shape.x + offsetX + w + 1} y={shape.y + offsetY - 7} width={6} height={6} fill="#fff" stroke="#3182ce" strokeWidth={1} />
                        {/* Bottom-Left */}
                        <Rect x={shape.x + offsetX - 7} y={shape.y + offsetY + h + 1} width={6} height={6} fill="#fff" stroke="#3182ce" strokeWidth={1} />
                        {/* Bottom-Right */}
                        <Rect x={shape.x + offsetX + w + 1} y={shape.y + offsetY + h + 1} width={6} height={6} fill="#fff" stroke="#3182ce" strokeWidth={1} />
                      </>
                    )}
                  </React.Fragment>
                );
              })}
            </Layer>
          </Stage>
        </Box>
      </Box>
    </Box>
  );
}
