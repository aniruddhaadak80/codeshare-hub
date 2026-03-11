import { Snippet } from '@/types';

type SnippetLevel = NonNullable<Snippet['level']>;

type Topic = {
  slug: string;
  title: string;
  summary: string;
  tags: string[];
  level: SnippetLevel;
  focus: string;
};

const TOPICS: Topic[] = [
  {
    slug: 'debounced-search',
    title: 'Debounced Search Handler',
    summary: 'Delay search requests until the user stops typing.',
    tags: ['search', 'performance', 'ui'],
    level: 'Intermediate',
    focus: 'debounced lookups in fast-moving search forms',
  },
  {
    slug: 'pagination-range',
    title: 'Pagination Range Builder',
    summary: 'Build predictable page ranges with ellipsis support.',
    tags: ['pagination', 'navigation', 'utility'],
    level: 'Beginner',
    focus: 'friendly pagination controls for listing pages',
  },
  {
    slug: 'retry-helper',
    title: 'Retry Helper',
    summary: 'Retry a failing operation with bounded attempts.',
    tags: ['async', 'resilience', 'network'],
    level: 'Intermediate',
    focus: 'small retry wrappers for flaky async work',
  },
  {
    slug: 'rate-limit-guard',
    title: 'Rate Limit Guard',
    summary: 'Track requests and slow down bursts safely.',
    tags: ['security', 'rate-limit', 'api'],
    level: 'Advanced',
    focus: 'basic throttling around public endpoints',
  },
  {
    slug: 'cache-key-factory',
    title: 'Cache Key Factory',
    summary: 'Compose stable cache keys from user input and filters.',
    tags: ['cache', 'data', 'utility'],
    level: 'Beginner',
    focus: 'stable cache keys for snippets and filters',
  },
  {
    slug: 'theme-toggle',
    title: 'Theme Toggle State',
    summary: 'Persist dark mode and user display preferences.',
    tags: ['theme', 'preferences', 'state'],
    level: 'Beginner',
    focus: 'remembering interface preferences in apps',
  },
  {
    slug: 'copy-to-clipboard',
    title: 'Clipboard Copy Action',
    summary: 'Copy formatted code or commands with user feedback.',
    tags: ['clipboard', 'ux', 'code'],
    level: 'Beginner',
    focus: 'copy actions with quick success feedback',
  },
  {
    slug: 'form-validator',
    title: 'Inline Form Validator',
    summary: 'Validate required fields and show concise messages.',
    tags: ['forms', 'validation', 'ux'],
    level: 'Intermediate',
    focus: 'clear validation for snippet creation forms',
  },
  {
    slug: 'slug-generator',
    title: 'Slug Generator',
    summary: 'Convert titles into clean URL-safe identifiers.',
    tags: ['slug', 'strings', 'seo'],
    level: 'Beginner',
    focus: 'readable URLs for content and snippets',
  },
  {
    slug: 'group-by-tag',
    title: 'Group By Tag',
    summary: 'Turn a list of snippets into tag-based buckets.',
    tags: ['tags', 'collections', 'array'],
    level: 'Intermediate',
    focus: 'grouping snippets by topic and label',
  },
  {
    slug: 'diff-highlighter',
    title: 'Diff Highlighter',
    summary: 'Mark added and removed lines in a compact code preview.',
    tags: ['diff', 'editor', 'code'],
    level: 'Advanced',
    focus: 'showing before and after code states clearly',
  },
  {
    slug: 'env-reader',
    title: 'Environment Reader',
    summary: 'Read environment configuration with safe defaults.',
    tags: ['config', 'environment', 'backend'],
    level: 'Beginner',
    focus: 'bootstrapping services with clear defaults',
  },
  {
    slug: 'query-builder',
    title: 'Query Builder',
    summary: 'Compose search filters into a reusable query object.',
    tags: ['search', 'filters', 'backend'],
    level: 'Intermediate',
    focus: 'combining filter state into a single query',
  },
  {
    slug: 'sort-comparator',
    title: 'Sort Comparator',
    summary: 'Choose the right sort strategy for title, views, or score.',
    tags: ['sorting', 'ranking', 'utility'],
    level: 'Beginner',
    focus: 'custom ordering for snippet directories',
  },
  {
    slug: 'selection-state',
    title: 'Selection State Helper',
    summary: 'Track a selected snippet and its surrounding context.',
    tags: ['selection', 'state', 'ui'],
    level: 'Intermediate',
    focus: 'interactive snippet previews and selection state',
  },
  {
    slug: 'recent-items',
    title: 'Recent Items Tracker',
    summary: 'Store a compact history of recently viewed snippets.',
    tags: ['history', 'local-storage', 'productivity'],
    level: 'Intermediate',
    focus: 'recently opened snippet experiences',
  },
  {
    slug: 'search-tokenizer',
    title: 'Search Tokenizer',
    summary: 'Split user search into phrases and weighted terms.',
    tags: ['search', 'tokenizer', 'ranking'],
    level: 'Advanced',
    focus: 'smart search boxes with phrase support',
  },
  {
    slug: 'snippet-summary',
    title: 'Snippet Summary Formatter',
    summary: 'Render short summaries without losing important metadata.',
    tags: ['summary', 'cards', 'ui'],
    level: 'Beginner',
    focus: 'small snippet cards with concise context',
  },
  {
    slug: 'tag-cloud',
    title: 'Tag Cloud Builder',
    summary: 'Rank tags and surface the most useful quick filters.',
    tags: ['tags', 'analytics', 'filtering'],
    level: 'Intermediate',
    focus: 'highlighting top filters from snippet data',
  },
  {
    slug: 'preview-panel',
    title: 'Preview Panel Layout',
    summary: 'Show the active snippet beside a searchable list.',
    tags: ['preview', 'layout', 'interactive'],
    level: 'Advanced',
    focus: 'side-by-side browsing for interactive snippets',
  },
  {
    slug: 'deep-clone',
    title: 'Deep Clone Utility',
    summary: 'Recursively copy nested objects without shared references.',
    tags: ['clone', 'utility', 'object'],
    level: 'Intermediate',
    focus: 'safe deep copies for state management',
  },
  {
    slug: 'event-emitter',
    title: 'Tiny Event Emitter',
    summary: 'Publish and subscribe to named events with typed payloads.',
    tags: ['events', 'pub-sub', 'pattern'],
    level: 'Intermediate',
    focus: 'lightweight event buses for decoupled modules',
  },
  {
    slug: 'throttle-fn',
    title: 'Throttle Function',
    summary: 'Limit how often a callback fires during rapid triggers.',
    tags: ['throttle', 'performance', 'utility'],
    level: 'Beginner',
    focus: 'scroll and resize handler optimization',
  },
  {
    slug: 'flat-to-tree',
    title: 'Flat-to-Tree Converter',
    summary: 'Turn a flat list with parent IDs into a nested tree structure.',
    tags: ['tree', 'recursion', 'data'],
    level: 'Advanced',
    focus: 'hierarchical menus and category trees',
  },
  {
    slug: 'url-params-parser',
    title: 'URL Params Parser',
    summary: 'Extract and decode query parameters into a typed map.',
    tags: ['url', 'parsing', 'web'],
    level: 'Beginner',
    focus: 'reading filter state from the address bar',
  },
  {
    slug: 'date-formatter',
    title: 'Relative Date Formatter',
    summary: 'Show timestamps as human-friendly relative strings.',
    tags: ['date', 'formatting', 'ux'],
    level: 'Beginner',
    focus: 'displaying how long ago a snippet was created',
  },
  {
    slug: 'batch-processor',
    title: 'Batch Processor',
    summary: 'Process large arrays in fixed-size chunks to avoid blocking.',
    tags: ['async', 'batch', 'performance'],
    level: 'Intermediate',
    focus: 'chunked imports and bulk operations',
  },
  {
    slug: 'lru-cache',
    title: 'LRU Cache',
    summary: 'Keep the most recently used items and evict the rest.',
    tags: ['cache', 'data-structure', 'performance'],
    level: 'Advanced',
    focus: 'bounded caches for API responses or computations',
  },
  {
    slug: 'string-truncate',
    title: 'Smart String Truncate',
    summary: 'Shorten text to a max length without breaking words.',
    tags: ['strings', 'formatting', 'ui'],
    level: 'Beginner',
    focus: 'safe truncation for snippet cards and previews',
  },
  {
    slug: 'color-contrast',
    title: 'Color Contrast Checker',
    summary: 'Compute WCAG contrast ratio between two hex colors.',
    tags: ['accessibility', 'color', 'utility'],
    level: 'Intermediate',
    focus: 'validating readable text on colored backgrounds',
  },
  {
    slug: 'promise-pool',
    title: 'Promise Pool',
    summary: 'Run async tasks with a concurrency limit.',
    tags: ['async', 'concurrency', 'utility'],
    level: 'Advanced',
    focus: 'parallel fetches with bounded concurrency',
  },
  {
    slug: 'csv-parser',
    title: 'CSV Line Parser',
    summary: 'Parse a CSV row respecting quoted fields and escapes.',
    tags: ['csv', 'parsing', 'data'],
    level: 'Intermediate',
    focus: 'lightweight CSV ingestion without external libraries',
  },
  {
    slug: 'kebab-to-camel',
    title: 'Case Converter',
    summary: 'Convert between kebab-case, camelCase, and snake_case.',
    tags: ['strings', 'naming', 'utility'],
    level: 'Beginner',
    focus: 'normalizing naming conventions across codebases',
  },
  {
    slug: 'intersection-observer',
    title: 'Intersection Observer Hook',
    summary: 'Detect when an element enters or leaves the viewport.',
    tags: ['dom', 'lazy-load', 'ui'],
    level: 'Intermediate',
    focus: 'lazy loading images and infinite scroll triggers',
  },
  {
    slug: 'jwt-decoder',
    title: 'JWT Payload Decoder',
    summary: 'Extract the payload from a JSON Web Token without verification.',
    tags: ['jwt', 'auth', 'utility'],
    level: 'Beginner',
    focus: 'inspecting token claims for debugging auth flows',
  },
  {
    slug: 'unique-id-gen',
    title: 'Unique ID Generator',
    summary: 'Create short collision-resistant identifiers.',
    tags: ['id', 'random', 'utility'],
    level: 'Beginner',
    focus: 'generating client-side IDs for optimistic updates',
  },
  {
    slug: 'pipe-compose',
    title: 'Pipe and Compose',
    summary: 'Chain functions left-to-right or right-to-left.',
    tags: ['fp', 'composition', 'utility'],
    level: 'Intermediate',
    focus: 'building data transformation pipelines',
  },
  {
    slug: 'mutex-lock',
    title: 'Async Mutex Lock',
    summary: 'Ensure only one async operation accesses a resource at a time.',
    tags: ['async', 'concurrency', 'pattern'],
    level: 'Advanced',
    focus: 'preventing race conditions in concurrent code',
  },
  {
    slug: 'fuzzy-match',
    title: 'Fuzzy String Matcher',
    summary: 'Score how closely a query matches a target string.',
    tags: ['search', 'fuzzy', 'ranking'],
    level: 'Intermediate',
    focus: 'typo-tolerant search suggestions',
  },
  {
    slug: 'responsive-grid',
    title: 'Responsive Grid Helper',
    summary: 'Compute column counts and gap sizes for dynamic layouts.',
    tags: ['layout', 'responsive', 'css'],
    level: 'Beginner',
    focus: 'adaptive grid layouts for snippet galleries',
  },
];

