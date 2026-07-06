import { Box, Container, Heading, Text, Button, Flex, Grid, VStack, Card } from '@chakra-ui/react';
import Link from 'next/link';

export default function LandingPage() {
  return (
    <Box minH="100vh">
      {/* Hero Section */}
      <Box bg="blue.600" color="white" py={20}>
        <Container maxW="container.lg" textAlign="center">
          <Heading size="3xl" mb={4}>Atlas Studio</Heading>
          <Text fontSize="xl" mb={8} opacity={0.9}>AI-Powered Comic Localization Platform</Text>
          <Flex justify="center" gap={4}>
            <Link href="/auth/register"><Button size="lg" colorScheme="white" variant="outline">Register</Button></Link>
            <Link href="/auth/login"><Button size="lg" colorScheme="white" variant="outline">Sign In</Button></Link>
            <Link href="/dashboard"><Button size="lg" bg="white" color="blue.600">Enter Dashboard</Button></Link>
          </Flex>
        </Container>
      </Box>

      {/* Features */}
      <Container maxW="container.lg" py={16}>
        <Grid templateColumns="repeat(3, 1fr)" gap={8}>
          <Card.Root>
            <Card.Body><Heading size="md" mb={2}>🎨 Smart OCR</Heading><Text color="gray.600">Auto-detect and extract text bubbles from manga panels</Text></Card.Body>
          </Card.Root>
          <Card.Root>
            <Card.Body><Heading size="md" mb={2}>🌍 AI Translation</Heading><Text color="gray.600">Translate text while preserving comic layout and style</Text></Card.Body>
          </Card.Root>
          <Card.Root>
            <Card.Body><Heading size="md" mb={2}>✏️ Typesetting</Heading><Text color="gray.600">Professional typesetting editor with font presets</Text></Card.Body>
          </Card.Root>
        </Grid>
      </Container>

      {/* Footer */}
      <Box as="footer" borderTopWidth="1px" py={8} textAlign="center" color="gray.500">
        <Text>© 2026 Atlas Studio. All rights reserved.</Text>
      </Box>
    </Box>
  );
}
