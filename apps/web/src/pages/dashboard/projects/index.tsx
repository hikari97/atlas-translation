import { useState } from 'react';
import { Box, Container, Heading, Text, Button, Card, Grid, Badge, HStack, VStack, Field, Input, Flex } from '@chakra-ui/react';
import Link from 'next/link';
import { useProjectsQuery } from '../../../lib/data/fetchHooks';
import { useCreateProjectMutation } from '../../../lib/data/mutationHooks';

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
    <Container maxW="container.lg" py={6}>
      <Flex justify="space-between" align="center" mb={6}>
        <Box>
          <Heading>Projects</Heading>
          <Text color="gray.500">Manage your localization projects</Text>
        </Box>
        <Button colorScheme="blue" onClick={() => setShowCreate(!showCreate)}>
          {showCreate ? 'Cancel' : 'New Project'}
        </Button>
      </Flex>

      {/* Inline Create Form */}
      {showCreate && (
        <Box p={5} borderWidth={1} borderRadius="lg" bg="white" mb={6} boxShadow="sm">
          <Heading size="xs" textTransform="uppercase" color="gray.500" mb={4}>
            Create New Project
          </Heading>
          <VStack gap={4} align="stretch">
            <Field.Root>
              <Field.Label>Project Name</Field.Label>
              <Input
                value={name}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setName(e.target.value)}
                placeholder="e.g. Naruto Ch 1"
              />
            </Field.Root>
            <HStack justify="flex-end" gap={2}>
              <Button variant="outline" size="sm" onClick={() => setShowCreate(false)}>Cancel</Button>
              <Button colorScheme="blue" size="sm" onClick={handleCreate} loading={createMutation.isPending}>
                Create
              </Button>
            </HStack>
          </VStack>
        </Box>
      )}

      {isPending && <Text>Loading projects...</Text>}

      {projects && projects.length === 0 && (
        <Text color="gray.400">No projects yet. Create your first project!</Text>
      )}

      <Grid templateColumns="repeat(2, 1fr)" gap={6}>
        {projects?.map((p) => (
          <Card.Root key={p._id}>
            <Card.Body>
              <HStack justify="space-between">
                <Heading size="sm">{p.name}</Heading>
                <Badge>{p.status}</Badge>
              </HStack>
              {p.description && <Text fontSize="sm" color="gray.500" mt={2}>{p.description}</Text>}
              <HStack mt={3} gap={2}>
                <Link href={`/dashboard/projects/${p._id}`} passHref>
                  <Button variant="outline" size="sm">View Details</Button>
                </Link>
                <Link href={`/editor/${p._id}`} passHref>
                  <Button colorScheme="blue" size="sm">Open Editor</Button>
                </Link>
              </HStack>
            </Card.Body>
          </Card.Root>
        ))}
      </Grid>
    </Container>
  );
}