const LANGUAGES = ['javascript', 'typescript', 'python', 'go', 'sql'] as const;

const levelTag = (level: SnippetLevel) => level.toLowerCase();

const toPascalCase = (value: string) =>
  value
    .split(/[^a-zA-Z0-9]+/)
    .filter(Boolean)
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join('');

const toSnakeCase = (value: string) => value.replace(/-/g, '_');

const buildCode = (language: (typeof LANGUAGES)[number], topic: Topic, index: number) => {
  const functionName = toPascalCase(topic.slug);
  const snakeName = toSnakeCase(topic.slug);
  const rank = index + 1;

  switch (language) {
    case 'javascript':
      return `const build${functionName}Snippet = ({ query = 'cache snippets', limit = ${rank % 5 + 2} } = {}) => {\n  const metadata = {\n    topic: '${topic.slug}',\n    focus: '${topic.focus}',\n    tags: ${JSON.stringify(topic.tags)},\n    level: '${topic.level}',\n  };\n\n  return {\n    query,\n    limit,\n    summary: '${topic.summary}',\n    metadata,\n  };\n};\n\nexport default build${functionName}Snippet;`;
    case 'typescript':
      return `type ${functionName}Config = {\n  query?: string;\n  limit?: number;\n};\n\nexport const build${functionName}Snippet = ({ query = 'find snippet cards', limit = ${rank % 4 + 3} }: ${functionName}Config = {}) => ({\n  query,\n  limit,\n  summary: '${topic.summary}',\n  tags: ${JSON.stringify(topic.tags)} as const,\n  level: '${topic.level}' as const,\n  focus: '${topic.focus}',\n});`;
    case 'python':
      return `def build_${snakeName}_snippet(query: str = 'save code fast', limit: int = ${rank % 5 + 2}):\n    return {\n        'query': query,\n        'limit': limit,\n        'summary': '${topic.summary}',\n        'focus': '${topic.focus}',\n        'tags': ${JSON.stringify(topic.tags)},\n        'level': '${topic.level}',\n    }\n\n\nexample = build_${snakeName}_snippet()`;
    case 'go':
      return `package snippets\n\ntype ${functionName}Result struct {\n\tQuery   string\n\tLimit   int\n\tSummary string\n\tFocus   string\n\tLevel   string\n}\n\nfunc Build${functionName}Snippet(query string, limit int) ${functionName}Result {\n\tif query == \"\" {\n\t\tquery = \"interactive snippet explorer\"\n\t}\n\tif limit == 0 {\n\t\tlimit = ${rank % 5 + 2}\n\t}\n\n\treturn ${functionName}Result{\n\t\tQuery:   query,\n\t\tLimit:   limit,\n\t\tSummary: \"${topic.summary}\",\n\t\tFocus:   \"${topic.focus}\",\n\t\tLevel:   \"${topic.level}\",\n\t}\n}`;
    case 'sql':
      return `WITH snippet_focus AS (\n  SELECT\n    '${topic.slug}' AS topic,\n    '${topic.summary}' AS summary,\n    '${topic.level}' AS level,\n    '${topic.focus}' AS focus\n)\nSELECT topic, summary, level, focus\nFROM snippet_focus\nWHERE topic LIKE '%${topic.slug.split('-')[0]}%';`;
  }
};

