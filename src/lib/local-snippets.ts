import { Snippet } from '@/types';

const LOCAL_SNIPPETS_KEY = 'codeshare-hub.local-snippets';
const LOCAL_DRAFT_KEY = 'codeshare-hub.snippet-draft';

type DraftSnippet = {
  title: string;
  description: string;
  code: string;
  language: string;
  tags: string;
  isPublic: boolean;
};

const safeParse = <T>(value: string | null, fallback: T): T => {
  if (!value) return fallback;

  try {
    return JSON.parse(value) as T;
  } catch {
    return fallback;
  }
};

const isBrowser = () => typeof window !== 'undefined';

const inferLevel = (code: string, tags: string[]): NonNullable<Snippet['level']> => {
  const complexityScore = code.split('\n').length + tags.length * 2;

  if (complexityScore >= 20) return 'Advanced';
  if (complexityScore >= 10) return 'Intermediate';
  return 'Beginner';
};

export const loadSnippetDraft = (): DraftSnippet | null => {
  if (!isBrowser()) return null;
  return safeParse<DraftSnippet | null>(window.localStorage.getItem(LOCAL_DRAFT_KEY), null);
};

export const saveSnippetDraft = (draft: DraftSnippet) => {
  if (!isBrowser()) return;
  window.localStorage.setItem(LOCAL_DRAFT_KEY, JSON.stringify(draft));
};

export const clearSnippetDraft = () => {
  if (!isBrowser()) return;
  window.localStorage.removeItem(LOCAL_DRAFT_KEY);
};

export const getLocalSnippets = (): Snippet[] => {
  if (!isBrowser()) return [];
  return safeParse<Snippet[]>(window.localStorage.getItem(LOCAL_SNIPPETS_KEY), []);
};

const saveLocalSnippets = (snippets: Snippet[]) => {
  if (!isBrowser()) return;
  window.localStorage.setItem(LOCAL_SNIPPETS_KEY, JSON.stringify(snippets));
};

export const createLocalSnippet = (input: DraftSnippet) => {
  const now = new Date().toISOString();
  const tags = input.tags
    .split(',')
    .map((tag) => tag.trim())
    .filter(Boolean);
  const id = typeof crypto !== 'undefined' && 'randomUUID' in crypto
    ? `local-${crypto.randomUUID()}`
    : `local-${Date.now()}`;

  const snippet: Snippet = {
    _id: id,
    title: input.title.trim(),
    description: input.description.trim(),
    code: input.code,
    language: input.language,
    tags,
    authorId: 'local-browser',
    authorName: 'Local Browser',
    upvotes: 0,
    downvotes: 0,
    views: 0,
    isPublic: false,
    createdAt: now,
    updatedAt: now,
    href: `/snippet/local/${id}`,
    source: 'local',
    level: inferLevel(input.code, tags),
  };

  const existing = getLocalSnippets().filter((item) => item._id !== snippet._id);
  saveLocalSnippets([snippet, ...existing]);
  return snippet;
};

export const getLocalSnippetById = (id: string) => getLocalSnippets().find((snippet) => snippet._id === id) ?? null;
