import { describe, it, expect } from 'vitest';
import { parseBoundedInt, pickSnippetInput } from './snippet-input';

describe('pickSnippetInput', () => {
  it('keeps the fields a client may set', () => {
    const picked = pickSnippetInput({
      title: 't',
      description: 'd',
      code: 'c',
      language: 'ts',
      tags: ['a'],
      collectionId: 'x',
    });

    expect(picked).toEqual({
      title: 't',
      description: 'd',
      code: 'c',
      language: 'ts',
      tags: ['a'],
      collectionId: 'x',
    });
  });

  it('drops the server-managed counters', () => {
    const picked = pickSnippetInput({
      title: 't',
      code: 'c',
      upvotes: 999999,
      downvotes: -500,
      views: 10000000,
      isPublic: false,
      authorId: 'someone-else',
      _id: 'hacked',
    });

    expect(picked).toEqual({ title: 't', code: 'c' });
    expect(picked).not.toHaveProperty('upvotes');
    expect(picked).not.toHaveProperty('downvotes');
    expect(picked).not.toHaveProperty('views');
    expect(picked).not.toHaveProperty('isPublic');
    expect(picked).not.toHaveProperty('authorId');
    expect(picked).not.toHaveProperty('_id');
  });

  it('tolerates a body that is not an object', () => {
    expect(pickSnippetInput(undefined)).toEqual({});
    expect(pickSnippetInput(null)).toEqual({});
    expect(pickSnippetInput('nope')).toEqual({});
    expect(pickSnippetInput([1, 2])).toEqual({});
  });
});

describe('parseBoundedInt', () => {
  it('parses a valid value', () => {
    expect(parseBoundedInt('20', 20, 100)).toBe(20);
    expect(parseBoundedInt('0', 20, 100)).toBe(0);
  });

  it('falls back to the default for a value that is not a number', () => {
    expect(parseBoundedInt('abc', 20, 100)).toBe(20);
    expect(parseBoundedInt(null, 20, 100)).toBe(20);
    expect(parseBoundedInt('', 20, 100)).toBe(20);
  });

  it('clamps a negative value to the minimum', () => {
    expect(parseBoundedInt('-1', 20, 100)).toBe(0);
    expect(parseBoundedInt('-1', 20, 100, 1)).toBe(1);
  });

  it('clamps to the maximum', () => {
    expect(parseBoundedInt('500', 20, 100)).toBe(100);
  });
});