export const LIBRARY_SNIPPETS: Snippet[] = TOPICS.flatMap((topic, topicIndex) =>
  LANGUAGES.map((language, languageIndex) => {
    const createdAt = new Date(Date.UTC(2025, topicIndex % 12, languageIndex + 1, 9, 30)).toISOString();
    const id = `library-${topic.slug}-${language}`;

    return {
      _id: id,
      title: `${topic.title} (${language})`,
      description: `${topic.summary} This ${language} example is tuned for ${topic.focus}.`,
      code: buildCode(language, topic, topicIndex * LANGUAGES.length + languageIndex),
      language,
      tags: [...topic.tags, levelTag(topic.level), 'starter-library'],
      authorId: 'library-codeshare-hub',
      authorName: 'CodeShare Library',
      upvotes: 18 + topicIndex * 4 + languageIndex,
      downvotes: languageIndex % 2,
      views: 140 + topicIndex * 21 + languageIndex * 17,
      isPublic: true,
      createdAt,
      updatedAt: createdAt,
      href: `/snippet/library/${id}`,
      source: 'library',
      level: topic.level,
    } satisfies Snippet;
  })
);

export const getLibrarySnippetById = (id: string) => LIBRARY_SNIPPETS.find((snippet) => snippet._id === id) ?? null;

export const getLibraryTrendingSnippets = (limit = 6) =>
  [...LIBRARY_SNIPPETS]
    .sort((a, b) => (b.upvotes + b.views) - (a.upvotes + a.views))
    .slice(0, limit);
