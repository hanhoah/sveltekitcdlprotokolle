import * as server from '../entries/pages/search/_page.server.ts.js';

export const index = 12;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/search/_page.svelte.js')).default;
export { server };
export const server_id = "src/routes/search/+page.server.ts";
export const imports = ["_app/immutable/nodes/12.Do9eoFMC.js","_app/immutable/chunks/scheduler.DBuKuVba.js","_app/immutable/chunks/index.CsvtYcO8.js","_app/immutable/chunks/each.D6YF6ztN.js","_app/immutable/chunks/shops.UQ8kZvPW.js","_app/immutable/chunks/book.pYU5oA7H.js"];
export const stylesheets = [];
export const fonts = [];
