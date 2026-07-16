import { Box, Flex, Heading, ProgressRange, ProgressRoot, ProgressTrack, Text, VStack } from '@chakra-ui/react';
import StatusBadge from '../ui/StatusBadge';
import Surface from '../ui/Surface';

const jobs = [
  { id: '1', type: 'OCR Detection', progress: 45, status: 'running' },
  { id: '2', type: 'Inpainting Page 2', progress: 0, status: 'pending' },
];

export default function JobStatusWidget() {
  return (
    <Surface p={5}>
      <Heading fontSize="md" letterSpacing="-0.01em" mb={4}>
        AI workflow jobs
      </Heading>
      <VStack align="stretch" gap={4}>
        {jobs.map((job) => (
          <Box key={job.id}>
            <Flex align="center" justify="space-between" mb={2}>
              <Text color="var(--atlas-foreground)" fontSize="sm" fontWeight="750">
                {job.type}
              </Text>
              <StatusBadge status={job.status} />
            </Flex>
            <ProgressRoot value={job.progress} max={100}>
              <ProgressTrack bg="var(--atlas-surface-muted)" borderRadius="999px" h="8px">
                <ProgressRange bg="var(--atlas-primary)" borderRadius="999px" />
              </ProgressTrack>
            </ProgressRoot>
            <Text color="var(--atlas-muted)" fontSize="xs" mt={1.5}>
              {job.progress}% complete
            </Text>
          </Box>
        ))}
      </VStack>
    </Surface>
  );
}
