import { describe, expect, it } from 'vitest';
import { backupSchema, initialData, manualNewsSchema } from '@/lib/central-data';

const entry = {
  id: 'pauta-1', title: 'Pauta sobre infraestrutura logística',
  country: 'Brasil', category: 'LOGÍSTICA', date: '2026-10-12',
  summary: 'Registro local aguardando confirmação em fonte primária.',
  sourceName: '', sourceUrl: '', verification: 'a_verificar',
  addedAt: '2026-10-12T13:00:00.000Z',
};

describe('news and legacy backup compatibility', () => {
  it('preserves existing version 1 backups without news records', () => {
    const old = { version: 1, entries: [], drafts: [], materials: [] };
    expect(backupSchema.parse(old)).toEqual(initialData);
  });
  it('allows an unverified draft with no external link', () => {
    expect(manualNewsSchema.safeParse(entry).success).toBe(true);
  });
  it('requires a named HTTPS source for a manually verified item', () => {
    expect(manualNewsSchema.safeParse({ ...entry, verification: 'verificado' }).success).toBe(false);
    expect(manualNewsSchema.safeParse({
      ...entry, verification: 'verificado', sourceName: 'Órgão oficial',
      sourceUrl: 'https://example.org/noticia',
    }).success).toBe(true);
  });
  it('rejects unsafe URLs', () => {
    expect(manualNewsSchema.safeParse({ ...entry, sourceUrl: 'javascript:alert(1)' }).success).toBe(false);
  });
});
