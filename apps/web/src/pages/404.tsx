import { Button, Container, Heading, Text, VStack } from '@chakra-ui/react';
import Link from 'next/link';
import Surface from '../components/ui/Surface';

export default function NotFound() {
  return (
    <Container maxW="lg" py={20}>
      <Surface p={{ base: 6, md: 8 }} textAlign="center">
        <VStack gap={4}>
          <Text color="var(--atlas-primary)" fontWeight="850" letterSpacing="0.12em">
            404
          </Text>
          <Heading fontSize="3xl" letterSpacing="-0.04em">
            Page not found
          </Heading>
          <Text color="var(--atlas-muted)" lineHeight="1.7">
            The page may have moved, or the route is not available in this workspace.
          </Text>
          <Button asChild className="atlas-button-motion" color="white" colorPalette="blue">
            <Link href="/">Go home</Link>
          </Button>
        </VStack>
      </Surface>
    </Container>
  );
}
