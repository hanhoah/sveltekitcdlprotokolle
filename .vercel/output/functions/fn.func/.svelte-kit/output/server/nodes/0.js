import * as universal from '../entries/pages/_layout.js';

export const index = 0;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/_layout.svelte.js')).default;
export { universal };
export const universal_id = "src/routes/+layout.js";
export const imports = ["_app/immutable/nodes/0.DY787Ay6.js","_app/immutable/chunks/scheduler.jvn8LQ5B.js","_app/immutable/chunks/index.GOpXVyBW.js","_app/immutable/chunks/spread.CgU5AtxT.js","_app/immutable/chunks/stores.OASTURB1.js","_app/immutable/chunks/entry.CkUWAlVg.js","_app/immutable/chunks/index.DTFdQfRl.js"];
export const stylesheets = ["_app/immutable/assets/0.Cdp58P7p.css"];
export const fonts = [];
