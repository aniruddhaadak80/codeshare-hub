export interface Snippet {
  _id: string;
  title: string;
  description: string;
  code: string;
  language: string;
  tags: string[];
  authorId: string;
  authorName: string;
  authorImage?: string;
  upvotes: number;
  downvotes: number;
  views: number;
  isPublic: boolean;
  collectionId?: string;
  createdAt: string;
  updatedAt: string;
}

export interface Collection {
  _id: string;
  name: string;
  description: string;
  isPublic: boolean;
  authorId: string;
  authorName: string;
  snippetIds: string[];
  createdAt: string;
}

export interface User {
  _id: string;
  name: string;
  email: string;
  image?: string;
  username?: string;
  bio?: string;
  createdAt: string;
}

export const LANGUAGES = [
  'javascript', 'typescript', 'python', 'java', 'c', 'cpp', 'csharp',
  'php', 'ruby', 'go', 'rust', 'swift', 'kotlin', 'scala', 'html',
  'css', 'scss', 'sql', 'bash', 'shell', 'powershell', 'yaml', 'json',
  'xml', 'markdown', 'graphql', 'docker', 'nginx', 'apache',
  'r', 'matlab', 'perl', 'lua', 'haskell', 'elixir', 'erlang',
  'clojure', 'dart', 'flutter', 'react', 'vue', 'angular', 'svelte',
  'nextjs', 'nodejs', 'express', 'django', 'flask', 'rails', 'laravel',
  'spring', 'terraform', 'ansible', 'kubernetes', 'protobuf',
];
