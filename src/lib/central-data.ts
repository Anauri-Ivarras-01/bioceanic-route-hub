import { z } from 'zod';

export const countries = ['Brasil', 'Paraguai', 'Argentina', 'Chile'] as const;
export const flags: Record<string, string> = { Brasil: '🇧🇷', Paraguai: '🇵🇾', Argentina: '🇦🇷', Chile: '🇨🇱' };
export const news = [
  { id: '1', country: 'Brasil', category: 'INFRAESTRUTURA', title: 'Ponte entre Porto Murtinho e Carmelo Peralta no centro da integração regional', summary: 'Pauta demonstrativa para acompanhar conexões fronteiriças e seus impactos na logística do corredor.', date: '11 out 2026', source: 'Pauta de acompanhamento', priority: true },
  { id: '2', country: 'Paraguai', category: 'LOGÍSTICA', title: 'Chaco paraguaio: os caminhos que conectam o centro do continente', summary: 'Pauta demonstrativa sobre infraestrutura rodoviária, serviços e integração territorial.', date: '10 out 2026', source: 'Pauta de acompanhamento', priority: false },
  { id: '3', country: 'Argentina', category: 'INTEGRAÇÃO', title: 'Salta e Jujuy na agenda de conexão com os portos do Pacífico', summary: 'Pauta demonstrativa para observar fronteiras, aduanas e oportunidades regionais.', date: '10 out 2026', source: 'Pauta de acompanhamento', priority: false },
  { id: '4', country: 'Chile', category: 'PORTOS & COMÉRCIO', title: 'Portos do norte chileno e as oportunidades do corredor bioceânico', summary: 'Pauta demonstrativa para acompanhar capacidade portuária e acesso aos mercados asiáticos.', date: '09 out 2026', source: 'Pauta de acompanhamento', priority: false },
];
export const entrySchema = z.object({ id: z.string(), title: z.string().min(3).max(160), country: z.enum(countries), date: z.string(), body: z.string().min(10).max(20000) });
export const materialSchema = z.object({ id: z.string(), title: z.string().min(1).max(200), filename: z.string(), mime: z.string(), data: z.string().max(15000000), added: z.string() });
export const draftSchema = z.object({ id: z.string(), title: z.string(), text: z.string(), mode: z.enum(['post', 'carousel']) });
export const backupSchema = z.object({ version: z.literal(1), entries: z.array(entrySchema).max(1000), materials: z.array(materialSchema).max(100), drafts: z.array(draftSchema).max(1000) });
export type LocalData = z.infer<typeof backupSchema>;
export const initialData: LocalData = { version: 1, entries: [], materials: [], drafts: [] };
export function download(content: string, name: string, mime = 'text/plain;charset=utf-8') {
  const url = URL.createObjectURL(new Blob([content], { type: mime }));
  const link = document.createElement('a'); link.href = url; link.download = name; link.click();
  setTimeout(() => URL.revokeObjectURL(url), 1000);
}