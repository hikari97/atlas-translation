import React, { useState } from 'react';
import { Box, Button, ButtonGroup, Flex, Text as ChakraText } from '@chakra-ui/react';
import { Stage, Layer, Rect, Circle, Text as KonvaText } from 'react-konva';

export default function ComicCanvas() {
  const [shapes, setShapes] = useState<Array<{ id: string; type: 'rect' | 'circle'; x: number; y: number; color: string }>>([
    { id: '1', type: 'rect', x: 50, y: 50, color: '#3182ce' },
    { id: '2', type: 'circle', x: 250, y: 150, color: '#e53e3e' },
  ]);

  const addRect = () => {
    const id = Date.now().toString();
    setShapes([...shapes, { id, type: 'rect', x: 100, y: 100, color: '#38a169' }]);
  };

  const addCircle = () => {
    const id = Date.now().toString();
    setShapes([...shapes, { id, type: 'circle', x: 150, y: 150, color: '#dd6b20' }]);
  };

  const clearCanvas = () => {
    setShapes([]);
  };

  return (
    <Box p={4} borderWidth={1} borderRadius="lg" bg="white" boxShadow="md">
      <Flex justify="space-between" align="center" mb={4}>
        <ChakraText fontSize="lg" fontWeight="bold">Interactive Comic Canvas</ChakraText>
        <ButtonGroup size="sm" isAttached variant="outline">
          <Button onClick={addRect} colorScheme="blue">Add Rect</Button>
          <Button onClick={addCircle} colorScheme="orange">Add Circle</Button>
          <Button onClick={clearCanvas} colorScheme="red">Clear</Button>
        </ButtonGroup>
      </Flex>
      <Box border="1px solid" borderColor="gray.200" borderRadius="md" bg="gray.50" overflow="hidden">
        <Stage width={600} height={400}>
          <Layer>
            {shapes.map((shape) => {
              if (shape.type === 'rect') {
                return (
                  <Rect
                    key={shape.id}
                    x={shape.x}
                    y={shape.y}
                    width={100}
                    height={100}
                    fill={shape.color}
                    draggable
                  />
                );
              } else {
                return (
                  <Circle
                    key={shape.id}
                    x={shape.x}
                    y={shape.y}
                    radius={50}
                    fill={shape.color}
                    draggable
                  />
                );
              }
            })}
            <KonvaText text="Drag shapes to compose your comic canvas!" x={10} y={370} fontSize={16} fill="gray" />
          </Layer>
        </Stage>
      </Box>
    </Box>
  );
}
