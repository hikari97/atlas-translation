import { Badge, type BadgeProps } from '@chakra-ui/react';

interface StatusBadgeProps extends Omit<BadgeProps, 'children'> {
  readonly status: string;
}

const paletteByStatus: Record<string, string> = {
  active: 'blue',
  approved: 'green',
  archived: 'gray',
  completed: 'green',
  draft: 'gray',
  failed: 'red',
  ocr: 'blue',
  pending: 'gray',
  ready: 'blue',
  review: 'orange',
  running: 'blue',
  translated: 'blue',
  typesetting: 'purple',
};

function formatStatus(status: string): string {
  return status
    .replace(/[-_]/g, ' ')
    .replace(/\b\w/g, (letter) => letter.toUpperCase());
}

export default function StatusBadge({ status, ...props }: StatusBadgeProps) {
  const normalizedStatus = status.toLowerCase();

  return (
    <Badge
      borderRadius="999px"
      colorPalette={paletteByStatus[normalizedStatus] ?? 'gray'}
      fontWeight="700"
      px={2.5}
      py={1}
      textTransform="none"
      variant="subtle"
      {...props}
    >
      {formatStatus(status)}
    </Badge>
  );
}
