import type { ReactNode } from 'react';
export function PageHeading({ title, subtitle, children }: { title: string; subtitle: string; children?: ReactNode }) {
  return <div className="page-heading"><div><p className="eyebrow">QUATRO PAÍSES. UM NOVO HORIZONTE.</p><h1>{title}</h1><p className="page-subtitle">{subtitle}</p></div>{children && <div className="heading-actions">{children}</div>}</div>;
}
export function pageHead(title: string, description: string) {
  return { meta: [{ title: `${title} | Central Rota Bioceânica` }, { name: 'description', content: description }, { property: 'og:title', content: `${title} | Central Rota Bioceânica` }, { property: 'og:description', content: description }, { property: 'og:type', content: 'website' }, { name: 'twitter:card', content: 'summary_large_image' }] };
}
