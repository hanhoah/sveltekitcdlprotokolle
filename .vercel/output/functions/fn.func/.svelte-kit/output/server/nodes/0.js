import * as universal from '../entries/pages/_layout.js';

export const index = 0;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/_layout.svelte.js')).default;
export { universal };
export const universal_id = "src/routes/+layout.js";
export const imports = ["_app/immutable/nodes/0.BTLVTFyE.js","_app/immutable/chunks/scheduler.TcPaG1AO.js","_app/immutable/chunks/index.eDZ0B_bf.js","_app/immutable/chunks/spread.CN4WR7uZ.js","_app/immutable/chunks/stores.C-JKApDR.js","_app/immutable/chunks/entry.DpWFYAhf.js"];
export const stylesheets = ["_app/immutable/assets/0.Dg97USm3.css"];
export const fonts = [];
