import { Container, Grid, Skeleton, VStack } from '@chakra-ui/react';

export default function HomeLoadingState() {
  return (
    <Container maxW="var(--atlas-container)" px={{ base: 4, md: 6 }} py={{ base: 16, md: 24 }}>
      <Grid gap={{ base: 10, lg: 14 }} templateColumns={{ base: '1fr', lg: '1.02fr 0.98fr' }}>
        <VStack align="stretch" gap={5} justify="center">
          <Skeleton h="1.1rem" maxW="12rem" />
          <Skeleton borderRadius="var(--atlas-radius-md)" h={{ base: '8rem', md: '12rem' }} />
          <Skeleton h="1.2rem" maxW="34rem" />
          <Skeleton h="3rem" maxW="18rem" />
        </VStack>
        <Skeleton borderRadius="var(--atlas-radius-xl)" minH={{ base: '20rem', md: '31rem' }} />
      </Grid>
    </Container>
  );
}
