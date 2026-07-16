import { Button, type ButtonProps } from '@chakra-ui/react';
import Link from 'next/link';

interface OpenEditorButtonProps {
  readonly href: string;
  readonly size?: ButtonProps['size'];
}

export default function OpenEditorButton({ href, size }: OpenEditorButtonProps) {
  return (
    <Button
      asChild
      bg="var(--atlas-primary)"
      borderColor="transparent"
      borderRadius="var(--atlas-radius-sm)"
      boxShadow="0 10px 24px rgba(37, 99, 235, 0.18)"
      className="atlas-button-motion"
      color="var(--atlas-primary-contrast)"
      fontWeight="800"
      letterSpacing="-0.01em"
      size={size}
      _active={{ bg: 'var(--atlas-primary-hover)', transform: 'translateY(0) scale(0.99)' }}
      _focusVisible={{ outline: '3px solid var(--atlas-primary-soft)', outlineOffset: '3px' }}
      _hover={{ bg: 'var(--atlas-primary-hover)', boxShadow: '0 14px 30px rgba(37, 99, 235, 0.22)' }}
    >
      <Link href={href}>Open editor</Link>
    </Button>
  );
}
