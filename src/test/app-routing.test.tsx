import { QueryClient } from "@tanstack/react-query";
import { createRouter, createMemoryHistory, rootRouteId } from "@tanstack/react-router";
import { describe, expect, it } from "vitest";

import { routeTree } from "@/routeTree.gen";

// Match routes without running loaders or rendering: loaders may need a server or
// network the test run lacks, and jsdom never loads the stylesheets React waits on.
describe("App routing", () => {
  it.each(['/', '/radar', '/mapa', '/biblioteca', '/diario', '/estudio', '/briefings', '/backup', '/configuracoes'])("matches %s under the GitHub Pages base", (path) => {
    const router = createRouter({ routeTree, basepath: '/bioceanic-route-hub/', history: createMemoryHistory({ initialEntries: [`/bioceanic-route-hub${path}`] }), context: { queryClient: new QueryClient() } });
    // matchRoutes consumes the logical pathname after the base rewrite.
    expect(router.latestLocation.pathname).toBe(path);
    expect(router.buildLocation({ to: path }).href).toBe(`/bioceanic-route-hub${path}`);
    const matches = router.matchRoutes(router.latestLocation.pathname);
    expect(matches.at(-1)?.routeId).toBe(path);
  });
  it("matches a page for / instead of falling back to not found", () => {
    const router = createRouter({ routeTree, context: { queryClient: new QueryClient() } });

    const matches = router.matchRoutes("/");

    expect(matches.at(-1)?.routeId).not.toBe(rootRouteId);
  });
});
