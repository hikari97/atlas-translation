import React, { useState } from 'react';
import { useRouter } from 'next/router';
import {
  Box,
  Container,
  Heading,
  Text,
  VStack,
  HStack,
  Button,
  Grid,
  GridItem,
  Progress,
  Badge,
  useToast,
  Divider,
} from '@chakra-ui/react';
import Link from 'next/link';
import PageHeader from '../../components/shell/PageHeader';

export default function ProjectDetailPage() {
  const router = useRouter();
  const { id } = router.query;
  const toast = useToast();

  const [project, setProject] = useState({
    id: id as string,
    name: 'Demon Slayer Ch 1',
    status: 'translating',
    sourceLanguage: 'Japanese (JA)',
    targetLanguage: 'English (EN)',
    progress: 45,
    collaborators: ['H.Makki (Owner)', 'AI Translator (Helper)'],
  });

  const handleArchive = () => {
    toast({ title: 'Project Archived', description: 'This project is now read-only.', status: 'info', duration: 3000 });
    setProject({ ...project, status: 'archived' });
  };

  const handleDelete = () => {
    toast({ title: 'Project Deleted', description: 'Redirecting to project catalog...', status: 'success', duration: 3000 });
    router.push('/projects');
  };

  return (
    <Container maxW="container.lg" py={6}>
      <VStack align="stretch" spacing={6}>
        <PageHeader
          title={project.name}
          description={`Project overview and management panel.`}
        >
          <Link href="/projects" passHref>
            <Button size="sm" variant="ghost">Back to List</Button>
          </Link>
          <Link href={`/editor/${id}`} passHref>
            <Button size="sm" colorScheme="blue">Open in Editor</Button>
          </Link>
        </PageHeader>

        <Grid templateColumns={{ base: '1fr', md: '2fr 1fr' }} gap={8}>
          {/* Main info panel */}
          <GridItem>
            <VStack align="stretch" spacing={6} p={6} borderWidth={1} borderRadius="lg" bg="white" boxShadow="sm">
              <Box>
                <Heading size="md" mb={2}>Overview</Heading>
                <Divider mb={4} />
                <Grid templateColumns="repeat(2, 1fr)" gap={4} fontSize="sm">
                  <Box>
                    <Text fontWeight="semibold" color="gray.500">Source Language</Text>
                    <Text>{project.sourceLanguage}</Text>
                  </Box>
                  <Box>
                    <Text fontWeight="semibold" color="gray.500">Target Language</Text>
                    <Text>{project.targetLanguage}</Text>
                  </Box>
                </Grid>
              </Box>

              <Box>
                <Heading size="sm" mb={2}>Translation Progress</Heading>
                <HStack justify="space-between" mb={1} fontSize="xs">
                  <Text color="gray.600">45 of 100 pages translated</Text>
                  <Text fontWeight="bold">{project.progress}%</Text>
                </HStack>
                <Progress value={project.progress} size="sm" colorScheme="blue" borderRadius="md" />
              </Box>

              <Box>
                <Heading size="sm" mb={2}>Collaborators</Heading>
                <VStack align="stretch" spacing={2} fontSize="sm">
                  {project.collaborators.map((c, i) => (
                    <Text key={i}>• {c}</Text>
                  ))}
                </VStack>
              </Box>
            </VStack>
          </GridItem>

          {/* Quick settings/archive panel */}
          <GridItem>
            <VStack align="stretch" spacing={4} p={5} borderWidth={1} borderRadius="lg" bg="white" boxShadow="sm">
              <Heading size="xs" textTransform="uppercase" color="gray.500" mb={2}>
                Project Status & Actions
              </Heading>
              <Box mb={2}>
                <Text fontSize="xs" color="gray.500" mb={1}>Current Status</Text>
                <Badge colorScheme={project.status === 'completed' ? 'green' : 'blue'}>
                  {project.status}
                </Badge>
              </Box>
              <Button size="sm" onClick={handleArchive} isDisabled={project.status === 'archived'}>
                Archive Project
              </Button>
              <Button size="sm" colorScheme="red" variant="outline" onClick={handleDelete}>
                Delete Project
              </Button>
            </VStack>
          </GridItem>
        </Grid>
      </VStack>
    </Container>
  );
}
