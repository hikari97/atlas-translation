import { Box, Button, Grid, HStack, Heading, Text, VStack } from '@chakra-ui/react';
import Link from 'next/link';
import { LuArrowUpRight, LuImage, LuLanguages, LuScanText } from 'react-icons/lu';

const editorSteps = [
  { label: 'Upload', icon: LuImage },
  { label: 'Translate', icon: LuLanguages },
  { label: 'Edit', icon: LuScanText },
] as const;

export default function ImageEditorLaunchCard() {
  return (
    <Box
      as="section"
      bg="#dfeaff"
      borderRadius="var(--atlas-radius-xl)"
      boxShadow="var(--atlas-shadow-lg)"
      color="var(--atlas-foreground)"
      display="grid"
      gridTemplateColumns={{ base: '1fr', md: '1.15fr 0.85fr' }}
      minH={{ base: 'auto', md: '24rem' }}
      overflow="hidden"
      position="relative"
    >
      <VStack
        align="flex-start"
        gap={5}
        justify="space-between"
        p={{ base: 6, md: 8, lg: 10 }}
        position="relative"
        zIndex={1}
      >
        <Box>
          <Text color="var(--atlas-primary)" fontSize="sm" fontWeight="800">
            Your first tool
          </Text>
          <Heading
            as="h2"
            fontSize={{ base: '2rem', md: '2.75rem' }}
            fontWeight="850"
            letterSpacing="-0.055em"
            lineHeight="0.98"
            maxW="12ch"
            mt={3}
            textWrap="balance"
          >
            Translate a comic page directly.
          </Heading>
          <Text color="var(--atlas-muted)" lineHeight="1.75" maxW="48ch" mt={5}>
            Open an image, let the AI remove and translate its text, then refine every bubble before downloading.
          </Text>
        </Box>
        <Button
          asChild
          bg="var(--atlas-primary)"
          borderRadius="var(--atlas-radius-sm)"
          className="atlas-button-motion"
          color="white"
          fontWeight="850"
          size="lg"
          _hover={{ bg: 'var(--atlas-primary-hover)', boxShadow: '0 12px 28px rgba(37, 99, 235, 0.22)' }}
        >
          <Link href="/dashboard/images">
            Open image editor <LuArrowUpRight />
          </Link>
        </Button>
      </VStack>

      <Box
        alignSelf="end"
        bg="rgba(255,255,255,0.48)"
        borderColor="rgba(37,99,235,0.14)"
        borderLeftWidth={{ base: 0, md: '1px' }}
        borderRadius={{ base: '22px 22px 0 0', md: '24px 0 0 0' }}
        borderTopWidth="1px"
        mb={0}
        mr={0}
        mt={{ base: 0, md: 10 }}
        overflow="hidden"
        p={{ base: 5, md: 6 }}
      >
        <HStack justify="space-between" mb={5}>
          <HStack gap={2}>
            <Box bg="#ef6a5b" borderRadius="999px" h="0.55rem" w="0.55rem" />
            <Box bg="#e4b653" borderRadius="999px" h="0.55rem" w="0.55rem" />
            <Box bg="#65b98a" borderRadius="999px" h="0.55rem" w="0.55rem" />
          </HStack>
          <Text color="var(--atlas-muted)" fontSize="xs">
            editor session
          </Text>
        </HStack>
        <Box
          bg="#cbdcff"
          borderColor="rgba(37,99,235,0.12)"
          borderRadius="16px"
          borderWidth="1px"
          minH="11rem"
          p={4}
        >
          <Grid gap={3} templateColumns="2.75rem 1fr">
            <VStack gap={2}>
              {editorSteps.map(({ icon: Icon, label }) => (
                <Box
                  key={label}
                  alignItems="center"
                  aria-label={label}
                  bg="rgba(255,255,255,0.62)"
                  borderRadius="9px"
                  color="var(--atlas-primary)"
                  display="flex"
                  h="2.35rem"
                  justifyContent="center"
                  w="2.35rem"
                >
                  <Icon size={16} />
                </Box>
              ))}
            </VStack>
            <Box
              bg="#f8fbff"
              borderRadius="10px"
              minH="9rem"
              overflow="hidden"
              p={3}
              position="relative"
            >
              <Box bg="#c7d8f0" borderRadius="999px" h="4.2rem" left="14%" position="absolute" top="18%" w="58%" />
              <Box bg="#ffffff" borderRadius="48%" h="3.5rem" position="absolute" right="9%" top="12%" w="42%" />
              <VStack gap={1} position="absolute" right="17%" top="28%" w="26%">
                <Box bg="#344563" borderRadius="999px" h="0.2rem" w="full" />
                <Box bg="#344563" borderRadius="999px" h="0.2rem" w="80%" />
                <Box bg="#344563" borderRadius="999px" h="0.2rem" w="92%" />
              </VStack>
            </Box>
          </Grid>
        </Box>
      </Box>
    </Box>
  );
}
