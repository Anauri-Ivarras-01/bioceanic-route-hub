import { createFileRoute } from '@tanstack/react-router';
import { PageHeading, pageHead } from '@/components/page-heading';
import { NewsRadar } from '@/components/news-radar';
import { ManualNews } from '@/components/manual-news';
export const Route = createFileRoute('/radar')({ head: () => pageHead('Radar de notícias', 'Registros manuais e pautas demonstrativas dos quatro países, com fontes e alertas de verificação.'), component: Radar });
function Radar() { return <><PageHeading title="Radar de notícias" subtitle="Brasil, Paraguai, Argentina e Chile no mesmo horizonte." /><p className="notice">Adicione notícias e acontecimentos com suas fontes. As quatro pautas iniciais são apenas exemplos; atualizações automáticas ainda não estão conectadas.</p><div className="mb-6"><ManualNews /></div><NewsRadar full /></>; }
