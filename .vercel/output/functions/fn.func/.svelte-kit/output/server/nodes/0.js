import * as universal from '../entries/pages/_layout.js';

export const index = 0;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/_layout.svelte.js')).default;
export { universal };
export const universal_id = "src/routes/+layout.js";
export const imports = ["_app/immutable/nodes/0.Bmk0MhF1.js","_app/immutable/chunks/scheduler.DV3wrT91.js","_app/immutable/chunks/index.D0GblgS9.js","_app/immutable/chunks/spread.CgU5AtxT.js","_app/immutable/chunks/stores.DHXSC1yr.js","_app/immutable/chunks/entry.C1l1I-6s.js","_app/immutable/chunks/index.CngPtPn9.js"];
export const stylesheets = ["_app/immutable/assets/0.W5pYZNmM.css"];
export const fonts = [];
