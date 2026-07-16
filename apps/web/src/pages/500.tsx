import { Button, Container, Heading, Text, VStack } from '@chakra-ui/react';
import Link from 'next/link';
import Surface from '../components/ui/Surface';

export default function ServerError() {
  return (
    <Container maxW="lg" py={20}>
      <Surface p={{ base: 6, md: 8 }} textAlign="center">
        <VStack gap={4}>
          <Text color="var(--atlas-danger)" fontWeight="850" letterSpacing="0.12em">
            500
          </Text>
          <Heading fontSize="3xl" letterSpacing="-0.04em">
            Server error
          </Heading>
          <Text color="var(--atlas-muted)" lineHeight="1.7">
            Atlas could not complete the request. Return home and try again from a stable route.
          </Text>
          <Button asChild className="atlas-button-motion" color="white" colorPalette="blue">
            <Link href="/">Go home</Link>
          </Button>
        </VStack>
      </Surface>
    </Container>
  );
}
