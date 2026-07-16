import React, { Component, type ReactNode } from 'react';
import { Button, Container, Heading, Text, VStack } from '@chakra-ui/react';
import Surface from './ui/Surface';

interface Props { children: ReactNode; }
interface State { hasError: boolean; }

export class ErrorBoundary extends Component<Props, State> {
  state = { hasError: false };
  static getDerivedStateFromError() { return { hasError: true }; }
  render() {
    if (this.state.hasError) {
      return (
        <Container maxW="lg" py={20}>
          <Surface p={{ base: 6, md: 8 }} textAlign="center">
            <VStack gap={4}>
              <Heading fontSize="2xl">Something went wrong</Heading>
              <Text color="var(--atlas-muted)" lineHeight="1.7">
                Atlas could not render this view. Refresh the page or return to the dashboard.
              </Text>
              <Button
                className="atlas-button-motion"
                color="white"
                colorPalette="blue"
                onClick={() => window.location.assign('/dashboard/images')}
              >
                Back to dashboard
              </Button>
            </VStack>
          </Surface>
        </Container>
      );
    }

    return this.props.children;
  }
}
