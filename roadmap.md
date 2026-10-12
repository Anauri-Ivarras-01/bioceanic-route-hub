# Central Rota Bioceânica — roadmap

## Recursos disponíveis no código
- [x] Painel, mapa esquemático e pautas demonstrativas dos quatro países.
- [x] Inclusão manual de notícias com fonte e estado de verificação.
- [x] Biblioteca local, diário, rascunhos para LinkedIn e briefings copiáveis.
- [x] Backups JSON validados, incluindo registros de notícias e formatos antigos.
- [x] Lembrete semanal de backup enquanto o aplicativo estiver aberto.
- [x] Testes adicionados para validação das notícias e compatibilidade de backups (execução ainda não comprovada).

## Pendências
- [ ] Executar testes e build em CI e validar a interface em dispositivos reais.
- [ ] Integração programada de feeds de fontes oficiais e deduplicação.
- [ ] Validar e completar PWA, service worker e uso offline na publicação.
- [ ] Publicar em infraestrutura compatível com TanStack Start ou migrar para uma exportação estática comprovada.
- [ ] Endurecer armazenamento local, importação de arquivos e tratamento de falhas.

Sem login nem sincronização; os dados locais e os backups não são criptografados.
