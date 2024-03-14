import * as server from '../entries/pages/buecher/_page.server.js';

export const index = 5;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/buecher/_page.svelte.js')).default;
export { server };
export const server_id = "src/routes/buecher/+page.server.js";
export const imports = ["_app/immutable/nodes/5.DvrSRW0m.js","_app/immutable/chunks/scheduler.DfuChs2G.js","_app/immutable/chunks/await_block.b95zegdE.js","_app/immutable/chunks/index.BnyCCVNm.js","_app/immutable/chunks/each.D6YF6ztN.js","_app/immutable/chunks/book.DozPUM9A.js","_app/immutable/chunks/Spinner.BMfSgHGW.js","_app/immutable/chunks/spread.CgU5AtxT.js","_app/immutable/chunks/bundle-mjs.BTwrKG5i.js"];
export const stylesheets = [];
export const fonts = [];
