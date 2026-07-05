import React, { useState } from 'react';
import Head from 'next/head';
import dynamic from 'next/dynamic';
import {
  Box,
  VStack,
  Button,
  Grid,
  GridItem,
  Stat,
  StatLabel,
  StatNumber,
  StatHelpText,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Badge,
  Heading,
  Text,
  ButtonGroup,
  HStack,
  Flex,
} from '@chakra-ui/react';
import PageHeader from '../components/shell/PageHeader';
import Link from 'next/link';
import { useProjectsQuery } from '../lib/data/fetchHooks';
import { LoadingSpinner, EmptyState } from '../components/States';
import ActivityFeed from '../components/dashboard/ActivityFeed';
import JobStatusWidget from '../components/dashboard/JobStatusWidget';

// Load ComicCanvas dynamically with SSR disabled since Konva requires window/DOM APIs.
const ComicCanvas = dynamic(() => import('../components/ComicCanvas'), {
  ssr: false,
  loading: () => <Box p={8} textAlign="center">Loading Canvas Renderer...</Box>,
});

export default function Home() {
  const { data: projects, isLoading, error } = useProjectsQuery();
  const [statusFilter, setStatusFilter] = useState<'all' | 'translating' | 'completed'>('all');

  const handleCreateProject = () => {
    window.location.href = '/projects';
  };

  const filteredProjects = projects?.filter((p) => {
    if (statusFilter === 'all') return true;
    return p.status === statusFilter;
  });

  return (
    <VStack align="stretch" spacing={8}>
      <Head>
        <title>Atlas Studio — AI Comic Localization Platform</title>
        <meta name="description" content="AI-Powered Comic Translation & Localization Editor" />
      </Head>

      <PageHeader
        title="Dashboard"
        description="Select tools from the sidebar to manage your localization workflows."
      >
        <Link href="/projects" passHref>
          <Button colorScheme="blue" size="sm">New Project</Button>
        </Link>
      </PageHeader>

      {/* Summary Cards */}
      <Grid templateColumns={{ base: '1fr', md: 'repeat(3, 1fr)' }} gap={5}>
        <GridItem p={5} borderWidth={1} borderRadius="lg" bg="white" boxShadow="sm">
          <Stat>
            <StatLabel color="gray.500" fontWeight="semibold">Total Projects</StatLabel>
            <StatNumber>12</StatNumber>
            <StatHelpText>Active in workspace</StatHelpText>
          </Stat>
        </GridItem>
        <GridItem p={5} borderWidth={1} borderRadius="lg" bg="white" boxShadow="sm">
          <Stat>
            <StatLabel color="gray.500" fontWeight="semibold">Translated Pages</StatLabel>
            <StatNumber>145</StatNumber>
            <StatHelpText>Across all volumes</StatHelpText>
          </Stat>
        </GridItem>
        <GridItem p={5} borderWidth={1} borderRadius="lg" bg="white" boxShadow="sm">
          <Stat>
            <StatLabel color="gray.500" fontWeight="semibold">Completion Rate</StatLabel>
            <StatNumber>82%</StatNumber>
            <StatHelpText>Average localization rate</StatHelpText>
          </Stat>
        </GridItem>
      </Grid>

      {/* Quick Actions Panel */}
      <Box p={5} borderWidth={1} borderRadius="lg" bg="white" boxShadow="sm">
        <Heading size="xs" textTransform="uppercase" color="gray.500" mb={4}>
          Quick Actions
        </Heading>
        <Grid templateColumns={{ base: '1fr', sm: 'repeat(3, 1fr)' }} gap={4}>
          <Link href="/projects" passHref>
            <Button size="md" w="100%" colorScheme="blue" variant="outline">
              📁 Import Manga File
            </Button>
          </Link>
          <Link href="/editor/demo" passHref>
            <Button size="md" w="100%" colorScheme="green" variant="outline">
              🎨 Open Demo Canvas
            </Button>
          </Link>
          <Link href="/settings" passHref>
            <Button size="md" w="100%" colorScheme="gray" variant="outline">
              ⚙️ Manage API Keys
            </Button>
          </Link>
        </Grid>
      </Box>

      {/* Main Grid for projects & sidebar widgets split view */}
      <Grid templateColumns={{ base: '1fr', lg: '2fr 1fr' }} gap={8}>
        <GridItem>
          {/* Recent Projects Table */}
          <Box p={5} borderWidth={1} borderRadius="lg" bg="white" boxShadow="sm" minH="400px">
            <Flex justify="space-between" align="center" mb={4} direction={{ base: 'column', sm: 'row' }} gap={2}>
              <Heading size="xs" textTransform="uppercase" color="gray.500">
                Recent Projects
              </Heading>
              <ButtonGroup size="xs" isAttached variant="outline">
                <Button onClick={() => setStatusFilter('all')} isActive={statusFilter === 'all'}>All</Button>
                <Button onClick={() => setStatusFilter('translating')} isActive={statusFilter === 'translating'}>Translating</Button>
                <Button onClick={() => setStatusFilter('completed')} isActive={statusFilter === 'completed'}>Completed</Button>
              </ButtonGroup>
            </Flex>
            {isLoading ? (
              <LoadingSpinner message="Fetching projects..." />
            ) : error ? (
              <Text color="red.500">Failed to load projects.</Text>
            ) : !filteredProjects || filteredProjects.length === 0 ? (
              <EmptyState
                title="No projects found"
                description="Try changing the filter or create your first localization project to get started."
                emoji="📂"
                actionLabel="Create Project"
                onAction={handleCreateProject}
              />
            ) : (
              <Box overflowX="auto">
                <Table variant="simple" size="sm">
                  <Thead>
                    <Tr>
                      <Th>Project Name</Th>
                      <Th>Status</Th>
                      <Th>Action</Th>
                    </Tr>
                  </Thead>
                  <Tbody>
                    {filteredProjects.map((project) => (
                      <Tr key={project.id}>
                        <Td fontWeight="medium">{project.name}</Td>
                        <Td>
                          <Badge colorScheme={project.status === 'completed' ? 'green' : 'blue'}>
                            {project.status}
                          </Badge>
                        </Td>
                        <Td>
                          <Link href={`/editor/${project.id}`} passHref>
                            <Button size="xs" colorScheme="blue" variant="ghost">Open Editor</Button>
                          </Link>
                        </Td>
                      </Tr>
                    ))}
                  </Tbody>
                </Table>
              </Box>
            )}
          </Box>
        </GridItem>

        <GridItem>
          <VStack align="stretch" spacing={6}>
            <JobStatusWidget />
            <ActivityFeed />
          </VStack>
        </GridItem>
      </Grid>

      {/* Canvas editor preview */}
      <ComicCanvas />
    </VStack>
  );
}
