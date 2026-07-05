import React, { useState } from 'react';
import {
  Box,
  Container,
  Button,
  VStack,
  HStack,
  Input,
  Select,
  Grid,
  GridItem,
  Heading,
  Text,
  Badge,
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  FormControl,
  FormLabel,
  useToast,
} from '@chakra-ui/react';
import Link from 'next/link';
import PageHeader from '../../components/shell/PageHeader';
import { useProjectsQuery } from '../../lib/data/fetchHooks';
import { useCreateProjectMutation } from '../../lib/data/mutationHooks';
import { LoadingSpinner, EmptyState } from '../../components/States';

export default function ProjectsPage() {
  const toast = useToast();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { data: projects, isLoading, refetch } = useProjectsQuery();
  const createMutation = useCreateProjectMutation();

  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [sortBy, setSortBy] = useState('name');

  // Form State
  const [projectName, setProjectName] = useState('');
  const [sourceLang, setSourceLang] = useState('ja');
  const [targetLang, setTargetLang] = useState('en');

  const handleCreate = async () => {
    if (!projectName.trim()) {
      toast({ title: 'Validation Error', description: 'Project name is required.', status: 'error', duration: 3000 });
      return;
    }
    try {
      await createMutation.mutateAsync({
        name: projectName,
        sourceLanguage: sourceLang,
        targetLanguage: targetLang,
      });
      toast({ title: 'Success', description: 'Project created successfully.', status: 'success', duration: 3000 });
      setProjectName('');
      onClose();
      refetch();
    } catch (err) {
      toast({ title: 'Error', description: 'Failed to create project.', status: 'error', duration: 3000 });
    }
  };

  const filtered = projects
    ?.filter((p) => {
      const matchSearch = p.name.toLowerCase().includes(search.toLowerCase());
      const matchStatus = statusFilter === 'all' || p.status === statusFilter;
      return matchSearch && matchStatus;
    })
    .sort((a, b) => {
      if (sortBy === 'name') return a.name.localeCompare(b.name);
      return a.status.localeCompare(b.status);
    });

  return (
    <Container maxW="container.lg" py={6}>
      <VStack align="stretch" spacing={6}>
        <PageHeader
          title="Projects Manager"
          description="List of localized manga, comics, and translations."
        >
          <Button colorScheme="blue" size="sm" onClick={onOpen}>
            Create Project
          </Button>
        </PageHeader>

        {/* Filter bar */}
        <HStack spacing={4} w="100%" wrap="wrap" p={4} borderWidth={1} borderRadius="lg" bg="white" boxShadow="xs">
          <Input
            placeholder="Search projects..."
            maxW="300px"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <Select maxW="150px" value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)}>
            <option value="all">All Status</option>
            <option value="translating">Translating</option>
            <option value="completed">Completed</option>
          </Select>
          <Select maxW="150px" value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
            <option value="name">Sort by Name</option>
            <option value="status">Sort by Status</option>
          </Select>
        </HStack>

        {/* Projects List Grid */}
        {isLoading ? (
          <LoadingSpinner message="Loading projects catalog..." />
        ) : !filtered || filtered.length === 0 ? (
          <EmptyState
            title="No projects match"
            description="Create a new localization project or try adjusting filters."
            emoji="📂"
            actionLabel="Create Project"
            onAction={onOpen}
          />
        ) : (
          <Grid templateColumns={{ base: '1fr', md: 'repeat(2, 1fr)' }} gap={6}>
            {filtered.map((project) => (
              <GridItem key={project.id} p={5} borderWidth={1} borderRadius="lg" bg="white" boxShadow="sm">
                <VStack align="stretch" spacing={3}>
                  <HStack justify="space-between">
                    <Heading size="md" noOfLines={1}>{project.name}</Heading>
                    <Badge colorScheme={project.status === 'completed' ? 'green' : 'blue'}>
                      {project.status}
                    </Badge>
                  </HStack>
                  <Text fontSize="xs" color="gray.400">ID: {project.id}</Text>
                  <HStack justify="space-between" pt={2} borderTop="1px solid" borderColor="gray.100">
                    <HStack spacing={2}>
                    <Link href={`/projects/${project.id}`} passHref>
                      <Button size="sm" variant="outline">View Overview</Button>
                    </Link>
                    <Link href={`/editor/${project.id}`} passHref>
                      <Button size="sm" colorScheme="blue">Open Workspace</Button>
                    </Link>
                  </HStack>
                  </HStack>
                </VStack>
              </GridItem>
            ))}
          </Grid>
        )}
      </VStack>

      {/* Create Project Modal */}
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Create New Project</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <VStack spacing={4}>
              <FormControl isRequired>
                <FormLabel>Project Name</FormLabel>
                <Input
                  placeholder="e.g. Naruto Ch 1"
                  value={projectName}
                  onChange={(e) => setProjectName(e.target.value)}
                />
              </FormControl>
              <HStack w="100%" spacing={4}>
                <FormControl>
                  <FormLabel>Source Language</FormLabel>
                  <Select value={sourceLang} onChange={(e) => setSourceLang(e.target.value)}>
                    <option value="ja">Japanese (JA)</option>
                    <option value="ko">Korean (KO)</option>
                    <option value="zh">Chinese (ZH)</option>
                  </Select>
                </FormControl>
                <FormControl>
                  <FormLabel>Target Language</FormLabel>
                  <Select value={targetLang} onChange={(e) => setTargetLang(e.target.value)}>
                    <option value="en">English (EN)</option>
                    <option value="id">Indonesian (ID)</option>
                    <option value="es">Spanish (ES)</option>
                  </Select>
                </FormControl>
              </HStack>
            </VStack>
          </ModalBody>
          <ModalFooter>
            <Button variant="ghost" mr={3} onClick={onClose}>Cancel</Button>
            <Button colorScheme="blue" onClick={handleCreate} isLoading={createMutation.isLoading}>
              Create Project
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Container>
  );
}
