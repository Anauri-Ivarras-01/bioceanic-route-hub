import { describe, expect, it } from 'vitest';
import { backupSchema, entrySchema, initialData } from '@/lib/central-data';
describe('Local data validation', () => {
  it('accepts an empty portable backup', () => expect(backupSchema.safeParse(initialData).success).toBe(true));
  it('rejects incompatible backups', () => expect(backupSchema.safeParse({ version: 99, entries: [] }).success).toBe(false));
  it('requires a useful title and field observation', () => expect(entrySchema.safeParse({ id: '1', title: 'a', country: 'Brasil', date: '2026-10-11', body: 'short' }).success).toBe(false));
  it('rejects countries outside the corridor', () => expect(entrySchema.safeParse({ id: '1', title: 'Registro válido', country: 'Uruguai', date: '2026-10-11', body: 'Observação de campo suficiente.' }).success).toBe(false));
});