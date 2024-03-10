import * as server from '../entries/pages/search/_page.server.ts.js';

export const index = 13;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/search/_page.svelte.js')).default;
export { server };
export const server_id = "src/routes/search/+page.server.ts";
export const imports = ["_app/immutable/nodes/13.BdzHiZEa.js","_app/immutable/chunks/scheduler.DfuChs2G.js","_app/immutable/chunks/index.BnyCCVNm.js","_app/immutable/chunks/each.D6YF6ztN.js","_app/immutable/chunks/shops.DAHteFvT.js","_app/immutable/chunks/book.DozPUM9A.js"];
export const stylesheets = [];
export const fonts = [];
