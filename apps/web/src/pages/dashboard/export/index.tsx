import {
  Box,
  Button,
  Field,
  Grid,
  Heading,
  HStack,
  Input,
  ProgressRange,
  ProgressRoot,
  ProgressTrack,
  Text,
  VStack,
} from '@chakra-ui/react';
import PageHeader from '../../../components/ui/PageHeader';
import StatusBadge from '../../../components/ui/StatusBadge';
import Surface from '../../../components/ui/Surface';

export default function ExportPage() {
  return (
    <Box>
      <PageHeader
        eyebrow="Export"
        title="Export preview"
        description="Prepare localized pages for delivery after translation and review are complete."
      />
      <Grid alignItems="stretch" gap={4} templateColumns={{ base: '1fr', lg: '1fr 1fr' }}>
        <Surface p={{ base: 5, md: 6 }}>
          <Heading fontSize="lg" letterSpacing="-0.01em" mb={5}>
            Export settings
          </Heading>
          <VStack align="stretch" gap={4}>
            <Field.Root>
              <Field.Label>File name</Field.Label>
              <Input borderRadius="var(--atlas-radius-sm)" defaultValue="project-export" />
            </Field.Root>
            <Button className="atlas-button-motion" color="white" colorPalette="blue" w="full">
              Export now
            </Button>
          </VStack>
        </Surface>
        <Surface p={{ base: 5, md: 6 }}>
          <Heading fontSize="lg" letterSpacing="-0.01em" mb={5}>
            Progress
          </Heading>
          <Box mb={5}>
            <HStack justify="space-between" mb={2}>
              <Text color="var(--atlas-foreground)" fontSize="sm" fontWeight="750">
                Processing
              </Text>
              <Text color="var(--atlas-muted)" fontSize="sm" fontVariantNumeric="tabular-nums">
                45%
              </Text>
            </HStack>
            <ProgressRoot value={45} max={100}>
              <ProgressTrack bg="var(--atlas-surface-muted)" borderRadius="999px" h="8px">
                <ProgressRange bg="var(--atlas-primary)" borderRadius="999px" />
              </ProgressTrack>
            </ProgressRoot>
          </Box>
          <HStack
            bg="var(--atlas-surface-muted)"
            borderRadius="var(--atlas-radius-md)"
            justify="space-between"
            p={4}
            w="full"
          >
            <Text color="var(--atlas-muted)" fontSize="sm">
              Validation
            </Text>
            <StatusBadge status="completed" />
          </HStack>
        </Surface>
      </Grid>
    </Box>
  );
}
