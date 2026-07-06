import { Box, Heading, Text, Button, Card, Grid, Badge, Container, Flex } from '@chakra-ui/react';
import Link from 'next/link';

const projects = [
  { id: '1', name: 'Demon Slayer Ch 1', status: 'translating' },
  { id: '2', name: 'One Piece Ch 1000', status: 'completed' },
];

export default function ProjectsPage() {
  return (
    <Container maxW="container.lg" py={6}>
      <Flex justify="space-between" align="center" mb={6}>
        <Box><Heading>Projects</Heading><Text color="gray.500">Manage your localization projects</Text></Box>
        <Button>New Project</Button>
      </Flex>
      <Grid templateColumns="repeat(2, 1fr)" gap={6}>
        {projects.map((p) => (
          <Card.Root key={p.id}>
            <Card.Body>
              <Flex justify="space-between" align="center">
                <Heading size="sm">{p.name}</Heading>
                <Badge>{p.status}</Badge>
              </Flex>
              <Link href={`/dashboard/projects/${p.id}`} passHref><Button variant="outline" size="sm" mt={3}>View Details</Button></Link>
            </Card.Body>
          </Card.Root>
        ))}
      </Grid>
    </Container>
  );
}
