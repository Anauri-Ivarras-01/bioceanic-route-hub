import { createContext, useContext, useEffect, useState, type ReactNode } from 'react';
import { backupSchema, initialData, type LocalData } from '@/lib/central-data';
import { registerCentralPwa } from '@/lib/pwa';

const Store = createContext<{ data: LocalData; update: (data: LocalData) => boolean; ready: boolean; error: string }>({ data: initialData, update: () => false, ready: false, error: '' });
export function CentralProvider({ children }: { children: ReactNode }) {
  const [data, setData] = useState(initialData); const [ready, setReady] = useState(false); const [error, setError] = useState('');
  useEffect(() => {
    try { const stored = localStorage.getItem('central-rota-v1'); if (stored) setData(backupSchema.parse(JSON.parse(stored))); } catch { setError('Os dados locais não puderam ser lidos. Preserve seu backup antes de continuar.'); }
    setReady(true); registerCentralPwa().catch(() => {});
  }, []);
  function update(next: LocalData) {
    try { localStorage.setItem('central-rota-v1', JSON.stringify(backupSchema.parse(next))); setData(next); setError(''); return true; }
    catch { setError('Não foi possível salvar. O armazenamento pode estar cheio ou indisponível. Exporte um backup.'); return false; }
  }
  return <Store.Provider value={{ data, update, ready, error }}>{children}</Store.Provider>;
}
export function useCentral() { return useContext(Store); }