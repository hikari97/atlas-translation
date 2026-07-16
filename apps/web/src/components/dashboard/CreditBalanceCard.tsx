import { Box, HStack, Text, VStack } from '@chakra-ui/react';
import { LuCoins, LuInfo } from 'react-icons/lu';
import Surface from '../ui/Surface';

const CREDIT_BALANCE = 1_240;
const CREDIT_LIMIT = 1_600;
const CREDIT_USED = CREDIT_LIMIT - CREDIT_BALANCE;
const CREDIT_REMAINING_PERCENT = (CREDIT_BALANCE / CREDIT_LIMIT) * 100;

export default function CreditBalanceCard() {
  return (
    <Surface as="section" p={{ base: 5, md: 6 }}>
      <HStack align="flex-start" justify="space-between">
        <Box>
          <HStack color="var(--atlas-muted)" gap={2}>
            <LuCoins size={17} />
            <Text fontSize="sm" fontWeight="750">
              Credit balance
            </Text>
          </HStack>
          <Text
            color="var(--atlas-foreground)"
            fontSize={{ base: '2.75rem', md: '3.4rem' }}
            fontVariantNumeric="tabular-nums"
            fontWeight="880"
            letterSpacing="-0.06em"
            lineHeight="0.95"
            mt={5}
          >
            {CREDIT_BALANCE.toLocaleString('en-US')}
          </Text>
          <Text color="var(--atlas-muted)" fontSize="sm" mt={2}>
            credits available
          </Text>
        </Box>
        <Text
          bg="var(--atlas-surface-muted)"
          borderColor="var(--atlas-border)"
          borderRadius="8px"
          borderWidth="1px"
          color="var(--atlas-muted)"
          fontSize="xs"
          fontWeight="800"
          px={2.5}
          py={1.5}
        >
          Dummy data
        </Text>
      </HStack>

      <VStack align="stretch" gap={2.5} mt={7}>
        <HStack color="var(--atlas-muted)" fontSize="xs" justify="space-between">
          <Text>{CREDIT_USED} used</Text>
          <Text>{CREDIT_LIMIT.toLocaleString('en-US')} monthly allocation</Text>
        </HStack>
        <Box
          aria-label={`${Math.round(CREDIT_REMAINING_PERCENT)} percent credits remaining`}
          bg="var(--atlas-background-strong)"
          borderRadius="999px"
          h="0.55rem"
          overflow="hidden"
          role="progressbar"
          aria-valuemax={CREDIT_LIMIT}
          aria-valuemin={0}
          aria-valuenow={CREDIT_BALANCE}
        >
          <Box
            bg="var(--atlas-primary)"
            borderRadius="inherit"
            h="full"
            transition="width 300ms ease"
            w={`${CREDIT_REMAINING_PERCENT}%`}
          />
        </Box>
        <HStack align="flex-start" color="var(--atlas-subtle)" gap={2} pt={2}>
          <LuInfo size={14} />
          <Text fontSize="xs" lineHeight="1.6">
            Credit accounting will connect to the billing service in a later release.
          </Text>
        </HStack>
      </VStack>
    </Surface>
  );
}
