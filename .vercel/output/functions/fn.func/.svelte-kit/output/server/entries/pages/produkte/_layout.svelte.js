import { c as create_ssr_component, f as escape, h as each } from "../../../chunks/ssr.js";
const Layout = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { data } = $$props;
  if ($$props.data === void 0 && $$bindings.data && data !== void 0)
    $$bindings.data(data);
  return `<div class="w-full p-3 text-xs bg-yellow-200 hover:bg-lime-300">${escape(data.count)} Produkte in der Datenbank gefunden. Bitte wählen Sie eine Kategorie aus um Ihr Produkt schneller zu finden.</div> <div><div><nav><div class="grid grid-cols-4 md:grid-cols-6 m-5 gap-3 ">${each(data.categories, (category) => {
    return `<a href="${"/produkte/cat/" + escape(category.category_id, true)}"><div class="w-full p-1 text-xs bg-green-100 hover:bg-yellow-300">${category.name === "Oele" ? `Öle` : `${escape(category.name)}`}</div> </a>`;
  })}</div></nav></div> ${slots.default ? slots.default({}) : ``}</div>`;
});
export {
  Layout as default
};
