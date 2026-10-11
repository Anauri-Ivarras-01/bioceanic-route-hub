import { useState } from 'react';
import { Button } from '@/components/ui/button';
const stops = [
  { name: 'Campo Grande', country: 'Brasil', x: 520, y: 116 },
  { name: 'Porto Murtinho', country: 'Brasil', x: 440, y: 160 },
  { name: 'Carmelo Peralta', country: 'Paraguai', x: 419, y: 174 },
  { name: 'Mariscal Estigarribia', country: 'Paraguai', x: 355, y: 194 },
  { name: 'Salta / Jujuy', country: 'Argentina', x: 245, y: 239 },
  { name: 'Paso de Jama', country: 'Argentina / Chile', x: 186, y: 221 },
  { name: 'Antofagasta', country: 'Chile', x: 115, y: 249 },
];
export function CorridorMap({ large = false }: { large?: boolean }) {
  const [selected, setSelected] = useState(stops[0]);
  return <div className={large ? 'map-wrap large' : 'map-wrap'}>
    <svg viewBox="0 0 680 340" role="img" aria-label="Mapa esquemático do corredor: Brasil, Paraguai, Argentina e Chile">
      <defs><pattern id="grid" width="28" height="28" patternUnits="userSpaceOnUse"><path d="M 28 0 L 0 0 0 28" className="map-grid" fill="none" /></pattern></defs>
      <rect width="680" height="340" fill="url(#grid)" />
      <path d="M222 12L307 26 357 12 449 37 490 25 609 51 634 98 587 137 552 192 494 194 459 155 396 167 359 137 302 116 255 87Z" className="map-land" />
      <path d="M396 167L459 155 494 194 453 250 397 247 359 212 359 137Z" className="map-land alternate" />
      <path d="M302 116L359 137 359 212 397 247 376 302 274 332 238 313 232 258 205 215 218 161Z" className="map-land" />
      <path d="M218 161L205 215 232 258 238 313 220 339 198 312 185 265 164 217 180 170Z" className="map-land alternate" />
      <text x="479" y="85" className="map-country">BRASIL</text><text x="413" y="220" className="map-country">PARAGUAI</text><text x="283" y="290" className="map-country">ARGENTINA</text><text x="142" y="300" className="map-country">CHILE</text>
      <text x="42" y="168" className="map-ocean">OCEANO</text><text x="42" y="184" className="map-ocean">PACÍFICO</text><text x="565" y="276" className="map-ocean">OCEANO</text><text x="565" y="292" className="map-ocean">ATLÂNTICO</text>
      <polyline points={stops.map(s => `${s.x},${s.y}`).join(' ')} className="map-route" />
      {stops.map(s => <g key={s.name}><circle cx={s.x} cy={s.y} r="10" className="map-halo" /><circle cx={s.x} cy={s.y} r="4" className="map-dot" /><text x={s.x + 8} y={s.y - 10} className="map-label">{s.name}</text></g>)}
    </svg>
    <div className="map-key"><span><i /> Corredor bioceânico</span><span>Traçado esquemático • não utilizar para navegação</span></div>
    {large && <><div className="stop-list">{stops.map(s => <Button variant={selected.name === s.name ? 'default' : 'outline'} key={s.name} onClick={() => setSelected(s)}>{s.name}</Button>)}</div><div className="map-selection"><strong>{selected.name}</strong><span>{selected.country} · Ponto de referência do corredor</span></div></>}
  </div>;
}