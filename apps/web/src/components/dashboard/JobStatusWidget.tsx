import React, { useEffect } from 'react';
import { Box, VStack, Text, Heading, Progress, HStack, Badge, Button } from '@chakra-ui/react';
import { useJobStore } from '../../lib/state/jobStore';

export default function JobStatusWidget() {
  const { jobs, addJob, updateJobProgress } = useJobStore();

  // Populate mock active jobs if empty for illustration
  useEffect(() => {
    if (jobs.length === 0) {
      addJob({ id: 'job-1', type: 'OCR Bubble Detection', progress: 45, status: 'running' });
      addJob({ id: 'job-2', type: 'Inpainting (Redraw Page 2)', progress: 0, status: 'pending' });
    }
  }, [jobs.length, addJob]);

  const triggerMockProgress = () => {
    jobs.forEach((job) => {
      if (job.status === 'running') {
        const next = Math.min(job.progress + 15, 100);
        updateJobProgress(job.id, next, next === 100 ? 'completed' : 'running');
      } else if (job.status === 'pending') {
        updateJobProgress(job.id, 10, 'running');
      }
    });
  };

  return (
    <Box p={5} borderWidth={1} borderRadius="lg" bg="white" boxShadow="sm">
      <HStack justify="space-between" mb={4}>
        <Heading size="xs" textTransform="uppercase" color="gray.500">
          AI Workflow Jobs
        </Heading>
        {jobs.some(j => j.status === 'running' || j.status === 'pending') && (
          <Button size="xs" colorScheme="blue" variant="ghost" onClick={triggerMockProgress}>
            Simulate Progress
          </Button>
        )}
      </HStack>
      
      <VStack align="stretch" spacing={4}>
        {jobs.length === 0 ? (
          <Text fontSize="sm" color="gray.400">No active AI jobs.</Text>
        ) : (
          jobs.map((job) => (
            <Box key={job.id}>
              <HStack justify="space-between" mb={1} fontSize="xs">
                <Text fontWeight="semibold" color="gray.700">{job.type}</Text>
                <Badge
                  colorScheme={
                    job.status === 'completed'
                      ? 'green'
                      : job.status === 'failed'
                      ? 'red'
                      : job.status === 'running'
                      ? 'blue'
                      : 'gray'
                  }
                >
                  {job.status} ({job.progress}%)
                </Badge>
              </HStack>
              <Progress
                value={job.progress}
                size="xs"
                colorScheme={job.status === 'completed' ? 'green' : 'blue'}
                borderRadius="md"
              />
            </Box>
          ))
        )}
      </VStack>
    </Box>
  );
}
