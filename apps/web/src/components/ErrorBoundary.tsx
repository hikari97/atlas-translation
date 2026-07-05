import React, { Component, type ErrorInfo, type ReactNode } from 'react';
import { Box, Heading, Text, Button, VStack } from '@chakra-ui/react';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

export class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
    error: null,
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Uncaught error:', error, errorInfo);
  }

  private handleReset = () => {
    this.setState({ hasError: false, error: null });
    window.location.href = '/';
  };

  public render() {
    if (this.state.hasError) {
      return (
        <Box minH="100vh" display="flex" alignItems="center" justifyContent="center" bg="gray.50" p={6}>
          <VStack spacing={4} align="center" bg="white" p={8} borderRadius="lg" boxShadow="md" maxW="md" textAlign="center">
            <Heading size="lg" color="red.500">Something went wrong</Heading>
            <Text color="gray.600">
              An unexpected error occurred in the application. Please try reloading the page.
            </Text>
            {this.state.error && (
              <Box p={3} bg="gray.100" borderRadius="md" w="100%" overflowX="auto">
                <Text fontSize="xs" fontFamily="mono" color="red.600" textAlign="left">
                  {this.state.error.toString()}
                </Text>
              </Box>
            )}
            <Button colorScheme="blue" onClick={this.handleReset}>
              Go to Home
            </Button>
          </VStack>
        </Box>
      );
    }

    return this.props.children;
  }
}
