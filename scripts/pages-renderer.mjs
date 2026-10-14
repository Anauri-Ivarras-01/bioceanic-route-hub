// Build-time renderer only; this file and dist/server are never uploaded to Pages.
import { useNitroApp } from 'nitro/app';

const app = useNitroApp();
export default { fetch: (request) => app.fetch(request) };