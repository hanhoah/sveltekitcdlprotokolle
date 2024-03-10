import { c as create_ssr_component, i as each, f as escape, v as validate_component } from "../../../chunks/ssr.js";
import "../../../chunks/supabaseClient.js";
const Hashtags = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let topHashTags = [];
  return `<div class="bg-red-200 mt-10 p-3"><h2 data-svelte-h="svelte-1dglh44">Nicht das passende Produkt gefunden? Wähle einen der folgenden beliebten Hashtags:</h2> <div class="col columns-6 text-xs">${each(topHashTags, ({ tag, anzahl, hashtag_id }) => {
    return `<a href="${"/produkte/hashtag/" + escape(hashtag_id, true)}"><div class="p-1 border-2 m-1 bg-red-50 border-red-300">${escape(tag)} (${escape(anzahl)})</div> </a>`;
  })}</div> <div>${each(topHashTags, ({ hashtag_id }) => {
    return `&#39;/produkte/hashtag/${escape(hashtag_id)}&#39;,`;
  })}</div></div>`;
});
const Layout = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { data } = $$props;
  if ($$props.data === void 0 && $$bindings.data && data !== void 0)
    $$bindings.data(data);
  return `<div class="w-full p-3 text-xs bg-yellow-200 hover:bg-lime-300">${escape(data.count)} Produkte in der Datenbank gefunden. Bitte wählen Sie eine Kategorie aus um Ihr Produkt schneller zu finden.</div> <div class="mb-5"><div><nav><div class="grid grid-cols-4 md:grid-cols-6 m-5 gap-3 ">${each(data.categories, (category) => {
    return `<a href="${"/produkte/cat/" + escape(category.category_id, true)}"><div class="w-full p-1 text-xs bg-green-100 hover:bg-yellow-300">${category.name === "Oele" ? `Öle` : `${escape(category.name)}`}</div> </a>`;
  })}</div></nav></div> ${slots.default ? slots.default({}) : ``} ${validate_component(Hashtags, "Hashtags").$$render($$result, {}, {}, {})}</div>`;
});
export {
  Layout as default
};
