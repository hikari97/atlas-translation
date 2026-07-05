import React from 'react';
import { Box, Container, VStack, Switch, FormControl, FormLabel } from '@chakra-ui/react';
import PageHeader from '../../components/shell/PageHeader';

export default function SettingsPage() {
  return (
    <Container maxW="container.md" py={6}>
      <VStack align="stretch" spacing={6}>
        <PageHeader
          title="Settings"
          description="Manage localization settings, shortcuts, and AI providers."
        />
        <Box p={8} borderWidth={1} borderRadius="lg" bg="white" boxShadow="sm">
          <FormControl display="flex" alignItems="center">
            <FormLabel htmlFor="email-alerts" mb="0">
              Enable Auto Translation
            </FormLabel>
            <Switch id="email-alerts" defaultChecked />
          </FormControl>
        </Box>
      </VStack>
    </Container>
  );
}
