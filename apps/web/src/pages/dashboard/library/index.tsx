import { Box, Grid, Heading, HStack, Text, VStack } from '@chakra-ui/react';
import PageHeader from '../../../components/ui/PageHeader';
import StatusBadge from '../../../components/ui/StatusBadge';
import Surface from '../../../components/ui/Surface';

const assets = [
  { id: '1', name: 'naruto_cover.png', size: '1.2 MB', status: 'ready' },
  { id: '2', name: 'onepiece_page1.jpg', size: '850 KB', status: 'ready' },
];

export default function LibraryPage() {
  return (
    <Box>
      <PageHeader
        eyebrow="Assets"
        title="Asset library"
        description="Browse uploaded comic pages and supporting files used by localization projects."
      />
      <Grid gap={4} templateColumns={{ base: '1fr', md: 'repeat(2, 1fr)', xl: 'repeat(3, 1fr)' }}>
        {assets.map((asset) => (
          <Surface key={asset.id} p={5}>
            <VStack align="stretch" gap={4}>
              <Box
                bg="var(--atlas-surface-muted)"
                borderRadius="var(--atlas-radius-md)"
                h="9rem"
              />
              <HStack align="flex-start" justify="space-between">
                <Box minW={0}>
                  <Heading fontSize="md" letterSpacing="-0.01em" lineClamp={1}>
                    {asset.name}
                  </Heading>
                  <Text color="var(--atlas-muted)" fontSize="sm" mt={1}>
                    {asset.size}
                  </Text>
                </Box>
                <StatusBadge status={asset.status} />
              </HStack>
            </VStack>
          </Surface>
        ))}
      </Grid>
    </Box>
  );
}
