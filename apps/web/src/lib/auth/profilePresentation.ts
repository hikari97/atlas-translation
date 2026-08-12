/** Returns up to two initials for compact profile avatars. */
export function getProfileInitials(name: string): string {
  return name
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase())
    .join('') || 'AS';
}

/** Returns the first profile name used in short greetings. */
export function getProfileFirstName(name: string | undefined): string {
  return name?.split(/\s+/).find(Boolean) || 'there';
}
