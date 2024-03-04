import * as universal from '../entries/pages/_layout.js';

export const index = 0;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/_layout.svelte.js')).default;
export { universal };
export const universal_id = "src/routes/+layout.js";
export const imports = ["_app/immutable/nodes/0.DHpNrrP8.js","_app/immutable/chunks/scheduler.DXrhz23f.js","_app/immutable/chunks/index.Bmfu-QDF.js","_app/immutable/chunks/spread.CgU5AtxT.js","_app/immutable/chunks/stores.BVRQxv25.js","_app/immutable/chunks/entry.CdCuVMLv.js","_app/immutable/chunks/index.DBfpC3at.js"];
export const stylesheets = ["_app/immutable/assets/0.Bs4qRKu-.css"];
export const fonts = [];
