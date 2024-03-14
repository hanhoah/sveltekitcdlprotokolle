import { c as create_ssr_component, i as each, v as validate_component, f as escape } from "../../../chunks/ssr.js";
import { B as Button } from "../../../chunks/Button.js";
const Layout = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { data } = $$props;
  console.log("data", data);
  if ($$props.data === void 0 && $$bindings.data && data !== void 0)
    $$bindings.data(data);
  return `<div><div><nav><div class="grid grid-cols-2 md:grid-cols-4 m-5 gap-3 ">${each(data.categories, (category) => {
    return `${validate_component(Button, "Button").$$render($$result, { color: "blue", pill: true }, {}, {
      default: () => {
        return `<a href="${"/buecher/cat/" + escape(category.id, true)}">${escape(category.name)}</a> `;
      }
    })}`;
  })}</div></nav></div> ${slots.default ? slots.default({}) : ``}</div>`;
});
export {
  Layout as default
};
