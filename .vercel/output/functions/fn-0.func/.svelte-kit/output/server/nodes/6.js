import * as universal from '../entries/pages/buecher/_bookId_/_page.js';

export const index = 6;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/buecher/_bookId_/_page.svelte.js')).default;
export { universal };
export const universal_id = "src/routes/buecher/[bookId]/+page.js";
export const imports = ["_app/immutable/nodes/6.DPli3mkC.js","_app/immutable/chunks/supabaseClient.CItD8zm_.js","_app/immutable/chunks/preload-helper.BQ24v_F8.js","_app/immutable/chunks/books.CGIvvIdN.js","_app/immutable/chunks/getHashtags.BLyjUpLK.js","_app/immutable/chunks/scheduler.DfuChs2G.js","_app/immutable/chunks/await_block.b95zegdE.js","_app/immutable/chunks/index.BnyCCVNm.js","_app/immutable/chunks/each.D6YF6ztN.js","_app/immutable/chunks/spread.CgU5AtxT.js","_app/immutable/chunks/index.DrucrQ_l.js","_app/immutable/chunks/bundle-mjs.BTwrKG5i.js","_app/immutable/chunks/Button.BWb8FycM.js","_app/immutable/chunks/Spinner.BMfSgHGW.js","_app/immutable/chunks/book.DozPUM9A.js"];
export const stylesheets = [];
export const fonts = [];
