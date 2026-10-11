export async function registerCentralPwa() {
  if (!('serviceWorker' in navigator)) return;
  const host = location.hostname;
  const refused = !import.meta.env.PROD || window.self !== window.top || /^(id-preview--|preview--)/.test(host) || /(^|\.)(lovableproject\.com|lovableproject-dev\.com|beta\.lovable\.dev)$/.test(host) || new URLSearchParams(location.search).get('sw') === 'off';
  if (refused) {
    const registrations = await navigator.serviceWorker.getRegistrations();
    await Promise.all(registrations.filter(r => new URL(r.active?.scriptURL || r.installing?.scriptURL || location.href).pathname.endsWith('/sw.js')).map(r => r.unregister()));
    return;
  }
  await navigator.serviceWorker.register(`${import.meta.env.BASE_URL}sw.js`, { scope: import.meta.env.BASE_URL });
}