import * as universal from '../entries/pages/_layout.js';

export const index = 0;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/_layout.svelte.js')).default;
export { universal };
export const universal_id = "src/routes/+layout.js";
export const imports = ["_app/immutable/nodes/0.D8FZDQQ9.js","_app/immutable/chunks/scheduler.DfuChs2G.js","_app/immutable/chunks/index.BnyCCVNm.js","_app/immutable/chunks/spread.CgU5AtxT.js","_app/immutable/chunks/stores.CSoJpQUH.js","_app/immutable/chunks/entry.CucitBpq.js","_app/immutable/chunks/index.DEpSfGhY.js"];
export const stylesheets = ["_app/immutable/assets/0.BHl-HPRx.css"];
export const fonts = [];
