# Central Rota Bioceânica — primeira versão

## Publicar no GitHub Pages

1. No Lovable, use **+ → GitHub → Connect project**. Autorize a integração e crie o repositório **central-rota-bioceanica**. A integração de sincronização de código não é o conector de API do GitHub. A conexão deve ser feita pelo proprietário do projeto; não foi realizada nesta entrega.
2. O Lovable cria um novo repositório, sem importação direta de um repositório existente. Se o nome desejado já existir, copie o código para esse repositório usando sua ferramenta de desenvolvimento, mantendo os arquivos ocultos, inclusive `.github/workflows/pages.yml`.
3. No GitHub, vá a **Settings → Pages → Build and deployment → Source: GitHub Actions**.
4. Na aba **Actions**, execute **Pages → Run workflow**, ou envie mudanças para a branch `main`. Se usar outra branch principal, ajuste a lista no workflow.
5. A ação instala dependências, executa a compilação estática, verifica arquivos essenciais e publica **somente `dist/client`**. O servidor produzido durante a compilação não é publicado nem necessário para usar o aplicativo.
6. Acesse `https://SEU-USUARIO.github.io/central-rota-bioceanica/` (substitua SEU-USUARIO). O nome do repositório precisa corresponder ao caminho configurado em `vite.config.ts`.

## Funcionamento local e PWA

Use `bun install` e `bun run dev` para desenvolvimento. Para gerar os arquivos de Pages fora da ação: `GITHUB_PAGES=true bun run build`. O projeto preserva o TanStack Start e pré-renderiza todas as páginas públicas, sem servidor de aplicação em produção.

Abra a versão publicada online primeiro e visite as páginas antes de testar em modo avião. O cache é gerado pelo vite-plugin-pwa; as páginas têm estratégia de rede primeiro. A instalação depende do navegador e de HTTPS. O modo offline é intencionalmente desativado na prévia do Lovable, em desenvolvimento e em iframes. Acrescente `?sw=off` para desativar o worker. Fontes remotas podem voltar para a fonte local do sistema sem rede.

## Testar a primeira versão

- Radar: filtre cada país, busque uma pauta e abra seus detalhes. Todos os itens são demonstrativos.
- Mapa: selecione os pontos do corredor; o traçado não serve para navegação.
- Diário: preencha título, data, país e observação, salve, recarregue e confirme a persistência. Edite e exclua um registro de teste.
- Biblioteca: baixe um guia, adicione PDF/TXT/MD/CSV/PNG/JPG/WEBP de até 2 MB e confirme a recuperação após recarregar.
- Estúdio: forneça tema e contexto, prepare post e roteiro de carrossel, edite, copie, baixe e salve. Posts acima de 3.000 caracteres não podem ser salvos.
- Briefings: prepare um briefing e copie-o; nenhuma informação é enviada automaticamente ao ChatGPT.
- Backup: exporte JSON, importe e confirme a restauração. Um JSON inválido deve ser recusado sem alterar seus dados.
- Após a publicação: teste todas as páginas sem rede, instalação e atualização. A execução real da ação e o funcionamento offline publicado dependem da configuração do GitHub e não foram verificados na prévia.

## Limitações e configuração posterior

- Não foi fornecido um anexo com o briefing adicional. A implementação segue as prioridades escritas na conversa.
- Não há login, backend próprio, Supabase, atualização automática de notícias ou sincronização entre dispositivos.
- As pautas e os três guias são exemplos. A foto de porto é gerada e ilustrativa, sem representar instalação específica. Datas de pautas não são datas de apuração.
- Feeds reais exigem fontes públicas compatíveis com acesso direto do navegador (CORS) ou curadoria manual; nenhum serviço intermediário foi incluído.
- Mapa esquemático, sem cartografia operacional, trânsito, rotas de navegação ou status de obras verificado.
- Estúdio usa modelos locais, sem IA conectada. Carrosséis são roteiros em texto e prévia de páginas; exportação de arte/PDF e publicação no LinkedIn não estão incluídas.
- ChatGPT é externo e requer acesso próprio. Revise informações sensíveis antes de compartilhar.
- Dados locais podem ser perdidos ao limpar o navegador e estão sujeitos à cota de armazenamento. Erros de salvamento são apresentados sem descartar o formulário. Exporte backups regularmente.
- Backups são JSON não criptografado, limitados a 20 MB na importação e validados antes de substituir os dados atuais.
- A conexão do repositório, primeira execução de GitHub Actions, URL publicada e teste offline instalado ficam pendentes do proprietário. Nada foi publicado automaticamente.