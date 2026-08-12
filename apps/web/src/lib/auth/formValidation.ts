export interface LoginFormValues {
  readonly email: string;
  readonly password: string;
}

export interface RegisterFormValues extends LoginFormValues {
  readonly confirmPassword: string;
  readonly name: string;
}

export type LoginFormErrors = Partial<Record<keyof LoginFormValues, string>>;
export type RegisterFormErrors = Partial<Record<keyof RegisterFormValues, string>>;

export const MINIMUM_PASSWORD_LENGTH = 8;

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const MINIMUM_NAME_LENGTH = 2;

/** Validates login values before an authentication request is sent. */
export function validateLoginForm(values: LoginFormValues): LoginFormErrors {
  const errors: LoginFormErrors = {};

  if (!values.email.trim()) {
    errors.email = 'Email is required.';
  } else if (!EMAIL_PATTERN.test(values.email.trim())) {
    errors.email = 'Enter a valid email address.';
  }

  if (!values.password) {
    errors.password = 'Password is required.';
  }

  return errors;
}

/** Validates account details and password confirmation before registration. */
export function validateRegisterForm(values: RegisterFormValues): RegisterFormErrors {
  const errors: RegisterFormErrors = validateLoginForm(values);

  if (!values.name.trim()) {
    errors.name = 'Name is required.';
  } else if (values.name.trim().length < MINIMUM_NAME_LENGTH) {
    errors.name = 'Name must contain at least 2 characters.';
  }

  if (values.password && values.password.length < MINIMUM_PASSWORD_LENGTH) {
    errors.password = `Use at least ${MINIMUM_PASSWORD_LENGTH} characters.`;
  }

  if (!values.confirmPassword) {
    errors.confirmPassword = 'Confirm your password.';
  } else if (values.confirmPassword !== values.password) {
    errors.confirmPassword = 'Passwords do not match.';
  }

  return errors;
}
