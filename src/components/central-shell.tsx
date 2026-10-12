import { Link, useRouterState } from '@tanstack/react-router';
import { useState, type ReactNode } from 'react';
import { LayoutDashboard, Radio, Map, BookOpen, NotebookPen, Linkedin, Sparkles, Archive, Settings2, ChevronRight, Bell, Menu, UserRound, Route, X, ShieldCheck } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useCentral } from './central-store';
export const navigation = [
  { to: '/', label: 'Painel estratégico', icon: LayoutDashboard },
  { to: '/radar', label: 'Radar de notícias', icon: Radio },
  { to: '/mapa', label: 'Mapa do corredor', icon: Map },
  { to: '/biblioteca', label: 'Biblioteca offline', icon: BookOpen },
  { to: '/diario', label: 'Diário de Campo', icon: NotebookPen },
  { to: '/estudio', label: 'Estúdio LinkedIn', icon: Linkedin },
  { to: '/briefings', label: 'Briefings para ChatGPT', icon: Sparkles },
] as const;
export function CentralShell({ children }: { children: ReactNode }) {
  const path = useRouterState({ select: s => s.location.pathname });
  const [open, setOpen] = useState(false); const [notifications, setNotifications] = useState(false);
  const { error } = useCentral();
  const current = navigation.find(n => n.to === path)?.label || (path === '/backup' ? 'Backups & dados' : 'Configurações');
  return <div className="app-shell">
    <aside className={`sidebar ${open ? 'open' : ''}`}>
      <Link to="/" className="brand" onClick={() => setOpen(false)}><Route size={37} strokeWidth={1.4} className="brand-symbol" /><div className="brand-name">CENTRAL ROTA<br />BIOCEÂNICA<small>CONEXÕES QUE TRANSFORMAM</small></div></Link>
      <div className="nav-caption">INTELIGÊNCIA & CONEXÃO</div>
      <nav className="side-nav" aria-label="Navegação principal">{navigation.map(n => <Link key={n.to} to={n.to} className={`nav-item ${path === n.to ? 'active' : ''}`} onClick={() => setOpen(false)}><n.icon /><span>{n.label}</span>{n.to === '/radar' && <span className="nav-count">4</span>}</Link>)}</nav>
      <div className="sidebar-bottom"><div className="nav-caption">SEU ESPAÇO</div><Link to="/backup" className={`nav-item ${path === '/backup' ? 'active' : ''}`} onClick={() => setOpen(false)}><Archive />Backups & dados</Link><Link to="/configuracoes" className={`nav-item ${path === '/configuracoes' ? 'active' : ''}`} onClick={() => setOpen(false)}><Settings2 />Configurações</Link>
      <div className="local-status"><div className="status-line"><span className="status-dot" />Armazenamento local</div><p>Seus registros ficam neste dispositivo.</p></div>
      <div className="profile"><div className="profile-icon"><UserRound size={16} /></div><div><strong>Espaço de trabalho</strong><small>Versão 1.0 · Sem login</small></div><ShieldCheck size={15} className="text-muted-foreground ml-auto" /></div></div>
    </aside>
    <div className="main-shell"><header className="topbar"><Button className="mobile-menu" variant="ghost" size="icon" aria-label={open ? 'Fechar menu' : 'Abrir menu'} onClick={() => setOpen(!open)}>{open ? <X /> : <Menu />}</Button><div className="breadcrumb">Central Rota Bioceânica<ChevronRight size={12} /><strong>{current}</strong></div><div className="top-actions"><span className="demo-badge">VERSÃO DEMONSTRATIVA</span><Button variant="ghost" size="icon" aria-label="Alertas editoriais" title="Alertas editoriais" onClick={() => setNotifications(!notifications)}><Bell size={17} /></Button><div className="profile-icon"><UserRound size={15} /></div></div>{notifications && <div className="notification-note"><strong className="text-gold">Alertas editoriais</strong><p>As 4 pautas são exemplos, não notícias verificadas. Confira fontes, datas e números antes de publicar.</p></div>}</header><main className="page-content">{error && <p role="alert" className="notice error-notice">{error}</p>}{children}<footer className="app-footer"><span>CENTRAL ROTA BIOCEÂNICA <span className="text-gold">·</span> Inteligência que conecta fronteiras.</span><span>Brasil · Paraguai · Argentina · Chile <span className="text-gold">↗</span></span></footer></main></div>
  </div>;
}
