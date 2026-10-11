import { createFileRoute } from '@tanstack/react-router';
import { PageHeading, pageHead } from '@/components/page-heading';
import { NewsRadar } from '@/components/news-radar';
export const Route = createFileRoute('/radar')({ head: () => pageHead('Radar de notícias', 'Pautas demonstrativas dos quatro países do corredor bioceânico, com filtros e alertas editoriais.'), component: Radar });
function Radar() { return <><PageHeading title="Radar de notícias" subtitle="Brasil, Paraguai, Argentina e Chile no mesmo horizonte." /><p className="notice">Curadoria demonstrativa. A conexão com fontes de notícias reais depende de configuração posterior; esta versão não consulta feeds automaticamente.</p><NewsRadar full /></>; }
