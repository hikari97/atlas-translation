import React, { useState } from 'react';
import {
  Box,
  VStack,
  Text,
  Heading,
  Input,
  Select,
  Textarea,
  HStack,
  Badge,
  useColorMode,
  FormControl,
  FormLabel,
  Progress,
  Button,
} from '@chakra-ui/react';

interface BubbleDetail {
  readonly id: string;
  readonly originalText: string;
  readonly translatedText: string;
  readonly confidence: number;
  readonly status: 'pending' | 'translating' | 'review' | 'approved';
  readonly fontPreset: string;
  readonly comments: string;
}

interface InspectorPanelProps {
  readonly activeBubbleId: string | undefined;
  readonly onUpdateText?: (id: string, text: string) => void;
}

export default function InspectorPanel({ activeBubbleId, onUpdateText }: InspectorPanelProps) {
  const { colorMode } = useColorMode();
  
  // Local state representing the active bubble metadata
  const [bubble, setBubble] = useState<BubbleDetail>({
    id: activeBubbleId ?? 'bubble-123',
    originalText: '俺が退治してやる！ (Ore ga taiji shite yaru!)',
    translatedText: 'I will destroy them myself!',
    confidence: 96,
    status: 'review',
    fontPreset: 'Action Bold',
    comments: 'Needs action italic font preset adjustment.',
  });

  const handleTextChange = (val: string) => {
    setBubble({ ...bubble, translatedText: val });
    if (onUpdateText && activeBubbleId) {
      onUpdateText(activeBubbleId, val);
    }
  };

  return (
    <Box
      w="300px"
      bg={colorMode === 'light' ? 'white' : 'gray.800'}
      borderLeft="1px solid"
      borderColor={colorMode === 'light' ? 'gray.200' : 'gray.700'}
      p={4}
      overflowY="auto"
    >
      <Heading size="xs" textTransform="uppercase" color="gray.500" mb={4}>
        Bubble Inspector
      </Heading>
      
      <VStack align="stretch" spacing={4} fontSize="sm">
        
        {/* State Status Badge */}
        <Box>
          <Text fontSize="xs" color="gray.500" mb={1}>Active Bubble ID</Text>
          <HStack justify="space-between">
            <Text fontWeight="mono" fontSize="xs">{bubble.id}</Text>
            <Badge
              colorScheme={
                bubble.status === 'approved'
                  ? 'green'
                  : bubble.status === 'review'
                  ? 'orange'
                  : 'blue'
              }
            >
              {bubble.status}
            </Badge>
          </HStack>
        </Box>

        <Divider borderColor="gray.100" />

        {/* OCR Confidence Rating (TASK-011) */}
        <Box>
          <HStack justify="space-between" mb={1} fontSize="xs">
            <Text fontWeight="semibold" color="gray.500">OCR Confidence</Text>
            <Text fontWeight="bold" color="green.600">{bubble.confidence}%</Text>
          </HStack>
          <Progress value={bubble.confidence} size="xs" colorScheme="green" borderRadius="md" />
        </Box>

        {/* Original Text Box (TASK-004) */}
        <FormControl>
          <FormLabel fontSize="xs" fontWeight="bold" color="gray.500">Original Text (OCR)</FormLabel>
          <Textarea
            value={bubble.originalText}
            isReadOnly
            size="sm"
            bg="gray.50"
            fontSize="xs"
            borderRadius="md"
            rows={2}
          />
        </FormControl>

        {/* Translated Text Editor Box (TASK-005) */}
        <FormControl>
          <FormLabel fontSize="xs" fontWeight="bold" color="gray.500">Translated Translation</FormLabel>
          <Textarea
            value={bubble.translatedText}
            onChange={(e) => handleTextChange(e.target.value)}
            placeholder="Type translation here..."
            size="sm"
            fontSize="xs"
            borderRadius="md"
            rows={3}
          />
        </FormControl>

        {/* Font Presets & Status Selector (TASK-007) */}
        <FormControl>
          <FormLabel fontSize="xs" fontWeight="bold" color="gray.500">Status Workflow</FormLabel>
          <Select
            size="sm"
            value={bubble.status}
            onChange={(e) => setBubble({ ...bubble, status: e.target.value as any })}
          >
            <option value="pending">Pending OCR</option>
            <option value="translating">Translating</option>
            <option value="review">Review Required</option>
            <option value="approved">Approved</option>
          </Select>
        </FormControl>

        <FormControl>
          <FormLabel fontSize="xs" fontWeight="bold" color="gray.500">Font Preset</FormLabel>
          <Select
            size="sm"
            value={bubble.fontPreset}
            onChange={(e) => setBubble({ ...bubble, fontPreset: e.target.value })}
          >
            <option value="Manga Standard">Manga Standard</option>
            <option value="Action Bold">Action Bold</option>
            <option value="Whisper">Whisper</option>
          </Select>
        </FormControl>

        {/* Comments & Editor Notes (TASK-012) */}
        <FormControl>
          <FormLabel fontSize="xs" fontWeight="bold" color="gray.500">Comments & Notes</FormLabel>
          <Textarea
            value={bubble.comments}
            onChange={(e) => setBubble({ ...bubble, comments: e.target.value })}
            placeholder="Add reviewer notes..."
            size="sm"
            fontSize="xs"
            borderRadius="md"
            rows={2}
          />
        </FormControl>

        <Divider borderColor="gray.100" pt={2} />

        <Button size="sm" colorScheme="blue" w="100%">
          Approve Translation
        </Button>
      </VStack>
    </Box>
  );
}

// Simple Divider import since we used it
import { Divider } from '@chakra-ui/react';
