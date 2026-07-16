import { Box, HStack, Skeleton, Text, VStack } from '@chakra-ui/react';
import { LuBadgeCheck, LuMail } from 'react-icons/lu';
import type { AuthProfile } from '../../lib/data/authProfile';
import Surface from '../ui/Surface';

interface ProfileOverviewCardProps {
  readonly isLoading: boolean;
  readonly profile: AuthProfile | undefined;
}

function getInitials(name: string): string {
  return name
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase())
    .join('') || 'AS';
}

export default function ProfileOverviewCard({
  isLoading,
  profile,
}: ProfileOverviewCardProps) {
  return (
    <Surface as="section" overflow="hidden" p={{ base: 5, md: 6 }}>
      <HStack align="flex-start" justify="space-between" mb={7}>
        <Box>
          <Text color="var(--atlas-muted)" fontSize="sm" fontWeight="750">
            Profile
          </Text>
          <Text color="var(--atlas-foreground)" fontSize="lg" fontWeight="850" mt={1}>
            Account details
          </Text>
        </Box>
        <HStack
          bg="var(--atlas-primary-soft)"
          borderRadius="var(--atlas-radius-sm)"
          color="var(--atlas-primary-strong)"
          gap={1.5}
          px={2.5}
          py={1.5}
        >
          <LuBadgeCheck size={15} />
          <Text fontSize="xs" fontWeight="800">
            Active
          </Text>
        </HStack>
      </HStack>

      <HStack align="center" gap={4}>
        <Box
          alignItems="center"
          bg="var(--atlas-foreground)"
          borderRadius="18px"
          color="var(--atlas-background)"
          display="flex"
          flexShrink={0}
          fontSize="lg"
          fontWeight="900"
          h="4rem"
          justifyContent="center"
          letterSpacing="-0.04em"
          w="4rem"
        >
          {getInitials(profile?.name || 'Atlas Studio')}
        </Box>
        <VStack align="flex-start" flex="1" gap={1} minW={0}>
          {isLoading && !profile ? (
            <>
              <Skeleton h="1.3rem" w="9rem" />
              <Skeleton h="1rem" w="12rem" />
            </>
          ) : (
            <>
              <Text
                color="var(--atlas-foreground)"
                fontSize="xl"
                fontWeight="850"
                letterSpacing="-0.025em"
                lineClamp={1}
              >
                {profile?.name || 'Atlas user'}
              </Text>
              <HStack color="var(--atlas-muted)" gap={1.5} minW={0}>
                <LuMail size={14} />
                <Text fontSize="sm" lineClamp={1}>
                  {profile?.email || 'Profile unavailable'}
                </Text>
              </HStack>
            </>
          )}
        </VStack>
      </HStack>

      <HStack
        borderColor="var(--atlas-border)"
        borderTopWidth="1px"
        justify="space-between"
        mt={6}
        pt={5}
      >
        <Box>
          <Text color="var(--atlas-muted)" fontSize="xs">
            Role
          </Text>
          <Text color="var(--atlas-foreground)" fontSize="sm" fontWeight="800" mt={0.5} textTransform="capitalize">
            {profile?.role || 'user'}
          </Text>
        </Box>
        <Box textAlign="right">
          <Text color="var(--atlas-muted)" fontSize="xs">
            Plan
          </Text>
          <Text color="var(--atlas-foreground)" fontSize="sm" fontWeight="800" mt={0.5}>
            Starter preview
          </Text>
        </Box>
      </HStack>
    </Surface>
  );
}
