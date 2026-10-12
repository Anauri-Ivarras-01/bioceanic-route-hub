# Bioceanic Route Hub

Crie a primeira versão funcional da CENTRAL ROTA BIOCEÂNICA, seguindo o briefing fornecido.

Priorize:

Painel estratégico azul-marinho e dourado.

Radar de notícias dos quatro países.

Mapa do corredor.

Biblioteca de materiais offline.

Diário de Campo com salvamento local.

Estúdio LinkedIn para posts e carrosséis.

Preparação de briefings copiáveis para o ChatGPT.

Exportação e importação de backups.

Dados de exemplo, validações e alertas editoriais.

PWA compatível com GitHub Pages.

Não incluir login, Supabase ou backend próprio.

Preparar o projeto para o repositório central-rota-bioceanica e orientar a configuração do GitHub Pages e GitHub Actions.

Entregar uma primeira versão testável, indicando claramente o que depende de configuração posterior.

This project was built with [Lovable](https://lovable.dev).

## Build with Lovable

Continue developing this project in the [Lovable editor](https://lovable.dev/projects/7e986907-161a-4a82-a5e9-42111f84631a).

- **Ship faster**: describe what you want to build and Lovable handles the code.
- **Stay in sync**: every change made in Lovable is committed straight to this repository.
- **Full ownership**: this code is yours. Push to `main` on GitHub and your changes sync back into Lovable, ready for your next prompt.

## Development

Prefer working locally? You need Node.js and npm — [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating).

```sh
git clone <this-repository-url>
cd <repository-name>
npm i
npm run dev
```

## Atualização de outubro de 2026

O radar permite registrar notícias e acontecimentos manualmente, com data, país, tema, fonte HTTPS e estado de checagem. Os quatro itens iniciais continuam sendo apenas exemplos. As notícias manuais são armazenadas em localStorage, exportadas no backup JSON e importadas junto com os outros dados. Backups antigos da versão 1 continuam compatíveis.

A exportação registra localmente a data de tentativa do último backup e o aplicativo apresenta um lembrete quando não houver backup registrado nos últimos sete dias. O lembrete aparece apenas enquanto o app está aberto, sem notificações em segundo plano. Confira sempre se o arquivo realmente foi salvo. Os backups não são criptografados.

**Publicação:** esta aplicação usa TanStack Start, e não há workflow de GitHub Pages no repositório. Não existe garantia de que o build seja exportável como site estático. O modo PWA/offline também exige uma validação completa do manifest, service worker e arquivos gerados no ambiente publicado. Para produção, utilize hospedagem compatível ou realize uma migração estática testada.

**Segurança:** o app não exige login nem mantém dados num servidor remoto. Qualquer pessoa com acesso ao mesmo perfil do navegador poderá acessar os registros locais. Não armazene dados confidenciais ou credenciais.
