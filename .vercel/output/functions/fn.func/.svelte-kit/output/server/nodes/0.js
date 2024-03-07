import * as universal from '../entries/pages/_layout.js';

export const index = 0;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/_layout.svelte.js')).default;
export { universal };
export const universal_id = "src/routes/+layout.js";
export const imports = ["_app/immutable/nodes/0.B_RAnuTH.js","_app/immutable/chunks/scheduler.DBuKuVba.js","_app/immutable/chunks/index.CsvtYcO8.js","_app/immutable/chunks/spread.CgU5AtxT.js","_app/immutable/chunks/stores.fjMFfKVp.js","_app/immutable/chunks/entry.DRLtE_Vg.js","_app/immutable/chunks/index.BgTDFKOH.js"];
export const stylesheets = ["_app/immutable/assets/0.CH0_YMOR.css"];
export const fonts = [];
