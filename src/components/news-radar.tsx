import { useState } from 'react';
import { Link } from '@tanstack/react-router';
import { Radio, ArrowUpRight, ChevronRight, Clock3, X, Copy, Trash2, ExternalLink } from 'lucide-react';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';
import { useCentral } from '@/components/central-store';
import { countries, flags, news } from '@/lib/central-data';

type RadarItem = {
  id: string; country: string; category: string; title: string; summary: string;
  date: string; source: string; sourceUrl?: string; verification: 'exemplo' | 'a_verificar' | 'verificado';
  manual: boolean;
};

function statusLabel(status: RadarItem['verification']) {
  return status === 'exemplo' ? 'EXEMPLO' : status === 'verificado' ? 'CHECAGEM MANUAL' : 'A VERIFICAR';
}

export function NewsRadar({ full = false }: { full?: boolean }) {
  const { data, update } = useCentral();
  const [country, setCountry] = useState('Todos');
  const [query, setQuery] = useState('');
  const [selected, setSelected] = useState<RadarItem | null>(null);
  const items: RadarItem[] = [
    ...data.stories.map(item => ({
      ...item,
      source: item.sourceName || 'Fonte não informada',
      verification: item.verification,
      manual: true,
    })),
    ...news.map(item => ({
      ...item,
      verification: 'exemplo' as const,
      manual: false,
    })),
  ];
  const rows = items.filter(item =>
    (country === 'Todos' || item.country === country) &&
    (item.title + ' ' + item.summary + ' ' + item.source).toLowerCase().includes(query.toLowerCase())
  );

  async function copyItem(item: RadarItem) {
    try {
      await navigator.clipboard.writeText(
        '[' + statusLabel(item.verification) + ' — validar antes de publicar]\n' +
        item.title + '\n' + item.summary + '\nFonte: ' + item.source +
        (item.sourceUrl ? '\n' + item.sourceUrl : '')
      );
      toast.success('Pauta copiada para revisão.');
    } catch {
      toast.error('Não foi possível copiar a pauta.');
    }
  }

  function removeItem(item: RadarItem) {
    if (!item.manual || !confirm('Excluir este registro local do radar?')) return;
    if (update({ ...data, stories: data.stories.filter(x => x.id !== item.id) })) {
      toast.success('Registro removido.');
      setSelected(null);
    }
  }

  return <>
    <div className={full ? 'panel radar-full' : 'panel'}>
      <div className="panel-heading">
        <div className="panel-title"><Radio /><h2>Radar de notícias</h2></div>
        {!full && <Link to="/radar" className="panel-link">Ver radar completo<ArrowUpRight /></Link>}
        {full && <span className="badge">FONTES & REGISTROS</span>}
      </div>
      <div className="filter-bar">
        {['Todos', ...countries].map(c =>
          <Button className="country-filter" key={c} variant={country === c ? 'default' : 'secondary'} onClick={() => setCountry(c)}>{flags[c]} {c}</Button>
        )}
      </div>
      {full && <div className="px-5 pb-4"><input aria-label="Buscar notícias" placeholder="Buscar por tema, fonte ou palavra…" value={query} onChange={e => setQuery(e.target.value)} /></div>}
      <div className="news-list">
        {rows.map(item =>
          <div className="news-row" key={(item.manual ? 'manual-' : 'demo-') + item.id} role="button" tabIndex={0} onClick={() => setSelected(item)} onKeyDown={e => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); setSelected(item); } }}>
            <div className="flag-icon">{flags[item.country]}</div>
            <div>
              <div className="news-meta"><span className="category">{item.category}</span><span>•</span><span>{item.date}</span><span>•</span><span>{statusLabel(item.verification)}</span></div>
              <h3>{item.title}</h3>
              {full && <p className="news-summary">{item.summary}</p>}
              <div className="news-source"><Clock3 size={10} />{item.source}</div>
            </div>
            <div className="news-arrow"><ChevronRight /></div>
          </div>
        )}
        {rows.length === 0 && <p className="notice">Nenhuma pauta encontrada para esta busca.</p>}
      </div>
      <div className="news-bottom"><span><span className="status-dot" />{data.stories.length} registros próprios · 4 exemplos</span><span>Sem atualização automática</span></div>
    </div>
    {selected && <div className="modal-backdrop" onClick={() => setSelected(null)}>
      <section className="modal" role="dialog" aria-modal="true" aria-label="Detalhes da pauta" onClick={e => e.stopPropagation()}>
        <div className="modal-top"><span className="badge">{flags[selected.country]} {selected.country} · {statusLabel(selected.verification)}</span><Button variant="ghost" size="icon" aria-label="Fechar detalhes" onClick={() => setSelected(null)}><X /></Button></div>
        <h2>{selected.title}</h2><p>{selected.summary}</p>
        <p className="saved-meta">Fonte: {selected.source} · {selected.date}</p>
        <p className="notice">{selected.verification === 'exemplo' ? 'Pauta fictícia de demonstração, sem fonte jornalística verificada.' : selected.verification === 'a_verificar' ? 'Informação não verificada. Confira a fonte antes de produzir conteúdo.' : 'Marcada manualmente como verificada pelo usuário. O aplicativo não checou a fonte de forma independente.'}</p>
        <div className="form-actions">
          {selected.sourceUrl && <Button asChild variant="outline"><a href={selected.sourceUrl} target="_blank" rel="noopener noreferrer"><ExternalLink />Abrir fonte</a></Button>}
          <Button onClick={() => void copyItem(selected)}><Copy />Copiar pauta</Button>
          {selected.manual && <Button variant="ghost" onClick={() => removeItem(selected)}><Trash2 />Excluir</Button>}
        </div>
      </section>
    </div>}
  </>;
}
