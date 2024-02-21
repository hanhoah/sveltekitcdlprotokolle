import * as universal from '../entries/pages/_layout.js';

export const index = 0;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/_layout.svelte.js')).default;
export { universal };
export const universal_id = "src/routes/+layout.js";
export const imports = ["_app/immutable/nodes/0.DJVcyC9D.js","_app/immutable/chunks/scheduler.TcPaG1AO.js","_app/immutable/chunks/index.eDZ0B_bf.js","_app/immutable/chunks/spread.CN4WR7uZ.js","_app/immutable/chunks/stores.DC1TGACr.js","_app/immutable/chunks/entry.BGeB_avv.js"];
export const stylesheets = ["_app/immutable/assets/0.Dg97USm3.css"];
export const fonts = [];
