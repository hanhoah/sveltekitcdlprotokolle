import * as universal from '../entries/pages/buecher/_layout.ts.js';

export const index = 2;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/buecher/_layout.svelte.js')).default;
export { universal };
export const universal_id = "src/routes/buecher/+layout.ts";
export const imports = ["_app/immutable/nodes/2.alqd-PJB.js","_app/immutable/chunks/scheduler.DfuChs2G.js","_app/immutable/chunks/index.BnyCCVNm.js","_app/immutable/chunks/each.D6YF6ztN.js","_app/immutable/chunks/Button.BWb8FycM.js","_app/immutable/chunks/spread.CgU5AtxT.js","_app/immutable/chunks/bundle-mjs.BTwrKG5i.js"];
export const stylesheets = [];
export const fonts = [];
