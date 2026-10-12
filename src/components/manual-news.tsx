import { useState, type FormEvent } from 'react';
import { Plus, ShieldAlert } from 'lucide-react';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';
import { useCentral } from '@/components/central-store';
import { countries, manualNewsSchema, newsCategories } from '@/lib/central-data';

export function ManualNews() {
  const { data, update, ready } = useCentral();
  const [title, setTitle] = useState('');
  const [country, setCountry] = useState<(typeof countries)[number]>('Brasil');
  const [category, setCategory] = useState<(typeof newsCategories)[number]>('INFRAESTRUTURA');
  const [date, setDate] = useState('');
  const [summary, setSummary] = useState('');
  const [sourceName, setSourceName] = useState('');
  const [sourceUrl, setSourceUrl] = useState('');
  const [verification, setVerification] = useState<'a_verificar' | 'verificado'>('a_verificar');

  function save(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const result = manualNewsSchema.safeParse({
      id: crypto.randomUUID(),
      title, country, category, date, summary, sourceName, sourceUrl,
      verification, addedAt: new Date().toISOString(),
    });
    if (!result.success) {
      toast.error(result.error.issues[0]?.message || 'Revise os dados da notícia.');
      return;
    }
    if (data.stories.length >= 500) {
      toast.error('Limite de 500 registros. Faça um backup antes de organizar sua coleção.');
      return;
    }
    if (update({ ...data, stories: [result.data, ...data.stories] })) {
      toast.success('Pauta registrada neste navegador.');
      setTitle(''); setSummary(''); setDate(''); setSourceName('');
      setSourceUrl(''); setVerification('a_verificar');
    }
  }

  return <section className="form-panel manual-news">
    <h2><Plus size={18} className="inline mr-2" />Adicionar notícia ou acontecimento</h2>
    <p className="notice">Registro manual. O aplicativo não consulta a fonte nem confirma as informações automaticamente.</p>
    <form className="form-stack" onSubmit={save}>
      <div className="form-row">
        <label>País<select value={country} onChange={e => setCountry(e.target.value as typeof country)}>{countries.map(c => <option key={c} value={c}>{c}</option>)}</select></label>
        <label>Tema<select value={category} onChange={e => setCategory(e.target.value as typeof category)}>{newsCategories.map(c => <option key={c} value={c}>{c}</option>)}</select></label>
      </div>
      <label>Título<input required minLength={5} maxLength={180} value={title} onChange={e => setTitle(e.target.value)} placeholder="O que aconteceu ou deve ser investigado?" /></label>
      <div className="form-row">
        <label>Data do acontecimento<input type="date" required value={date} onChange={e => setDate(e.target.value)} /></label>
        <label>Estado da checagem<select value={verification} onChange={e => setVerification(e.target.value as typeof verification)}><option value="a_verificar">A verificar</option><option value="verificado">Verificado por mim</option></select></label>
      </div>
      <label>Resumo / observações<textarea required minLength={20} maxLength={3000} value={summary} onChange={e => setSummary(e.target.value)} placeholder="Registre contexto, impactos e fatos que ainda precisam ser conferidos." /></label>
      <div className="form-row">
        <label>Nome da fonte<input value={sourceName} maxLength={160} onChange={e => setSourceName(e.target.value)} placeholder="Ex.: órgão oficial ou jornal" /></label>
        <label>Link da fonte (HTTPS)<input type="url" value={sourceUrl} onChange={e => setSourceUrl(e.target.value)} placeholder="https://..." /></label>
      </div>
      <p className="saved-meta"><ShieldAlert size={14} className="inline mr-1" />“Verificado por mim” é apenas uma classificação manual, não uma validação independente.</p>
      <div className="form-actions"><Button type="submit" disabled={!ready}><Plus />Salvar no radar</Button></div>
    </form>
  </section>;
}
