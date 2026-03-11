import { Snippet } from '@/types';

const TAG_WEIGHT = 2;
const INTERMEDIATE_THRESHOLD = 10;
const ADVANCED_THRESHOLD = 20;

export const inferSnippetLevel = (code: string, tags: string[]): NonNullable<Snippet['level']> => {
  const complexityScore = code.split('\n').length + tags.length * TAG_WEIGHT;

  if (complexityScore >= ADVANCED_THRESHOLD) return 'Advanced';
  if (complexityScore >= INTERMEDIATE_THRESHOLD) return 'Intermediate';
  return 'Beginner';
};
