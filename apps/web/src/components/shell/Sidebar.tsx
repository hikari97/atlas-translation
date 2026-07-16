import { Box, HStack, Text, VStack } from '@chakra-ui/react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { isActiveNavigationItem, navigationItems } from './navigation';

export default function Sidebar() {
  const router = useRouter();

  return (
    <Box
      as="aside"
      display={{ base: 'none', lg: 'block' }}
      flexShrink={0}
      minH="calc(100dvh - 4.5rem)"
      p={4}
      position="sticky"
      top="4.5rem"
      w="17rem"
    >
      <Box
        bg="var(--atlas-surface)"
        borderWidth="1px"
        borderColor="var(--atlas-border)"
        borderRadius="var(--atlas-radius-xl)"
        boxShadow="var(--atlas-shadow-sm)"
        h="full"
        p={3}
      >
        <Text
          color="var(--atlas-muted)"
          fontSize="xs"
          fontWeight="800"
          letterSpacing="0.12em"
          mb={3}
          px={3}
          textTransform="uppercase"
        >
          Workspace
        </Text>
        <VStack align="stretch" as="nav" gap={1}>
          {navigationItems.map((item) => {
            const active = isActiveNavigationItem(router.pathname, item.href);
            const Icon = item.icon;

            return (
              <Box
                key={item.href}
                aria-current={active ? 'page' : undefined}
                asChild
                borderRadius="var(--atlas-radius-md)"
                className="atlas-focus-ring"
                color={active ? 'var(--atlas-foreground)' : 'var(--atlas-muted)'}
                px={3}
                py={2.5}
                transition="all 180ms ease"
                _hover={{
                  bg: active ? 'var(--atlas-primary-soft)' : 'var(--atlas-surface-muted)',
                  color: 'var(--atlas-foreground)',
                  transform: 'translateX(2px)',
                }}
                bg={active ? 'var(--atlas-primary-soft)' : 'transparent'}
              >
                <Link href={item.href}>
                  <HStack gap={3}>
                    <Icon size={18} />
                    <Text fontSize="sm" fontWeight={active ? '800' : '650'}>
                      {item.label}
                    </Text>
                  </HStack>
                </Link>
              </Box>
            );
          })}
        </VStack>
      </Box>
    </Box>
  );
}
