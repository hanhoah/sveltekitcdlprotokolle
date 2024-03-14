import * as universal from '../entries/pages/produkte/_layout.ts.js';

export const index = 3;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/produkte/_layout.svelte.js')).default;
export { universal };
export const universal_id = "src/routes/produkte/+layout.ts";
export const imports = ["_app/immutable/nodes/3.B99SOute.js","_app/immutable/chunks/supabaseClient.CItD8zm_.js","_app/immutable/chunks/preload-helper.BQ24v_F8.js","_app/immutable/chunks/scheduler.DfuChs2G.js","_app/immutable/chunks/index.BnyCCVNm.js","_app/immutable/chunks/each.D6YF6ztN.js","_app/immutable/chunks/getHashtags.BLyjUpLK.js"];
export const stylesheets = [];
export const fonts = [];
