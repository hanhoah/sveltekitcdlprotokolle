import * as universal from '../entries/pages/_layout.js';

export const index = 0;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/_layout.svelte.js')).default;
export { universal };
export const universal_id = "src/routes/+layout.js";
export const imports = ["_app/immutable/nodes/0.CGYmYnPs.js","_app/immutable/chunks/scheduler.C4ZYsLN4.js","_app/immutable/chunks/index.DI9pZrS9.js","_app/immutable/chunks/spread.CgU5AtxT.js","_app/immutable/chunks/stores.CBwQzz8T.js","_app/immutable/chunks/entry.CmYwrCBr.js","_app/immutable/chunks/index.DTw5nWgH.js"];
export const stylesheets = ["_app/immutable/assets/0.D6sgqCMk.css"];
export const fonts = [];
