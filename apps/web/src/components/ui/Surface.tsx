import { Box, type BoxProps } from '@chakra-ui/react';
import type { ReactNode } from 'react';

interface SurfaceProps extends BoxProps {
  readonly children: ReactNode;
}

export default function Surface({ children, ...props }: SurfaceProps) {
  return (
    <Box
      bg="var(--atlas-surface)"
      borderWidth="1px"
      borderColor="var(--atlas-border)"
      borderRadius="var(--atlas-radius-lg)"
      boxShadow="var(--atlas-shadow-sm)"
      backdropFilter="blur(18px)"
      {...props}
    >
      {children}
    </Box>
  );
}
