import { Box, Button, Field, Grid, HStack, Text, Textarea, VStack } from '@chakra-ui/react';
import PageHeader from '../../../components/ui/PageHeader';
import StatusBadge from '../../../components/ui/StatusBadge';
import Surface from '../../../components/ui/Surface';

const bubbles = [
  { id: '1', original: '俺が退治してやる！', translated: 'I will destroy them!', status: 'review', confidence: 92 },
  { id: '2', original: '待ってくれ！', translated: 'Wait for me!', status: 'approved', confidence: 88 },
];

export default function TranslationWorkbenchPage() {
  return (
    <Box>
      <PageHeader
        eyebrow="Review"
        title="Translation workbench"
        description="Compare original text against translated copy, then approve or revise each bubble."
      />
      <VStack align="stretch" gap={4}>
        {bubbles.map((bubble) => (
          <Surface key={bubble.id} p={{ base: 5, md: 6 }}>
            <HStack justify="space-between" mb={4} wrap="wrap">
              <HStack gap={2}>
                <StatusBadge status={bubble.status} />
                <Text color="var(--atlas-muted)" fontSize="sm" fontVariantNumeric="tabular-nums">
                  Confidence {bubble.confidence}%
                </Text>
              </HStack>
              <Text color="var(--atlas-subtle)" fontFamily="mono" fontSize="xs">
                Bubble {bubble.id}
              </Text>
            </HStack>
            <Grid gap={4} templateColumns={{ base: '1fr', lg: '1fr 1fr' }}>
              <Field.Root>
                <Field.Label>Original</Field.Label>
                <Textarea
                  borderRadius="var(--atlas-radius-sm)"
                  minH="8rem"
                  readOnly
                  value={bubble.original}
                />
              </Field.Root>
              <Field.Root>
                <Field.Label>Translation</Field.Label>
                <Textarea
                  borderRadius="var(--atlas-radius-sm)"
                  defaultValue={bubble.translated}
                  minH="8rem"
                />
              </Field.Root>
            </Grid>
            <HStack gap={2} mt={4} wrap="wrap">
              <Button className="atlas-button-motion" colorPalette="green" size="sm">
                Approve
              </Button>
              <Button className="atlas-button-motion" size="sm" variant="outline">
                Revise
              </Button>
            </HStack>
          </Surface>
        ))}
      </VStack>
    </Box>
  );
}
