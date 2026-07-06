import { Box, Container, Heading, Text, Grid, Card, Badge } from '@chakra-ui/react';

const assets = [
  { id: '1', name: 'naruto_cover.png', size: '1.2 MB', status: 'ready' },
  { id: '2', name: 'onepiece_page1.jpg', size: '850 KB', status: 'ready' },
];

export default function LibraryPage() {
  return (
    <Container maxW="container.lg" py={6}>
      <Heading mb={2}>Asset Library</Heading>
      <Text color="gray.500" mb={6}>Uploaded comic pages and assets</Text>
      <Grid templateColumns="repeat(3, 1fr)" gap={4}>
        {assets.map((a) => (
          <Card.Root key={a.id}>
            <Card.Body>
              <Text fontWeight="semibold">{a.name}</Text>
              <Badge>{a.size}</Badge>
            </Card.Body>
          </Card.Root>
        ))}
      </Grid>
    </Container>
  );
}
