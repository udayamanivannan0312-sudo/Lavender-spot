export const DEFAULT_ADMIN_EMAIL = 'admin@lavender-spot.com';

export function getConfiguredAdminEmails(value: string | undefined): string[] {
  return (value || '')
    .split(',')
    .map((email) => email.trim().toLowerCase())
    .filter(Boolean);
}
