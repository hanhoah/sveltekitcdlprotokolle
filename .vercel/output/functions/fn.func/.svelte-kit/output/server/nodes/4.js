import * as universal from '../entries/pages/_page.js';

export const index = 4;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/_page.svelte.js')).default;
export { universal };
export const universal_id = "src/routes/+page.js";
export const imports = ["_app/immutable/nodes/4.Chhc8NJh.js","_app/immutable/chunks/scheduler.DfuChs2G.js","_app/immutable/chunks/index.BnyCCVNm.js"];
export const stylesheets = [];
export const fonts = [];
