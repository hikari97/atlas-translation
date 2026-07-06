import { Box, Heading, Text, Badge, VStack, HStack, ProgressRoot, ProgressTrack, ProgressRange, Button } from '@chakra-ui/react';

const jobs = [
  { id: '1', type: 'OCR Detection', page: 'Page 1', progress: 100, status: 'completed' },
  { id: '2', type: 'Translation', page: 'Page 1', progress: 65, status: 'running' },
  { id: '3', type: 'Inpainting', page: 'Page 2', progress: 0, status: 'pending' },
];

export default function JobList() {
  return (
    <Box p={5} borderWidth={1} borderRadius="md">
      <Heading size="sm" mb={4}>AI Workflow Jobs</Heading>
      <VStack gap={4}>
        {jobs.map((j) => (
          <Box key={j.id} w="full" p={3} borderWidth={1} borderRadius="md">
            <HStack justify="space-between" mb={2}>
              <Text fontWeight="semibold">{j.type}</Text>
              <Text fontSize="sm" color="gray.500">{j.page}</Text>
              <Badge colorScheme={j.status === 'completed' ? 'green' : j.status === 'running' ? 'blue' : 'gray'}>{j.status}</Badge>
            </HStack>
            <ProgressRoot value={j.progress} max={100}>
              <ProgressTrack h="6px"><ProgressRange /></ProgressTrack>
            </ProgressRoot>
            {j.status === 'running' && <Button size="xs" mt={2} variant="outline">Log</Button>}
          </Box>
        ))}
      </VStack>
    </Box>
  );
}
