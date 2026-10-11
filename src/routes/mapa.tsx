import { createFileRoute } from '@tanstack/react-router';
import { PageHeading, pageHead } from '@/components/page-heading';
import { CorridorMap } from '@/components/corridor-map';
export const Route = createFileRoute('/mapa')({ head: () => pageHead('Mapa do corredor', 'Mapa esquemático da conexão entre Campo Grande, o Chaco, o norte argentino e o Pacífico.'), component: MapPage });
function MapPage() { return <><PageHeading title="Mapa do corredor" subtitle="Uma conexão continental, do Brasil ao Pacífico." /><CorridorMap large /><div className="editorial-strip">Traçado ilustrativo, sem precisão geográfica ou indicação de obras concluídas. Distâncias, condições das estradas e status de fronteiras devem ser verificados em fontes oficiais.</div></>; }
