import { Box, Heading, Text, ProgressRoot, ProgressTrack, ProgressRange, Badge, Flex } from '@chakra-ui/react';

const jobs = [
  { id: '1', type: 'OCR Detection', progress: 45, status: 'running' },
  { id: '2', type: 'Inpainting Page 2', progress: 0, status: 'pending' },
];

export default function JobStatusWidget() {
  return (
    <Box p={5} borderWidth={1} borderRadius="md">
      <Heading size="sm" mb={4}>AI Workflow Jobs</Heading>
      {jobs.map((job) => (
        <Box key={job.id} mb={4}>
          <Flex justify="space-between" mb={1}>
            <Text fontSize="sm">{job.type}</Text>
            <Badge size="sm">{job.status} ({job.progress}%)</Badge>
          </Flex>
          <ProgressRoot value={job.progress} max={100}>
            <ProgressTrack h="8px"><ProgressRange /></ProgressTrack>
          </ProgressRoot>
        </Box>
      ))}
    </Box>
  );
}
