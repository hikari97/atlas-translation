import { Box, Flex, HStack, Text } from '@chakra-ui/react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { isActiveNavigationItem, navigationItems } from './navigation';
import UserMenu from './UserMenu';

export default function Topbar() {
  const router = useRouter();

  return (
    <Box
      as="header"
      backdropFilter="blur(18px)"
      bg="var(--atlas-surface)"
      borderBottomWidth="1px"
      borderColor="var(--atlas-border)"
      position="sticky"
      top={0}
      zIndex={20}
    >
      <Flex
        align="center"
        gap={4}
        justify="space-between"
        maxW="var(--atlas-container)"
        mx="auto"
        px={{ base: 4, md: 6 }}
        py={3}
      >
        <HStack asChild className="atlas-focus-ring" gap={3}>
          <Link href="/dashboard">
            <Box
              alignItems="center"
              bg="var(--atlas-primary)"
              borderRadius="var(--atlas-radius-sm)"
              color="white"
              display="flex"
              fontSize="sm"
              fontWeight="900"
              h="2.35rem"
              justifyContent="center"
              letterSpacing="-0.04em"
              w="2.35rem"
            >
              AS
            </Box>
            <Box>
              <Text
                color="var(--atlas-foreground)"
                fontSize="sm"
                fontWeight="850"
                letterSpacing="-0.02em"
                lineHeight="1"
              >
                Atlas Studio
              </Text>
              <Text color="var(--atlas-muted)" fontSize="xs" lineHeight="1.3">
                Comic localization workspace
              </Text>
            </Box>
          </Link>
        </HStack>
        <HStack gap={2}>
          <UserMenu />
        </HStack>
      </Flex>
      <HStack
        as="nav"
        display={{ base: 'flex', lg: 'none' }}
        gap={2}
        overflowX="auto"
        px={4}
        pb={3}
      >
        {navigationItems.map((item) => {
          const active = isActiveNavigationItem(router.pathname, item.href);

          return (
            <Box
              key={item.href}
              aria-current={active ? 'page' : undefined}
              asChild
              bg={active ? 'var(--atlas-primary-soft)' : 'transparent'}
              borderRadius="999px"
              className="atlas-focus-ring"
              color={active ? 'var(--atlas-primary-strong)' : 'var(--atlas-muted)'}
              flex="0 0 auto"
              fontSize="sm"
              fontWeight="750"
              px={3}
              py={2}
            >
              <Link href={item.href}>{item.label}</Link>
            </Box>
          );
        })}
      </HStack>
    </Box>
  );
}
