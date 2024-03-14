import * as server from '../entries/pages/produkte/_page.server.js';

export const index = 9;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/produkte/_page.svelte.js')).default;
export { server };
export const server_id = "src/routes/produkte/+page.server.js";
export const imports = ["_app/immutable/nodes/9.CPxE_gkf.js","_app/immutable/chunks/scheduler.DfuChs2G.js","_app/immutable/chunks/await_block.b95zegdE.js","_app/immutable/chunks/index.BnyCCVNm.js","_app/immutable/chunks/each.D6YF6ztN.js","_app/immutable/chunks/shops.Dfb--GkT.js"];
export const stylesheets = [];
export const fonts = [];
