import { Box } from '@chakra-ui/react';
import JobList from '../../components/ai/JobList';
import PageHeader from '../../components/ui/PageHeader';

export default function AIJobsPage() {
  return (
    <Box>
      <PageHeader
        eyebrow="Processing"
        title="AI workflow jobs"
        description="Monitor OCR, translation, inpainting, and export tasks from one operational view."
      />
      <JobList />
    </Box>
  );
}
