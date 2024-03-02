import * as universal from '../entries/pages/_layout.js';

export const index = 0;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/_layout.svelte.js')).default;
export { universal };
export const universal_id = "src/routes/+layout.js";
export const imports = ["_app/immutable/nodes/0.DuP0Q9Ha.js","_app/immutable/chunks/scheduler.MvcK4Jfn.js","_app/immutable/chunks/index.kA7WmQLO.js","_app/immutable/chunks/spread.CgU5AtxT.js","_app/immutable/chunks/stores.Dqcf6u2s.js","_app/immutable/chunks/entry.By1InJmt.js","_app/immutable/chunks/index.Cs7Zw368.js"];
export const stylesheets = ["_app/immutable/assets/0.CglNOh63.css"];
export const fonts = [];
