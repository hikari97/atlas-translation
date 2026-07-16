import { Box, Button, Grid, Heading, HStack, Text, VStack } from '@chakra-ui/react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import OpenEditorButton from '../../../components/projects/OpenEditorButton';
import PageHeader from '../../../components/ui/PageHeader';
import Surface from '../../../components/ui/Surface';

export default function ProjectDetailPage() {
  const router = useRouter();
  const projectId = typeof router.query.id === 'string' ? router.query.id : 'Project';

  return (
    <Box>
      <PageHeader
        eyebrow="Project detail"
        title="Project workspace"
        description="Review project information, upload pages, and jump into the editor when ready."
        action={
          <Button asChild className="atlas-button-motion" variant="outline">
            <Link href="/dashboard/projects">Back to projects</Link>
          </Button>
        }
      />
      <Grid gap={4} templateColumns={{ base: '1fr', lg: '1.4fr 0.8fr' }}>
        <Surface p={{ base: 5, md: 6 }}>
          <VStack align="flex-start" gap={4}>
            <Box>
              <Heading fontSize="xl" letterSpacing="-0.02em">
                Project summary
              </Heading>
              <Text color="var(--atlas-muted)" fontSize="sm" mt={1}>
                The detail API can fill this panel as the project workspace grows.
              </Text>
            </Box>
            <Box
              bg="var(--atlas-surface-muted)"
              borderRadius="var(--atlas-radius-md)"
              color="var(--atlas-muted)"
              fontFamily="mono"
              fontSize="sm"
              p={4}
              w="full"
            >
              {projectId}
            </Box>
            <HStack gap={2} wrap="wrap">
              <OpenEditorButton href={`/editor/${projectId}`} />
              <Button asChild className="atlas-button-motion" variant="outline">
                <Link href="/dashboard/export">Prepare export</Link>
              </Button>
            </HStack>
          </VStack>
        </Surface>
        <Surface p={{ base: 5, md: 6 }}>
          <Heading fontSize="lg" letterSpacing="-0.01em" mb={2}>
            Next steps
          </Heading>
          <VStack align="stretch" color="var(--atlas-muted)" fontSize="sm" gap={3}>
            <Text>1. Upload ordered comic pages.</Text>
            <Text>2. Run OCR or translation from the editor.</Text>
            <Text>3. Review bubbles before exporting.</Text>
          </VStack>
        </Surface>
      </Grid>
    </Box>
  );
}
