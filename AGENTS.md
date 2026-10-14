<!-- LOVABLE:BEGIN -->
> [!IMPORTANT]
> This project is connected to [Lovable](https://lovable.dev). Avoid rewriting
> published git history — force pushing, or rebasing/amending/squashing commits
> that are already pushed — as it rewrites history on Lovable's side and the
> user will likely lose their project history.
>
> Commits you push to the connected branch sync back to Lovable and show up in
> the editor, so keep the branch in a working state.
<!-- LOVABLE:END -->

- Preserve TanStack Start routing and use CentralProvider for browser-only, schema-validated local persistence; this keeps the app independent of hosted services.
- Define all visual tokens in src/styles.css and use shared design-system buttons; this keeps the strategic interface consistent.
- Use a conditional GitHub Pages build with matching Vite/router/PWA base paths, explicit Nitro client output, a fetch-only build-time renderer and enumerated fail-on-error prerendered pages; deploy only the validated client artifact so Pages needs no application server and prerender imports open no listening ports.
- Treat radar content as illustrative until verified sources are configured; this prevents example content being mistaken for reported news.
