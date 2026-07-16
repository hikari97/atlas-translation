import { useState } from 'react';
import { Box, Button, Field, Flex, Grid, HStack, Heading, Input, Skeleton, Text, VStack } from '@chakra-ui/react';
import Link from 'next/link';
import { useProjectsQuery } from '../../../lib/data/fetchHooks';
import { useCreateProjectMutation } from '../../../lib/data/mutationHooks';
import EmptyState from '../../../components/ui/EmptyState';
import PageHeader from '../../../components/ui/PageHeader';
import StatusBadge from '../../../components/ui/StatusBadge';
import Surface from '../../../components/ui/Surface';
import OpenEditorButton from '../../../components/projects/OpenEditorButton';

export default function ProjectsPage() {
  const { data: projects, isPending, refetch } = useProjectsQuery();
  const createMutation = useCreateProjectMutation();
  const [showCreate, setShowCreate] = useState(false);
  const [name, setName] = useState('');

  const handleCreate = async () => {
    if (!name.trim()) return;
    try {
      await createMutation.mutateAsync({ name });
      setName('');
      setShowCreate(false);
      refetch(); // Reload project list
    } catch (err) {
      console.error('Failed to create project:', err);
    }
  };

  return (
    <Box>
      <PageHeader
        eyebrow="Project library"
        title="Manage localization projects"
        description="Create projects, open the editor, and keep each page organized for translation review."
        action={
          <Button
            className="atlas-button-motion"
            color={showCreate ? 'var(--atlas-foreground)' : 'white'}
            colorPalette={showCreate ? 'gray' : 'blue'}
            onClick={() => setShowCreate(!showCreate)}
            variant={showCreate ? 'outline' : 'solid'}
          >
            {showCreate ? 'Cancel' : 'New project'}
          </Button>
        }
      />

      {showCreate && (
        <Surface mb={6} p={{ base: 5, md: 6 }}>
          <Flex align={{ base: 'flex-start', md: 'center' }} direction={{ base: 'column', md: 'row' }} gap={5} justify="space-between">
            <Box maxW="28rem">
              <Heading fontSize="lg" letterSpacing="-0.01em">
                Create a new project
              </Heading>
              <Text color="var(--atlas-muted)" fontSize="sm" mt={1}>
                Name the project now. Pages and metadata can be added after creation.
              </Text>
            </Box>
            <VStack align="stretch" flex="1" gap={3} maxW="32rem" w="full">
              <Field.Root>
                <Field.Label>Project name</Field.Label>
                <Input
                  borderRadius="var(--atlas-radius-sm)"
                  onChange={(event: React.ChangeEvent<HTMLInputElement>) => setName(event.target.value)}
                  placeholder="Chapter 01 localization"
                  value={name}
                />
              </Field.Root>
              <HStack justify="flex-end" gap={2}>
                <Button size="sm" variant="ghost" onClick={() => setShowCreate(false)}>
                  Cancel
                </Button>
                <Button
                  className="atlas-button-motion"
                  color="white"
                  colorPalette="blue"
                  loading={createMutation.isPending}
                  onClick={handleCreate}
                  size="sm"
                >
                  Create project
                </Button>
              </HStack>
            </VStack>
          </Flex>
        </Surface>
      )}

      {isPending && (
        <Grid gap={4} templateColumns={{ base: '1fr', md: 'repeat(2, 1fr)' }}>
          {[1, 2, 3, 4].map((item) => (
            <Surface key={item} p={5}>
              <Skeleton height="1.4rem" mb={4} width="52%" />
              <Skeleton height="0.9rem" mb={5} width="80%" />
              <HStack>
                <Skeleton height="2rem" width="6rem" />
                <Skeleton height="2rem" width="6rem" />
              </HStack>
            </Surface>
          ))}
        </Grid>
      )}

      {!isPending && projects && projects.length === 0 && (
        <EmptyState
          title="No projects yet"
          description="Create your first localization project and upload pages when you are ready."
          action={
            <Button className="atlas-button-motion" color="white" colorPalette="blue" size="sm" onClick={() => setShowCreate(true)}>
              Create project
            </Button>
          }
        />
      )}

      {!isPending && projects && projects.length > 0 && (
        <Grid gap={4} templateColumns={{ base: '1fr', md: 'repeat(2, 1fr)' }}>
          {projects.map((project) => (
            <Surface key={project._id} p={5}>
              <VStack align="stretch" gap={4}>
                <HStack align="flex-start" justify="space-between">
                  <Box minW={0}>
                    <Heading fontSize="lg" letterSpacing="-0.015em" lineClamp={1}>
                      {project.name}
                    </Heading>
                    <Text color="var(--atlas-muted)" fontSize="sm" mt={1}>
                      {project.description || 'No description added yet.'}
                    </Text>
                  </Box>
                  <StatusBadge status={project.status} />
                </HStack>
                <HStack color="var(--atlas-muted)" fontSize="sm" gap={4}>
                  <Text>{project.sourceLanguage || 'source'} source</Text>
                  <Text>{project.targetLanguage || 'target'} target</Text>
                  <Text>{project.pages.length} pages</Text>
                </HStack>
                <HStack gap={2} wrap="wrap">
                  <Button asChild className="atlas-button-motion" size="sm" variant="outline">
                    <Link href={`/dashboard/projects/${project._id}`}>View details</Link>
                  </Button>
                  <OpenEditorButton href={`/editor/${project._id}`} size="sm" />
                </HStack>
              </VStack>
            </Surface>
          ))}
        </Grid>
      )}
    </Box>
  );
}
