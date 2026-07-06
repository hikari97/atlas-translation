import { Box, Grid, Heading, Text, StatRoot, StatLabel, StatValueText, Card } from '@chakra-ui/react';
import JobStatusWidget from '../../components/dashboard/JobStatusWidget';
import ActivityFeed from '../../components/dashboard/ActivityFeed';

export default function Home() {
  return (
    <Box>
      <Box mb={6}><Heading>Dashboard</Heading><Text color="gray.500">Welcome to Atlas Studio</Text></Box>
      <Grid templateColumns="repeat(3, 1fr)" gap={5} mb={8}>
        <Card.Root><Card.Body><StatRoot><StatLabel>Total Projects</StatLabel><StatValueText>12</StatValueText></StatRoot></Card.Body></Card.Root>
        <Card.Root><Card.Body><StatRoot><StatLabel>Translated Pages</StatLabel><StatValueText>145</StatValueText></StatRoot></Card.Body></Card.Root>
        <Card.Root><Card.Body><StatRoot><StatLabel>Completion Rate</StatLabel><StatValueText>82%</StatValueText></StatRoot></Card.Body></Card.Root>
      </Grid>
      <Grid templateColumns="2fr 1fr" gap={8}>
        <Box p={5} borderWidth={1} borderRadius="md">
          <Heading size="sm" mb={4}>Recent Projects</Heading>
          <Text color="gray.400">No projects yet.</Text>
        </Box>
        <Box><JobStatusWidget /><Box mt={6}><ActivityFeed /></Box></Box>
      </Grid>
    </Box>
  );
}
