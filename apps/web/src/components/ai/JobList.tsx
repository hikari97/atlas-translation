import {
  Box,
  Button,
  Flex,
  Heading,
  ProgressRange,
  ProgressRoot,
  ProgressTrack,
  Text,
  VStack,
} from '@chakra-ui/react';
import StatusBadge from '../ui/StatusBadge';
import Surface from '../ui/Surface';

const jobs = [
  { id: '1', type: 'OCR Detection', page: 'Page 1', progress: 100, status: 'completed' },
  { id: '2', type: 'Translation', page: 'Page 1', progress: 65, status: 'running' },
  { id: '3', type: 'Inpainting', page: 'Page 2', progress: 0, status: 'pending' },
];

export default function JobList() {
  return (
    <Surface p={{ base: 4, md: 5 }}>
      <Heading fontSize="md" letterSpacing="-0.01em" mb={4}>
        AI workflow jobs
      </Heading>
      <VStack align="stretch" gap={3}>
        {jobs.map((job) => (
          <Box
            key={job.id}
            bg="var(--atlas-surface-muted)"
            borderWidth="1px"
            borderColor="var(--atlas-border)"
            borderRadius="var(--atlas-radius-md)"
            p={4}
          >
            <Flex
              align={{ base: 'flex-start', sm: 'center' }}
              direction={{ base: 'column', sm: 'row' }}
              gap={3}
              justify="space-between"
              mb={3}
            >
              <Box>
                <Text color="var(--atlas-foreground)" fontWeight="800">
                  {job.type}
                </Text>
                <Text color="var(--atlas-muted)" fontSize="sm">
                  {job.page}
                </Text>
              </Box>
              <StatusBadge status={job.status} />
            </Flex>
            <ProgressRoot value={job.progress} max={100}>
              <ProgressTrack bg="var(--atlas-background-strong)" borderRadius="999px" h="7px">
                <ProgressRange bg="var(--atlas-primary)" borderRadius="999px" />
              </ProgressTrack>
            </ProgressRoot>
            <Flex align="center" justify="space-between" mt={2}>
              <Text color="var(--atlas-muted)" fontSize="xs">
                {job.progress}% complete
              </Text>
              {job.status === 'running' && (
                <Button className="atlas-button-motion" size="xs" variant="outline">
                  View log
                </Button>
              )}
            </Flex>
          </Box>
        ))}
      </VStack>
    </Surface>
  );
}
