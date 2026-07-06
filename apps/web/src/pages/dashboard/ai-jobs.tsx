import { Container, Heading, Text } from '@chakra-ui/react';
import JobList from '../../components/ai/JobList';

export default function AIJobsPage() {
  return (
    <Container maxW="container.lg" py={6}>
      <Heading mb={2}>AI Workflow Jobs</Heading>
      <Text color="gray.500" mb={6}>Monitor AI processing tasks</Text>
      <JobList />
    </Container>
  );
}
