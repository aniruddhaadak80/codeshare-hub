import { Session } from 'next-auth';

/** Extract a stable user identifier from a NextAuth session. */
export function getSessionUserId(session: Session): string {
  const user = session.user as { id?: string; email?: string | null };
  return user.id || user.email || '';
}
