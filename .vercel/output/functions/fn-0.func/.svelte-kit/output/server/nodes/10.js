import * as universal from '../entries/pages/produkte/_productid_/_page.js';

export const index = 10;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/produkte/_productid_/_page.svelte.js')).default;
export { universal };
export const universal_id = "src/routes/produkte/[productid]/+page.js";
export const imports = ["_app/immutable/nodes/10.BkAM3hMq.js","_app/immutable/chunks/supabaseClient.CItD8zm_.js","_app/immutable/chunks/preload-helper.BQ24v_F8.js","_app/immutable/chunks/scheduler.DfuChs2G.js","_app/immutable/chunks/await_block.b95zegdE.js","_app/immutable/chunks/index.BnyCCVNm.js","_app/immutable/chunks/each.D6YF6ztN.js","_app/immutable/chunks/Button.BWb8FycM.js","_app/immutable/chunks/spread.CgU5AtxT.js","_app/immutable/chunks/bundle-mjs.BTwrKG5i.js","_app/immutable/chunks/Spinner.BMfSgHGW.js","_app/immutable/chunks/shops.Dfb--GkT.js"];
export const stylesheets = [];
export const fonts = [];
