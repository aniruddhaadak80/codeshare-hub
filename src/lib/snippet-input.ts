/**
 * The fields a client is allowed to set on a snippet.
 *
 * Everything else on the model is owned by the server: the vote counters are
 * maintained by the vote route, the view counter by the detail route and the
 * author fields by the session. Spreading the whole request body into the
 * document would let a client write those.
 */
export const CLIENT_SNIPPET_FIELDS = [
  'title',
  'description',
  'code',
  'language',
  'tags',
  'collectionId',
] as const;

export type ClientSnippetField = (typeof CLIENT_SNIPPET_FIELDS)[number];

/** Keep only the fields a client may set, and drop everything else. */
export function pickSnippetInput(data: unknown): Record<string, unknown> {
  if (!data || typeof data !== 'object' || Array.isArray(data)) {
    return {};
  }

  const source = data as Record<string, unknown>;
  const picked: Record<string, unknown> = {};

  for (const field of CLIENT_SNIPPET_FIELDS) {
    if (source[field] !== undefined) {
      picked[field] = source[field];
    }
  }

  return picked;
}

/**
 * Parse a pagination parameter.
 *
 * A value that is not a number falls back to the default, and a negative
 * value is clamped, so a crafted query string can never make the driver
 * throw.
 */
export function parseBoundedInt(
  value: string | null | undefined,
  fallback: number,
  max: number,
  min = 0
): number {
  const parsed = Number.parseInt(value ?? '', 10);

  if (!Number.isFinite(parsed)) {
    return fallback;
  }

  if (parsed < min) {
    return min;
  }

  return Math.min(parsed, max);
}
