import { Box, Field, IconButton, Input } from '@chakra-ui/react';
import { useId, useState, type ChangeEvent, type ReactNode } from 'react';
import { LuEye, LuEyeOff } from 'react-icons/lu';

interface AuthFieldProps {
  readonly autoComplete: string;
  readonly error?: string;
  readonly helperText?: string;
  readonly icon: ReactNode;
  readonly label: string;
  readonly name: string;
  readonly onChange: (event: ChangeEvent<HTMLInputElement>) => void;
  readonly placeholder: string;
  readonly type?: 'email' | 'text';
  readonly value: string;
}

type AuthPasswordFieldProps = Omit<AuthFieldProps, 'type'>;

const inputStyles = {
  bg: 'var(--atlas-surface-muted)',
  borderColor: 'var(--atlas-border-strong)',
  borderRadius: 'var(--atlas-radius-sm)',
  fontSize: 'sm',
  h: '3.25rem',
  transition: 'border-color 160ms ease, box-shadow 160ms ease, background-color 160ms ease',
  _focusVisible: {
    bg: 'var(--atlas-surface-solid)',
    borderColor: 'var(--atlas-primary)',
    boxShadow: '0 0 0 3px rgba(37, 99, 235, 0.14)',
    outline: 'none',
  },
  _invalid: {
    borderColor: 'var(--atlas-danger)',
    boxShadow: '0 0 0 3px rgba(180, 35, 24, 0.08)',
  },
} as const;

function FieldMessage({ error, helperText }: Pick<AuthFieldProps, 'error' | 'helperText'>) {
  if (error) {
    return <Field.ErrorText fontSize="xs">{error}</Field.ErrorText>;
  }

  if (helperText) {
    return (
      <Field.HelperText color="var(--atlas-muted)" fontSize="xs">
        {helperText}
      </Field.HelperText>
    );
  }

  return null;
}

/** Renders a labeled authentication input with consistent icon and validation treatment. */
export function AuthField({
  autoComplete,
  error,
  helperText,
  icon,
  label,
  name,
  onChange,
  placeholder,
  type = 'text',
  value,
}: AuthFieldProps) {
  const generatedId = useId();
  const inputId = `${name}-${generatedId}`;

  return (
    <Field.Root invalid={Boolean(error)} required>
      <Field.Label color="var(--atlas-foreground)" fontSize="sm" fontWeight="700" htmlFor={inputId}>
        {label}
        <Field.RequiredIndicator />
      </Field.Label>
      <Box position="relative" w="full">
        <Box
          alignItems="center"
          color={error ? 'var(--atlas-danger)' : 'var(--atlas-muted)'}
          display="flex"
          insetStart="1rem"
          pointerEvents="none"
          position="absolute"
          top="50%"
          transform="translateY(-50%)"
          zIndex="1"
        >
          {icon}
        </Box>
        <Input
          {...inputStyles}
          autoComplete={autoComplete}
          id={inputId}
          name={name}
          onChange={onChange}
          paddingInlineStart="3rem"
          placeholder={placeholder}
          type={type}
          value={value}
        />
      </Box>
      <FieldMessage error={error} helperText={helperText} />
    </Field.Root>
  );
}

/** Renders an authentication password input with a keyboard-accessible visibility toggle. */
export function AuthPasswordField({
  autoComplete,
  error,
  helperText,
  icon,
  label,
  name,
  onChange,
  placeholder,
  value,
}: AuthPasswordFieldProps) {
  const generatedId = useId();
  const inputId = `${name}-${generatedId}`;
  const [isVisible, setIsVisible] = useState(false);

  return (
    <Field.Root invalid={Boolean(error)} required>
      <Field.Label color="var(--atlas-foreground)" fontSize="sm" fontWeight="700" htmlFor={inputId}>
        {label}
        <Field.RequiredIndicator />
      </Field.Label>
      <Box position="relative" w="full">
        <Box
          alignItems="center"
          color={error ? 'var(--atlas-danger)' : 'var(--atlas-muted)'}
          display="flex"
          insetStart="1rem"
          pointerEvents="none"
          position="absolute"
          top="50%"
          transform="translateY(-50%)"
          zIndex="1"
        >
          {icon}
        </Box>
        <Input
          {...inputStyles}
          autoComplete={autoComplete}
          id={inputId}
          name={name}
          onChange={onChange}
          paddingInlineEnd="3.25rem"
          paddingInlineStart="3rem"
          placeholder={placeholder}
          type={isVisible ? 'text' : 'password'}
          value={value}
        />
        <IconButton
          aria-label={isVisible ? 'Hide password' : 'Show password'}
          color="var(--atlas-muted)"
          minW="2.5rem"
          onClick={() => setIsVisible((current) => !current)}
          position="absolute"
          right="0.4rem"
          size="sm"
          top="50%"
          transform="translateY(-50%)"
          type="button"
          variant="ghost"
        >
          {isVisible ? <LuEyeOff /> : <LuEye />}
        </IconButton>
      </Box>
      <FieldMessage error={error} helperText={helperText} />
    </Field.Root>
  );
}
